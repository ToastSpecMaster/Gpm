
'use strict';
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const patch=fs.readFileSync('career-fix-0107.js','utf8');
const app=fs.readFileSync('app.js','utf8');
const index=fs.readFileSync('index.html','utf8');
const pkg=require('./package.json'),sw=fs.readFileSync('sw.js','utf8');
assert.strictEqual(pkg.gpmBuildVersion,'0.10.11.0');
assert(index.includes('career-fix-0107.js'),'new runtime patch must load after the existing career modules');
assert(pkg.build.files.includes('career-fix-0107.js'),'Electron installer must include the new runtime patch');
assert(sw.includes('gpm-shell-v30-01110')&&sw.includes('./career-fix-0107.js'),'PWA cache must include the new runtime patch');
assert(patch.includes("field.addEventListener('input',sync)"),'team-name input must mirror live typed text');
assert(patch.includes("field.addEventListener('keydown',e=>{if(e.key==='Enter')"),'Enter must submit the constructor form');
assert(patch.includes("field.dataset.gpmTeamName=typed"),'team creation must read the mirrored input value');
assert(patch.includes('openUpgradeChooser=openRndTree107'),'R&D button must open the connected development tree');
assert(patch.includes('Requires: ${requires.map'),'R&D nodes must show explicit prerequisites');
assert(patch.includes('c.rndNodeLevels[node.id]=level+1'),'each R&D upgrade must persist its development level');
assert(patch.includes('c.latestDevelopmentMessage=`${node.name} upgraded by'),'latest R&D action must remain in the career save');
assert(patch.includes("reliability:{label:'RELIABILITY'"),'reliability development department must exist');
// Execute the actual department aggregation helper from the patch.
const deptStart=patch.indexOf('const DEPTS107=');
const deptEnd=patch.indexOf('\nfunction works107',deptStart);
const aggStart=patch.indexOf('function updateDeptAggregate107(c,key){');
const aggEnd=patch.indexOf('\nfunction openRndTree107',aggStart);
assert(deptStart>=0&&deptEnd>deptStart&&aggStart>=0&&aggEnd>aggStart,'R&D definitions and aggregation helper must exist');
const sandbox={getPartOverall:c=>Math.round(['aero','chassis','power','suspension','reliability'].reduce((a,k)=>a+c.parts[k],0)/5)};
vm.createContext(sandbox);
vm.runInContext(patch.slice(deptStart,deptEnd)+'\n'+patch.slice(aggStart,aggEnd)+';this.DEPTS107=DEPTS107;this.updateDeptAggregate107=updateDeptAggregate107;',sandbox);
const c={car:70,parts:{aero:70,chassis:70,power:70,suspension:70,reliability:70},partDetails:{}};
for(const n of sandbox.DEPTS107.aero.nodes)c.partDetails[n.id]=70;
c.partDetails.frontWing=74;
sandbox.updateDeptAggregate107(c,'aero');
assert.strictEqual(c.parts.aero,71,'one aero component upgrade must be averaged across the department, not overwrite the entire department rating');
assert.strictEqual(c.car,70,'department rating must feed into the overall car rating without an artificial jump');
assert(sandbox.DEPTS107.reliability.nodes.some(n=>n.id==='engineDurability'),'reliability tree must include power-unit durability');
assert(sandbox.DEPTS107.aero.nodes.some(n=>n.requires&&n.requires.includes('floor')),'advanced aero nodes must have real prerequisites');
for(const f of ['app.js','career-fix-0107.js','career-overhaul-0106.js','steam-overhaul.js']){
 const {status}=require('child_process').spawnSync(process.execPath,['--check',f],{encoding:'utf8'});
 assert.strictEqual(status,0,`${f} syntax check failed`);
}
console.log('0.10.9 regression QA passed: constructor-name input hardening, connected R&D prerequisites, aggregate ratings and persistent upgrade state.');
