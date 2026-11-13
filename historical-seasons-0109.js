/* Grand Prix Manager 0.10.9 — historical season grids and calendars (2016–2021).
   Season-start championship entries; mid-season substitute appearances are not represented as separate seats. */
(()=>{
'use strict';
const historical={
2016:{rounds:21,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Nico Rosberg']],['Ferrari','#DC0000',['Sebastian Vettel','Kimi Räikkönen']],['Red Bull Racing','#1E41FF',['Daniel Ricciardo','Daniil Kvyat']],['Williams','#FFFFFF',['Felipe Massa','Valtteri Bottas']],['Force India','#FF8000',['Nico Hulkenberg','Sergio Perez']],['Renault','#FFF500',['Kevin Magnussen','Jolyon Palmer']],['Toro Rosso','#469BFF',['Carlos Sainz','Max Verstappen']],['Sauber','#9B0000',['Marcus Ericsson','Felipe Nasr']],['McLaren','#B6BABD',['Fernando Alonso','Jenson Button']],['Manor','#FFFFFF',['Pascal Wehrlein','Rio Haryanto']],['Haas','#B6BABD',['Romain Grosjean','Esteban Gutierrez']]]},
2017:{rounds:20,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Valtteri Bottas']],['Ferrari','#DC0000',['Sebastian Vettel','Kimi Räikkönen']],['Red Bull Racing','#1E41FF',['Daniel Ricciardo','Max Verstappen']],['Williams','#FFFFFF',['Felipe Massa','Lance Stroll']],['Force India','#FF8000',['Sergio Perez','Esteban Ocon']],['Renault','#FFF500',['Nico Hulkenberg','Jolyon Palmer']],['Toro Rosso','#469BFF',['Carlos Sainz','Daniil Kvyat']],['Sauber','#9B0000',['Marcus Ericsson','Pascal Wehrlein']],['McLaren','#B6BABD',['Fernando Alonso','Stoffel Vandoorne']],['Haas','#B6BABD',['Romain Grosjean','Kevin Magnussen']]]},
2018:{rounds:21,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Valtteri Bottas']],['Ferrari','#DC0000',['Sebastian Vettel','Kimi Räikkönen']],['Red Bull Racing','#1E41FF',['Daniel Ricciardo','Max Verstappen']],['Williams','#FFFFFF',['Lance Stroll','Sergey Sirotkin']],['Force India','#FF8000',['Sergio Perez','Esteban Ocon']],['Renault','#FFF500',['Nico Hulkenberg','Carlos Sainz']],['Toro Rosso','#469BFF',['Pierre Gasly','Brendon Hartley']],['Sauber','#9B0000',['Marcus Ericsson','Charles Leclerc']],['McLaren','#B6BABD',['Fernando Alonso','Stoffel Vandoorne']],['Haas','#B6BABD',['Romain Grosjean','Kevin Magnussen']]]},
2019:{rounds:21,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Valtteri Bottas']],['Ferrari','#DC0000',['Sebastian Vettel','Charles Leclerc']],['Red Bull Racing','#1E41FF',['Max Verstappen','Pierre Gasly']],['Williams','#FFFFFF',['Robert Kubica','George Russell']],['Racing Point','#F596C8',['Sergio Perez','Lance Stroll']],['Renault','#FFF500',['Nico Hulkenberg','Daniel Ricciardo']],['Toro Rosso','#469BFF',['Daniil Kvyat','Alexander Albon']],['Alfa Romeo','#9B0000',['Kimi Räikkönen','Antonio Giovinazzi']],['McLaren','#FF8700',['Carlos Sainz','Lando Norris']],['Haas','#B6BABD',['Romain Grosjean','Kevin Magnussen']]]},
2020:{rounds:17,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Valtteri Bottas']],['Ferrari','#DC0000',['Sebastian Vettel','Charles Leclerc']],['Red Bull Racing','#1E41FF',['Max Verstappen','Alexander Albon']],['Williams','#FFFFFF',['George Russell','Nicholas Latifi']],['Racing Point','#F596C8',['Sergio Perez','Lance Stroll']],['Renault','#FFF500',['Daniel Ricciardo','Esteban Ocon']],['AlphaTauri','#469BFF',['Daniil Kvyat','Pierre Gasly']],['Alfa Romeo','#9B0000',['Kimi Räikkönen','Antonio Giovinazzi']],['McLaren','#FF8700',['Carlos Sainz','Lando Norris']],['Haas','#B6BABD',['Romain Grosjean','Kevin Magnussen']]]},
2021:{rounds:22,teams:[
['Mercedes','#00D2BE',['Lewis Hamilton','Valtteri Bottas']],['Red Bull Racing','#1E41FF',['Max Verstappen','Sergio Perez']],['Ferrari','#DC0000',['Charles Leclerc','Carlos Sainz']],['McLaren','#FF8700',['Daniel Ricciardo','Lando Norris']],['Alpine','#0090FF',['Fernando Alonso','Esteban Ocon']],['AlphaTauri','#469BFF',['Pierre Gasly','Yuki Tsunoda']],['Aston Martin','#006F62',['Sebastian Vettel','Lance Stroll']],['Williams','#FFFFFF',['George Russell','Nicholas Latifi']],['Alfa Romeo','#9B0000',['Kimi Räikkönen','Antonio Giovinazzi']],['Haas','#B6BABD',['Mick Schumacher','Nikita Mazepin']]]}
};
const calendars={
2016:['Australia','Bahrain','China','Russia','Spain','Monaco','Canada','Azerbaijan','Austria','Great Britain','Hungary','Germany','Belgium','Italy','Singapore','Malaysia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
2017:['Australia','China','Bahrain','Russia','Spain','Monaco','Canada','Azerbaijan','Austria','Great Britain','Hungary','Belgium','Italy','Singapore','Malaysia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
2018:['Australia','Bahrain','China','Azerbaijan','Spain','Monaco','Canada','France','Austria','Great Britain','Germany','Hungary','Belgium','Italy','Singapore','Russia','Japan','United States','Mexico City','São Paulo','Abu Dhabi'],
2019:['Australia','Bahrain','China','Azerbaijan','Spain','Monaco','Canada','France','Austria','Great Britain','Germany','Hungary','Belgium','Italy','Singapore','Russia','Japan','Mexico City','United States','São Paulo','Abu Dhabi'],
2020:['Austria','Styria','Hungary','Great Britain','70th Anniversary','Spain','Belgium','Italy','Tuscany','Russia','Eifel','Portugal','Emilia-Romagna','Turkey','Bahrain','Sakhir','Abu Dhabi'],
2021:['Bahrain','Emilia-Romagna','Portugal','Spain','Monaco','Azerbaijan','France','Styria','Austria','Great Britain','Hungary','Belgium','Netherlands','Italy','Russia','Turkey','United States','Mexico City','São Paulo','Qatar','Saudi Arabia','Abu Dhabi']
};
const ratings={
'Lewis Hamilton':96,'Nico Rosberg':95,'Sebastian Vettel':94,'Kimi Räikkönen':91,'Daniel Ricciardo':91,'Daniil Kvyat':84,'Felipe Massa':86,'Felipe Nasr':79,'Rio Haryanto':75,'Esteban Gutierrez':79,'Jolyon Palmer':78,'Sergey Sirotkin':78,'Brendon Hartley':78,'Robert Kubica':84,'Valtteri Bottas':89,'Nico Hulkenberg':88,'Sergio Perez':88,'Kevin Magnussen':83,'Jolyon Palmer':78,'Carlos Sainz':87,'Max Verstappen':93,'Marcus Ericsson':78,'Felipe Nasr':80,'Fernando Alonso':94,'Jenson Button':90,'Pascal Wehrlein':81,'Rio Haryanto':75,'Romain Grosjean':86,'Esteban Gutierrez':80,'Lance Stroll':82,'Esteban Ocon':85,'Stoffel Vandoorne':82,'Sergey Sirotkin':79,'Pierre Gasly':86,'Brendon Hartley':79,'Charles Leclerc':91,'Robert Kubica':84,'George Russell':89,'Alexander Albon':86,'Antonio Giovinazzi':81,'Lando Norris':91,'Nicholas Latifi':76,'Daniel Ricciardo':91,'Yuki Tsunoda':82,'Mick Schumacher':80,'Nikita Mazepin':76
};
Object.entries(historical).forEach(([year,data])=>{
 data.regulationEra=Number(year)<=2021?'1.6L V6 TURBO-HYBRID · PRE-GROUND-EFFECT ERA':'GROUND-EFFECT ERA';
 data.engineFormula='1.6L V6 turbo-hybrid';
 SEASONS[year]=data;
});
SEASONS[2022].regulationEra='GROUND-EFFECT · 2022 TECHNICAL REGULATIONS';
SEASONS[2023].regulationEra='GROUND-EFFECT · 2023 TECHNICAL REGULATIONS';
SEASONS[2024].regulationEra='GROUND-EFFECT · 2024 TECHNICAL REGULATIONS';
SEASONS[2025].regulationEra='GROUND-EFFECT · 2025 TECHNICAL REGULATIONS';
SEASONS[2026].regulationEra='2026 NEXT-GENERATION TECHNICAL REGULATIONS';
Object.assign(DRIVER_RATING,ratings);
Object.assign(DRIVER_NUMBERS,{
 'Nico Rosberg':6,'Kimi Räikkönen':7,'Felipe Massa':19,'Daniil Kvyat':26,'Jolyon Palmer':30,
 'Marcus Ericsson':9,'Felipe Nasr':12,'Jenson Button':22,'Pascal Wehrlein':94,'Rio Haryanto':88,
 'Esteban Gutierrez':21,'Stoffel Vandoorne':2,'Sergey Sirotkin':35,'Brendon Hartley':28,
 'Robert Kubica':88,'Antonio Giovinazzi':99,'Nikita Mazepin':9
});
Object.assign(TEAM_BASE_RATINGS,{
2016:{'Mercedes':98,'Ferrari':91,'Red Bull Racing':89,'Williams':83,'Force India':81,'Renault':76,'Toro Rosso':80,'Sauber':73,'McLaren':75,'Manor':65,'Haas':76},
2017:{'Mercedes':97,'Ferrari':94,'Red Bull Racing':91,'Williams':80,'Force India':83,'Renault':79,'Toro Rosso':78,'Sauber':70,'McLaren':75,'Haas':78},
2018:{'Mercedes':97,'Ferrari':96,'Red Bull Racing':92,'Williams':68,'Force India':82,'Renault':80,'Toro Rosso':77,'Sauber':74,'McLaren':73,'Haas':83},
2019:{'Mercedes':98,'Ferrari':94,'Red Bull Racing':92,'Williams':65,'Racing Point':77,'Renault':79,'Toro Rosso':78,'Alfa Romeo':75,'McLaren':81,'Haas':79},
2020:{'Mercedes':99,'Ferrari':82,'Red Bull Racing':94,'Williams':67,'Racing Point':85,'Renault':82,'AlphaTauri':80,'Alfa Romeo':73,'McLaren':84,'Haas':70},
2021:{'Mercedes':97,'Red Bull Racing':97,'Ferrari':86,'McLaren':88,'Alpine':82,'AlphaTauri':83,'Aston Martin':81,'Williams':72,'Alfa Romeo':71,'Haas':68}
});
// Keep supplier identity aligned with the selected historical engine era.
const originalEngineForTeam=defaultEngineForTeam;
defaultEngineForTeam=function(team,year){
 const n=String(team||'').toLowerCase(),y=Number(year);
 if(n.includes('mclaren'))return y<=2017?'Honda':y<=2020?'Renault':'Mercedes-AMG';
 if(n.includes('toro rosso'))return y<=2017?'Ferrari':'Honda';
 if(n.includes('red bull'))return y<=2018?'Renault':y<=2021?'Honda':y>=2026?'Ford Red Bull Powertrains':'Honda RBPT';
 if(n.includes('alphatauri'))return y<=2021?'Honda':y>=2026?'Ford Red Bull Powertrains':'Honda RBPT';
 if(n.includes('racing bulls'))return y>=2026?'Ford Red Bull Powertrains':'Honda RBPT';
 if(n.includes('force india')||n.includes('racing point'))return 'Mercedes-AMG';
 if(n.includes('alfa romeo')||n==='sauber'||n.includes('kick sauber'))return y>=2026?'Audi':'Ferrari';
 if(n.includes('aston martin'))return y>=2026?'Honda':'Mercedes-AMG';
 if(n==='alpine')return y>=2026?'Mercedes-AMG':'Renault';
 if(n==='cadillac'||n==='haas')return 'Ferrari';
 if(n==='audi')return 'Audi';
 if(n.includes('renault')||n==='alpine')return 'Renault';
 if(n==='manor'||n==='williams'||n==='mercedes')return 'Mercedes-AMG';
 return originalEngineForTeam(team,year);
};
const originalEvent=window.getGpmEventName;
window.getGpmEventName=(season,round)=>window.GPM_SEASON_CALENDARS?.[Number(season)]?.[Math.max(1,Number(round)||1)-1]||calendars[Number(season)]?.[Math.max(1,Number(round)||1)-1]||originalEvent?.(season,round)||'Grand Prix';
window.GPM_HISTORICAL_SEASONS_0109={years:Object.keys(historical).map(Number).concat([2022,2023,2024,2025,2026]).sort((a,b)=>a-b),calendars};
// app.js initializes its first selector before later runtime modules load; refresh it now that all seasons exist.
if(typeof fillSeasonSelect==='function'&&typeof fillTeamSelect==='function'){fillSeasonSelect();fillTeamSelect();}
})();
