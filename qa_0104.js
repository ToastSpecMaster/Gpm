const fs=require('fs');const vm=require('vm');const path=require('path');
const source=fs.readFileSync(path.join(__dirname,'driver-portraits.js'),'utf8');
const calls=[];
const pages=[
 {title:'File:Driver_NC_2024.jpg',imageinfo:[{thumburl:'https://img.invalid/nc.jpg',extmetadata:{LicenseShortName:{value:'CC BY-NC 4.0'},Artist:{value:'Nope'}}}]},
 {title:'File:Driver_CC_BY_SA_2024.jpg',imageinfo:[{thumburl:'https://img.invalid/cc.jpg',extmetadata:{LicenseShortName:{value:'CC BY-SA 4.0'},Artist:{value:'Photographer A'},LicenseUrl:{value:'https://creativecommons.org/licenses/by-sa/4.0/'},DateTimeOriginal:{value:'2024-08-01'}}}]}
];
const context={window:{},fetch:async url=>{calls.push(url);return {ok:true,json:async()=>({query:{pages:Object.fromEntries(pages.map((p,i)=>[i,p]))}})}}};
vm.createContext(context);vm.runInContext(source,context);
(async()=>{
 const service=context.window.GPMDriverPortraits;
 if(!service.reusableLicence('CC BY-SA 4.0'))throw new Error('CC BY-SA should be allowed');
 if(!service.reusableLicence('CC BY 4.0'))throw new Error('CC BY should be allowed');
 if(!service.reusableLicence('CC0'))throw new Error('CC0 should be allowed');
 if(service.reusableLicence('CC BY-NC 4.0'))throw new Error('NC licence must be rejected');
 if(service.reusableLicence('CC BY-ND 4.0'))throw new Error('ND licence must be rejected');
 const photo=await service.lookup('Driver Example',2024);
 if(photo.licence!=='CC BY-SA 4.0'||photo.artist!=='Photographer A')throw new Error('Correct reusable image and attribution were not selected');
 if(!calls[0].includes('2024'))throw new Error('Season was not included in Commons search');
 console.log('0.10.7 driver portrait QA passed.');
})().catch(error=>{console.error(error);process.exit(1)});
