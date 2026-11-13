/* Grand Prix Manager 0.10.7 — team identity input hardening + connected R&D tree */
(() => {
'use strict';
const $f=id=>document.getElementById(id);
const clamp107=(n,min,max)=>Math.max(min,Math.min(max,Number(n)||0));
const safeText107=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Keep the team name in the input itself and a mirrored data value. This survives
// focus changes and avoids an empty value if the modal is re-rendered before submit.
function bindTeamNameField(){
 const field=$f('teamName');if(!field||field.dataset.gpm107Bound)return;
 field.dataset.gpm107Bound='1';
 const sync=()=>{field.dataset.gpmTeamName=field.value;};
 field.addEventListener('input',sync);field.addEventListener('change',sync);
 field.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$f('createBtn')?.click();}});
 field.addEventListener('focus',()=>field.classList.add('gpm-team-name-focused'));
 field.addEventListener('blur',()=>field.classList.remove('gpm-team-name-focused'));
}
const originalOpenCareer107=window.openCareer;
if(typeof originalOpenCareer107==='function'){
 window.openCareer=function(mode){
  originalOpenCareer107(mode);
  if(mode==='team'){
   const field=$f('teamName');if(field){field.hidden=false;field.disabled=false;field.readOnly=false;field.value='';field.dataset.gpmTeamName='';field.setAttribute('autocomplete','off');field.setAttribute('aria-label','Enter your constructor name');bindTeamNameField();requestAnimationFrame(()=>{field.focus({preventScroll:true});});}
  }
 };
}
// openCareer is a top-level lexical function in app.js, so replace its global binding too.
if(typeof openCareer==='function'){
 const baseOpenCareer=openCareer;
 openCareer=function(mode){
  baseOpenCareer(mode);
  if(mode==='team'){
   const field=$f('teamName');if(field){field.hidden=false;field.disabled=false;field.readOnly=false;field.value='';field.dataset.gpmTeamName='';bindTeamNameField();requestAnimationFrame(()=>field.focus({preventScroll:true}));}
  }
 };
}
if(typeof createCareer==='function'){
 const baseCreateCareer=createCareer;
 createCareer=function(){
  if(typeof selectedMode!=='undefined'&&selectedMode==='team'){
   const field=$f('teamName');if(field){const typed=String(field.value||field.dataset.gpmTeamName||'').trim();field.value=typed;field.dataset.gpmTeamName=typed;if(!typed){field.focus();if(typeof showToast==='function')showToast('Type your constructor name in the highlighted field first.');return;}}
  }
  return baseCreateCareer();
 };
}

