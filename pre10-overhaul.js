/* Grand Prix Manager 0.9.9 — live and simulated race mode selection.
   Keeps the existing career/save model and adds verified, serialisable systems. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const lapCounts = {
    Bahrain:57,'Saudi Arabia':50,Australia:58,Japan:53,China:56,Miami:57,
    'Emilia-Romagna':63,Monaco:78,Canada:70,Spain:66,Austria:71,
    'Great Britain':52,Belgium:44,Hungary:70,Netherlands:72,Italy:53,
    Azerbaijan:51,Singapore:62,'United States':56,'Mexico City':71,
    'São Paulo':71,'Las Vegas':50,Madrid:57,Qatar:57,'Abu Dhabi':58
  };
  const seasonCalendars = {
    2016:['Australia','Bahrain','China','Russia','Spain','Monaco','Canada','Azerbaijan','Austria','Great Britain','Hungary','Germany','Belgium','Italy','Singapore','Malaysia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
    2017:['Australia','China','Bahrain','Russia','Spain','Monaco','Canada','Azerbaijan','Austria','Great Britain','Hungary','Belgium','Italy','Singapore','Malaysia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
    2018:['Australia','Bahrain','China','Azerbaijan','Spain','Monaco','Canada','France','Austria','Great Britain','Germany','Hungary','Belgium','Italy','Singapore','Russia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
    2019:['Australia','Bahrain','China','Azerbaijan','Spain','Monaco','Canada','France','Austria','Great Britain','Germany','Hungary','Belgium','Italy','Singapore','Russia','Japan','Mexico City','United States','São Paulo','Abu Dhabi'],
    2020:['Austria','Styria','Hungary','Great Britain','70th Anniversary','Spain','Belgium','Italy','Tuscany','Russia','Eifel','Portugal','Emilia-Romagna','Turkey','Bahrain','Sakhir','Abu Dhabi'],
    2021:['Bahrain','Emilia-Romagna','Portugal','Spain','Monaco','Azerbaijan','France','Styria','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Russia','Turkey','United States','Mexico City','São Paulo','Qatar','Saudi Arabia','Abu Dhabi'],
    2022:['Bahrain','Saudi Arabia','Australia','Emilia-Romagna','Miami','Spain','Monaco','Azerbaijan','Canada','Great Britain','Austria','France','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
    2023:['Bahrain','Saudi Arabia','Australia','Azerbaijan','Miami','Monaco','Spain','Canada','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Singapore','Japan','Qatar','United States','Mexico City','São Paulo','Las Vegas','Abu Dhabi'],
    2024:['Bahrain','Saudi Arabia','Australia','Japan','China','Miami','Emilia-Romagna','Monaco','Canada','Spain','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
    2025:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Emilia-Romagna','Monaco','Spain','Canada','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'],
    2026:['Australia','China','Japan','Bahrain','Saudi Arabia','Miami','Canada','Monaco','Spain','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Madrid','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi']
  };
  const seasonCalendar = year => seasonCalendars[year] || seasonCalendars[2026];
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const liveEventName = c => seasonCalendar(c.season)[c.round||0] || 'Grand Prix';
  window.getGpmEventName = (season,round) => seasonCalendar(Number(season))[Math.max(1,Number(round)||1)-1] || 'Grand Prix';
  Object.entries(seasonCalendars).forEach(([year,events])=>{if(typeof SEASONS!=='undefined'&&SEASONS[year])SEASONS[year].rounds=events.length;});
  function missingStaff(c) {
    if(typeof ensureStaff==='function')ensureStaff(c);
    const s=c?.staffRoster||{};
    const required=[['engineer',0,'Driver 1 race engineer'],['engineer',1,'Driver 2 race engineer'],['startEngineer',0,'Driver 1 starting engineer'],['startEngineer',1,'Driver 2 starting engineer'],['strategist',null,'Chief strategist'],['pitcrew',null,'Pit crew']];
    return required.filter(([key,index])=>{const value=index===null?s[key]:s[key]?.[index];return !value?.name;}).map(x=>x[2]);
  }
  function openSeasonCalendar() {
    const c=current();if(!c)return;
    const events=seasonCalendar(c.season),rounds=events.length;
    const rows=events.map((event,i)=>{const status=i<c.round?'COMPLETED':i===c.round?'NEXT RACE':'UPCOMING';const cls=i<c.round?'done':i===c.round?'next':'future';return `<article class="gpm-calendar-row ${cls}"><span class="gpm-calendar-round">R${String(i+1).padStart(2,'0')}</span><div><b>${safe(event)} Grand Prix</b><small>${lapCountFor(event)} laps · ${status}</small></div>${i<c.round?'<span class="gpm-calendar-state">✓</span>':i===c.round?'<span class="gpm-calendar-state">NEXT</span>':''}</article>`;}).join('');
    showCareerModal(`${c.season} · SEASON CALENDAR`, `<div class="gpm-calendar-summary"><b>${c.round}/${rounds}</b><span>ROUNDS COMPLETED</span><b>${rounds-c.round}</b><span>REMAINING</span></div><div class="gpm-season-calendar">${rows}</div>`,[{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);
  }
  function updateTeamReadiness(c) {
    const panel=$('gpmTeamReadiness');if(!panel||!c)return;
    const missing=missingStaff(c);
    panel.classList.toggle('ready',missing.length===0);
    panel.innerHTML=`<div><b>${missing.length?'TEAM NOT READY':'TEAM READY'}</b><small>${missing.length?`${missing.length} staff position(s) still need to be filled`:'All required race staff positions are filled'}</small></div><span>${missing.length?`${missing.length} MISSING`:'6 / 6 STAFF'}</span><button type="button" data-readiness-staff>${missing.length?'COMPLETE STAFF':'VIEW STAFF'}</button>`;
    panel.querySelector('[data-readiness-staff]').onclick=()=>openStaffDepartment(missing[0]?.includes('Driver 2')?'engineer2':missing[0]?.includes('starting')?'start1':missing[0]?.includes('strategist')?'strategist':missing[0]?.includes('Pit')?'pitcrew':'engineer1');
  }
  const lapCountFor = event => lapCounts[event] || 58;
  const current = () => currentCareer;
  function ensureCareerSeason(c) {
    if(!c||typeof SEASONS==='undefined')return;
    const years=Object.keys(SEASONS).map(Number).filter(Number.isFinite).sort((a,b)=>a-b);
    const latest=years[years.length-1]||2026;
    const template=SEASONS[latest];
    for(let year=latest+1;year<=Number(c.season);year++){
      if(!SEASONS[year])SEASONS[year]={rounds:template.rounds||24,teams:template.teams.map(t=>[t[0],t[1],[...(t[2]||[])]])};
    }
  }
  const originalTeamBaseRating=teamBaseRating;
  teamBaseRating=function(year,team){return originalTeamBaseRating(year,team)||originalTeamBaseRating(2026,team)||77;};

  function ensurePre10Data(c) {
    c.contracts = c.contracts || {};
    c.aiDevelopmentHistory = Array.isArray(c.aiDevelopmentHistory) ? c.aiDevelopmentHistory : [];
    c.aiDevelopmentNext = c.aiDevelopmentNext || {};
    c.liveRace = c.liveRace || null;
    if(c.liveRace && typeof raceTrackFor==='function' && !c.liveRace.trackMapUrl){const savedTrack=raceTrackFor(c.liveRace.round,c.liveRace.season||c.season);c.liveRace.trackName=savedTrack.name;c.liveRace.trackLayoutId=savedTrack.layoutId||null;c.liveRace.trackMapUrl=savedTrack.mapUrl||null;}
    c.seasonHistory = Array.isArray(c.seasonHistory) ? c.seasonHistory : [];
    c.freeAgents = Array.isArray(c.freeAgents) ? c.freeAgents : [];
    c.aiAcademies = c.aiAcademies || {};
    if(typeof ensureStaff==='function')ensureStaff(c);
    if(typeof assignStartingStaff==='function')assignStartingStaff(c);
    ensureAiAcademies(c);
    return c;
  }


  function ensureAiAcademies(c) {
    c.aiAcademies = c.aiAcademies || {};
    const teams=Object.keys(c.roster||{}).filter(team=>team!==c.name);
    const juniors=(typeof juniorDrivers==='function'?juniorDrivers(c.season):[]).slice().sort((a,b)=>b.rating-a.rating);
    const used=new Set(Object.values(c.roster||{}).flat());
    const academyUsed=new Set();
    teams.forEach(team=>{
      const existing=Array.isArray(c.aiAcademies[team])?c.aiAcademies[team]:[];
      const valid=existing.filter(n=>juniors.some(d=>d.name===n)&&!used.has(n)&&!academyUsed.has(n));
      c.aiAcademies[team]=valid;
      while(c.aiAcademies[team].length<2){
        const series=c.aiAcademies[team].length===0?'F2':'F3';
        const candidates=juniors.filter(d=>d.series===series&&!used.has(d.name)&&!academyUsed.has(d.name));
        const fallback=juniors.filter(d=>!used.has(d.name)&&!academyUsed.has(d.name));
        const candidate=(candidates.length?candidates:fallback)[Math.abs(hash(`${team}-${c.season}-${c.aiAcademies[team].length}`))%Math.max(1,(candidates.length?candidates:fallback).length)];
        if(!candidate)break;
        c.aiAcademies[team].push(candidate.name);academyUsed.add(candidate.name);
      }
      c.aiAcademies[team].forEach(n=>academyUsed.add(n));
    });
  }

  function runAiContractCycle(c) {
    // Contract expiry is a real departure, not an automatic silent renewal.
    // Fill only the seats that become vacant, prioritising uncontracted F1 drivers.
    ensurePre10Data(c);
    c.roster = c.roster || {};
    c.contracts = c.contracts || {};
    c.history = Array.isArray(c.history) ? c.history : [];
    c.freeAgents = Array.isArray(c.freeAgents) ? c.freeAgents : [];
    const teams = Object.keys(c.roster);
    const expired = [];
    teams.forEach(team => {
      const lineup = [...new Set((c.roster[team] || []).filter(Boolean))].slice(0, 2);
      const kept = [];
      lineup.forEach(name => {
        const ct = c.contracts[name] || (c.contracts[name] = {
          startSeason: c.season, expirySeason: (Number(c.season)<=2026&&window.GPMHistoricalCareer0110 ? window.GPMHistoricalCareer0110.historicalExpiry(name,c.season) : c.season + 2), length: 2,
          annualSalary: 2, signingBonus: 0, status: 'Active'
        });
        if (ct.status === 'Released' || ct.status === 'Expired') return;
        if (Number.isFinite(Number(ct.expirySeason)) && Number(ct.expirySeason) <= Number(c.season)) {
          ct.status = 'Expired';
          ct.expiredSeason = c.season;
          c.freeAgents.push(name);
          expired.push({name, team});
          c.history.push({title: 'Driver contract expired · seat vacated', text: `${name}'s contract with ${team} expired at the end of the previous season. The driver has been released and the seat is now vacant.`, date: `Season ${c.season} · Pre-season`});
          if (typeof addInbox === 'function') addInbox(c, 'Driver contract expired', `${name} has left ${team} because their contract expired. A replacement has been recruited for the new season.`, true);
        } else {
          ct.status = 'Active';
          kept.push(name);
        }
      });
      c.roster[team] = kept;
    });
    const assigned = new Set(Object.values(c.roster).flat().filter(Boolean));
    const f1Pool = typeof allDrivers === 'function' ? allDrivers(c.season) : [];
    const juniorPool = typeof juniorDrivers === 'function' ? juniorDrivers(c.season) : [];
    let promotions = 0;
    teams.forEach(team => {
      const lineup = c.roster[team] || [];
      while (lineup.length < 2) {
        const outgoing = expired.find(x => x.team === team && !x.replaced);
        const candidate = [...c.freeAgents, ...f1Pool].find(name => name && !assigned.has(name) && !expired.some(x => x.name === name));
        const junior = !candidate && promotions < 1 ? juniorPool.filter(d => d.series === 'F2' && Number(d.rating) >= 82).sort((a,b) => b.rating-a.rating).find(d => !assigned.has(d.name)) : null;
        const replacement = candidate || junior?.name;
        if (!replacement) break;
        if (junior) promotions++;
        lineup.push(replacement);
        assigned.add(replacement);
        c.freeAgents = c.freeAgents.filter(n => n !== replacement);
        c.contracts[replacement] = {
          startSeason: c.season, expirySeason: (team!==c.name&&Number(c.season)<=2026&&window.GPMHistoricalCareer0110 ? window.GPMHistoricalCareer0110.historicalExpiry(replacement,c.season) : c.season + 2), length: 2,
          annualSalary: Math.max(1, Math.round(((DRIVER_RATING[replacement] || junior?.rating || 78) - 65) * .45 * 10) / 10),
          signingBonus: 0, status: 'Active', playerManaged: team === c.name
        };
        if (outgoing) outgoing.replaced = true;
        c.history.push({title: junior ? 'F2 graduate promoted after contract expiry' : 'Replacement driver signed after contract expiry', text: `${replacement} joined ${team} to fill the seat vacated by an expired contract${junior ? ' after earning promotion from Formula 2' : ' from the available F1 driver pool'}.`, date: `Season ${c.season} · Pre-season`});
        if (typeof addInbox === 'function') addInbox(c, 'Replacement driver signed', `${replacement} has joined ${team} after the previous driver's contract expired.`, true);
      }
      c.roster[team] = lineup.slice(0, 2);
    });
    if (c.roster[c.name]) c.drivers = [...c.roster[c.name]];
    // Academy membership is not a contract and never causes an automatic F1 promotion.
    ensureAiAcademies(c);
  }

  function replaceLegacyPlaceholders(c) {
    if(!c?.roster)return;
    const assigned=new Set(Object.values(c.roster).flat().filter(n=>n&&!/academy replacement|academy prospect|reserve driver/i.test(String(n))));
    Object.entries(c.roster).forEach(([team,lineup])=>{
      const next=[...(lineup||[])];
      next.forEach((name,index)=>{
        if(!/academy replacement|academy prospect|reserve driver/i.test(String(name||'')))return;
        const academy=(c.aiAcademies?.[team]||[]).find(n=>!assigned.has(n));
        const reserve=team===c.name?(c.reserves||[]).find(n=>!assigned.has(n)):null;
        const f1=(typeof allDrivers==='function'?allDrivers(c.season):[]).find(n=>!assigned.has(n));
        const junior=(typeof juniorDrivers==='function'?juniorDrivers(c.season):[]).slice().sort((a,b)=>b.rating-a.rating).find(d=>!assigned.has(d.name));
        const replacement=academy||reserve||f1||junior?.name;
        if(!replacement)return;
        next[index]=replacement;assigned.add(replacement);
        c.contracts=c.contracts||{};c.contracts[name]={...(c.contracts[name]||{}),status:'Released'};
        c.contracts[replacement]={startSeason:c.season,expirySeason:c.season+2,length:2,annualSalary:2,signingBonus:0,status:'Active'};
        if(team===c.name)c.reserves=(c.reserves||[]).filter(n=>n!==replacement);
        c.aiAcademies[team]=(c.aiAcademies?.[team]||[]).filter(n=>n!==replacement);
        c.history=c.history||[];c.history.push({title:'Legacy placeholder replaced',text:`${name} was replaced by ${replacement} from the existing driver database in ${team}'s lineup.`,date:`Season ${c.season} · Save migration`});
      });
      c.roster[team]=next;
    });
    c.drivers=[...(c.roster[c.name]||c.drivers||[])];
  }

  function advanceYoungDriverDevelopment(c, round) {
    c.driverAges=c.driverAges||{};c.driverDevelopment=c.driverDevelopment||{};c.reserveStats=c.reserveStats||{};
    const juniors=new Map((typeof juniorDrivers==='function'?juniorDrivers(c.season):[]).map(d=>[d.name,d]));
    const names=[...new Set([...(c.reserves||[]),...(c.drivers||[]),...Object.values(c.roster||{}).flat(),...Object.values(c.aiAcademies||{}).flat()])];
    names.forEach(name=>{
      const junior=juniors.get(name);const knownAge=typeof meta==='function'?meta(name,'F1').age:undefined;const age=Number(c.driverAges[name]??junior?.age??knownAge??(DRIVER_RATING[name]?24:20));c.driverAges[name]=age;
      if(age>=30)return;
      const current=Number(c.driverDevelopment[name]?.rating??DRIVER_RATING[name]??junior?.rating??c.reserveStats[name]?.lastRating??76);
      const potential=Number(c.driverDevelopment[name]?.potential||junior?.potential||Math.min(99,current+(age<22?18:12)));
      const reserve=(c.reserves||[]).includes(name);const feederPoints=reserve?Math.max(0,Number(c.reserveStats[name]?.points||0)):0;
      const gain=age<22?(reserve?0.18:0.10)+(feederPoints%5)*0.035:age<25?0.06:0.025;
      const after=Math.min(potential,Math.round((current+gain)*10)/10);
      c.driverDevelopment[name]={rating:after,potential,age,lastProgressSeason:c.season,lastProgressRound:round};
      if(after>current){DRIVER_RATING[name]=Math.round(after);if(reserve){const st=c.reserveStats[name]||{starts:0,points:0};st.starts=(st.starts||0)+1;st.points=(st.points||0)+Math.max(0,Math.round((after-65)*0.08));st.lastRating=after;st.development=after-current;c.reserveStats[name]=st;}}
    });
  }

  function advanceAiDevelopment(c, round) {
    if (typeof ensureChampionshipData === 'function') ensureChampionshipData(c);
    advanceYoungDriverDevelopment(c,round);
    Object.keys(c.roster || {}).filter(team => team !== c.name).forEach(team => {
      if (!c.aiDevelopmentNext[team]) c.aiDevelopmentNext[team] = 2 + (Math.abs(hash(team)) % 3);
      if (round < c.aiDevelopmentNext[team]) return;
      const before = Number(c.aiCarRatings[team] || teamBaseRating(c.season, team));
      const gain = 0.8 + ((Math.abs(hash(`${team}-${c.season}-${round}`)) % 9) / 10);
      const after = Math.min(99, Math.round((before + gain) * 10) / 10);
      c.aiCarRatings[team] = after;
      const departments = ['Aerodynamics','Chassis','Power unit','Suspension','Reliability'];
      const department = departments[Math.abs(hash(`${round}-${team}`)) % departments.length];
      c.aiDevelopmentHistory.push({season:c.season,round,team,department,before,after,gain:Math.round((after-before)*10)/10});
      c.aiDevelopmentNext[team] = round + 2 + (Math.abs(hash(`${team}-${round}-next`)) % 3);
    });
  }
  function hash(value) { let h=2166136261; for (const ch of String(value)) h=Math.imul(h ^ ch.charCodeAt(0),16777619); return h|0; }

  function buildLapSnapshots(field, laps) {
    const grid = field.grid || [];
    const finish = field.results || [];
    const n = finish.length;
    const finishPosition = new Map(finish.map((r,i)=>[r.driver,i+1]));
    const gridPosition = new Map(grid.map((r,i)=>[r.driver,i+1]));
    const pitLap = new Map();
    finish.forEach((r,i)=>{
      const first = Math.max(5,Math.round(laps*(.30 + (Math.abs(hash(r.driver))%12)/100)));
      pitLap.set(r.driver, [first, r.pitStops > 1 ? Math.min(laps-4, first+Math.max(8,Math.round(laps*.28))) : null]);
    });
    const snapshots=[];
    for(let lap=1;lap<=laps;lap++){
      const progress=lap/laps;
      const order=finish.map(r=>{
        const gp=gridPosition.get(r.driver)||n;
        const fp=finishPosition.get(r.driver)||n;
        const base=(1-progress)*(n-gp)+progress*(n-fp);
        const stops=pitLap.get(r.driver)||[];
        const inPit=stops.some(x=>x!==null&&lap>=x&&lap<=x+1);
        const deterministicNoise=0;
        const retirementLap=Math.round(laps*(.45+(Math.abs(hash(r.driver))%30)/100));const dnfPenalty=r.dnf&&lap>retirementLap?100:0;
        return {driver:r.driver,score:base+deterministicNoise-(inPit?3.6:0)-dnfPenalty,inPit,pitNow:stops.includes(lap),retiredNow:r.dnf&&lap===retirementLap+1,dnf:r.dnf&&dnfPenalty>0};
      }).sort((a,b)=>b.score-a.score);
      snapshots.push({lap,order:order.map(x=>x.driver),events:order.filter(x=>x.pitNow).map(x=>`${x.driver} pits for a tyre change`).concat(order.filter(x=>x.retiredNow).map(x=>`${x.driver} has retired`)),pitDrivers:order.filter(x=>x.inPit).map(x=>x.driver)});
    }
    return snapshots;
  }

  function gridPositionFor(state, driver) {
    const row=(state.field.grid||[]).find(x=>x.driver===driver);
    return row?.grid || ((state.field.grid||[]).findIndex(x=>x.driver===driver)+1) || null;
  }

  function liveRows(state, snapshot) {
    const data = new Map(state.field.results.map(r=>[r.driver,r]));
    const n=snapshot.order.length;
    return snapshot.order.map((name,i)=>{
      const r={...data.get(name)};
      r.position=i+1;
      r.change=(gridPositionFor(state,r.driver)||r.grid||i+1)-r.position;
      r.gap=i===0?'LEADER':`+${(i*.41 + snapshot.lap*.003).toFixed(3)}s`;
      r.interval=i===0?'—':`+${(.12+i*.035).toFixed(3)}s`;
      r.status=r.dnf&&snapshot.lap>Math.round(state.laps*.55)?'DNF':snapshot.pitDrivers.includes(name)?'PIT STOP':'RUNNING';
      r.points=0;
      const stopCount=state.pitCounts?.[name]||0;const tyreOptions=['SOFT','MEDIUM','HARD'];const initial=tyreOptions.indexOf(r.compound);if(stopCount>0)r.compound=tyreOptions[(Math.max(0,initial)+stopCount)%tyreOptions.length];r.tyreAge=Math.max(1,snapshot.lap-(state.lastPitLap?.[name]||0));
      return r;
    });
  }

  function raceBody(state) {
    const snap=state.snapshots[Math.max(0,state.lap-1)] || {lap:0,order:state.field.grid.map(x=>x.driver),events:[],pitDrivers:[]};
    const order=state.lap ? liveRows(state,snap) : state.field.grid.map((r,i)=>({...r,position:i+1,status:'ON GRID',points:0,gap:i?'—':'POLE',interval:'—'}));
    const events=snap.events?.length?snap.events.map(x=>`<li>${safe(x)}</li>`).join(''):'<li>No major incidents reported this lap.</li>';
    return `<div class="gpm-live-race-head"><div><small>LIVE GRAND PRIX</small><h2>${safe(state.event)} GRAND PRIX</h2><b>SEASON ${state.season} · ROUND ${state.round}</b></div><div class="gpm-live-lap"><strong>${state.lap}/${state.laps}</strong><small>LAP</small></div></div><div class="gpm-live-progress"><i style="width:${Math.round(state.lap/state.laps*100)}%"></i></div>${state.trackMapUrl?`<section class="gpm-live-track-map"><b>ACTUAL CIRCUIT LAYOUT</b><img src="${safe(state.trackMapUrl)}" alt="${safe(state.trackName)} circuit layout" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><small hidden>Could not load the circuit map. Check your internet connection.</small><small>${safe(state.trackLayoutId||'OFFICIAL LAYOUT')} · ${state.season} SEASON</small></section>`:''}<div class="gpm-live-stats"><span><small>LEADER</small><b>${safe(order[0]?.driver||'—')}</b></span><span><small>YOUR TEAM</small><b>${safe(state.teamName)}</b></span><span><small>TRACK LENGTH</small><b>${state.laps} LAPS</b></span></div><section class="gpm-live-events"><b>LAP ${state.lap||0} RADIO & RACE CONTROL</b><ul>${events}</ul></section><div class="gpm-classification-heading"><b>LIVE RUNNING ORDER</b><small>${order.length} CARS</small></div>${typeof raceLeaderboardHtml==='function'?raceLeaderboardHtml(order):''}<p class="gpm-race-note">Positions update lap by lap. Pit stops and retirements are reflected in the running order. Official points and championship records are applied only when the chequered flag falls.</p>`;
  }

  function openLiveRace() {
    const c=current(); if(!c?.liveRace)return;
    const state=c.liveRace;
    if(window.gpmLiveRaceTimer){clearInterval(window.gpmLiveRaceTimer);window.gpmLiveRaceTimer=null;}
    state.autoPaused=false;
    const root=showCareerModal(`${state.event.toUpperCase()} · LIVE RACE`,raceBody(state),[
      {label:'Ⅱ PAUSE RACE',kind:'primary-btn',action:()=>toggleLiveRacePause()},
      {label:'FAST-FORWARD TO FINISH',kind:'secondary-btn',action:()=>finishLiveRace()},
      {label:'CLOSE · SAVE RACE',kind:'secondary-btn',action:()=>{stopLiveRaceTimer();saveCareer();document.getElementById('gpmActionModal').hidden=true;}}
    ]);
    root.classList.add('gpm-live-race-modal');
    startLiveRaceTimer();
  }

  function stopLiveRaceTimer() {
    if(window.gpmLiveRaceTimer){clearInterval(window.gpmLiveRaceTimer);window.gpmLiveRaceTimer=null;}
  }
  function startLiveRaceTimer() {
    stopLiveRaceTimer();
    const c=current(),state=c?.liveRace;if(!state||state.autoPaused)return;
    window.gpmLiveRaceTimer=setInterval(()=>{
      const active=current()?.liveRace;
      if(!active){stopLiveRaceTimer();return;}
      if($('gpmActionModal')?.hidden){stopLiveRaceTimer();return;}
      advanceLiveLap();
    },1100);
  }
  function toggleLiveRacePause() {
    const c=current(),state=c?.liveRace;if(!state)return;
    state.autoPaused=!state.autoPaused;
    if(state.autoPaused)stopLiveRaceTimer();else startLiveRaceTimer();
    const button=$('gpmActionButtons')?.querySelector('[data-action-index="0"]');
    if(button)button.textContent=state.autoPaused?'▶ RESUME AUTO RACE':'Ⅱ PAUSE RACE';
    saveCareer();
  }

  function advanceLiveLap() {
    const c=current(),state=c?.liveRace;if(!state)return;
    if(state.lap>=state.laps){finishLiveRace();return;}
    state.lap++;
    const snap=state.snapshots[state.lap-1];
    state.pitCounts=state.pitCounts||{};state.lastPitLap=state.lastPitLap||{};
    (snap?.events||[]).filter(x=>x.includes('pits')).forEach(x=>{const name=x.split(' pits')[0];state.pitCounts[name]=(state.pitCounts[name]||0)+1;state.lastPitLap[name]=state.lap;});
    saveCareer();
    const body=$('gpmActionBody');if(body)body.innerHTML=raceBody(state);
    if(state.lap>=state.laps){const buttons=$('gpmActionButtons');if(buttons){const next=buttons.querySelector('[data-action-index="0"]');if(next)next.textContent='CHEQUERED FLAG · FINISH';}}
  }

  function finishLiveRace() {
    stopLiveRaceTimer();
    const c=current(),state=c?.liveRace;if(!state||state.completed)return;
    state.lap=state.laps;state.completed=true;
    const results=state.field.results.map((r,i)=>({...r,position:i+1}));
    const round=state.round,teamScore=results.filter(r=>r.team===c.name).reduce((sum,r)=>sum+(r.points||0),0);
    results.forEach(r=>{if(r.points){c.driverChampPoints[r.driver]=(c.driverChampPoints[r.driver]||0)+r.points;c.constructorStandings[r.team]=(c.constructorStandings[r.team]||0)+r.points;}});
    c.points=c.constructorStandings[c.name]||0;
    c.driverPoints=(c.drivers||[]).map(d=>c.driverChampPoints[d]||0);
    c.round=round;
    if(typeof applyRegulationChange==='function')applyRegulationChange(c);
    c.budget=(c.budget||0)+1.5+teamScore*.055;
    c.reputation=Math.min(99,(c.reputation||0)+(teamScore>=20?2:teamScore>0?1:0));
    if(results[0]?.team===c.name)c.wins=(c.wins||0)+1;
    if(results.slice(0,3).some(r=>r.team===c.name))c.podiums=(c.podiums||0)+1;
    if(typeof updateFeederChampionships==='function')updateFeederChampionships(c);
    const userResults=results.filter(r=>r.team===c.name);
    const summary=userResults.map(r=>`${r.driver} P${r.position} (${r.points} pts)`).join(' · ')||'No points scored by your team.';
    const archive={season:c.season,round,track:`${state.event} Grand Prix`,grandPrixName:`${state.event} Grand Prix`,circuitName:state.trackName,trackLayoutId:state.trackLayoutId||null,trackMapUrl:state.trackMapUrl||null,results:JSON.parse(JSON.stringify(results)),grid:JSON.parse(JSON.stringify(state.field.grid)),teamScore,recordedAt:new Date().toISOString(),laps:state.laps};
    c.raceArchive=Array.isArray(c.raceArchive)?c.raceArchive:[];
    if(!c.raceArchive.some(x=>x.season===c.season&&x.round===round))c.raceArchive.push(archive);
    c.lastRace={round,track:archive.track,results,grid:state.field.grid,teamScore};
    c.history=c.history||[];c.history.push({title:`${state.event} Grand Prix · Race result`,text:`${summary} Team total: ${teamScore} points.`,date:`Season ${c.season} · Round ${round}`});
    if(typeof window.recordGpmRaceHallOfFame==='function')window.recordGpmRaceHallOfFame(c,archive);
    c.liveRace=null;
    saveCareer();renderCareer();renderSaves();
    const root=$('gpmActionModal');if(root)root.hidden=true;
    const track=typeof raceTrackFor==='function'?raceTrackFor(round,c.season):{name:state.trackName,layoutId:state.trackLayoutId,mapUrl:state.trackMapUrl};
    showRaceResult(track,results,state.field.grid,round,teamScore);
  }

  function startLiveRace() {
    const c=current();if(!c)return;
    const missing=missingStaff(c);
    if(missing.length){
      showCareerModal('RACE START BLOCKED · STAFF INCOMPLETE',`<p>Fill every required staff position before starting this Grand Prix.</p><div class="gpm-season-calendar">${missing.map(x=>`<article class="gpm-calendar-row"><b>${safe(x)}</b><span class="gpm-calendar-state">VACANT</span></article>`).join('')}</div>`,[{label:'OPEN STAFF DEPARTMENT',kind:'primary-btn',action:()=>{document.getElementById('gpmActionModal').hidden=true;openStaffDepartment(missing[0]?.includes('Driver 2')?'engineer2':missing[0]?.includes('starting')?'start1':missing[0]?.includes('strategist')?'strategist':missing[0]?.includes('Pit')?'pitcrew':'engineer1');}},{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);
      return;
    }
    ensureRoster(c);ensureChampionshipData(c);ensurePre10Data(c);
    const rounds=SEASONS[c.season]?.rounds||24;
    if(c.round>=rounds){showSeasonEndSummary(c);return;}
    const round=c.round+1,event=liveEventName(c),laps=lapCountFor(event),track=typeof raceTrackFor==='function'?raceTrackFor(round):{name:event};
    advanceAiDevelopment(c,round);
    const field=getRaceField(c,round);
    const snapshots=buildLapSnapshots(field,laps);
    c.liveRace={season:c.season,round,event,laps,lap:0,teamName:c.name,trackName:track.name||event,trackLayoutId:track.layoutId||null,trackMapUrl:track.mapUrl||null,field,snapshots,pitCounts:{},autoPaused:false,completed:false,createdAt:new Date().toISOString()};
    saveCareer();openLiveRace();
  }

  function openDevelopmentCentre() {
    const c=current();if(!c)return;ensureChampionshipData(c);ensurePre10Data(c);ensureTechnicalState(c);
    const playerParts=Object.entries(c.parts||{}).filter(([key])=>key!=='power').map(([key,value])=>`<div class="gpm-dev-row"><span>${safe(key.toUpperCase())}</span><b>${value}/100</b><i><em style="width:${value}%"></em></i></div>`).join('');
    const aiRows=Object.entries(c.aiCarRatings||{}).sort((a,b)=>b[1]-a[1]).map(([team,value])=>`<div class="gpm-ai-dev-row"><span>${safe(team)}</span><b>${Number(value).toFixed(1)}</b><small>Next development: round ${c.aiDevelopmentNext?.[team]||'scheduled'}</small></div>`).join('');
    const logs=(c.aiDevelopmentHistory||[]).slice(-8).reverse().map(x=>`<li><b>${safe(x.team)}</b> upgraded ${safe(x.department)} · ${x.before.toFixed(1)} → ${x.after.toFixed(1)} <small>R${x.round} · ${x.season}</small></li>`).join('')||'<li>AI development events will appear as the season progresses.</li>';
    const body=`<p>Your engineering departments and rival constructors develop their cars throughout the season. Upgrades affect the performance values used by race simulation.</p><div class="gpm-dev-columns"><section><h3>YOUR CAR · ${safe(c.name)}</h3>${playerParts}<div class="gpm-dev-row"><span>POWER UNIT · ${safe(c.engineSupplier)}</span><b>${c.enginePower}/100 POWER</b><i><em style="width:${c.enginePower}%"></em></i><small>RELIABILITY ${c.engineReliability}/100 · supplier-managed</small></div><button id="gpmOpenTechFromDevelopment" class="secondary-btn">POWER UNIT & GEARBOX SUPPLIERS ↗</button><button id="gpmPlayerUpgrade" class="primary-btn">DEVELOP YOUR CAR ↗</button></section><section><h3>RIVAL CAR PERFORMANCE</h3>${aiRows}</section></div><h3>RECENT RIVAL UPGRADES</h3><ul class="gpm-ai-dev-log">${logs}</ul>`;
    const root=showCareerModal('CAR DEVELOPMENT CENTRE',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
    root.querySelector('#gpmOpenTechFromDevelopment')?.addEventListener('click',()=>{root.hidden=true;window.openGpmTechnicalSuppliers?.();});
    root.querySelector('#gpmPlayerUpgrade')?.addEventListener('click',()=>{root.hidden=true;openUpgradeChooser();});
  }

  function installStyles() {
    if(document.getElementById('gpmPre10Styles'))return;
    const style=document.createElement('style');style.id='gpmPre10Styles';
    style.textContent=`
      .gpm-pre10-dock{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:12px 0 22px;padding:12px;background:linear-gradient(135deg,#111d2a,#172638);border:1px solid #34485e;border-radius:14px;}
      .gpm-pre10-dock button{min-width:0;padding:12px 9px;border:1px solid #3c5067;border-radius:9px;background:#1c2c3e;color:#e9f1f9;font-size:10px;font-weight:900;letter-spacing:.06em;cursor:pointer;}
      .gpm-pre10-dock button:hover{background:#2a4058;border-color:#8299b4;}
      .gpm-race-mode-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}.gpm-race-mode-options article{display:grid;gap:7px;padding:14px;background:#132438;border:1px solid #3b5068;border-radius:10px}.gpm-race-mode-options article b{font-size:13px;letter-spacing:.08em}.gpm-race-mode-options article span{font-size:11px;line-height:1.5;color:#b7c7d8}
      .gpm-live-race-head{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:14px;background:#101b29;border:1px solid #3b5068;border-radius:12px;}
      .gpm-live-race-head small,.gpm-live-stats small{display:block;color:#94a9bd;font-size:9px;font-weight:900;letter-spacing:.12em;}
      .gpm-live-race-head h2{margin:5px 0;font-size:21px;}
      .gpm-live-lap{min-width:88px;text-align:center;padding:10px;background:#1d3044;border-radius:10px;}
      .gpm-live-lap strong{display:block;font-size:28px;font-variant-numeric:tabular-nums;}
      .gpm-live-progress{height:7px;margin:12px 0;background:#27384b;border-radius:99px;overflow:hidden;}
      .gpm-live-progress i{display:block;height:100%;background:#d8e5f2;border-radius:99px;}
      .gpm-live-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0;}
      .gpm-live-stats span{padding:11px;background:#121f2e;border:1px solid #2d4055;border-radius:9px;min-width:0;}
      .gpm-live-stats b{display:block;margin-top:5px;overflow-wrap:anywhere;font-size:12px;}
      .gpm-live-events{padding:12px 14px;margin:12px 0;background:#182638;border-left:3px solid #d8e5f2;border-radius:8px;}
      .gpm-live-events ul{margin:8px 0 0;padding-left:18px;color:#d5e1ed;font-size:12px;}
      .gpm-live-race-modal .gpm-action-buttons{position:sticky;bottom:0;background:#0d1723;padding-top:10px;}
      .gpm-dev-columns{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
      .gpm-dev-columns>section{min-width:0;padding:12px;background:#121f2e;border:1px solid #30465d;border-radius:10px;}
      .gpm-dev-row{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin:10px 0;font-size:11px;}
      .gpm-dev-row i{grid-column:1/-1;height:7px;background:#26394e;border-radius:99px;overflow:hidden;}
      .gpm-dev-row em{display:block;height:100%;background:#c9d8e7;}
      .gpm-ai-dev-row{display:grid;grid-template-columns:1fr auto;gap:4px;padding:8px 0;border-bottom:1px solid #2b3e52;font-size:11px;}
      .gpm-ai-dev-row small{grid-column:1/-1;color:#91a5b9;}
      .gpm-ai-dev-log{padding-left:18px;color:#d5e1ed;font-size:12px;}
      .gpm-ai-dev-log li{margin:7px 0;}
      .gpm-ai-dev-log small{color:#91a5b9;}
      .gpm-pre10-dock{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin:18px 0;padding:14px;background:#0b1420;border:1px solid #2b3c50;border-radius:12px}
      .gpm-pre10-dock button{min-height:46px;padding:10px 12px;border:1px solid #344b61;border-radius:7px;background:#132438;color:#eaf4ff;font-size:10px;font-weight:900;letter-spacing:.6px;cursor:pointer}
      .gpm-pre10-dock button:hover{border-color:var(--cyan);background:#19334a}
      .gpm-team-readiness{display:flex;align-items:center;gap:16px;margin:14px 0;padding:14px 16px;background:#291d1d;border:1px solid #815044;border-radius:10px}
      .gpm-team-readiness.ready{background:#10271f;border-color:#347b60}.gpm-team-readiness>div{display:grid;gap:4px;flex:1}.gpm-team-readiness b{font-size:11px;letter-spacing:1px}.gpm-team-readiness small{font-size:10px;color:#a9b8c8}.gpm-team-readiness>span{font-size:10px;font-weight:900;white-space:nowrap}.gpm-team-readiness button{border:1px solid #526a7e;border-radius:6px;background:#1b3448;color:#fff;padding:10px;font-size:9px;font-weight:900;cursor:pointer}
      .gpm-calendar-summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:12px 0 16px;padding:12px;background:#101e2d;border-radius:8px}.gpm-calendar-summary b{font-size:20px;color:var(--cyan)}.gpm-calendar-summary span{font-size:9px;color:#9aabba;margin-right:12px}.gpm-season-calendar{display:grid;gap:6px;max-height:58vh;overflow:auto;padding-right:4px}.gpm-calendar-row{display:flex;align-items:center;gap:12px;padding:10px 12px;background:#0e1926;border:1px solid #293b4e;border-radius:7px}.gpm-calendar-row.done{opacity:.72}.gpm-calendar-row.next{border-color:var(--cyan);background:#11283a}.gpm-calendar-round{font-size:10px;font-weight:900;color:#91a8bd;min-width:34px}.gpm-calendar-row>div{display:grid;gap:4px;flex:1}.gpm-calendar-row b{font-size:11px}.gpm-calendar-row small{font-size:9px;color:#91a5b8}.gpm-calendar-state{font-size:9px;font-weight:900;color:var(--cyan)}
      @media(max-width:680px){.gpm-pre10-dock{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;padding:8px}.gpm-pre10-dock button{font-size:9px;padding:11px 6px}.gpm-dev-columns{grid-template-columns:1fr}.gpm-race-mode-options{grid-template-columns:1fr}.gpm-live-stats{grid-template-columns:1fr}.gpm-live-race-head h2{font-size:17px}.gpm-team-readiness{align-items:flex-start;flex-wrap:wrap}.gpm-team-readiness>div{min-width:60%}}
    `;
    document.head.append(style);
  }

  function injectManagementDock() {
    const c=current(),host=$('careerView');if(!c||!host)return;
    let readiness=$('gpmTeamReadiness');
    if(!readiness){readiness=document.createElement('section');readiness.id='gpmTeamReadiness';readiness.className='gpm-team-readiness';const banner=host.querySelector('.hq-banner');if(banner)banner.insertAdjacentElement('afterend',readiness);}
    updateTeamReadiness(c);
    let dock=$('gpmPre10Dock');
    if(!dock){dock=document.createElement('nav');dock.id='gpmPre10Dock';dock.className='gpm-pre10-dock';dock.setAttribute('aria-label','Team management');dock.innerHTML=`<button data-do="calendar">SEASON CALENDAR</button><button data-do="market">DRIVER MARKET</button><button data-do="contracts">TEAM CONTRACTS</button><button data-do="staff">STAFF & PIT CREW</button><button data-do="sponsors">SPONSORS</button><button data-do="development">CAR DEVELOPMENT</button><button data-do="technical">PU & GEARBOX</button><button data-do="standings">CHAMPIONSHIP</button><button data-do="archive">RACE ARCHIVE</button><button data-do="hof">HALL OF FAME</button>`;const anchor=readiness||host.querySelector('.hq-banner');if(anchor)anchor.insertAdjacentElement('afterend',dock);else host.prepend(dock);
      dock.addEventListener('click',e=>{const b=e.target.closest('[data-do]');if(!b)return;const actions={calendar:openSeasonCalendar,market:()=>window.openGpmDriverMarket064?.('F1'),contracts:()=>window.openGpmTeamContracts064?.(),staff:()=>openStaffDepartment('engineer1'),sponsors:()=>openSponsorDeals(),development:()=>openDevelopmentCentre(),technical:()=>window.openGpmTechnicalSuppliers?.(),standings:()=>viewStandings(),archive:()=>viewRaceArchive(),hof:()=>window.openGpmHallOfFame?.()};actions[b.dataset.do]?.();});
    }
  }

  const originalSimulate=simulateRace;
  function showRaceModeChooser(){
    const c=current();if(!c)return;
    if(c.liveRace){openLiveRace();return;}
    if((c.round||0)>=(SEASONS[c.season]?.rounds||seasonCalendar(c.season).length)){originalSimulate();return;}
    const missing=missingStaff(c);
    if(missing.length){
      showCareerModal('RACE START BLOCKED · STAFF INCOMPLETE',`<p>Your team must fill every required staff position before a Grand Prix can begin.</p><div class="gpm-season-calendar">${missing.map(x=>`<article class="gpm-calendar-row"><b>${safe(x)}</b><span class="gpm-calendar-state">VACANT</span></article>`).join('')}</div>`,[{label:'OPEN STAFF DEPARTMENT',kind:'primary-btn',action:()=>{document.getElementById('gpmActionModal').hidden=true;openStaffDepartment(missing[0]?.includes('Driver 2')?'engineer2':missing[0]?.includes('starting')?'start1':missing[0]?.includes('strategist')?'strategist':missing[0]?.includes('Pit')?'pitcrew':'engineer1');}},{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);
      return;
    }
    const event=liveEventName(c),round=(c.round||0)+1;
    showCareerModal(`ROUND ${round} · ${safe(event).toUpperCase()} GRAND PRIX`,
      `<p>Choose how you want to experience this race. Both options use your current team, drivers, staff and car performance.</p><div class="gpm-race-mode-options"><article><b>LIVE RACE</b><span>Follow every lap, watch the running order change, and advance the race yourself.</span></article><article><b>SIMULATED RACE</b><span>Resolve the full race instantly and go straight to the official classification.</span></article></div>`,
      [
        {label:'▶ START LIVE RACE',kind:'primary-btn',action:()=>{const modal=$('gpmActionModal');if(modal)modal.hidden=true;startLiveRace();}},
        {label:'⚡ SIMULATE RACE',kind:'secondary-btn',action:()=>{const modal=$('gpmActionModal');if(modal)modal.hidden=true;advanceAiDevelopment(c,(c.round||0)+1);originalSimulate();}},
        {label:'CANCEL',kind:'secondary-btn',action:()=>{const modal=$('gpmActionModal');if(modal)modal.hidden=true;}}
      ]);
  }
  simulateRace=function(){showRaceModeChooser();};
  // app.js binds its original handler during its own setup(), before this file loads.
  // Capture the click and stop that stale listener so the chooser is the only action.
  const nextRaceButton=$('raceBtn');
  if(nextRaceButton)nextRaceButton.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();showRaceModeChooser();},true);
  const originalRenderCareer=renderCareer;
  renderCareer=function(){const c=current();ensureCareerSeason(c);if(c){ensureRoster(c);ensurePre10Data(c);replaceLegacyPlaceholders(c);}originalRenderCareer();if(c){injectManagementDock();updateTeamReadiness(c);const calendar=seasonCalendar(c.season);if($('nextRace'))$('nextRace').textContent=c.round>=calendar.length?`${c.season} SEASON COMPLETE`:`${calendar[c.round]} GRAND PRIX`;if($('nextRound'))$('nextRound').textContent=c.round>=calendar.length?'—':c.round+1;if($('raceBtn'))$('raceBtn').textContent=c.liveRace?'RESUME LIVE RACE →':c.round>=calendar.length?'SEASON COMPLETE':'NEXT RACE · CHOOSE MODE →';}if(c?.liveRace&&$('raceBtn'))$('raceBtn').textContent='RESUME LIVE RACE →';};
  const originalShowView=showView;
  showView=function(view){if(view==='career')ensureCareerSeason(current());originalShowView(view);if(view==='career')injectManagementDock();};
  const originalAdvance=advanceSeason;
  advanceSeason=function(){const c=current();if(c?.liveRace){showToast('Finish or close the live race before advancing the season.');openLiveRace();return false;}const ok=originalAdvance();if(ok&&current()){ensurePre10Data(current());runAiContractCycle(current());saveCareer();injectManagementDock();}return ok;};

  window.openGpmDevelopmentCentre=openDevelopmentCentre;
  window.gpmPre10TestHooks={lapCountFor,buildLapSnapshots,ensureAiAcademies,runAiContractCycle,advanceYoungDriverDevelopment,advanceAiDevelopment,replaceLegacyPlaceholders,showRaceModeChooser,liveRows,gridPositionFor};
  window.openGpmSeasonCalendar=openSeasonCalendar;
  window.getGpmSeasonCalendar=year=>seasonCalendar(Number(year)).slice();
  window.getGpmMissingStaff=missingStaff;
  window.startGpmLiveRace=startLiveRace;
  window.advanceGpmLiveLap=advanceLiveLap;
  window.finishGpmLiveRace=finishLiveRace;
  window.gpmPre10Status=()=>({version:'0.9.9',liveRace:!!current()?.liveRace,aiUpgrades:current()?.aiDevelopmentHistory?.length||0,contracts:current()?.contracts||{}});
  document.addEventListener('DOMContentLoaded',()=>{installStyles();if(current())injectManagementDock();});
})();
