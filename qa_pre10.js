const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const source = fs.readFileSync(__dirname + '/pre10-overhaul.js', 'utf8');
const ctx = {
  console,
  document: { addEventListener() {}, getElementById(){return null;} },
  window: {},
  currentCareer: null,
  currentCareerRef: null,
  showView(){}, simulateRace(){}, advanceSeason(){return true;}, renderCareer(){},
  ensureRoster(c){ c.roster=c.roster||{}; },
  ensureChampionshipData(c){ c.aiCarRatings=c.aiCarRatings||{}; },
  juniorDrivers(){ return [
    {name:'Junior F2 A',series:'F2',rating:82},
    {name:'Junior F2 B',series:'F2',rating:80},
    {name:'Junior F3 A',series:'F3',rating:78},
    {name:'Junior F3 B',series:'F3',rating:77}
  ]; },
  allDrivers(){ return ['F1 Free Agent A','F1 Free Agent B','Rival Driver']; },
  teamBaseRating(){ return 80; },
  SEASONS:{2026:{rounds:24}}, RACES:['Bahrain'],
  saveCareer(){}, renderSaves(){}, showToast(){},
  openUpgradeChooser(){}, openStaffDepartment(){}, openSponsorDeals(){}, viewStandings(){}, viewRaceArchive(){},
  getRaceField(){}, raceTrackFor(){return {name:'Bahrain',points:[]};},
  applyRegulationChange(){}, updateFeederChampionships(){},
  showCareerModal(title,body,buttons){ctx.lastModal={title,body,buttons};return {classList:{add(){}},querySelector(){return null;}};},
  raceLeaderboardHtml(){return '';}, showRaceResult(){}, showSeasonEndSummary(){},
  escapeHtml:s=>String(s), DRIVER_RATING:{'Junior F2 A':82},
  setTimeout, clearTimeout
};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx);
const hooks = ctx.gpmPre10TestHooks;
assert(hooks, 'test hooks exposed');
assert.strictEqual(typeof hooks.showRaceModeChooser,'function','race mode chooser is exposed for QA');
assert.strictEqual(hooks.lapCountFor('Monaco'),78);
assert.strictEqual(hooks.lapCountFor('Bahrain'),57);
assert.strictEqual(ctx.getGpmSeasonCalendar(2022).length,22,'2022 season calendar has 22 rounds');
assert.strictEqual(ctx.getGpmSeasonCalendar(2023).length,22,'2023 season calendar has 22 rounds');
assert.strictEqual(ctx.getGpmSeasonCalendar(2024).length,24,'2024 season calendar has 24 rounds');
assert.strictEqual(ctx.getGpmSeasonCalendar(2025).length,24,'2025 season calendar has 24 rounds');
assert.strictEqual(ctx.getGpmSeasonCalendar(2026).length,24,'2026 season calendar has 24 rounds');
assert.strictEqual(ctx.getGpmSeasonCalendar(2026)[15],'Madrid','Madrid appears in the correct 2026 calendar position');
const incompleteStaff={staffRoster:{engineer:[{name:'E1'},null],startEngineer:[{name:'S1'},null],strategist:null,pitcrew:null}};
assert.deepStrictEqual(Array.from(ctx.getGpmMissingStaff(incompleteStaff)),['Driver 2 race engineer','Driver 2 starting engineer','Chief strategist','Pit crew']);
const completeStaff={staffRoster:{engineer:[{name:'E1'},{name:'E2'}],startEngineer:[{name:'S1'},{name:'S2'}],strategist:{name:'Chief'},pitcrew:{name:'Crew'}}};
assert.strictEqual(ctx.getGpmMissingStaff(completeStaff).length,0,'all six staff positions satisfy race readiness');
ctx.currentCareer={season:2026,round:0,name:'Player',staffRoster:completeStaff.staffRoster,roster:{Player:['A','B']},drivers:['A','B'],contracts:{},history:[],reserves:[],aiAcademies:{}};
ctx.simulateRace();
assert(ctx.lastModal && /GRAND PRIX/.test(ctx.lastModal.title),'Next Race opens race mode chooser');
assert(ctx.lastModal.buttons.some(b=>/LIVE RACE/.test(b.label)),'chooser offers live race');
assert(ctx.lastModal.buttons.some(b=>/SIMULATE RACE/.test(b.label)),'chooser offers instant simulation');
const field={grid:[{driver:'A',grid:1},{driver:'B',grid:2},{driver:'C',grid:3}],results:[{driver:'B',position:1,pitStops:1},{driver:'A',position:2,pitStops:2},{driver:'C',position:3,pitStops:1}]};
const snapshots=hooks.buildLapSnapshots(field,57);
assert.strictEqual(snapshots.length,57);
assert(snapshots.every(s=>s.order.length===3 && new Set(s.order).size===3));
assert.deepStrictEqual(JSON.parse(JSON.stringify(hooks.buildLapSnapshots(field,57))),JSON.parse(JSON.stringify(snapshots)),'lap order is deterministic with no per-lap random position jitter');
const liveState={field:{grid:[{driver:'A',grid:1},{driver:'B',grid:2},{driver:'C',grid:3}],results:[{driver:'A',grid:1,team:'T',compound:'MEDIUM',tyreAge:1},{driver:'B',grid:2,team:'T',compound:'SOFT',tyreAge:1},{driver:'C',grid:3,team:'R',compound:'HARD',tyreAge:1}]},pitCounts:{},lastPitLap:{},laps:57};
const liveRows=hooks.liveRows(liveState,{lap:20,order:['B','A','C'],pitDrivers:[]});
assert.deepStrictEqual(liveRows.map(x=>x.change),[1,-1,0],"live gain/loss stays referenced to each driver starting grid slot");
const c={season:2026,name:'Player',roster:{Player:['Player A','Player B'],Rival:['Expired Driver','Rival Driver']},contracts:{'Expired Driver':{startSeason:2024,expirySeason:2025,status:'Active',annualSalary:2}},aiAcademies:{Rival:['Junior F2 A']},history:[],aiCarRatings:{Rival:80},aiDevelopmentNext:{Rival:1}};
hooks.runAiContractCycle(c);
assert.strictEqual(c.roster.Rival.length,2);
assert(!c.roster.Rival.includes('Expired Driver'),'expired F1 driver is removed from the lineup');
assert(!c.roster.Rival.includes('Junior F2 A'),'academy F2 prospect is not automatically promoted after contract expiry');
assert.strictEqual(c.contracts['Expired Driver'].status,'Expired','expired F1 contract is marked expired and released');
assert((c.aiAcademies.Rival||[]).includes('Junior F2 A'),'F2 prospect remains in the academy pool');
const vacancy={season:2026,name:'Player',roster:{Player:['Player A','Player B'],Rival:['Established Driver']},contracts:{},history:[],aiCarRatings:{Rival:80},aiDevelopmentNext:{Rival:1},aiAcademies:{Rival:['Junior F2 A']}};
hooks.runAiContractCycle(vacancy);
assert(vacancy.roster.Rival.includes('F1 Free Agent A'),'a real AI vacancy is filled from the F1 pool first');
assert(!vacancy.roster.Rival.includes('Junior F2 A'),'vacancy repair does not promote F2 ahead of available F1 drivers');
// Regression: ten AI teams reaching the same contract-expiry year must not
// turn their academy lists into twenty automatic F1 promotions.
const massExpiry={season:2026,name:'Player',roster:{Player:['Player A','Player B']},contracts:{},history:[],aiCarRatings:{},aiDevelopmentNext:{},aiAcademies:{}};
for(let i=0;i<10;i++){
  const team=`AI Team ${i+1}`;
  const drivers=[`Established ${i+1}A`,`Established ${i+1}B`];
  massExpiry.roster[team]=drivers;
  drivers.forEach(name=>massExpiry.contracts[name]={startSeason:2023,expirySeason:2025,status:'Active',annualSalary:3});
}
ctx.allDrivers=year=>Array.from({length:40},(_,i)=>`F1 Pool ${i+1}`);
for(let year=2026;year<=2030;year++){
  massExpiry.season=year;
  hooks.runAiContractCycle(massExpiry);
  for(const team of Object.keys(massExpiry.roster).filter(t=>t!=='Player')){
    assert.strictEqual(massExpiry.roster[team].length,2,`${team} keeps two race seats`);
    assert(massExpiry.roster[team].every(name=>!/^Junior F[23]/.test(name)),`${team} does not automatically promote an F2/F3 academy driver in ${year}`);
  }
}
assert.strictEqual(Object.values(massExpiry.roster).filter((lineup)=>lineup.some(name=>/^Junior F[23]/.test(name))).length,0,'no AI team is filled with feeder-series rookies after five contract cycles');
const before=c.aiCarRatings.Rival;
hooks.advanceAiDevelopment(c,1);
assert(c.aiCarRatings.Rival>before,'AI car development increases rival car rating');
const migrated={season:2026,name:'Player',roster:{Player:['Player A','Player B'],Ferrari:['Charles Leclerc','Academy Replacement']},drivers:['Player A','Player B'],contracts:{},history:[],reserves:[],aiAcademies:{Ferrari:['Junior F2 A']}};
hooks.replaceLegacyPlaceholders(migrated);
assert.notStrictEqual(migrated.roster.Ferrari[1],'Academy Replacement','legacy placeholder is replaced');
assert(migrated.roster.Ferrari[1],'replacement comes from a real driver pool');
console.log('0.9.9 regression QA passed: live-versus-simulated race choice, lap snapshots, circuit lap counts, 2022–2026 season calendars, six-position staff readiness, academy retention, F1-first vacancy repair, immediate contract expiry, AI development, legacy placeholder migration.');