const DEPTS107={
 aero:{label:'AERODYNAMICS',key:'aero',nodes:[
  {id:'frontWing',name:'Front wing package',tier:1,cost:3.2,gain:2},
  {id:'floor',name:'Floor & venturi tunnels',tier:1,cost:4.8,gain:2},
  {id:'rearWing',name:'Rear wing & DRS',tier:1,cost:3.5,gain:2},
  {id:'diffuser',name:'Diffuser geometry',tier:2,cost:4.2,gain:2,requires:['floor']},
  {id:'beamWing',name:'Beam wing assembly',tier:2,cost:3.1,gain:1,requires:['rearWing']},
  {id:'aeroEfficiency',name:'Low-drag efficiency',tier:3,cost:5.4,gain:2,requires:['frontWing','diffuser']}
 ]},
 chassis:{label:'CHASSIS & WEIGHT',key:'chassis',nodes:[
  {id:'monocoque',name:'Monocoque structure',tier:1,cost:4.2,gain:2},
  {id:'weight',name:'Weight distribution',tier:1,cost:4.8,gain:2},
  {id:'cooling',name:'Cooling & packaging',tier:2,cost:3.4,gain:1,requires:['monocoque']},
  {id:'brakeDucts',name:'Brake duct package',tier:2,cost:2.8,gain:1,requires:['weight']},
  {id:'chassisStiffness',name:'Structural stiffness',tier:3,cost:5.1,gain:2,requires:['monocoque','cooling']}
 ]},
 suspension:{label:'SUSPENSION',key:'suspension',nodes:[
  {id:'frontSuspension',name:'Front suspension geometry',tier:1,cost:3.2,gain:2},
  {id:'rearSuspension',name:'Rear suspension geometry',tier:1,cost:3.4,gain:2},
  {id:'dampers',name:'Adaptive damper package',tier:2,cost:2.9,gain:1,requires:['frontSuspension']},
  {id:'steering',name:'Steering response',tier:2,cost:2.5,gain:1,requires:['rearSuspension']},
  {id:'suspensionControl',name:'Suspension control system',tier:3,cost:4.5,gain:2,requires:['dampers','steering']}
 ]},
 reliability:{label:'RELIABILITY',key:'reliability',nodes:[
  {id:'engineDurability',name:'Power-unit durability',tier:1,cost:3.6,gain:2},
  {id:'gearboxDurability',name:'Gearbox durability',tier:1,cost:3.2,gain:2},
  {id:'hydraulics',name:'Hydraulic systems',tier:2,cost:2.7,gain:1,requires:['engineDurability']},
  {id:'coolingReliability',name:'Thermal reliability',tier:2,cost:3.0,gain:1,requires:['gearboxDurability']},
  {id:'electricalReliability',name:'Electrical reliability',tier:3,cost:4.1,gain:2,requires:['hydraulics','coolingReliability']}
 ]},
 power:{label:'POWER UNIT',key:'power',nodes:[
  {id:'combustion',name:'Combustion efficiency',tier:1,cost:5.4,gain:2},
  {id:'energyStore',name:'Energy store',tier:1,cost:4.8,gain:1},
  {id:'turbo',name:'Turbocharger',tier:2,cost:4.6,gain:2,requires:['combustion']},
  {id:'mguK',name:'MGU-K deployment',tier:2,cost:4.4,gain:1,requires:['energyStore']},
  {id:'puIntegration',name:'Power-unit integration',tier:3,cost:6.2,gain:2,requires:['turbo','mguK']}
 ]},
 gearbox:{label:'GEARBOX',key:'gearbox',nodes:[
  {id:'gearboxShift',name:'Shift-speed calibration',tier:1,cost:3.0,gain:2},
  {id:'gearboxEfficiency',name:'Transmission efficiency',tier:1,cost:3.4,gain:1},
  {id:'gearboxCooling',name:'Gearbox cooling',tier:2,cost:2.8,gain:1,requires:['gearboxEfficiency']},
  {id:'gearboxCase',name:'Lightweight casing',tier:2,cost:3.8,gain:2,requires:['gearboxShift']},
  {id:'gearboxControl',name:'Advanced control system',tier:3,cost:4.6,gain:2,requires:['gearboxCooling','gearboxCase']}
 ]}
};
function works107(c){return typeof teamWorksEngine==='function'&&teamWorksEngine(c);}
function ensureTreeState107(c){
 c.rndNodeLevels=c.rndNodeLevels||{};c.partDetails=c.partDetails||{};
 Object.values(DEPTS107).forEach(dep=>dep.nodes.forEach(n=>{
  if(!Number.isFinite(Number(c.partDetails[n.id])))c.partDetails[n.id]=Number(dep.key==='power'?c.enginePower:dep.key==='gearbox'?c.gearboxPerformance:c.parts?.[dep.key]||c.car||70);
  c.rndNodeLevels[n.id]=Math.max(0,Math.min(3,Number(c.rndNodeLevels[n.id])||0));
 }));
}
function updateDeptAggregate107(c,key){
 const dep=Object.values(DEPTS107).find(x=>x.key===key);if(!dep)return;
 const avg=Math.ceil(dep.nodes.reduce((sum,n)=>sum+Number(c.partDetails[n.id]||70),0)/dep.nodes.length-1e-9);
 if(key==='power'){c.enginePower=avg;c.parts.power=avg;}
 else if(key==='gearbox'){c.gearboxPerformance=avg;}
 else c.parts[key]=avg;
 if(typeof getPartOverall==='function')c.car=getPartOverall(c);
}
function openRndTree107(initial='aero'){
 const c=currentCareer;if(!c)return;
 if(typeof ensureTechnicalState==='function')ensureTechnicalState(c);
 ensureTreeState107(c);
 let active=DEPTS107[initial]?initial:'aero';
 const summary=`<div class="gpm107-rnd-summary"><div><small>CAR PERFORMANCE</small><b id="gpm107Car">${Math.round(c.car||70)}/100</b></div><div><small>AVAILABLE BUDGET</small><b id="gpm107Budget">€${Number(c.budget||0).toFixed(1)}M</b></div><div><small>RESEARCH PROGRAMME</small><b>6 DEPARTMENTS</b></div></div><div id="gpm107LastAction" class="gpm107-last-action">${safeText107(c.latestDevelopmentMessage||'No upgrade completed yet. Choose a department and follow its development tree.')}</div><div class="gpm107-rnd-layout"><aside id="gpm107DeptNav" class="gpm107-dept-nav"></aside><section class="gpm107-rnd-main"><div id="gpm107DeptHeader"></div><div id="gpm107Tree" class="gpm107-tree"></div></section></div><p class="gpm107-rnd-note">Each branch has prerequisites. Complete a first-stage component to unlock its next development. Upgrades are permanent and do not reset between seasons. Reliability upgrades improve durability rather than adding raw speed.</p>`;
 const root=showCareerModal('R&D · TECHNICAL DEVELOPMENT TREE',summary,[{label:'CLOSE R&D',kind:'secondary-btn',action:()=>root.hidden=true}]);
 const modalPanel=root.querySelector('.modal');if(modalPanel)modalPanel.scrollTop=0;
 function draw(){
  const nav=root.querySelector('#gpm107DeptNav'),dep=DEPTS107[active];
  nav.innerHTML=Object.entries(DEPTS107).map(([id,d])=>`<button class="gpm107-dept-btn ${active===id?'active':''}" data-dept="${id}"><span>${d.label}</span><b>${Math.round(Number(c.parts[d.key]??(d.key==='power'?c.enginePower:d.key==='gearbox'?c.gearboxPerformance:70)))}/100</b></button>`).join('');
  nav.querySelectorAll('[data-dept]').forEach(b=>b.onclick=()=>{active=b.dataset.dept;draw();});
  const locked=active==='power'&&!works107(c);
  const header=root.querySelector('#gpm107DeptHeader');
  const rating=active==='power'?c.enginePower:active==='gearbox'?c.gearboxPerformance:c.parts[dep.key];
  header.innerHTML=`<div class="gpm107-dept-heading"><div><small>ENGINEERING DEPARTMENT</small><h3>${dep.label}</h3><p>Department performance <b>${Math.round(rating||70)}/100</b></p></div><span class="gpm107-dept-state ${locked?'locked':'ready'}">${locked?'CUSTOMER POWER UNIT · LOCKED':'RESEARCH AVAILABLE'}</span></div>`;
  const tree=root.querySelector('#gpm107Tree');
  tree.innerHTML=[1,2,3].map(tier=>{const nodes=dep.nodes.filter(n=>n.tier===tier);if(!nodes.length)return '';return `<section class="gpm107-tier"><div class="gpm107-tier-label">${['','FOUNDATION RESEARCH','ADVANCED DEVELOPMENT','PERFORMANCE INTEGRATION'][tier]}</div><div class="gpm107-tier-nodes">${nodes.map(n=>{
   const level=Number(c.rndNodeLevels[n.id]||0),value=Math.round(Number(c.partDetails[n.id]||70));
   const requires=(n.requires||[]),missing=requires.filter(id=>Number(c.rndNodeLevels[id]||0)<1),prereq=requires.length?`Requires: ${requires.map(id=>DEPTS107[active].nodes.find(x=>x.id===id)?.name||id).join(' + ')}`:'Foundation node';
   const isLocked=locked||missing.length>0,done=level>=3;
   return `<article class="gpm107-node ${isLocked?'is-locked':''} ${done?'is-complete':''}"><div class="gpm107-node-top"><span>NODE ${String(dep.nodes.indexOf(n)+1).padStart(2,'0')}</span><span>${level>=3?'MAXED':`LEVEL ${level}/3`}</span></div><h4>${n.name}</h4><div class="gpm107-node-stat"><span>TECH RATING</span><b>${value}/100</b></div><div class="gpm107-meter"><i style="width:${clamp107(value,0,100)}%"></i></div><small class="gpm107-prereq">${isLocked?(locked?'Requires your own works power unit':prereq):level?'Development unlocked':'Available to research'}</small><button class="small-action gpm107-upgrade" data-upgrade="${n.id}" ${isLocked||done?'disabled':''}>${locked?'WORKS TEAM REQUIRED':done?'MAX DEVELOPMENT':`UPGRADE · €${n.cost.toFixed(1)}M · +${n.gain}`}</button></article>`;
  }).join('')}</div></section>`;}).join('');
  tree.querySelectorAll('[data-upgrade]').forEach(btn=>btn.onclick=()=>{
   const node=dep.nodes.find(n=>n.id===btn.dataset.upgrade);if(!node)return;
   const level=Number(c.rndNodeLevels[node.id]||0),missing=(node.requires||[]).filter(id=>Number(c.rndNodeLevels[id]||0)<1);
   if(active==='power'&&!works107(c)){showToast('Your constructor needs its own works power unit before engine R&D.');return;}
   if(missing.length){showToast('Complete the prerequisite development first.');return;}
   if(level>=3){showToast('This development node is already at maximum level.');return;}
   if(Number(c.budget)<node.cost){showToast(`Insufficient funds. This upgrade costs €${node.cost.toFixed(1)}M.`);return;}
   const before=Number(c.partDetails[node.id]||70),after=Math.min(100,before+node.gain);if(after<=before){c.rndNodeLevels[node.id]=3;draw();return;}
   c.budget=Number(c.budget)-node.cost;c.partDetails[node.id]=after;c.rndNodeLevels[node.id]=level+1;
   if(active==='reliability')c.reliabilityDevelopment=(Number(c.reliabilityDevelopment)||0)+node.gain;
   updateDeptAggregate107(c,dep.key);
   c.latestDevelopmentMessage=`${node.name} upgraded by ${after-before} points · ${after}/100 · Level ${level+1}/3.`;
   c.latestDevelopmentAt={season:c.season,round:c.round,department:dep.label,upgrade:node.id,before,after,level:level+1};
   c.history=c.history||[];c.history.push({title:'R&D development completed',text:`${c.latestDevelopmentMessage} Research investment: €${node.cost.toFixed(1)}M. This upgrade remains installed for future seasons.`,date:`Season ${c.season} · Round ${c.round}`});
   if(typeof saveCareer==='function')saveCareer();if(typeof renderCareer==='function')renderCareer();
   root.querySelector('#gpm107LastAction').textContent=c.latestDevelopmentMessage;root.querySelector('#gpm107Car').textContent=`${Math.round(c.car||70)}/100`;root.querySelector('#gpm107Budget').textContent=`€${Number(c.budget||0).toFixed(1)}M`;
   draw();showToast(c.latestDevelopmentMessage);
  });
 }
 draw();
}
openUpgradeChooser=openRndTree107;
window.openGpmRndTree=openRndTree107;

})();
