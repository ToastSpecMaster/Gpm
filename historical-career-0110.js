/* Grand Prix Manager 0.10.11.0 — season-accurate grids, regulation eras, and rating recovery. */
(()=>{
'use strict';
const REGULATIONS={
2016:{era:'V6 TURBO-HYBRID · PRE-2017 AERO',generation:'hybrid-v1',headline:'2016 rules baseline',technical:'1.6L V6 turbo-hybrid power units; 2014-era hybrid architecture; 13-inch tyres; high-downforce 2016 aerodynamic package. Team radio restrictions and revised qualifying format were part of the sporting framework.',sporting:'21 Grands Prix. Five power-unit elements per driver under the 2016 allocation; three engine manufacturers plus Honda, Renault and Ferrari customer/works programmes.',financial:'No modern cost cap. Development budgets were largely unrestricted by today’s standards.',reset:{}},
2017:{era:'WIDE-CAR AERODYNAMIC REGULATIONS',generation:'wide-2017',headline:'Wider, faster cars and larger tyres',technical:'Cars widened to 2,000mm; wider front and rear tyres; wider front and rear wings; revised floors and diffusers for substantially greater downforce. Minimum weight increased. Halo not yet introduced.',sporting:'20 Grands Prix. Three power-unit manufacturers plus Honda; revised power-unit allocation and penalty rules.',financial:'No team cost cap. Major aerodynamic development arms race.',reset:{aero:5,chassis:2,suspension:1}},
2018:{era:'WIDE-CAR AERO · HALO INTRODUCTION',generation:'wide-2017',headline:'Halo and stricter cockpit protection',technical:'2017 wide-car aerodynamic rules largely carried over. Halo cockpit protection became mandatory; shark fins and T-wings were restricted; oil-burning loopholes were tightened.',sporting:'21 Grands Prix. Three power units and two MGU-Ks per driver under the season allocation; additional penalties for exceeding limits.',financial:'No team cost cap. Development continued under the wide-car regulations.',reset:{}},
2019:{era:'AERODYNAMIC SIMPLIFICATION',generation:'aero-2019',headline:'Front-wing, rear-wing and brake-duct reset',technical:'Simplified, wider front wings with fewer elements; simplified rear wings made taller and wider; larger DRS opening; front brake-duct and bargeboard restrictions intended to reduce turbulent wake. 1.6L V6 hybrid power units retained.',sporting:'21 Grands Prix. Point for fastest lap when classified in the top ten; revised front-wing and tyre-related technical procedures.',financial:'No cost cap yet. New aerodynamic package required substantial redesign.',reset:{aero:4}},
2020:{era:'AERO-2019 · COVID-ERA COMPONENT FREEZE',generation:'aero-2019',headline:'Carry-over cars, component freeze and 2020 sporting changes',technical:'2019 aerodynamic rules carried over. Power-unit upgrade restrictions and a broad component freeze were introduced to control costs; teams used limited development tokens for 2021 carry-over parts.',sporting:'17-race revised calendar due to COVID-19. Three-session weekend format retained; reduced personnel and event procedures.',financial:'Emergency cost controls and reduced aerodynamic testing; 2021 cost cap agreed at $145M.',reset:{}},
2021:{era:'FINAL PRE-GROUND-EFFECT SEASON',generation:'floor-2021',headline:'Floor cuts, cost cap and reduced aerodynamic testing',technical:'Revised floor and rear-brake aerodynamic details reduced downforce; most 2020 chassis components carried over under the token system. Power units remained 1.6L V6 turbo-hybrid.',sporting:'22 Grands Prix. Sprint qualifying introduced at selected events; revised parc-fermé and component-use rules.',financial:'First team cost cap at $145M; aerodynamic testing restrictions linked to championship position.',reset:{aero:3,chassis:1}},
2022:{era:'GROUND-EFFECT REGULATIONS · 18-INCH WHEELS',generation:'ground-effect-2022',headline:'Ground-effect cars, new tyres and major chassis reset',technical:'New ground-effect floor tunnels and venturi underbodies; simplified wings and removal of complex bargeboards; 18-inch wheels with low-profile tyres; wheel covers; revised suspension and fuel; 1.6L V6 hybrid power units retained.',sporting:'22-race calendar. Sprint format expanded; revised technical checks, parc-fermé and component rules.',financial:'Cost cap set at $140M for the season baseline, with later adjustments; aerodynamic testing handicap continued.',reset:{aero:8,chassis:4,suspension:3,reliability:1}},
2023:{era:'GROUND-EFFECT · FLOOR EDGE & SAFETY REFINEMENTS',generation:'ground-effect-2022',headline:'Floor-edge and roll-hoop refinements',technical:'Ground-effect concept retained. Floor-edge changes and stricter plank/floor controls reduced porpoising-related performance exploitation; roll-hoop safety tests strengthened.',sporting:'23 Grands Prix. Sprint format expanded to six events; revised sprint-weekend structure.',financial:'Cost cap reduced to $135M baseline for a 21-race season, with permitted adjustments; continued ATR handicap.',reset:{aero:2}},
2024:{era:'GROUND-EFFECT · REGULATORY STABILITY',generation:'ground-effect-2022',headline:'Stable technical rules with targeted safety updates',technical:'Ground-effect cars and 18-inch tyres retained. No wholesale chassis reset; targeted safety, component and floor-detail amendments. DRS remained the overtaking aid.',sporting:'24 Grands Prix. Sprint format retained at six events; revised points and operational procedures for selected sessions.',financial:'$135M cost-cap baseline continued, adjusted for calendar and permitted exclusions; ATR restrictions remained.',reset:{}},
2025:{era:'FINAL GROUND-EFFECT SEASON',generation:'ground-effect-2022',headline:'Ground-effect carry-over and final year before 2026 reset',technical:'2022 ground-effect architecture retained with targeted floor, aero, safety and component refinements. 18-inch tyres and 1.6L V6 hybrid power units continued.',sporting:'24 Grands Prix. Sprint format at six events; revised points for fastest lap removed; new rookie FP1 participation requirement.',financial:'$135M cost-cap baseline continued, subject to regulatory adjustments; ATR handicap remained.',reset:{}},
2026:{era:'NEXT-GENERATION ACTIVE-AERO & POWER-UNIT REGULATIONS',generation:'active-aero-2026',headline:'Smaller cars, active aerodynamics and new hybrid power units',technical:'Shorter and narrower cars; lower minimum mass target; flatter floor replacing ground-effect tunnels; active front and rear aero modes replacing DRS; revised 1.6L V6 hybrid with much greater electrical contribution, MGU-H removed, sustainable fuel and approximately 50/50 ICE-electric power split.',sporting:'New energy-management modes and overtaking functions; revised car dimensions, safety structures and operating procedures. Eleven constructors in the 2026 grid.',financial:'Cost-cap and power-unit manufacturer financial regulations continue under updated 2026 framework.',reset:{aero:7,chassis:4,power:5,suspension:2,reliability:1}}
};
const NODES={aero:['frontWing','floor','rearWing','diffuser','beamWing','aeroEfficiency'],chassis:['monocoque','weight','cooling','brakeDucts','chassisStiffness'],suspension:['frontSuspension','rearSuspension','dampers','steering','suspensionControl'],reliability:['engineDurability','gearboxDurability','hydraulics','coolingReliability','electricalReliability'],power:['combustion','energyStore','turbo','mguK','puIntegration']};
function clone(x){return JSON.parse(JSON.stringify(x));}
function syncDepartmentNodes(c,key,value){
 c.partDetails=c.partDetails||{};c.rndNodeLevels=c.rndNodeLevels||{};
 (NODES[key]||[]).forEach(id=>{c.partDetails[id]=Number(value);c.rndNodeLevels[id]=Math.max(0,Number(c.rndNodeLevels[id])||0);});
}
function applyRegulationProfile(c,previous,year){
 if(!c)return null;const y=Number(year),profile=REGULATIONS[y];if(!profile)return null;
 c.regulations=clone(profile);c.regulationEra=profile.era;c.regulationGeneration=profile.generation;
 c.regulationHistory=Array.isArray(c.regulationHistory)?c.regulationHistory:[];
 c.regulationTransitions=Array.isArray(c.regulationTransitions)?c.regulationTransitions:[];
 const already=c.regulationTransitions.some(x=>Number(x.season)===y);
 if(!already&&Number(previous)&&profile.reset&&Object.keys(profile.reset).length){
  const changes=[];
  Object.entries(profile.reset).forEach(([key,loss])=>{
   const before=Number(c.parts?.[key] ?? ((key==='power'?c.enginePower:c.car) || 70));
   const after=Math.max(40,before-Number(loss));
   c.parts=c.parts||{};c.parts[key]=after;
   if(key==='power')c.enginePower=after;
   if(key==='reliability'){c.engineReliability=Math.max(50,Number(c.engineReliability||after)-Number(loss));c.gearboxReliability=Math.max(50,Number(c.gearboxReliability||after)-Number(loss));}
   syncDepartmentNodes(c,key,after);
   changes.push({department:key,before,after,loss:Number(loss)});
  });
  if(changes.length){
   c.car=typeof getPartOverall==='function'?getPartOverall(c):Math.round(['aero','chassis','power','suspension','reliability'].reduce((s,k)=>s+Number(c.parts?.[k]||70),0)/5);
   c.aiCarRatings=c.aiCarRatings||{};c.aiCarRatingHistory=c.aiCarRatingHistory||{};
   const aiBaseLoss=changes.reduce((sum,x)=>sum+x.loss,0)*.22;
   Object.entries(c.aiCarRatings).forEach(([team,rating])=>{if(team===c.name)return;const hash=[...String(team)].reduce((sum,ch)=>sum+ch.charCodeAt(0),0);const adaptation=.86+(hash%29)/100;const nextRating=Math.max(55,Number(rating||70)-aiBaseLoss*adaptation);c.aiCarRatings[team]=Number(nextRating.toFixed(2));c.aiCarRatingHistory[team]=c.aiCarRatingHistory[team]||[];c.aiCarRatingHistory[team].push({season:y,round:0,rating:c.aiCarRatings[team],event:'regulation reset'});});
   c.regulationHistory.push({season:y,previousSeason:Number(previous),changes,aiImpact:aiBaseLoss,headline:profile.headline});
   c.history=Array.isArray(c.history)?c.history:[];
   c.history.push({title:`${y} regulation reset · ${profile.headline}`,text:changes.map(x=>`${x.department}: ${x.before} → ${x.after} (-${x.loss})`).join('; ')+'. The affected R&D component ratings have been reduced together, so the relevant development nodes can restore the lost performance.',date:`Season ${y} · Pre-season`});
  }
 }
 if(!already)c.regulationTransitions.push({season:y,previousSeason:Number(previous)||null,generation:profile.generation,headline:profile.headline});
 return profile;
}

function migrateRegulationTimeline(c){
 if(!c)return;const current=Number(c.season)||2026;
 const recorded=[...(c.seasonHistory||[]).map(x=>Number(x.season)||0),...(c.raceArchive||[]).map(x=>Number(x.season)||0)].filter(x=>x>=2016&&x<=current);
 const start=Number(c.startSeason)|| (recorded.length?Math.min(...recorded):current);
 c.startSeason=start;
 for(let year=Math.max(2017,start+1);year<=Math.min(2026,current);year++)applyRegulationProfile(c,year-1,year);
 if(current>=2016&&current<=2026&&!c.regulationTransitions?.some(x=>Number(x.season)===current))applyRegulationProfile(c,null,current);
}
function normalizeHistoricalGrid(c,year){
 if(!c||typeof SEASONS==='undefined')return false;const y=Number(year),season=SEASONS[y];if(!season?.teams?.length)return false;
 const official=Object.fromEntries(season.teams.map(t=>[t[0],[...(t[2]||[])]]));
 const officialNames=new Set(Object.values(official).flat());
 const roster={};Object.entries(official).forEach(([team,drivers])=>roster[team]=drivers);
 const isExisting=Object.prototype.hasOwnProperty.call(official,c.name);
 if(isExisting){
  const baseline=[...(official[c.name]||[])];
  const playerOverrides=(c.drivers||[]).filter(n=>c.contracts?.[n]?.playerManaged&&Number(c.contracts[n].expirySeason||0)>y);
  playerOverrides.slice(0,2).forEach((n,i)=>baseline[i]=n);
  const keep=new Set(baseline);Object.keys(roster).forEach(team=>{if(team!==c.name)roster[team]=roster[team].filter(n=>!keep.has(n));});
  roster[c.name]=baseline;
  c.drivers=[...baseline];
 }else{
  const owned=[...(c.drivers||[])].filter(Boolean).slice(0,2);
  Object.keys(roster).forEach(team=>{roster[team]=roster[team].filter(n=>!owned.includes(n));});
  roster[c.name]=owned;
 }
 // Resolve any duplicate and incomplete seats with season-specific F1 names only.
 const seen=new Set();Object.keys(roster).forEach(team=>{roster[team]=[...new Set((roster[team]||[]).filter(Boolean).filter(n=>{if(seen.has(n))return false;seen.add(n);return true;}))].slice(0,2);});
 Object.keys(roster).forEach(team=>{while(roster[team].length<2){const candidate=season.teams.flatMap(t=>t[2]).find(n=>!seen.has(n));if(!candidate)break;roster[team].push(candidate);seen.add(candidate);}});
 c.roster=roster;c.drivers=[...(roster[c.name]||c.drivers||[])];c.gridSeasonApplied=y;
 return true;
}

function historicalExpiry(name,year){
 const y=Number(year)||2026;let last=0;
 if(typeof SEASONS!=='undefined')Object.entries(SEASONS).forEach(([season,data])=>{const sy=Number(season);if(sy>=2016&&sy<=2026&&(data.teams||[]).some(t=>(t[2]||[]).includes(name)))last=Math.max(last,sy);});
 if(!last)return y+2;
 if(last===2026){const hash=[...String(name)].reduce((sum,ch)=>sum+ch.charCodeAt(0),0);return 2028+(hash%3);}
 return last+1;
}
function ensureHistoricalContracts(c,year){
 if(!c)return;c.contracts=c.contracts||{};
 Object.values(c.roster||{}).flat().forEach(name=>{
  const existing=c.contracts[name];
  if(existing?.playerManaged)return;
  const target=historicalExpiry(name,year);
  if(!existing)c.contracts[name]={startSeason:Number(year),expirySeason:target,length:Math.max(1,target-Number(year)),status:'Active',annualSalary:Math.max(1,Math.round(((Number(DRIVER_RATING?.[name])||78)-65)*.45*10)/10),playerManaged:false};
  else if(!Number.isFinite(Number(existing.expirySeason))||Number(existing.expirySeason)<target){existing.expirySeason=target;existing.length=Math.max(1,target-Number(existing.startSeason||year));existing.status=existing.status==='Expired'?'Active':(existing.status||'Active');}
 });
}
function expireHistoricalContracts(c,year){
 if(!c)return [];const y=Number(year)||Number(c.season);c.contracts=c.contracts||{};c.freeAgents=Array.isArray(c.freeAgents)?c.freeAgents:[];c.history=Array.isArray(c.history)?c.history:[];
 const expired=[];
 Object.entries(c.contracts).forEach(([name,ct])=>{if(ct&&ct.status!=='Expired'&&ct.status!=='Released'&&Number.isFinite(Number(ct.expirySeason))&&Number(ct.expirySeason)<=y){ct.status='Expired';ct.expiredSeason=y;if(!c.freeAgents.includes(name))c.freeAgents.push(name);expired.push(name);c.history.push({title:'Driver contract expired · released',text:`${name}'s contract expired at the start of the ${y} season. They have been removed from their race seat and released to the driver market.`,date:`Season ${y} · Pre-season`});}});
 if(!expired.length)return expired;
 Object.keys(c.roster||{}).forEach(team=>{c.roster[team]=(c.roster[team]||[]).filter(name=>!expired.includes(name));});
 const assigned=new Set(Object.values(c.roster||{}).flat());const f1=typeof allDrivers==='function'?allDrivers(y):[];let f2Promotions=0;
 Object.keys(c.roster||{}).forEach(team=>{const line=c.roster[team];while(line.length<2){const replacement=[...c.freeAgents,...f1].find(name=>name&&!assigned.has(name)&&!expired.includes(name));const junior=!replacement&&f2Promotions<1?(typeof juniorDrivers==='function'?juniorDrivers(y):[]).filter(d=>d.series==='F2'&&Number(d.rating)>=82).sort((a,b)=>b.rating-a.rating).find(d=>!assigned.has(d.name)):null;const name=replacement||junior?.name;if(!name)break;if(junior)f2Promotions++;line.push(name);assigned.add(name);c.freeAgents=c.freeAgents.filter(n=>n!==name);c.contracts[name]={startSeason:y,expirySeason:team===c.name?y+2:historicalExpiry(name,y),length:team===c.name?2:Math.max(1,historicalExpiry(name,y)-y),status:'Active',annualSalary:Math.max(1,Math.round(((Number(DRIVER_RATING?.[name])||junior?.rating||78)-65)*.45*10)/10),playerManaged:team===c.name};c.history.push({title:'Replacement driver signed after contract expiry',text:`${name} joined ${team} to fill a seat vacated by an expired contract${junior?' after promotion from Formula 2':' from the available F1 driver pool'}.`,date:`Season ${y} · Pre-season`});}});
 if(c.roster[c.name])c.drivers=[...c.roster[c.name]];
 return expired;
}

function regulationHtml(c){const r=c?.regulations;if(!r)return '';const impact=Object.entries(r.reset||{}).map(([key,value])=>`${key.toUpperCase()} −${value}`).join(' · ');return `<section class="gpm-regulation-summary"><div class="eyebrow">${String(c.season)} FIA REGULATIONS · ${r.era}</div><h3>${r.headline}</h3><p><b>TECHNICAL</b> ${r.technical}</p><p><b>SPORTING</b> ${r.sporting}</p><p><b>FINANCIAL</b> ${r.financial}</p><p><b>IN-GAME DEVELOPMENT IMPACT</b> ${impact||'No major department rating reset this season.'}</p></section>`;}
// The old simulator applied random FIA penalties mid-season. Historical regulation changes now happen once, at the correct season transition.
if(typeof applyRegulationChange==='function')applyRegulationChange=function(){return null;};
window.applyGpmHistoricalRegulations0110=applyRegulationProfile;
window.syncGpmDepartmentNodes0110=(c,key)=>{if(c?.parts?.[key]!=null)syncDepartmentNodes(c,key,Number(c.parts[key]));};
window.GPMHistoricalCareer0110={REGULATIONS,NODES,applyRegulationProfile,normalizeHistoricalGrid,syncDepartmentNodes,regulationHtml,historicalExpiry,ensureHistoricalContracts,expireHistoricalContracts,migrateRegulationTimeline};
// Existing saves that carried a previous season's entire grid receive a one-time season-grid migration.
if(typeof renderCareer==='function'){
 const oldRender=renderCareer;
 renderCareer=function(){const c=typeof currentCareer!=='undefined'?currentCareer:null;if(c&&Number(c.season)<=2026&&Number(c.season)>=2016&&Number(c.gridSeasonApplied)!==Number(c.season)){normalizeHistoricalGrid(c,c.season);migrateRegulationTimeline(c);ensureHistoricalContracts(c,c.season);expireHistoricalContracts(c,c.season);if(typeof saveCareer==='function')saveCareer();}oldRender();const badge=document.getElementById('seasonBadge');if(badge&&c)badge.innerHTML=`<span class="live-dot"></span> ${c.season} SEASON · BUILD 0.10.11.0`;};
}
// Ensure new careers have the selected season's real grid and a complete set of two-year contracts.
if(typeof createCareer==='function'){
 const oldCreate=createCareer;
 createCareer=function(){const before=typeof currentCareer!=='undefined'?currentCareer:null;oldCreate();const c=typeof currentCareer!=='undefined'?currentCareer:null;if(c&&c!==before){normalizeHistoricalGrid(c,c.season);c.startSeason=Number(c.season);applyRegulationProfile(c,null,c.season);ensureHistoricalContracts(c,c.season);if(typeof saveCareer==='function')saveCareer();if(typeof renderCareer==='function')renderCareer();}};
}
// Attach the new season's rules and grid before the pre-season report is rendered.
const oldAdvance=typeof advanceSeason==='function'?advanceSeason:null;
if(oldAdvance){advanceSeason=function(){const c=typeof currentCareer!=='undefined'?currentCareer:null,previous=Number(c?.season)||0,next=previous+1;const finish=()=>{const ok=oldAdvance();if(ok&&c){if(Number(c.season)<=2026&&Number(c.season)>=2016&&Number(c.gridSeasonApplied)!==Number(c.season))normalizeHistoricalGrid(c,c.season);applyRegulationProfile(c,previous,c.season);expireHistoricalContracts(c,c.season);if(typeof saveCareer==='function')saveCareer();if(typeof renderCareer==='function')renderCareer();if(typeof showPreSeasonReport==='function')showPreSeasonReport(c);}return ok;};if(c&&next>=1950&&next<=2015&&(!SEASONS[next]?.teams?.length)&&typeof window.loadGpmF1DBSeason==='function'){window.loadGpmF1DBSeason(next).then(ok=>{if(ok)finish();else if(typeof showToast==='function')showToast(`Could not load the official ${next} season grid. Connect to the internet and retry.`);});return true;}return finish();};}
})();
