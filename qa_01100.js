'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const moduleSrc=fs.readFileSync('historical-career-0110.js','utf8');
const app=fs.readFileSync('app.js','utf8');
const pre=fs.readFileSync('pre10-overhaul.js','utf8');
const career=fs.readFileSync('career-overhaul-0106.js','utf8');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const pkg=require('./package.json');
assert.strictEqual(pkg.version,'0.10.11');
assert.strictEqual(pkg.gpmBuildVersion,'0.10.11.0');
assert(index.includes('historical-career-0110.js'),'historical career patch must load after historical transfers');
assert(pkg.build.files.includes('historical-career-0110.js'),'Electron build must include historical career patch');
assert(sw.includes('gpm-shell-v30-01110')&&sw.includes('./historical-career-0110.js'),'service worker must cache new career patch');
assert(app.includes('historicalControlled=next<=2026'),'season transitions must use the selected season historical constructor baseline');
assert(app.includes('applyGpmHistoricalRegulations0110(c,previous,next)'),'season change must apply its regulation profile');
assert(app.includes('syncGpmDepartmentNodes0110(c,part)'),'mechanical damage must sync with R&D nodes');
assert(app.includes('syncGpmDepartmentNodes0110(c,k)'),'part replacement must sync with R&D nodes');
assert(moduleSrc.includes('aiBaseLoss=changes.reduce'),'AI car ratings must also react to major regulation resets');
assert(fs.readFileSync('steam-overhaul.js','utf8').includes('BUILD 0.10.11.0'),'final career render must display the current build number');
assert(fs.readFileSync('index.html','utf8').includes('Build 0.10.11.0'),'window title must display the current build number');
assert(career.includes('playerManaged:true'),'player-negotiated transfers must persist across historical season grids');

// Test season-specific grid migration and regulation resets using the real runtime module.
const seasons={2016:{teams:[['Mercedes','#fff',['Lewis Hamilton','Nico Rosberg']],['Red Bull Racing','#00f',['Daniel Ricciardo','Daniil Kvyat']]]},2019:{teams:[['Mercedes','#fff',['Lewis Hamilton','Valtteri Bottas']],['Red Bull Racing','#00f',['Max Verstappen','Pierre Gasly']],['Ferrari','#f00',['Sebastian Vettel','Charles Leclerc']]]},2026:{teams:[['Ferrari','#f00',['Lewis Hamilton','Charles Leclerc']]]}};
const ctx={SEASONS:seasons,window:{},console,DRIVER_RATING:{},allDrivers:()=>['Replacement F1 A','Replacement F1 B'],juniorDrivers:()=>[],getPartOverall:c=>Math.round(['aero','chassis','power','suspension','reliability'].reduce((n,k)=>n+Number(c.parts[k]),0)/5)};
vm.createContext(ctx);vm.runInContext(moduleSrc,ctx);
const career2019={name:'Mercedes',mode:'existing',season:2019,drivers:['Lewis Hamilton','Nico Rosberg'],parts:{aero:80,chassis:80,power:80,suspension:80,reliability:80},car:80,history:[]};
assert(ctx.window.GPMHistoricalCareer0110.normalizeHistoricalGrid(career2019,2019),'2019 grid normalization should succeed');
assert.deepStrictEqual(Array.from(career2019.drivers),['Lewis Hamilton','Valtteri Bottas'],'2019 Mercedes must use 2019 Hamilton/Bottas lineup, not the 2016 Rosberg lineup');
assert.deepStrictEqual(Array.from(career2019.roster['Red Bull Racing']),['Max Verstappen','Pierre Gasly'],'2019 Red Bull lineup must be season-specific');

