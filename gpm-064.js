
/* GRAND PRIX MANAGER 0.6.4 — driver ecosystem, contracts, inbox, records and race identity */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
SEASONS[2022].rounds=22;SEASONS[2023].rounds=22;
const flagMap={'United Kingdom':'🇬🇧','Germany':'🇩🇪','Brazil':'🇧🇷','France':'🇫🇷','Finland':'🇫🇮','Spain':'🇪🇸','Australia':'🇦🇺','Canada':'🇨🇦','Japan':'🇯🇵','Mexico':'🇲🇽','Netherlands':'🇳🇱','Monaco':'🇲🇨','Italy':'🇮🇹','Thailand':'🇹🇭','New Zealand':'🇳🇿','Denmark':'🇩🇰','China':'🇨🇳','United States':'🇺🇸','Argentina':'🇦🇷','Sweden':'🇸🇪','Austria':'🇦🇹','Belgium':'🇧🇪','Ireland':'🇮🇪','Norway':'🇳🇴','Czechia':'🇨🇿','India':'🇮🇳','Russia':'🇷🇺'};
const META={
'Max Verstappen':['Netherlands',29,96,98,71,127,4], 'Sergio Perez':['Mexico',36,87,91,6,39,0],
'Charles Leclerc':['Monaco',29,93,96,8,43,0], 'Lewis Hamilton':['United Kingdom',41,95,97,105,202,7],
'George Russell':['United Kingdom',28,90,94,5,18,0], 'Kimi Antonelli':['Italy',20,85,96,0,0,0],
'Lando Norris':['United Kingdom',27,93,97,11,41,0], 'Oscar Piastri':['Australia',25,91,96,9,26,0],
'Fernando Alonso':['Spain',45,94,96,32,106,2], 'Lance Stroll':['Canada',28,82,87,0,3,0],
'Carlos Sainz':['Spain',32,90,93,4,27,0], 'Alexander Albon':['Thailand',30,86,91,0,2,0],
'Pierre Gasly':['France',30,86,91,1,5,0], 'Franco Colapinto':['Argentina',23,79,90,0,0,0],
'Esteban Ocon':['France',30,84,89,1,4,0], 'Oliver Bearman':['United Kingdom',21,82,94,0,0,0],
'Nico Hulkenberg':['Germany',39,85,88,0,1,0], 'Gabriel Bortoleto':['Brazil',22,81,93,0,0,0],
'Yuki Tsunoda':['Japan',26,82,88,0,0,0], 'Liam Lawson':['New Zealand',24,82,91,0,0,0],
'Isack Hadjar':['France',22,83,94,0,0,0], 'Arvid Lindblad':['United Kingdom',19,78,95,0,0,0],
'Valtteri Bottas':['Finland',37,87,89,10,67,0], 'Daniel Ricciardo':['Australia',37,88,91,8,32,0],
'Kevin Magnussen':['Denmark',34,81,85,0,1,0], 'Mick Schumacher':['Germany',27,80,88,0,0,0],
'Zhou Guanyu':['China',27,79,86,0,0,0], 'Sebastian Vettel':['Germany',39,94,96,53,122,4],
'Nicholas Latifi':['Canada',31,74,80,0,0,0], 'Nyck de Vries':['Netherlands',31,78,84,0,0,0],
'Logan Sargeant':['United States',26,76,85,0,0,0], 'Jack Doohan':['Australia',23,78,89,0,0,0],
'Michael Schumacher':['Germany',57,99,99,91,155,7], 'Ayrton Senna':['Brazil',66,99,99,41,80,3],
'Alain Prost':['France',71,98,99,51,106,4], 'Niki Lauda':['Austria',77,97,98,25,54,3],
'Nigel Mansell':['United Kingdom',73,95,97,31,59,1], 'Mika Häkkinen':['Finland',58,96,98,20,51,2],
'Kimi Räikkönen':['Finland',47,95,97,21,103,1], 'Jenson Button':['United Kingdom',46,94,96,15,50,1],
'Nico Rosberg':['Germany',41,95,97,23,57,1], 'Damon Hill':['United Kingdom',66,94,96,22,42,1],
'Jacques Villeneuve':['Canada',55,93,96,11,23,1], 'Juan Pablo Montoya':['Colombia',51,94,96,7,30,0],
'David Coulthard':['United Kingdom',55,92,94,13,62,0], 'Mark Webber':['Australia',50,93,95,9,42,0],
'Jackie Stewart':['United Kingdom',87,97,98,27,43,3], 'Emerson Fittipaldi':['Brazil',79,96,98,14,35,2],
'James Hunt':['United Kingdom',79,95,97,10,23,1], 'Gilles Villeneuve':['Canada',76,96,98,6,13,0],
'Stirling Moss':['United Kingdom',97,96,98,16,24,0], 'John Surtees':['United Kingdom',92,94,97,6,24,1],
'Felipe Massa':['Brazil',45,92,95,11,41,0], 'Rubens Barrichello':['Brazil',54,91,94,11,68,0],
'Gerhard Berger':['Austria',67,93,95,10,48,0], 'Fernando Alonso (Prime)':['Spain',45,98,99,32,106,2],
'Sebastian Vettel (Prime)':['Germany',39,98,99,53,122,4]
};
const HIST=Object.keys(META).filter(n=>['Michael Schumacher','Ayrton Senna','Alain Prost','Niki Lauda','Nigel Mansell','Mika Häkkinen','Kimi Räikkönen','Jenson Button','Nico Rosberg','Damon Hill','Jacques Villeneuve','Juan Pablo Montoya','David Coulthard','Mark Webber','Jackie Stewart','Emerson Fittipaldi','James Hunt','Gilles Villeneuve','Stirling Moss','John Surtees','Felipe Massa','Rubens Barrichello','Gerhard Berger','Fernando Alonso','Sebastian Vettel','Fernando Alonso (Prime)','Sebastian Vettel (Prime)'].includes(n));
const F2NAMES=['Theo Pourchaire','Frederik Vesti','Richard Verschoor','Jak Crawford','Paul Aron','Joshua Dürksen','Ritomo Miyata','Zane Maloney','Victor Martins','Dino Beganovic','Leonardo Fornaroli','Gabriele Minì','Kush Maini','Rafael Câmara','Alex Dunne','Oliver Goethe','Sebastián Montoya','Mari Boya','Nikola Tsolov','Noel León'];
const F3NAMES=['Ugo Ugochukwu','Freddie Slater','Tuukka Taponen','James Wharton','Tasanapol Inthraphuvasak','Mattia Colnaghi','Enzo Deligny','Pedro Clerot','Fionn McLaughlin','Noah Stromsted','Matteo De Palo','Laurens van Hoepen','Theophile Nael','Ernesto Rivera','Alex Powell'];
const SEASON_GP_CALENDARS={
2022:['Bahrain','Saudi Arabia','Australia','Emilia-Romagna','Miami','Spain','Monaco','Azerbaijan','Canada','Great Britain','Austria','France','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
2023:['Bahrain','Saudi Arabia','Australia','Azerbaijan','Miami','Monaco','Spain','Canada','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','Qatar','United States','Mexico City','São Paulo','Las Vegas','Abu Dhabi'],
2024:['Bahrain','Saudi Arabia','Australia','Japan','China','Miami','Emilia-Romagna','Monaco','Canada','Spain','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
2025:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Emilia-Romagna','Monaco','Spain','Canada','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
2026:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Canada','Monaco','Barcelona-Catalunya','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Madrid','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi']
};
function gpIdentity064(season,round){const a=SEASON_GP_CALENDARS[season]||SEASON_GP_CALENDARS[2026];return a[(Math.max(1,round||1)-1)%a.length]||'Grand Prix';}
const NATIONALS=['France','United Kingdom','Brazil','Germany','Italy','Spain','Japan','Australia','United States','Mexico','Finland','Denmark'];
function meta(name,series){const prime=String(name).endsWith(' (Prime)');const baseName=prime?String(name).replace(/ \(Prime\)$/,''):name;const exact=META[name],m=exact||META[baseName];if(m)return {nationality:m[0],age:m[1],rating:prime&&!exact?Math.min(98,m[2]+4):m[2],potential:prime&&!exact?Math.min(99,m[3]+2):m[3],wins:m[4],podiums:m[5],titles:m[6]};let seed=[...baseName].reduce((a,c)=>a+c.charCodeAt(0),0);const rating=(series==='F3'?70:series==='F2'?76:79)+seed%8;return {nationality:NATIONALS[seed%NATIONALS.length],age:series==='F3'?17+seed%3:series==='F2'?19+seed%4:24+seed%10,rating:prime?Math.min(99,(DRIVER_RATING[baseName]||rating)+4):(DRIVER_RATING[baseName]||rating),potential:series==='F3'?91+seed%9:series==='F2'?86+seed%12:85+seed%10,wins:seed%4,podiums:seed%11,titles:0};}
function marketPool(c,tab){
 const season=c.season||2026, assigned=Object.entries(c.roster||{}).flatMap(([team,ds])=>(ds||[]).map(n=>({name:n,team})));
 if(tab==='F1')return [...new Set([...allDrivers(season),...(c.drivers||[]),...(c.reserves||[]),...(c.freeAgents||[]),...Object.keys(META).filter(n=>!HIST.includes(n)&&!n.includes('(Prime)'))])].filter(n=>(!HIST.includes(n)||assigned.some(x=>x.name===n))&&!n.includes('(Prime)')).map(n=>({name:n,series:'F1',team:(c.reserves||[]).includes(n)?'Your Academy':(assigned.find(x=>x.name===n)?.team||'Free Agent')}));
 if(tab==='F2'||tab==='F3'){
 const teams=tab==='F2'?['Invicta Racing','Campos Racing','MP Motorsport','ART Grand Prix','PREMA Racing','Rodin Motorsport','DAMS Lucas Oil','Hitech TGR','AIX Racing','Trident']:['Trident','Campos Racing','MP Motorsport','ART Grand Prix','PREMA Racing','Rodin Motorsport','Van Amersfoort Racing','Hitech TGR','Jenzer Motorsport','AIX Racing'];
 const signedF3=tab==='F2'?(c.reserves||[]).filter(n=>c.reserveStats?.[n]?.series==='F3'):[];
 return [...new Set([...(juniorDrivers(season)||[]).filter(x=>x.series===tab).map(x=>x.name),...(tab==='F2'?F2NAMES:F3NAMES),...signedF3])].map(n=>({name:n,series:tab,team:teams[[...n].reduce((a,ch)=>a+ch.charCodeAt(0),0)%teams.length]}));
 }
 const activePrime=(allDrivers(season)||[]).map(n=>`${n} (Prime)`);return [...new Set([...HIST,...(c.historicDrivers||[]),...activePrime])].map(n=>({name:n,series:'Historic F1',team:'Historic database'}));
}
function addInbox(c,title,body,important=false){c.inbox=c.inbox||[];c.inbox.unshift({id:'msg-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),title,body,season:c.season,date:new Date().toLocaleDateString(),important,read:false});c.history=c.history||[];c.history.unshift({title,text:body,date:`Season ${c.season} · ${new Date().toLocaleDateString()}`});}
function contractFor(c,n){c.contracts=c.contracts||{};if(!c.contracts[n]){const m=meta(n,'F1');c.contracts[n]={startSeason:c.season,expirySeason:c.season+2,annualSalary:Math.max(1,Math.round((m.rating-65)*.45*10)/10),length:2,signingBonus:0,status:'Active'};}return c.contracts[n];}
function ensureContracts(c){c.contracts=c.contracts||{};Object.values(c.roster||{}).flat().forEach(n=>contractFor(c,n));(c.reserves||[]).forEach(n=>contractFor(c,n));}
function marketModal(tab='F1'){
 const c=currentCareer;if(!c)return;ensureRoster(c);ensureContracts(c);
 let active=tab,sort='rating',selected=null;
 const tabs=['F1','F2','F3','Historic F1'];
 const body=`<div class="gpm-market gpm-market-v2">
 <div class="gpm-market-toolbar"><div id="gpmMarketTabs" class="gpm-tabs"></div>
 <div class="gpm-market-filter"><input id="gpmMarketSearch" type="search" placeholder="Search drivers, teams or nationality"><select id="gpmMarketCategory"><option value="All">All drivers</option><option value="Free agents">Free agents</option><option value="Contracted">Contracted drivers</option></select><select id="gpmMarketSort"><option value="rating">Highest rated</option><option value="potential">Highest potential</option><option value="name">Name A–Z</option></select></div></div>
 <div class="gpm-market-layout"><div id="gpmMarketRows" class="gpm-market-rows" aria-label="Driver listings"></div><aside id="gpmMarketProfile" class="gpm-market-profile"><div class="empty-state">Select a driver to inspect their profile and contract situation.</div></aside></div>
 <div class="gpm-market-footer"><span>MARKET DATABASE · ${c.season} SEASON</span><button id="gpmManageContracts" class="secondary-btn">VIEW ALL TEAM CONTRACTS ↗</button></div>
 <p class="save-note">Review each driver's current team, ratings, career record and contract situation. Transfers and academy signings update your roster and contract records.</p></div>`;
 const root=showCareerModal('GLOBAL DRIVER MARKET · BUILD 0.9.9.5',body,[{label:'CLOSE MARKET',kind:'secondary-btn',action:()=>root.hidden=true}]);
 const rows=$('gpmMarketRows'),profile=$('gpmMarketProfile');
 function render(){
  const pool=marketPool(c,active),q=$('gpmMarketSearch').value.trim().toLowerCase(),cat=$('gpmMarketCategory').value;sort=$('gpmMarketSort').value;
  let list=pool.filter(d=>{const m=meta(d.name,active),contract=c.contracts?.[d.name];const text=[d.name,d.team,m.nationality,active].join(' ').toLowerCase();return text.includes(q)&&(cat==='All'||(cat==='Free agents'&&d.team==='Free Agent')||(cat==='Contracted'&&d.team!=='Free Agent'));});
  list.sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):sort==='potential'?meta(b.name,active).potential-meta(a.name,active).potential:meta(b.name,active).rating-meta(a.name,active).rating);
  $('gpmMarketTabs').innerHTML=tabs.map(t=>`<button class="gpm-tab ${active===t?'active':''}" data-tab="${t}">${t}</button>`).join('');
  rows.innerHTML=list.map(d=>{const m=meta(d.name,active),ct=c.contracts?.[d.name],owned=Object.values(c.roster||{}).some(a=>(a||[]).includes(d.name));return `<button class="gpm-market-listing ${selected===d.name?'selected':''}" data-profile="${esc(d.name)}"><span class="gpm-market-listing-main"><b>${esc(flagMap[m.nationality]||'🏁')} ${esc(d.name)}</b><small>${esc(d.team)} · ${esc(m.nationality)} · ${active}</small><small>${owned?`CONTRACTED · UNTIL ${ct?.expirySeason??c.season+1}`:active==='Historic F1'?'HISTORIC LEGEND':'AVAILABLE'} · ${m.wins} WINS · ${m.titles} TITLES</small></span><strong>${m.rating}<small>OVR</small></strong></button>`;}).join('')||'<p class="empty-state">No drivers match your search and filters.</p>';
  rows.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>{selected=b.dataset.profile;renderProfile(selected);rows.querySelectorAll('[data-profile]').forEach(x=>x.classList.toggle('selected',x.dataset.profile===selected));});
  if(selected&&!list.some(d=>d.name===selected))selected=null;if(selected)renderProfile(selected);else profile.innerHTML='<div class="empty-state">Select a driver to inspect their profile and contract situation.</div>';
 }
 function renderProfile(name){const d=marketPool(c,active).find(x=>x.name===name);if(!d)return;const m=meta(name,active),ct=c.contracts?.[name],owner=Object.entries(c.roster||{}).find(([t,a])=>(a||[]).includes(name));profile.innerHTML=`<div class="gpm-profile-kicker">${esc(active)} DRIVER PROFILE</div><h2>${esc(name)}</h2><div class="gpm-profile-rating"><b>${m.rating}</b><span>OVERALL</span><b>${m.potential}</b><span>POTENTIAL</span></div><div class="gpm-profile-grid"><div><small>NATIONALITY</small><b>${esc(flagMap[m.nationality]||'🏁')} ${esc(m.nationality)}</b></div><div><small>AGE</small><b>${c.driverAges?.[name]??m.age}</b></div><div><small>TEAM</small><b>${esc(owner?.[0]||d.team)}</b></div><div><small>WORLD TITLES</small><b>${m.titles}</b></div><div><small>RACE WINS</small><b>${m.wins}</b></div><div><small>PODIUMS</small><b>${m.podiums}</b></div></div><div class="gpm-profile-contract"><b>CONTRACT STATUS</b><p>${owner?`Contracted to ${esc(owner[0])} through ${ct?.expirySeason??'unknown'} · €${(ct?.annualSalary||0).toFixed(1)}M/year`:(c.reserves||[]).includes(name)?'Already signed to your academy': 'Available to approach'} </p></div><div class="gpm-profile-actions"><button class="staff-action" id="gpmProfileSign">${active==='F2'||active==='F3'?'SIGN / PROMOTE':'MAKE CONTRACT OFFER'}</button>${owner?.[0]===c.name?'<button class="secondary-btn" id="gpmProfileContract">MANAGE MY CONTRACT</button>':''}</div>`;
  $('gpmProfileSign').onclick=()=>{negotiateDriver(name,active);render();};$('gpmProfileContract')?.addEventListener('click',()=>openTeamContracts064(name));
 }
 $('gpmMarketTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b){active=b.dataset.tab;selected=null;render();}});
 $('gpmMarketSearch').addEventListener('input',render);$('gpmMarketCategory').addEventListener('change',render);$('gpmMarketSort').addEventListener('change',render);
 $('gpmManageContracts').onclick=()=>openTeamContracts064();render();
}
function negotiateDriver(name,series){
 const c=currentCareer;if(!c)return;const m=meta(name,series),existing=Object.entries(c.roster||{}).find(([t,ds])=>(ds||[]).includes(name)),reserve=(c.reserves||[]).includes(name);
 if(existing&&existing[0]===c.name){showToast('That driver already occupies a seat at your team.');return;}
 const junior=series==='F2'||series==='F3';
 const alreadyReserve=reserve;
 const fee=existing?Math.max(2,Math.round((m.rating-70)*.35*10)/10):0;
 const defaultSalary=Math.max(1,Math.round((m.rating-65)*.5*10)/10);
 const body=`<div class="gpm-contract-form">
  <div class="gpm-contract-driver"><div><small>${esc(series)} · DRIVER NEGOTIATION</small><h3>${esc(name)}</h3><span>${m.rating} OVR · ${m.potential} POTENTIAL</span></div><b>${esc(flagMap[m.nationality]||'🏁')}</b></div>
  ${junior?`<label>CAREER PATH<select id="gpmOfferPath"><option value="academy">Sign to academy / reserve programme</option>${series==='F2'?'<option value="seat">Promote directly to an F1 seat</option>':''}</select></label>`:`<label>F1 SEAT<select id="gpmOfferSeat"><option value="0">CAR 1 · ${esc(c.drivers[0]||'Vacant')}</option><option value="1">CAR 2 · ${esc(c.drivers[1]||'Vacant')}</option></select></label>`}
  <div id="gpmOfferContractFields" ${junior?'hidden':''}>
   <div class="gpm-contract-fields"><label>ANNUAL SALARY (€M)<input id="gpmOfferSalary" type="number" min="0.1" max="100" step="0.1" value="${defaultSalary}"></label><label>CONTRACT LENGTH<select id="gpmOfferYears"><option value="1">1 season</option><option value="2" selected>2 seasons</option><option value="3">3 seasons</option><option value="4">4 seasons</option><option value="5">5 seasons</option></select></label><label>SIGNING BONUS (€M)<input id="gpmOfferBonus" type="number" min="0" max="100" step="0.1" value="1"></label></div>
   <p class="save-note">${existing?`Transfer fee: €${fee.toFixed(1)}M · `:'Free-agent signing · '}The first annual salary and signing bonus are checked against your available budget.</p>
  </div>
  ${junior?`<p class="save-note">${series==='F3'?'F3 prospects enter your academy first. They can progress to F2 before an F1 promotion.':'F2 prospects can join the academy or be offered an F1 seat.'} ${alreadyReserve?'This driver is already in your academy.':''}</p>`:''}
  <div class="gpm-contract-error" id="gpmOfferError" role="alert"></div>
 </div>`;
 const root=showCareerModal(`CONTRACT OFFER · ${esc(name).toUpperCase()}`,body,[{label:'CANCEL',kind:'secondary-btn',action:()=>root.hidden=true},{label:junior?'CONFIRM SIGNING':'SUBMIT CONTRACT OFFER',kind:'primary-btn',action:()=>submitOffer()}]);
 const path=root.querySelector('#gpmOfferPath'),fields=root.querySelector('#gpmOfferContractFields');
 path?.addEventListener('change',()=>{fields.hidden=path.value==='academy';const seatLabel=root.querySelector('#gpmJuniorSeatLabel');if(seatLabel)seatLabel.hidden=path.value!=='seat';});
 function fail(message){const el=root.querySelector('#gpmOfferError');if(el)el.textContent=message;}
 function submitOffer(){
  const action=junior?(path?.value||'academy'):'seat';
  if(series==='Historic F1'&&Number(c.season)>=2022&&!String(name).endsWith('(Prime)')){fail('Historical legends cannot be signed into a modern-season race seat. Choose a Prime edition from Historic F1, a free agent, or an eligible F2/F3 prospect.');return;}
  const activeExternalContract=existing&&existing[0]!==c.name&&c.contracts?.[name]?.status==='Active'&&Number(c.contracts[name].expirySeason)>=Number(c.season);if(activeExternalContract&&Number(c.season)>=2022){fail(`${name} is contracted to ${existing[0]}. For a replacement, choose an available free agent or an eligible F2/F3 driver; contracted F1 drivers cannot be taken directly.`);return;}
  if(junior&&action==='academy'){
   if(alreadyReserve){if(series==='F2'&&c.reserveStats?.[name]?.series==='F3'){c.reserveStats[name].series='F2';c.reserveStats[name].lastRating=Math.min(m.potential,(c.reserveStats[name].lastRating||m.rating)+2);c.contracts[name]=c.contracts[name]||{startSeason:c.season,expirySeason:c.season+2,annualSalary:.5,length:2,signingBonus:0,status:'Development'};c.contracts[name].status='Development';c.contracts[name].expirySeason=Math.max(c.contracts[name].expirySeason,c.season+1);addInbox(c,'Junior promoted to F2',`${name} progressed from F3 to F2 within your academy programme.`,true);saveCareer();renderCareer();root.hidden=true;showToast(`${name} promoted to F2.`);}else fail('This driver is already signed to your development programme.');return;}
   const signingFee=Math.max(.2,(m.rating-65)*.12);if((c.budget||0)<signingFee){fail(`Insufficient budget. Academy signing fee: €${signingFee.toFixed(1)}M.`);return;}
   c.budget-=signingFee;c.reserves=c.reserves||[];c.reserves.push(name);c.reserveStats=c.reserveStats||{};c.reserveStats[name]={starts:0,points:0,lastRating:m.rating,series,developmentSpeed:1+(m.potential%5)*.15};c.contracts=c.contracts||{};c.contracts[name]={startSeason:c.season,expirySeason:c.season+2,annualSalary:Math.max(.2,Math.round(m.rating*.025*10)/10),length:2,signingBonus:signingFee,status:'Development'};addInbox(c,series+' driver signed',`${name} joined ${c.name}'s ${series} development programme.`,true);saveCareer();renderCareer();renderSaves();root.hidden=true;showToast(`${name} signed to academy.`);return;
  }
  if(series==='F3'){fail('F3 prospects must enter your academy before an F1 promotion.');return;}
  const target=junior?Number(root.querySelector('#gpmJuniorSeat')?.value||0):Number(root.querySelector('#gpmOfferSeat')?.value||0);
  const salary=Number(root.querySelector('#gpmOfferSalary')?.value),years=Number(root.querySelector('#gpmOfferYears')?.value),bonus=Number(root.querySelector('#gpmOfferBonus')?.value);
  if(!Number.isFinite(salary)||salary<=0||salary>100){fail('Enter a valid annual salary greater than €0M.');return;}
  if(!Number.isInteger(years)||years<1||years>5){fail('Choose a contract between one and five seasons.');return;}
  if(!Number.isFinite(bonus)||bonus<0||bonus>100){fail('Enter a valid signing bonus (zero is allowed).');return;}
  const reputationDiscount=1-Math.min(20,Math.max(0,Number(c.reputation)||0))*.006;const expectation=Math.max(1,(m.rating-65)*.55*reputationDiscount);if(salary<expectation*.8){fail(`${name} is unlikely to accept this offer. Try at least €${(expectation*.8).toFixed(1)}M per year.`);return;}
  const total=bonus+fee+salary;if((c.budget||0)<total){fail(`Insufficient budget. Required now: €${total.toFixed(1)}M (salary + bonus + transfer fee).`);return;}
  const outgoing=c.drivers[target];c.budget-=bonus+fee;
  if(existing){const oldList=c.roster[existing[0]],idx=oldList.indexOf(name);if(idx>=0)oldList.splice(idx,1);if(outgoing&&!oldList.includes(outgoing))oldList.push(outgoing);}
  else if(outgoing){c.freeAgents=Array.isArray(c.freeAgents)?c.freeAgents:[];if(!c.freeAgents.includes(outgoing))c.freeAgents.push(outgoing);}
  c.drivers[target]=name;c.roster[c.name]=[...c.drivers];c.reserves=(c.reserves||[]).filter(n=>n!==name);
  c.contracts=c.contracts||{};c.contracts[name]={startSeason:c.season,expirySeason:c.season+years,annualSalary:salary,length:years,signingBonus:bonus,status:'Active',playerManaged:true};
  if(outgoing){c.contracts[outgoing]=c.contracts[outgoing]||{startSeason:c.season,expirySeason:c.season+1,annualSalary:1,length:1,signingBonus:0,status:'Development'};c.contracts[outgoing].status='Development';}
  c.driverPoints=c.driverPoints||[0,0];c.driverPoints[target]=0;ensureRoster(c);ensureContracts(c);
  addInbox(c,'Driver signed: '+name,`${name} signed for ${c.name} on a ${years}-season deal at €${salary.toFixed(1)}M per year. Signing bonus €${bonus.toFixed(1)}M.`,true);
  if(existing){addInbox(c,'Driver leaving team',`${name} left ${existing[0]} and transferred to ${c.name}.`,true);addInbox(c,'Driver joined another constructor',`${name} joined ${c.name} from ${existing[0]}; ${outgoing||'the seat'} moved to the vacated seat.`,true);}
  else addInbox(c,'Replacement driver signed',`${name} joined ${c.name} as the replacement for ${outgoing||'the vacant seat'}.`,true);
  saveCareer();renderCareer();renderSaves();root.hidden=true;showToast(`${name} signed to ${c.name}.`);
 }
}
function ensureAllTeamContracts064(c){
 // Build the contract roster from the live career structure before the menu renders.
 // This helper was missing in 0.9.9.3, causing TEAM CONTRACTS to throw a
 // ReferenceError as soon as it opened.
 if(typeof ensureStaff==='function')ensureStaff(c);
 c.teamStaffContracts=c.teamStaffContracts||{};
 const roster=c.staffRoster||{};
 const people=[];
 const add=(person,role)=>{
  if(!person)return;
  const name=typeof person==='string'?person:person.name;
  if(!name)return;
  const key='staff:'+name;
  const existing=c.teamStaffContracts[key]||{};
  const salary=Number(person.annualSalary??existing.annualSalary??1);
  const contract=c.teamStaffContracts[key]={
   startSeason:Number(existing.startSeason??c.season),
   expirySeason:Number(existing.expirySeason??(Number(c.season)+2)),
   length:Number(existing.length??2),
   annualSalary:Number.isFinite(salary)?salary:1,
   signingBonus:Number(existing.signingBonus??0),
   status:existing.status||'Active'
  };
  if(contract.status==='Released')return;
  people.push({key,name,role});
 };
 (roster.engineer||[]).forEach((person,i)=>add(person,`Race Engineer ${i+1}`));
 (roster.startEngineer||[]).forEach((person,i)=>add(person,`Starting Engineer ${i+1}`));
 add(roster.strategist,'Race Strategist');
 add(roster.pitcrew,'Pit Crew Chief');
 return people;
}
function openTeamContracts064(focusName=null){
 const c=currentCareer;if(!c)return;ensureAllTeamContracts064(c);let filter='All';
 const root=showCareerModal('TEAM CONTRACTS · FULL ROSTER','<div id="gpmTeamContracts"></div>',[{label:'OPEN DRIVER MARKET',kind:'primary-btn',action:()=>{root.hidden=true;marketModal('F1');}},{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 function draw(){
  const drivers=(c.drivers||[]).map((n,i)=>({key:n,name:n,role:`F1 Driver ${i+1}`,type:'Driver',ct:contractFor(c,n),salaryKey:n}));
  const reserves=(c.reserves||[]).map(n=>({key:n,name:n,role:`${c.reserveStats?.[n]?.series||'Academy'} Reserve Driver`,type:'Academy',ct:contractFor(c,n),salaryKey:n}));
  const staffRows=ensureAllTeamContracts064(c).map(x=>({key:x.key,name:x.name,role:x.role,type:'Staff',ct:c.teamStaffContracts[x.key],salaryKey:x.key}));
  const all=[...drivers,...reserves,...staffRows].filter(x=>filter==='All'||x.type===filter);
  root.querySelector('#gpmTeamContracts').innerHTML=`<div class="gpm-contract-summary"><span><b>${all.length}</b> LISTED PEOPLE</span><span>${c.season} SEASON</span><span>TEAM: ${esc(c.name)}</span></div><div class="gpm-contract-filters">${['All','Driver','Academy','Staff'].map(x=>`<button class="gpm-tab ${filter===x?'active':''}" data-contract-filter="${x}">${x==='All'?'ALL':x.toUpperCase()}</button>`).join('')}</div><div class="gpm-contract-list">${all.map(x=>{const ct=x.ct,remaining=Number(ct.expirySeason)-Number(c.season),status=ct.status||'Active';return `<article class="gpm-contract-row ${focusName===x.name?'focused':''}"><div class="gpm-contract-person"><b>${esc(x.name)}</b><small>${esc(x.role)} · ${esc(status)}</small></div><div><small>START / EXPIRY</small><b>${ct.startSeason} – ${ct.expirySeason}</b></div><div><small>ANNUAL PAY</small><b>€${Number(ct.annualSalary||0).toFixed(1)}M</b></div><div><small>TERM LEFT</small><b>${remaining>0?remaining+' season(s)':remaining===0?'Expires this season':'Expired'}</b></div><div class="gpm-contract-actions"><button class="staff-action" data-renew-contract="${esc(x.key)}">RENEW</button>${x.type==='Driver'?`<button class="secondary-btn" data-release-driver="${esc(x.name)}">RELEASE</button>`:x.type==='Staff'?`<button class="secondary-btn" data-release-staff="${esc(x.key)}">RELEASE</button>`:`<button class="secondary-btn" data-release-reserve="${esc(x.name)}">RELEASE</button>`}</div></article>`;}).join('')||'<p class="empty-state">No contracts in this category.</p>'}</div><p class="save-note">Every current driver, academy member and assigned department staff member appears here. Renewals update the saved contract record; releases remove the person from the roster.</p>`;
  root.querySelectorAll('[data-contract-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.contractFilter;draw();});
  root.querySelectorAll('[data-renew-contract]').forEach(b=>b.onclick=()=>{
   const key=b.dataset.renewContract,isStaff=key.startsWith('staff:'),ct=isStaff?c.teamStaffContracts[key]:contractFor(c,key),name=isStaff?key.slice(6):key;
   const currentExpiry=Math.max(Number(c.season)||0,Number(ct.expirySeason)||Number(c.season)||0);
   const body=`<div class="gpm-extension-panel"><div class="gpm-extension-current"><div><small>CURRENT ANNUAL PAY</small><b>€${Number(ct.annualSalary||0).toFixed(1)}M</b></div><div><small>CURRENT CONTRACT ENDS</small><b>AFTER ${currentExpiry}</b></div><div><small>SEASON</small><b>${c.season}</b></div></div><p>Extend from the existing expiry date. The new term is added on top of the current deal, so renewing early will never shorten the contract.</p><div class="gpm-extension-fields"><label>NEW ANNUAL SALARY (€M)<input id="gpmExtensionSalary" type="number" min="0.1" max="100" step="0.1" value="${Number(ct.annualSalary||1).toFixed(1)}"></label><label>EXTRA SEASONS<input id="gpmExtensionYears" type="number" min="1" max="5" step="1" value="2"></label><label>RENEWAL BONUS (€M)<input id="gpmExtensionBonus" type="number" min="0" max="100" step="0.1" value="0"></label></div><div class="gpm-extension-preview"><span>NEW CONTRACT EXPIRY</span><b id="gpmExtensionExpiry">${currentExpiry+2}</b><small>Annual salary is recorded in the contract; the renewal bonus is paid immediately.</small></div><p id="gpmExtensionError" class="gpm-extension-error" role="alert" hidden></p></div>`;
   root.hidden=true;
   const editor=showCareerModal(`EXTEND CONTRACT · ${name.toUpperCase()}`,body,[
    {label:'CANCEL',kind:'secondary-btn',action:()=>{editor.hidden=true;openTeamContracts064(name);}},
    {label:'CONFIRM EXTENSION',kind:'primary-btn',action:()=>{
      const salary=Number(editor.querySelector('#gpmExtensionSalary').value),years=Number(editor.querySelector('#gpmExtensionYears').value),bonus=Number(editor.querySelector('#gpmExtensionBonus').value),err=editor.querySelector('#gpmExtensionError');
      const fail=msg=>{err.textContent=msg;err.hidden=false;};err.hidden=true;
      if(!Number.isFinite(salary)||salary<0.1||salary>100){fail('Enter an annual salary between €0.1M and €100M.');return;}
      if(!Number.isInteger(years)||years<1||years>5){fail('Choose between one and five additional seasons.');return;}
      if(!Number.isFinite(bonus)||bonus<0||bonus>100){fail('Enter a renewal bonus between €0M and €100M.');return;}
      if((Number(c.budget)||0)<bonus){fail(`Insufficient budget for the €${bonus.toFixed(1)}M renewal bonus.`);return;}
      const oldExpiry=Number(ct.expirySeason)||Number(c.season)||0,newExpiry=Math.max(Number(c.season)||0,oldExpiry)+years;
      c.budget=(Number(c.budget)||0)-bonus;ct.expirySeason=newExpiry;ct.length=Math.max(1,newExpiry-(Number(ct.startSeason)||Number(c.season)||0));ct.annualSalary=salary;ct.renewalBonus=(Number(ct.renewalBonus)||0)+bonus;ct.lastRenewedSeason=c.season;ct.status='Active';ct.alerted=false;ct.playerManaged=true;
      addInbox(c,'Contract extended',`${name} extended with ${c.name} through ${newExpiry}. Annual salary: €${salary.toFixed(1)}M. Additional term: ${years} season(s). Renewal bonus: €${bonus.toFixed(1)}M.`,true);
      saveCareer();renderCareer();editor.hidden=true;openTeamContracts064(name);showToast(`${name}'s contract extended through ${newExpiry}.`);
    }}
   ]);
   const updateExpiry=()=>{const y=Number(editor.querySelector('#gpmExtensionYears').value)||0;editor.querySelector('#gpmExtensionExpiry').textContent=String(currentExpiry+Math.max(0,y));};
   editor.querySelector('#gpmExtensionYears').addEventListener('input',updateExpiry);
  });
  root.querySelectorAll('[data-release-driver]').forEach(b=>b.onclick=()=>{const n=b.dataset.releaseDriver,i=c.drivers.indexOf(n);if(i<0||!confirm(`Release ${n}? An available replacement will be assigned to keep two drivers.`))return;const replacement=(c.reserves||[]).shift()||marketPool(c,'F1').find(d=>d.name!==n&&!Object.values(c.roster).flat().includes(d.name))?.name;if(!replacement){showToast('No replacement is available; driver was not released.');return;}c.drivers[i]=replacement;c.roster[c.name]=[...c.drivers];c.contracts[n].status='Released';c.contracts[replacement]={startSeason:c.season,expirySeason:c.season+2,length:2,annualSalary:2,signingBonus:0,status:'Active',playerManaged:true};addInbox(c,'Driver released',`${n} was released and ${replacement} was promoted/signed as the replacement.`,true);saveCareer();renderCareer();draw();});
  root.querySelectorAll('[data-release-staff]').forEach(b=>b.onclick=()=>{const key=b.dataset.releaseStaff,name=key.slice(6);if(!confirm(`Release ${name} from the team?`))return;const s=c.staffRoster;['engineer','startEngineer'].forEach(k=>(s[k]||[]).forEach((p,i)=>{if(p?.name===name)s[k][i]=null;}));['strategist','pitcrew'].forEach(k=>{if(s[k]?.name===name)s[k]=null;});c.teamStaffContracts[key].status='Released';addInbox(c,'Staff contract ended',`${name} was released from ${c.name}.`,true);saveCareer();renderCareer();draw();});
  root.querySelectorAll('[data-release-reserve]').forEach(b=>b.onclick=()=>{const n=b.dataset.releaseReserve;if(!confirm(`Release ${n} from the academy?`))return;c.reserves=c.reserves.filter(x=>x!==n);c.contracts[n].status='Released';delete c.reserveStats[n];addInbox(c,'Academy contract ended',`${n} left the ${c.name} development programme.`,false);saveCareer();renderCareer();draw();});
 }
 draw();
}
function manageContracts064(){openTeamContracts064();}
function renderInbox064(){
 const c=currentCareer;if(!c||!$('inboxContent'))return;c.inbox=c.inbox||[];
 $('inboxContent').innerHTML=c.inbox.length?c.inbox.map(m=>`<article class="gpm-inbox-item ${m.important?'important':''} ${m.read?'read':''}"><div><span>${m.important?'IMPORTANT':'TEAM UPDATE'} · ${esc(m.date||'')}</span><b>${esc(m.title)}</b><p>${esc(m.body)}</p><small>SEASON ${m.season}</small></div><button data-read="${esc(m.id)}">${m.read?'READ':'MARK READ'}</button></article>`).join(''):'<div class="empty-state">No messages yet. Contract alerts and transfer news will appear here.</div>';
 $('inboxContent').querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>{const m=c.inbox.find(x=>x.id===b.dataset.read);if(m)m.read=true;saveCareer();renderInbox064();});
}
const F1_WORLD_CHAMPIONS_097 = [[1950,"Giuseppe Farina","Alfa Romeo"],[1951,"Juan Manuel Fangio","Alfa Romeo"],[1952,"Alberto Ascari","Ferrari"],[1953,"Alberto Ascari","Ferrari"],[1954,"Juan Manuel Fangio","Maserati / Mercedes"],[1955,"Juan Manuel Fangio","Mercedes"],[1956,"Juan Manuel Fangio","Ferrari"],[1957,"Juan Manuel Fangio","Maserati"],[1958,"Mike Hawthorn","Ferrari"],[1959,"Jack Brabham","Cooper"],[1960,"Jack Brabham","Cooper"],[1961,"Phil Hill","Ferrari"],[1962,"Graham Hill","BRM"],[1963,"Jim Clark","Lotus"],[1964,"John Surtees","Ferrari"],[1965,"Jim Clark","Lotus"],[1966,"Jack Brabham","Brabham"],[1967,"Denny Hulme","Brabham"],[1968,"Graham Hill","Lotus"],[1969,"Jackie Stewart","Matra"],[1970,"Jochen Rindt","Lotus"],[1971,"Jackie Stewart","Tyrrell"],[1972,"Emerson Fittipaldi","Lotus"],[1973,"Jackie Stewart","Tyrrell"],[1974,"Emerson Fittipaldi","McLaren"],[1975,"Niki Lauda","Ferrari"],[1976,"James Hunt","McLaren"],[1977,"Niki Lauda","Ferrari"],[1978,"Mario Andretti","Lotus"],[1979,"Jody Scheckter","Ferrari"],[1980,"Alan Jones","Williams"],[1981,"Nelson Piquet","Brabham"],[1982,"Keke Rosberg","Williams"],[1983,"Nelson Piquet","Brabham"],[1984,"Niki Lauda","McLaren"],[1985,"Alain Prost","McLaren"],[1986,"Alain Prost","McLaren"],[1987,"Nelson Piquet","Williams"],[1988,"Ayrton Senna","McLaren"],[1989,"Alain Prost","McLaren"],[1990,"Ayrton Senna","McLaren"],[1991,"Ayrton Senna","McLaren"],[1992,"Nigel Mansell","Williams"],[1993,"Alain Prost","Williams"],[1994,"Michael Schumacher","Benetton"],[1995,"Michael Schumacher","Benetton"],[1996,"Damon Hill","Williams"],[1997,"Jacques Villeneuve","Williams"],[1998,"Mika Hakkinen","McLaren"],[1999,"Mika Hakkinen","McLaren"],[2000,"Michael Schumacher","Ferrari"],[2001,"Michael Schumacher","Ferrari"],[2002,"Michael Schumacher","Ferrari"],[2003,"Michael Schumacher","Ferrari"],[2004,"Michael Schumacher","Ferrari"],[2005,"Fernando Alonso","Renault"],[2006,"Fernando Alonso","Renault"],[2007,"Kimi Raikkonen","Ferrari"],[2008,"Lewis Hamilton","McLaren"],[2009,"Jenson Button","Brawn GP"],[2010,"Sebastian Vettel","Red Bull Racing"],[2011,"Sebastian Vettel","Red Bull Racing"],[2012,"Sebastian Vettel","Red Bull Racing"],[2013,"Sebastian Vettel","Red Bull Racing"],[2014,"Lewis Hamilton","Mercedes"],[2015,"Lewis Hamilton","Mercedes"],[2016,"Nico Rosberg","Mercedes"],[2017,"Lewis Hamilton","Mercedes"],[2018,"Lewis Hamilton","Mercedes"],[2019,"Lewis Hamilton","Mercedes"],[2020,"Lewis Hamilton","Mercedes"],[2021,"Max Verstappen","Red Bull Racing"],[2022,"Max Verstappen","Red Bull Racing"],[2023,"Max Verstappen","Red Bull Racing"],[2024,"Max Verstappen","Red Bull Racing"],[2025,"Lando Norris","McLaren"]];
const F1_CONSTRUCTOR_CHAMPIONS_097 = [[1958,"Vanwall"],[1959,"Cooper"],[1960,"Cooper"],[1961,"Ferrari"],[1962,"BRM"],[1963,"Lotus"],[1964,"Ferrari"],[1965,"Lotus"],[1966,"Brabham"],[1967,"Brabham"],[1968,"Lotus"],[1969,"Matra"],[1970,"Lotus"],[1971,"Tyrrell"],[1972,"Lotus"],[1973,"Lotus"],[1974,"McLaren"],[1975,"Ferrari"],[1976,"Ferrari"],[1977,"Ferrari"],[1978,"Lotus"],[1979,"Ferrari"],[1980,"Williams"],[1981,"Williams"],[1982,"Ferrari"],[1983,"Ferrari"],[1984,"McLaren"],[1985,"McLaren"],[1986,"Williams"],[1987,"Williams"],[1988,"McLaren"],[1989,"McLaren"],[1990,"McLaren"],[1991,"McLaren"],[1992,"Williams"],[1993,"Williams"],[1994,"Williams"],[1995,"Benetton"],[1996,"Williams"],[1997,"Williams"],[1998,"McLaren"],[1999,"Ferrari"],[2000,"Ferrari"],[2001,"Ferrari"],[2002,"Ferrari"],[2003,"Ferrari"],[2004,"Ferrari"],[2005,"Renault"],[2006,"Renault"],[2007,"Ferrari"],[2008,"Ferrari"],[2009,"Brawn"],[2010,"Red Bull"],[2011,"Red Bull"],[2012,"Red Bull"],[2013,"Red Bull"],[2014,"Mercedes"],[2015,"Mercedes"],[2016,"Mercedes"],[2017,"Mercedes"],[2018,"Mercedes"],[2019,"Mercedes"],[2020,"Mercedes"],[2021,"Mercedes"],[2022,"Red Bull"],[2023,"Red Bull"],[2024,"McLaren"],[2025,"McLaren"]];

const F1_ALL_TIME_RECORDS_097 = {
 wins:[['Lewis Hamilton',106],['Michael Schumacher',91],['Max Verstappen',74],['Sebastian Vettel',53],['Alain Prost',51]],
 poles:[['Lewis Hamilton',105],['Michael Schumacher',68],['Ayrton Senna',65],['Sebastian Vettel',57],['Max Verstappen',50]],
 constructors:[['Ferrari',16],['McLaren',10],['Williams',9],['Mercedes',8],['Lotus',7]]
};

function hallOfFame(){
 const c=currentCareer;if(!c)return;updateHallOfFame(c);const h=c.hallOfFame;
 const cutoff=Number(c.season)||2026;const historicalThrough=Math.min(cutoff-1,Math.max(...F1_WORLD_CHAMPIONS_097.map(x=>x[0])));const careerSeasonMap=new Map([...(c.seasonHistory||[]),...(c.seasonArchive||[])].map(x=>[Number(x.season),x]));const careerSeasonRecords=[...careerSeasonMap.values()];if((c.round||0)>=(SEASONS[c.season]?.rounds||24)&&!careerSeasonRecords.some(x=>Number(x.season)===cutoff)){const d=sortedEntries(c.driverChampPoints||{}),k=sortedEntries(c.constructorStandings||{});careerSeasonRecords.push({season:cutoff,driverChampion:d[0]?.name||'—',constructorChampion:k[0]?.name||'—'});}const careerYears=new Set(careerSeasonRecords.map(x=>Number(x.season)));const completedHistory=F1_WORLD_CHAMPIONS_097.filter(([year])=>year<=historicalThrough&&!careerYears.has(Number(year))).concat(careerSeasonRecords.filter(x=>x.driverChampion&&x.driverChampion!=='—').map(x=>[Number(x.season),x.driverChampion,x.constructorChampion||'—'])).sort((a,b)=>a[0]-b[0]);const grouped={};
 completedHistory.forEach(([year,name,team])=>{if(!grouped[name])grouped[name]={name,titles:0,years:[],teams:[]};grouped[name].titles++;grouped[name].years.push(year);grouped[name].teams.push(team);});
 const legends=Object.values(grouped).sort((a,b)=>b.titles-a.titles||a.name.localeCompare(b.name));
 const legendRows=legends.map((d,i)=>`<tr><td>${i+1}</td><td><b>${escapeHtml(d.name)}</b></td><td>${d.titles}</td><td>${d.years.join(', ')}</td></tr>`).join('');
 const seasonRows=completedHistory.slice().reverse().map(([year,name,team])=>`<tr><td>${year}</td><td><b>${escapeHtml(name)}</b></td><td>${escapeHtml(team)}</td></tr>`).join('');
 const completedConstructors=F1_CONSTRUCTOR_CHAMPIONS_097.filter(([year])=>year<=historicalThrough&&!careerYears.has(Number(year))).concat(careerSeasonRecords.filter(x=>x.constructorChampion&&x.constructorChampion!=='—').map(x=>[Number(x.season),x.constructorChampion])).sort((a,b)=>a[0]-b[0]);const constructorRows=completedConstructors.slice().reverse().map(([year,team])=>`<tr><td>${year}</td><td><b>${escapeHtml(team)}</b></td></tr>`).join('');
 const careerSeasons=careerSeasonRecords;const careerSeasonRows=careerSeasons.sort((a,b)=>a.season-b.season).map(x=>`<tr><td>${x.season}</td><td><b>${escapeHtml(x.driverChampion||'—')}</b></td><td>${escapeHtml(x.constructorChampion||'—')}</td><td>${x.driverPoints||0}</td><td>${x.constructorPoints||0}</td></tr>`).join('')||'<tr><td colspan="5">No completed seasons in this career yet.</td></tr>';
 const recordsAtCutoff=cutoff<=2022?{wins:[['Lewis Hamilton',103],['Michael Schumacher',91],['Sebastian Vettel',53],['Alain Prost',51],['Ayrton Senna',41]],poles:[['Lewis Hamilton',103],['Michael Schumacher',68],['Ayrton Senna',65],['Sebastian Vettel',57],['Alain Prost',33]],constructors:[['Ferrari',16],['Williams',9],['McLaren',8],['Mercedes',8],['Lotus',7]]}:F1_ALL_TIME_RECORDS_097;const leaderboard=(items,unit)=>items.map(([name,value],i)=>`<tr><td>${i+1}</td><td><b>${escapeHtml(name)}</b></td><td>${value} ${unit}</td></tr>`).join('');
 const saveDrivers=Object.entries(h.drivers||{}).sort((a,b)=>(b[1].titles||0)-(a[1].titles||0)||(b[1].wins||0)-(a[1].wins||0)).slice(0,5);
 const saveTeams=Object.entries(h.constructors||{}).sort((a,b)=>(b[1].titles||0)-(a[1].titles||0)||(b[1].wins||0)-(a[1].wins||0)).slice(0,5);
 const saveDriverRows=saveDrivers.map(([n,x],i)=>`<tr><td>${i+1}</td><td><b>${escapeHtml(n)}</b></td><td>${x.titles||0}</td><td>${x.wins||0}</td><td>${x.podiums||0}</td></tr>`).join('')||'<tr><td colspan="5">Your career records will appear after completed races.</td></tr>';
 const saveTeamRows=saveTeams.map(([n,x],i)=>`<tr><td>${i+1}</td><td><b>${escapeHtml(n)}</b></td><td>${x.titles||0}</td><td>${x.wins||0}</td></tr>`).join('')||'<tr><td colspan="4">Your constructor records will appear after completed races.</td></tr>';
 const r=h.records||{};
 const body=`<div class="gpm-hof">
 <p>FORMULA 1 GLOBAL HALL OF FAME · HISTORICAL WORLD CHAMPIONS + ALL-TIME RECORDS</p>
 <div class="gpm-hof-grid">
  <section><h3>TOP 5 · MOST GRAND PRIX WINS</h3><div class="gpm-hof-scroll"><table><thead><tr><th>#</th><th>DRIVER</th><th>WINS</th></tr></thead><tbody>${leaderboard(recordsAtCutoff.wins,'wins')}</tbody></table></div></section>
  <section><h3>TOP 5 · MOST POLE POSITIONS</h3><div class="gpm-hof-scroll"><table><thead><tr><th>#</th><th>DRIVER</th><th>POLES</th></tr></thead><tbody>${leaderboard(recordsAtCutoff.poles,'poles')}</tbody></table></div></section>
  <section><h3>TOP 5 · CONSTRUCTORS' WORLD TITLES</h3><div class="gpm-hof-scroll"><table><thead><tr><th>#</th><th>CONSTRUCTOR</th><th>TITLES</th></tr></thead><tbody>${leaderboard(recordsAtCutoff.constructors,'titles')}</tbody></table></div></section>
 </div>
 <h3>HISTORICAL WORLD DRIVERS' CHAMPIONS · 1950–${historicalThrough}</h3>
 <p>${legends.length} different World Champions · future seasons are hidden until your selected career season is completed</p>
 <div class="gpm-hof-scroll gpm-hof-tall"><table><thead><tr><th>#</th><th>WORLD CHAMPION</th><th>TITLES</th><th>CHAMPIONSHIP YEARS</th></tr></thead><tbody>${legendRows}</tbody></table></div>
 <h3>WORLD CHAMPIONS BY SEASON · THROUGH ${historicalThrough}</h3>
 <div class="gpm-hof-scroll gpm-hof-tall"><table><thead><tr><th>SEASON</th><th>DRIVERS' CHAMPION</th><th>TEAM</th></tr></thead><tbody>${seasonRows}</tbody></table></div>
 <h3>CONSTRUCTORS' WORLD CHAMPIONS · THROUGH ${historicalThrough}</h3>
 <div class="gpm-hof-scroll gpm-hof-tall"><table><thead><tr><th>SEASON</th><th>CONSTRUCTORS' CHAMPION</th></tr></thead><tbody>${constructorRows}</tbody></table></div>
 <h3>YOUR CAREER SEASON ARCHIVE · ${careerSeasons.length} COMPLETED SEASONS</h3><div class="gpm-hof-scroll gpm-hof-tall"><table><thead><tr><th>SEASON</th><th>DRIVERS' CHAMPION</th><th>CONSTRUCTORS' CHAMPION</th><th>DRIVER PTS</th><th>TEAM PTS</th><th>RACES</th></tr></thead><tbody>${careerSeasons.sort((a,b)=>a.season-b.season).map(x=>`<tr><td>${x.season}</td><td><b>${escapeHtml(x.driverChampion||'—')}</b></td><td>${escapeHtml(x.constructorChampion||'—')}</td><td>${x.driverPoints||0}</td><td>${x.constructorPoints||0}</td><td>${x.raceCount??'—'}</td></tr>`).join('')||'<tr><td colspan="6">No completed seasons in this career yet.</td></tr>'}</tbody></table></div>
 <h3>YOUR CAREER HALL OF FAME · TOP 5</h3>
 <div class="gpm-hof-grid">
  <section><h3>DRIVERS IN THIS SAVE</h3><div class="gpm-hof-scroll"><table><thead><tr><th>#</th><th>DRIVER</th><th>TITLES</th><th>WINS</th><th>PODIUMS</th></tr></thead><tbody>${saveDriverRows}</tbody></table></div></section>
  <section><h3>CONSTRUCTORS IN THIS SAVE</h3><div class="gpm-hof-scroll"><table><thead><tr><th>#</th><th>TEAM</th><th>TITLES</th><th>WINS</th></tr></thead><tbody>${saveTeamRows}</tbody></table></div></section>
 </div>
 <h3>DRIVER RETIREMENTS · YOUR CAREER</h3><div class="gpm-hof-scroll gpm-hof-tall"><table><thead><tr><th>DRIVER</th><th>CONSTRUCTOR</th><th>RETIRED</th><th>CAREER TITLES</th><th>WINS</th></tr></thead><tbody>${(c.retirementHistory||[]).slice().sort((a,b)=>a.retirementYear-b.retirementYear||a.name.localeCompare(b.name)).map(x=>`<tr><td><b>${escapeHtml(x.name)}</b></td><td>${escapeHtml(x.team||'—')}</td><td>${x.retirementYear||x.announcedSeason||'—'}</td><td>${x.stats?.titles||0}</td><td>${x.stats?.wins||0}</td></tr>`).join('')||'<tr><td colspan="5">No drivers have retired in this career yet.</td></tr>'}</tbody></table></div>
 <h3>YOUR SAVE RECORDS</h3><p>Most race victories: <b>${escapeHtml(r.mostWins||'—')}</b><br>Most podiums: <b>${escapeHtml(r.mostPodiums||'—')}</b><br>Most championships: <b>${escapeHtml(r.mostTitles||'—')}</b><br>Most consecutive wins: <b>${escapeHtml(r.mostConsecutiveWins||0)}</b><br>Most successful season: <b>${escapeHtml(r.mostSuccessfulSeason||'—')}</b><br>Most successful constructor: <b>${escapeHtml(r.mostSuccessfulConstructor||'—')}</b></p>
 <small class="gpm-hof-source-note">Historical reference seasons stop before the selected career year. Your simulated season is added to the career archive only after its final race; career records below are generated by this save.</small>
 </div>`;
 showCareerModal('FORMULA 1 HALL OF FAME',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);
}

function updateHallOfFame(c){c.hallOfFame=c.hallOfFame||{drivers:{},constructors:{},records:{}};const h=c.hallOfFame;h.drivers=h.drivers||{};h.constructors=h.constructors||{};h.records=h.records||{};h.processedEvents=h.processedEvents||[];h.processedSeasons=h.processedSeasons||[];}
function archiveCareerSeason064(c){
 if(!c)return false;
 const year=Number(c.season),rounds=Number(SEASONS[year]?.rounds||24);
 if(!Number.isFinite(year)||Number(c.round||0)<rounds)return false;
 c.seasonArchive=Array.isArray(c.seasonArchive)?c.seasonArchive:[];
 c.seasonHistory=Array.isArray(c.seasonHistory)?c.seasonHistory:[];
 const id=String(year);
 if(c.seasonArchive.some(x=>Number(x.season)===year))return false;
 const drivers=sortedEntries(c.driverChampPoints||{}),teams=sortedEntries(c.constructorStandings||{});
 const races=(c.raceArchive||[]).filter(r=>Number(r.season)===year);
 const wins={},podiums={},poles={};
 races.forEach(r=>{
  (r.results||[]).forEach(x=>{if(!x.driver)return;if(Number(x.position)===1)wins[x.driver]=(wins[x.driver]||0)+1;if(Number(x.position)<=3)podiums[x.driver]=(podiums[x.driver]||0)+1;});
  (r.grid||r.startingGrid||[]).forEach((x,i)=>{const n=typeof x==='string'?x:(x.driver||x.name);if(n&&i===0)poles[n]=(poles[n]||0)+1;});
 });
 const snapshot={season:year,completedAt:new Date().toISOString(),driverChampion:drivers[0]?.name||'—',driverPoints:drivers[0]?.points||0,constructorChampion:teams[0]?.name||'—',constructorPoints:teams[0]?.points||0,driverStandings:drivers.map(x=>({name:x.name,points:Number(x.points)||0})),constructorStandings:teams.map(x=>({name:x.name,points:Number(x.points)||0})),raceCount:races.length,driverWins:wins,driverPodiums:podiums,driverPoles:poles};
 c.seasonArchive.push(snapshot);
 if(!c.seasonHistory.some(x=>Number(x.season)===year))c.seasonHistory.push({season:year,driverChampion:snapshot.driverChampion,driverPoints:snapshot.driverPoints,constructorChampion:snapshot.constructorChampion,constructorPoints:snapshot.constructorPoints,completedAt:snapshot.completedAt});
 updateHallOfFame(c);const h=c.hallOfFame;
 if(!h.processedSeasons.includes(id)){
  drivers.forEach((entry,i)=>{const n=entry.name,d=h.drivers[n]||(h.drivers[n]={titles:0,runnerUps:0,wins:0,podiums:0,poles:0});if(i===0){d.titles=(d.titles||0)+1;d.championshipYears=d.championshipYears||[];if(!d.championshipYears.includes(year))d.championshipYears.push(year);}else if(i===1)d.runnerUps=(d.runnerUps||0)+1;d.poles=(d.poles||0)+(poles[n]||0);});
  teams.forEach((entry,i)=>{const n=entry.name,t=h.constructors[n]||(h.constructors[n]={titles:0,runnerUps:0,wins:0});if(i===0)t.titles=(t.titles||0)+1;else if(i===1)t.runnerUps=(t.runnerUps||0)+1;});
  h.processedSeasons.push(id);
 }
 h.records=h.records||{};
 const most=(field)=>Object.entries(h.drivers).sort((a,b)=>(Number(b[1][field])||0)-(Number(a[1][field])||0)||a[0].localeCompare(b[0]))[0]?.[0]||'—';
 h.records.mostWins=most('wins');h.records.mostPodiums=most('podiums');h.records.mostPoles=most('poles');
 h.records.mostTitles=most('titles');
 const topTeam=Object.entries(h.constructors).sort((a,b)=>(b[1].titles||0)-(a[1].titles||0)||(b[1].wins||0)-(a[1].wins||0))[0];if(topTeam)h.records.mostSuccessfulConstructor=topTeam[0];
 if(snapshot.driverChampion!=='—')h.records.lastDriversChampion=snapshot.driverChampion;
 if(snapshot.constructorChampion!=='—')h.records.lastConstructorsChampion=snapshot.constructorChampion;
 saveCareer();return true;
}
function recordRaceHallOfFame064(c,r){
 if(!c||!r)return;updateHallOfFame(c);const h=c.hallOfFame,eventId=`${r.season}-${r.round}`;if(h.processedEvents.includes(eventId))return;h.processedEvents.push(eventId);
 const results=(r.results||[]).slice().sort((a,b)=>(a.position||999)-(b.position||999));const winner=results.find(x=>x.position===1)||results[0];
 if(winner?.driver){if(h.records.lastRaceWinner===winner.driver)h.records.currentWinStreak=(h.records.currentWinStreak||1)+1;else{h.records.lastRaceWinner=winner.driver;h.records.currentWinStreak=1;}h.records.mostConsecutiveWins=Math.max(h.records.mostConsecutiveWins||0,h.records.currentWinStreak);}
 results.forEach(x=>{if(!x.driver)return;const d=h.drivers[x.driver]||(h.drivers[x.driver]={titles:0,runnerUps:0,wins:0,podiums:0});if(x.position===1)d.wins=(d.wins||0)+1;if(x.position<=3)d.podiums=(d.podiums||0)+1;const team=x.team||'Unknown Constructor';const t=h.constructors[team]||(h.constructors[team]={titles:0,runnerUps:0,wins:0});if(x.position===1)t.wins=(t.wins||0)+1;});
 const ranked=Object.entries(h.drivers).sort((a,b)=>(b[1].wins||0)-(a[1].wins||0));if(ranked[0])h.records.mostWins=ranked[0][0];const podiums=Object.entries(h.drivers).sort((a,b)=>(b[1].podiums||0)-(a[1].podiums||0));if(podiums[0])h.records.mostPodiums=podiums[0][0];const cons=Object.entries(h.constructors).sort((a,b)=>(b[1].wins||0)-(a[1].wins||0));if(cons[0])h.records.mostSuccessfulConstructor=cons[0][0];
}
const oldSeasonSummary064=showSeasonEndSummary;
showSeasonEndSummary=function(c){archiveCareerSeason064(c);updateHallOfFame(c);saveCareer();oldSeasonSummary064(c);};

function migrateRaceArchive(c){
 c.raceArchive=c.raceArchive||[];const calendar=(typeof RACES!=='undefined'?RACES:[]);
 c.raceArchive.forEach(r=>{const expected=gpIdentity064(r.season,r.round);if(expected){r.grandPrixName=expected+' Grand Prix';r.circuitName=r.circuitName||r.track||expected;r.track=r.grandPrixName;}r.eventId=r.eventId||`${r.season}-${r.round}`;r.dateCompleted=r.dateCompleted||r.recordedAt||null;r.startingGrid=r.startingGrid||r.grid||[];r.winner=r.winner||r.results?.[0]?.driver||null;r.podium=r.podium||r.results?.slice(0,3).map(x=>x.driver)||[];});
}
function repairSave064(c){
 ensureRoster(c);ensureContracts(c);c.inbox=c.inbox||[];c.retirementQueue=c.retirementQueue||[];c.hallOfFame=c.hallOfFame||{drivers:{},constructors:{},records:{}};
 migrateRaceArchive(c);(c.raceArchive||[]).forEach(r=>recordRaceHallOfFame064(c,r));
 const seen=new Set();Object.entries(c.roster).forEach(([team,ds])=>{c.roster[team]=(ds||[]).filter(n=>{if(seen.has(n))return false;seen.add(n);return true;});});
 ensureRoster(c);c.drivers=[...(c.roster[c.name]||c.drivers||[])];if(c.drivers.length<2){while(c.drivers.length<2){const n=marketPool(c,'F1').find(d=>!seen.has(d.name))?.name||[...allDrivers(c.season),...juniorDrivers(c.season).map(x=>x.name)].find(x=>!seen.has(x));c.drivers.push(n);seen.add(n);}c.roster[c.name]=[...c.drivers];}
}
const oldAdvance064=advanceSeason;
// 0.9.7 fix: preserve the base transition's success/failure return value.
// The season-finale button relies on this boolean to close its modal only
// after a successful transition. Previously this wrapper discarded it.
advanceSeason=function(){
 const c=currentCareer;if(!c){showToast('No active team career is loaded.');return false;}
 if(window.__gpmSeasonAdvanceInProgress){showToast('Season transition is already running.');return false;}
 window.__gpmSeasonAdvanceInProgress=true;
 const rollback=JSON.parse(JSON.stringify(c));
 try{
 repairSave064(c);
 c.driverAges=c.driverAges||{};
 Object.values(c.roster||{}).flat().forEach(n=>{c.driverAges[n]=c.driverAges[n]??meta(n,'F1').age;});
 if(Number(c.season)>=2026){Object.entries(c.roster||{}).forEach(([team,list])=>(list||[]).slice().forEach(n=>{
   const age=c.driverAges[n]||meta(n,'F1').age;const retirementChance=age>=45?.18:age>=42?.08:age>=40?.025:0;
   if(!c.retirementQueue.some(x=>x.name===n)&&age>=40&&Math.random()<retirementChance){
     const m=meta(n,'F1');c.retirementQueue.push({name:n,announcedSeason:c.season,retirementYear:c.season,moveSeason:c.season+2,team,stats:{wins:m.wins,podiums:m.podiums,titles:m.titles,peak:m.rating}});
     c.hallOfFame=c.hallOfFame||{drivers:{},constructors:{},records:{}};c.hallOfFame.drivers[n]=c.hallOfFame.drivers[n]||{wins:m.wins,podiums:m.podiums,titles:m.titles,peakRating:m.rating,retired:true,retirementYear:c.season};c.hallOfFame.drivers[n].retired=true;c.hallOfFame.drivers[n].retirementYear=c.season;c.retirementHistory=c.retirementHistory||[];if(!c.retirementHistory.some(x=>x.name===n))c.retirementHistory.push({name:n,team,retirementYear:c.season,announcedSeason:c.season,stats:{wins:m.wins,podiums:m.podiums,titles:m.titles,peak:m.rating}});
     c.roster[team]=c.roster[team].filter(x=>x!==n);
     const replacement=team===c.name?((c.reserves||[]).shift()||marketPool(c,'F1').find(d=>d.name!==n&&!Object.values(c.roster).flat().includes(d.name))?.name||[...allDrivers(c.season),...juniorDrivers(c.season).map(x=>x.name)].find(x=>x!==n&&!Object.values(c.roster||{}).flat().includes(x))):marketPool(c,'F1').find(d=>d.name!==n&&!Object.values(c.roster).flat().includes(d.name))?.name||[...allDrivers(c.season),...juniorDrivers(c.season).map(x=>x.name)].find(x=>x!==n&&!Object.values(c.roster||{}).flat().includes(x));
     if(replacement){c.roster[team].push(replacement);if(team===c.name)c.drivers=[...c.roster[team]];c.contracts[replacement]={startSeason:c.season,expirySeason:c.season+2,annualSalary:2,length:2,signingBonus:0,status:'Active',playerManaged:team===c.name};addInbox(c,'Driver retirement announced',`${n} announced retirement from ${team}. ${replacement} was promoted from the available driver database.`,true);addInbox(c,'Replacement driver signed',`${replacement} joined ${team} to fill the seat vacated by ${n}.`,true);}else{addInbox(c,'Driver retirement · seat vacant',`${n} retired from ${team}. No eligible driver was available in the selected database; recruit from Driver Market before the next race.`,true);}
   }
 }));}
 // AI driver moves are now handled by the contract-window transfer model in career-overhaul-0106.js.
 const preservedDrivers=[...(c.drivers||[])];
 ensureContracts(c);
 const payroll=(c.drivers||[]).reduce((sum,n)=>sum+(contractFor(c,n).annualSalary||0),0);
 c.budget=(c.budget||0)-payroll;addInbox(c,'Season payroll processed',`${c.name} paid €${payroll.toFixed(1)}M in annual driver salaries for the ${c.season} season.`,false);
 Object.entries(c.contracts).forEach(([n,ct])=>{if(ct.status==='Active'&&ct.expirySeason<=c.season+1&&!ct.alerted){ct.alerted=true;addInbox(c,'Contract expiring soon',`${n}'s contract expires after the ${ct.expirySeason} season. Open Driver Market to negotiate a renewal or replacement.`,true);}});
 const advanced=oldAdvance064();
 if(!advanced)throw new Error('The core season transition did not complete.');
 const cc=currentCareer;if(!cc)return false;
 // Carry negotiated line-ups into the next season instead of resetting to the default historical grid.
 const nextRoster=cc.roster||{};
 // The base transition now supplies the authored 2022–2026 grid or the contract-simulated future grid. Never copy last season's AI line-ups over it.
 if(preservedDrivers.length===2){cc.drivers=[...preservedDrivers];nextRoster[cc.name]=[...preservedDrivers];}
 cc.roster=nextRoster;
 cc.driverAges=cc.driverAges||{};Object.keys(cc.driverAges).forEach(n=>cc.driverAges[n]++);
 cc.historicDrivers=cc.historicDrivers||[];
 cc.retirementQueue=(cc.retirementQueue||[]).filter(r=>{if(cc.season>=r.moveSeason){if(!cc.historicDrivers.includes(r.name))cc.historicDrivers.push(r.name);addInbox(cc,'Historic driver available',`${r.name} has completed the two-year retirement transition and is now available in Historic F1. Previous career statistics were preserved.`,true);return false;}return true;});
 Object.entries(cc.contracts||{}).forEach(([n,ct])=>{if(ct.status==='Active'&&Number(ct.expirySeason)<cc.season){ct.status='Expired · decision required';ct.alerted=true;const owner=Object.entries(cc.roster||{}).find(([t,ds])=>(ds||[]).includes(n))?.[0]||'their constructor';addInbox(cc,'Contract expired · decision required',`${n}'s contract with ${owner} has expired. The driver remains temporarily registered so the team is not left without a lineup. Renew the deal or sign a replacement through Driver Market.`,true);}});Object.entries(cc.teamStaffContracts||{}).forEach(([key,ct])=>{if(ct.status==='Active'&&Number(ct.expirySeason)<cc.season){ct.status='Expired · decision required';ct.alerted=true;addInbox(cc,'Staff contract expired · decision required',`${key.replace(/^staff:/,'')}'s contract has expired. The staff member remains temporarily assigned; renew the deal or recruit a replacement.`,true);}});
 repairSave064(cc);updateHallOfFame(cc);saveCareer();renderInbox064();
 return true;
 }catch(error){
  // Restore the exact pre-transition career if any stage fails; never leave a half-advanced season.
  Object.keys(c).forEach(key=>delete c[key]);
  Object.assign(c,rollback);
  try{saveCareer();renderCareer();renderSaves();}catch(restoreError){console.error('Career rollback refresh failed:',restoreError);}
  console.error('0.9.8 season transition failed and was rolled back:',error);
  showToast(`Season could not advance. Your previous season was restored. ${error.message||'Unknown error'}`);
  return false;
 }finally{
  window.__gpmSeasonAdvanceInProgress=false;
 }
};
const oldRender064=renderCareer;
renderCareer=function(){if(currentCareer)repairSave064(currentCareer);oldRender064();if(currentCareer)updateHallOfFame(currentCareer);};
// The race-result modal is now focused on the classification and circuit map; no 3D car preview.
const oldArchive064=viewRaceArchive;
viewRaceArchive=function(){if(currentCareer){migrateRaceArchive(currentCareer);saveCareer();}oldArchive064();};
const oldSimulate064=simulateRace;
simulateRace=function(){const c=currentCareer;oldSimulate064();if(c&&c.lastRace){migrateRaceArchive(c);const r=c.raceArchive?.find(x=>x.season===c.season&&x.round===c.lastRace.round);if(r){r.grandPrixName=gpIdentity064(r.season,r.round)+' Grand Prix';r.eventId=`${r.season}-${r.round}`;r.startingGrid=r.grid||[];r.winner=r.results?.[0]?.driver;r.podium=r.results?.slice(0,3).map(x=>x.driver)||[];r.dateCompleted=r.recordedAt;}recordRaceHallOfFame064(c,r);}if(c){if(Number(c.round||0)>=(Number(SEASONS[c.season]?.rounds)||24))archiveCareerSeason064(c);updateHallOfFame(c);saveCareer();}};
function openTeamCustomizer064(){const c=currentCareer;if(!c)return;const body=`<div class="gpm-team-custom-form"><label>CONSTRUCTOR NAME</label><input id="gpmTeamNameEdit" maxlength="32" value="${esc(c.name)}"><label>TEAM LOGO / INITIALS</label><input id="gpmTeamLogoEdit" maxlength="4" value="${esc(c.logo||c.name.split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase())}"><div class="gpm-colour-grid"><div><label>PRIMARY COLOUR</label><input id="gpmTeamColourEdit" type="color" value="${esc(c.colour||'#e52b3d')}"></div><div><label>SECONDARY COLOUR</label><input id="gpmTeamSecondaryEdit" type="color" value="${esc(c.secondaryColour||'#dce4ed')}"></div></div><label>TEAM SLOGAN</label><input id="gpmTeamSloganEdit" maxlength="60" value="${esc(c.slogan||'Built to race.')}"><p>Changes are saved to this career and update your constructor identity and car graphics.</p></div>`;const root=showCareerModal('CUSTOMIZE YOUR CONSTRUCTOR',body,[{label:'SAVE TEAM IDENTITY',kind:'primary-btn',action:()=>{const old=c.name,name=$('gpmTeamNameEdit').value.trim();if(!name){showToast('Enter a team name first.');return;}if(name!==old&&Object.keys(c.roster||{}).some(t=>t.toLowerCase()===name.toLowerCase())){showToast('That constructor name is already in use.');return;}if(name!==old){c.roster=c.roster||{};c.roster[name]=c.roster[old]||[...(c.drivers||[])];delete c.roster[old];if(c.constructorStandings&&old in c.constructorStandings){c.constructorStandings[name]=c.constructorStandings[old];delete c.constructorStandings[old];}if(c.hallOfFame?.constructors?.[old]){c.hallOfFame.constructors[name]=c.hallOfFame.constructors[old];delete c.hallOfFame.constructors[old];}(c.raceArchive||[]).forEach(r=>(r.results||[]).forEach(x=>{if(x.team===old)x.team=name;}));(c.lastRace?.results||[]).forEach(x=>{if(x.team===old)x.team=name;});c.name=name;}c.logo=$('gpmTeamLogoEdit').value.trim().toUpperCase()||name.slice(0,3).toUpperCase();c.colour=$('gpmTeamColourEdit').value;c.secondaryColour=$('gpmTeamSecondaryEdit').value;c.slogan=$('gpmTeamSloganEdit').value.trim();saveCareer();renderCareer();window.refreshGpmLivery?.();root.hidden=true;showToast('Team identity saved across your career.');}},{label:'CANCEL',kind:'secondary-btn',action:()=>root.hidden=true}]);}

async function gpmCloudPayload(){
 return {
  careers: (()=>{try{return JSON.parse(localStorage.getItem('gpm-careers')||'[]')}catch{return []}})(),
  driverCareers: (()=>{try{return JSON.parse(localStorage.getItem('gpm-driver-careers-v1')||'[]')}catch{return []}})()
 };
}
async function gpmCloudSyncNow(showMessage=true){
 if(!window.gpmDesktop?.saveCloud){if(showMessage)showToast('Cloud sync is available in the installed Windows desktop app.');return;}
 try{
  const status=await window.gpmDesktop.cloudStatus();
  if(!status.configured){if(showMessage)showToast('Connect a OneDrive, Dropbox or other synced folder first.');return;}
  const result=await window.gpmDesktop.saveCloud(await gpmCloudPayload());
  const label=document.getElementById('gpmCloudStatus');
  if(label)label.textContent=`CLOUD SAVE · SYNCED TO ${result.folderName||'CLOUD FOLDER'} · ${new Date(result.savedAt).toLocaleTimeString()}`;
  if(showMessage)showToast('Cloud save synced successfully.');
  return true;
 }catch(error){console.error('Cloud save failed:',error);if(showMessage)showToast(`Cloud sync failed: ${error.message||'Unknown error'}`);return false;}
}
function gpmInstallCloudControls(){
 const list=document.getElementById('saveList');if(!list||document.getElementById('gpmCloudPanel'))return;
 const panel=document.createElement('section');panel.id='gpmCloudPanel';panel.className='panel gpm-cloud-panel';
 panel.innerHTML='<div><b>CLOUD CAREER SAVES</b><small id="gpmCloudStatus">Choose a OneDrive, Dropbox or other cloud-synced folder to keep a backup of both career modes.</small></div><div class="gpm-cloud-actions"><button type="button" id="gpmCloudConnect" class="secondary-btn">CONNECT CLOUD FOLDER</button><button type="button" id="gpmCloudSync" class="secondary-btn">SYNC NOW</button><button type="button" id="gpmCloudRestore" class="secondary-btn">RESTORE CLOUD SAVE</button></div>';
 list.parentNode.insertBefore(panel,list);
 const status=document.getElementById('gpmCloudStatus');
 if(window.gpmDesktop?.cloudStatus)window.gpmDesktop.cloudStatus().then(s=>{if(status&&s.configured)status.textContent=`CONNECTED · ${s.folderName}. Saves sync automatically after career changes.`;}).catch(()=>{});
 document.getElementById('gpmCloudConnect').onclick=async()=>{
  try{
   const chosen=await window.gpmDesktop?.chooseCloudFolder?.();if(!chosen||chosen.cancelled)return;
   const remote=await window.gpmDesktop.loadCloud();
   if(remote?.configured&&!remote.missing){
    if(confirm('A cloud save already exists in this folder. Restore that cloud save onto this PC? Choose Cancel to keep this PC’s careers and upload them to the cloud.')){
     localStorage.setItem('gpm-careers',JSON.stringify(remote.data.careers||[]));
     localStorage.setItem('gpm-driver-careers-v1',JSON.stringify(remote.data.driverCareers||[]));
     showToast('Existing cloud careers restored. Reloading…');setTimeout(()=>location.reload(),500);return;
    }
   }
   const synced=await gpmCloudSyncNow(false);
   if(!synced)throw new Error('The cloud folder was selected, but the save could not be uploaded.');
   if(status)status.textContent=`CONNECTED · ${chosen.folderName}. Saves sync automatically after career changes.`;
   showToast('Cloud folder connected and current careers synced.');
  }catch(error){showToast(`Could not connect cloud folder: ${error.message||'Unknown error'}`);}
 };
 document.getElementById('gpmCloudSync').onclick=()=>gpmCloudSyncNow(true);
 document.getElementById('gpmCloudRestore').onclick=async()=>{
  if(!window.gpmDesktop?.loadCloud){showToast('Cloud restore is available in the installed Windows desktop app.');return;}
  if(!confirm('Restore both career modes from the cloud save? This replaces the careers currently stored on this PC.'))return;
  try{
   const result=await window.gpmDesktop.loadCloud();
   if(!result.configured){showToast('Connect your cloud folder first.');return;}
   if(result.missing){showToast('No cloud save file was found in that folder.');return;}
   localStorage.setItem('gpm-careers',JSON.stringify(result.data.careers||[]));
   localStorage.setItem('gpm-driver-careers-v1',JSON.stringify(result.data.driverCareers||[]));
   showToast('Cloud careers restored. Reloading the game…');
   setTimeout(()=>location.reload(),500);
  }catch(error){showToast(`Cloud restore failed: ${error.message||'Unknown error'}`);}
 };
}

async function gpmRestoreCloudOnFreshInstall(){
 if(!window.gpmDesktop?.cloudStatus||!window.gpmDesktop?.loadCloud)return;
 try{
  const status=await window.gpmDesktop.cloudStatus();
  if(!status.configured)return;
  const localCareers=(()=>{try{return JSON.parse(localStorage.getItem('gpm-careers')||'[]')}catch{return []}})();
  const localDriverCareers=(()=>{try{return JSON.parse(localStorage.getItem('gpm-driver-careers-v1')||'[]')}catch{return []}})();
  // Never overwrite local progress. Restore automatically only on a fresh/empty device.
  if(localCareers.length||localDriverCareers.length)return;
  const remote=await window.gpmDesktop.loadCloud();
  if(!remote?.configured||remote.missing)return;
  const careers=Array.isArray(remote.data?.careers)?remote.data.careers:[];
  const driverCareers=Array.isArray(remote.data?.driverCareers)?remote.data.driverCareers:[];
  if(!careers.length&&!driverCareers.length)return;
  localStorage.setItem('gpm-careers',JSON.stringify(careers));
  localStorage.setItem('gpm-driver-careers-v1',JSON.stringify(driverCareers));
  location.reload();
 }catch(error){console.warn('Automatic cloud restore skipped:',error);}
}

function add064Controls(){
 gpmInstallCloudControls();
 const career=document.getElementById('careerView');
 const garage=document.getElementById('garageView');
 if(garage&&document.getElementById('gpmCustomLivery')){document.getElementById('gpmCustomLivery').onclick=()=>document.getElementById('liveryStudio')?.scrollIntoView({behavior:'smooth'});if(currentCareer?.activeLivery?.strokes?.length)window.setGpmLiveryData?.(currentCareer.activeLivery.strokes);}
 if(!document.getElementById('gpmMarketStyles')){const st=document.createElement('style');st.id='gpmMarketStyles';st.textContent=`
 
 .gpm-contract-form label{display:grid;gap:6px;margin:12px 0;color:#aebed0;font-size:10px;font-weight:900;letter-spacing:.08em}.gpm-contract-form input,.gpm-contract-form select{width:100%;padding:11px;background:#101a26;color:#f4f7fb;border:1px solid #405166;border-radius:7px}.gpm-contract-driver{display:flex;justify-content:space-between;align-items:center;padding:14px;background:#142235;border:1px solid #344a61;border-radius:10px}.gpm-contract-driver h3{margin:5px 0}.gpm-contract-driver small,.gpm-contract-driver span{color:#9eafc1;font-size:10px}.gpm-contract-driver>b{font-size:24px}.gpm-contract-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gpm-contract-fields label:last-child{grid-column:1/-1}.gpm-contract-error{color:#ff8790;font-size:12px;font-weight:800;margin-top:10px;min-height:18px}
.gpm-race-model-panel{margin:12px 0;padding:12px;background:#101a26;border:1px solid #34485e;border-radius:10px}.gpm-race-model-title{font-size:10px;font-weight:900;letter-spacing:.12em;color:#b6c6d8;margin-bottom:6px}.gpm-race-model-panel canvas{display:block;width:100%;height:230px}.gpm-car-select{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:12px 0}.gpm-car-select span{font-size:10px;color:#9eafc1;font-weight:800}.gpm-car-select button{padding:9px 12px;border:1px solid #405166;border-radius:8px;background:#152332;color:#fff}.gpm-car-select button.active{background:#d8e5f2;color:#111c28}.gpm-action-row{display:flex;gap:8px;flex-wrap:wrap}.gpm-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}.gpm-tab{border:1px solid #405166;background:#182432;color:#dce8f4;padding:10px 14px;border-radius:8px;font-weight:800}.gpm-tab.active{background:#d8e5f2;color:#111c28}.gpm-market-filter{display:flex;gap:8px;margin-bottom:12px}.gpm-market-filter input,.gpm-market-filter select{min-width:0;padding:10px;background:#101a26;color:#fff;border:1px solid #405166;border-radius:8px}.gpm-market-rows{display:grid;gap:8px;max-height:55vh;overflow:auto}.gpm-driver-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:12px;padding:12px;background:#111d2a;border:1px solid #314357;border-radius:10px}.gpm-driver-main{display:grid;gap:4px}.gpm-driver-main small,.gpm-driver-rating small{color:#9eafc1;font-size:11px}.gpm-driver-rating{text-align:right}.gpm-driver-rating b{font-size:23px}.gpm-inbox-item{display:flex;justify-content:space-between;gap:15px;padding:14px;border-bottom:1px solid #344357}.gpm-inbox-item.important{border-left:3px solid #e7b85c}.gpm-inbox-item p{margin:6px 0}.gpm-inbox-item span,.gpm-inbox-item small{display:block;color:#9eafc1;font-size:10px}.gpm-hof h3{margin-top:20px;color:#e9b95e}.gpm-hof-scroll{overflow:auto;max-height:42vh}.gpm-hof table{width:100%;border-collapse:collapse;font-size:11px}.gpm-hof th,.gpm-hof td{padding:9px;text-align:left;border-bottom:1px solid #344357;white-space:nowrap}.gpm-hof th{color:#9eafc1;font-size:9px}.gpm-team-custom-form label{display:block;margin:12px 0 5px;color:#9eafc1;font-size:10px;font-weight:800}.gpm-team-custom-form input:not([type=color]){width:100%;padding:11px;background:#101a26;color:#fff;border:1px solid #405166;border-radius:6px}.gpm-team-custom-form input[type=color]{width:100%;height:40px}.gpm-colour-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.gpm-garage-actions{display:flex;gap:10px;flex-wrap:wrap}.gpm-garage-actions button{width:auto}.gpm-action-row button{width:auto}.gpm-hof-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.gpm-hof-grid section{min-width:0}.gpm-hof-tall{max-height:310px;overflow:auto}.gpm-hof-source-note{display:block;color:#8795a8;margin-top:12px}.gpm-cloud-panel{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:14px;margin:10px 0 14px}.gpm-cloud-panel b,.gpm-cloud-panel small{display:block}.gpm-cloud-panel small{color:#9eafc1;font-size:11px;margin-top:5px}.gpm-cloud-actions{display:flex;gap:7px;flex-wrap:wrap}.gpm-cloud-actions button{width:auto;font-size:10px}@media(max-width:650px){.gpm-hof-grid{grid-template-columns:1fr}.gpm-cloud-panel{align-items:stretch;flex-direction:column}.gpm-cloud-actions{display:grid;grid-template-columns:1fr 1fr}.gpm-cloud-actions button:last-child{grid-column:1/-1}}@media(max-width:650px){.gpm-driver-row{grid-template-columns:1fr auto}.gpm-driver-row .staff-action{grid-column:1/-1}.gpm-market-filter{flex-direction:column}.gpm-inbox-item{flex-direction:column}}`;document.head.append(st);st.textContent+=`.gpm-market-filter{display:grid;grid-template-columns:minmax(160px,1fr) 150px 145px;gap:8px;margin:10px 0}.gpm-market-rows{display:block;max-height:510px;overflow-y:auto}.gpm-market-layout{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(260px,.85fr);gap:12px}.gpm-market-listing{width:100%;display:flex;text-align:left}.gpm-contract-row{display:grid;grid-template-columns:minmax(130px,1.4fr) minmax(95px,.8fr) minmax(85px,.7fr) minmax(90px,.7fr) auto;gap:10px}@media(max-width:800px){.gpm-market-layout{grid-template-columns:1fr}.gpm-market-profile{order:-1}.gpm-contract-row{grid-template-columns:1fr 1fr}.gpm-contract-person,.gpm-contract-actions{grid-column:1/-1}.gpm-market-filter{display:grid;grid-template-columns:1fr 1fr}.gpm-market-filter input{grid-column:1/-1}}@media(max-width:480px){.gpm-contract-row,.gpm-market-filter{grid-template-columns:1fr}.gpm-market-filter input{grid-column:auto}}`; }
 $('gpmOpenContracts')?.addEventListener('click',()=>openTeamContracts064());
 $('gpmTeamCustomize')?.addEventListener('click',openTeamCustomizer064);
 if($('openTransferBtn')){$('openTransferBtn').textContent='DRIVER MARKET · F1 / F2 / F3 / HISTORIC';$('openTransferBtn').onclick=()=>marketModal('F1');}
}
document.addEventListener('DOMContentLoaded',()=>{add064Controls();setTimeout(add064Controls,250);gpmRestoreCloudOnFreshInstall();});
const oldShowView064=showView;
showView=function(view){oldShowView064(view);if(view==='inbox')renderInbox064();if(view==='career')add064Controls();};
window.openGpmDriverMarket064=marketModal;window.openGpmTeamContracts064=openTeamContracts064;window.openGpmHallOfFame=hallOfFame;window.recordGpmRaceHallOfFame=(c,r)=>recordRaceHallOfFame064(c,r);window.getGpmEventName=(season,round)=>gpIdentity064(season,round);window.getGpmCurrentCareer=()=>currentCareer;window.saveGpmCareer=()=>saveCareer();
})();
