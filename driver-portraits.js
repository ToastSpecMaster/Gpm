/* Grand Prix Manager — season-aware, licence-checked driver photo lookup.
   Uses Wikimedia Commons metadata and keeps author/licence/source credit with each image. */
(() => {
  'use strict';
  const cache = new Map();
  const clean = value => String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
  const initials = name => String(name || 'F1').split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();

  function reusableLicence(value) {
    const licence = clean(value).toUpperCase();
    if (/\bNC\b|\bNON.?COMMERCIAL\b|\bND\b|\bNO.?DERIVATIVES\b/.test(licence)) return false;
    return /^(CC0(?:\s|$)|CC BY(?:-SA)?(?:\s|$)|PUBLIC DOMAIN(?:\s|$)|OGL 3(?:\.0)?$)/.test(licence);
  }

  async function search(name, year) {
    const query = year ? `filetype:bitmap "${name}" Formula One ${year} driver` : `filetype:bitmap "${name}" Formula One driver`;
    const endpoint = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=480&format=json&origin=*';
    const response = await fetch(`${endpoint}&gsrsearch=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Wikimedia Commons request failed');
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {});
    const candidates = pages.map(page => {
      const info = page.imageinfo?.[0];
      const meta = info?.extmetadata || {};
      const licence = clean(meta.LicenseShortName?.value || '');
      const artist = clean(meta.Artist?.value || meta.Credit?.value || 'Photographer not listed');
      const description = clean(meta.ImageDescription?.value || '');
      const date = clean(meta.DateTimeOriginal?.value || meta.DateTime?.value || '');
      const title = clean(page.title || '');
      const sourceUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent((page.title || '').replace(/ /g, '_'))}`;
      return {
        title, url: info?.thumburl || info?.url || '', licence, artist, description,
        licenceUrl: clean(meta.LicenseUrl?.value || ''), sourceUrl,
        date,
        score: (year && new RegExp(String(year)).test(`${title} ${description} ${date}`) ? 10 : 0)
          + (title.toLowerCase().includes(name.toLowerCase()) ? 5 : 0)
          + (/portrait|driver|paddock|grand prix|formula one|formula 1/i.test(`${title} ${description}`) ? 2 : 0)
      };
    }).filter(item => item.url && reusableLicence(item.licence) && (!year || new RegExp(String(year)).test(`${item.title} ${item.description} ${item.date}`)));
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0] || null;
  }

  async function lookup(name, season) {
    const driver = String(name || '').trim();
    const lookupName = driver.replace(/\s+\(Prime\)$/,'');
    const year = Number(season) || new Date().getFullYear();
    const key = `${driver.toLowerCase()}|${year}`;
    if (cache.has(key)) return cache.get(key);
    const pending = (async () => {
      try {
        let result = await search(lookupName, year);
        if (!result) {
          // If no season-specific photo is available, use the best reusable Commons portrait.
          result = await search(lookupName, null);
        }
        return result ? { ...result, driver, season: year, fallback: initials(driver) } : { driver, season: year, fallback: initials(driver) };
      } catch {
        return { driver, season: year, fallback: initials(driver) };
      }
    })();
    cache.set(key, pending);
    return pending;
  }

  window.GPMDriverPortraits = { lookup, reusableLicence, clearCache: () => cache.clear() };
})();
