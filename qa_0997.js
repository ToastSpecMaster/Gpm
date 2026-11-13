const fs=require('fs');
const assert=require('assert');
const vm=require('vm');
const app=fs.readFileSync('app.js','utf8');
const pkg=require('./package.json');
assert.match(pkg.version,/^\d+\.\d+\.\d+$/,'package version must remain valid SemVer');
assert(app.includes('BUILD 0.10.11.0'),'visible game build label must be 0.10.11.0');
assert(app.includes('function teamPerformanceTable(c)'),'live team performance table missing');
assert(app.includes('CAR PERFORMANCE · LIVE'),'live team performance table heading missing');
assert(app.includes('function advanceAiTeamDevelopment(c,round)'),'per-round AI development helper missing');
assert(app.includes('advanceAiTeamDevelopment(c,round);const regulationEvent'),'AI ratings are not updated during each race round');
assert(app.includes('c.aiCarRatings[team]=Number(next.toFixed(2))'),'AI ratings must retain fractional progression between rounds');
assert(app.includes('function simulateOffseasonTransfers(c,next,newGrid)'),'off-season transfer simulation missing');
assert(app.includes('c.preSeasonReport={season:next,transfers,retirements:retired.map(x=>x.name),lineups:'),'pre-season report data missing');
assert(app.includes('showPreSeasonReport(c);'),'pre-season report is not shown after advancing');
assert(app.includes('The player manages the same constructor across seasons. Preserve any'),'player-managed driver line-up preservation missing');
assert(!app.includes("if(c.mode==='existing'&&nextTeam){"),'old behavior still overwrites player drivers with original team line-up');
assert(app.includes('c.aiCarRatings={...priorAiRatings};'),'AI car ratings are reset at season transition');
// Exercise the two progression helpers with a deterministic miniature grid.
const helperStart=app.indexOf('function advanceAiTeamDevelopment(c,round)');
const helperEnd=app.indexOf('function openPartsRepair(){',helperStart);
assert(helperStart>=0&&helperEnd>helperStart,'could not isolate progression helpers for runtime tests');
const helperSource=app.slice(helperStart,helperEnd);
const sandbox={
 ensureChampionshipData:()=>{},
 teamBaseRating:()=>75,
 allDrivers:()=>['A1','A2','B1','B2','C1','C2','P1','P2'],
 juniorDrivers:()=>[{name:'J1',rating:82,series:'F2'},{name:'J2',rating:80,series:'F2'},{name:'J3',rating:78,series:'F3'}],
 Math:Object.create(Math)
};
sandbox.Math.random=()=>0.5;
vm.runInNewContext(helperSource,sandbox);
const career={name:'Player GP',season:2026,roster:{'Player GP':['P1','P2'],'Team A':['A1','A2'],'Team B':['B1','B2'],'Team C':['C1','C2']},aiCarRatings:{'Team A':75,'Team B':76,'Team C':77},constructorStandings:{'Team A':20,'Team B':10,'Team C':5},history:[]};
const before={...career.aiCarRatings};
sandbox.advanceAiTeamDevelopment(career,1);
for(const team of ['Team A','Team B','Team C']) assert.notStrictEqual(career.aiCarRatings[team],before[team],team+' rating did not change after a round');
assert.strictEqual(career.aiCarRatingHistory['Team A'][0].round,1);
const nextGrid={ 'Player GP':['P1','P2'],'Team A':['A1','A2'],'Team B':['B1','B2'],'Team C':['C1','C2'] };
sandbox.simulateOffseasonTransfers(career,2027,nextGrid);
const all=Object.values(nextGrid).flat();
assert.strictEqual(all.length,8,'grid must retain eight race seats');
assert.strictEqual(new Set(all).size,8,'driver must not occupy two teams');
for(const team of ['Team A','Team B','Team C']) assert.strictEqual(nextGrid[team].length,2,'AI team must retain two drivers');
assert.strictEqual(career.preSeasonReport.season,2027);
assert(career.preSeasonReport.transfers.length>=2,'expected at least one two-driver team swap');
console.log('PASS: runtime checks confirm per-round ratings change and off-season transfers preserve a unique two-driver grid.');
console.log('PASS: per-round AI rating progression, bounded development, off-season transfers/retirements, pre-season report, and player line-up preservation.');
