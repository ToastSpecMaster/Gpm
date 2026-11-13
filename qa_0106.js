'use strict';
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const sw=fs.readFileSync('sw.js','utf8'),pkg=require('./package.json'),app=fs.readFileSync('app.js','utf8'),gpm=fs.readFileSync('gpm-064.js','utf8'),patch=fs.readFileSync('career-overhaul-0106.js','utf8'),index=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('style.css','utf8');
assert.strictEqual(pkg.gpmBuildVersion,'0.10.11.0');
const careerPatch=fs.readFileSync('career-overhaul-0106.js','utf8');
assert.match(careerPatch,/const pool=\[\.\.\.\(allDrivers\(c\.season\)\|\|\[\]\)\.map/,'player roster repair must prioritize the F1 pool before F2/F3 fallback');
assert(index.includes('career-overhaul-0106.js'),'overhaul module must load after existing game systems');
assert(index.includes('career-fix-0107.js'),'0.10.9 constructor and R&D fixes must remain loaded');
assert(index.indexOf('historical-seasons-0109.js')>index.indexOf('career-fix-0107.js'),'historical seasons must extend the existing runtime after prior fixes');
assert(sw.includes('gpm-shell-v30-01110')&&sw.includes('./career-overhaul-0106.js'),'PWA cache must load the new overhaul module');
assert(gpm.includes('activePrime=(allDrivers(season)||[]).map(n=>`${n} (Prime)`)'),'current-grid drivers must have separate Prime versions in Historic F1');
assert(gpm.includes('Historical legends cannot be signed into a modern-season race seat'),'modern careers must block non-Prime historical legends');
assert(gpm.includes('contracted F1 drivers cannot be taken directly'),'player replacement offers must exclude drivers contracted to other F1 teams');
assert(app.includes('&&!activeSeasonNames.has(name)'),'historical names who are active in the selected season must remain on their real grid');
assert(gpm.includes('c.freeAgents=Array.isArray(c.freeAgents)?c.freeAgents:[]'),'released drivers must enter free agency, not the reserve pool');
assert(gpm.includes('reputationDiscount'),'team reputation must influence contract negotiation');
assert(gpm.includes('AI driver moves are now handled by the contract-window transfer model'),'unconditional random AI swaps must be removed');
assert(gpm.includes('Never copy last season\'s AI line-ups over it'),'authored 2022â€“2026 grids and future contract-simulated grids must survive season advance');
assert(gpm.includes('if(Number(c.season)>=2026){Object.entries(c.roster||{})'),'random retirements must not overwrite known historical grids before 2027');
assert(patch.includes('function archiveCareerSeason0106(c)'),'season archive must replace stale same-year champion records');
assert(patch.includes('window.openGpmHallOfFame=function()'),'Hall of Fame button must call the updated archive-aware entry point');
assert(patch.includes('function primePool0106(c)'),'Prime variants must be available in the player transfer flow');
assert(patch.includes('openUpgradeChooser=function(initialTab'),'R&D chart must be rebuilt');
assert(patch.includes("reliability:{label:'RELIABILITY'"),'reliability department missing');
assert(patch.includes('applyRegulationChange=function(c){c.regulationSchedule'),'automatic performance decline must be disabled');
assert(patch.includes('Initial acquisition / switch fee'),'supplier purchase price must be shown separately from annual cost');
assert(patch.includes('function toggleMenuMusic0106'),'menu music control needs a reliable click handler');
assert(patch.includes("$g('confirmTransferBtn')?.addEventListener('click'"),'replacement button must route to the new transfer handler');
assert(patch.includes("$g('upgradeBtn')?.addEventListener('click'"),'R&D button must route to the redesigned development chart');
assert(patch.includes('window.openGpmTechnicalSuppliers=openTechnicalSuppliers'),'supplier menu must expose the updated acquisition pricing screen');
assert(patch.includes('gpm-market-profile-photo'),'driver-market portraits must render in the profile');
assert(fs.readFileSync('driver-portraits.js','utf8').includes('const lookupName = driver.replace'),'Prime driver portraits must resolve through their base driver photo');
assert(patch.includes('gpm-preseason-premium'),'pre-season grid presentation missing');
assert(css.includes('.gpm-rnd-tree'),'R&D chart styles missing');
for(const f of ['app.js','gpm-064.js','steam-overhaul.js','broadcast-ui.js','career-overhaul-0106.js']){const {status}=require('child_process').spawnSync(process.execPath,['--check',f],{encoding:'utf8'});assert.strictEqual(status,0,`${f} syntax check failed`);}
console.log('0.10.9 inherited feature and syntax checks passed.');
// Runtime Prime-market check: the active driver's normal identity stays assigned while a separate Prime edition is selectable.
const marketStart=patch.indexOf('function primePool0106(c){');
const marketEnd=patch.indexOf('\nopenDriverMarket=function(){',marketStart);
assert(marketStart>=0&&marketEnd>marketStart,'Prime market helpers must be present');
const marketCode=patch.slice(marketStart,marketEnd);
const marketSandbox={allDrivers:()=>['Sebastian Vettel','Lewis Hamilton'],DRIVER_RATING:{'Sebastian Vettel':91,'Lewis Hamilton':94},HISTORICAL_DRIVERS_063:[['Sebastian Vettel (Prime)',96,'Champion']],juniorDrivers:()=>[],FREE_AGENT_POOL_063:[],HISTORICAL_NAMES_063:['Sebastian Vettel','Sebastian Vettel (Prime)'],clamp:(n,a,b)=>Math.max(a,Math.min(b,n)),unique:a=>[...new Set(a)]};
vm.createContext(marketSandbox);vm.runInContext(marketCode+';this.primePool0106=primePool0106;this.freeMarket0106=freeMarket0106;',marketSandbox);
const primeNames=marketSandbox.primePool0106({season:2022}).map(x=>x.name);
assert(primeNames.includes('Sebastian Vettel (Prime)'),'Vettel Prime must be in Historic/Prime market');
const choices=marketSandbox.freeMarket0106({season:2022,roster:{Ferrari:['Sebastian Vettel','Charles Leclerc']},drivers:['Sebastian Vettel','Charles Leclerc'],reserves:[]}).map(x=>x.name);
assert(choices.includes('Sebastian Vettel (Prime)'),'Prime edition must remain available while original driver is active');
assert(!choices.includes('Sebastian Vettel'),'the contracted current F1 identity must not be offered as a free agent');
console.log('PASS Runtime market check: current Vettel stays contracted while Vettel (Prime) remains separately selectable.');
// Runtime champion archive check: overwrite a stale 2023 archive entry with the actual final standings.
const archiveStart=patch.indexOf('function archiveCareerSeason0106(c){');
const archiveMarker=patch.indexOf('window.archiveCareerSeason0106',archiveStart);
const archiveEnd=patch.lastIndexOf('};',archiveMarker)+2;
assert(archiveStart>=0&&archiveEnd>archiveStart,'archive rebuild implementation must exist');
const archiveSandbox={SEASONS:{2023:{rounds:22}},sortedEntries:o=>Object.entries(o||{}).map(([name,points])=>({name,points})).sort((a,b)=>b.points-a.points),saveCareer:()=>{}};
vm.createContext(archiveSandbox);vm.runInContext(patch.slice(archiveStart,archiveEnd)+';this.archiveCareerSeason0106=archiveCareerSeason0106;',archiveSandbox);
const save={season:2023,round:22,driverChampPoints:{'Lewis Hamilton':350,'Max Verstappen':330},constructorStandings:{Mercedes:600,RedBull:590},raceArchive:[],seasonArchive:[{season:2023,driverChampion:'Max Verstappen',constructorChampion:'Red Bull'}],seasonHistory:[],hallOfFame:{drivers:{'Lewis Hamilton':{titles:7,wins:103,podiums:190}},constructors:{},records:{}}};
archiveSandbox.archiveCareerSeason0106(save);
assert.strictEqual(save.seasonArchive.find(x=>x.season===2023).driverChampion,'Lewis Hamilton','stale season archive must be replaced');
assert.strictEqual(save.seasonHistory.find(x=>x.season===2023).driverChampion,'Lewis Hamilton','season history must use the real simulated champion');
console.log('PASS Runtime Hall of Fame archive check: 2023 Lewis Hamilton replaces stale champion entry.');
// Load-time integration smoke test: catch unresolved names at script execution (not just syntax errors).
const loadSandbox={
 document:{getElementById:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}},
 window:{openGpmHallOfFame:()=>{},GPMDriverPortraits:null},
 MutationObserver:class{observe(){}},setTimeout:()=>{},
 currentCareer:null,ensureRoster:()=>{},allDrivers:()=>[],juniorDrivers:()=>[],DRIVER_RATING:{},HISTORICAL_NAMES_063:[],
 FREE_AGENT_POOL_063:[],HISTORICAL_DRIVERS_063:[],
 showSeasonEndSummary:()=>{},showCareerModal:()=>({querySelector:()=>null,querySelectorAll:()=>[],hidden:false}),
 ensureChampionshipData:()=>{},ensureTechnicalState:()=>{},teamWorksEngine:()=>false,PU_SUPPLIERS:{},GB_SUPPLIERS:{},
 saveCareer:()=>{},renderCareer:()=>{},renderSaves:()=>{},showToast:()=>{},escapeHtml:x=>String(x),
 sortedEntries:()=>[],SEASONS:{2023:{rounds:22}},getPartOverall:()=>70,teamBaseRating:()=>70,
 showPreSeasonReport:()=>{},applyRegulationChange:()=>null,advanceAiTeamDevelopment:()=>{},
};
vm.createContext(loadSandbox);vm.runInContext(patch,loadSandbox);
assert.strictEqual(typeof loadSandbox.openUpgradeChooser,'function');
assert.strictEqual(typeof loadSandbox.window.archiveCareerSeason0106,'function');
assert.strictEqual(typeof loadSandbox.openDriverMarket,'function');
console.log('PASS Load-time integration smoke test: 0.10.9 module initializes without unresolved global references.');
