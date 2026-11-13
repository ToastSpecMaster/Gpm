const fs=require('fs');const path=require('path');const root=__dirname;const app=fs.readFileSync(path.join(root,'app.js'),'utf8');const market=fs.readFileSync(path.join(root,'gpm-064.js'),'utf8');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const checks=[
 ['Driver negotiations no longer depend on prompt()',(()=>{const a=market.indexOf('function negotiateDriver(name,series){'),b=market.indexOf('function openTeamContracts064',a);return a>=0&&b>a&&market.slice(a,b).includes('showCareerModal')&&!market.slice(a,b).includes('prompt(')})()],
 ['Academy signing has a dedicated in-game path',/gpmOfferPath/.test(market)&&/series\+' driver signed'/.test(market)],
 ['F2 promotion lets the player choose either F1 seat',/gpmJuniorSeat/.test(market)&&/Number\(root.querySelector\('#gpmJuniorSeat'\)/.test(market)],
 ['Contract offer validates budget, salary, years and bonus',/Insufficient budget/.test(market)&&/gpmOfferSalary/.test(market)&&/gpmOfferYears/.test(market)&&/gpmOfferBonus/.test(market)],
 ['Duplicate Driver Ecosystem block removed',!/DRIVER ECOSYSTEM/.test(market)&&!/gpmOpenMarket/.test(market)],
 ['Power unit excluded from generic upgrade packages',/function openUpgradeChooser\(/.test(app)&&/aero:\{label:'AERO'/.test(app)&&/chassis:\{label:'CHASSIS'/.test(app)&&!/\['power','Power unit'/.test(app)],
 ['Dedicated PU and gearbox supplier window exists',/function openTechnicalSuppliers\(/.test(app)&&/ENGINE CONTRACTS/.test(app)&&/GEARBOX CONTRACTS/.test(app)],
 ['Technical supplier window is reachable from the management dock',/data-do=\"technical\"/.test(fs.readFileSync(path.join(root,'pre10-overhaul.js'),'utf8'))&&/window\.openGpmTechnicalSuppliers=openTechnicalSuppliers/.test(app)],
 ['Mid-season supplier switching is supported',/c\.technicalChanges\.push/.test(app)&&/SWITCH SUPPLIER/.test(app)],
 ['Works-engine ownership gates engine development',/function teamWorksEngine\(/.test(app)&&/Only your own works power unit can be developed/.test(app)],
 ['Own Works supplier is selectable during custom team setup',/option>Own Works<\/option>/.test(html)&&/engineSupplier:mode==='team'\?\$\('engineSupplier'\)\.value/.test(app)]
];let failed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++;}if(failed)process.exit(1);console.log(`0.9.9.2 technical update QA passed (${checks.length} checks).`);
