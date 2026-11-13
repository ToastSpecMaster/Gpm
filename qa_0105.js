'use strict';
const fs=require('fs');const assert=require('assert');const vm=require('vm');
const app=fs.readFileSync('app.js','utf8');const hof=fs.readFileSync('gpm-064.js','utf8');const steam=fs.readFileSync('steam-overhaul.js','utf8');const pkg=require('./package.json');
assert.strictEqual(pkg.gpmBuildVersion,'0.10.11.0');
assert.match(app,/allDrivers=function\(year\)\{return originalAllDrivers063\(year\)/,'modern grid must not append historical legends');
assert.match(app,/const fallback=\[\.\.\.juniors\.map\(d=>\(\{name:d\.name,rating:d\.rating,series:d\.series\}\)\),\.\.\.activeGrid\]/,'roster fallback must use current drivers/juniors only');
assert.match(app,/if\(next>2026\)simulateOffseasonTransfers/,'known 2022-26 season grids must not be randomly reshuffled');
assert.match(app,/latestDevelopmentMessage/,'R&D latest action must persist');
assert.match(app,/reliability:\{label:'RELIABILITY'/,'R&D reliability department missing');
assert.doesNotMatch(app,/c\.car=Math\.max\(60,Math\.min\(95,\(Number\(c\.car\)\|\|70\)-2\)\)/,'car rating must not drop automatically at season transition');
assert.doesNotMatch(app,/c\.parts\[k\]=Math\.max\(55,\(Number\(c\.parts\[k\]\)\|\|75\)-\.12\)/,'passive component wear must be removed');
assert.match(app,/gpm-archive-podium/,'archive must open a podium view first');
assert.match(app,/gpm-preseason-team-card/,'pre-season grid should use team cards');
assert.match(hof,/careerSeasonRecords/,'career champion history must merge into the Hall of Fame');
assert.match(steam,/reputationFactor/,'team reputation must affect sponsor income');
assert.match(steam,/data-career-driver/,'career portrait hooks missing');
console.log('0.10.9 career realism QA passed.');
// Runtime migration check: legacy Senna/Prost entries are removed from a modern save.
const begin=app.indexOf('const HISTORICAL_DRIVERS_063=');
const finish=app.indexOf('\nfunction openDriverMarket(){',begin);
assert(begin>=0&&finish>begin,'could not isolate modern-roster repair helpers');
const helper=app.slice(begin,finish);
const sandbox={
 SEASONS:{2022:{teams:[['Alpine','#09c',['Fernando Alonso','Esteban Ocon']],['Aston Martin','#060',['Sebastian Vettel','Lance Stroll']]]},2023:{teams:[['Williams','#fff',['Alexander Albon','Logan Sargeant']],['Ferrari','#f00',['Charles Leclerc','Carlos Sainz']]]}},
 DRIVER_RATING:{},currentCareer:null,
 allDrivers:(year)=>year===2022?['Fernando Alonso','Esteban Ocon','Sebastian Vettel','Lance Stroll']:['Alexander Albon','Logan Sargeant','Charles Leclerc','Carlos Sainz','Esteban Ocon','Pierre Gasly'],
 juniorDrivers:()=>[{name:'Theo Pourchaire',series:'F2',rating:84},{name:'Felipe Drugovich',series:'F2',rating:83},{name:'Victor Martins',series:'F2',rating:80}],
 careerRoster:()=>({}),
};
vm.createContext(sandbox);vm.runInContext(helper+';this.ensureRoster=ensureRoster;',sandbox);
const legacy={season:2023,name:'Williams',mode:'existing',drivers:['Ayrton Senna','Alain Prost'],roster:{Williams:['Ayrton Senna','Alain Prost'],Ferrari:['Charles Leclerc','Carlos Sainz']},reserves:[],history:[]};
sandbox.ensureRoster(legacy);
assert.strictEqual(legacy.drivers.length,2,'modern player team must retain two drivers after migration');
assert(!legacy.drivers.includes('Ayrton Senna')&&!legacy.drivers.includes('Alain Prost'),'retired legends must not remain in modern race seats');
assert.strictEqual(new Set(Object.values(legacy.roster).flat()).size,4,'modern grid must not contain duplicate driver assignments');
const active2022={season:2022,name:'Alpine',mode:'existing',drivers:['Fernando Alonso','Esteban Ocon'],roster:{Alpine:['Fernando Alonso','Esteban Ocon'], 'Aston Martin':['Sebastian Vettel','Lance Stroll']},reserves:[],history:[]};
sandbox.ensureRoster(active2022);
assert(active2022.drivers.includes('Fernando Alonso'),'Alonso must remain on Alpine in 2022');
assert(active2022.roster['Aston Martin'].includes('Sebastian Vettel'),'Vettel must remain on Aston Martin in 2022');
console.log('PASS Runtime season-aware migration removes Senna/Prost from 2023 while preserving Alonso and Vettel on their real 2022 grids.');
