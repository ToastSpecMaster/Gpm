/* GPM 0.10.9.5 — historical feeder grids and season transfer chronology */
(()=>{
'use strict';
const HISTORICAL_FEEDERS={
2016:[
['Sergey Sirotkin','GP2',83],['Norman Nato','GP2',78],['Jordan King','GP2',77],['Alex Lynn','GP2',81],['Nicholas Latifi','GP2',78],['Mitch Evans','GP2',79],['Sean Gelael','GP2',74],['Raffaele Marciello','GP2',80],['Artem Markelov','GP2',80],['Gustav Malja','GP2',74],['Arthur Pic','GP2',76],['Johnny Cecotto Jr.','GP2',76],['Philo Paz Armand','GP2',70],['Luca Ghiotto','GP2',81],['Sergio Canamasas','GP2',73],['Marvin Kirchhöfer','GP2',75],['Louis Delétraz','GP2',77],['Antonio Giovinazzi','GP2',82],['Pierre Gasly','GP2',83],['Oliver Rowland','GP2',79],['Daniël de Jong','GP2',72],['Nabil Jeffri','GP2',71],['Jimmy Eriksson','GP2',73],['Emil Bernstorff','GP2',73],['Nobuharu Matsushita','GP2',78],['René Binder','GP2',74]
],
2017:[
['Charles Leclerc','F2',86],['Antonio Fuoco','F2',80],['Louis Delétraz','F2',78],['Gustav Malja','F2',74],['Luca Ghiotto','F2',81],['Artem Markelov','F2',81],['Nobuharu Matsushita','F2',78],['Alexander Albon','F2',82],['Sergey Sirotkin','F2',83],['Oliver Rowland','F2',81],['Nicholas Latifi','F2',79],['Ralph Boschung','F2',75],['Lando Norris','F2',81],['Sérgio Sette Câmara','F2',78],['Jordan King','F2',77],['Nabil Jeffri','F2',71],['Santino Ferrucci','F2',74],['Nyck de Vries','F2',80],['Johnny Cecotto Jr.','F2',74],['Norman Nato','F2',78],['Sean Gelael','F2',74]
],
2018:[
['Artem Markelov','F2',82],['Tadasuke Makino','F2',75],['Sean Gelael','F2',75],['Nyck de Vries','F2',82],['Alexander Albon','F2',83],['Nicholas Latifi','F2',81],['Jack Aitken','F2',79],['George Russell','F2',84],['Lando Norris','F2',83],['Sérgio Sette Câmara','F2',80],['Louis Delétraz','F2',79],['Antonio Fuoco','F2',79],['Roberto Merhi','F2',78],['Ralph Boschung','F2',75],['Luca Ghiotto','F2',81],['Nirei Fukuzumi','F2',76],['Maximilian Günther','F2',78],['Anthoine Hubert','F2',78],['Juan Manuel Correa','F2',75],['Mick Schumacher','F2',78]
],
2019:[
['Louis Delétraz','F2',80],['Nobuharu Matsushita','F2',79],['Nikita Mazepin','F2',78],['Nyck de Vries','F2',84],['Sérgio Sette Câmara','F2',81],['Nicholas Latifi','F2',82],['Guanyu Zhou','F2',80],['Luca Ghiotto','F2',82],['Mick Schumacher','F2',80],['Sean Gelael','F2',76],['Callum Ilott','F2',80],['Marino Sato','F2',73],['Jack Aitken','F2',80],['Jordan King','F2',78],['Mahaveer Raghunathan','F2',68],['Tatiana Calderón','F2',74],['Giuliano Alesi','F2',76],['Anthoine Hubert','F2',78],['Ralph Boschung','F2',76],['Juan Manuel Correa','F2',76]
],
2020:[
['Sean Gelael','F2',76],['Jüri Vips','F2',79],['Dan Ticktum','F2',80],['Guanyu Zhou','F2',82],['Callum Ilott','F2',82],['Marcus Armstrong','F2',79],['Christian Lundgaard','F2',80],['Yuki Tsunoda','F2',82],['Jehan Daruvala','F2',78],['Pedro Piquet','F2',76],['Felipe Drugovich','F2',80],['Robert Shwartzman','F2',82],['Mick Schumacher','F2',82],['Nikita Mazepin','F2',79],['Luca Ghiotto','F2',82],['Roy Nissany','F2',75],['Louis Delétraz','F2',80],['Jack Aitken','F2',80],['Ralph Boschung','F2',76],['Theo Pourchaire','F2',78],['Lirim Zendeli','F2',75],['David Beckmann','F2',77],['Guilherme Samaia','F2',72],['Marino Sato','F2',74]
],
2021:[
['Robert Shwartzman','F2',83],['Oscar Piastri','F2',84],['Guanyu Zhou','F2',83],['Felipe Drugovich','F2',81],['Dan Ticktum','F2',80],['Jehan Daruvala','F2',79],['Liam Lawson','F2',81],['Jüri Vips','F2',80],['Christian Lundgaard','F2',80],['Théo Pourchaire','F2',82],['Richard Verschoor','F2',77],['Lirim Zendeli','F2',75],['David Beckmann','F2',78],['Guilherme Samaia','F2',73],['Roy Nissany','F2',75],['Marcus Armstrong','F2',80],['Gianluca Petecof','F2',75],['Ralph Boschung','F2',77],['Jack Aitken','F2',79],['Alessio Deledda','F2',70],['Bent Viscaal','F2',75],['Marino Sato','F2',74],['Enzo Fittipaldi','F2',76],['Olli Caldwell','F2',75],['Jake Hughes','F2',78],['Clément Novalak','F2',77],['Jack Doohan','F2',78],['Logan Sargeant','F2',79]
]
};
// Do not ever fall back to the latest season's juniors: that is how 2026 prospects leaked into 2016.
const originalJuniorDrivers=window.juniorDrivers;
window.juniorDrivers=function(year){
 const y=Number(year);
 if(HISTORICAL_FEEDERS[y])return HISTORICAL_FEEDERS[y].map(([name,series,rating])=>({name,series,rating}));
 return typeof originalJuniorDrivers==='function'?originalJuniorDrivers(y):[];
};
window.GPM_HISTORICAL_FEEDER_GRIDS_01095=HISTORICAL_FEEDERS;
window.applyHistoricalTransferEvents01095=function(c,round){
 if(!c||!c.roster)return;
 c.historicalTransfersApplied=Array.isArray(c.historicalTransfersApplied)?c.historicalTransfersApplied:[];
 const events=[];
 if(Number(c.season)===2016&&Number(round)===4)events.push({id:'2016-verstappen-kvyat',from:'Toro Rosso',to:'Red Bull Racing',promoted:'Max Verstappen',demoted:'Daniil Kvyat',title:'Red Bull driver swap — Spanish Grand Prix',detail:'Max Verstappen is promoted from Toro Rosso to Red Bull Racing. Daniil Kvyat returns to Toro Rosso.'});
 if(Number(c.season)===2019&&Number(round)===12)events.push({id:'2019-albon-gasly',from:'Toro Rosso',to:'Red Bull Racing',promoted:'Alexander Albon',demoted:'Pierre Gasly',title:'Red Bull driver swap — Belgian Grand Prix',detail:'Alexander Albon is promoted to Red Bull Racing. Pierre Gasly returns to Toro Rosso.'});
 if(Number(c.season)===2025&&Number(round)===2)events.push({id:'2025-lawson-tsunoda',from:'Racing Bulls',to:'Red Bull Racing',promoted:'Yuki Tsunoda',demoted:'Liam Lawson',title:'Red Bull driver swap — Japanese Grand Prix',detail:'Yuki Tsunoda is promoted to Red Bull Racing. Liam Lawson returns to Racing Bulls.'});
 for(const e of events){
  if(c.historicalTransfersApplied.includes(e.id))continue;
  const senior=c.roster[e.to],junior=c.roster[e.from];
  if(!Array.isArray(senior)||!Array.isArray(junior)||!senior.includes(e.demoted)||!junior.includes(e.promoted))continue;
  senior[senior.indexOf(e.demoted)]=e.promoted;
  junior[junior.indexOf(e.promoted)]=e.demoted;
  c.historicalTransfersApplied.push(e.id);
  if(c.name===e.to||c.name===e.from){c.drivers=[...(c.roster[c.name]||[])];c.driverPoints=c.drivers.map(n=>c.driverChampPoints?.[n]||0);}
  c.history=Array.isArray(c.history)?c.history:[];
  c.history.push({title:e.title,text:e.detail,date:`Season ${c.season} · After Round ${round}`});
  if(typeof window.showToast==='function')window.showToast(`${e.promoted} promoted to ${e.to}`);
 }
};
})();
