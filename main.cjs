const { app, BrowserWindow, Menu, protocol, net, shell, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');
const { pathToFileURL } = require('node:url');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
]);

const CLOUD_FILE = 'grand-prix-manager-cloud-save.json';
const SETTINGS_FILE = 'cloud-folder.json';
let cloudFolder = null;
let cloudWriteQueue = Promise.resolve();

async function loadCloudFolderSetting() {
  try {
    const raw = await fs.readFile(path.join(app.getPath('userData'), SETTINGS_FILE), 'utf8');
    const data = JSON.parse(raw);
    if (typeof data.folder === 'string') cloudFolder = data.folder;
  } catch {}
}

async function chooseCloudFolder() {
  const result = await dialog.showOpenDialog({
    title: 'Choose your cloud-synced save folder',
    properties: ['openDirectory', 'createDirectory']
  });
  if (result.canceled || !result.filePaths[0]) return { cancelled: true };
  cloudFolder = result.filePaths[0];
  await fs.mkdir(app.getPath('userData'), { recursive: true });
  await fs.writeFile(path.join(app.getPath('userData'), SETTINGS_FILE), JSON.stringify({ folder: cloudFolder }), 'utf8');
  return { configured: true, folderName: path.basename(cloudFolder) };
}

function validateSaveData(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid cloud-save data.');
  const careers = Array.isArray(data.careers) ? data.careers : [];
  const driverCareers = Array.isArray(data.driverCareers) ? data.driverCareers : [];
  if (careers.length > 5 || driverCareers.length > 20) throw new Error('Cloud-save contains too many career slots.');
  return {
    schemaVersion: 1,
    gameVersion: app.getVersion(),
    savedAt: new Date().toISOString(),
    careers,
    driverCareers
  };
}

ipcMain.handle('gpm-cloud:status', async () => ({
  configured: !!cloudFolder,
  folderName: cloudFolder ? path.basename(cloudFolder) : null
}));

ipcMain.handle('gpm-cloud:choose-folder', chooseCloudFolder);

ipcMain.handle('gpm-cloud:save', async (_event, payload) => {
  if (!cloudFolder) return { configured: false };
  const data = validateSaveData(payload);
  const folderAtRequest = cloudFolder;
  const write = async () => {
    await fs.mkdir(folderAtRequest, { recursive: true });
    const target = path.join(folderAtRequest, CLOUD_FILE);
    const temp = target + '.tmp';
    await fs.writeFile(temp, JSON.stringify(data), 'utf8');
    await fs.rename(temp, target);
    return { configured: true, savedAt: data.savedAt, folderName: path.basename(folderAtRequest) };
  };
  cloudWriteQueue = cloudWriteQueue.then(write, write);
  return cloudWriteQueue;
});

ipcMain.handle('gpm-cloud:load', async () => {
  if (!cloudFolder) return { configured: false };
  const target = path.join(cloudFolder, CLOUD_FILE);
  try {
    const data = JSON.parse(await fs.readFile(target, 'utf8'));
    if (!data || data.schemaVersion !== 1 || !Array.isArray(data.careers) || !Array.isArray(data.driverCareers)) {
      throw new Error('The cloud-save file has an unsupported or invalid format.');
    }
    return { configured: true, data };
  } catch (error) {
    if (error.code === 'ENOENT') return { configured: true, missing: true };
    throw error;
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 940, minWidth: 1050, minHeight: 720,
    backgroundColor: '#080b12', autoHideMenuBar: true,
    title: 'Grand Prix Manager 0.10.5',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true, nodeIntegration: false, sandbox: true
    }
  });
  win.loadURL('app://gpm/index.html');
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
  return win;
}

app.whenReady().then(async () => {
  await loadCloudFolderSetting();
  protocol.handle('app', request => {
    const url = new URL(request.url);
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const filePath = path.resolve(__dirname, relativePath || 'index.html');
    const rootPath = path.resolve(__dirname) + path.sep;
    if (filePath !== path.resolve(__dirname, 'index.html') && !filePath.startsWith(rootPath)) {
      return new Response('Not found', { status: 404 });
    }
    return net.fetch(pathToFileURL(filePath).toString());
  });
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
