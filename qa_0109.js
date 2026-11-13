'use strict';
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const app=fs.readFileSync('app.js','utf8');
const hist=fs.readFileSync('historical-seasons-0109.js','utf8');
const pre=fs.readFileSync('pre10-overhaul.js','utf8');
const index=fs.readFileSync('index.html','utf8');
const pkg=require('./package.json'),sw=fs.readFileSync('sw.js','utf8');
assert.strictEqual(pkg.version,'0.10.11');
assert.strictEqual(pkg.gpmBuildVersion,'0.10.11.0');
assert(index.includes('historical-seasons-0109.js'),'historical season module must load');
assert(hist.includes('fillSeasonSelect();fillTeamSelect();'),'historical module must refresh selectors after app.js initialises');
assert(pkg.build.files.includes('historical-seasons-0109.js'),'Windows build must include historical data');
assert(sw.includes('gpm-shell-v30-01110')&&sw.includes('./historical-seasons-0109.js','./historical-transfers-01095.js'),'service worker must cache historical data');
// Execute actual season data against minimal existing game globals.
const seasons={2022:{rounds:22,teams:[['Modern','#fff',['A','B']]]},2023:{rounds:22,teams:[['Modern','#fff',['A','B']]]},2024:{rounds:24,teams:[['Modern','#fff',['A','B']]]},2025:{rounds:24,teams:[['Modern','#fff',['A','B']]]},2026:{rounds:24,teams:[['Modern','#fff',['A','B']]]}};
const ratings={},teamRatings={},numbers={};const ctx={SEASONS:seasons,DRIVER_RATING:ratings,DRIVER_NUMBERS:numbers,TEAM_BASE_RATINGS:teamRatings,defaultEngineForTeam:()=> 'Mercedes-AMG',window:{getGpmEventName:()=> 'modern'},PU_SUPPLIERS:{},console};
vm.createContext(ctx);vm.runInContext(hist,ctx);
for(const y of [2016,2017,2018,2019,2020,2021]){
 const s=ctx.SEASONS[y];assert(s,`${y} season missing`);assert(s.teams.length>=10,`${y} teams missing`);assert(s.teams.every(t=>t[2].length===2),`${y} does not have two drivers per constructor`);assert(s.teams.flatMap(t=>t[2]).length===s.teams.length*2,`${y} grid count mismatch`);
}
const expected={2016:21,2017:20,2018:21,2019:21,2020:17,2021:22};
const preCalendars=pre.slice(pre.indexOf('const seasonCalendars = {'),pre.indexOf('const seasonCalendar ='));
for(const [y,n] of Object.entries(expected)){assert(ctx.window.getGpmEventName(Number(y),n),`${y} final event missing`);assert(preCalendars.includes(`${y}:`),`${y} calendar missing from calendar centre`);assert.strictEqual(ctx.SEASONS[y].rounds,n,`${y} round count mismatch`);}
assert.strictEqual(ctx.defaultEngineForTeam('McLaren',2016),'Honda');
assert.strictEqual(ctx.defaultEngineForTeam('McLaren',2021),'Mercedes-AMG');
assert.strictEqual(ctx.defaultEngineForTeam('Red Bull Racing',2018),'Renault');
assert.strictEqual(ctx.defaultEngineForTeam('Red Bull Racing',2021),'Honda');
assert.strictEqual(ctx.defaultEngineForTeam('Red Bull Racing',2026),'Ford Red Bull Powertrains');
assert.strictEqual(ctx.defaultEngineForTeam('Aston Martin',2026),'Honda');
assert.strictEqual(ctx.defaultEngineForTeam('Alpine',2026),'Mercedes-AMG');
for(const f of ['app.js','pre10-overhaul.js','historical-seasons-0109.js','career-fix-0107.js','historical-transfers-01095.js']){const {status}=require('child_process').spawnSync(process.execPath,['--check',f]);assert.strictEqual(status,0,`${f} syntax failed`);}
console.log('0.10.9 historical QA passed: 2016–2021 playable season grids, correct constructor counts, two drivers per team, round counts, calendar wiring and era-appropriate engine suppliers.');