const c={season:2021,parts:{aero:80,chassis:80,power:80,suspension:80,reliability:80},car:80,enginePower:80,engineReliability:80,gearboxReliability:80,history:[],partDetails:{}};
const api=ctx.window.GPMHistoricalCareer0110;
api.applyRegulationProfile(c,2021,2022);
assert.strictEqual(c.parts.aero,72,'2022 ground-effect reset should lower aero by 8');
assert.strictEqual(c.parts.chassis,76,'2022 rules should lower chassis rating');
assert.strictEqual(c.parts.suspension,77,'2022 rules should lower suspension rating');
assert.strictEqual(c.partDetails.floor,72,'floor R&D node must reflect the lowered aero rating');
const rndSource=fs.readFileSync('career-fix-0107.js','utf8');
const aggStart=rndSource.indexOf('function updateDeptAggregate107(c,key){');
const aggEnd=rndSource.indexOf('\nfunction openRndTree107',aggStart);
const aggCtx={getPartOverall:x=>Math.round(['aero','chassis','power','suspension','reliability'].reduce((n,k)=>n+Number(x.parts[k]),0)/5)};
vm.createContext(aggCtx);vm.runInContext(rndSource.slice(rndSource.indexOf('const DEPTS107='),rndSource.indexOf('\nfunction works107'))+'\n'+rndSource.slice(aggStart,aggEnd)+';this.DEPTS107=DEPTS107;this.updateDeptAggregate107=updateDeptAggregate107;',aggCtx);
const recovery={parts:{aero:72,chassis:70,power:70,suspension:70,reliability:70},partDetails:{},car:70};for(const node of aggCtx.DEPTS107.aero.nodes)recovery.partDetails[node.id]=72;recovery.partDetails.floor+=2;aggCtx.updateDeptAggregate107(recovery,'aero');assert.strictEqual(recovery.parts.aero,73,'one R&D upgrade must visibly recover a point after an aero regulation reset');
const migratedTimeline={season:2019,startSeason:2016,parts:{aero:80,chassis:80,power:80,suspension:80,reliability:80},car:80,history:[],regulationTransitions:[],aiCarRatings:{Mercedes:98,Ferrari:92}};
api.migrateRegulationTimeline(migratedTimeline);
assert(migratedTimeline.regulationHistory.some(x=>x.season===2017),'2017 regulation reset must be applied to a 2016-start career');
assert(migratedTimeline.regulationHistory.some(x=>x.season===2019),'2019 regulation reset must be applied to a 2016-start career');
const migratedAero=migratedTimeline.parts.aero;api.migrateRegulationTimeline(migratedTimeline);assert.strictEqual(migratedTimeline.parts.aero,migratedAero,'historical regulation migration must be idempotent');
const expirySave={season:2022,name:'Player',drivers:['Player Driver','Current Driver'],roster:{Player:['Player Driver','Current Driver'],Rival:['Departing Driver','Rival Driver']},contracts:{'Player Driver':{expirySeason:2024,status:'Active',playerManaged:true},'Current Driver':{expirySeason:2028,status:'Active'},'Departing Driver':{expirySeason:2022,status:'Active'}},freeAgents:[],history:[]};
api.expireHistoricalContracts(expirySave,2024);
assert.strictEqual(expirySave.contracts['Player Driver'].status,'Expired','player contract expiry must mark the driver released');
assert(!expirySave.roster.Player.includes('Player Driver'),'expired player driver must leave their seat immediately');
assert.strictEqual(expirySave.roster.Player.length,2,'vacant player seat must be filled immediately');
assert.strictEqual(expirySave.contracts['Departing Driver'].status,'Expired','AI driver contract expiry must be processed too');
const afterFirst=c.parts.aero;api.applyRegulationProfile(c,2021,2022);
assert.strictEqual(c.parts.aero,afterFirst,'the same season regulation reset must not apply twice');
assert(api.REGULATIONS[2017].technical.includes('wider front and rear tyres'));
assert(api.REGULATIONS[2019].technical.includes('front wings'));
assert(api.REGULATIONS[2022].technical.includes('ground-effect'));
assert(api.REGULATIONS[2026].technical.includes('active front and rear aero'));
assert.strictEqual(api.historicalExpiry('Nico Rosberg',2016),2017,'historical driver contract should expire after their final real F1 season');
assert(api.historicalExpiry('Lewis Hamilton',2016)>=2028,'long-running historical drivers must not be arbitrarily released in 2018 or all at once in 2027');
for(let y=2016;y<=2026;y++)assert(api.REGULATIONS[y],`regulations missing for ${y}`);

// Extract and run the actual AI contract cycle from the pre-season module.
const start=pre.indexOf('  function runAiContractCycle(c) {');
const end=pre.indexOf('\n  function replaceLegacyPlaceholders(c) {',start);
assert(start>=0&&end>start,'AI contract cycle function must exist');
const contractCtx={window:{},ensurePre10Data:c=>c,ensureAiAcademies:()=>{},allDrivers:()=>['New F1 One','New F1 Two','New F1 Three'],juniorDrivers:()=>[{name:'F2 Rookie',series:'F2',rating:85}],DRIVER_RATING:{'New F1 One':85,'New F1 Two':84,'New F1 Three':83},console};
vm.createContext(contractCtx);vm.runInContext(pre.slice(start,end)+';this.runAiContractCycle=runAiContractCycle;',contractCtx);
const c2={season:2020,name:'Player Team',drivers:['Expired Driver','Contracted Driver'],roster:{'Player Team':['Expired Driver','Contracted Driver'],'AI Team':['AI Expired','AI Contracted']},contracts:{'Expired Driver':{expirySeason:2020,status:'Active'},'Contracted Driver':{expirySeason:2022,status:'Active'},'AI Expired':{expirySeason:2020,status:'Active'},'AI Contracted':{expirySeason:2022,status:'Active'}},freeAgents:[],history:[]};
contractCtx.runAiContractCycle(c2);
assert.strictEqual(c2.contracts['Expired Driver'].status,'Expired','expired player driver must be released');
assert.strictEqual(c2.contracts['AI Expired'].status,'Expired','expired AI driver must be released');
assert(!c2.roster['Player Team'].includes('Expired Driver'));
assert(!c2.roster['AI Team'].includes('AI Expired'));
assert.strictEqual(c2.roster['Player Team'].length,2,'player team should have its vacant seat filled');
assert.strictEqual(c2.roster['AI Team'].length,2,'AI team should have its vacant seat filled');
assert(c2.roster['Player Team'].includes('New F1 One')||c2.roster['Player Team'].includes('New F1 Two'));
assert(!c2.roster['Player Team'].includes('F2 Rookie'),'F2 should not be used when an F1 free agent is available');

for(const f of ['app.js','pre10-overhaul.js','career-overhaul-0106.js','historical-career-0110.js']){
 const {status}=require('child_process').spawnSync(process.execPath,['--check',f],{encoding:'utf8'});
 assert.strictEqual(status,0,`${f} syntax failed`);
}
console.log('0.10.11.0 QA passed: 2019 season grid migration, year-specific 2016–2026 regulation profiles, one-time regulation reset, R&D node synchronization, and immediate contract expiry/replacement.');
