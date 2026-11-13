'use strict';
const fs=require('fs');
const app=fs.readFileSync('app.js','utf8');
const hof=fs.readFileSync('gpm-064.js','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const vm=require('vm');
const assert=require('assert');
const checks=[
 ['Season archive snapshots preserve full driver standings',/driverStandings:drivers\.map\(x=>\(\{name:x\.name,points:Number\(x\.points\)\|\|0\}\)\)/.test(hof)],
 ['Season archive snapshots preserve constructors standings',/constructorStandings:teams\.map\(x=>\(\{name:x\.name,points:Number\(x\.points\)\|\|0\}\)\)/.test(hof)],
 ['Archive has an idempotent per-season guard',/seasonArchive\.some\(x=>Number\(x\.season\)===year\)/.test(hof)],
 ['Completed season updates career Hall of Fame once',/if\(!h\.processedSeasons\.includes\(id\)\)/.test(hof)&&/h\.processedSeasons\.push\(id\)/.test(hof)],
 ['Final race automatically archives without requiring next-season click',/if\(Number\(c\.round\|\|0\)>=\(Number\(SEASONS\[c\.season\]\?\.rounds\)\|\|24\)\)archiveCareerSeason064\(c\)/.test(hof)],
 ['Hall of Fame reads permanent season archive',/careerSeasonMap=new Map/.test(hof)],
 ['Hall of Fame displays completed-season count',/COMPLETED SEASONS/.test(hof)],
 ['Unfinished 2026 championship is not pre-awarded',!/\[2026,"Kimi Antonelli","Mercedes"\]/.test(hof)],
 ['Career progression remains open-ended beyond supplied seasons',/SEASONS\[next\]=\{rounds:24,teams:template\.teams\.map/.test(app)],
 ['Version updated to 0.10.11.0',pkg.gpmBuildVersion==='0.10.11.0'],
 ['Broadcast presentation script is included in Windows installer',pkg.build.files.includes('broadcast-ui.js')]
];
let failed=0;
for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++;}
if(failed)process.exit(1);
// Exercise the archive function twice to prove season records and titles are not duplicated.
const start=hof.indexOf('function archiveCareerSeason064(c){');
const end=hof.indexOf('\nfunction recordRaceHallOfFame064',start);
const fn=hof.slice(start,end);
const context={
 SEASONS:{2026:{rounds:2}},
 sortedEntries:(o)=>Object.entries(o).map(([name,points])=>({name,points})).sort((a,b)=>b.points-a.points),
 updateHallOfFame:(c)=>{c.hallOfFame=c.hallOfFame||{drivers:{},constructors:{},records:{}};const h=c.hallOfFame;h.drivers=h.drivers||{};h.constructors=h.constructors||{};h.records=h.records||{};h.processedSeasons=h.processedSeasons||[];},
 saveCareer:()=>{}
};
vm.createContext(context);
vm.runInContext(fn+';this.archiveCareerSeason064=archiveCareerSeason064;',context);
const career={season:2026,round:2,points:26,driverChampPoints:{'Max Verstappen':26,'Charles Leclerc':18},constructorStandings:{'Red Bull Racing':26,'Ferrari':18},raceArchive:[{season:2026,round:1,grid:['Max Verstappen','Charles Leclerc'],results:[{driver:'Max Verstappen',team:'Red Bull Racing',position:1}]},{season:2026,round:2,grid:['Charles Leclerc','Max Verstappen'],results:[{driver:'Charles Leclerc',team:'Ferrari',position:1}]}],hallOfFame:{drivers:{'Max Verstappen':{titles:0,wins:1,podiums:1},'Charles Leclerc':{titles:0,wins:1,podiums:1}},constructors:{},records:{},processedSeasons:[]}};
context.archiveCareerSeason064(career);context.archiveCareerSeason064(career);
assert.strictEqual(career.seasonArchive.length,1,'season archive must contain exactly one record');
assert.strictEqual(career.hallOfFame.drivers['Max Verstappen'].titles,1,'championship title must be counted once');
assert.strictEqual(career.hallOfFame.drivers['Max Verstappen'].wins,1,'race wins must not be double-counted');
assert.strictEqual(career.hallOfFame.drivers['Max Verstappen'].poles,1,'pole record should be captured from starting grids');
assert.strictEqual(career.seasonHistory.length,1,'legacy season history must also receive one record');
console.log('PASS Runtime archive test: season snapshot, one-time title, preserved race stats, pole capture and duplicate prevention.');
console.log(`0.10.9 archive regression QA passed (${checks.length+5} checks).`);
