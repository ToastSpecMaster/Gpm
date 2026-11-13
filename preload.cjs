const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gpmDesktop', Object.freeze({
  cloudStatus: () => ipcRenderer.invoke('gpm-cloud:status'),
  chooseCloudFolder: () => ipcRenderer.invoke('gpm-cloud:choose-folder'),
  saveCloud: data => ipcRenderer.invoke('gpm-cloud:save', data),
  loadCloud: () => ipcRenderer.invoke('gpm-cloud:load')
}));
