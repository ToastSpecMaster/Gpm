const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const checks = [
  ['Team name is a real text input', /<input id="teamName" type="text"[^>]*>/.test(html)],
  ['Modal dynamic content uses a DIV container', /<div id="modalText" class="modal-description">/.test(html)],
  ['Create button is explicitly non-submit', /<button class="primary-btn" id="createBtn" type="button">/.test(html)],
  ['My Team flow reveals and focuses the input', /if\(mode==='team'\)\{\$\('teamName'\)\.value='';requestAnimationFrame\(\(\)=>\$\('teamName'\)\.focus\(\)\);\}/.test(app)],
  ['Career save is guarded against storage errors', /try\{localStorage\.setItem\('gpm-careers',JSON\.stringify\(\[\.\.\.saves,c\]\)\);\}\s*catch\(error\)/.test(app)],
  ['Home front page contains all three career modes', ['data-mode="team"','data-mode="existing"','id="driverCareerModeBtn"'].every(x => html.includes(x))],
  ['Existing save lists remain mounted', ['id="saveCount"','id="saveList"','id="dcSavedList"'].every(x => html.includes(x))],
  ['Front page redesign styles are present', ['.home-hero','.home-mode-grid','.home-dashboard-grid'].every(x => css.includes(x))]
];
let failed = 0;
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
if (failed) process.exit(1);
console.log(`Team Creator + home screen QA passed (${checks.length} checks).`);
