const fs=require('fs');const path=require('path');const src=fs.readFileSync(path.join(__dirname,'gpm-064.js'),'utf8');
const helperStart=src.indexOf('function ensureAllTeamContracts064('),start=src.indexOf('function openTeamContracts064('),end=src.indexOf('function manageContracts064(',start);const helper=src.slice(helperStart,start),block=src.slice(start,end);
const checks=[
 ['Team contract roster helper exists (prevents the 0.9.9.3 ReferenceError)',helperStart>=0&&helper.includes('c.teamStaffContracts=c.teamStaffContracts||{}')],
 ['Contract roster includes race engineers, starting engineers, strategist and pit crew',helper.includes('roster.engineer')&&helper.includes('roster.startEngineer')&&helper.includes('roster.strategist')&&helper.includes('roster.pitcrew')],
 ['Staff contract records receive safe defaults',helper.includes('expirySeason:Number(existing.expirySeason??(Number(c.season)+2))')&&helper.includes("status:existing.status||'Active'")],
 ['Contract renewal uses an in-game extension window',block.includes('EXTEND CONTRACT')&&block.includes('gpmExtensionSalary')],
 ['Contract renewal no longer uses native prompt dialogs',!block.includes('prompt(')],
 ['Extension adds seasons to the existing expiry date',/Math\.max\(Number\(c\.season\)\|\|0,oldExpiry\)\+years/.test(block)],
 ['Original contract start date is preserved',! /ct\.startSeason\s*=/.test(block)],
 ['Renewal salary, term and bonus are validated',block.includes('gpmExtensionSalary')&&block.includes('gpmExtensionYears')&&block.includes('gpmExtensionBonus')&&block.includes('Choose between one and five additional seasons')],
 ['Renewal bonus checks and deducts available budget',block.includes('Insufficient budget for the')&&/c\.budget=\(Number\(c\.budget\)\|\|0\)-bonus/.test(block)],
 ['Expiry preview updates as extension term changes',block.includes("addEventListener('input',updateExpiry)")],
 ['Successful extension saves, logs inbox update and refreshes contracts',block.includes("addInbox(c,'Contract extended'")&&block.includes('saveCareer();renderCareer();editor.hidden=true;openTeamContracts064(name)')],
 ['Responsive extension window styles exist',fs.readFileSync(path.join(__dirname,'style.css'),'utf8').includes('.gpm-extension-fields')]
];let failed=0;for(const [label,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${label}`);if(!ok)failed++;}if(failed)process.exit(1);console.log(`Contract extension QA passed (${checks.length} checks).`);
