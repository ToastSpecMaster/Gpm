const $=id=>document.getElementById(id);
const SEASONS={
2022:{rounds:24,teams:[
['Red Bull Racing','#3671C6',['Max Verstappen','Sergio Perez']],['Ferrari','#E80020',['Charles Leclerc','Carlos Sainz']],['Mercedes','#27F4D2',['Lewis Hamilton','George Russell']],['Alpine','#0093CC',['Fernando Alonso','Esteban Ocon']],['McLaren','#FF8700',['Lando Norris','Daniel Ricciardo']],['Alfa Romeo','#C92D4B',['Valtteri Bottas','Zhou Guanyu']],['Aston Martin','#00665E',['Sebastian Vettel','Lance Stroll']],['Haas','#B6BABD',['Kevin Magnussen','Mick Schumacher']],['AlphaTauri','#4E5D73',['Pierre Gasly','Yuki Tsunoda']],['Williams','#64C4FF',['Alexander Albon','Nicholas Latifi']]]},
2023:{rounds:24,teams:[
['Red Bull Racing','#3671C6',['Max Verstappen','Sergio Perez']],['Ferrari','#E80020',['Charles Leclerc','Carlos Sainz']],['Mercedes','#27F4D2',['Lewis Hamilton','George Russell']],['Alpine','#0093CC',['Esteban Ocon','Pierre Gasly']],['McLaren','#FF8700',['Lando Norris','Oscar Piastri']],['Alfa Romeo','#C92D4B',['Valtteri Bottas','Zhou Guanyu']],['Aston Martin','#00665E',['Fernando Alonso','Lance Stroll']],['Haas','#B6BABD',['Kevin Magnussen','Nico Hulkenberg']],['AlphaTauri','#4E5D73',['Yuki Tsunoda','Nyck de Vries']],['Williams','#64C4FF',['Alexander Albon','Logan Sargeant']]]},
2024:{rounds:24,teams:[
['Red Bull Racing','#3671C6',['Max Verstappen','Sergio Perez']],['Ferrari','#E80020',['Charles Leclerc','Carlos Sainz']],['Mercedes','#27F4D2',['Lewis Hamilton','George Russell']],['McLaren','#FF8700',['Lando Norris','Oscar Piastri']],['Aston Martin','#00665E',['Fernando Alonso','Lance Stroll']],['Alpine','#0093CC',['Esteban Ocon','Pierre Gasly']],['RB','#6692FF',['Daniel Ricciardo','Yuki Tsunoda']],['Haas','#B6BABD',['Nico Hulkenberg','Kevin Magnussen']],['Kick Sauber','#52E252',['Valtteri Bottas','Zhou Guanyu']],['Williams','#64C4FF',['Alexander Albon','Logan Sargeant']]]},
2025:{rounds:24,teams:[
['McLaren','#FF8700',['Lando Norris','Oscar Piastri']],['Ferrari','#E80020',['Charles Leclerc','Lewis Hamilton']],['Red Bull Racing','#3671C6',['Max Verstappen','Liam Lawson']],['Mercedes','#27F4D2',['George Russell','Kimi Antonelli']],['Aston Martin','#00665E',['Fernando Alonso','Lance Stroll']],['Alpine','#0093CC',['Pierre Gasly','Jack Doohan']],['Haas','#B6BABD',['Esteban Ocon','Oliver Bearman']],['Racing Bulls','#6692FF',['Yuki Tsunoda','Isack Hadjar']],['Williams','#64C4FF',['Alexander Albon','Carlos Sainz']],['Kick Sauber','#52E252',['Nico Hulkenberg','Gabriel Bortoleto']]]},
2026:{rounds:24,teams:[
['Mercedes','#27F4D2',['George Russell','Kimi Antonelli']],['Ferrari','#E80020',['Charles Leclerc','Lewis Hamilton']],['Red Bull Racing','#3671C6',['Max Verstappen','Isack Hadjar']],['McLaren','#FF8700',['Lando Norris','Oscar Piastri']],['Racing Bulls','#6692FF',['Liam Lawson','Arvid Lindblad']],['Alpine','#0093CC',['Pierre Gasly','Franco Colapinto']],['Haas','#B6BABD',['Oliver Bearman','Esteban Ocon']],['Audi','#E5E5E5',['Nico Hulkenberg','Gabriel Bortoleto']],['Williams','#64C4FF',['Carlos Sainz','Alexander Albon']],['Aston Martin','#00665E',['Fernando Alonso','Lance Stroll']],['Cadillac','#D9D9D9',['Sergio Perez','Valtteri Bottas']]]}
};
// Historical F1 seasons are populated from the official F1DB season entrant files on demand.
for(let y=1950;y<=2015;y++)if(!SEASONS[y])SEASONS[y]={rounds:0,teams:[],f1dbPending:true};
SEASONS[2027]={rounds:24,regulationEra:'2027 · 2026 TECHNICAL RULES CONTINUITY',engineFormula:'1.6L V6 turbo-hybrid',teams:[
 ['Mercedes','#27F4D2',['Kimi Antonelli','George Russell']],['Ferrari','#E80020',['Charles Leclerc','Lewis Hamilton']],['Red Bull Racing','#3671C6',['Max Verstappen','Isack Hadjar']],['McLaren','#FF8700',['Lando Norris','Oscar Piastri']],['Racing Bulls','#6692FF',['Liam Lawson','Arvid Lindblad']],['Alpine','#0093CC',['Pierre Gasly','Franco Colapinto']],['Haas','#B6BABD',['Rafael Câmara','TBC · Haas seat']],['Audi','#E5E5E5',['Nico Hulkenberg','Gabriel Bortoleto']],['Williams','#64C4FF',['Carlos Sainz','Alexander Albon']],['Aston Martin','#006F62',['Fernando Alonso','Lance Stroll']],['Cadillac','#D9D9D9',['Sergio Perez','Valtteri Bottas']]
],sprintRounds:[1,3,4,7,8,10,14,21,23,24]};
const GPM_2027_CALENDAR=['Bahrain','Saudi Arabia','Australia','Japan','China','Miami','Canada','Monaco','Portugal','Great Britain','Austria','Belgium','Hungary','Italy','Spain','Azerbaijan','Türkiye','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'];
window.GPM_SEASON_CALENDARS=window.GPM_SEASON_CALENDARS||{};window.GPM_SEASON_CALENDARS[2027]=GPM_2027_CALENDAR;
const DRIVER_RATING={'Max Verstappen':96,'Lewis Hamilton':94,'Charles Leclerc':93,'Fernando Alonso':92,'Lando Norris':92,'George Russell':90,'Oscar Piastri':90,'Carlos Sainz':89,'Sergio Perez':88,'Pierre Gasly':86,'Alexander Albon':86,'Kimi Antonelli':85,'Isack Hadjar':83,'Nico Hulkenberg':84,'Esteban Ocon':84,'Lance Stroll':82,'Yuki Tsunoda':82,'Oliver Bearman':81,'Gabriel Bortoleto':80,'Liam Lawson':81,'Franco Colapinto':79,'Valtteri Bottas':85,'Daniel Ricciardo':86,'Kevin Magnussen':82,'Mick Schumacher':79,'Zhou Guanyu':79,'Sebastian Vettel':91,'Nicholas Latifi':75,'Nyck de Vries':78,'Logan Sargeant':76,'Jack Doohan':78,'Arvid Lindblad':78};
const JUNIOR_POOL={
2022:[['Theo Pourchaire','F2',84],['Felipe Drugovich','F2',83],['Liam Lawson','F2',81],['Jack Doohan','F2',80],['Ayumu Iwasa','F2',79],['Jehan Daruvala','F2',78],['Dennis Hauger','F2',78],['Logan Sargeant','F2',78],['Oliver Bearman','F3',80],['Isack Hadjar','F3',79],['Victor Martins','F3',78],['Zane Maloney','F3',77],['Gabriel Bortoleto','F3',77],['Andrea Kimi Antonelli','F4',78],['Arvid Lindblad','F4',73]],
2023:[['Theo Pourchaire','F2',84],['Frederik Vesti','F2',82],['Oliver Bearman','F2',82],['Jack Doohan','F2',80],['Ayumu Iwasa','F2',80],['Victor Martins','F2',79],['Isack Hadjar','F2',80],['Zane Maloney','F2',78],['Gabriel Bortoleto','F3',78],['Leonardo Fornaroli','F3',77],['Mari Boya','F3',75],['Gabriele Minì','F4',76],['Andrea Kimi Antonelli','F4',82],['Arvid Lindblad','F4',75]],
2024:[['Gabriel Bortoleto','F2',82],['Isack Hadjar','F2',83],['Andrea Kimi Antonelli','F2',84],['Oliver Bearman','F2',83],['Victor Martins','F2',80],['Zane Maloney','F2',79],['Jak Crawford','F2',79],['Paul Aron','F2',80],['Leonardo Fornaroli','F3',79],['Gabriele Minì','F3',78],['Luke Browning','F3',77],['Dino Beganovic','F3',77],['Freddie Slater','F4',76],['Arvid Lindblad','F3',79]],
2025:[['Leonardo Fornaroli','F2',81],['Jak Crawford','F2',80],['Luke Browning','F2',80],['Richard Verschoor','F2',79],['Dino Beganovic','F2',79],['Rafael Câmara','F3',80],['Ugo Ugochukwu','F3',77],['Tasanapol Inthraphuvasak','F3',75],['Freddie Slater','F3',79],['Alex Dunne','F2',81],['Arvid Lindblad','F2',82],['Gabriele Minì','F2',79],['Tuukka Taponen','F3',76],['Enzo Deligny','F4',73]],
2026:[['Rafael Câmara','F2',84],['Joshua Dürksen','F2',80],['Ritomo Miyata','F2',81],['Colton Herta','F2',83],['Noel León','F2',78],['Nikola Tsolov','F2',80],['Dino Beganovic','F2',81],['Roman Bilinski','F2',77],['Gabriele Minì','F2',80],['Oliver Goethe','F2',79],['Sebastián Montoya','F2',78],['Mari Boya','F2',77],['Martinius Stenshorne','F2',79],['Kush Maini','F2',79],['Tasanapol Inthraphuvasak','F2',76],['Emerson Fittipaldi','F2',75],['Cian Shields','F2',74],['Nicolás Varrone','F2',78],['Rafael Villagómez','F2',75],['Laurens van Hoepen','F2',77],['John Bennett','F2',75],['Théophile Naël','F3',78],['Ugo Ugochukwu','F3',79],['Ernesto Rivera','F3',75],['Noah Stromsted','F3',77],['Freddie Slater','F3',81],['Matteo De Palo','F3',76],['Mattia Colnaghi','F3',77],['Tuukka Taponen','F3',78],['Alex Powell','F3',76],['James Wharton','F3',77],['Pedro Clerot','F3',75],['Brando Badoer','F3',75],['Enzo Deligny','F3',76],['Fionn McLaughlin','F3',74],['Jin Nakamura','F3',75]]
};
function juniorDrivers(year){const y=Number(year)||2026;if(y<2022)return [];const latest=Math.max(...Object.keys(JUNIOR_POOL).map(Number));return (JUNIOR_POOL[y]||JUNIOR_POOL[latest]||[]).map(([name,series,rating])=>({name,series,rating}));}
function careerRoster(year,teamName,drivers,mode){const roster={};SEASONS[year].teams.forEach(t=>roster[t[0]]=[...t[2]]);if(mode==='team'){Object.keys(roster).forEach(team=>{roster[team]=roster[team].filter(n=>!drivers.includes(n));});roster[teamName]=[...drivers];}return roster;}
function assignedDrivers(c){return new Set(Object.values(c.roster||{}).flat());}
function availableMarketDrivers(c){const all=[...new Set([...allDrivers(c.season),...juniorDrivers(c.season).map(d=>d.name)])];const assigned=assignedDrivers(c);return all.filter(n=>!assigned.has(n)||c.drivers.includes(n));}
function ensureRoster(c){if(!c.roster)c.roster=careerRoster(c.season,c.name,c.drivers,c.mode);if(!c.roster[c.name])c.roster[c.name]=[...c.drivers];}
const RACES=['Bahrain','Saudi Arabia','Australia','Japan','China','Miami','Emilia-Romagna','Monaco','Canada','Spain','Austria','Great Britain','Belgium','Hungary','Netherlands','Italy','Azerbaijan','Singapore','United States','Mexico City','São Paulo','Las Vegas','Qatar','Abu Dhabi'];
let currentCareer=null,selectedMode='team';
const F1DB_INDIANAPOLIS_ROUND={1950:3,1951:2,1952:2,1953:2,1954:2,1955:3,1956:3,1957:3,1958:4,1959:2,1960:3};
const F1DB_TEAM_NAMES={mclaren:'McLaren',brm:'BRM',bmw:'BMW', 'bmw-sauber':'BMW Sauber',hwm:'HWM',afm:'AFM',lds:'LDS',ats:'ATS', 'ats-wheels':'ATS',hrt:'HRT', 'red-bull':'Red Bull Racing', 'lotus-f1':'Lotus', 'toro-rosso':'Toro Rosso', 'alpha-tauri':'AlphaTauri', 'force-india':'Force India', 'racing-point':'Racing Point', 'alfa-romeo':'Alfa Romeo', 'talbot-lago':'Talbot-Lago', 'simca-gordini':'Gordini', 'wolf-williams':'Wolf', 'frank-williams-racing-cars':'Williams', 'lotus-racing':'Lotus', 'behra-porsche':'Behra-Porsche', 'de-tomaso':'De Tomaso', 'iso-marlboro':'Iso-Marlboro', 'red-bull-racing':'Red Bull Racing'};
const F1DB_DRIVER_NAMES={'kimi-raikkonen':'Kimi Räikkönen','jose-froilan-gonzalez':'José Froilán González','juan-manuel-fangio':'Juan Manuel Fangio','birabongse-bhanudej':'Prince Bira','maria-teresa-de-filippis':'Maria Teresa de Filippis','jean-pierre-beltoise':'Jean-Pierre Beltoise','jean-pierre-jarier':'Jean-Pierre Jarier','jean-pierre-jabouille':'Jean-Pierre Jabouille','jean-pierre-jabouille':'Jean-Pierre Jabouille','rene-arnoux':'René Arnoux','francois-cevert':'François Cevert','francois-fittipaldi':'Wilson Fittipaldi','jochen-rindt':'Jochen Rindt','mika-hakkinen':'Mika Häkkinen','gilles-villeneuve':'Gilles Villeneuve','sebastien-bourdais':'Sébastien Bourdais','sebastien-buemi':'Sébastien Buemi','carlos-sainz-jr':'Carlos Sainz','ralf-schumacher':'Ralf Schumacher','heinz-harald-frentzen':'Heinz-Harald Frentzen','nelson-piquet-jr':'Nelson Piquet Jr.','max-verstappen':'Max Verstappen','nico-hulkenberg':'Nico Hülkenberg'};
function f1dbDisplayName(id,dict){if(dict[id])return dict[id];return String(id||'').split('-').filter(Boolean).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');}
function f1dbRounds(value){const out=[];String(value||'').split(',').forEach(part=>{const m=part.trim().match(/^(\d+)(?:-(\d+))?$/);if(!m)return;const a=+m[1],b=+(m[2]||m[1]);for(let n=a;n<=Math.min(b,40);n++)out.push(n);});return out;}
function f1dbColour(name){const n=String(name).toLowerCase();const known=[['ferrari','#DC0000'],['mercedes','#00D2BE'],['red bull','#3671C6'],['mclaren','#FF8700'],['williams','#64C4FF'],['lotus','#D4C34A'],['renault','#FFF500'],['alfa','#9B0000'],['brm','#176B48'],['brabham','#1F5AA6'],['tyrrell','#1476C8'],['benetton','#00A3E0'],['jordan','#D8D000'],['sauber','#9B0000'],['honda','#FFFFFF'],['toyota','#D71920'],['aston martin','#006F62'],['cooper','#2A7B45'],['maserati','#1D5E9B'],['vanwall','#2B6C45']];for(const [k,v] of known)if(n.includes(k))return v;const palette=['#8994A5','#B6BABD','#D4B36A','#7E8FBF','#7A9D83','#B67E9C','#6F9EA8'];const h=[...n].reduce((a,c)=>a+c.charCodeAt(0),0);return palette[h%palette.length];}
function parseF1DBEntrants(year,yaml){const groups={};const blocks=String(yaml||'').split(/(?=^- entrantId: )/m).filter(b=>b.startsWith('- entrantId: '));for(const block of blocks){const ctor=(block.match(/constructorId:\s*([^\r\n]+)/)||[])[1]?.trim();if(!ctor)continue;const re=/driverId:\s*([^\r\n]+)\s*\r?\n\s+rounds:\s*([^\r\n]+)/g;let m;while((m=re.exec(block))){let rounds=f1dbRounds(m[2]);if(F1DB_INDIANAPOLIS_ROUND[year])rounds=rounds.filter(n=>n!==F1DB_INDIANAPOLIS_ROUND[year]);if(!rounds.length)continue;const id=m[1].trim();const list=groups[ctor]||(groups[ctor]=[]);list.push({id,round:Math.min(...rounds),starts:rounds.length});}}
 const teams=Object.entries(groups).map(([id,drivers])=>{const unique=[...new Map(drivers.sort((a,b)=>b.starts-a.starts||a.round-b.round).map(d=>[d.id,d])).values()].slice(0,2).map(d=>f1dbDisplayName(d.id,F1DB_DRIVER_NAMES));return [f1dbDisplayName(id,F1DB_TEAM_NAMES),f1dbColour(id),unique];}).filter(t=>t[2].length===2).sort((a,b)=>a[0].localeCompare(b[0]));return teams;}
function f1dbCalendarName(slug){const known={'great-britain':'Great Britain','united-states':'United States','united-states-west':'United States West','united-states-east':'United States East','mexico':'Mexico City','sao-paulo':'São Paulo','emilia-romagna':'Emilia-Romagna','70th-anniversary':'70th Anniversary','tuscany':'Tuscany','eifel':'Eifel','portugal':'Portugal','turkey':'Türkiye','turkiye':'Türkiye','abu-dhabi':'Abu Dhabi','las-vegas':'Las Vegas','saudi-arabia':'Saudi Arabia','south-africa':'South Africa','san-marino':'San Marino','pacific':'Pacific','europe':'Europe','netherlands':'Netherlands','czech-republic':'Czech Republic','brazil':'Brazil','qatar':'Qatar','azerbaijan':'Azerbaijan','monaco':'Monaco','indianapolis':'Indianapolis','switzerland':'Switzerland','spain':'Spain','france':'France','italy':'Italy','belgium':'Belgium','germany':'Germany','argentina':'Argentina','portugal':'Portugal','austria':'Austria','hungary':'Hungary','japan':'Japan','canada':'Canada','australia':'Australia','china':'China','bahrain':'Bahrain','singapore':'Singapore','korea':'Korea','india':'India','russia':'Russia','malaysia':'Malaysia','mexico-city':'Mexico City','baku':'Azerbaijan','miami':'Miami','styria':'Styria','sakhir':'Sakhir','türkiye':'Türkiye'};return known[slug]||String(slug).split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ');}
async function loadGpmF1DBSeason(year){const y=Number(year);if(y<1950||y>2015)return !!SEASONS[y]?.teams?.length;const key=`gpm-f1db-season-${y}`;try{let cached=null;try{cached=JSON.parse(localStorage.getItem(key)||'null');}catch{}if(cached?.teams?.length&&cached?.calendar?.length){SEASONS[y]={rounds:cached.calendar.length,teams:cached.teams,regulationEra:cached.regulationEra,engineFormula:cached.engineFormula,f1db:true};window.GPM_SEASON_CALENDARS[y]=cached.calendar;return true;}
 const [entrantsRes,calendarRes]=await Promise.all([fetch(`https://raw.githubusercontent.com/f1db/f1db/main/src/data/seasons/${y}/entrants.yml`),fetch(`https://api.github.com/repos/f1db/f1db/contents/src/data/seasons/${y}/races`)]);if(!entrantsRes.ok||!calendarRes.ok)throw new Error('F1DB data request failed');const [yaml,entries]=await Promise.all([entrantsRes.text(),calendarRes.json()]);const calendar=entries.filter(x=>x.type==='dir'&&/^\d+-/.test(x.name)).sort((a,b)=>Number(a.name.split('-')[0])-Number(b.name.split('-')[0])).map(x=>f1dbCalendarName(x.name.replace(/^\d+-/,'')));const teams=parseF1DBEntrants(y,yaml);if(!teams.length||!calendar.length)throw new Error('F1DB returned incomplete season data');const era=y<=1951?'4.5L naturally aspirated / 1.5L supercharged era':y<=1953?'2.0L Formula 2 regulations':y<=1960?'2.5L naturally aspirated era':y<=1965?'1.5L naturally aspirated era':y<=1985?'3.0L naturally aspirated era':y===1986?'1.5L turbo era':y<=1988?'1.5L turbo / 3.5L naturally aspirated era':y<=1994?'3.5L naturally aspirated era':y<=2005?'3.0L V10 era':y<=2013?'2.4L V8 era':'1.6L V6 turbo-hybrid era';const engine=y<=1951?'Historical 4.5L NA / 1.5L supercharged':y<=1953?'2.0L naturally aspirated':y<=1960?'2.5L naturally aspirated':y<=1965?'1.5L naturally aspirated':y<=1985?'3.0L naturally aspirated':y===1986?'1.5L turbo':y<=1988?'1.5L turbo / 3.5L NA':y<=1994?'3.5L naturally aspirated':y<=2005?'3.0L V10':y<=2013?'2.4L V8':'1.6L V6 turbo-hybrid';SEASONS[y]={rounds:calendar.length,teams,regulationEra:era,engineFormula:engine,f1db:true};window.GPM_SEASON_CALENDARS[y]=calendar;try{localStorage.setItem(key,JSON.stringify({teams,calendar,regulationEra:era,engineFormula:engine}));}catch(cacheError){console.warn('F1DB season cache unavailable; current season remains playable',cacheError);}return true;
 }catch(err){console.warn('F1DB historical season load failed',y,err);return false;}}
window.loadGpmF1DBSeason=loadGpmF1DBSeason;
function allDrivers(year){return [...new Set((SEASONS[year]?.teams||[]).flatMap(t=>t[2]||[]).filter(n=>!/^TBC/i.test(n)))].sort((a,b)=>a.localeCompare(b));}
function fillSeasonSelect(){ $('seasonSelect').innerHTML=Object.keys(SEASONS).sort().reverse().map(y=>`<option value="${y}">${y} SEASON</option>`).join(''); $('seasonSelect').value='2026';}
async function fillTeamSelect(){const y=Number($('seasonSelect').value);const button=$('createBtn');if(y<=2015&&(!SEASONS[y]?.teams?.length||SEASONS[y]?.f1dbPending)){if(button){button.disabled=true;button.textContent='LOADING OFFICIAL GRID…';} $('teamSelect').innerHTML='<option>Loading official historical grid…</option>';const ok=await loadGpmF1DBSeason(y);if(Number($('seasonSelect').value)!==y)return;if(!ok){$('teamSelect').innerHTML='<option>Historical data unavailable — connect to the internet and retry</option>';if(button){button.disabled=true;button.textContent='HISTORICAL DATA UNAVAILABLE';}showToast(`Could not load the official ${y} season data. Connect to the internet and change seasons to retry.`);return;}}const season=SEASONS[y];$('teamSelect').innerHTML=(season?.teams||[]).map(t=>`<option value="${t[0]}">${t[0]}</option>`).join('');fillDriverSelects();if(button){button.disabled=!(season?.teams||[]).length;button.textContent=button.disabled?'NO GRID AVAILABLE':'CREATE CAREER ↗';}}
function fillDriverSelects(){const y=$('seasonSelect').value; const names=allDrivers(y);['driverOne','driverTwo'].forEach((id,i)=>{$(id).innerHTML=names.map(n=>`<option value="${n}">${n} · ${DRIVER_RATING[n]||78} OVR</option>`).join('');}); if(names.length>1)$('driverTwo').value=names[1];syncDriverChoices();}
function syncDriverChoices(){const a=$('driverOne').value,b=$('driverTwo').value;[...$('driverOne').options].forEach(o=>o.disabled=o.value===b&&o.value!==a);[...$('driverTwo').options].forEach(o=>o.disabled=o.value===a&&o.value!==b);}
function openCareer(mode){resetModal();selectedMode=mode;$('createBtn').onclick=createCareer;$('modalTitle').textContent=mode==='team'?'CREATE YOUR TEAM':'TAKE OVER A TEAM';$('modalText').textContent=mode==='team'?'Give your constructor a name, choose two drivers and set your technical suppliers.':'Choose a real constructor and begin with its season-specific driver line-up.';$('teamName').hidden=mode!=='team';$('teamNameLabel').hidden=mode!=='team';$('teamSelect').hidden=mode!=='existing';$('teamSelectLabel').hidden=mode!=='existing';$('driverOne').hidden=mode!=='team';$('driverTwo').hidden=mode!=='team';$('driverOneLabel').hidden=mode!=='team';$('driverTwoLabel').hidden=mode!=='team';$('seasonSelect').hidden=false;$('teamColor').hidden=false;$('teamColor').value='#e52b3d';$('engineSupplier').hidden=false;$('gearboxSupplier').hidden=false;$('engineSupplierLabel').hidden=false;$('gearboxSupplierLabel').hidden=false;$('createBtn').hidden=false;$('createBtn').textContent='CREATE CAREER ↗';fillTeamSelect();$('engineSupplier').innerHTML=Object.keys(PU_SUPPLIERS).map(n=>`<option value="${n}">${n}</option>`).join('');$('gearboxSupplier').innerHTML=Object.keys(GB_SUPPLIERS).map(n=>`<option value="${n}">${n}</option>`).join('');$('modal').hidden=false;if(mode==='team'){$('teamName').value='';requestAnimationFrame(()=>$('teamName').focus());}}
function showToast(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2400);}
function getSaves(){try{return JSON.parse(localStorage.getItem('gpm-careers')||'[]')}catch{return []}}
function saveCareer(){if(!currentCareer)return;ensureRoster(currentCareer);const saves=getSaves();const i=saves.findIndex(s=>String(s.id)===String(currentCareer.id));if(i>=0)saves[i]=currentCareer;else saves.push(currentCareer);localStorage.setItem('gpm-careers',JSON.stringify(saves));if(window.gpmDesktop?.saveCloud)window.gpmDesktop.saveCloud({careers:saves,driverCareers:(()=>{try{return JSON.parse(localStorage.getItem('gpm-driver-careers-v1')||'[]')}catch{return []}})()}).catch(error=>console.warn('Cloud auto-sync failed:',error));}
const PU_SUPPLIERS={
 'Mercedes-AMG':{power:94,reliability:91,cost:8,description:'Strong peak power with proven durability.'},
 'Honda':{power:91,reliability:90,cost:7,description:'Honda works power unit used in the 2016–2020 historical seasons.'},
 'Ferrari':{power:93,reliability:89,cost:8,description:'High performance with a balanced reliability profile.'},
 'Honda RBPT':{power:92,reliability:92,cost:8,description:'Efficient power delivery and strong reliability.'},
 'Audi':{power:89,reliability:88,cost:7,description:'Developing works package with room to mature.'},
 'Renault':{power:88,reliability:86,cost:6,description:'Competitive works package with a lower supply cost.'},
 'Cosworth':{power:84,reliability:87,cost:5,description:'Independent supplier focused on dependable operation.'},
 'Own Works':{power:82,reliability:80,cost:4,description:'Your own engine programme. Only this works programme can receive your engine development.'},
 'Ford Red Bull Powertrains':{power:91,reliability:89,cost:7,description:'New-generation works programme with strong development potential.'},
 'Porsche Motorsport':{power:90,reliability:91,cost:8,description:'Efficient hybrid package with a durability-first philosophy.'},
 'Toyota Gazoo Racing':{power:89,reliability:94,cost:7,description:'Conservative high-reliability works engine programme.'},
 'BMW Motorsport':{power:90,reliability:88,cost:7,description:'Performance-focused independent manufacturer.'}
};
const GB_SUPPLIERS={
 'Mercedes':{performance:93,reliability:92,cost:3},'Ferrari':{performance:92,reliability:90,cost:3},'Red Bull Technology':{performance:94,reliability:91,cost:3.5},'McLaren Applied':{performance:89,reliability:92,cost:2.5},'Audi':{performance:88,reliability:90,cost:2.5},'In-house':{performance:84,reliability:86,cost:2},'Xtrac':{performance:87,reliability:93,cost:2.2},'Williams Advanced Engineering':{performance:86,reliability:91,cost:2.4},'Porsche Motorsport':{performance:91,reliability:94,cost:3.2}
};
function defaultEngineForTeam(team,year){const t=String(team||'').toLowerCase(),s=Number(year);if(t.includes('ferrari')||t.includes('haas'))return 'Ferrari';if(t.includes('mercedes')||t.includes('mclaren')||t.includes('williams'))return 'Mercedes-AMG';if(t.includes('red bull')||t.includes('racing bulls')||t.includes('cash app rb')||t==='rb')return 'Honda RBPT';if(t.includes('alpine')||t.includes('renault'))return 'Renault';if(t.includes('audi')||(t.includes('sauber')&&s>=2026))return 'Audi';if(t.includes('aston martin')&&s>=2026)return 'Honda RBPT';if(t.includes('sauber'))return 'Ferrari';return 'Mercedes-AMG';}
function teamWorksEngine(c){
 if(c.mode==='team')return c.engineSupplier==='Own Works';
 const t=String(c.name||'').toLowerCase(),s=Number(c.season);
 if(t.includes('ferrari'))return c.engineSupplier==='Ferrari';
 if(t.includes('mercedes'))return c.engineSupplier==='Mercedes-AMG';
 if(t.includes('alpine')||t.includes('renault'))return c.engineSupplier==='Renault';
 if(t.includes('audi')||t.includes('sauber')&&s>=2026)return c.engineSupplier==='Audi';
 if(t.includes('red bull')||t.includes('racing bulls')||t.includes('cash app rb')||t==='rb')return c.engineSupplier==='Honda RBPT';
 return false;
}
function ensureTechnicalState(c){
 if(!c.technicalVersion&&c.mode==='existing'&&!c.technicalChanges?.length)c.engineSupplier=defaultEngineForTeam(c.name,c.season);
 c.engineSupplier=PU_SUPPLIERS[c.engineSupplier]?c.engineSupplier:'Mercedes-AMG';
 c.gearboxSupplier=GB_SUPPLIERS[c.gearboxSupplier]?c.gearboxSupplier:'In-house';
 const pu=PU_SUPPLIERS[c.engineSupplier],gb=GB_SUPPLIERS[c.gearboxSupplier];
 c.enginePower=Number.isFinite(c.enginePower)?c.enginePower:pu.power;
 c.engineReliability=Number.isFinite(c.engineReliability)?c.engineReliability:pu.reliability;
 c.gearboxPerformance=Number.isFinite(c.gearboxPerformance)?c.gearboxPerformance:gb.performance;
 c.gearboxReliability=Number.isFinite(c.gearboxReliability)?c.gearboxReliability:gb.reliability;
 c.technicalChanges=c.technicalChanges||[];c.technicalVersion=1;
 c.ownsPowerUnit=teamWorksEngine(c);
 c.parts=c.parts||{aero:c.car||70,chassis:c.car||70,power:c.car||70,suspension:c.car||70,reliability:c.car||70};
 c.parts.power=c.enginePower;
 c.parts.aero=Number.isFinite(c.parts.aero)?c.parts.aero:(Number(c.car)||70);
 c.parts.chassis=Number.isFinite(c.parts.chassis)?c.parts.chassis:(Number(c.car)||70);
 c.parts.suspension=Number.isFinite(c.parts.suspension)?c.parts.suspension:(Number(c.car)||70);
 c.parts.reliability=Number.isFinite(c.parts.reliability)?c.parts.reliability:(Number(c.car)||70);
 c.car=getPartOverall(c);
}
function openTechnicalSuppliers(){
 if(!currentCareer)return;const c=currentCareer;ensureTechnicalState(c);
 const pu=PU_SUPPLIERS[c.engineSupplier],gb=GB_SUPPLIERS[c.gearboxSupplier],owns=teamWorksEngine(c);
 const puCards=Object.entries(PU_SUPPLIERS).map(([name,d])=>`<article class="gpm-supplier-card ${name===c.engineSupplier?'current':''}"><div class="gpm-supplier-top"><b>${name===c.engineSupplier?'CURRENT · ':''}${name}</b><span>€${d.cost}M / season · €${(d.cost+4).toFixed(1)}M to switch now</span></div><div class="gpm-supplier-meters"><label>POWER <b>${d.power}/100</b><i><span style="width:${d.power}%"></span></i></label><label>RELIABILITY <b>${d.reliability}/100</b><i><span style="width:${d.reliability}%"></span></i></label></div><p>${d.description}</p>${name!==c.engineSupplier?`<button class="small-action" data-pu="${name}">SWITCH SUPPLIER</button>`:'<small class="gpm-current-label">CURRENT POWER UNIT</small>'}</article>`).join('');
 const gbCards=Object.entries(GB_SUPPLIERS).map(([name,d])=>`<article class="gpm-supplier-card ${name===c.gearboxSupplier?'current':''}"><div class="gpm-supplier-top"><b>${name===c.gearboxSupplier?'CURRENT · ':''}${name}</b><span>€${d.cost}M / season · €${(d.cost+4).toFixed(1)}M to switch now</span></div><div class="gpm-supplier-meters"><label>PERFORMANCE <b>${d.performance}/100</b><i><span style="width:${d.performance}%"></span></i></label><label>RELIABILITY <b>${d.reliability}/100</b><i><span style="width:${d.reliability}%"></span></i></label></div>${name!==c.gearboxSupplier?`<button class="small-action" data-gearbox="${name}">SWITCH SUPPLIER</button>`:'<small class="gpm-current-label">CURRENT GEARBOX</small>'}</article>`).join('');
 const body=`<div class="gpm-technical-window"><p>Technical contracts can be changed at any point in the season. A new supplier takes effect immediately and charges its switch fee. Power and reliability are supplier-defined; they are not generic upgrade sliders.</p><div class="gpm-tech-summary"><div><small>POWER UNIT</small><b>${c.engineSupplier}</b><span>POWER ${pu.power} · RELIABILITY ${pu.reliability}</span></div><div><small>GEARBOX</small><b>${c.gearboxSupplier}</b><span>PERFORMANCE ${gb.performance} · RELIABILITY ${gb.reliability}</span></div></div><section><div class="eyebrow">POWER UNIT SUPPLIER</div><h3>ENGINE CONTRACTS</h3><div class="gpm-supplier-grid">${puCards}</div></section><section><div class="eyebrow">TRANSMISSION SUPPLIER</div><h3>GEARBOX CONTRACTS</h3><div class="gpm-supplier-grid">${gbCards}</div></section><section class="gpm-own-engine"><b>${owns?'WORKS ENGINE · DEVELOPMENT ELIGIBLE':'CUSTOMER ENGINE · DEVELOPMENT LOCKED'}</b><p>${owns?'Your team manufactures this power unit. Engine development can be managed by your own works programme.':'Your team is a customer of its current engine manufacturer. You cannot upgrade another manufacturer’s power unit. Change to your own works programme only if you want to manufacture and develop your own engine.'}</p>${owns?'<button class="small-action" id="gpmDevelopOwnPU">DEVELOP OWN ENGINE · €12M</button>':''}</section><div class="gpm-tech-message" id="gpmTechMessage" role="status"></div></div>`;
 const root=showCareerModal('TECHNICAL SUPPLIER MANAGEMENT',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 function message(t){const el=root.querySelector('#gpmTechMessage');if(el)el.textContent=t;}
 function applyChange(type,name){const data=type==='pu'?PU_SUPPLIERS[name]:GB_SUPPLIERS[name];if(!data)return;const fee=data.cost+(type==='pu'?4:1.5);if(c.budget<fee){message(`Not enough budget. Supplier change costs €${fee.toFixed(1)}M.`);return;}const old=type==='pu'?c.engineSupplier:c.gearboxSupplier;if(old===name)return;c.budget-=fee;if(type==='pu'){c.engineSupplier=name;c.enginePower=data.power;c.engineReliability=data.reliability;c.parts=c.parts||{};c.parts.power=data.power;c.ownsPowerUnit=teamWorksEngine(c);}else{c.gearboxSupplier=name;c.gearboxPerformance=data.performance;c.gearboxReliability=data.reliability;}c.technicalChanges=c.technicalChanges||[];c.technicalChanges.push({season:c.season,round:c.round,type,from:old,to:name,fee});c.history=c.history||[];c.history.push({title:`${type==='pu'?'Power unit':'Gearbox'} supplier changed`,text:`${c.name} switched ${type==='pu'?'power unit':'gearbox'} from ${old} to ${name} during the ${c.season} season. Change fee: €${fee.toFixed(1)}M.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();root.hidden=true;showToast(`${type==='pu'?'Power unit':'Gearbox'} supplier changed to ${name}.`);openTechnicalSuppliers();}
 root.querySelectorAll('[data-pu]').forEach(b=>b.addEventListener('click',()=>applyChange('pu',b.dataset.pu)));
 root.querySelectorAll('[data-gearbox]').forEach(b=>b.addEventListener('click',()=>applyChange('gearbox',b.dataset.gearbox)));
 root.querySelector('#gpmDevelopOwnPU')?.addEventListener('click',()=>{if(!teamWorksEngine(c)){message('Only your own works power unit can be developed.');return;}if(c.budget<12){message('Not enough budget. Engine development costs €12M.');return;}if(c.enginePower>=100){message('Your works power unit has reached its development ceiling.');return;}c.budget-=12;c.enginePower=Math.min(100,c.enginePower+2);c.engineReliability=Math.max(60,c.engineReliability-1);c.parts.power=c.enginePower;c.history.push({title:'Works power unit development',text:`Your own ${c.engineSupplier} engine gained 2 power points. Reliability is now ${c.engineReliability}/100.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();root.hidden=true;showToast('Own engine developed: +2 power, -1 reliability.');openTechnicalSuppliers();});
}
window.openGpmTechnicalSuppliers=openTechnicalSuppliers;
function createCareer(){
 const year=+$('seasonSelect').value;let teamName,drivers,colour,mode=selectedMode;if(!SEASONS[year]?.teams?.length){showToast('The selected season grid has not loaded yet.');return;}
 if(mode==='team'){
  teamName=$('teamName').value.trim();
  if(!teamName){showToast('Enter a team name before creating your constructor.');$('teamName').focus();return;}
  if(SEASONS[year].teams.some(t=>t[0].toLowerCase()===teamName.toLowerCase())){showToast('That constructor name is already in this season. Choose another name.');$('teamName').focus();return;}
  drivers=[$('driverOne').value,$('driverTwo').value];
  if(!drivers[0]||!drivers[1]||drivers[0]===drivers[1]){showToast('Choose two different drivers for your team.');return;}
  colour=$('teamColor').value;
 }else{
  teamName=$('teamSelect').value;const team=SEASONS[year].teams.find(t=>t[0]===teamName);
  if(!team){showToast('Choose a valid constructor first.');return;}
  drivers=[...team[2]];colour=team[1];
 }
 const saves=getSaves();if(saves.length>=5){showToast('Career slots full. Delete a save before starting another.');return;}
 const c={id:Date.now(),mode,name:teamName,colour,engineSupplier:mode==='team'?$('engineSupplier').value:defaultEngineForTeam(teamName,year),gearboxSupplier:$('gearboxSupplier').value,logo:teamName.split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase(),season:year,drivers,budget:mode==='team'?100:SEASONS[year].teams.length===11?115:95,car:mode==='team'?80:teamBaseRating(year,teamName),reputation:mode==='team'?30:55,round:0,points:0,driverPoints:[0,0],wins:0,podiums:0,staff:mode==='team'?55:70,contractYears:2,sponsors:mode==='team'?['Founding Partner']:['Title Partner','Technical Partner'],upgrades:0,created:new Date().toISOString(),history:[],roster:careerRoster(year,teamName,drivers,mode),reserves:[],raceEngineer:null,engineersOwned:[],regulationSchedule:null,regulationHistory:[],raceArchive:[]};ensureTechnicalState(c);assignStartingStaff(c);
 try{localStorage.setItem('gpm-careers',JSON.stringify([...saves,c]));}
 catch(error){console.error('Career save failed:',error);showToast('Could not save this career on this device. Check available storage and try again.');return;}
 currentCareer=c;$('modal').hidden=true;renderCareer();showView('career');renderSaves();showConstructorIntroduction(c);showToast(`${teamName} has joined the ${year} grid.`);
}
function driverRaceNumber(name){return DRIVER_NUMBERS[name]??'—';}
function constructorEmblem(c){const initials=escapeHtml(c.logo||c.name.split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase());return `<div class="constructor-emblem" style="--team-colour:${escapeHtml(c.colour||'#e52b3d')}"><svg viewBox="0 0 100 112" role="img" aria-label="${escapeHtml(c.name)} constructor logo"><path d="M50 4 91 20 84 75 50 106 16 75 9 20Z" fill="${escapeHtml(c.colour||'#e52b3d')}" stroke="#f3f5f8" stroke-width="4"/><path d="M23 29H77L69 42H31ZM29 51H71L63 64H37Z" fill="#101824" opacity=".85"/><text x="50" y="88" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">${initials}</text></svg></div>`;}
function showConstructorIntroduction(c){const body=`<div class="constructor-intro">${constructorEmblem(c)}<div class="constructor-intro-copy"><div class="eyebrow">OFFICIAL CONSTRUCTOR PRESENTATION · ${c.season}</div><h2>${escapeHtml(c.name)}</h2><p>${c.mode==='team'?'A new constructor joins the FIA Formula One World Championship.':'The team is ready to begin its championship campaign.'}</p></div></div><div class="constructor-drivers"><article><small>CAR 1</small><strong>#${driverRaceNumber(c.drivers[0])}</strong><b>${escapeHtml(c.drivers[0])}</b></article><article><small>CAR 2</small><strong>#${driverRaceNumber(c.drivers[1])}</strong><b>${escapeHtml(c.drivers[1])}</b></article></div><p class="gpm-race-note">Constructor identity, team colours and driver numbers are saved with this career.</p>${window.GPMHistoricalCareer0110?.regulationHtml(c)||''}`;showCareerModal('WELCOME TO THE GRID',body,[{label:'ENTER TEAM HQ →',kind:'primary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);}

function renderSaves(){const saves=getSaves();$('saveList').innerHTML=saves.length?saves.map(s=>`<div class="save-card-row"><button class="save-card panel" data-load="${s.id}"><span class="save-swatch" style="background:${s.colour}"></span><span><b>${escapeHtml(s.name)}</b><small>${s.season} · ${s.mode==='team'?'MY TEAM':'CONSTRUCTOR'} · R${s.round}</small></span><strong>${s.points} PTS</strong><i>LOAD ↗</i></button><button class="save-delete" data-delete-save="${s.id}" aria-label="Delete ${escapeHtml(s.name)}">DELETE</button></div>`).join(''):'<div class="empty-state panel">No careers yet. Start your first championship.</div>';$('saveCount').textContent=`${saves.length}/5 CAREER SLOTS USED · SELECT LOAD TO RESUME`;document.querySelectorAll('[data-load]').forEach(b=>b.addEventListener('click',()=>{currentCareer=getSaves().find(s=>s.id===+b.dataset.load);if(!currentCareer)return;ensureRoster(currentCareer);saveCareer();renderCareer();showView('career');}));document.querySelectorAll('[data-delete-save]').forEach(b=>b.addEventListener('click',()=>{const id=+b.dataset.deleteSave;const target=getSaves().find(s=>s.id===id);if(!target)return;if(confirm(`Permanently delete ${target.name} (${target.season})? This cannot be undone.`)){localStorage.setItem('gpm-careers',JSON.stringify(getSaves().filter(s=>s.id!==id)));if(window.gpmDesktop?.saveCloud)window.gpmDesktop.saveCloud({careers:getSaves().filter(s=>s.id!==id),driverCareers:(()=>{try{return JSON.parse(localStorage.getItem('gpm-driver-careers-v1')||'[]')}catch{return []}})()}).catch(error=>console.warn('Cloud delete sync failed:',error));if(currentCareer&&currentCareer.id===id){currentCareer=null;showView('home');}renderSaves();showToast('Career save deleted.');}}));}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderCareer(){if(!currentCareer)return;const c=currentCareer;const season=SEASONS[c.season];$('seasonBadge').innerHTML=`<span class="live-dot"></span> ${c.season} SEASON · BUILD 0.10.11.0`;$('hqSeasonLabel').textContent=`${c.season} FIA FORMULA 1 WORLD CHAMPIONSHIP`;$('hqTeamName').textContent=c.name;const hqBanner=$('hqTeamName').closest('.hq-banner');if(hqBanner){let logo=hqBanner.querySelector('.hq-constructor-logo');if(!logo){logo=document.createElement('div');logo.className='hq-constructor-logo';hqBanner.insertBefore(logo,hqBanner.firstChild);}logo.innerHTML=constructorEmblem(c);}$('hqTeamMeta').textContent=`${c.mode==='team'?'Founder & Team Principal':'Team Principal'} · ${c.season} Season · ${season.regulationEra||'FIA technical regulations'} · ${c.engineSupplier||'Mercedes-AMG'} PU · ${c.gearboxSupplier||'In-house'} gearbox`;$('hqRank').textContent=`P${Math.min(season.teams.length,Math.max(1,season.teams.length-Math.floor(c.points/35)))}`;$('hqPoints').textContent=`${c.points} PTS`;$('budgetValue').textContent=`€${c.budget.toFixed(1)}M`;$('carValue').textContent=`${c.car} / 100`;$('repValue').textContent=c.reputation;$('roundValue').textContent=`R${c.round} / ${season.rounds}`;$('driverSeasonTag').textContent=c.season;$('driverCards').innerHTML=c.drivers.map((d,i)=>`<article class="driver-card panel"><div class="career-driver-photo" data-career-driver="${escapeHtml(d)}"><span>${escapeHtml(d.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span></div><div class="driver-top"><span class="driver-number">0${i+1}</span><span class="driver-rating">${DRIVER_RATING[d]||78} OVR</span></div><h3>${escapeHtml(d)}</h3><div class="driver-role">${i===0?'LEAD DRIVER':'SECOND DRIVER'}</div><div class="driver-points">${c.driverPoints[i]||0} <small>CHAMPIONSHIP PTS</small></div><div class="rating-bar"><i style="width:${DRIVER_RATING[d]||78}%"></i></div></article>`).join('');ensureRoster(c);const assigned=assignedDrivers(c);const prospects=juniorDrivers(c.season).filter(d=>!assigned.has(d.name));$('reserveList').innerHTML=(c.reserves||[]).length?c.reserves.map(n=>`<span class="reserve-chip">ACADEMY · ${escapeHtml(n)} <span>${c.reserveStats?.[n]?.series||juniorDrivers(c.season).find(x=>x.name===n)?.series||'JUNIOR'} · STILL RACING · ${DRIVER_RATING[n]||juniorDrivers(c.season).find(x=>x.name===n)?.rating||75} OVR</span></span>`).join(''):'<span class="reserve-chip">No reserve drivers signed</span>';$('openTransferBtn').onclick=openDriverMarket;const seasonRounds=SEASONS[c.season]?.rounds||24;$('nextRound').textContent=c.round>=seasonRounds?'—':c.round+1;$('nextRace').textContent=c.round>=seasonRounds?`${c.season} SEASON COMPLETE`:`${(window.getGpmEventName?window.getGpmEventName(c.season,c.round+1):RACES[c.round%RACES.length]).toUpperCase()} GRAND PRIX`;$('raceBtn').textContent=c.round>=seasonRounds?'NEXT SEASON →':'SIMULATE RACE + RESULTS ↗';$('garageCarName').textContent=`${c.season} CHASSIS`;ensureTechnicalState(c);$('attributeList').innerHTML=`<div class="garage-repair-head panel"><div><b>COMPONENT CONDITION</b><small>Replace worn parts before the next Grand Prix</small></div><button class="small-action" id="repairPartsBtn">INSPECT / REPAIR PARTS</button></div>`+[['AERODYNAMICS',c.parts.aero],['CHASSIS',c.parts.chassis],['POWER UNIT',c.parts.power],['SUSPENSION',c.parts.suspension],['RELIABILITY',c.parts.reliability]].map(([n,v])=>`<div class="attribute-row panel"><span>${n}</span><div class="attribute-track"><i style="width:${v}%"></i></div><b>${Math.round(v)}</b></div>`).join('');$('repairPartsBtn')?.addEventListener('click',openPartsRepair);$('saveStatus').textContent=`Saved locally · ${c.season} · Round ${c.round} · ${c.name}`;$('inboxContent').innerHTML=(c.history.length?c.history.slice().reverse().map(h=>`<div class="inbox-item"><span class="inbox-dot"></span><div><b>${escapeHtml(h.title)}</b><p>${escapeHtml(h.text)}</p><small>${escapeHtml(h.date)}</small></div></div>`).join(''):'<div class="empty-state">No new messages. Your engineering team will contact you when the season gets underway.</div>');}
function openDriverMarket(){if(!currentCareer)return;ensureRoster(currentCareer);const c=currentCareer;const assigned=assignedDrivers(c);const pool=[...allDrivers(c.season).map(n=>({name:n,series:'F1',rating:DRIVER_RATING[n]||78})),...juniorDrivers(c.season)];const candidates=pool.filter((d,i)=>pool.findIndex(x=>x.name===d.name)===i&&!c.drivers.includes(d.name));$('transferDriver').innerHTML=candidates.map(d=>`<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)} · ${d.series} · ${d.rating} OVR</option>`).join('');$('transferIntro').textContent=`${c.name} · ${c.season} season. Sign F2, F3 and F4 prospects into your reserve programme, or promote an eligible prospect into either F1 seat.`;$('transferModal').hidden=false;updateMarketDetail();}
function updateMarketDetail(){if(!currentCareer)return;const name=$('transferDriver').value;const d=[...allDrivers(currentCareer.season).map(n=>({name:n,series:'F1',rating:DRIVER_RATING[n]||78})),...juniorDrivers(currentCareer.season)].find(x=>x.name===name);if(!d){$('marketDetail').textContent='No eligible drivers available.';return;}const assignedTo=Object.entries(currentCareer.roster||{}).find(([team,list])=>list.includes(name));$('marketDetail').innerHTML=`<div class=\"gpm-transfer-portrait\" data-transfer-portrait=\"${escapeHtml(d.name)}\"><span>${escapeHtml(d.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span></div><b>${escapeHtml(d.name)}</b> · ${d.series} · ${d.rating} OVR<br>${assignedTo?`Currently contracted to ${escapeHtml(assignedTo[0])}. You must complete a direct F1 seat transfer.`:d.series==='F1'?'Free-agent F1 driver. Can be signed to a race seat.':'Season-specific junior prospect. Can be signed as a reserve or promoted into an F1 race seat.'}`;}
function confirmDriverTransfer(){if(!currentCareer)return;const c=currentCareer;ensureRoster(c);const candidate=$('transferDriver').value;const seat=+$('transferSeat').value;const outgoing=c.drivers[seat];if(!candidate){showToast('Choose a driver first.');return;}const junior=juniorDrivers(c.season).find(d=>d.name===candidate);const fromTeam=Object.entries(c.roster).find(([team,list])=>list.includes(candidate));c.reserves=c.reserves||[];if(seat===2){if(!junior){showToast('Only season-specific F2, F3 or F4 prospects can be signed as reserves.');return;}if(fromTeam){showToast('This driver is already assigned to an F1 team.');return;}if(c.reserves.includes(candidate)){showToast('This prospect is already in your reserve programme.');return;}const fee=Math.max(1,Math.round((junior.rating-65)*.18*10)/10);if(c.budget<fee){showToast(`Not enough budget. Signing fee: €${fee}M.`);return;}c.budget-=fee;c.reserves.push(candidate);c.history.push({title:'Junior prospect signed',text:`${candidate} (${junior.series}, ${junior.rating} OVR) joined the reserve programme for €${fee}M.`,date:`Season ${c.season} · R${c.round}`});saveCareer();$('transferModal').hidden=true;renderCareer();showToast(`${candidate} signed as a reserve.`);return;}if(candidate===c.drivers[1-seat]||candidate===outgoing){showToast('That driver already occupies one of your race seats.');return;}if(fromTeam){const idx=fromTeam[1].indexOf(candidate);fromTeam[1][idx]=outgoing;}c.drivers[seat]=candidate;c.roster[c.name]=[...c.drivers];c.reserves=c.reserves.filter(n=>n!==candidate);if(!fromTeam&&!c.reserves.includes(outgoing))c.reserves.push(outgoing);c.driverPoints[seat]=0;c.history.push({title:'Driver transfer completed',text:`${candidate} joined ${c.name}, replacing ${outgoing}. The driver roster was updated without duplicate assignments.`,date:`Season ${c.season} · R${c.round}`});saveCareer();$('transferModal').hidden=true;renderCareer();renderSaves();showToast(`${candidate} signed. ${outgoing} ${fromTeam?'swapped teams':'released to reserves'}.`);}
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===`${name}View`));document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));if(name==='career'&&currentCareer)renderCareer();if(name==='garage'&&currentCareer)renderCareer();}
function upgradeStaff(){if(!currentCareer)return;if(currentCareer.budget<4){showToast('Not enough funds for staff development.');return;}currentCareer.budget-=4;currentCareer.staff=Math.min(99,currentCareer.staff+5);currentCareer.history.push({title:'Staff development programme completed',text:`Staff quality increased to ${currentCareer.staff}/100 after a €4M investment.`,date:`Season ${currentCareer.season} · R${currentCareer.round}`});saveCareer();renderCareer();showToast('Staff upgraded. +5 operations rating.');}
function developCar(){if(!currentCareer)return;if(currentCareer.budget<5){showToast('Not enough funds for this upgrade.');return;}currentCareer.budget-=5;currentCareer.car=Math.min(99,currentCareer.car+2);currentCareer.upgrades++;currentCareer.history.push({title:'Development upgrade completed',text:`The engineering department delivered an upgrade. Car performance is now ${currentCareer.car}/100.`,date:`Season ${currentCareer.season} · R${currentCareer.round}`});saveCareer();renderCareer();showToast('Upgrade installed. +2 car performance.');}
function simulateRace(){if(!currentCareer)return;const c=currentCareer;const season=SEASONS[c.season];if(c.round>=season.rounds){showToast('Season complete! Start a new career for another championship.');return;}const driverAvg=c.drivers.reduce((n,d)=>n+(DRIVER_RATING[d]||78),0)/2;const performance=(c.car*.48+driverAvg*.35+c.staff*.17);const score=Math.max(0,Math.round((performance-68)*.65+(Math.random()*12-4)));const d1=Math.max(0,Math.round(score*(DRIVER_RATING[c.drivers[0]]||78)/driverAvg));const d2=Math.max(0,score-d1);c.points+=score;c.driverPoints[0]+=d1;c.driverPoints[1]+=d2;c.round++;if(score>=18)c.podiums++;if(score>=25)c.wins++;const race=window.getGpmEventName?window.getGpmEventName(c.season,c.round):RACES[(c.round-1)%RACES.length];c.history.push({title:`${race} Grand Prix · Race result`,text:`${c.name} scored ${score} points. ${c.drivers[0]} earned ${d1} and ${c.drivers[1]} earned ${d2}. Team budget received €${(1.2+score*.08).toFixed(1)}M in prize and performance income.`,date:`Season ${c.season} · Round ${c.round}`});c.budget+=1.2+score*.08;c.reputation=Math.min(99,c.reputation+(score>=15?2:1));saveCareer();renderCareer();showToast(`${race} GP complete: ${score} points scored.`);}
function viewStandings(){if(!currentCareer)return;const fake=SEASONS[currentCareer.season].teams.map((t,i)=>({name:t[0],pts:Math.max(0,Math.round((100-i*8)+Math.sin(i*2.2)*13))}));fake.push({name:currentCareer.name,pts:currentCareer.points,custom:true});fake.sort((a,b)=>b.pts-a.pts);const rows=fake.map((t,i)=>`<div class="standing-row ${t.custom?'your-team':''}"><b>${i+1}</b><span>${escapeHtml(t.name)}</span><strong>${t.pts}</strong></div>`).join('');openInfo('CONSTRUCTORS CHAMPIONSHIP',`<div class="standings-list">${rows}</div>`);}
function openInfo(title,html){$('modalTitle').textContent=title;$('modalText').innerHTML=html;$('teamName').hidden=true;$('teamNameLabel').hidden=true;$('seasonSelect').hidden=true;$('teamSelect').hidden=true;$('teamSelectLabel').hidden=true;$('teamColor').hidden=true;$('engineSupplier').hidden=true;$('gearboxSupplier').hidden=true;$('engineSupplierLabel').hidden=true;$('gearboxSupplierLabel').hidden=true;$('driverOne').hidden=true;$('driverTwo').hidden=true;$('driverOneLabel').hidden=true;$('driverTwoLabel').hidden=true;$('createBtn').textContent='CLOSE';$('createBtn').onclick=()=>{$('modal').hidden=true;resetModal();};$('modal').hidden=false;}
function resetModal(){$('seasonSelect').hidden=false;$('teamColor').hidden=false;$('engineSupplier').hidden=false;$('gearboxSupplier').hidden=false;$('engineSupplierLabel').hidden=false;$('gearboxSupplierLabel').hidden=false;$('createBtn').textContent='CREATE CAREER ↗';$('createBtn').onclick=createCareer;}
/* BUILD 0.5 gameplay layer: race classification, championship tables, upgrades and season progression. */
const TEAM_POINTS=[25,18,15,12,10,8,6,4,2,1];
const DRIVER_NUMBERS={'Max Verstappen':1,'Lewis Hamilton':44,'Charles Leclerc':16,'Lando Norris':4,'Oscar Piastri':81,'George Russell':63,'Kimi Antonelli':12,'Carlos Sainz':55,'Fernando Alonso':14,'Lance Stroll':18,'Pierre Gasly':10,'Esteban Ocon':31,'Oliver Bearman':87,'Isack Hadjar':6,'Yuki Tsunoda':22,'Liam Lawson':30,'Alexander Albon':23,'Nico Hulkenberg':27,'Gabriel Bortoleto':5,'Sergio Perez':11,'Valtteri Bottas':77,'Daniel Ricciardo':3,'Kevin Magnussen':20,'Mick Schumacher':47,'Zhou Guanyu':24,'Sebastian Vettel':5,'Nicholas Latifi':6,'Nyck de Vries':21,'Logan Sargeant':2,'Jack Doohan':7,'Arvid Lindblad':41,'Theo Pourchaire':10,'Felipe Drugovich':11,'Ayumu Iwasa':17,'Frederik Vesti':7,'Victor Martins':6,'Zane Maloney':9,'Leonardo Fornaroli':4,'Gabriele Minì':8,'Jak Crawford':9,'Paul Aron':17,'Luke Browning':14,'Dino Beganovic':8,'Rafael Câmara':6,'Ugo Ugochukwu':3,'Nikola Tsolov':12};

/* Real F1 circuit layouts from the CC BY 4.0 f1-circuits-svg collection.
   Layout IDs are season-aware so historical versions are not replaced by today's geometry. */
const CIRCUIT_LAYOUTS={
  'Bahrain':'bahrain-1','Saudi Arabia':'jeddah-1','Australia':'melbourne-2','Japan':'suzuka-2','China':'shanghai-1',
  'Miami':'miami-1','Emilia-Romagna':'imola-3','Monaco':'monaco-6','Canada':'montreal-6','Spain':'catalunya-6',
  'Austria':'spielberg-3','Great Britain':'silverstone-8','Belgium':'spa-francorchamps-4','Hungary':'hungaroring-3',
  'Netherlands':'zandvoort-5','Italy':'monza-7','Azerbaijan':'baku-1','Singapore':'marina-bay-4',
  'United States':'austin-1','Mexico City':'mexico-city-3','São Paulo':'interlagos-2','Las Vegas':'las-vegas-1',
  'Qatar':'lusail-1','Abu Dhabi':'yas-marina-2','France':'paul-ricard-3','Madrid':'madring-1'
};
const CIRCUIT_NAMES={
  'Bahrain':'Bahrain International Circuit','Saudi Arabia':'Jeddah Corniche Circuit','Australia':'Albert Park Grand Prix Circuit',
  'Japan':'Suzuka International Racing Course','China':'Shanghai International Circuit','Miami':'Miami International Autodrome',
  'Emilia-Romagna':'Autodromo Enzo e Dino Ferrari','Monaco':'Circuit de Monaco','Canada':'Circuit Gilles-Villeneuve',
  'Spain':'Circuit de Barcelona-Catalunya','Austria':'Red Bull Ring','Great Britain':'Silverstone Circuit',
  'Belgium':'Circuit de Spa-Francorchamps','Hungary':'Hungaroring','Netherlands':'Circuit Zandvoort',
  'Italy':'Autodromo Nazionale Monza','Azerbaijan':'Baku City Circuit','Singapore':'Marina Bay Street Circuit',
  'United States':'Circuit of The Americas','Mexico City':'Autódromo Hermanos Rodríguez','São Paulo':'Autódromo José Carlos Pace',
  'Las Vegas':'Las Vegas Strip Circuit','Qatar':'Lusail International Circuit','Abu Dhabi':'Yas Marina Circuit',
  'France':'Circuit Paul Ricard','Madrid':'Madring'
};
function circuitLayoutForSeason(event,year){
  let id=CIRCUIT_LAYOUTS[event]||null;
  if(event==='Spain'&&Number(year)===2022)id='catalunya-5';
  if(event==='Singapore'&&Number(year)===2022)id='marina-bay-3';
  return id;
}
function raceTrackFor(round,season){
  const year=Number(season||currentCareer?.season||2026);
  const event=window.getGpmEventName?window.getGpmEventName(year,round):null;
  const layoutId=circuitLayoutForSeason(event,year);
  const mapUrl=layoutId?`./circuits/maps/${layoutId}.svg`:null;
  return {name:CIRCUIT_NAMES[event]||`${event||'Grand Prix'} Circuit`,event,layoutId,mapUrl,mapSeason:year,mapSource:'julesr0y/f1-circuits-svg'};
}
const TEAM_BASE_RATINGS={
2022:{'Red Bull Racing':96,'Ferrari':94,'Mercedes':89,'Alpine':82,'McLaren':80,'Alfa Romeo':76,'Aston Martin':76,'Haas':75,'AlphaTauri':78,'Williams':71},
2023:{'Red Bull Racing':99,'Ferrari':89,'Mercedes':88,'Alpine':79,'McLaren':87,'Alfa Romeo':74,'Aston Martin':85,'Haas':73,'AlphaTauri':75,'Williams':74},
2024:{'Red Bull Racing':93,'Ferrari':92,'Mercedes':87,'Alpine':72,'McLaren':96,'Kick Sauber':71,'Aston Martin':79,'Haas':78,'RB':77,'Williams':73},
2025:{'McLaren':97,'Ferrari':92,'Red Bull Racing':90,'Mercedes':89,'Aston Martin':77,'Alpine':75,'Haas':78,'Racing Bulls':78,'Williams':80,'Kick Sauber':74},
2026:{'Mercedes':91,'Ferrari':90,'Red Bull Racing':89,'McLaren':90,'Racing Bulls':79,'Alpine':78,'Haas':80,'Audi':79,'Williams':82,'Aston Martin':78,'Cadillac':75}
};
function teamBaseRating(year,team){return (TEAM_BASE_RATINGS[year]&&TEAM_BASE_RATINGS[year][team])||77;}
function ensureChampionshipData(c){
 c.driverChampPoints=c.driverChampPoints||{};c.constructorStandings=c.constructorStandings||{};c.aiCarRatings=c.aiCarRatings||{};c.feederStandings=c.feederStandings||{};c.parts=c.parts||{aero:c.car||70,chassis:c.car||70,power:c.car||70,suspension:c.car||70,reliability:c.car||70};
 if((c.balanceVersion||0)<2){Object.keys(c.roster||{}).forEach(team=>{if(team!==c.name)c.aiCarRatings[team]=teamBaseRating(c.season,team);});c.balanceVersion=2;}
 Object.keys(c.roster||{}).forEach(team=>{if(c.constructorStandings[team]==null)c.constructorStandings[team]=0;if(c.aiCarRatings[team]==null)c.aiCarRatings[team]=teamBaseRating(c.season,team);(c.roster[team]||[]).forEach(d=>{if(c.driverChampPoints[d]==null)c.driverChampPoints[d]=0;});});
 ['F2','F3','F4'].forEach(series=>{if(!c.feederStandings[series])c.feederStandings[series]={};juniorDrivers(c.season).filter(d=>d.series===series).forEach(d=>{if(c.feederStandings[series][d.name]==null)c.feederStandings[series][d.name]=0;});});
}
function getTeamColour(c,team){if(team===c.name)return c.colour||'#e52b3d';const t=(SEASONS[c.season]?.teams||[]).find(x=>x[0]===team);return t?t[1]:'#8994a5';}
function teamForDriver(c,name){return Object.entries(c.roster||{}).find(([,list])=>(list||[]).includes(name))?.[0]||c.name;}
function getPartOverall(c){const p=c.parts||{};const vals=['aero','chassis','power','suspension','reliability'].map(k=>Number.isFinite(Number(p[k]))?Number(p[k]):(Number(c.car)||70));return Math.max(1,Math.min(100,Math.round(vals.reduce((a,b)=>a+b,0)/vals.length)));}
function showCareerModal(title,body,buttons){
 let root=document.getElementById('gpmActionModal');if(!root){root=document.createElement('div');root.id='gpmActionModal';root.className='modal-backdrop';root.innerHTML='<div class="modal panel gpm-wide"><button class="close-btn" id="gpmActionClose">×</button><div class="eyebrow">GRAND PRIX MANAGER</div><h2 id="gpmActionTitle"></h2><div id="gpmActionBody"></div><div id="gpmActionButtons" class="gpm-action-buttons"></div></div>';document.body.appendChild(root);root.addEventListener('click',e=>{if(e.target===root)root.hidden=true;});root.querySelector('#gpmActionClose').addEventListener('click',()=>root.hidden=true);}
 root.querySelector('#gpmActionTitle').textContent=title;root.querySelector('#gpmActionBody').innerHTML=body;root.querySelector('#gpmActionButtons').innerHTML=buttons.map((b,i)=>`<button class="${b.kind||'secondary-btn'}" data-action-index="${i}">${b.label}</button>`).join('');root.hidden=false;root.querySelectorAll('[data-action-index]').forEach(el=>el.addEventListener('click',()=>{const b=buttons[+el.dataset.actionIndex];if(b.action)b.action();}));return root;
}
function openCareerPathChooser(){
 const modal=$('modal');$('modalTitle').textContent='CHOOSE YOUR PATH';$('modalText').innerHTML='<p>Choose how you want to enter the championship. Both modes use the selected season\'s grid.</p><div class="path-choice-grid"><button class="path-choice" id="chooseMyTeam"><b>01 · MY TEAM</b><span>Create a new constructor, choose two different drivers and build from the back.</span></button><button class="path-choice" id="chooseExisting"><b>02 · F1 MANAGER</b><span>Take control of an existing constructor and inherit its lineup.</span></button></div>';
 ['seasonSelect','teamName','teamNameLabel','teamSelect','teamSelectLabel','teamColor','driverOne','driverTwo','driverOneLabel','driverTwoLabel'].forEach(id=>$(id).hidden=true);$('createBtn').hidden=true;modal.hidden=false;$('chooseMyTeam').onclick=()=>{modal.hidden=true;openCareer('team');};$('chooseExisting').onclick=()=>{modal.hidden=true;openCareer('existing');};
}
const ENGINEER_MARKET=[{name:'Mikael Sørensen',specialty:'Race strategy',rating:92,cost:12},{name:'Elena Rossi',specialty:'Tyre management',rating:89,cost:10},{name:'James Whitaker',specialty:'Vehicle dynamics',rating:86,cost:8},{name:'Luca Moretti',specialty:'Power-unit systems',rating:84,cost:7},{name:'Aisha Khan',specialty:'Reliability engineering',rating:90,cost:11},{name:'Daniel Reed',specialty:'Race operations',rating:81,cost:5}];
function openEngineerMarket(){if(!currentCareer)return;const c=currentCareer;c.engineersOwned=c.engineersOwned||[];const available=ENGINEER_MARKET.filter(e=>!c.engineersOwned.includes(e.name));const current=c.raceEngineer;const body=`<p>Hire one race engineer to lead your race team. Each engineer has a speciality, overall rating and one-time signing fee. Hiring a new engineer replaces your current lead.</p>${current?`<div class="engineer-current"><b>CURRENT RACE ENGINEER</b><strong>${escapeHtml(current.name)} · ${current.rating} OVR</strong><small>${escapeHtml(current.specialty)}</small></div>`:''}<div class="gpm-upgrade-grid">${available.map(e=>`<article class="gpm-upgrade-card engineer-card"><div><b>${escapeHtml(e.name)}</b><small>${escapeHtml(e.specialty)}</small><strong>${e.rating} OVR · €${e.cost}M</strong></div><button class="large-action" data-engineer="${escapeHtml(e.name)}">HIRE ENGINEER</button></article>`).join('')||'<p>All available engineers have already been signed.</p>'}</div>`;const root=showCareerModal('RACE ENGINEER MARKET',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);root.querySelectorAll('[data-engineer]').forEach(btn=>btn.addEventListener('click',()=>{const e=ENGINEER_MARKET.find(x=>x.name===btn.dataset.engineer);if(!e||c.engineersOwned.includes(e.name))return;if(c.budget<e.cost){showToast(`Not enough funds. Signing fee: €${e.cost}M.`);return;}c.budget-=e.cost;c.engineersOwned.push(e.name);c.raceEngineer={...e};c.staff=Math.max(c.staff,Math.min(99,e.rating));c.history.push({title:'Race engineer hired',text:`${e.name} joined as race engineer. Speciality: ${e.specialty}. Rating: ${e.rating} OVR. Signing fee: €${e.cost}M.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();showToast(`${e.name} hired as race engineer.`);root.hidden=true;}));}
function openUpgradeChooser(initialTab='aero'){
 if(!currentCareer)return;const c=currentCareer;ensureChampionshipData(c);ensureTechnicalState(c);
 const groups={
  aero:{label:'AERO',parts:[['frontWing','Front wing','Flap geometry, front load and balance',5],['rearWing','Rear wing','Rear downforce and drag efficiency',5],['floor','Floor & underfloor','Ground-effect load and sealing',7],['diffuser','Diffuser','Rear expansion and airflow extraction',5],['beamWing','Beam wing','Rear aerodynamic stability',4],['bargeboards','Bodywork airflow','Sidepod and cooling airflow',4]]},
  chassis:{label:'CHASSIS',parts:[['monocoque','Monocoque','Structural stiffness and weight',6],['weight','Weight reduction','Mass and weight distribution',7],['cooling','Cooling package','Thermal management and packaging',4],['brakeDucts','Brake ducts','Brake temperature control',4]]},
  suspension:{label:'SUSPENSION',parts:[['frontSuspension','Front suspension','Front-end response and tyre control',5],['rearSuspension','Rear suspension','Traction and rear stability',5],['dampers','Dampers','Kerb compliance and ride control',4],['steering','Steering system','Driver response and precision',3]]},
  brakes:{label:'BRAKES',parts:[['brakeMaterial','Brake materials','Peak braking performance',4],['brakeCooling','Brake cooling','Consistent braking temperatures',4],['brakeByWire','Brake-by-wire','Rear braking stability',5]]},
  reliability:{label:'RELIABILITY',parts:[['engineDurability','Engine durability','Reduce mechanical failure risk',6],['gearboxDurability','Gearbox durability','Improve transmission life',5],['hydraulics','Hydraulic systems','Improve hydraulic reliability',4],['coolingReliability','Cooling reliability','Reduce thermal failures',4]]}
 };
 c.partDetails=c.partDetails||{};Object.values(groups).forEach(g=>g.parts.forEach(([k])=>{if(!Number.isFinite(c.partDetails[k]))c.partDetails[k]=Number(c.parts?.[k])||Number(c.car)||70;}));
 const tabs=[...Object.entries(groups).map(([k,g])=>[k,g.label]),['engine','POWER UNIT'],['gearbox','GEARBOX']];let active=groups[initialTab]?initialTab:'aero';
 const root=showCareerModal('CAR DEVELOPMENT CENTRE',`<div id="gpmDevelopmentStatus" class="gpm-development-status">${escapeHtml(c.latestDevelopmentMessage||'No new development actions yet.')}</div><div id="gpmDevelopmentTabs"></div><div id="gpmDevelopmentContent"></div>`,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 function draw(){
  const nav=root.querySelector('#gpmDevelopmentTabs');nav.innerHTML=`<div class="gpm-tabs gpm-dev-tabs">${tabs.map(([k,l])=>`<button class="gpm-tab ${active===k?'active':''}" data-dev-tab="${k}">${l}</button>`).join('')}</div>`;
  nav.querySelectorAll('[data-dev-tab]').forEach(b=>b.onclick=()=>{active=b.dataset.devTab;draw();});
  const content=root.querySelector('#gpmDevelopmentContent');
  if(active==='engine'||active==='gearbox'){
   const works=active==='engine'&&teamWorksEngine(c);const title=active==='engine'?'POWER UNIT DEVELOPMENT':'GEARBOX DEVELOPMENT';
   content.innerHTML=`<p>${active==='engine'?'Engine development is available only when your constructor operates its own works power unit. Customer teams must negotiate a supplier change instead.':'Gearbox performance and reliability are managed through the gearbox supplier contract.'}</p><div class="gpm-dev-feature"><div><small>CURRENT ${active==='engine'?'POWER UNIT':'GEARBOX'}</small><h3>${escapeHtml(active==='engine'?c.engineSupplier:c.gearboxSupplier)}</h3><b>${active==='engine'?`POWER ${c.enginePower}/100 · RELIABILITY ${c.engineReliability}/100`:`PERFORMANCE ${c.gearboxPerformance}/100 · RELIABILITY ${c.gearboxReliability}/100`}</b></div><span class="${works?'gpm-dev-eligible':'gpm-dev-locked'}">${active==='engine'?(works?'WORKS ENGINE · ELIGIBLE':'CUSTOMER ENGINE · LOCKED'):'SUPPLIER MANAGED'}</span></div>${active==='engine'&&works?`<button class="primary-btn" id="gpmDevelopEngineTab">DEVELOP ENGINE · €12M · +2 POWER</button><p class="save-note">Each development step adds 2 power and trades 1 reliability point. Reliability can be restored through the supplier reliability programme in a future technical update.</p>`:`<button class="primary-btn" id="gpmOpenTechTab">OPEN ${active==='engine'?'POWER UNIT':'GEARBOX'} SUPPLIER CONTRACTS ↗</button>`}`;
   content.querySelector('#gpmDevelopEngineTab')?.addEventListener('click',()=>{if(c.budget<12){showToast('Not enough budget. Engine development costs €12M.');return;}if(c.enginePower>=100){showToast('Engine has reached its development ceiling.');return;}c.budget-=12;c.enginePower=Math.min(100,c.enginePower+2);c.engineReliability=Math.max(60,c.engineReliability-1);c.parts.power=c.enginePower;c.latestDevelopmentMessage=`Power unit upgraded by 2 points · ${c.enginePower}/100 power · ${c.engineReliability}/100 reliability.`;c.history.push({title:'Works engine upgrade',text:`${c.engineSupplier} power increased to ${c.enginePower}/100. Reliability is ${c.engineReliability}/100.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();showToast('Works engine upgraded: +2 power.');root.hidden=true;openUpgradeChooser('engine');});
   content.querySelector('#gpmOpenTechTab')?.addEventListener('click',()=>{root.hidden=true;openTechnicalSuppliers();});return;
  }
  const group=groups[active];content.innerHTML=`<p>Select an individual component to develop. Each upgrade changes that component's rating and contributes to overall chassis performance.</p><div class="gpm-upgrade-grid gpm-component-grid">${group.parts.map(([key,name,desc,cost])=>`<article class="gpm-upgrade-card"><div><b>${name}</b><small>${desc}</small><strong>${c.partDetails[key]}/100</strong><i class="gpm-part-meter"><em style="width:${c.partDetails[key]}%"></em></i></div><button class="small-action" data-part="${key}" data-cost="${cost}" ${c.partDetails[key]>=100?'disabled':''}>${c.partDetails[key]>=100?'MAXED':`UPGRADE · €${cost}M`}</button></article>`).join('')}</div>`;
  content.querySelectorAll('[data-part]').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.part,cost=Number(btn.dataset.cost);if(c.budget<cost){showToast('Not enough budget for this development package.');return;}if(c.partDetails[key]>=100)return;c.budget-=cost;c.partDetails[key]=Math.min(100,c.partDetails[key]+4);const vals=Object.values(c.partDetails);c.parts.aero=Math.round(['frontWing','rearWing','floor','diffuser','beamWing','bargeboards'].reduce((a,k)=>a+c.partDetails[k],0)/6);c.parts.chassis=Math.round(['monocoque','weight','cooling','brakeDucts'].reduce((a,k)=>a+c.partDetails[k],0)/4);c.parts.suspension=Math.round(['frontSuspension','rearSuspension','dampers','steering'].reduce((a,k)=>a+c.partDetails[k],0)/4);if(active==='reliability'){const reliabilityMean=Math.round(group.parts.reduce((sum,item)=>sum+c.partDetails[item[0]],0)/group.parts.length);c.parts.reliability=reliabilityMean;c.engineReliability=Math.min(100,Math.max(c.engineReliability||70,reliabilityMean));c.gearboxReliability=Math.min(100,Math.max(c.gearboxReliability||70,reliabilityMean));}c.parts.brakes=Math.round(['brakeMaterial','brakeCooling','brakeByWire'].reduce((a,k)=>a+c.partDetails[k],0)/3);c.car=getPartOverall(c);c.upgrades=(c.upgrades||0)+1;c.latestDevelopmentMessage=`${key} upgraded by 4 points · ${c.partDetails[key]}/100 · €${cost}M spent.`;c.history.push({title:`${key} upgrade installed`,text:`${key} improved to ${c.partDetails[key]}/100. Development cost: €${cost}M.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();const status=root.querySelector('#gpmDevelopmentStatus');if(status)status.textContent=c.latestDevelopmentMessage;showToast(`${key} upgraded by 4 points.`);draw();});
 }
 draw();
}
function openSponsorDeals(){if(!currentCareer)return;const c=currentCareer;c.sponsors=c.sponsors||[];const offers=[['Vertex Technology','€2.5M signing bonus',2.5],['Apex Global','€4M signing bonus',4],['Titan Energy','€6M signing bonus',6],['Northstar Logistics','€3.5M signing bonus',3.5]];const available=offers.filter(o=>!c.sponsors.includes(o[0]));const body=`<p>Choose a sponsor once. Each partner pays a one-time signing bonus and occupies a limited partnership slot. No repeated button-spamming.</p><div class="gpm-upgrade-grid">${available.map(o=>`<div class="gpm-upgrade-card"><div><b>${o[0]}</b><small>Commercial partner · 2-season agreement</small><strong>€${o[2]}M</strong></div><button class="small-action" data-sponsor="${o[0]}">SIGN DEAL</button></div>`).join('')||'<p>No new sponsor offers available. You have signed every available partner.</p>'}</div>`;const root=showCareerModal('SPONSOR NEGOTIATIONS',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);root.querySelectorAll('[data-sponsor]').forEach(btn=>btn.addEventListener('click',()=>{if(c.sponsors.length>=5){showToast('Your commercial department has reached its sponsor limit.');return;}const offer=offers.find(o=>o[0]===btn.dataset.sponsor);if(!offer||c.sponsors.includes(offer[0]))return;c.sponsors.push(offer[0]);c.budget+=offer[2];c.history.push({title:'Sponsor agreement signed',text:`${offer[0]} signed a two-season partnership, paying a €${offer[2]}M signing bonus.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();showToast(`${offer[0]} signed · +€${offer[2]}M`);root.hidden=true;}));}
function interpolateTrack(points,t){const segs=[];let total=0;for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]);segs.push({a,b,len,start:total});total+=len;}let dist=((t%1)+1)%1*total;for(const s of segs){if(dist<=s.start+s.len){const q=(dist-s.start)/s.len;return [s.a[0]+(s.b[0]-s.a[0])*q,s.a[1]+(s.b[1]-s.a[1])*q];}}return points[0];}
function buildTrackSvg(track,rows){
 if(!track?.mapUrl)return `<div class="gpm-track-map-missing">No verified circuit-layout file is mapped for this event yet.</div>`;
 const layoutLabel=track.layoutId?track.layoutId.toUpperCase().replace(/-/g,' · '):'OFFICIAL CIRCUIT LAYOUT';
 return `<div class="gpm-real-track-map"><img src="${escapeHtml(track.mapUrl)}" alt="${escapeHtml(track.name)} actual circuit layout" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="gpm-track-map-missing" hidden>Could not load the circuit SVG. Connect to the internet and reopen this race screen.</div><small>${escapeHtml(layoutLabel)} · ${track.mapSeason} SEASON LAYOUT</small></div>`;
}

