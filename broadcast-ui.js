/* Grand Prix Manager 0.10.2 — age eligibility and broadcast presentation.
   Driver DOB data is intentionally explicit; unknown DOBs are not guessed. */
(() => {
  'use strict';
  const DOB = {
    'Juan Manuel Fangio':'1911-06-24','Stirling Moss':'1929-09-17','Alberto Ascari':'1918-07-13','Giuseppe Farina':'1906-10-30','Mike Hawthorn':'1929-04-10','Jack Brabham':'1926-04-02','Jim Clark':'1936-03-04','Graham Hill':'1929-02-15','Jackie Stewart':'1939-06-11','Emerson Fittipaldi':'1946-12-12','Niki Lauda':'1949-02-22','James Hunt':'1947-08-29','Mario Andretti':'1940-02-28','Jody Scheckter':'1950-01-29','Alan Jones':'1946-11-02','Nelson Piquet':'1952-08-17','Ayrton Senna':'1960-03-21','Alain Prost':'1955-02-24','Nigel Mansell':'1953-08-08','Michael Schumacher':'1969-01-03','Mika Hakkinen':'1968-09-28','Damon Hill':'1960-09-17','Jacques Villeneuve':'1971-04-09','Kimi Raikkonen':'1979-10-17','Fernando Alonso':'1981-07-29','Fernando Alonso (Prime)':'1981-07-29','Lewis Hamilton':'1985-01-07','Sebastian Vettel':'1987-07-03','Sebastian Vettel (Prime)':'1987-07-03','Jenson Button':'1980-01-19','Nico Rosberg':'1985-06-27','Felipe Massa':'1981-04-25','Mika Häkkinen':'1968-09-28','Kimi Räikkönen':'1979-10-17','Juan Pablo Montoya':'1975-09-20','David Coulthard':'1971-03-27','Mark Webber':'1976-08-27','Gilles Villeneuve':'1950-01-18','Rubens Barrichello':'1972-05-23','Gerhard Berger':'1959-08-27','John Surtees':'1934-02-11','Mark Webber':'1976-08-27','Daniel Ricciardo':'1989-07-01','Valtteri Bottas':'1989-08-28','Sergio Perez':'1990-01-26','Max Verstappen':'1997-09-30','Charles Leclerc':'1997-10-16','Carlos Sainz':'1994-09-01','Lando Norris':'1999-11-13','George Russell':'1998-02-15','Oscar Piastri':'2001-04-06','Kimi Antonelli':'2006-08-25','Lance Stroll':'1998-10-29','Pierre Gasly':'1996-02-07','Esteban Ocon':'1996-09-17','Alexander Albon':'1996-03-23','Yuki Tsunoda':'2000-05-11','Nico Hulkenberg':'1987-08-19','Kevin Magnussen':'1992-10-05','Mick Schumacher':'1999-03-22','Zhou Guanyu':'1999-05-30','Oliver Bearman':'2005-05-08','Gabriel Bortoleto':'2004-10-14','Isack Hadjar':'2004-09-28','Liam Lawson':'2002-02-11','Franco Colapinto':'2003-05-27','Arvid Lindblad':'2007-08-08','Nyck de Vries':'1995-02-06','Nicholas Latifi':'1995-06-29','Logan Sargeant':'2000-12-31','Jack Doohan':'2003-01-20','Zhou Guanyu':'1999-05-30'
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function ageInSeason(name, year) {
    const dob = DOB[name];
    if (!dob) return null;
    const [y,m,d] = dob.split('-').map(Number);
    const ref = new Date(Number(year), 6, 1);
    let age = ref.getFullYear() - y;
    if (ref.getMonth()+1 < m || (ref.getMonth()+1 === m && ref.getDate() < d)) age--;
    return age;
  }
  function eligible(name, year) {
    const age = ageInSeason(name, year);
    return age === null || age <= 50;
  }
  window.GPMDriverAge = { ageInSeason, eligible, birthDates: DOB };

  // The market's shared availability function is the central gate for contract offers.
  if (typeof window.availableMarketDrivers === 'function') {
    const oldAvailable = window.availableMarketDrivers;
    window.availableMarketDrivers = function(c) {
      return oldAvailable(c).filter(name => eligible(name, c.season));
    };
  }
  // The historic market has its own internal pool, so filter its rendered rows too.
  function filterMarketRows() {
    const tabs=document.getElementById('gpmMarketTabs');
    const active=tabs?.querySelector('.gpm-tab.active')?.textContent?.trim()||'';
    const c=window.getGpmCurrentCareer?.();
    const year=Number(c?.season||new Date().getFullYear());
    document.querySelectorAll('#gpmMarketRows [data-profile]').forEach(row=>{
      const name=row.dataset.profile;
      const age=ageInSeason(name,year);
      if(age!==null&&age>50) row.remove();
    });
    const profile=document.getElementById('gpmMarketProfile');
    const selected=profile?.querySelector('h2')?.textContent?.trim();
    if(selected&&!eligible(selected,year)){
      profile.innerHTML=`<div class="gpm-profile-kicker">HISTORICAL DRIVER · NOT ELIGIBLE</div><h2>${esc(selected)}</h2><p>This driver is ${ageInSeason(selected,year)} years old in ${year}. New race-seat contracts are limited to drivers aged 50 or younger.</p>`;
    }
  }
  if (typeof window.openGpmDriverMarket064 === 'function') {
    const oldMarket=window.openGpmDriverMarket064;
    window.openGpmDriverMarket064=function(...args){
      const result=oldMarket.apply(this,args);
      setTimeout(filterMarketRows,0);
      return result;
    };
    document.addEventListener('click',event=>{
      if(event.target?.id!=='gpmProfileSign')return;
      const name=document.querySelector('#gpmMarketProfile h2')?.textContent?.trim();
      const year=Number(window.getGpmCurrentCareer?.()?.season||new Date().getFullYear());
      if(name&&!eligible(name,year)){
        event.preventDefault();event.stopImmediatePropagation();
        window.showToast?.(`${name} is over 50 in ${year}; a new race-seat contract is not available.`);
      }
    },true);
    const marketObserver=new MutationObserver(()=>filterMarketRows());
    const startObserver=()=>{const target=document.getElementById('gpmMarketRows');if(target)marketObserver.observe(target,{childList:true,subtree:true});};
    document.addEventListener('click',event=>{if(event.target.closest?.('[data-nav],.management-tile,#openTransferBtn'))setTimeout(startObserver,0);},true);
  }

  // Also protect new-team driver selection and existing-team career creation.
  if (typeof window.fillDriverSelects === 'function') {
    const oldFill = window.fillDriverSelects;
    window.fillDriverSelects = function() {
      oldFill();
      const year = Number(document.getElementById('seasonSelect')?.value);
      ['driverOne','driverTwo'].forEach(id => {
        const select = document.getElementById(id);
        if (!select) return;
        [...select.options].forEach(option => {
          const age = ageInSeason(option.value, year);
          if (age !== null && age > 50) option.remove();
        });
      });
      if (typeof window.syncDriverChoices === 'function') window.syncDriverChoices();
    };
  }
  if (typeof window.createCareer === 'function') {
    const oldCreate = window.createCareer;
    window.createCareer = function() {
      const year = Number(document.getElementById('seasonSelect')?.value);
      const names = [document.getElementById('driverOne')?.value, document.getElementById('driverTwo')?.value].filter(Boolean);
      const barred = names.find(name => !eligible(name, year));
      if (barred) { window.showToast?.(`${barred} is over 50 in ${year} and cannot be signed to a new race seat.`); return; }
      return oldCreate();
    };
  }

  function portrait(name, className='broadcast-portrait') {
    const initials = name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase();
    return `<div class="${className}" data-broadcast-driver="${esc(name)}"><span>${esc(initials)}</span></div>`;
  }
  function loadPortraits(root, season) {
    root.querySelectorAll('[data-broadcast-driver]').forEach(node => {
      const name=node.dataset.broadcastDriver;
      const service=window.GPMDriverPortraits;
      if(!service)return;
      service.lookup(name,season).then(photo=>{
        if(!photo?.url)return;
        node.innerHTML=`<img src="${esc(photo.url)}" alt="${esc(name)}" loading="lazy"><small title="${esc(photo.artist)} · ${esc(photo.licence)}">${esc(photo.artist)} · ${esc(photo.licence)}</small>`;const img=node.querySelector('img');img.onerror=()=>{node.textContent=initials;};
        node.title=`${name} — ${photo.artist} · ${photo.licence}`;
      });
    });
  }
  function gridMarkup(track, grid, season, round) {
    const rows=(grid||[]).slice().sort((a,b)=>a.grid-b.grid);
    return `<div class="broadcast-head"><div class="broadcast-live"><i></i> GPM WORLD FEED · PRE-RACE</div><div class="broadcast-event">${esc(track.name)} GRAND PRIX <span>${season} · ROUND ${round}</span></div></div><div class="broadcast-grid">${rows.map(r=>`<article class="broadcast-grid-row" style="--team:${esc(r.teamColour||'#667788')}"><b class="broadcast-position">${r.grid}</b>${portrait(r.driver)}<div class="broadcast-driver-meta"><strong>${esc(r.driver)}</strong><small>${esc(r.team)} · #${r.number}</small></div><span class="broadcast-quali">QUALI ${Number(r.quali||0).toFixed(2)}</span></article>`).join('')}</div><p class="broadcast-caption">STARTING GRID · OFFICIAL QUALIFYING ORDER</p>`;
  }
  function podiumMarkup(results) {
    const top=(results||[]).slice(0,3);
    if(top.length<3)return '';
    return `<section class="broadcast-podium"><div class="broadcast-podium-title"><span>POST-RACE CEREMONY</span><b>THE PODIUM</b></div><div class="broadcast-podium-steps">${[top[1],top[0],top[2]].map((r,i)=>`<article class="broadcast-podium-driver place-${r.position}">${portrait(r.driver,'broadcast-portrait podium-portrait')}<strong>${esc(r.driver)}</strong><small>${esc(r.team)}</small><b>P${r.position}</b></article>`).join('')}</div><div class="broadcast-champagne-note">PODIUM CELEBRATION · ${esc(top[0].driver)} WINS</div></section>`;
  }
  if (typeof window.showRaceResult === 'function') {
    const original = window.showRaceResult;
    window.showRaceResult = function(track, results, grid, round, teamScore) {
      const c=window.currentCareer || window.getGpmCurrentCareer?.();
      const season=Number(c?.season||new Date().getFullYear());
      const body=gridMarkup(track,grid,season,round);
      window.showCareerModal?.(`${track.name.toUpperCase()} · GRID WALK`,body,[
        {label:'LIGHTS OUT · VIEW CLASSIFICATION →',kind:'primary-btn',action:()=>{
          const modal=document.getElementById('gpmActionModal'); if(modal)modal.hidden=true;
          original(track,results,grid,round,teamScore);
          const content=document.querySelector('#gpmActionModal .modal-body, #gpmActionModal .action-modal-body, #gpmActionModal .modal-content');
          const target=document.getElementById('gpmActionModal');
          if(target){const host=target.querySelector('#gpmActionBody')||target;const podium=document.createElement('div');podium.innerHTML=podiumMarkup(results);host.appendChild(podium);loadPortraits(podium,season);}
        }},
        {label:'CLOSE',kind:'secondary-btn',action:()=>{const modal=document.getElementById('gpmActionModal');if(modal)modal.hidden=true;}}
      ]);
      const modal=document.getElementById('gpmActionModal'); if(modal){loadPortraits(modal,season);}
    };
  }
})();
