// Local-origin save migration helpers for careers previously stored under file://.
(() => {
  const ready = () => {
    const saveList = document.getElementById('saveList');
    if (!saveList || document.getElementById('gpmSaveMigrationTools')) return;
    const tools = document.createElement('div');
    tools.id = 'gpmSaveMigrationTools';
    tools.className = 'gpm-save-migration-tools';
    tools.innerHTML = '<button type="button" class="secondary-btn" id="gpmImportSave">IMPORT OLD CAREER SAVE</button><button type="button" class="secondary-btn" id="gpmExportSave">BACK UP CAREERS</button><input id="gpmImportSaveFile" type="file" accept=".json,application/json" hidden>';
    saveList.insertAdjacentElement('afterend', tools);
    const file = document.getElementById('gpmImportSaveFile');
    document.getElementById('gpmImportSave').addEventListener('click', () => file.click());
    file.addEventListener('change', async () => {
      const picked = file.files?.[0]; if (!picked) return;
      try {
        const parsed = JSON.parse(await picked.text());
        const incoming = Array.isArray(parsed) ? parsed : Array.isArray(parsed.careers) ? parsed.careers : null;
        if (!incoming) throw new Error('Expected an array of career saves.');
        const current = JSON.parse(localStorage.getItem('gpm-careers') || '[]');
        const byId = new Map(current.map(x => [String(x.id), x]));
        incoming.forEach(x => { if (x && x.id !== undefined) byId.set(String(x.id), x); });
        localStorage.setItem('gpm-careers', JSON.stringify([...byId.values()].slice(0, 5)));
        alert(`Imported ${incoming.length} career save(s). The game will reload now.`);
        location.reload();
      } catch (err) { alert('Could not import this save file: ' + (err?.message || err)); }
      finally { file.value = ''; }
    });
    document.getElementById('gpmExportSave').addEventListener('click', () => {
      const data = localStorage.getItem('gpm-careers') || '[]';
      const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'gpm-careers-backup.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
