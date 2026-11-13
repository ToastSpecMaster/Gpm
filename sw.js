const CACHE='gpm-shell-v30-01110';
const CORE=['./','./index.html','./style.css','./app.js','./gpm-064.js','./driver-career.js','./driver-portraits.js','./pre10-overhaul.js','./steam-overhaul.js','./ui-motion.js','./broadcast-ui.js','./career-overhaul-0106.js','./career-fix-0107.js','./historical-seasons-0109.js','./historical-transfers-01095.js','./historical-career-0110.js','./audio/menu-house-loop.wav','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./save-migration.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
  if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
  return response;
 }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Promise.reject(new Error('Offline asset unavailable')))));
});
