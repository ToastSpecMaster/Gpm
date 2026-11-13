'use strict';
const fs=require('fs');
const vm=require('vm');
const assert=require('assert');
const app=fs.readFileSync('app.js','utf8');
const start=app.indexOf('const F1DB_INDIANAPOLIS_ROUND=');
const end=app.indexOf('async function loadGpmF1DBSeason',start);
assert(start>=0&&end>start,'F1DB loader block exists');
const fixture=`- entrantId: ferrari-works
  constructorId: ferrari
  drivers:
    - driverId: juan-manuel-fangio
      rounds: 1-7
    - driverId: alberto-ascari
      rounds: 1-6
    - driverId: peter-whitehead
      rounds: 3
- entrantId: indy-privateer
  constructorId: kurtis-kraft
  drivers:
    - driverId: bill-vukovich
      rounds: 3
`;
const context={console,window:{},localStorage:{getItem(){return null},setItem(){}},fetch:()=>{throw new Error('fetch should not run in parser test')}};
vm.createContext(context);
vm.runInContext(app.slice(start,end)+`\nglobalThis.__parsed=parseF1DBEntrants(1950,${JSON.stringify(fixture)});globalThis.__calendarName=f1dbCalendarName('great-britain');globalThis.__rounds=f1dbRounds('1-2,4,6-7');`,context);
const teams=JSON.parse(JSON.stringify(context.__parsed));
assert.deepStrictEqual(teams.map(t=>t[0]),['Ferrari'],'Indianapolis-only entrant is excluded');
assert.deepStrictEqual(teams[0][2],['Juan Manuel Fangio','Alberto Ascari'],'two most-used Ferrari drivers are retained');
assert.strictEqual(context.__calendarName,'Great Britain');
assert.deepStrictEqual(Array.from(context.__rounds),[1,2,4,6,7]);
assert.match(app,/for\(let y=1950;y<=2015;y\+\+\)/,'1950–2015 season placeholders are registered');
assert.match(app,/SEASONS\[2027\]=\{rounds:24/,'2027 season is registered with 24 rounds');
assert.match(app,/sprintRounds:\[1,3,4,7,8,10,14,21,23,24\]/,'2027 ten sprint rounds are present');
assert.match(app,/window\.getGpmEventName\?window\.getGpmEventName\(c\.season,c\.round\)/,'race simulation uses season-specific event names');
assert.match(app,/function juniorDrivers\(year\)\{const y=Number\(year\)\|\|2026;if\(y<2022\)return \[\]/,'modern junior pool is not injected into pre-2022 seasons');
const historical=fs.readFileSync('historical-seasons-0109.js','utf8');
assert.match(historical,/window\.GPM_SEASON_CALENDARS\?\./,'dynamic F1DB calendars override the generic calendar');
const sw=fs.readFileSync('sw.js','utf8');
for(const asset of ['ui-motion.js','historical-seasons-0109.js','historical-career-0110.js','apple-touch-icon.png','icon-192.png','icon-512.png'])assert(sw.includes(asset),`service worker precaches ${asset}`);
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
for(const icon of manifest.icons)assert(fs.existsSync(icon.src),`PWA icon exists: ${icon.src}`);
assert(fs.existsSync('apple-touch-icon.png'),'Apple touch icon exists');
assert(fs.readFileSync('index.html','utf8').includes('apple-touch-icon.png'),'iOS uses PNG Apple touch icon');
assert(fs.existsSync('F1DB_ATTRIBUTION.txt'),'F1DB attribution file exists');
console.log('GPM 0.10.11.0 QA passed: historical parser fixture, Indy 500 exclusion, 2027 calendar/sprints, season event routing, historical junior isolation, service-worker assets and iOS icons.');
