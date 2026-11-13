const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const pkg = require('./package.json');
let failed = 0;
function check(name, ok) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
check('Windows package version is valid SemVer', /^\d+\.\d+\.\d+$/.test(pkg.version));
check('Car rating uses validated department values', app.includes('function getPartOverall(c){const p=c.parts||{};const vals=') && app.includes('Math.min(100,Math.round(vals.reduce'));
check('Missing department ratings migrate from saved car rating', app.includes('c.parts.aero=Number.isFinite(c.parts.aero)?c.parts.aero:(Number(c.car)||70)'));
check('AI car ratings receive bounded between-season development', app.includes('const priorAiRatings={...(c.aiCarRatings||{})}') && app.includes('const development=.12+(Math.random()*.24-.12)') && app.includes('c.aiCarRatings={...priorAiRatings};'));
check('3D garage is intentionally removed from visible navigation', !html.includes('data-nav="garage"') && !html.includes('type="module" src="./car-viewer.js"'));
if (failed) process.exit(1);
console.log('Windows package regression QA passed.');
