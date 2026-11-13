/* GRAND PRIX MANAGER 0.7.0 — DRIVER CAREER MODE */
(() => {
'use strict';
const STORE='gpm-driver-careers-v1';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SERIES={
 F4:{rounds:8,base:44,minSeasons:3,promotion:'F3',threshold:5,teams:['Prema Racing','Van Amersfoort Racing','MP Motorsport','ART Grand Prix','US Racing','Campos Racing']},
 F3:{rounds:10,base:56,minSeasons:3,promotion:'F2',threshold:4,teams:['Prema Racing','Trident','ART Grand Prix','Campos Racing','MP Motorsport','Hitech']},
 F2:{rounds:12,base:67,minSeasons:2,promotion:'F1',threshold:3,teams:['Invicta Racing','Prema Racing','Rodin Motorsport','ART Grand Prix','Campos Racing','Hitech']},
 F1:{rounds:24,base:88,minSeasons:1,promotion:null,threshold:0,teams:['Williams Racing','Alpine','Haas','Racing Bulls','Audi','Aston Martin','McLaren','Mercedes','Ferrari','Red Bull Racing']}
};
const RACE_NAMES=['Bahrain','Jeddah','Melbourne','Suzuka','Shanghai','Imola','Monaco','Barcelona','Spielberg','Silverstone','Spa-Francorchamps','Budapest','Zandvoort','Monza','Baku','Singapore','Austin','Mexico City','São Paulo','Las Vegas','Lusail','Abu Dhabi','Miami','Montreal'];
const PTS=[25,18,15,12,10,8,6,4,2,1];
const OPPONENTS={
 F4:['Noah Carter','Luca Moretti','Ethan Walker','Mateo Silva','Oliver Grant','Theo Martin','Alex Novak','Daniel Costa','Leo Fischer','Samir Haddad','Milan Petrov'],
 F3:['Arvid Lindblad','Leonardo Fornaroli','Gabriele Minì','Luke Browning','Dino Beganovic','Mari Boya','Christian Mansell','Tasanapol Inthraphuvasak','Tim Tramnitz','Nikola Tsolov','Laurens van Hoepen'],
 F2:['Victor Martins','Zane Maloney','Jak Crawford','Paul Aron','Isack Hadjar','Gabriel Bortoleto','Kush Maini','Ritomo Miyata','Dennis Hauger','Oliver Bearman','Andrea Kimi Antonelli'],
 F1:['Max Verstappen','Lando Norris','Charles Leclerc','Oscar Piastri','George Russell','Lewis Hamilton','Carlos Sainz','Fernando Alonso','Pierre Gasly','Alex Albon','Yuki Tsunoda']
};
let active=null;
function allSaves(){try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return []}}
function persist(){if(!active)return;const list=allSaves();const i=list.findIndex(x=>String(x.id)===String(active.id));if(i<0)list.push(active);else list[i]=active;localStorage.setItem(STORE,JSON.stringify(list));if(window.gpmDesktop?.saveCloud)window.gpmDesktop.saveCloud({careers:(()=>{try{return JSON.parse(localStorage.getItem('gpm-careers')||'[]')}catch{return []}})(),driverCareers:list}).catch(error=>console.warn('Cloud auto-sync failed:',error));}
function toast(msg){if(typeof window.showToast==='function')window.showToast(msg);else{const n=$('dcToast');if(n){n.textContent=msg;n.hidden=false;}}}
function rating(d){return Math.round(Object.values(d.attributes).reduce((a,b)=>a+b,0)/Object.keys(d.attributes).length)}
function currentSeries(){return SERIES[active.series]}
function teamStrength(team){const strong=['Prema Racing','ART Grand Prix','Invicta Racing','McLaren','Mercedes','Ferrari','Red Bull Racing'];const weak=['US Racing','Van Amersfoort Racing','Haas','Williams Racing'];return strong.includes(team)?3:weak.includes(team)?-2:0;}
function currentRace(){return RACE_NAMES[(active.round)%RACE_NAMES.length]||`Grand Prix ${active.round+1}`}
function pointsPosition(pos){return PTS[pos-1]||0}
function ensureCareer(d){
 d.attributes={pace:50,qualifying:49,racecraft:50,consistency:48,tyres:48,wet:46,...(d.attributes||{})};
 d.points=d.points||0;d.round=Number(d.round)||0;d.season=Number(d.season)||1;
 d.standings=d.standings||{};d.raceLog=Array.isArray(d.raceLog)?d.raceLog:[];
 d.history=Array.isArray(d.history)?d.history:[];
 d.development=Number(d.development)||0;d.form=Number(d.form)||0;
 d.wins=Number(d.wins)||0;d.podiums=Number(d.podiums)||0;
 d.bestFinish=Number(d.bestFinish)||99;d.contractYears=Number(d.contractYears)||1;
 d.seasonsInSeries=Number(d.seasonsInSeries)||1;d.rejections=Number(d.rejections)||0;d.teamHistory=Array.isArray(d.teamHistory)?d.teamHistory:[];
 d.weekendStage=Number(d.weekendStage)||0;
 d.attributes.pace=Math.min(99,d.attributes.pace);
 return d;
}
function fillCareerTeams(){const sel=$('dcTeam');if(!sel)return;const series=$('dcSeries')?.value||'F4';sel.innerHTML=SERIES[series].teams.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('');}
function openLanding(){
 if(typeof window.showView==='function')window.showView('driverCareer');
 const view=$('driverCareerView');if(!view)return;
 const setup=$('dcSetup'),dash=$('dcDashboard');
 if(active){setup.hidden=true;dash.hidden=false;render();}else{setup.hidden=false;dash.hidden=true;}
 renderSaves();
}
function createCareer(){
 const name=$('dcName').value.trim();
 if(!name){$('dcName').focus();toast('Enter your driver name first.');return;}
 if(allSaves().length>=5){toast('Driver career slots are full. Delete a saved driver career before starting another.');return;}
 const series=$('dcSeries').value;
 const base=SERIES[series].base;
 const age=Math.max(15,Math.min(25,Number($('dcAge').value)||17));
 const number=Math.max(2,Math.min(99,Number($('dcNumber').value)||27));
 const team=$('dcTeam').value||SERIES[series].teams[0];
 const teamTier={ 'Prema Racing':3,'Van Amersfoort Racing':2,'MP Motorsport':2,'ART Grand Prix':3,'US Racing':2,'Campos Racing':2,'Trident':2,'Hitech':2,'Invicta Racing':3,'Rodin Motorsport':2,'Williams Racing':1,'Alpine':2,'Haas':1,'Racing Bulls':2,'Audi':2,'Aston Martin':2,'McLaren':3,'Mercedes':3,'Ferrari':3,'Red Bull Racing':3 };
 const acceptanceChance=Math.max(.22,Math.min(.92,.62+(teamTier[team]===3?-.18:teamTier[team]===1?.14:0))); 
 if(Math.random()>acceptanceChance){toast(`${team} rejected your application. Try another team with a more realistic seat opening.`);return;}
 const attr=(offset=0)=>Math.max(35,Math.min(82,base+offset+Math.floor(Math.random()*5)-4));
 active=ensureCareer({
  id:Date.now(),name,nationality:$('dcNationality').value.trim()||'Unspecified',
  number,age,series,team,season:1,round:0,points:0,standings:{},
  attributes:{pace:attr(),qualifying:attr(-1),racecraft:attr(1),consistency:attr(-2),tyres:attr(-1),wet:attr(-3)},
  potential:Math.min(96,base+43),form:0,development:0,wins:0,podiums:0,bestFinish:99,
  raceLog:[],history:[],contractYears:2,weekendStage:0,weekendBonus:0,
  currentGrid:null,seasonStats:{wins:0,podiums:0,points:0},seasonsInSeries:1,rejections:0,teamHistory:[{series,team,season:1}],created:new Date().toISOString()
 });
 persist();renderSaves();openLanding();toast(`${name} has signed their first ${series} contract with ${team}.`);
}
function resume(id){const found=allSaves().find(x=>String(x.id)===String(id));if(!found){toast('That driver save could not be found.');return;}active=ensureCareer(found);openLanding();}
function deleteCareer(id){
 const list=allSaves().filter(x=>String(x.id)!==String(id));localStorage.setItem(STORE,JSON.stringify(list));if(window.gpmDesktop?.saveCloud)window.gpmDesktop.saveCloud({careers:(()=>{try{return JSON.parse(localStorage.getItem('gpm-careers')||'[]')}catch{return []}})(),driverCareers:list}).catch(error=>console.warn('Cloud delete sync failed:',error));
 if(active&&String(active.id)===String(id))active=null;
 renderSaves();
 if($('driverCareerView')?.classList.contains('active'))openLanding();
 toast('Driver career deleted.');
}
function renderSaves(){
 const root=$('dcSavedList');if(!root)return;
 const list=allSaves();
 root.innerHTML=list.length?list.map(d=>`<div class="dc-save-row"><div><b>${esc(d.name)}</b><small>${esc(d.series)} · Season ${d.season||1} · ${esc(d.team||'Free agent')}</small></div><button class="small-action" data-dc-resume="${esc(d.id)}">CONTINUE</button><button class="small-action dc-delete" data-dc-delete="${esc(d.id)}">DELETE</button></div>`).join(''):'<p class="dc-muted">No driver careers yet. Create your first racing driver above.</p>';
 root.querySelectorAll('[data-dc-resume]').forEach(b=>b.addEventListener('click',()=>resume(b.dataset.dcResume)));
 root.querySelectorAll('[data-dc-delete]').forEach(b=>b.addEventListener('click',()=>{if(confirm('Delete this driver career permanently?'))deleteCareer(b.dataset.dcDelete);}));
}
function sortedStandings(){
 return Object.entries(active.standings||{}).map(([name,points])=>({name,points})).sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name));
}
function standingsHtml(){
 const rows=sortedStandings();
 return `<div class="dc-table-wrap"><table class="dc-table"><thead><tr><th>POS</th><th>DRIVER</th><th>PTS</th></tr></thead><tbody>${rows.slice(0,12).map((x,i)=>`<tr class="${x.name===active.name?'dc-you':''}"><td>${i+1}</td><td>${esc(x.name)}</td><td>${x.points}</td></tr>`).join('')}</tbody></table></div>`;
}
function render(){
 if(!active)return;
 ensureCareer(active);
 $('dcSetup').hidden=true;$('dcDashboard').hidden=false;
 $('dcDriverName').textContent=active.name;
 $('dcSeriesLabel').textContent=`${active.series} · SEASON ${active.season}`;
 $('dcTeamName').textContent=`${active.team} · ${active.status||'SIGNED DRIVER'}`;
 $('dcAgeLabel').textContent=`AGE ${active.age} · #${active.number||27} · ${active.nationality||'Unspecified'}`;
 $('dcRating').textContent=rating(active);
 $('dcPotential').textContent=active.potential;
 $('dcPoints').textContent=active.points;
 $('dcRound').textContent=`${Math.min(active.round+1,currentSeries().rounds)} / ${currentSeries().rounds}`;
 $('dcWins').textContent=active.wins;
 $('dcPodiums').textContent=active.podiums;
 $('dcProgress').style.width=`${Math.min(100,(active.round/currentSeries().rounds)*100)}%`;
 const ladderOrder=['F4','F3','F2','F1'];
 document.querySelectorAll('[data-dc-ladder]').forEach(el=>{
  const idx=ladderOrder.indexOf(el.dataset.dcLadder), current=ladderOrder.indexOf(active.series);
  el.classList.toggle('active',idx===current);
  el.classList.toggle('completed',idx<current);
 });
 $('dcAttributes').innerHTML=Object.entries({PACE:'pace',QUALIFYING:'qualifying',RACECRAFT:'racecraft',CONSISTENCY:'consistency','TYRE MANAGEMENT':'tyres','WET WEATHER':'wet'}).map(([label,key])=>`<div class="dc-attribute"><span>${label}</span><div><i style="width:${active.attributes[key]}%"></i></div><b>${active.attributes[key]}</b></div>`).join('');
 const stage=active.weekendStage;
 const complete=active.round>=currentSeries().rounds;
 const stageNames=['PRACTICE','QUALIFYING','RACE'];
 $('dcStage').textContent=complete?'SEASON COMPLETE':stageNames[stage]||'RACE COMPLETE';
 $('dcWeekendTitle').textContent=complete?`${active.series} · SEASON ${active.season} COMPLETE`:stage===0?`${currentRace()} · PRACTICE`:stage===1?`${currentRace()} · QUALIFYING`: `${currentRace()} · READY TO RACE`;
 $('dcWeekendText').textContent=complete?'Your championship is complete. Review your final position and choose whether to accept promotion or race another season.':stage===0?'Set a practice target and learn the circuit. Practice builds confidence and gives a small performance bonus.':stage===1?'Your qualifying pace sets your starting position. Consistency and qualifying skill matter most.':'The grid is set. Start the Grand Prix to earn championship points and development progress.';
 $('dcWeekendButton').textContent=complete?'VIEW SEASON OFFERS →':stage===0?'COMPLETE PRACTICE →':stage===1?'START QUALIFYING →':'START GRAND PRIX →';
 $('dcWeekendButton').disabled=false;
 $('dcStanding').innerHTML=standingsHtml();
 $('dcRecentResults').innerHTML=active.raceLog.slice(-5).reverse().map(r=>`<div class="dc-result-row"><span>S${r.season} · R${r.round}</span><b>${esc(r.race)}</b><strong>P${r.position}</strong><small>${r.points} PTS</small></div>`).join('')||'<p class="dc-muted">Your race results will appear here.</p>';
 $('dcTrainingPoints').textContent=active.development;
 $('dcTrainingButton').disabled=active.development<1;
 persist();
}
function completePractice(){
 const focus=$('dcPracticeFocus').value;
 const skill=active.attributes[focus]||active.attributes.pace;
 active.weekendBonus=Math.max(0,Math.min(7,Math.round((skill-45)/10)+Math.floor(Math.random()*3)));
 active.form=Math.max(-5,Math.min(8,active.form+1));
 active.weekendStage=1;
 persist();render();toast(`Practice complete. Performance bonus +${active.weekendBonus}.`);
}
function completeQualifying(){
 const opponents=(OPPONENTS[active.series]||OPPONENTS.F1).filter(n=>n!==active.name);
 const playerScore=active.attributes.qualifying*0.45+active.attributes.pace*0.4+active.attributes.consistency*0.15+active.form+active.weekendBonus+teamStrength(active.team)+Math.random()*9;
 const field=opponents.map((name,i)=>({name,score:SERIES[active.series].base-3+(i%5)*.9+Math.random()*8+(active.series==='F1'&&i<4?3:0)}));
 field.push({name:active.name,score:playerScore});
 field.sort((a,b)=>b.score-a.score);
 active.currentGrid=field.findIndex(x=>x.name===active.name)+1;
 active.weekendStage=2;persist();render();
 toast(`Qualifying complete: P${active.currentGrid} on the grid.`);
}
function runRace(){
 const opponents=(OPPONENTS[active.series]||OPPONENTS.F1).filter(n=>n!==active.name);
 const grid=active.currentGrid||10;
 const playerScore=active.attributes.pace*.36+active.attributes.racecraft*.28+active.attributes.tyres*.14+active.attributes.consistency*.12+active.attributes.wet*.1+active.form+active.weekendBonus+(12-grid)*.25+teamStrength(active.team)+Math.random()*12;
 const field=opponents.map((name,i)=>({name,score:SERIES[active.series].base-3+(i%6)*.9+Math.random()*8+(active.series==='F1'&&i<4?3:0)}));
 field.push({name:active.name,score:playerScore});
 field.sort((a,b)=>b.score-a.score);
 const position=field.findIndex(x=>x.name===active.name)+1;
 const points=pointsPosition(position);
 const race=currentRace();
 active.points+=points;active.standings[active.name]=(active.standings[active.name]||0)+points;
 field.forEach((x,i)=>{if(x.name!==active.name)active.standings[x.name]=(active.standings[x.name]||0)+pointsPosition(i+1);});
 if(position===1){active.wins++;active.seasonStats.wins++;}
 if(position<=3){active.podiums++;active.seasonStats.podiums++;}
 active.bestFinish=Math.min(active.bestFinish,position);
 active.seasonStats.points+=points;
 active.raceLog.push({season:active.season,round:active.round+1,race,position,points,grid,series:active.series});
 active.round++;
 active.development+=position<=3?1:(active.round%3===0?1:0);
 active.form=Math.max(-5,Math.min(8,active.form+(position<=3?2:-1)));
 active.weekendStage=0;active.weekendBonus=0;active.currentGrid=null;
 persist();render();
 showRaceReport({race,position,points,grid});
 if(active.round>=currentSeries().rounds)finishSeason();
}
function showRaceReport(r){
 const modal=$('dcReport');modal.hidden=false;
 $('dcReportBody').innerHTML=`<div class="dc-report-hero"><span>${esc(active.series)} · ${esc(r.race)}</span><strong>P${r.position}</strong><b>${r.points} CHAMPIONSHIP POINTS</b><small>Started P${r.grid} · Finished P${r.position}</small></div>`;
 $('dcReportClose').onclick=()=>modal.hidden=true;
}
function finishSeason(){
 const rows=sortedStandings();
 const pos=rows.findIndex(x=>x.name===active.name)+1;
 const series=active.series;
 const eligible=!!SERIES[series].promotion&&pos>0&&pos<=SERIES[series].threshold&&active.seasonsInSeries>=(SERIES[series].minSeasons||1);
 active.history.push({series,season:active.season,position:pos,points:active.points,wins:active.seasonStats.wins,podiums:active.seasonStats.podiums,team:active.team});
 active.lastSeasonPosition=pos;
 active.promotionAvailable=eligible?SERIES[series].promotion:null;
 persist();
 setTimeout(()=>showSeasonOffer(pos,eligible),250);
}
function showSeasonOffer(position,eligible){
 const modal=$('dcReport');modal.hidden=false;
 const next=SERIES[active.series].promotion;
 $('dcReportBody').innerHTML=`<div class="dc-season-report"><div class="dc-kicker">SEASON ${active.season} COMPLETE</div><h2>${esc(active.name)} · P${position}</h2><p>${active.series} championship finished with <b>${active.points} points</b>, ${active.seasonStats.wins} wins and ${active.seasonStats.podiums} podiums.</p>${eligible?`<p class="dc-promotion">PROMOTION ELIGIBILITY: ${next}</p><p>Your results and experience earned applications to the next category. Choose a team; they may accept or reject your application.</p>`:active.series==='F1'?'<p>You have completed an F1 season. Renew your seat and keep chasing the world championship.</p>':(SERIES[active.series].promotion&&active.seasonsInSeries<(SERIES[active.series].minSeasons||1)?`<p>You need at least ${SERIES[active.series].minSeasons} seasons in ${active.series}. You have completed ${active.seasonsInSeries}. Your results count, but teams will not consider promotion until you have enough experience.</p>`:'<p>You have not reached the promotion places. Stay in this category, improve your results and try again next season.</p>')}<div class="dc-report-actions"><button id="dcAcceptPromotion" class="primary-btn">${eligible?`APPLY FOR ${next} SEAT`:'CONTINUE CAREER'} →</button><button id="dcStaySeason" class="secondary-btn">STAY IN ${active.series}</button></div></div>`;
 $('dcReportClose').onclick=()=>modal.hidden=true;
 $('dcAcceptPromotion').onclick=()=>eligible?showTeamApplications(next):startNextDriverSeason(active.series);
 $('dcStaySeason').onclick=()=>startNextDriverSeason(active.series);
}
function showTeamApplications(series){
 const teams=SERIES[series].teams;
 $('dcReportBody').innerHTML=`<div class="dc-season-report"><div class="dc-kicker">DRIVER MARKET · ${series}</div><h2>Choose your next team</h2><p>Submit an application. Top teams are harder to impress; a rejection means you stay in your current series for another season.</p><label for="dcOfferTeam">TEAM APPLICATION</label><select id="dcOfferTeam">${teams.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select><div class="dc-report-actions"><button id="dcApplyTeam" class="primary-btn">SUBMIT APPLICATION</button><button id="dcStayTeam" class="secondary-btn">STAY IN ${active.series}</button></div></div>`;
 $('dcApplyTeam').onclick=()=>{const team=$('dcOfferTeam').value;const top=['McLaren','Mercedes','Ferrari','Red Bull Racing','Prema Racing','ART Grand Prix','Invicta Racing'].includes(team);const chance=Math.max(.12,Math.min(.94,.50+(rating(active)-SERIES[series].base)*.012+(active.lastSeasonPosition<=2?.25:active.lastSeasonPosition<=5?.15:0)-(top?.18:0))); if(Math.random()>chance){active.rejections++;toast(`${team} rejected your application. You will need another season to strengthen your CV.`);startNextDriverSeason(active.series);return;}active.status='CONTRACTED';active.teamHistory.push({series,team,season:active.season+1});startNextDriverSeason(series,team);};
 $('dcStayTeam').onclick=()=>startNextDriverSeason(active.series);
}
function startNextDriverSeason(series,chosenTeam=null){
 const old=active.series;
 active.series=series;active.season++;active.round=0;active.points=0;active.standings={};
 active.seasonsInSeries=series===old?(active.seasonsInSeries||1)+1:1;
 active.team=chosenTeam||active.team;
 active.contractYears=Math.max(1,active.contractYears-1);
 active.seasonStats={wins:0,podiums:0,points:0};active.weekendStage=0;active.lastSeasonPosition=null;
 active.form=Math.max(-2,Math.min(6,active.form));
 active.development+=1;
 // Slow, age-appropriate development: a small chance of one attribute improving.
 const keys=Object.keys(active.attributes);const growthChance=active.age<=21?.42:active.age<=24?.25:.10;
 if(Math.random()<growthChance){const k=keys[Math.floor(Math.random()*keys.length)];active.attributes[k]=Math.min(active.potential,active.attributes[k]+1);}
 active.age+=1;
 active.promotionAvailable=null;
 persist();$('dcReport').hidden=true;render();
 toast(series!==old?`Congratulations — promoted to ${series}!`:`Season ${active.season} begins in ${series}.`);
}
function train(){
 if(!active||active.development<1)return;
 const key=$('dcTrainingSkill').value;
 if(!Object.prototype.hasOwnProperty.call(active.attributes,key))return;
 if(active.attributes[key]>=active.potential){toast('This attribute has reached your current potential ceiling.');return;}
 active.attributes[key]=Math.min(active.potential,active.attributes[key]+1);
 active.development--;persist();render();toast(`${key.toUpperCase()} improved.`);
}
function backHome(){
 persist();active=null;
 if(typeof window.showView==='function')window.showView('home');
 renderSaves();
}
function bind(){
 $('driverCareerModeBtn')?.addEventListener('click',openLanding);
 $('dcCreateBtn')?.addEventListener('click',createCareer);
 $('dcSeries')?.addEventListener('change',fillCareerTeams);fillCareerTeams();
 $('dcHomeBtn')?.addEventListener('click',backHome);
 $('dcWeekendButton')?.addEventListener('click',()=>{if(!active)return;if(active.round>=currentSeries().rounds){showSeasonOffer(active.lastSeasonPosition||sortedStandings().findIndex(x=>x.name===active.name)+1,!!active.promotionAvailable);return;}if(active.weekendStage===0)completePractice();else if(active.weekendStage===1)completeQualifying();else runRace();});
 $('dcTrainingButton')?.addEventListener('click',train);
 $('dcNewCareerBtn')?.addEventListener('click',()=>{persist();active=null;$('dcSetup').hidden=false;$('dcDashboard').hidden=true;});
 $('dcHomeBtn2')?.addEventListener('click',backHome);
 $('dcReportClose')?.addEventListener('click',()=>$('dcReport').hidden=true);
 renderSaves();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
window.openDriverCareerLanding=openLanding;
})();