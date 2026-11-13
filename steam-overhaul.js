/* Grand Prix Manager 0.10.0 — Steam-era management overhaul.
   Removes the visible 3D garage, adds a management hub, own-works engine modules,
   per-race sponsor income and licence-conscious driver portrait loading. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const money=n=>`€${Number(n||0).toFixed(2)}M`;
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// The old 3D garage and livery studio are no longer part of the game loop.
function removeLegacyGarage(){
  const nav=document.querySelector('[data-nav="garage"]');nav?.remove();
  const view=$('garageView');if(view){view.hidden=true;view.setAttribute('aria-hidden','true');view.classList.remove('active');}
  document.querySelectorAll('#gpmRaceCarSelect,[data-select-chassis]').forEach(n=>n.remove());
  const homeTitle=document.querySelector('.home-saves-panel h2');if(homeTitle)homeTitle.innerHTML='CAREER <em>FILES.</em>';
  const homeTag=document.querySelector('.home-feature-pills');if(homeTag)homeTag.innerHTML='<span>TEAM OWNERSHIP</span><span>HISTORICAL PADDOCK</span><span>ENGINEERING</span><span>LIVE RACE CONTROL</span>';
}

const engineModules=[
  ['ice','Internal combustion engine','Combustion efficiency, response and peak output',8,'power'],
  ['turbo','Turbocharger','Boost response and energy recovery efficiency',6,'power'],
  ['battery','Energy store','Battery capacity, deployment and durability',7,'reliability'],
  ['mguk','MGU-K','Electrical deployment and harvesting efficiency',7,'power'],
  ['electronics','Control electronics','Power delivery, sensors and control reliability',5,'reliability'],
  ['fuel','Fuel system','Injection precision and fuel efficiency',5,'power'],
  ['cooling','Thermal management','Cooling circuits and operating temperature',6,'reliability']
];
function ensureEngineModules(c){
  c.engineModules=c.engineModules||{};
  engineModules.forEach(([key])=>{if(!Number.isFinite(c.engineModules[key]))c.engineModules[key]=Math.round(clamp(c.enginePower||78));});
  c.engineModulesVersion=1;
}
function isWorks(c){return typeof teamWorksEngine==='function'&&teamWorksEngine(c);}
function openWorksEngineComponents(){
  const c=window.getGpmCurrentCareer?.()||currentCareer;if(!c)return;
  ensureEngineModules(c);
  if(!isWorks(c)){
    const root=showCareerModal('POWER UNIT DEVELOPMENT',`<p><b>${esc(c.engineSupplier||'Customer supplier')}</b> is currently a customer power-unit programme.</p><p>Only a constructor operating its own works power unit can design and upgrade individual internal engine modules. Open supplier contracts to change your engine programme.</p>`,[{label:'SUPPLIER CONTRACTS',kind:'primary-btn',action:()=>{document.getElementById('gpmActionModal').hidden=true;openTechnicalSuppliers();}},{label:'CLOSE',kind:'secondary-btn',action:()=>{document.getElementById('gpmActionModal').hidden=true;}}]);
    return;
  }
  const body=`<div class="works-engine-summary"><div><small>WORKS POWER UNIT</small><b>${esc(c.engineSupplier||c.name)}</b><span>Power ${Math.round(c.enginePower||80)} · Reliability ${Math.round(c.engineReliability||80)}</span></div><div><small>ENGINE PROGRAMME</small><b>7 MODULES</b><span>Independent development paths</span></div></div><p>Upgrade individual engine systems. Each package costs money and improves either output or reliability. These upgrades apply only to your own works engine.</p><div id="worksEngineGrid" class="works-engine-grid"></div>`;
  const root=showCareerModal('WORKS ENGINE DEVELOPMENT',body,[{label:'CLOSE WORKSHOP',kind:'secondary-btn',action:()=>root.hidden=true}]);
  function draw(){
    ensureEngineModules(c);
    root.querySelector('#worksEngineGrid').innerHTML=engineModules.map(([key,name,desc,cost,kind])=>{const v=c.engineModules[key];return `<article class="works-engine-card"><div class="works-engine-card-head"><b>${name}</b><strong>${v}/100</strong></div><p>${desc}</p><div class="works-engine-meter"><i style="width:${v}%"></i></div><small>${kind==='power'?'POWER DELIVERY':'RELIABILITY & DURABILITY'}</small><button class="small-action" data-engine-module="${key}" ${v>=100?'disabled':''}>${v>=100?'MAXED':`UPGRADE · ${money(cost)}`}</button></article>`;}).join('');
    root.querySelectorAll('[data-engine-module]').forEach(btn=>btn.onclick=()=>{
      const item=engineModules.find(x=>x[0]===btn.dataset.engineModule);if(!item)return;
      const [key,name,,cost,kind]=item;if(c.budget<cost){showToast(`Insufficient budget. ${money(cost)} required.`);return;}if(c.engineModules[key]>=100)return;
      c.budget-=cost;c.engineModules[key]=clamp(c.engineModules[key]+4);
      c.latestDevelopmentMessage=`${name} upgraded by 4 points · ${c.engineModules[key]}/100 · ${money(cost)} spent.`;
      if(kind==='power')c.enginePower=clamp((c.enginePower||80)+1.2);
      else c.engineReliability=clamp((c.engineReliability||80)+1.5);
      c.parts=c.parts||{};c.parts.power=c.enginePower;
      c.history=c.history||[];c.history.push({title:`Works engine module upgraded · ${name}`,text:`${name} improved to ${c.engineModules[key]}/100. Power unit output: ${Math.round(c.enginePower)}/100 · reliability: ${Math.round(c.engineReliability)}/100. Development cost: ${money(cost)}.`,date:`Season ${c.season} · Round ${c.round}`});
      saveCareer();renderCareer();draw();showToast(`${name} development completed.`);
    });
  }
  draw();
}

// A sponsor's signing contribution is separate from its recurring race-weekend payment.
function sponsorPortfolio(c){
  const entries=[];
  (c.sponsorDeals||[]).forEach(d=>{if(d&&d.name)entries.push({name:d.name,base:Math.max(.55,Number(d.racePayment||d.weeklyPayment||Math.max(.12,Number(d.bonus||1)*.055))),signedSeason:d.signedSeason??c.season,term:d.term??2});});
  (c.sponsors||[]).forEach(name=>{if(!entries.some(x=>x.name===name)){const src=(typeof REAL_SPONSORS!=='undefined'?REAL_SPONSORS:[]).find(x=>x[0]===name);const signing=Number(src?.[2]||2);entries.push({name,base:Math.max(.55,signing*.10),signedSeason:c.season,term:2});}});
  return entries;
}
function payRaceSponsors(c,round,teamScore,results){
  const deals=sponsorPortfolio(c);let total=0;const podium=(results||[]).filter(r=>r.team===c.name&&r.position<=3).length;
  const points=Number(teamScore||0);
  deals.forEach(d=>{
    if(c.season>=d.signedSeason+d.term)return;
    const reputationFactor=.75+clamp(Number(c.reputation||30),0,100)/200;
    const performanceBonus=points>=25?.28:points>=15?.18:points>0?.09:0;
    const podiumBonus=podium? .14*podium:0;
    total+=(d.base+performanceBonus+podiumBonus)*reputationFactor;
  });
  if(total>0){c.budget=(Number(c.budget)||0)+total;c.sponsorIncome=(Number(c.sponsorIncome)||0)+total;c.sponsorPayments=c.sponsorPayments||[];c.sponsorPayments.push({season:c.season,round,amount:Number(total.toFixed(2)),points});c.history=c.history||[];c.history.push({title:'Commercial race-weekend payment',text:`Your ${deals.length} active commercial partners paid ${money(total)} after Round ${round}. This includes performance and podium bonuses where earned.`,date:`Season ${c.season} · Round ${round}`});}
  return total;
}
const originalSimulateRace=simulateRace;
simulateRace=function(){
  const c=currentCareer;if(!c)return;
  const before=Number(c.round)||0;
  originalSimulateRace();
  if(!currentCareer||currentCareer!==c||Number(c.round)<=before)return;
  const race=c.lastRace||{};const paid=payRaceSponsors(c,c.round,race.teamScore||0,race.results||[]);
  if(paid>0){saveCareer();renderCareer();showToast(`Sponsor payments received: ${money(paid)}.`);}
};

// New sponsor contracts pay after every completed race, not only on signing day.
function openSponsorDeals(){
  const c=currentCareer;if(!c)return;
  c.sponsors=c.sponsors||[];c.sponsorDeals=c.sponsorDeals||[];
  const all=(typeof REAL_SPONSORS!=='undefined'?REAL_SPONSORS:[]);
  const active=new Set([...c.sponsors,...c.sponsorDeals.map(x=>x.name)]);
  const offers=all.filter(x=>!active.has(x[0]));
  const body=`<p>Partnerships now pay recurring race-weekend income. Each deal includes a signing contribution and a per-race payment, with performance and podium bonuses. Contracts run for two seasons.</p><div class="sponsor-market-grid">${offers.map(x=>{const per=Math.max(.12,x[2]*.055);return `<article class="sponsor-market-card"><b>${esc(x[0])}</b><small>${esc(x[1])}</small><strong>${money(x[2])} signing contribution</strong><span>${money(per)} per race + performance bonuses</span><button class="staff-action" data-sponsor-sign="${esc(x[0])}">SIGN PARTNERSHIP</button></article>`;}).join('')||'<p>All available partner offers are signed.</p>'}</div><h3>ACTIVE PARTNERS</h3><div class="sponsor-active-list">${sponsorPortfolio(c).map(d=>`<span>${esc(d.name)} · ${money(d.base)}/race</span>`).join('')||'<small>No active sponsors.</small>'}</div>`;
  const root=showCareerModal('COMMERCIAL PARTNERSHIPS',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
  root.querySelectorAll('[data-sponsor-sign]').forEach(btn=>btn.onclick=()=>{
    const s=all.find(x=>x[0]===btn.dataset.sponsorSign);if(!s)return;
    if(c.sponsorDeals.length+c.sponsors.length>=20){showToast('Commercial portfolio limit reached.');return;}
    const signing=Number(s[2]),racePayment=Math.max(.12,signing*.055);
    if(c.budget<0){showToast('Your balance must be positive to sign a new partner.');return;}
    c.budget+=signing;c.sponsorDeals.push({name:s[0],category:s[1],bonus:signing,racePayment,signedSeason:c.season,term:2});
    c.history=c.history||[];c.history.push({title:'Commercial partnership signed',text:`${s[0]} signed a two-season agreement. Signing contribution: ${money(signing)}. Race payment: ${money(racePayment)} plus performance and podium bonuses.`,date:`Season ${c.season} · Round ${c.round}`});
    saveCareer();renderCareer();root.hidden=true;showToast(`${s[0]} signed · ${money(signing)} received.`);
  });
}

// Season-aware portrait lookup shared with the broadcast presentation.
async function driverPortrait(name){
  return window.GPMDriverPortraits
    ? window.GPMDriverPortraits.lookup(name, currentCareer?.season)
    : {fallback:name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase()};
}
function addDriverPortrait(name,container){
  if(!container)return;const token=(container.dataset.portraitToken=String(Date.now())+name);
  driverPortrait(name).then(photo=>{
    if(container.dataset.portraitToken!==token)return;
    if(photo.url){container.innerHTML=`<img src="${esc(photo.url)}" alt="${esc(name)}" loading="lazy"><small>IMAGE: ${esc(photo.artist)} · ${esc(photo.licence)} · <a href="${esc(photo.licenceUrl)}" target="_blank" rel="noreferrer">LICENCE</a> · <a href="${esc(photo.sourceUrl)}" target="_blank" rel="noreferrer">SOURCE</a> · ${esc(photo.date||photo.season)}</small>`;const img=container.querySelector('img');img.onerror=()=>{container.innerHTML=`<div class="driver-photo-fallback">${esc(photo.fallback||name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div><small>IMAGE UNAVAILABLE · FALLBACK INITIALS</small>`;};}
    else container.innerHTML=`<div class="driver-photo-fallback">${esc(photo.fallback||'F1')}</div><small>NO REUSABLY-LICENSED PORTRAIT FOUND</small>`;
  });
}

function installPortraitsInMarket(){
  const profile=$('gpmMarketProfile');if(!profile||!currentCareer)return;
  const name=profile.querySelector('h2')?.textContent?.trim();if(!name)return;
  if(!profile.querySelector('.gpm-driver-photo')){
    const photo=document.createElement('div');photo.className='gpm-driver-photo';
    const kicker=profile.querySelector('.gpm-profile-kicker');if(kicker)kicker.insertAdjacentElement('afterend',photo);else profile.prepend(photo);
    addDriverPortrait(name,photo);
  }
}

function installCareerPortraits(){const cards=document.querySelectorAll('[data-career-driver]');cards.forEach(node=>{if(node.dataset.photoLoaded)return;node.dataset.photoLoaded='1';addDriverPortrait(node.dataset.careerDriver,node);});}
function installManagement(){
  removeLegacyGarage();
  const transfer=document.getElementById('transferModal');
  if(transfer&&!transfer.dataset.portraitBound){transfer.dataset.portraitBound='1';document.getElementById('transferDriver')?.addEventListener('change',()=>setTimeout(()=>{const box=transfer.querySelector('[data-transfer-portrait]');if(box){const name=box.dataset.transferPortrait;addDriverPortrait(name,box);}},0));document.getElementById('openTransferBtn')?.addEventListener('click',()=>setTimeout(()=>{const box=transfer.querySelector('[data-transfer-portrait]');if(box)addDriverPortrait(box.dataset.transferPortrait,box);},0));const detail=document.getElementById('marketDetail');if(detail)new MutationObserver(()=>{const box=detail.querySelector('[data-transfer-portrait]');if(box&&!box.dataset.loaded){box.dataset.loaded='1';addDriverPortrait(box.dataset.transferPortrait,box);}}).observe(detail,{childList:true,subtree:true});}
  const deck=$('managementDeck');if(deck&&!deck.dataset.bound){deck.dataset.bound='1';deck.addEventListener('click',e=>{const b=e.target.closest('[data-manage]');if(!b)return;const a=b.dataset.manage;if(a==='market')window.openGpmDriverMarket064?.('F1');if(a==='development')openWorksEngineComponents();if(a==='sponsors')openSponsorDeals();if(a==='staff')openStaffDepartment('engineer1');if(a==='standings')viewStandings();if(a==='history')viewRaceArchive();});}
  const workshop=$('openEngineWorkshop');if(workshop&&!workshop.dataset.bound){workshop.dataset.bound='1';workshop.addEventListener('click',openWorksEngineComponents);}
  if($('sponsorBtn'))$('sponsorBtn').onclick=openSponsorDeals;
  if(!document.body.dataset.marketPhotoObserver){document.body.dataset.marketPhotoObserver='1';new MutationObserver(()=>{installPortraitsInMarket();installCareerPortraits();}).observe(document.body,{childList:true,subtree:true});}installCareerPortraits();
}

// The market is rendered by the existing contracts system. Observe its profile panel
// and attach a properly licensed portrait after the player selects a driver.
const marketOpen=window.openGpmDriverMarket064;
if(typeof marketOpen==='function')window.openGpmDriverMarket064=function(...args){marketOpen(...args);setTimeout(installPortraitsInMarket,80);};
const oldRenderCareer=renderCareer;
renderCareer=function(){oldRenderCareer();if(!currentCareer)return;installCareerPortraits();const badge=$('seasonBadge');if(badge)badge.innerHTML=`<span class="live-dot"></span> ${currentCareer.season} SEASON · BUILD 0.10.11.0`;ensureEngineModules(currentCareer);const box=$('attributeList');if(box){box.innerHTML=`<div class="technical-status-row"><div><small>POWER UNIT</small><b>${esc(currentCareer.engineSupplier||'Supplier')}</b><span>Power ${Math.round(currentCareer.enginePower||80)} · Reliability ${Math.round(currentCareer.engineReliability||80)}</span></div><div><small>GEARBOX</small><b>${esc(currentCareer.gearboxSupplier||'In-house')}</b><span>Performance ${Math.round(currentCareer.gearboxPerformance||80)}</span></div></div>`+box.innerHTML;}}

document.addEventListener('DOMContentLoaded',()=>{installManagement();setTimeout(installManagement,300);});
if(document.readyState!=='loading'){installManagement();setTimeout(installManagement,300);}
window.openGpmWorksEngineComponents=openWorksEngineComponents;
})();