function technicalPackageBonus(c){ensureTechnicalState(c);return ((c.enginePower-85)*.035)+((c.gearboxPerformance-85)*.025);}
function getRaceField(c,round){
 ensureRoster(c);ensureChampionshipData(c);
 const teams=Object.entries(c.roster).filter(([,ds])=>ds&&ds.length).flatMap(([team,ds])=>ds.map((driver,idx)=>({driver,driverIndex:idx,team,teamColour:getTeamColour(c,team),rating:DRIVER_RATING[driver]||juniorDrivers(c.season).find(d=>d.name===driver)?.rating||77,number:DRIVER_NUMBERS[driver]||idx+20})));
 const field=teams.map(r=>{const user=r.team===c.name;const car=user?c.car:(c.aiCarRatings[r.team]||teamBaseRating(c.season,r.team));const roster=user?(c.staffRoster||{}):{};const assigned=[...(roster.engineer||[]),...(roster.startEngineer||[]),roster.strategist,roster.pitcrew].filter(Boolean);const specialistAverage=assigned.length?assigned.reduce((sum,x)=>sum+(x.rating||70),0)/assigned.length:70;const staff=user?Math.min(99,Math.round(c.staff+Math.max(0,specialistAverage-70)*.12)):70;const engineer=user?roster.engineer?.[r.driverIndex]:null;const startEngineer=user?roster.startEngineer?.[r.driverIndex]:null;const strategist=user?roster.strategist:null;const reliability=user?(Math.min(c.engineReliability||85,c.gearboxReliability||85)*.55+(c.parts?.reliability||c.car||70)*.45):78;const supplierBonus=user?technicalPackageBonus(c):0;const competitiveSupport=user?Math.max(0,(92-car)*.68):0;const base=(car*.64)+(r.rating*.32)+(staff*.04)+supplierBonus+competitiveSupport;const quali=base+(Math.max(0,(engineer?.rating||70)-70)*.025)+(Math.random()*2.8-1.4);const compound=['SOFT','MEDIUM','HARD'][Math.floor(Math.random()*3)];const tyreEffect=compound==='SOFT'?.45:compound==='HARD'?-.15:.2;const racePace=base+tyreEffect+(Math.max(0,(startEngineer?.rating||70)-70)*.035)+(Math.max(0,(strategist?.rating||70)-70)*.02)+(Math.random()*3.2-1.6);const dnfChance=Math.max(.012,.075-(reliability-60)*.00125);const dnf=Math.random()<dnfChance;const reasons=['MECHANICAL','POWER UNIT','HYDRAULICS','ACCIDENT'];const dnfReason=reasons[Math.floor(Math.random()*reasons.length)];return {...r,quali,racePace,compound,pitStops:Math.random()>.72?2:1,dnf,dnfReason};});
 const grid=[...field].sort((a,b)=>b.quali-a.quali);grid.forEach((r,i)=>r.grid=i+1);
 const results=[...field].sort((a,b)=>(a.dnf===b.dnf?b.racePace-a.racePace:a.dnf?1:-1));
 results.forEach((r,i)=>{r.position=i+1;r.change=r.grid-r.position;r.initials=r.driver.split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase();r.gap=r.dnf?r.dnfReason:i===0?'LEADER':`+${(i*.72+Math.random()*.16).toFixed(3)}s`;r.interval=r.dnf?'DNF':i===0?'—':`+${(.16+Math.random()*.28).toFixed(3)}s`;r.points=r.dnf?0:(TEAM_POINTS[i]||0);r.tyreAge=Math.floor(12+Math.random()*20);r.status=r.dnf?'DNF':'FINISHED';});
 return {grid,results};
}
function raceLeaderboardHtml(results){return `<div class="gpm-table-wrap"><table class="gpm-race-table"><thead><tr><th>POS</th><th>DRIVER</th><th>TEAM</th><th>TYRE</th><th>GAP</th><th>INTERVAL</th><th>GAIN / LOSS</th><th>STATUS</th><th>PTS</th></tr></thead><tbody>${results.map(r=>`<tr class="${r.team===currentCareer.name?'gpm-user-row':''}"><td><b>${r.position}</b></td><td><strong>${r.initials}</strong><small>#${r.number} ${escapeHtml(r.driver)}</small></td><td><i class="team-dot" style="background:${r.teamColour}"></i>${escapeHtml(r.team)}</td><td><span class="tyre tyre-${r.compound.toLowerCase()}">${r.compound[0]}</span><small>${r.tyreAge} LAPS</small></td><td>${r.gap}</td><td>${r.interval}</td><td class="${r.change>0?'gain':r.change<0?'loss':'neutral'}">${r.change>0?'▲ +'+r.change:r.change<0?'▼ '+r.change:'— 0'}</td><td class="${r.dnf?'loss':'gain'}">${r.status||'FINISHED'}</td><td><b>${r.points}</b></td></tr>`).join('')}</tbody></table></div>`;}
function updateFeederChampionships(c){const pool=juniorDrivers(c.season);['F2','F3','F4'].forEach(series=>{const drivers=pool.filter(d=>d.series===series);if(!drivers.length)return;const order=[...drivers].sort((a,b)=>(b.rating+Math.random()*15)-(a.rating+Math.random()*15));order.forEach((d,i)=>{c.feederStandings[series][d.name]=(c.feederStandings[series][d.name]||0)+(TEAM_POINTS[i]||0);});});}
function applyRegulationChange(c){c.regulationHistory=c.regulationHistory||[];if(!c.regulationSchedule)c.regulationSchedule=c.round+4+Math.floor(Math.random()*4);if(c.round<c.regulationSchedule)return null;const choices=[['aero','Aerodynamics'],['chassis','Chassis'],['power','Power Unit'],['suspension','Suspension'],['reliability','Reliability']];const [key,label]=choices[Math.floor(Math.random()*choices.length)];const loss=2+Math.floor(Math.random()*4);const before=c.parts[key];c.parts[key]=Math.max(45,before-loss);c.car=getPartOverall(c);const record={season:c.season,round:c.round,department:key,label,loss,before,after:c.parts[key]};c.regulationHistory.push(record);c.regulationSchedule=c.round+4+Math.floor(Math.random()*4);c.history.push({title:`FIA regulation change · ${label}`,text:`A technical regulation change reduced your ${label.toLowerCase()} rating by ${loss} points (${before} → ${c.parts[key]}). Other car departments were unaffected.`,date:`Season ${c.season} · Round ${c.round}`});return record;}
function advanceAiTeamDevelopment(c,round){
 ensureChampionshipData(c);
 c.aiCarRatingHistory=c.aiCarRatingHistory||{};
 const teams=Object.keys(c.roster||{}).filter(team=>team!==c.name);
 const standings=teams.map(team=>({team,points:Number(c.constructorStandings?.[team]||0)})).sort((a,b)=>b.points-a.points);
 const rank=new Map(standings.map((x,i)=>[x.team,i]));
 const count=Math.max(1,teams.length);
 teams.forEach(team=>{
  const current=Number(c.aiCarRatings[team]??teamBaseRating(c.season,team));
  const position=rank.get(team)??Math.floor(count/2);
  // The pack converges gradually: front-runners have less development headroom,
  // while weaker teams receive a modest catch-up boost without sudden jumps.
  const catchUp=((position/(count-1||1))-.5)*.34;
  const investment=.10+catchUp+(Math.random()*.24-.12);
  let next=Math.max(62,Math.min(97,current+investment));
  if(Math.abs(next-current)<.08)next=Math.max(62,Math.min(97,current+(current>=97?-.08:.08)));
  c.aiCarRatings[team]=Number(next.toFixed(2));
  const history=c.aiCarRatingHistory[team]||(c.aiCarRatingHistory[team]=[]);
  history.push({season:c.season,round,rating:c.aiCarRatings[team]});
  if(history.length>240)history.splice(0,history.length-240);
 });
}
function simulateOffseasonTransfers(c,next,newGrid){
 const aiTeams=Object.keys(newGrid).filter(team=>team!==c.name);
 const used=new Set((c.drivers||[]));
 aiTeams.forEach(team=>(newGrid[team]||[]).forEach(name=>used.add(name)));
 const pool=[...new Set([
  ...Object.values(newGrid).flat(),
  ...allDrivers(next),
  ...juniorDrivers(next).map(d=>d.name)
 ])];
 const years=c.driverSeasonsInF1||(c.driverSeasonsInF1={});
 Object.values(newGrid).flat().forEach(name=>{years[name]=(Number(years[name])||0)+1;});
 // Retire a small number of long-serving drivers, then promote an unused prospect.
 const retired=[];
 aiTeams.forEach(team=>{
  const lineup=newGrid[team]||[];
  for(let i=0;i<lineup.length;i++){
   const name=lineup[i], service=Number(years[name]||0);
   const retirementChance=service>=9?.055:service>=6?.025:0;
   if(Math.random()<retirementChance){
    retired.push({name,team});
    used.delete(name);
    const replacement=juniorDrivers(next).filter(d=>!used.has(d.name)).sort((a,b)=>b.rating-a.rating)[0]?.name
      ||pool.find(n=>!used.has(n)&&n!==name);
    if(replacement){lineup[i]=replacement;used.add(replacement);years[replacement]=0;}
   }
  }
 });
 // At least two AI seats change hands per season where the grid permits it.
 const moveCount=Math.min(Math.max(2,Math.round(aiTeams.length*.22)),aiTeams.length);
 const shuffled=[...aiTeams].sort(()=>Math.random()-.5);
 for(let i=0;i+1<moveCount;i+=2){
  const a=shuffled[i],b=shuffled[i+1],la=newGrid[a]||[],lb=newGrid[b]||[];
  if(!la.length||!lb.length)continue;
  const ia=Math.floor(Math.random()*la.length),ib=Math.floor(Math.random()*lb.length);
  const driverA=la[ia],driverB=lb[ib];
  la[ia]=driverB;lb[ib]=driverA;
 }
 // Ensure each AI team has exactly two unique drivers, drawing from unused juniors if needed.
 const assigned=new Set(c.drivers||[]);
 aiTeams.forEach(team=>{
  const lineup=newGrid[team]||[];
  newGrid[team]=lineup.filter((name,i)=>name&&!assigned.has(name)&&lineup.indexOf(name)===i).slice(0,2);
  while(newGrid[team].length<2){
   const replacement=juniorDrivers(next).find(d=>!assigned.has(d.name))?.name
    ||pool.find(name=>!assigned.has(name));
   if(!replacement)break;
   newGrid[team].push(replacement);
  }
  newGrid[team].forEach(name=>assigned.add(name));
 });
 c.history=c.history||[];
 retired.forEach(x=>c.history.push({title:'Driver retirement',text:`${x.name} retired from Formula One after ${years[x.name]||'a long'} seasons. ${x.team} will begin the new season with a replacement driver.`,date:`Season ${next} · Pre-season`}));
 const transfers=[];
 aiTeams.forEach(team=>(newGrid[team]||[]).forEach(name=>{
  const previousTeam=Object.entries(c.roster||{}).find(([oldTeam,drivers])=>oldTeam!==c.name&&(drivers||[]).includes(name))?.[0];
  if(previousTeam&&previousTeam!==team)transfers.push({name,from:previousTeam,to:team});
 }));
 transfers.forEach(x=>c.history.push({title:'Driver transfer',text:`${x.name} moved from ${x.from} to ${x.to} for the ${next} season.`,date:`Season ${next} · Pre-season`}));
 c.preSeasonReport={season:next,transfers,retirements:retired.map(x=>x.name),lineups:Object.fromEntries(Object.entries(newGrid).map(([team,drivers])=>[team,[...drivers]]))};
 c.history.push({title:`${next} pre-season grid changes`,text:`${transfers.length} driver transfers and ${retired.length} retirements recorded. The complete team line-ups are available in the pre-season report.`,date:`Season ${next} · Pre-season`});
}
function openPartsRepair(){if(!currentCareer)return;const c=currentCareer;ensureTechnicalState(c);const costs={aero:1.8,chassis:2.6,power:4.5,suspension:2.1,reliability:2.8};const labels={aero:'Aerodynamics package',chassis:'Chassis',power:'Power unit',suspension:'Suspension',reliability:'Reliability systems'};const body=`<p>Worn components reduce pace and increase retirement risk. Replacement restores the component to its supplier or department baseline. Costs are charged to the team budget.</p><div class="gpm-upgrade-grid">${Object.keys(costs).map(k=>{const baseline=k==='power'?(PU_SUPPLIERS[c.engineSupplier]?.power||c.enginePower):k==='reliability'?Math.max(PU_SUPPLIERS[c.engineSupplier]?.reliability||80,GB_SUPPLIERS[c.gearboxSupplier]?.reliability||80):Math.max(80,Number(c.car)||80);const value=Number(c.parts[k]||70),fee=costs[k];return `<article class="gpm-upgrade-card"><div><b>${labels[k]}</b><small>Condition: ${Math.round(value)}/100 · Replacement target: ${Math.round(baseline)}</small><strong>€${fee.toFixed(1)}M</strong></div><button class="small-action" data-repair-part="${k}" ${value>=baseline-1?'disabled':''}>REPLACE PART</button></article>`}).join('')}</div><p id="repairMessage" role="status"></p>`;const root=showCareerModal('PARTS & RELIABILITY WORKSHOP',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);root.querySelectorAll('[data-repair-part]').forEach(btn=>btn.addEventListener('click',()=>{const k=btn.dataset.repairPart,fee=costs[k];if(c.budget<fee){root.querySelector('#repairMessage').textContent=`Insufficient budget. You need €${fee.toFixed(1)}M.`;return;}const target=k==='power'?(PU_SUPPLIERS[c.engineSupplier]?.power||c.enginePower):k==='reliability'?Math.max(PU_SUPPLIERS[c.engineSupplier]?.reliability||80,GB_SUPPLIERS[c.gearboxSupplier]?.reliability||80):Math.max(80,Number(c.car)||80);c.budget-=fee;c.parts[k]=target;if(k==='power')c.enginePower=target;if(k==='reliability'){c.engineReliability=PU_SUPPLIERS[c.engineSupplier]?.reliability||target;c.gearboxReliability=GB_SUPPLIERS[c.gearboxSupplier]?.reliability||target;}if(window.syncGpmDepartmentNodes0110)window.syncGpmDepartmentNodes0110(c,k);c.car=getPartOverall(c);c.history.push({title:`${labels[k]} replaced`,text:`The team replaced its ${labels[k].toLowerCase()} and restored condition to ${Math.round(target)}/100. Cost: €${fee.toFixed(1)}M.`,date:`Season ${c.season} · Round ${c.round}`});saveCareer();renderCareer();root.hidden=true;showToast(`${labels[k]} replaced.`);}));}
function simulateRace(){if(!currentCareer)return;const c=currentCareer;ensureRoster(c);ensureChampionshipData(c);ensureStaff(c);const staff=c.staffRoster,missing=[...(staff.engineer||[]).map((x,i)=>!x?`Driver ${i+1} race engineer`:null),...(staff.startEngineer||[]).map((x,i)=>!x?`Driver ${i+1} starting engineer`:null),!staff.strategist?'Race strategist':null,!staff.pitcrew?'Pit crew':null].filter(Boolean);if(missing.length){showCareerModal('TEAM STAFF INCOMPLETE',`<p>You cannot start the Grand Prix until every required staff position is filled.</p><ul>${missing.map(x=>`<li>${x}</li>`).join('')}</ul><p>Open Staff & Performance Department and fill the vacant roles.</p>`,[{label:'OPEN STAFF DEPARTMENT',kind:'primary-btn',action:()=>openStaffDepartment('engineer1')},{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);return;}const rounds=SEASONS[c.season]?.rounds||24;if(c.round>=rounds){showSeasonEndSummary(c);return;}const round=c.round+1,track=raceTrackFor(round),field=getRaceField(c,round),results=field.results;let teamScore=0;results.forEach(r=>{if(r.points){c.driverChampPoints[r.driver]=(c.driverChampPoints[r.driver]||0)+r.points;c.constructorStandings[r.team]=(c.constructorStandings[r.team]||0)+r.points;if(r.team===c.name)teamScore+=r.points;}});c.points=(c.constructorStandings[c.name]||0);c.driverPoints=c.drivers.map(d=>c.driverChampPoints[d]||0);ensureTechnicalState(c);const myRetirements=results.filter(r=>r.team===c.name&&r.dnf);const mechanical=myRetirements.some(r=>['MECHANICAL','POWER UNIT','HYDRAULICS'].includes(r.dnfReason));if(mechanical){const damage=3+Math.floor(Math.random()*5),part=['power','reliability','suspension'][Math.floor(Math.random()*3)];c.parts[part]=Math.max(45,(Number(c.parts[part])||75)-damage);if(part==='power')c.enginePower=Math.max(60,c.enginePower-damage);if(part==='reliability'){c.engineReliability=Math.max(55,c.engineReliability-damage);c.gearboxReliability=Math.max(55,c.gearboxReliability-damage);}if(window.syncGpmDepartmentNodes0110)window.syncGpmDepartmentNodes0110(c,part);c.car=getPartOverall(c);c.history.push({title:'Mechanical failure · component damage',text:`A mechanical retirement damaged the ${part} system by ${damage} points. Replace the component in the Parts & Reliability Workshop before the next race.`,date:`Season ${c.season} · Round ${round}`});}else{c.car=getPartOverall(c);}c.round=round;if(window.applyHistoricalTransferEvents01095)window.applyHistoricalTransferEvents01095(c,round);advanceAiTeamDevelopment(c,round);const regulationEvent=applyRegulationChange(c);c.budget+=2.2+teamScore*.085;c.reputation=Math.min(99,c.reputation+(teamScore>=20?2:teamScore>0?1:0));if(results[0].team===c.name)c.wins=(c.wins||0)+1;if(results.slice(0,3).some(r=>r.team===c.name))c.podiums=(c.podiums||0)+1;updateFeederChampionships(c);const userResults=results.filter(r=>r.team===c.name);const summary=userResults.length?userResults.map(r=>`${r.driver} P${r.position} (${r.points} pts)`).join(' · '):'No points scored by your team this weekend.';c.lastRace={round,track:track.name,results,grid:field.grid,teamScore};c.raceArchive=Array.isArray(c.raceArchive)?c.raceArchive:[];c.raceArchive.push({season:c.season,round,track:track.name,results:JSON.parse(JSON.stringify(results)),grid:JSON.parse(JSON.stringify(field.grid)),teamScore,recordedAt:new Date().toISOString()});c.history.push({title:`${track.name} · Race classification`,text:`${c.name}: ${summary} Team total: ${teamScore} points.`,date:`Season ${c.season} · Round ${round}`});saveCareer();renderCareer();renderSaves();showToast(`${track.name} complete · ${teamScore} team points.`);showRaceResult(track,results,field.grid,round,teamScore);}
function showRaceResult(track,results,grid,round,teamScore){const finalRound=round>=(SEASONS[currentCareer.season]?.rounds||24);const leader=results[0];const next=results[1];const body=`<div class="gpm-race-meta"><span>ROUND ${round} / ${SEASONS[currentCareer.season].rounds}</span><b>${escapeHtml(track.name)}</b><span>WINNER · ${escapeHtml(leader.driver)}</span></div><div class="gpm-race-layout"><div class="gpm-track-card"><div class="gpm-track-title"><b>ACTUAL CIRCUIT LAYOUT</b><small>SEASON-CORRECT SVG · DRIVER CLASSIFICATION AT RIGHT</small></div>${buildTrackSvg(track,results)}<div class="gpm-track-legend"><span><i style="background:${getTeamColour(currentCareer,leader.team)}"></i> P1 ${escapeHtml(leader.initials)} #${leader.number}</span><span><i style="background:${getTeamColour(currentCareer,next.team)}"></i> P2 ${escapeHtml(next.initials)} #${next.number}</span></div></div><div class="gpm-race-summary"><div><small>RACE WINNER</small><b>${escapeHtml(leader.driver)}</b><span>${escapeHtml(leader.team)}</span></div><div><small>GAP TO P2</small><b>${next.interval}</b><span>${escapeHtml(next.driver)}</span></div><div><small>YOUR TEAM POINTS</small><b>${teamScore}</b><span>${escapeHtml(currentCareer.name)}</span></div></div></div><div class="gpm-classification-heading"><b>OFFICIAL RACE CLASSIFICATION</b><small>FULL FIELD · ${results.length} DRIVERS</small></div>${raceLeaderboardHtml(results)}<p class="gpm-race-note">Position change is measured against the starting grid. DNF status is shown where a car retires; reliability affects mechanical DNF risk. Tyre letters: S = Soft, M = Medium, H = Hard. This classification follows the lap-by-lap race viewer; the map shows the real circuit layout for the selected season.</p>`;
 const buttons=[{label:'VIEW CHAMPIONSHIPS',kind:'secondary-btn',action:()=>{const root=document.getElementById('gpmActionModal');root.hidden=true;viewStandings();}},{label:finalRound?'VIEW SEASON FINALE →':'BACK TO TEAM HQ',kind:'primary-btn',action:()=>{const root=document.getElementById('gpmActionModal');root.hidden=true;if(finalRound)showSeasonEndSummary(currentCareer);}}];showCareerModal(`${track.name.toUpperCase()} · RACE RESULT`,body,buttons);
}
function viewRaceArchive(){
 if(!currentCareer)return;const c=currentCareer;c.raceArchive=Array.isArray(c.raceArchive)?c.raceArchive:[];
 if(!c.raceArchive.length&&c.lastRace&&Array.isArray(c.lastRace.results)){c.raceArchive.push({season:c.season,round:c.lastRace.round,track:c.lastRace.track,results:c.lastRace.results,grid:c.lastRace.grid||[],teamScore:c.lastRace.teamScore||0,recordedAt:new Date().toISOString()});saveCareer();}
 const races=[...c.raceArchive].sort((a,b)=>b.season-a.season||b.round-a.round);
 const groups=[...new Set(races.map(r=>Number(r.season)))];
 const body=races.length?`<p>Choose a season, then a Grand Prix. The first screen shows the archived podium; the complete classification is one click further.</p>${groups.map(year=>`<section class="gpm-archive-season"><h3>${year} SEASON <small>${races.filter(r=>Number(r.season)===year).length} RACES</small></h3><div class="gpm-archive-list">${races.map((r,i)=>({r,i})).filter(x=>Number(x.r.season)===year).map(({r,i})=>`<button class="gpm-archive-row" data-archive-index="${i}"><span class="gpm-archive-round">R${r.round}<small>${r.season}</small></span><span class="gpm-archive-name"><b>${escapeHtml(r.track)}</b><small>${r.results?.length||0} classified drivers</small></span><strong>VIEW PODIUM ↗</strong></button>`).join('')}</div></section>`).join('')}`:'<div class="empty-state panel">No completed races yet. Your season archive will appear after your first Grand Prix.</div>';
 const root=showCareerModal('SEASON & RACE ARCHIVE',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 root.querySelectorAll('[data-archive-index]').forEach(btn=>btn.addEventListener('click',()=>{
  const race=races[Number(btn.dataset.archiveIndex)];if(!race)return;const results=(race.results||[]).slice().sort((a,b)=>a.position-b.position);const top=results.slice(0,3);
  const podium=top.length>=3?`<div class="gpm-archive-podium">${[top[1],top[0],top[2]].map((r,i)=>`<article class="gpm-archive-podium-card place-${r.position}"><span>P${r.position}</span><b>${escapeHtml(r.driver)}</b><small>${escapeHtml(r.team)}</small></article>`).join('')}</div>`:`<p>Podium data is incomplete for this archived race.</p>`;
  const summary=`<div class="gpm-race-meta"><span>SEASON ${race.season} · ROUND ${race.round}</span><b>${escapeHtml(race.track)}</b><span>WINNER · ${escapeHtml(results[0]?.driver||'—')}</span></div>${podium}<p class="gpm-race-note">This is the saved result from your career. Open the complete classification to see every driver's finishing position.</p>`;
  showCareerModal(`${race.season} · ${String(race.track||'GRAND PRIX').toUpperCase()} · PODIUM`,summary,[{label:'FULL CLASSIFICATION →',kind:'primary-btn',action:()=>{const mapTrack=typeof raceTrackFor==='function'?raceTrackFor(race.round,race.season):null;const map=mapTrack&&typeof buildTrackSvg==='function'?`<div class="gpm-track-card">${buildTrackSvg(mapTrack,results)}</div>`:'';const full=`${summary}${map}<div class="gpm-classification-heading"><b>FULL RACE CLASSIFICATION</b><small>${results.length} DRIVERS</small></div>${raceLeaderboardHtml(results)}`;showCareerModal(`${race.track.toUpperCase()} · FULL CLASSIFICATION`,full,[{label:'← BACK TO SEASON ARCHIVE',kind:'secondary-btn',action:()=>viewRaceArchive()}]);}},{label:'← BACK TO SEASONS',kind:'secondary-btn',action:()=>viewRaceArchive()}]);
 }));
}
function sortedEntries(obj){return Object.entries(obj||{}).map(([name,points])=>({name,points})).sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name));}
function standingsTable(title,entries,highlight,teamMap=null){return `<section class="gpm-standing-section"><h3>${title}</h3><div class="gpm-table-wrap"><table class="gpm-standings-table"><thead><tr><th>POS</th><th>DRIVER</th><th>POINTS</th>${teamMap?'<th>TEAM</th>':''}</tr></thead><tbody>${entries.map((r,i)=>`<tr class="${r.name===highlight?'gpm-user-row':''}"><td>${i+1}</td><td><b>${escapeHtml(r.name)}</b></td><td>${r.points}</td>${teamMap?`<td>${escapeHtml(teamMap[r.name]||'—')}</td>`:''}</tr>`).join('')||`<tr><td colspan="${teamMap?4:3}">No points scored yet.</td></tr>`}</tbody></table></div></section>`;}
function teamPerformanceTable(c){
 const rows=Object.keys(c.roster||{}).map(team=>({team,rating:team===c.name?Number(c.car)||70:Number(c.aiCarRatings?.[team]??teamBaseRating(c.season,team))})).sort((a,b)=>b.rating-a.rating);
 return `<section class="standings-section"><h3>CONSTRUCTOR CAR PERFORMANCE · LIVE</h3><p>Ratings update after every completed Grand Prix. Lower-ranked teams receive a measured catch-up development boost.</p><div class="gpm-table-wrap"><table class="gpm-race-table"><thead><tr><th>RANK</th><th>TEAM</th><th>CAR RATING</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${r.team===c.name?'gpm-user-row':''}"><td>${i+1}</td><td>${escapeHtml(r.team)}</td><td><b>${r.rating.toFixed(1)}/100</b></td></tr>`).join('')}</tbody></table></div></section>`;
}
function viewStandings(){if(!currentCareer)return;const c=currentCareer;ensureChampionshipData(c);const body=teamPerformanceTable(c)+standingsTable('F1 DRIVERS’ WORLD CHAMPIONSHIP',sortedEntries(c.driverChampPoints),c.drivers[0],Object.fromEntries(Object.entries(c.roster||{}).flatMap(([team,ds])=>(ds||[]).map(d=>[d,team])))) + standingsTable('F1 CONSTRUCTORS’ WORLD CHAMPIONSHIP',sortedEntries(c.constructorStandings),c.name) + ['F2','F3','F4'].map(s=>standingsTable(`${s} CHAMPIONSHIP`,sortedEntries(c.feederStandings[s]),'')).join('');showCareerModal('CHAMPIONSHIP CENTRE',`<p>Updated after every Grand Prix. Junior-series tables use the season-specific talent pool included in this prototype.</p>${body}`,[{label:'CLOSE',kind:'secondary-btn',action:()=>{document.getElementById('gpmActionModal').hidden=true;}}]);}
function showPreSeasonReport(c){
 const report=c.preSeasonReport||{season:c.season,transfers:[],retirements:[],lineups:c.roster||{}};
 const transferRows=(report.transfers||[]).map(x=>`<div class="standing-row"><span>${escapeHtml(x.name)}</span><small>${escapeHtml(x.from)} → ${escapeHtml(x.to)}</small></div>`).join('');
 const retirementRows=(report.retirements||[]).map(name=>`<div class="standing-row"><span>${escapeHtml(name)}</span><small>RETIRED</small></div>`).join('');
 const lineupRows=Object.entries(report.lineups||c.roster||{}).map(([team,drivers],i)=>`<article class="gpm-preseason-team-card"><span class="gpm-preseason-team-number">${String(i+1).padStart(2,'0')}</span><div><b>${escapeHtml(team)}</b><strong>${(drivers||[]).map(escapeHtml).join('  ·  ')||'LINE-UP INCOMPLETE'}</strong></div><span class="gpm-preseason-seat-count">${(drivers||[]).length}/2 SEATS</span></article>`).join('');const reserveRows=(c.reserves||[]).length?`<section class="gpm-preseason-reserves"><h3>YOUR RESERVE & JUNIOR PROGRAMME</h3><p>${c.reserves.map(escapeHtml).join(' · ')}</p></section>`:'';
 const body=`<p>The ${report.season} grid is ready. Review the driver market changes and every team's line-up before the first race.</p><h3>DRIVER TRANSFERS (${(report.transfers||[]).length})</h3>${transferRows||'<p>No transfers this off-season.</p>'}<h3>RETIREMENTS (${(report.retirements||[]).length})</h3>${retirementRows||'<p>No retirements this off-season.</p>'}<h3>FULL TEAM LINE-UPS · ${Object.keys(report.lineups||c.roster||{}).length} CONSTRUCTORS</h3><div class="gpm-preseason-grid">${lineupRows}</div>${reserveRows}${window.GPMHistoricalCareer0110?.regulationHtml(c)||''}`;
 showCareerModal(`${report.season} · PRE-SEASON GRID`,body,[{label:'CONTINUE TO TEAM HQ →',kind:'primary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);
}
function showSeasonEndSummary(c){ensureChampionshipData(c);const body=`<p>The ${c.season} championship is complete after all ${SEASONS[c.season]?.rounds||24} rounds. Review the final tables before moving into the next season.</p>${standingsTable('FINAL F1 DRIVERS’ CHAMPIONSHIP',sortedEntries(c.driverChampPoints),c.drivers[0])}${standingsTable('FINAL F1 CONSTRUCTORS’ CHAMPIONSHIP',sortedEntries(c.constructorStandings),c.name)}${['F2','F3','F4'].map(s=>standingsTable(`FINAL ${s} CHAMPIONSHIP`,sortedEntries(c.feederStandings[s]),'')).join('')}`;showCareerModal(`${c.season} · SEASON FINALE`,body,[{label:'START NEXT SEASON →',kind:'primary-btn',action:()=>{advanceSeason();}},{label:'CLOSE',kind:'secondary-btn',action:()=>document.getElementById('gpmActionModal').hidden=true}]);}
function advanceSeason(){
 const c=currentCareer;
 if(!c){showToast('No active team career is loaded.');return false;}
 try{
  const previous=Number(c.season)||2026;
  const next=previous+1;
  const historicalLineage={
   'Force India':{2019:'Racing Point'},'Toro Rosso':{2020:'AlphaTauri'},
   'Renault':{2021:'Alpine'},'Racing Point':{2021:'Aston Martin'},
   'Sauber':{2018:'Sauber',2019:'Alfa Romeo'},'Alfa Romeo':{2024:'Kick Sauber'},
   'Kick Sauber':{2026:'Audi'}
  };
  const renamed=historicalLineage[c.name]?.[next];
  if(renamed){c.name=renamed;c.logo=renamed.split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase();c.engineSupplier=defaultEngineForTeam(renamed,next);}
  ensureRoster(c);
  ensureChampionshipData(c);
  c.seasonHistory=Array.isArray(c.seasonHistory)?c.seasonHistory:[];
  if(!c.seasonHistory.some(x=>Number(x.season)===previous)){
   const d=sortedEntries(c.driverChampPoints), k=sortedEntries(c.constructorStandings);
   c.seasonHistory.push({
    season:previous,
    driverChampion:d[0]?.name||'—',
    driverPoints:d[0]?.points||0,
    constructorChampion:k[0]?.name||'—',
    constructorPoints:k[0]?.points||0,
    completedAt:new Date().toISOString()
   });
  }
  if(!SEASONS[next]){
   const template=SEASONS[previous]||SEASONS[2026];
   if(!template||!Array.isArray(template.teams)||!template.teams.length)throw new Error('No constructor grid is available for the next season.');
   SEASONS[next]={rounds:24,teams:template.teams.map(t=>[t[0],t[1],[...(t[2]||[])]])};
  }
  const nextSeason=SEASONS[next];
  if(!Array.isArray(nextSeason.teams)||!nextSeason.teams.length)throw new Error('The next-season constructor grid is empty.');
  const newGrid={};
  nextSeason.teams.forEach(t=>{newGrid[t[0]]=[...(t[2]||[])];});
  // The player manages the same constructor across seasons. Preserve any
  // drivers they signed; never silently restore the original starting line-up.
  // Historical constructors start each new season with that year's real entry list.
  // Only explicitly player-negotiated contracts may override the official baseline.
  const historicalControlled=next<=2026&&nextSeason.teams.some(t=>t[0]===c.name);
  if(historicalControlled){
   const official=[...(nextSeason.teams.find(t=>t[0]===c.name)?.[2]||[])];
   const seasonNames=new Set(nextSeason.teams.flatMap(t=>t[2]||[]));
   const playerOverrides=(c.drivers||[]).filter(n=>c.contracts?.[n]?.playerManaged&&Number(c.contracts[n].expirySeason||0)>next&&!seasonNames.has(n));
   playerOverrides.slice(0,2).forEach((n,i)=>official[i]=n);
   newGrid[c.name]=official;
  }else newGrid[c.name]=[...(c.drivers||[])];
  const owned=new Set(newGrid[c.name]||[]);
  Object.keys(newGrid).forEach(team=>{if(team!==c.name)newGrid[team]=(newGrid[team]||[]).filter(n=>!owned.has(n));});
  if(next>2026)simulateOffseasonTransfers(c,next,newGrid);
  // Repair the controlled team's lineup before assigning the new grid.
  let repairedLineup=[...(Array.isArray(newGrid[c.name])?newGrid[c.name]:(Array.isArray(c.drivers)?c.drivers:[]))].filter(Boolean).filter((name,i,arr)=>arr.indexOf(name)===i).slice(0,2);
  const occupiedElsewhere=new Set(Object.entries(newGrid).filter(([team])=>team!==c.name).flatMap(([,names])=>names||[]));
  while(repairedLineup.length<2){
   const replacement=(typeof allDrivers==='function'?allDrivers(next):[]).find(name=>name&&!repairedLineup.includes(name)&&!occupiedElsewhere.has(name));
   const reserveReplacement=replacement||[...juniorDrivers(next).map(d=>d.name),...allDrivers(next)].find(name=>name&&!repairedLineup.includes(name)&&!occupiedElsewhere.has(name));
   if(!reserveReplacement){c.history=Array.isArray(c.history)?c.history:[];c.history.push({title:'Line-up recruitment required',text:`No unused F1, F2 or F3 database driver was available for ${next}. Recruit a driver before the next race.`,date:`Season ${next} · Pre-season`});break;}
   repairedLineup.push(reserveReplacement);
   c.history=Array.isArray(c.history)?c.history:[];
   c.history.push({title:'Automatic driver replacement',text:`${replacement} joined ${c.name} to restore the required two-driver lineup for ${next}.`,date:`Season ${next} · Pre-season`});
  }
  c.drivers=repairedLineup;
  const ownedDrivers=new Set(repairedLineup);
  Object.keys(newGrid).forEach(team=>{if(team!==c.name)newGrid[team]=(newGrid[team]||[]).filter(name=>!ownedDrivers.has(name));});
  // Repair any duplicated driver assignments before the new season begins.
  const seen=new Set();
  Object.keys(newGrid).forEach(team=>{
   newGrid[team]=(newGrid[team]||[]).filter(name=>{
    if(!name||seen.has(name))return false;
    seen.add(name);return true;
   });
  });
  newGrid[c.name]=[...repairedLineup];
  c.roster=newGrid;
  c.season=next;
  c.gridSeasonApplied=next;
  if(window.applyGpmHistoricalRegulations0110)window.applyGpmHistoricalRegulations0110(c,previous,next);
  if(window.GPMHistoricalCareer0110&&next<=2026)window.GPMHistoricalCareer0110.normalizeHistoricalGrid(c,next);
  if(window.GPMHistoricalCareer0110){window.GPMHistoricalCareer0110.ensureHistoricalContracts(c,next);window.GPMHistoricalCareer0110.expireHistoricalContracts(c,next);}
  c.round=0;
  c.points=0;
  c.driverPoints=[0,0];
  c.driverChampPoints={};
  c.constructorStandings={};
  const priorAiRatings={...(c.aiCarRatings||{})};
  c.aiCarRatings={...priorAiRatings};
  c.feederStandings={};
  c.lastRace=null;
  c.regulationSchedule=null;
  c.regulationHistory=[];
  c.car=getPartOverall(c);
  c.parts=c.parts||{aero:c.car,chassis:c.car,power:c.enginePower||c.car,suspension:c.car,reliability:c.car};
  c.parts.aero=Number(c.parts.aero??c.car);c.parts.chassis=Number(c.parts.chassis??c.car);c.parts.power=Number(c.enginePower??c.parts.power??c.car);c.parts.suspension=Number(c.parts.suspension??c.car);c.parts.reliability=Number(c.parts.reliability??c.car);
  c.history=Array.isArray(c.history)?c.history:[];
  c.history.push({title:`Welcome to the ${next} season`,text:`The ${previous} championship is complete. The new season has started; your team, drivers, staff, sponsors and career history have been retained.`,date:`Season ${next} · Pre-season`});
  ensureChampionshipData(c);
  Object.keys(c.roster||{}).filter(team=>team!==c.name).forEach(team=>{
   const previousRating=Number(priorAiRatings[team]??teamBaseRating(previous,team));
   const development=.12+(Math.random()*.24-.12);
   c.aiCarRatings[team]=Number(Math.max(62,Math.min(97,previousRating+development)).toFixed(2));
  });
  saveCareer();
  renderCareer();
  renderSaves();
  showToast(`Welcome to ${next}. Your new championship is ready.`);
  showPreSeasonReport(c);
  return true;
 }catch(error){
  console.error('Season advance failed:',error);
  showToast(`Season could not advance: ${error.message||'unknown error'}`);
  return false;
 }
}
function openInfo(title,html){$('modalTitle').textContent=title;$('modalText').innerHTML=html;$('teamName').hidden=true;$('teamNameLabel').hidden=true;$('seasonSelect').hidden=true;$('teamSelect').hidden=true;$('teamSelectLabel').hidden=true;$('teamColor').hidden=true;$('engineSupplier').hidden=true;$('gearboxSupplier').hidden=true;$('engineSupplierLabel').hidden=true;$('gearboxSupplierLabel').hidden=true;$('driverOne').hidden=true;$('driverTwo').hidden=true;$('driverOneLabel').hidden=true;$('driverTwoLabel').hidden=true;$('createBtn').textContent='CLOSE';$('createBtn').onclick=()=>{$('modal').hidden=true;resetModal();};$('modal').hidden=false;}
function resetModal(){$('seasonSelect').hidden=false;$('teamColor').hidden=false;$('createBtn').hidden=false;$('createBtn').textContent='CREATE CAREER ↗';$('createBtn').onclick=createCareer;}


const baseRenderCareerBuild05=renderCareer;
renderCareer=function(){baseRenderCareerBuild05();if(!currentCareer)return;const c=currentCareer;ensureChampionshipData(c);ensureTechnicalState(c);c.car=getPartOverall(c);$('carValue').textContent=`${c.car} / 100`;$('upgradeBtn').textContent='CHOOSE UPGRADE';$('sponsorBtn').textContent=`SPONSOR DEALS · ${(c.sponsors||[]).length}/5`;$('staffBtn').textContent='OPEN STAFF DEPARTMENT ↗';$('attributeList').innerHTML=[['AERODYNAMICS',c.parts.aero],['CHASSIS',c.parts.chassis],['POWER UNIT',c.enginePower],['PU RELIABILITY',c.engineReliability],['SUSPENSION',c.parts.suspension],['RELIABILITY',c.parts.reliability],['RACE OPERATIONS',c.staff]].map(([n,v])=>`<div class="attribute-row panel"><span>${n}</span><div class="attribute-track"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('');const ranked=sortedEntries(c.constructorStandings);const place=ranked.findIndex(x=>x.name===c.name)+1;$('hqRank').textContent=`P${place||ranked.length+1}`;$('hqPoints').textContent=`${c.points||0} PTS`;};
// Original procedural house soundtrack for the front end. Audio starts only after the user presses the music control.
let gpmMusicEnabled=false;
function toggleMenuMusic(){const audio=$('menuSoundtrack'),btn=$('musicToggleBtn');if(!audio){showToast('Menu soundtrack file is missing.');return;}if(gpmMusicEnabled){audio.pause();gpmMusicEnabled=false;if(btn){btn.textContent='♫ OFF';btn.setAttribute('aria-pressed','false');}localStorage.setItem('gpm-menu-music','off');return;}audio.volume=.34;audio.muted=false;if(audio.error){audio.load();}if(audio.ended)audio.currentTime=0;audio.play().then(()=>{gpmMusicEnabled=true;if(btn){btn.textContent='♫ ON';btn.setAttribute('aria-pressed','true');}localStorage.setItem('gpm-menu-music','on');}).catch(()=>showToast('Press the music button again after the game window is active to enable the soundtrack.'));}

function setup(){fillSeasonSelect();$('musicToggleBtn')?.addEventListener('click',toggleMenuMusic);$('musicToggleBtn')?.setAttribute('aria-pressed','false');$('seasonSelect').addEventListener('change',fillTeamSelect);$('driverOne').addEventListener('change',syncDriverChoices);$('driverTwo').addEventListener('change',syncDriverChoices);$('newCareerBtn').addEventListener('click',openCareerPathChooser);document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>openCareer(b.dataset.mode)));$('closeModal').addEventListener('click',()=>{$('modal').hidden=true;resetModal();});$('modal').addEventListener('click',e=>{if(e.target===$('modal')){$('modal').hidden=true;resetModal();}});$('settingsBtn').addEventListener('click',()=>openInfo('GAME SETTINGS','<p>Build 0.10.11.0 · Local house soundtrack toggle · Live and simulated race modes · Team Principal and Driver Career modes, constructor presentation, management, junior driver market and race archives<br>Career saves are stored in this browser on this device.<br>On iPhone: open the hosted game in Safari, tap Share, then Add to Home Screen.<br>Historical season grids and calendars for 1950–2015 are sourced from F1DB, licensed under CC BY 4.0. Source: github.com/f1db/f1db. The 2027 calendar is the FIA-approved schedule; one Haas race seat remains marked TBC.</p>'));$('homeBtn').addEventListener('click',()=>showView('home'));$('backHomeBtn').addEventListener('click',()=>showView('home'));$('garageBack').addEventListener('click',()=>showView('career'));$('inboxBack').addEventListener('click',()=>showView('career'));document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.nav)));$('upgradeBtn').textContent='CHOOSE UPGRADE';$('upgradeBtn').addEventListener('click',openUpgradeChooser);$('staffBtn').textContent='RACE ENGINEER MARKET';$('sponsorBtn').addEventListener('click',openSponsorDeals);$('standingsBtn').addEventListener('click',viewStandings);$('archiveBtn').addEventListener('click',viewRaceArchive);document.querySelectorAll('.operation-card').forEach(card=>{card.classList.add('operation-card-clickable');card.tabIndex=0;card.setAttribute('role','button');const btn=card.querySelector('button');const run=()=>btn?.click();card.addEventListener('click',e=>{if(!e.target.closest('button'))run();});card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();run();}});});$('raceBtn').textContent='SIMULATE RACE + RESULTS ↗';$('raceBtn').addEventListener('click',simulateRace);$('deleteCareerBtn').addEventListener('click',()=>{if(!currentCareer)return;if(confirm(`Delete ${currentCareer.name} career permanently?`)){localStorage.setItem('gpm-careers',JSON.stringify(getSaves().filter(s=>s.id!==currentCareer.id)));currentCareer=null;renderSaves();showView('home');showToast('Career deleted.');}});renderSaves();$('openTransferBtn').onclick=openDriverMarket;$('transferDriver').addEventListener('change',updateMarketDetail);$('confirmTransferBtn').addEventListener('click',confirmDriverTransfer);$('closeTransferModal').addEventListener('click',()=>$('transferModal').hidden=true);$('transferModal').addEventListener('click',e=>{if(e.target===$('transferModal'))$('transferModal').hidden=true;});$('createBtn').onclick=createCareer;if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
setup();
/* Build 0.6.0 — staff department, official partner market and junior performance */
const STAFF_MARKETS={
 engineer:[
  {name:'Tom Stallard',role:'Race Engineer',specialty:'Driver communication',rating:91,cost:9},
  {name:'Xavi Marcos',role:'Race Engineer',specialty:'Car setup and feedback',rating:89,cost:8},
  {name:'Gianpiero Lambiase',role:'Race Engineer',specialty:'Race execution',rating:96,cost:14},
  {name:'Peter Bonnington',role:'Race Engineer',specialty:'Driver coaching',rating:95,cost:13},
  {name:'Cedric Michel-Grosjean',role:'Race Engineer',specialty:'Vehicle dynamics',rating:86,cost:7},
  {name:'Carlo Santi',role:'Race Engineer',specialty:'Tyre feedback',rating:85,cost:6},
  {name:'Alex Mercer',role:'Race Engineer',specialty:'Qualifying preparation',rating:90,cost:9},
  {name:'Sofia Laurent',role:'Race Engineer',specialty:'Race communication',rating:88,cost:8},
  {name:'Daniel Kovac',role:'Race Engineer',specialty:'Mechanical balance',rating:87,cost:7},
  {name:'Maya Chen',role:'Race Engineer',specialty:'Tyre degradation',rating:92,cost:10},
  {name:'Luca Moretti',role:'Race Engineer',specialty:'Wet-weather setup',rating:86,cost:7},
  {name:'Oliver Grant',role:'Race Engineer',specialty:'Telemetry analysis',rating:89,cost:8},
  {name:'Nadia Petrov',role:'Race Engineer',specialty:'Driver performance',rating:91,cost:9},
  {name:'Ethan Walsh',role:'Race Engineer',specialty:'Power-unit systems',rating:84,cost:6}
 ],
 startEngineer:[
  {name:'Marcus Bell',role:'Starting Engineer',specialty:'Clutch bite-point optimisation',rating:92,cost:9},
  {name:'Elisa Conti',role:'Starting Engineer',specialty:'Launch control systems',rating:90,cost:8},
  {name:'Theo Nakamura',role:'Starting Engineer',specialty:'Start procedure analysis',rating:88,cost:7},
  {name:'Rafael Costa',role:'Starting Engineer',specialty:'Reaction and traction mapping',rating:91,cost:9},
  {name:'Freya Olsen',role:'Starting Engineer',specialty:'Clutch calibration',rating:86,cost:6},
  {name:'Milan Varga',role:'Starting Engineer',specialty:'Race-start simulations',rating:89,cost:8},
  {name:'Amira Haddad',role:'Starting Engineer',specialty:'Launch consistency',rating:87,cost:7},
  {name:'Ben Carter',role:'Starting Engineer',specialty:'Anti-stall and launch systems',rating:85,cost:6}
 ],
 strategist:[
  {name:'Hannah Schmitz',role:'Chief Strategist',specialty:'Race strategy',rating:95,cost:12},
  {name:'Ruth Buscombe',role:'Race Strategist',specialty:'Tyre strategy',rating:91,cost:10},
  {name:'Inaki Rueda',role:'Race Strategist',specialty:'Strategy operations',rating:90,cost:9},
  {name:'Will Courtenay',role:'Head of Race Strategy',specialty:'Strategic planning',rating:93,cost:11},
  {name:'Clara Weiss',role:'Race Strategist',specialty:'Weather strategy',rating:89,cost:8},
  {name:'Mateo Silva',role:'Race Strategist',specialty:'Undercut and overcut timing',rating:88,cost:8},
  {name:'Priya Nair',role:'Race Strategist',specialty:'Safety-car modelling',rating:92,cost:10},
  {name:'Jakub Nowak',role:'Race Strategist',specialty:'Pit-window optimisation',rating:87,cost:7},
  {name:'Isabelle Martin',role:'Strategy Analyst',specialty:'Competitor modelling',rating:90,cost:9},
  {name:'Noah Fischer',role:'Race Strategist',specialty:'Live race simulation',rating:86,cost:7},
  {name:'Ava Thompson',role:'Strategy Analyst',specialty:'Data and probability',rating:91,cost:9},
  {name:'Gabriel Costa',role:'Race Strategist',specialty:'Alternative strategies',rating:85,cost:6}
 ],
 pitcrew:[
  {name:'Red Bull Pit Crew Unit',role:'Pit Crew',rating:96,cost:10},
  {name:'McLaren Pit Crew Unit',role:'Pit Crew',rating:93,cost:9},
  {name:'Ferrari Pit Crew Unit',role:'Pit Crew',rating:91,cost:8},
  {name:'Mercedes Pit Crew Unit',role:'Pit Crew',rating:94,cost:9},
  {name:'Alpine Pit Crew Unit',role:'Pit Crew',rating:84,cost:5}
 ]
};
const REAL_SPONSORS=[['Oracle','Technology · Red Bull Racing partner',5.5],['aramco','Energy · Formula 1 global partner',5],['Petronas','Energy · Mercedes title partner',5],['DHL','Logistics · Formula 1 global partner',4],['AWS','Cloud computing · Formula 1 partner',4.5],['Pirelli','Tyres · Formula 1 official supplier',3.5],['Lenovo','Technology · Formula 1 partner',3.5],['Mastercard','Payments · McLaren partner',4],['Heineken 0.0','Beverage · Formula 1 partner',3],['Salesforce','Enterprise software · Formula 1 partner',3.5],['Globant','Technology · Formula 1 partner',2.5],['crypto.com','Digital finance · Formula 1 partner',3]];
// Expanded 0.9.7 staff and sponsor databases. Historical race engineers are
// searchable in the same market used to recruit current staff.
STAFF_MARKETS.engineer.push(
 ...[
  ['Will Joseph','McLaren','Race execution'],['Marcus Dudley','Mercedes','Driver communication'],['Bryan Bozzi','Ferrari','Car setup and feedback'],['Richard Wood','Red Bull','Race engineering'],['James Urwin','Williams','Vehicle performance'],['Gaëtan Jego','Williams','Race execution'],['Andrew Vizard','Aston Martin','Race engineering'],['Gary Gannon','Aston Martin','Driver communication'],['Laura Müller','Haas','Vehicle dynamics'],['Ronan O’Hare','Haas','Race operations'],['Steven Petrik','Audi','Performance engineering'],['Jose Manuel López','Audi','Driver performance'],['Josh Peckett','Alpine','Race engineering'],['Stuart Barlow','Alpine','Trackside performance'],['Pierre Hamelin','Racing Bulls','Race engineering'],['Alexandre Iliopoulos','Racing Bulls','Trackside engineering'],['John Howard','Cadillac','Race engineering'],['Carlo Pasetti','Cadillac','Performance engineering'],['Riccardo Adami','Ferrari','Race engineering'],['Rob Smedley','Ferrari / Williams','Driver performance'],['Jock Clear','Ferrari / Mercedes','Driver coaching'],['Mark Slade','McLaren / Mercedes / Renault','Race engineering'],['Xevi Pujolar','Sauber / Toro Rosso','Race engineering'],['Andrea Stella','McLaren / Ferrari','Race engineering'],['Chris Dyer','Ferrari','Race engineering'],['Phil Prew','McLaren / Mercedes','Race engineering'],['Dave Robson','Williams','Vehicle performance'],['James Vowles','Williams / Mercedes','Race strategy'],['Tom Stallard','McLaren','Race engineering'],['Peter Bonnington','Mercedes','Driver coaching'],['Gianpiero Lambiase','Red Bull','Race execution'],['Xavi Marcos','Ferrari','Car setup'],['Simon Rennie','Red Bull / Renault','Race engineering'],['Paul Monaghan','Red Bull','Chief engineering'],['Pat Fry','Ferrari / Alpine / Williams','Technical leadership'],['Jonathan Eddolls','Toro Rosso / AlphaTauri','Trackside engineering'],['Cedric Michel-Grosjean','Renault','Vehicle dynamics'],['Ciaron Pilbeam','McLaren / Renault','Race engineering'],['Bernadette Collins','Force India / Aston Martin','Race strategy']
 ].map((x,i)=>({name:x[0],role:'Race Engineer',teamHistory:x[1],specialty:x[2],rating:Math.max(78,96-(i%13)),cost:5+(i%8)}))
);
STAFF_MARKETS.startEngineer.push(
 ...[
  ['Nico Hülkenberg Launch Group','Launch systems'],['Silver Arrow Start Systems','Clutch calibration'],['Papaya Launch Engineering','Start procedure analysis'],['Scuderia Launch Operations','Traction mapping'],['Milton Keynes Start Performance','Bite-point optimisation'],['Enstone Launch Systems','Anti-stall systems'],['Hinwil Start Engineering','Launch consistency'],['Grove Start Performance','Clutch calibration'],['Faenza Launch Operations','Reaction and traction mapping'],['American Launch Engineering','Start simulations'],['Maranello Clutch Specialists','Clutch bite-point optimisation'],['Brackley Launch Control','Launch control systems']
 ].map((x,i)=>({name:x[0],role:'Starting Engineer',specialty:x[1],rating:90-(i%8),cost:6+(i%5)}))
);
STAFF_MARKETS.pitcrew.push(
 ...[
  ['McLaren','Papaya pit-stop crew'],['Ferrari','Maranello pit-stop crew'],['Mercedes','Brackley pit-stop crew'],['Red Bull','Milton Keynes pit-stop crew'],['Aston Martin','Silverstone pit-stop crew'],['Alpine','Enstone pit-stop crew'],['Williams','Grove pit-stop crew'],['Haas','Kannapolis pit-stop crew'],['Audi','Hinwil pit-stop crew'],['Racing Bulls','Faenza pit-stop crew'],['Cadillac','Indianapolis pit-stop crew'],['Jordan Grand Prix','Historic pit crew'],['Benetton','Historic pit crew'],['Lotus','Historic pit crew'],['Brawn GP','Historic pit crew'],['Toyota','Historic pit crew'],['BMW Sauber','Historic pit crew'],['Renault','Historic pit crew'],['Force India','Historic pit crew'],['Tyrrell','Historic pit crew'],['Brabham','Historic pit crew'],['Williams Heritage','Historic pit crew']
 ].map((x,i)=>({name:`${x[0]} Pit Crew`,role:'Pit Crew',specialty:x[1],rating:96-(i%14),cost:5+(i%7)}))
);
const EXTRA_SPONSORS=[
 ['Visa Cash App','Payments · Racing Bulls partner',3],['Alpinestars','Motorsport apparel · F1 team partner',2.5],['Castrol','Lubricants · Motorsport partner',3.5],['Shell','Energy · Ferrari partner',4],['Mobil 1','Lubricants · Motorsport partner',3.5],['Brembo','Braking systems · F1 supplier',2.5],['BOSS','Apparel · Aston Martin partner',3],['TUMI','Travel goods · McLaren partner',2],['Google Chrome','Technology · McLaren partner',4],['TeamViewer','Software · Mercedes partner',3],['CrowdStrike','Cybersecurity · Mercedes partner',3],['Hugo','Apparel · RB partner',2],['Roku','Streaming technology · Williams partner',2.5],['Komatsu','Engineering · Williams partner',3],['MoneyGram','Financial services · Haas partner',2.5],['Oakberry','Food · F1 team partner',1.8],['Richard Mille','Watches · Motorsport partner',3],['Tag Heuer','Watches · Motorsport partner',3.5],['Kaspersky','Cybersecurity · Motorsport partner',2.5],['Sparco','Motorsport equipment · F1 supplier',2.5],['Michelin','Tyres · Motorsport brand',3],['Eni','Energy · Motorsport partner',3],['Infiniti','Automotive · Red Bull partner',3],['Claro','Telecommunications · Motorsport partner',2]
];
REAL_SPONSORS.push(...EXTRA_SPONSORS);

function ensureStaff(c){
 c.staffRoster=c.staffRoster||{engineer:[null,null],startEngineer:[null,null],strategist:null,pitcrew:null};
 c.staffRoster.engineer=Array.isArray(c.staffRoster.engineer)?c.staffRoster.engineer:[null,null];
 c.staffRoster.engineer.length=2;
 c.staffRoster.startEngineer=Array.isArray(c.staffRoster.startEngineer)?c.staffRoster.startEngineer:[null,null];
 c.staffRoster.startEngineer.length=2;
 if(!c.staffRoster.engineer[0]&&c.raceEngineer)c.staffRoster.engineer[0]={...c.raceEngineer,role:'Race Engineer'};
 c.staffRoster.strategist=c.staffRoster.strategist||null;c.staffRoster.pitcrew=c.staffRoster.pitcrew||null;
 c.sponsorDeals=c.sponsorDeals||[];c.reserveStats=c.reserveStats||{};
 (c.reserves||[]).forEach(n=>{c.reserveStats[n]=c.reserveStats[n]||{starts:0,points:0,lastRating:DRIVER_RATING[n]||juniorDrivers(c.season).find(x=>x.name===n)?.rating||75};});
}
function assignStartingStaff(c){
 ensureStaff(c);const s=c.staffRoster;
 const starters={
  engineer:[{name:'Alex Morgan',role:'Race Engineer',specialty:'Race operations',rating:76,cost:0,annualSalary:0},{name:'Jamie Carter',role:'Race Engineer',specialty:'Driver communication',rating:75,cost:0,annualSalary:0}],
  startEngineer:[{name:'Launch Systems Engineer 1',role:'Starting Engineer',specialty:'Clutch calibration',rating:74,cost:0,annualSalary:0},{name:'Launch Systems Engineer 2',role:'Starting Engineer',specialty:'Race-start procedures',rating:74,cost:0,annualSalary:0}],
  strategist:{name:'Morgan Ellis',role:'Race Strategist',specialty:'Race strategy',rating:75,cost:0,annualSalary:0},
  pitcrew:{name:`${c.name} Pit Crew`,role:'Pit Crew',specialty:'Pit-stop operations',rating:75,cost:0,annualSalary:0}
 };
 let changed=false;
 ['engineer','startEngineer'].forEach(k=>{for(let i=0;i<2;i++)if(!s[k][i]){s[k][i]={...starters[k][i]};changed=true;}});
 ['strategist','pitcrew'].forEach(k=>{if(!s[k]){s[k]={...starters[k]};changed=true;}});
 if(changed){c.history=c.history||[];c.history.push({title:'Starting staff appointed',text:'Your team began the season with two race engineers, two starting engineers, a chief strategist and a pit crew. All six positions are ready.',date:`Season ${c.season} · Pre-season`});}
 return s;
}
function staffLog(c,title,text){c.history.push({title,text,date:`Season ${c.season} · Round ${c.round}`});}
function openEngineerMarket(){openStaffDepartment('engineer1');}
function openStaffDepartment(tab='engineer1'){
 if(!currentCareer)return;const c=currentCareer;ensureStaff(c);
 const tabs=[['engineer1','DRIVER 1 RACE ENGINEER'],['engineer2','DRIVER 2 RACE ENGINEER'],['start1','DRIVER 1 START ENGINEER'],['start2','DRIVER 2 START ENGINEER'],['strategist','STRATEGIST'],['pitcrew','PIT CREW'],['academy','JUNIOR / RESERVE']];
 const root=showCareerModal('STAFF & PERFORMANCE DEPARTMENT','<div id="staffDepartmentContent"></div>',[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);
 function draw(active){
  const content=root.querySelector('#staffDepartmentContent');
  const nav=`<div class="staff-tabs">${tabs.map(([id,label])=>`<button class="staff-tab ${id===active?'active':''}" data-staff-tab="${id}">${label}</button>`).join('')}</div>`;
  if(active==='academy'){
   const rows=(c.reserves||[]).map(n=>{const st=c.reserveStats[n]||{starts:0,points:0,lastRating:75},jd=juniorDrivers(c.season).find(x=>x.name===n);return `<article class="staff-person"><div><b>${escapeHtml(n)}</b><small>${jd?.series||'Academy'} · ${st.lastRating} OVR · ${st.starts} race reports</small><strong>${st.points} feeder points · projected ${Math.min(99,Math.round(st.lastRating+st.points*.12))} OVR</strong></div><button class="staff-action" data-prospect="${escapeHtml(n)}">VIEW REPORT</button></article>`;}).join('');
   content.innerHTML=nav+`<p>Each completed Grand Prix updates your signed juniors' feeder-series performance, points and development. Open a report to promote or release a prospect.</p><div class="staff-roster">${rows||'<p>No reserve drivers signed yet. Recruit F2/F3/F4 talent through Driver Market.</p>'}</div>`;
   content.querySelectorAll('[data-prospect]').forEach(b=>b.onclick=()=>viewJuniorReport(b.dataset.prospect));
  }else{
   const isRace=active.startsWith('engineer'),isStart=active.startsWith('start'),isSeat=isRace||isStart;
   const seat=active.endsWith('2')?1:0;
   const rosterKey=isRace?'engineer':isStart?'startEngineer':active;
   const current=isSeat?[{slot:seat,label:`DRIVER ${seat+1} · ${c.drivers[seat]||'UNASSIGNED'}`,person:c.staffRoster[rosterKey][seat]}]:[{slot:null,label:active==='strategist'?'CHIEF STRATEGIST':'PIT CREW',person:c.staffRoster[active]}];
   const market=STAFF_MARKETS[rosterKey];
   const intro=isRace?'Race engineers manage driver communication, car feedback and setup decisions. Each driver has a separate engineer.':isStart?'Starting engineers develop clutch calibration, launch procedures and race-start consistency. Each driver has a dedicated specialist.':'Hire, replace or dismiss your team staff. Stronger specialists provide a small performance benefit.';
   content.innerHTML=nav+`<p>${intro}</p><div class="staff-roster">${current.map(slot=>{const candidates=market.filter(p=>!Object.values(c.staffRoster).flat().filter(Boolean).some(x=>x.name===p.name));return `<section class="staff-slot"><div class="staff-slot-heading"><b>${slot.label}</b><span class="${slot.person?'staff-current':'staff-vacant'}">${slot.person?'ACTIVE':'VACANT'}</span></div>${slot.person?`<div class="staff-person"><div><b>${escapeHtml(slot.person.name)}</b><small>${escapeHtml(slot.person.role)} · ${slot.person.rating} OVR</small><strong>${escapeHtml(slot.person.specialty||'Team operations')}</strong></div><button class="staff-dismiss" data-dismiss="${active}" data-slot="${slot.slot??''}">SACK</button></div>`:'<p class="staff-empty">No staff member assigned.</p>'}<label class="staff-search-label">SEARCH / FILTER CANDIDATES (${candidates.length})</label><input class="staff-search" type="search" placeholder="Search name, team or speciality..." data-staff-search><div class="staff-market staff-market-scroll" data-staff-market>${candidates.map(p=>`<article class="staff-person" data-candidate-search="${escapeHtml([p.name,p.role,p.specialty||'',p.teamHistory||''].join(' ').toLowerCase())}"><div><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.role)}${p.teamHistory?' · '+escapeHtml(p.teamHistory):''}</small><strong>${p.rating} OVR · €${p.cost}M · ${escapeHtml(p.specialty||'Team operations')}</strong></div><button class="staff-action" data-hire="${active}" data-slot="${slot.slot??''}" data-name="${escapeHtml(p.name)}">HIRE</button></article>`).join('')||'<small>No available candidates in this shortlist.</small>'}</div></section>`;}).join('')}</div>`;
   content.querySelectorAll('[data-staff-search]').forEach(input=>input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();input.parentElement.querySelectorAll('[data-candidate-search]').forEach(card=>card.hidden=!card.dataset.candidateSearch.includes(q));}));
   content.querySelectorAll('[data-dismiss]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.dismiss,seat=+b.dataset.slot;
    if(k.startsWith('engineer'))c.staffRoster.engineer[seat]=null;
    else if(k.startsWith('start'))c.staffRoster.startEngineer[seat]=null;
    else c.staffRoster[k]=null;
    staffLog(c,'Staff member dismissed',`${k.startsWith('start')?'Starting engineer':k.startsWith('engineer')?'Race engineer':k==='pitcrew'?'Pit crew':k} position was vacated.`);
    saveCareer();renderCareer();draw(active);showToast('Staff member dismissed. Position vacant.');
   });
   content.querySelectorAll('[data-hire]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.hire,marketKey=k.startsWith('engineer')?'engineer':k.startsWith('start')?'startEngineer':k,p=STAFF_MARKETS[marketKey]?.find(x=>x.name===b.dataset.name);
    if(!p)return;if(c.budget<p.cost){showToast(`Not enough funds. Signing fee: €${p.cost}M.`);return;}
    c.budget-=p.cost;
    if(k.startsWith('engineer'))c.staffRoster.engineer[+b.dataset.slot]={...p};
    else if(k.startsWith('start'))c.staffRoster.startEngineer[+b.dataset.slot]={...p};
    else c.staffRoster[k]={...p};
    staffLog(c,`${p.name} hired`,`${p.name} joined as ${p.role} (${p.rating} OVR). Specialty: ${p.specialty||'Team operations'}. Signing fee €${p.cost}M.`);
    saveCareer();renderCareer();draw(active);showToast(`${p.name} hired.`);
   });
  }
  content.querySelectorAll('[data-staff-tab]').forEach(b=>b.onclick=()=>draw(b.dataset.staffTab));
 }
 draw(tab);
}
function viewJuniorReport(name){const c=currentCareer;ensureStaff(c);const st=c.reserveStats[name]||{starts:0,points:0,lastRating:75},jd=juniorDrivers(c.season).find(x=>x.name===name)||{series:'Reserve',rating:st.lastRating};const body=`<div class="junior-report"><div class="junior-report-top"><span>${escapeHtml(jd.series)} ACADEMY</span><strong>${st.lastRating} OVR</strong></div><h3>${escapeHtml(name)}</h3><div class="junior-stats"><div><small>RACE REPORTS</small><b>${st.starts}</b></div><div><small>FEEDER POINTS</small><b>${st.points}</b></div><div><small>DEVELOPMENT</small><b>${Math.min(99,Math.round(st.lastRating+st.points*.12))} OVR</b></div></div><p>Feeder-series results are simulated after every F1 weekend. You can promote this prospect at any point in the season.</p><div class="staff-report-actions"><button class="staff-action" id="promoteJunior0">PROMOTE TO DRIVER 1</button><button class="staff-action" id="promoteJunior1">PROMOTE TO DRIVER 2</button><button class="staff-dismiss" id="releaseJunior">RELEASE</button></div></div>`;const panel=showCareerModal(`${name.toUpperCase()} · PERFORMANCE`,body,[{label:'BACK TO ACADEMY',kind:'secondary-btn',action:()=>openStaffDepartment('academy')}]);[0,1].forEach(i=>panel.querySelector(`#promoteJunior${i}`).onclick=()=>{const old=c.drivers[i];c.drivers[i]=name;c.roster[c.name]=[...c.drivers];c.reserves=c.reserves.filter(n=>n!==name);if(!c.reserves.includes(old))c.reserves.push(old);c.driverPoints[i]=0;staffLog(c,'Junior promoted',`${name} promoted to Driver ${i+1}, replacing ${old}.`);saveCareer();renderCareer();showToast(`${name} promoted to Driver ${i+1}.`);panel.hidden=true;});panel.querySelector('#releaseJunior').onclick=()=>{c.reserves=c.reserves.filter(n=>n!==name);delete c.reserveStats[name];staffLog(c,'Junior released',`${name} left the reserve programme.`);saveCareer();renderCareer();openStaffDepartment('academy');};}
function openSponsorDeals(){if(!currentCareer)return;const c=currentCareer;ensureStaff(c);const available=REAL_SPONSORS.filter(s=>!c.sponsorDeals.some(x=>x.name===s[0])&&!c.sponsors.includes(s[0]));const body=`<p>Choose from real brands associated with Formula 1 and its teams. Each deal runs for two seasons and pays an upfront signing contribution.</p><div class="sponsor-grid">${available.map(s=>`<article class="sponsor-card"><div class="sponsor-wordmark">${escapeHtml(s[0])}</div><small>${escapeHtml(s[1])}</small><strong>€${s[2].toFixed(1)}M signing bonus</strong><button class="staff-action" data-real-sponsor="${escapeHtml(s[0])}">SIGN PARTNERSHIP</button></article>`).join('')||'<p>All available partnership offers have been signed.</p>'}</div><h3 class="staff-subheading">SIGNED PARTNERS</h3><div class="signed-sponsors">${[...(c.sponsors||[]),...c.sponsorDeals.map(x=>x.name)].filter((v,i,a)=>a.indexOf(v)===i).map(n=>`<span>${escapeHtml(n)}</span>`).join('')||'<small>No commercial partners signed.</small>'}</div>`;const root=showCareerModal('OFFICIAL F1 PARTNER MARKET',body,[{label:'CLOSE',kind:'secondary-btn',action:()=>root.hidden=true}]);root.querySelectorAll('[data-real-sponsor]').forEach(b=>b.onclick=()=>{if(c.sponsorDeals.length+(c.sponsors||[]).length>=20){showToast('Your partnership portfolio is full (20 sponsors).');return;}const s=REAL_SPONSORS.find(x=>x[0]===b.dataset.realSponsor);if(!s)return;c.sponsorDeals.push({name:s[0],category:s[1],bonus:s[2],signedSeason:c.season,term:2});c.budget+=s[2];staffLog(c,'Official sponsor signed',`${s[0]} joined the team as a two-season commercial partner. €${s[2].toFixed(1)}M signing bonus received.`);saveCareer();renderCareer();showToast(`${s[0]} partnership signed · +€${s[2].toFixed(1)}M`);root.hidden=true;});}
const previousRenderCareer060=renderCareer;renderCareer=function(){previousRenderCareer060();if(!currentCareer)return;ensureStaff(currentCareer);const c=currentCareer;$('staffBtn').textContent='OPEN STAFF DEPARTMENT ↗';$('sponsorBtn').textContent=`REAL SPONSORS · ${(c.sponsors||[]).length+c.sponsorDeals.length}/20`;const box=$('reserveList');if(box){box.innerHTML=(c.reserves||[]).length?c.reserves.map(n=>{const st=c.reserveStats[n]||{starts:0,points:0,lastRating:75};return `<button class="reserve-chip reserve-report-link" data-reserve-report="${escapeHtml(n)}">JUNIOR · ${escapeHtml(n)} <span>${st.lastRating} OVR · ${st.points} PTS</span></button>`;}).join(''):'<span class="reserve-chip">No reserve drivers signed</span>';box.querySelectorAll('[data-reserve-report]').forEach(b=>b.onclick=()=>viewJuniorReport(b.dataset.reserveReport));}};
const previousSimulateRace060=simulateRace;simulateRace=function(){const c=currentCareer;if(c){ensureStaff(c);(c.reserves||[]).forEach(n=>{const jd=juniorDrivers(c.season).find(x=>x.name===n),st=c.reserveStats[n]||(c.reserveStats[n]={starts:0,points:0,lastRating:jd?.rating||75});st.starts++;const perf=(jd?.rating||st.lastRating)+Math.random()*18-7,pts=perf>96?25:perf>90?18:perf>85?15:perf>80?10:perf>75?6:2;st.points+=pts;st.lastRating=Math.max(60,Math.min(99,Math.round(st.lastRating+(perf>(jd?.rating||75)+7?1:0))));});}previousSimulateRace060();if(c)saveCareer();};
$('staffBtn').onclick=()=>openStaffDepartment('engineer1');$('sponsorBtn').onclick=openSponsorDeals;

