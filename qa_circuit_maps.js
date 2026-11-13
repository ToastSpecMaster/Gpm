const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/app.js','utf8');
const a=src.indexOf('const CIRCUIT_LAYOUTS=');
const b=src.indexOf('const TEAM_BASE_RATINGS=',a);
assert(a>=0&&b>a,'circuit layout map block exists');
const block=src.slice(a,b);
const calendars={
2022:['Bahrain','Saudi Arabia','Australia','Emilia-Romagna','Miami','Spain','Monaco','Azerbaijan','Canada','Great Britain','Austria','France','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
2023:['Bahrain','Saudi Arabia','Australia','Azerbaijan','Miami','Monaco','Spain','Canada','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','Qatar','United States','Mexico City','São Paulo','Las Vegas','Abu Dhabi'],
2024:['Bahrain','Saudi Arabia','Australia','Japan','China','Miami','Emilia-Romagna','Monaco','Canada','Spain','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
2025:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Emilia-Romagna','Monaco','Spain','Canada','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
2026:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Canada','Monaco','Spain','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Madrid','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi']
};
const ctx={currentCareer:{season:2026},window:{getGpmEventName:(y,r)=>calendars[y][r-1]}};ctx.window=ctx.window;vm.createContext(ctx);vm.runInContext(block,ctx);
for(const [year,events] of Object.entries(calendars)) for(let i=0;i<events.length;i++){
 const t=ctx.raceTrackFor(i+1,Number(year));
 assert(t.layoutId,`${year} round ${i+1} ${events[i]} has a real layout ID`);
 assert.strictEqual(t.mapUrl,`./circuits/maps/${t.layoutId}.svg`,`${t.layoutId} resolves to a bundled local SVG path`);
}
assert.strictEqual(ctx.raceTrackFor(6,2022).layoutId,'catalunya-5','2022 Barcelona uses the 2021–22 layout');
assert.strictEqual(ctx.raceTrackFor(17,2022).layoutId,'marina-bay-3','2022 Singapore uses the pre-2023 layout');
assert.strictEqual(ctx.raceTrackFor(9,2026).layoutId,'catalunya-6','2026 Barcelona round uses the current Catalunya layout');
assert.strictEqual(ctx.raceTrackFor(16,2026).layoutId,'madring-1','2026 Madrid round uses Madring');
const downloader=fs.readFileSync(__dirname+'/download-circuit-maps.js','utf8');
const manifestBlock=downloader.match(/const LAYOUTS = \[([\s\S]*?)\];/);
assert(manifestBlock,'download manifest exists');
assert(!downloader.includes('/refs/heads/main/'),'raw GitHub URL must not contain refs/heads');
assert(downloader.includes('/circuits/minimal/white-outline'),'downloader uses the documented upstream SVG directory');
assert(downloader.includes('candidateUrls'),'downloader builds direct asset URLs without the failing GitHub tree API');
assert(downloader.includes('fetchSvgFromSources'),'downloader tries multiple upstream mirrors');
assert(downloader.includes('cdn.jsdelivr.net/gh/'),'CDN fallback is configured');
assert(downloader.includes('validateSvg'),'downloaded and cached assets are validated as SVGs');
const manifest=new Set([...manifestBlock[1].matchAll(/'([^']+)'/g)].map(m=>m[1]));
for(const year of Object.keys(calendars)) for(let round=1;round<=calendars[year].length;round++){
 const id=ctx.raceTrackFor(round,Number(year)).layoutId;
 assert(manifest.has(id),`${id} is included in the installer download manifest`);
}
const attribution=fs.readFileSync(__dirname+'/CIRCUIT_MAPS_ATTRIBUTION.txt','utf8');
assert(attribution.includes('CC BY 4.0'),'CC BY 4.0 attribution is present');
console.log(`Circuit map QA passed: every round in the 2022–2026 calendars maps to a season-specific local SVG path; all ${manifest.size} required layouts are in the installer download manifest.`);
