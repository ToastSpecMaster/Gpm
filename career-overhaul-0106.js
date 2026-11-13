/* Grand Prix Manager 0.10.6 — career simulation and management overhaul.
   This module intentionally patches the existing game systems rather than adding parallel mock screens. */
(() => {
'use strict';
const $g=id=>document.getElementById(id);
const safeSave=()=>{try{saveCareer();renderCareer();renderSaves();}catch(e){console.warn('Career save/render refresh:',e);}};
const log=(c,title,text)=>{c.history=c.history||[];c.history.push({title,text,date:`Season ${c.season} · Round ${c.round||0}`});};
const unique=a=>[...new Set((a||[]).filter(Boolean))];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

// Modern grids must never absorb a historical driver by accident. Prime variants are separate selectable entries.
const ensureRoster0106=ensureRoster;
ensureRoster=function(c){
  ensureRoster0106(c);
  if(!c||Number(c.season)<2022)return;
  const activeSeasonNames=new Set(allDrivers(c.season)||[]);const historic=new Set((typeof HISTORICAL_NAMES_063!=='undefined'?HISTORICAL_NAMES_063:[]).filter(n=>!String(n).endsWith('(Prime)')&&!activeSeasonNames.has(n)));
  Object.keys(c.roster||{}).forEach(team=>{c.roster[team]=unique((c.roster[team]||[]).filter(n=>!historic.has(n)));});
  c.drivers=unique((c.roster[c.name]||c.drivers||[]).filter(n=>!historic.has(n))).slice(0,2);
  const occupied=new Set(Object.entries(c.roster||{}).filter(([team])=>team!==c.name).flatMap(([,ds])=>ds||[]));
  const pool=[...(allDrivers(c.season)||[]).map(name=>({name,rating:DRIVER_RATING[name]||75,series:'F1'})),...(juniorDrivers(c.season)||[]).filter(d=>['F2','F3'].includes(d.series)&&Number(d.rating)>=84).sort((a,b)=>b.rating-a.rating)];
  while(c.drivers.length<2){const pick=pool.find(d=>!occupied.has(d.name)&&!c.drivers.includes(d.name)&&!historic.has(d.name));if(!pick)break;c.drivers.push(pick.name);}
  c.roster[c.name]=[...c.drivers];
};

// Prime-era editions are independent market identities, including drivers still active in the chosen season.
function primePool0106(c){
 const current=(allDrivers(c.season)||[]).map(n=>({name:`${n} (Prime)`,series:'Prime / Historical form',rating:clamp((DRIVER_RATING[n]||85)+4,88,98)}));
 const existing=(typeof HISTORICAL_DRIVERS_063!=='undefined'?HISTORICAL_DRIVERS_063:[]).filter(x=>String(x[0]).endsWith('(Prime)')).map(([name,rating,description])=>({name,series:'Prime / Historical form',rating,description}));
 return unique([...existing,...current].map(x=>x.name)).map(n=>[...existing,...current].find(x=>x.name===n));
}
function freeMarket0106(c){
 const assigned=new Set(Object.values(c.roster||{}).flat());
 const userOut=(c.freeAgents||[]).map(n=>({name:n,series:'Free Agent',rating:DRIVER_RATING[n]||78}));
 const base=(typeof FREE_AGENT_POOL_063!=='undefined'?FREE_AGENT_POOL_063:[]).filter(([n])=>!assigned.has(n)&&!HISTORICAL_NAMES_063.includes(n)).map(([name,rating])=>({name,series:'Free Agent',rating}));
 const juniors=(juniorDrivers(c.season)||[]).filter(d=>['F2','F3'].includes(d.series)&&Number(d.rating)>=76);
 const primes=primePool0106(c);
 return unique([...userOut,...base,...juniors,...primes].map(x=>x.name)).map(n=>[...userOut,...base,...juniors,...primes].find(x=>x.name===n)).filter(x=>!assigned.has(x.name)||x.series==='Prime / Historical form');
}
openDriverMarket=function(){
 if(!currentCareer)return;const c=currentCareer;ensureRoster(c);
 const options=freeMarket0106(c).filter(d=>!c.drivers.includes(d.name)&&!(c.reserves||[]).includes(d.name));
 const select=$g('transferDriver');select.innerHTML=options.map(d=>`<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)} · ${escapeHtml(d.series)} · ${d.rating} OVR</option>`).join('');
 $g('transferIntro').textContent=`${c.name} · ${c.season}. Choose the replacement first, then choose the exact seat. Drivers contracted to another F1 team are not available in this release menu; use contract negotiations for transfers.`;
 $g('transferSeat').innerHTML='<option value="0">REPLACE CAR 1 · LEAD DRIVER</option><option value="1">REPLACE CAR 2 · SECOND DRIVER</option><option value="2">SIGN AS F2 / F3 RESERVE</option>';
 $g('transferModal').hidden=false;updateMarketDetail();
};
updateMarketDetail=function(){
 if(!currentCareer)return;const c=currentCareer,n=$g('transferDriver').value,d=freeMarket0106(c).find(x=>x.name===n);if(!d){$g('marketDetail').textContent='No eligible replacement selected.';return;}
 const prime=d.series==='Prime / Historical form';const junior=['F2','F3'].includes(d.series);
 $g('marketDetail').innerHTML=`<div class="gpm-transfer-portrait" data-transfer-portrait="${escapeHtml(n)}"><span>${escapeHtml(n.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span></div><b>${escapeHtml(n)}</b> · ${escapeHtml(d.series)} · ${d.rating} OVR<br>${prime?'Prime-era alternate identity. This does not remove the original driver from the active grid.':junior?'Feeder-series driver. Promotion is limited to F2/F3 and eligibility is checked at signing.':'Uncontracted driver. Signing releases the outgoing driver into the free-agent pool.'}`;
 if(window.GPMDriverPortraits?.lookup)window.GPMDriverPortraits.lookup(n,c.season).then(photo=>{const el=$g('marketDetail')?.querySelector('.gpm-transfer-portrait');if(el&&photo?.url){el.style.backgroundImage=`url(\"${photo.url}\")`;el.classList.add('has-portrait');el.title=`${photo.artist||'Photographer unknown'} · ${photo.licence||'Licence unknown'}`;}}).catch(()=>{});
};
confirmDriverTransfer=function(){
 if(!currentCareer)return;const c=currentCareer;ensureRoster(c);const candidate=$g('transferDriver').value,seat=Number($g('transferSeat').value),d=freeMarket0106(c).find(x=>x.name===candidate);
 if(!d){showToast('Choose an available driver first.');return;}
 const junior=['F2','F3'].includes(d.series),prime=d.series==='Prime / Historical form';
 if(seat===2){if(!junior){showToast('Only current F2 or F3 drivers can join the reserve programme.');return;}if((c.reserves||[]).includes(candidate)){showToast('That driver is already in your reserve programme.');return;}const fee=Math.max(.8,Number(d.rating-70)*.12);if(Number(c.budget)<fee){showToast(`Reserve signing fee: €${fee.toFixed(1)}M.`);return;}c.budget-=fee;c.reserves=c.reserves||[];c.reserves.push(candidate);c.reserveStats=c.reserveStats||{};c.reserveStats[candidate]={series:d.series,starts:0,points:0,lastRating:d.rating};log(c,'Junior driver signed',`${candidate} joined the ${d.series} reserve programme for €${fee.toFixed(1)}M.`);safeSave();$g('transferModal').hidden=true;showToast(`${candidate} signed as a reserve.`);return;}
 if(seat!==0&&seat!==1){showToast('Choose a valid race seat.');return;}
 if(junior&&d.series!=='F2'){showToast('F3 drivers must first progress to Formula 2 before receiving an F1 race seat.');return;}
 if(candidate===c.drivers[1-seat]){showToast('That driver already occupies the other race seat.');return;}
 const outgoing=c.drivers[seat];if(!outgoing){showToast('The selected seat is empty.');return;}
 c.freeAgents=unique([...(c.freeAgents||[]),outgoing]);c.drivers[seat]=candidate;c.roster[c.name]=[...c.drivers];c.reserves=(c.reserves||[]).filter(n=>n!==candidate);if(c.reserveStats)delete c.reserveStats[candidate];
 c.driverPoints=c.driverPoints||[0,0];c.driverPoints[seat]=0;c.driverChampPoints=c.driverChampPoints||{};c.driverChampPoints[candidate]=c.driverChampPoints[candidate]||0;
 c.contracts=c.contracts||{};c.contracts[candidate]={startSeason:c.season,expirySeason:c.season+2,annualSalary:Math.max(1,Math.round(d.rating*.035*10)/10),length:2,signingBonus:0,status:'Active',primeEdition:prime,playerManaged:true};
 log(c,'Driver replacement completed',`${candidate} joined ${c.name} in Car ${seat+1}, replacing ${outgoing}. ${outgoing} is now an uncontracted free agent. The original driver remains in the historical/active database under their own identity.`);
 safeSave();$g('transferModal').hidden=true;showToast(`${candidate} signed. ${outgoing} released to free agency.`);
};

// The original setup() registered handlers before this patch loaded. Capture clicks first so the new market and R&D flows receive the action.
$g('transferDriver')?.addEventListener('change',e=>{e.stopImmediatePropagation();updateMarketDetail();},true);
$g('confirmTransferBtn')?.addEventListener('click',e=>{e.stopImmediatePropagation();confirmDriverTransfer();},true);
$g('upgradeBtn')?.addEventListener('click',e=>{e.stopImmediatePropagation();openUpgradeChooser();},true);

// Contract-led AI movement. A small number of seats change only when contracts expire or a driver is clearly underperforming.
simulateOffseasonTransfers=function(c,next,newGrid){
 const queuedRetired=new Set((c.retirementQueue||[]).map(r=>r.name));
 Object.keys(newGrid).filter(t=>t!==c.name).forEach(t=>{newGrid[t]=(newGrid[t]||[]).filter(n=>!queuedRetired.has(n));});
 const teams=Object.keys(newGrid).filter(t=>t!==c.name);
 c.driverSeasonsInF1=c.driverSeasonsInF1||{};c.contracts=c.contracts||{};c.driverDevelopment=c.driverDevelopment||{};
 const ratings=n=>Number(DRIVER_RATING[n]||juniorDrivers(next).find(x=>x.name===n)?.rating||76);
 const transfers=[],promoted=[];
 teams.forEach(team=>{
  const lineup=newGrid[team]||[];
  lineup.forEach(n=>{c.driverSeasonsInF1[n]=(Number(c.driverSeasonsInF1[n])||0)+1;c.contracts[n]=c.contracts[n]||{startSeason:next-1,expirySeason:next+1,annualSalary:Math.round(ratings(n)*.035*10)/10,status:'Active'};});
 });
 const used=new Set([...(c.drivers||[]),...teams.flatMap(t=>newGrid[t]||[])]);
 // Retirement decisions are recorded by the career contract/age system before this transition.
 // One or two contract expiries may trigger a transfer; no compulsory random team swaps.
 const candidates=teams.flatMap(team=>(newGrid[team]||[]).map((name,index)=>({team,name,index,contract:c.contracts[name]||{},rating:ratings(name)})));
 const expiring=candidates.filter(x=>Number(x.contract.expirySeason||next+1)<=next&&x.rating<96).sort((a,b)=>a.rating-b.rating);
 const moveBudget=Math.random()<.52?1:0;
 for(const leaver of expiring.slice(0,moveBudget)){
   const destinations=teams.filter(t=>t!==leaver.team).map(team=>({team,need:(newGrid[team]||[]).some(n=>ratings(n)<leaver.rating-5),rep:Number(c.teamReputation?.[team]||50)})).filter(x=>x.need).sort((a,b)=>b.rep-a.rep);
   if(!destinations.length)continue;
   const destination=destinations[0].team;const replacementPool=(juniorDrivers(next)||[]).filter(d=>d.series==='F2'&&d.rating>=80&&!used.has(d.name)).sort((a,b)=>b.rating-a.rating);
   const underperformer=(newGrid[destination]||[]).map((name,index)=>({name,index,rating:ratings(name)})).sort((a,b)=>a.rating-b.rating)[0];
   if(!underperformer||underperformer.rating>=leaver.rating-5)continue;
   const oldTeam=leaver.team,newTeam=destination;
   newGrid[oldTeam][leaver.index]=underperformer.name;newGrid[newTeam][underperformer.index]=leaver.name;
   c.contracts[leaver.name]={startSeason:next,expirySeason:next+2,annualSalary:Math.round(leaver.rating*.04*10)/10,status:'Active'};
   c.contracts[underperformer.name]={startSeason:next,expirySeason:next+1,annualSalary:Math.round(underperformer.rating*.032*10)/10,status:'Active'};
   transfers.push({name:leaver.name,from:oldTeam,to:newTeam},{name:underperformer.name,from:newTeam,to:oldTeam});
 }
 // Limit F2/F3 graduates to at most one or two per season across the entire grid.
 const seen=new Set(c.drivers||[]);teams.forEach(t=>(newGrid[t]||[]).forEach(n=>seen.add(n)));
 teams.forEach(t=>{newGrid[t]=unique(newGrid[t]).slice(0,2);while(newGrid[t].length<2){const fallback=(allDrivers(next)||[]).find(n=>!queuedRetired.has(n)&&!seen.has(n));if(!fallback)break;newGrid[t].push(fallback);seen.add(fallback);}});
 c.history=c.history||[];
 transfers.forEach(x=>c.history.push({title:'Driver contract transfer',text:`${x.name} moved from ${x.from} to ${x.to} after the contract window.`,date:`Season ${next} · Pre-season`}));
 promoted.forEach(n=>c.history.push({title:'F2 graduate promoted',text:`${n} earned an F1 promotion after feeder-series progression.`,date:`Season ${next} · Pre-season`}));
 c.preSeasonReport={season:next,transfers,retirements:(c.retirementQueue||[]).filter(r=>Number(r.announcedSeason)===Number(next)-1).map(r=>r.name),promotions:promoted,lineups:Object.fromEntries(Object.entries(newGrid).map(([t,ds])=>[t,[...ds]])),reserveLineups:Object.fromEntries(Object.entries(c.aiReserves||{}).map(([t,n])=>[t,[n]]))};
};

// Remove forced random seat swaps from the 0.10.5 transition wrapper; the contract model above owns movement.
// (The wrapper is patched in gpm-064.js by the build script.)

// Career champion archive is rebuilt from the final championship table, replacing a stale record for that year.
function archiveCareerSeason0106(c){
 if(!c)return false;const year=Number(c.season),rounds=Number(SEASONS[year]?.rounds||24);if(Number(c.round||0)<rounds)return false;
 c.seasonArchive=Array.isArray(c.seasonArchive)?c.seasonArchive:[];c.seasonHistory=Array.isArray(c.seasonHistory)?c.seasonHistory:[];
 const d=sortedEntries(c.driverChampPoints||{}),k=sortedEntries(c.constructorStandings||{}),races=(c.raceArchive||[]).filter(r=>Number(r.season)===year);
 const wins={},podiums={},poles={};races.forEach(r=>{(r.results||[]).forEach(x=>{if(!x.driver)return;if(Number(x.position)===1)wins[x.driver]=(wins[x.driver]||0)+1;if(Number(x.position)<=3)podiums[x.driver]=(podiums[x.driver]||0)+1;});(r.grid||r.startingGrid||[]).forEach((x,i)=>{const n=typeof x==='string'?x:(x.driver||x.name);if(n&&i===0)poles[n]=(poles[n]||0)+1;});});
 const snap={season:year,completedAt:new Date().toISOString(),driverChampion:d[0]?.name||'—',driverPoints:d[0]?.points||0,constructorChampion:k[0]?.name||'—',constructorPoints:k[0]?.points||0,driverStandings:d.map(x=>({name:x.name,points:Number(x.points)||0})),constructorStandings:k.map(x=>({name:x.name,points:Number(x.points)||0})),raceCount:races.length,driverWins:wins,driverPodiums:podiums,driverPoles:poles};
 const idx=c.seasonArchive.findIndex(x=>Number(x.season)===year);if(idx>=0)c.seasonArchive[idx]=snap;else c.seasonArchive.push(snap);
 const hi=c.seasonHistory.findIndex(x=>Number(x.season)===year);const history={season:year,driverChampion:snap.driverChampion,driverPoints:snap.driverPoints,constructorChampion:snap.constructorChampion,constructorPoints:snap.constructorPoints,completedAt:snap.completedAt};if(hi>=0)c.seasonHistory[hi]=history;else c.seasonHistory.push(history);
 c.hallOfFame=c.hallOfFame||{drivers:{},constructors:{},records:{}};const h=c.hallOfFame;h.drivers=h.drivers||{};h.constructors=h.constructors||{};h.processedSeasons=h.processedSeasons||[];
 // Recalculate season title totals from the archive so editing/replaying a season never duplicates titles.
 const all=c.seasonArchive.slice().sort((a,b)=>a.season-b.season);const titleCounts={};all.forEach(s=>{if(s.driverChampion&&s.driverChampion!=='—')titleCounts[s.driverChampion]=(titleCounts[s.driverChampion]||0)+1;});
 Object.entries(h.drivers).forEach(([n,v])=>{if(v&&v.careerTitlesFromArchive!==undefined)v.titles=titleCounts[n]||0;});Object.entries(titleCounts).forEach(([n,count])=>{h.drivers[n]=h.drivers[n]||{wins:0,podiums:0,poles:0};h.drivers[n].titles=count;h.drivers[n].careerTitlesFromArchive=true;h.drivers[n].championshipYears=all.filter(s=>s.driverChampion===n).map(s=>Number(s.season));});
 const teamCounts={};all.forEach(s=>{if(s.constructorChampion&&s.constructorChampion!=='—')teamCounts[s.constructorChampion]=(teamCounts[s.constructorChampion]||0)+1;});Object.entries(teamCounts).forEach(([n,count])=>{h.constructors[n]=h.constructors[n]||{wins:0};h.constructors[n].titles=count;});
 h.records=h.records||{};const best=(field)=>Object.entries(h.drivers).sort((a,b)=>(Number(b[1][field])||0)-(Number(a[1][field])||0))[0]?.[0]||'—';h.records.mostWins=best('wins');h.records.mostPodiums=best('podiums');h.records.mostPoles=best('poles');h.records.mostTitles=best('titles');h.records.lastDriversChampion=snap.driverChampion;h.records.lastConstructorsChampion=snap.constructorChampion;
 saveCareer();return true;
};
window.archiveCareerSeason0106=archiveCareerSeason0106;
const oldSeasonSummary0106=showSeasonEndSummary;showSeasonEndSummary=function(c){archiveCareerSeason0106(c);oldSeasonSummary0106(c);};
const oldHallOfFame0106=window.openGpmHallOfFame;window.openGpmHallOfFame=function(){if(currentCareer&&Number(currentCareer.round)>=(SEASONS[currentCareer.season]?.rounds||24))archiveCareerSeason0106(currentCareer);if(typeof oldHallOfFame0106==='function')oldHallOfFame0106();};

// A complete department tree: each node is a real upgrade that changes the underlying car model.
openUpgradeChooser=function(initialTab='aero'){
 if(!currentCareer)return;const c=currentCareer;ensureChampionshipData(c);ensureTechnicalState(c);c.partDetails=c.partDetails||{};
 const departments={
  aero:{label:'AERODYNAMICS',key:'aero',parts:[['frontWing','Front wing',3.5,2],['rearWing','Rear wing',3.8,2],['floor','Floor & underfloor',5.2,2],['diffuser','Diffuser',4.2,1],['beamWing','Beam wing',3.0,1]]},
  chassis:{label:'CHASSIS & WEIGHT',key:'chassis',parts:[['monocoque','Monocoque',4.8,2],['weight','Weight reduction',5.5,2],['cooling','Cooling package',3.4,1],['brakeDucts','Brake ducts',2.8,1]]},
  suspension:{label:'SUSPENSION',key:'suspension',parts:[['frontSuspension','Front suspension',3.2,2],['rearSuspension','Rear suspension',3.4,2],['dampers','Dampers',2.7,1],['steering','Steering system',2.4,1]]},
  reliability:{label:'RELIABILITY',key:'reliability',parts:[['engineDurability','Engine durability',4.0,2],['gearboxDurability','Gearbox durability',3.5,2],['hydraulics','Hydraulic systems',2.8,1],['coolingReliability','Cooling reliability',2.9,1]]},
  power:{label:'POWER UNIT',key:'power',parts:[['combustion','Combustion efficiency',5.8,2],['energyStore','Energy store',5.0,1],['turbo','Turbocharger',4.8,2]]},
  gearbox:{label:'GEARBOX',key:'gearbox',parts:[['gearboxShift','Shift speed',3.6,2],['gearboxEfficiency','Transmission efficiency',3.9,1],['gearboxDurability','Gearbox durability',3.5,2]]}
 };
 let active=departments[initialTab]?initialTab:'aero';const body=`<div class="gpm-rnd-shell"><div class="gpm-rnd-summary"><div><small>CAR PERFORMANCE</small><strong id="gpmRndOverall">${c.car}/100</strong></div><div><small>RESEARCH BUDGET</small><strong>€${Number(c.budget).toFixed(1)}M</strong></div><div><small>REPUTATION</small><strong>${c.reputation}/100</strong></div></div><div class="gpm-development-status" id="gpmDevelopmentStatus">${escapeHtml(c.latestDevelopmentMessage||'No recent R&D action. Select a research department to begin.')}</div><div class="gpm-rnd-layout"><nav class="gpm-rnd-nav" id="gpmRndNav"></nav><section class="gpm-rnd-workspace"><div id="gpmRndChart"></div></section></div><p class="gpm-rnd-footnote">Research gains are deliberately incremental. Purchased upgrades remain installed between seasons. Reliability research improves durability; only actual failures or explicit repair decisions affect condition.</p></div>`;
 const root=showCareerModal('CAR DEVELOPMENT · RESEARCH & DEVELOPMENT',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 function draw(){const nav=root.querySelector('#gpmRndNav'),chart=root.querySelector('#gpmRndChart'),dep=departments[active];nav.innerHTML=Object.entries(departments).map(([id,x])=>`<button class="gpm-rnd-tab ${id===active?'active':''}" data-rnd="${id}"><span>${x.label}</span><b>${Math.round(Number(c.parts[x.key]??c.enginePower??70))}/100</b></button>`).join('');nav.querySelectorAll('[data-rnd]').forEach(b=>b.onclick=()=>{active=b.dataset.rnd;draw();});
 const current=Number(active==='power'?c.enginePower:active==='gearbox'?c.gearboxPerformance:c.parts[dep.key]||70);
 chart.innerHTML=`<header class="gpm-rnd-dept-head"><div><small>RESEARCH DEPARTMENT</small><h3>${dep.label}</h3><p>Current department rating: <b>${Math.round(current)}/100</b></p></div><div class="gpm-rnd-gauge"><i style="width:${clamp(current,0,100)}%"></i></div></header><div class="gpm-rnd-tree">${dep.parts.map(([id,label,cost,gain],i)=>{const rating=Number(c.partDetails[id]??current),locked=active==='power'&&!teamWorksEngine(c);return `<article class="gpm-rnd-node"><span class="gpm-rnd-node-no">R&D ${String(i+1).padStart(2,'0')}</span><b>${label}</b><div class="gpm-rnd-node-meter"><i style="width:${clamp(rating,0,100)}%"></i></div><small>LEVEL ${Math.round(rating)} · +${gain} POINTS · €${cost.toFixed(1)}M</small><button class="small-action" data-rnd-upgrade="${id}" data-rnd-key="${dep.key}" data-rnd-gain="${gain}" data-rnd-cost="${cost}" ${locked||rating>=99?'disabled':''}>${locked?'WORKS TEAM REQUIRED':rating>=99?'MAX LEVEL':'DEVELOP UPGRADE'}</button></article>`;}).join('')}</div>`;
 chart.querySelectorAll('[data-rnd-upgrade]').forEach(btn=>btn.onclick=()=>{const id=btn.dataset.rndUpgrade,key=btn.dataset.rndKey,gain=Number(btn.dataset.rndGain),cost=Number(btn.dataset.rndCost);if(c.budget<cost){showToast(`Insufficient funds. R&D requires €${cost.toFixed(1)}M.`);return;}if(key==='power'&&!teamWorksEngine(c)){showToast('Only a works team can develop its own power unit.');return;}const before=Number(key==='power'?c.enginePower:key==='gearbox'?c.gearboxPerformance:c.parts[key]||70),after=clamp(before+gain,0,100);if(after===before)return;c.budget-=cost;c.partDetails[id]=after;if(key==='power'){c.enginePower=after;c.parts.power=after;}else if(key==='gearbox'){c.gearboxPerformance=after;}else c.parts[key]=after;c.car=getPartOverall(c);c.latestDevelopmentMessage=`${btn.closest('.gpm-rnd-node').querySelector('b').textContent} upgraded by ${after-before} points · ${Math.round(after)}/100.`;c.latestDevelopmentAt={season:c.season,round:c.round,department:dep.label,upgrade:id,before,after};log(c,'R&D upgrade completed',`${c.latestDevelopmentMessage} Research cost: €${cost.toFixed(1)}M. The upgrade is permanently installed.`);safeSave();root.querySelector('#gpmDevelopmentStatus').textContent=c.latestDevelopmentMessage;root.querySelector('#gpmRndOverall').textContent=`${c.car}/100`;draw();showToast(c.latestDevelopmentMessage);});
 }
 draw();
};

// Supplier acquisition: show the yearly supply contract and the one-time purchase / switching fee separately.
openTechnicalSuppliers=function(){
 if(!currentCareer)return;const c=currentCareer;ensureTechnicalState(c);const pu=PU_SUPPLIERS[c.engineSupplier],gb=GB_SUPPLIERS[c.gearboxSupplier];
 const puCards=Object.entries(PU_SUPPLIERS).map(([n,d])=>{const buy=Math.max(2,Number(d.cost)*.45+2);return `<article class="gpm-supplier-card ${n===c.engineSupplier?'current':''}"><div class="gpm-supplier-top"><b>${n===c.engineSupplier?'CURRENT · ':''}${escapeHtml(n)}</b><span>€${d.cost.toFixed(1)}M / season</span></div><div class="gpm-supplier-meters"><label>POWER <b>${d.power}/100</b><i><span style="width:${d.power}%"></span></i></label><label>RELIABILITY <b>${d.reliability}/100</b><i><span style="width:${d.reliability}%"></span></i></label></div><p>${escapeHtml(d.description||'Power unit supply contract')}</p>${n!==c.engineSupplier?`<div class="gpm-supplier-buy">Initial acquisition / switch fee: <b>€${buy.toFixed(1)}M</b></div><button class="small-action" data-pu-buy="${escapeHtml(n)}">BUY SUPPLIER CONTRACT</button>`:'<small class="gpm-current-label">CURRENT POWER UNIT CONTRACT</small>'}</article>`;}).join('');
 const gbCards=Object.entries(GB_SUPPLIERS).map(([n,d])=>{const buy=Math.max(1.5,Number(d.cost)*.3+1);return `<article class="gpm-supplier-card ${n===c.gearboxSupplier?'current':''}"><div class="gpm-supplier-top"><b>${n===c.gearboxSupplier?'CURRENT · ':''}${escapeHtml(n)}</b><span>€${d.cost.toFixed(1)}M / season</span></div><div class="gpm-supplier-meters"><label>PERFORMANCE <b>${d.performance}/100</b><i><span style="width:${d.performance}%"></span></i></label><label>RELIABILITY <b>${d.reliability}/100</b><i><span style="width:${d.reliability}%"></span></i></label></div><div class="gpm-supplier-buy">Initial acquisition / switch fee: <b>€${buy.toFixed(1)}M</b></div>${n!==c.gearboxSupplier?`<button class="small-action" data-gb-buy="${escapeHtml(n)}">BUY GEARBOX CONTRACT</button>`:'<small class="gpm-current-label">CURRENT GEARBOX CONTRACT</small>'}</article>`;}).join('');
 const root=showCareerModal('ENGINE & GEARBOX SUPPLIER MARKET',`<p>Annual supply price is charged at the start of each season. The initial acquisition fee is a separate one-time payment due immediately when you switch.</p><h3>POWER UNIT SUPPLIERS</h3><div class="gpm-supplier-grid">${puCards}</div><h3>GEARBOX SUPPLIERS</h3><div class="gpm-supplier-grid">${gbCards}</div><p id="gpmSupplierStatus" role="status"></p>`,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 const status=t=>{root.querySelector('#gpmSupplierStatus').textContent=t;};
 root.querySelectorAll('[data-pu-buy]').forEach(b=>b.onclick=()=>{const n=b.dataset.puBuy,d=PU_SUPPLIERS[n],fee=Math.max(2,d.cost*.45+2);if(c.budget<fee){status(`You need €${fee.toFixed(1)}M for the initial acquisition fee.`);return;}const old=c.engineSupplier;c.budget-=fee;c.engineSupplier=n;c.enginePower=d.power;c.engineReliability=d.reliability;c.parts.power=d.power;c.ownsPowerUnit=teamWorksEngine(c);c.technicalChanges=c.technicalChanges||[];c.technicalChanges.push({type:'pu',from:old,to:n,fee,season:c.season,round:c.round});log(c,'Power unit supplier acquired',`${n} contract acquired from ${old}. Initial fee €${fee.toFixed(1)}M; annual supply price €${d.cost.toFixed(1)}M.`);safeSave();root.hidden=true;openTechnicalSuppliers();});
 root.querySelectorAll('[data-gb-buy]').forEach(b=>b.onclick=()=>{const n=b.dataset.gbBuy,d=GB_SUPPLIERS[n],fee=Math.max(1.5,d.cost*.3+1);if(c.budget<fee){status(`You need €${fee.toFixed(1)}M for the initial acquisition fee.`);return;}const old=c.gearboxSupplier;c.budget-=fee;c.gearboxSupplier=n;c.gearboxPerformance=d.performance;c.gearboxReliability=d.reliability;c.technicalChanges=c.technicalChanges||[];c.technicalChanges.push({type:'gearbox',from:old,to:n,fee,season:c.season,round:c.round});log(c,'Gearbox supplier acquired',`${n} contract acquired from ${old}. Initial fee €${fee.toFixed(1)}M; annual supply price €${d.cost.toFixed(1)}M.`);safeSave();root.hidden=true;openTechnicalSuppliers();});
};
window.openGpmTechnicalSuppliers=openTechnicalSuppliers;

// Team reputation has tangible commercial and recruitment effects.
if(typeof sponsorPortfolio==='function'){
 const baseSponsorPortfolio=sponsorPortfolio;
 sponsorPortfolio=function(c){return baseSponsorPortfolio(c).map(d=>({...d,base:Math.max(.55,Number(d.base))*(.9+clamp(Number(c.reputation)||30,0,100)/300)}));};
}
if(typeof payRaceSponsors==='function'){
 const basePayRaceSponsors=payRaceSponsors;
 payRaceSponsors=function(c,round,score,results){const before=Number(c.budget)||0;const paid=basePayRaceSponsors(c,round,score,results);const bonus=paid*(clamp(Number(c.reputation)||30,0,100)/100)*.22;if(bonus>0){c.budget+=bonus;c.sponsorIncome=(Number(c.sponsorIncome)||0)+bonus;}return paid+bonus;};
}

// No automatic car-performance decay: only explicit failure damage and player-selected upgrades alter installed performance.
applyRegulationChange=function(c){c.regulationSchedule=Number(c.regulationSchedule)||((Number(c.round)||0)+99);return null;};
advanceAiTeamDevelopment=function(c,round){
 ensureChampionshipData(c);c.aiCarRatingHistory=c.aiCarRatingHistory||{};
 Object.keys(c.roster||{}).filter(t=>t!==c.name).forEach(team=>{const current=Number(c.aiCarRatings[team]??teamBaseRating(c.season,team));const rank=sortedEntries(c.constructorStandings).findIndex(x=>x.name===team);const tiny=.015+(rank>5?.025:0)+(Math.random()*.025);c.aiCarRatings[team]=Number(clamp(current+tiny,62,97).toFixed(3));const h=c.aiCarRatingHistory[team]||(c.aiCarRatingHistory[team]=[]);h.push({season:c.season,round,rating:c.aiCarRatings[team]});});
};

// Rebuild the pre-season card grid with both race seats and known reserve/junior entries.
showPreSeasonReport=function(c){
 const r=c.preSeasonReport||{season:c.season,transfers:[],retirements:[],lineups:c.roster||{}};
 const teams=Object.entries(r.lineups||c.roster||{});const cards=teams.map(([team,drivers],i)=>{const reserve=(r.reserveLineups?.[team]||c.aiReserves?.[team]||[]);const isPlayer=team===c.name;const junior=isPlayer?(c.reserves||[]):reserve;return `<article class="gpm-preseason-team-card gpm-preseason-premium"><span class="gpm-preseason-team-number">${String(i+1).padStart(2,'0')}</span><div><b>${escapeHtml(team)}</b><strong>${(drivers||[]).map(escapeHtml).join('  ·  ')||'LINE-UP INCOMPLETE'}</strong><small>RACE DRIVERS · ${(drivers||[]).length}/2</small>${junior.length?`<small class="gpm-grid-juniors">RESERVE / JUNIOR · ${junior.map(escapeHtml).join(' · ')}</small>`:''}</div><span class="gpm-preseason-seat-count">${(drivers||[]).length}/2 SEATS</span></article>`;}).join('');
 const transfers=(r.transfers||[]).map(x=>`<div class="standing-row"><span>${escapeHtml(x.name)}</span><small>${escapeHtml(x.from)} → ${escapeHtml(x.to)}</small></div>`).join('');const retire=(r.retirements||[]).map(n=>`<div class="standing-row"><span>${escapeHtml(n)}</span><small>RETIRED</small></div>`).join('');
 const body=`<div class="gpm-grid-presentation"><div class="gpm-grid-presentation-head"><small>FIA FORMULA ONE WORLD CHAMPIONSHIP</small><h3>${r.season} OFFICIAL SEASON GRID</h3><p>${teams.length} constructors · ${teams.reduce((n,x)=>n+(x[1]||[]).length,0)} race seats</p></div><h3>ALL CONSTRUCTORS & DRIVER LINE-UPS</h3><div class="gpm-preseason-grid">${cards}</div><div class="gpm-preseason-news"><section><h3>TRANSFER MARKET ACTIVITY</h3>${transfers||'<p>No confirmed transfers this off-season.</p>'}</section><section><h3>RETIREMENTS & PROMOTIONS</h3>${retire||'<p>No retirements recorded.</p>'}${(r.promotions||[]).map(n=>`<p>${escapeHtml(n)} · PROMOTED FROM F2</p>`).join('')}</section></div></div>`;
 showCareerModal(`${r.season} · FIA SEASON GRID`,body,[{label:'CONTINUE TO TEAM HQ →',kind:'primary-btn',action:()=>{$g('gpmActionModal').hidden=true;}}]);
};

// Show the entire grid at the beginning of a newly created career, not only after the first season transition.
showConstructorIntroduction=function(c){if(!c)return;c.preSeasonReport=c.preSeasonReport||{season:c.season,transfers:[],retirements:[],promotions:[],lineups:JSON.parse(JSON.stringify(c.roster||{})),reserveLineups:JSON.parse(JSON.stringify(c.aiReserves||{}))};showPreSeasonReport(c);};

// Soundtrack: explicit user click starts local bundled audio; show useful failure reason and retry after load.
function startMenuMusic0106(){const audio=$g('menuSoundtrack'),btn=$g('musicToggleBtn');if(!audio){showToast('Soundtrack player is missing from the menu.');return;}audio.loop=true;audio.volume=.32;audio.muted=false;const p=audio.play();if(p&&p.then)p.then(()=>{window.__gpmMusicOn=true;if(btn){btn.textContent='♫ ON';btn.setAttribute('aria-pressed','true');}}).catch(err=>{window.__gpmMusicOn=false;showToast(`Soundtrack could not start: ${err?.message||'audio playback blocked'}.`);});}
function toggleMenuMusic0106(){const audio=$g('menuSoundtrack'),btn=$g('musicToggleBtn');if(!audio)return;if(window.__gpmMusicOn||!audio.paused){audio.pause();window.__gpmMusicOn=false;if(btn){btn.textContent='♫ OFF';btn.setAttribute('aria-pressed','false');}return;}startMenuMusic0106();}
const musicBtn=$g('musicToggleBtn');if(musicBtn)musicBtn.addEventListener('click',e=>{e.stopImmediatePropagation();toggleMenuMusic0106();},true);

// Portraits: retry and refresh every visible portrait slot after the market or career screen changes.
const oldRender0106=renderCareer;renderCareer=function(){oldRender0106();if(typeof window.GPMDriverPortraits!=='undefined'){document.querySelectorAll('[data-career-driver],[data-transfer-portrait],[data-broadcast-driver]').forEach(el=>{const name=el.dataset.careerDriver||el.dataset.transferPortrait||el.dataset.broadcastDriver;if(name&&window.GPMDriverPortraits.lookup){window.GPMDriverPortraits.lookup(name,currentCareer?.season).then(p=>{if(p?.url){el.style.backgroundImage=`url("${p.url}")`;el.classList.add('has-portrait');}}).catch(()=>{});}});}};

// Surface team reputation as a real management asset, not just a number.
const oldRenderRep0106=renderCareer;renderCareer=function(){oldRenderRep0106();if(currentCareer){const el=$g('repValue');if(el){el.title='Reputation improves sponsor payments, driver interest and staff recruitment.';el.dataset.effect='commercial and recruitment multiplier';}}};

})();

// Portrait observer for the separate F1/F2/F3/Historic driver-market modal.
(() => {
 const loaded=new WeakSet();
 const attach=()=>{
  const root=document.getElementById('gpmMarketProfile');if(!root)return;
  const name=root.querySelector('h2')?.textContent?.trim();if(!name)return;
  const service=window.GPMDriverPortraits;if(!service?.lookup)return;
  const season=Number(currentCareer?.season||2026),key=`${name}|${season}`;
  if(root.dataset.portraitKey===key)return;root.dataset.portraitKey=key;
  service.lookup(name,season).then(photo=>{
   if(root.dataset.portraitKey!==key||!photo?.url)return;
   let img=root.querySelector('.gpm-market-profile-photo');if(!img){img=document.createElement('img');img.className='gpm-market-profile-photo';img.alt=`${name} portrait`;root.prepend(img);}
   img.src=photo.url;img.title=`${photo.artist||'Photographer unknown'} · ${photo.licence||'Licence unknown'}`;img.onerror=()=>img.remove();
  }).catch(()=>{});
 };
 const obs=new MutationObserver(attach);const start=()=>{const root=document.getElementById('gpmMarketProfile');if(root)obs.observe(root,{childList:true,subtree:true});};
 document.addEventListener('DOMContentLoaded',start,{once:true});setTimeout(start,0);
})();