// Build 0.6.1: select the correct 3D car generation for the active career.
const renderCareerBefore3D061 = renderCareer;
renderCareer = function(){
  renderCareerBefore3D061();
  if (currentCareer && window.selectGpmCarModel) window.selectGpmCarModel(currentCareer.season >= 2026 ? '2026' : '2022-2025');
};

/* Build 0.6.3 — historical legends, transfers and complete two-car grid */
const HISTORICAL_DRIVERS_063=[
 ['Michael Schumacher',97,'7-time World Champion'],['Ayrton Senna',98,'3-time World Champion'],['Alain Prost',97,'4-time World Champion'],['Niki Lauda',95,'3-time World Champion'],['Nigel Mansell',93,'1992 World Champion'],['Mika Häkkinen',94,'2-time World Champion'],['Kimi Räikkönen',93,'2007 World Champion'],['Jenson Button',92,'2009 World Champion'],['Nico Rosberg',93,'2016 World Champion'],['Damon Hill',91,'1996 World Champion'],['Jacques Villeneuve',91,'1997 World Champion'],['Juan Pablo Montoya',92,'Grand Prix winner'],['Mark Webber',91,'Grand Prix winner'],['Felipe Massa',91,'Grand Prix winner'],['Rubens Barrichello',90,'Grand Prix winner'],['David Coulthard',90,'Grand Prix winner'],['Gerhard Berger',91,'Grand Prix winner'],['Emerson Fittipaldi',95,'2-time World Champion'],['Jackie Stewart',96,'3-time World Champion'],['James Hunt',93,'1976 World Champion'],['Gilles Villeneuve',94,'Ferrari legend'],['Stirling Moss',95,'Motorsport legend'],['John Surtees',94,'7-time motorcycle & F1 World Champion'],['Fernando Alonso (Prime)',98,'Prime-era alternate'],['Sebastian Vettel (Prime)',98,'4-time World Champion']
];
const HISTORICAL_RATINGS_063=Object.fromEntries(HISTORICAL_DRIVERS_063.map(([name,rating])=>[name,rating]));
const HISTORICAL_NAMES_063=HISTORICAL_DRIVERS_063.map(x=>x[0]);
const historicalInfo063=name=>HISTORICAL_DRIVERS_063.find(x=>x[0]===name);
const FREE_AGENT_POOL_063=[['Daniel Ricciardo',86],['Valtteri Bottas',84],['Kevin Magnussen',82],['Zhou Guanyu',79],['Mick Schumacher',80],['Nyck de Vries',79],['Logan Sargeant',77],['Nicholas Latifi',76],['Nico Rosberg',91],['Jenson Button',90]];
const originalAllDrivers063=allDrivers;
allDrivers=function(year){return originalAllDrivers063(year).slice().sort((a,b)=>a.localeCompare(b));};
const originalDriverRating063=DRIVER_RATING;
Object.assign(DRIVER_RATING,HISTORICAL_RATINGS_063);
function driverRating063(name){return DRIVER_RATING[name]||juniorDrivers(currentCareer?.season||2026).find(d=>d.name===name)?.rating||77;}
function gridHistory063(c,title,detail){c.history=c.history||[];c.history.push({title,text:detail,date:`Season ${c.season} · R${c.round||0}`});}
function ensureRoster(c){
 c.roster=c.roster||careerRoster(c.season,c.name,c.drivers||[],c.mode);
 const activeSeasonNames=new Set(allDrivers(c.season)||[]);const invalidModernLegend=name=>HISTORICAL_NAMES_063.includes(name)&&!(/\(Prime\)$/.test(name))&&!activeSeasonNames.has(name);
 if(Number(c.season)>=2022){Object.keys(c.roster).forEach(team=>{c.roster[team]=(c.roster[team]||[]).filter(name=>!invalidModernLegend(name));});c.drivers=(c.drivers||[]).filter(name=>!invalidModernLegend(name));while(c.drivers.length<2){const used=new Set(Object.values(c.roster).flat());const replacement=juniorDrivers(c.season).find(d=>!used.has(d.name)&&!c.drivers.includes(d.name))?.name;if(!replacement)break;c.drivers.push(replacement);}}
 c.roster[c.name]=[...(c.drivers||c.roster[c.name]||[])];
 c.reserves=Array.isArray(c.reserves)?c.reserves:[];
 c.aiReserves=c.aiReserves||{};
 const teamNames=SEASONS[c.season].teams.map(t=>t[0]);
 teamNames.forEach(t=>{if(!Array.isArray(c.roster[t]))c.roster[t]=[];});
 if(!teamNames.includes(c.name)&&!Array.isArray(c.roster[c.name]))c.roster[c.name]=[...(c.drivers||[])];
 const used=new Set();
 Object.entries(c.roster).forEach(([team,list])=>{if(team!==c.name)(list||[]).forEach(n=>used.add(n));});
 (c.drivers||[]).forEach(n=>used.add(n));
 const juniors=juniorDrivers(c.season).slice().sort((a,b)=>b.rating-a.rating||a.name.localeCompare(b.name));
 const historical=HISTORICAL_DRIVERS_063.slice().sort((a,b)=>b[1]-a[1]);
 const activeGrid=allDrivers(c.season).map(name=>({name,rating:DRIVER_RATING[name]||77,series:'F1'}));
 const fallback=[...juniors.map(d=>({name:d.name,rating:d.rating,series:d.series})),...activeGrid];
 teamNames.forEach(team=>{
   if(team===c.name)return;
   const list=c.roster[team];
   while(list.length>2){const extra=list.pop();if(extra&&!c.aiReserves[team])c.aiReserves[team]=extra;}
   while(list.length<2){
     let candidate=c.aiReserves[team];
     if(!candidate||used.has(candidate)){
       const next=fallback.find(d=>!used.has(d.name)&&!(c.reserves||[]).includes(d.name));
       candidate=next?.name;
     }
     if(!candidate)break;
     list.push(candidate);used.add(candidate);
     const info=fallback.find(d=>d.name===candidate);
     gridHistory063(c,'Automatic driver promotion',`${candidate} (${info?.series||'reserve driver'}) was promoted to ${team} to restore its two-car lineup.`);
   }
 });
 c.roster[c.name]=[...(c.drivers||[])];
 // A reserve must never simultaneously occupy an F1 race seat.
 c.reserves=c.reserves.filter(n=>!used.has(n)&&!(c.drivers||[]).includes(n));
}
function openDriverMarket(){
 if(!currentCareer)return;const c=currentCareer;ensureRoster(c);
 const occupied=assignedDrivers(c);
 const primeOptions=HISTORICAL_DRIVERS_063.filter(([n])=>/\(Prime\)$/.test(n)).map(([name,rating])=>({name,series:'Prime / Historical form',rating}));
 const freeAgents=FREE_AGENT_POOL_063.filter(([name])=>!assignedDrivers(c).has(name)&&!HISTORICAL_NAMES_063.includes(name)).map(([name,rating])=>({name,series:'Free Agent',rating}));
 const pool=[...allDrivers(c.season).map(n=>({name:n,series:'F1',rating:DRIVER_RATING[n]||78})),...freeAgents,...juniorDrivers(c.season),...primeOptions];
 const assigned=assignedDrivers(c);
 const candidates=pool.filter((d,i)=>pool.findIndex(x=>x.name===d.name)===i&&(!assigned.has(d.name)||d.series==='F2'||d.series==='F3'||d.series==='F4'||d.series==='Prime / Historical form')&&!c.drivers.includes(d.name)&&!c.reserves.includes(d.name));
 $('transferDriver').innerHTML=candidates.map(d=>`<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)} · ${d.series} · ${d.rating} OVR</option>`).join('');
 $('transferIntro').textContent=`${c.name} · ${c.season}. Choose an uncontracted free agent, a current F2/F3 prospect, or an alternate prime version. Drivers already contracted to another F1 team are not offered as free agents.`;
 $('transferModal').hidden=false;updateMarketDetail();
}
function updateMarketDetail(){
 if(!currentCareer)return;const c=currentCareer;const name=$('transferDriver').value;
 const freeAgents=FREE_AGENT_POOL_063.filter(([n])=>!assignedDrivers(c).has(n)&&!HISTORICAL_NAMES_063.includes(n)).map(([name,rating])=>({name,series:'Free Agent',rating}));
 const d=[...allDrivers(c.season).map(n=>({name:n,series:'F1',rating:DRIVER_RATING[n]||78})),...freeAgents,...juniorDrivers(c.season),...HISTORICAL_DRIVERS_063.filter(([n])=>/\(Prime\)$/.test(n)).map(([name,rating])=>({name,series:'Prime / Historical form',rating}))].find(x=>x.name===name);
 if(!d){$('marketDetail').textContent='No eligible drivers available.';return;}
 const assignedTo=Object.entries(c.roster||{}).find(([team,list])=>(list||[]).includes(name));
 const historical=historicalInfo063(name);
 $('marketDetail').innerHTML=`<div class=\"gpm-transfer-portrait\" data-transfer-portrait=\"${escapeHtml(d.name)}\"><span>${escapeHtml(d.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span></div><b>${escapeHtml(d.name)}</b> · ${d.series} · ${d.rating} OVR<br>${historical?`<em>${escapeHtml(historical[2])}</em><br>`:''}${assignedTo?`Currently contracted to ${escapeHtml(assignedTo[0])}. Signing them swaps your outgoing driver into their former seat.`:d.series==='F1'||d.series==='Free Agent'||d.series==='Prime / Historical form'?'Available to sign directly into either F1 race seat.':'Junior prospect. Can be signed as a reserve or promoted into an F1 race seat.'}`;
}
function confirmDriverTransfer(){
 if(!currentCareer)return;const c=currentCareer;ensureRoster(c);const candidate=$('transferDriver').value,seat=+$('transferSeat').value;
 if(!candidate){showToast('Choose a driver first.');return;}
 const junior=juniorDrivers(c.season).find(d=>d.name===candidate);
 const fromEntry=Object.entries(c.roster).find(([team,list])=>(list||[]).includes(candidate));
 if(seat===2){
  if(!junior){showToast('Only current-season F2/F3/F4 prospects can be signed into the reserve programme.');return;}
  if(fromEntry){showToast(`${candidate} is already contracted to ${fromEntry[0]}. Use a race seat transfer instead.`);return;}
  if(c.reserves.includes(candidate)){showToast('This prospect is already in your reserve programme.');return;}
  const fee=Math.max(1,Math.round((junior.rating-65)*.18*10)/10);if(c.budget<fee){showToast(`Not enough budget. Signing fee: €${fee}M.`);return;}
  c.budget-=fee;c.reserves.push(candidate);c.reserveStats=c.reserveStats||{};c.reserveStats[candidate]={starts:0,points:0,lastRating:junior.rating};
  gridHistory063(c,'Junior prospect signed',`${candidate} (${junior.series}, ${junior.rating} OVR) joined your reserve programme for €${fee}M.`);
  saveCareer();$('transferModal').hidden=true;renderCareer();showToast(`${candidate} signed as a reserve.`);return;
 }
 if(seat!==0&&seat!==1){showToast('Choose a valid F1 race seat.');return;}
 if(junior&&junior.series==='F4'){showToast('F4 drivers must progress through F3 or F2 before receiving an F1 race seat.');return;}
 if(candidate===c.drivers[1-seat]||candidate===c.drivers[seat]){showToast('That driver already occupies one of your race seats.');return;}
 const outgoing=c.drivers[seat];
 if(fromEntry){
   const [oldTeam,oldList]=fromEntry;const oldIdx=oldList.indexOf(candidate);
   if(oldTeam===c.name){showToast('That driver is already at your team.');return;}
   // Direct swap: the outgoing driver takes the exact seat vacated by the incoming driver.
   oldList[oldIdx]=outgoing;
 }else if(outgoing&&!c.reserves.includes(outgoing)){c.reserves.push(outgoing);c.reserveStats=c.reserveStats||{};c.reserveStats[outgoing]=c.reserveStats[outgoing]||{starts:0,points:0,lastRating:DRIVER_RATING[outgoing]||77};}
 c.drivers[seat]=candidate;c.roster[c.name]=[...c.drivers];c.reserves=c.reserves.filter(n=>n!==candidate);if(c.reserveStats)delete c.reserveStats[candidate];
 c.driverPoints=c.driverPoints||[0,0];c.driverPoints[seat]=0;c.driverChampPoints=c.driverChampPoints||{};c.driverChampPoints[candidate]=c.driverChampPoints[candidate]||0;
 ensureRoster(c);
 gridHistory063(c,'Driver transfer completed',`${candidate} joined ${c.name}, replacing ${outgoing}. ${fromEntry?`${outgoing} moved directly to ${fromEntry[0]}.`:`${outgoing} moved into your reserve programme.`} All constructors were checked for a complete two-driver lineup.`);
 saveCareer();$('transferModal').hidden=true;renderCareer();renderSaves();showToast(`${candidate} signed. ${fromEntry?`${outgoing} swapped to ${fromEntry[0]}`:`${outgoing} moved to reserves`}. Grid checked.`);
}
const renderCareerBefore063=renderCareer;
renderCareer=function(){if(currentCareer)ensureRoster(currentCareer);renderCareerBefore063();if(currentCareer){const badge=$('seasonBadge');if(badge)badge.innerHTML=`<span class="live-dot"></span> ${currentCareer.season} SEASON · BUILD 0.10.11.0`;}};
