const fs=require('fs'),path=require('path');
const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const pre=fs.readFileSync(path.join(__dirname,'pre10-overhaul.js'),'utf8');
const market=fs.readFileSync(path.join(__dirname,'gpm-064.js'),'utf8');
const checks=[
 ['Car development has separate Aero, Chassis, Suspension and Brakes tabs',/aero:\{label:'AERO'/.test(app)&&/chassis:\{label:'CHASSIS'/.test(app)&&/suspension:\{label:'SUSPENSION'/.test(app)&&/brakes:\{label:'BRAKES'/.test(app)],
 ['Aero tab exposes front wing, rear wing, floor, diffuser, beam wing and bodywork',/frontWing/.test(app)&&/rearWing/.test(app)&&/floor/.test(app)&&/diffuser/.test(app)&&/beamWing/.test(app)&&/bargeboards/.test(app)],
 ['Power unit has its own development tab',/\['engine','POWER UNIT'\]/.test(app)&&/gpmDevelopEngineTab/.test(app)],
 ['Customer engine development is locked to works engine ownership',/teamWorksEngine\(c\)/.test(app)&&/CUSTOMER ENGINE · LOCKED/.test(app)],
 ['Power unit tab displays power and reliability',/POWER \$\{c\.enginePower\}\/100 · RELIABILITY \$\{c\.engineReliability\}/.test(app)],
 ['Starting staff are automatically assigned to all six required positions',/function assignStartingStaff\(c\)/.test(app)&&/assignStartingStaff\(c\)/.test(pre)&&/startEngineer/.test(app)&&/pitcrew/.test(app)],
 ['Young driver development increases ratings up to potential',/function advanceYoungDriverDevelopment\(c, round\)/.test(pre)&&/Math\.min\(potential/.test(pre)&&/DRIVER_RATING\[name\]=Math\.round\(after\)/.test(pre)],
 ['Young driver development runs as races advance',/advanceYoungDriverDevelopment\(c,round\)/.test(pre)],
 ['Retirement record stores retirement year',/retirementYear:c\.season/.test(market)],
 ['Hall of Fame lists retired drivers and retirement year',/DRIVER RETIREMENTS · YOUR CAREER/.test(market)&&/x\.retirementYear/.test(market)]
];let failed=0;for(const [label,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${label}`);if(!ok)failed++;}if(failed)process.exit(1);console.log(`0.9.9.5 progression/development QA passed (${checks.length} checks).`);
