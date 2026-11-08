const {chromium}=require('/home/user/workspace/rea-study/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const tier=process.argv[2]||'vlow'; const out=process.argv[3]||`run-${tier}`;
 const b=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
 const c=await b.newContext({viewport:{width:960,height:540},deviceScaleFactor:1,hasTouch:true,isMobile:true});
 await c.addInitScript(({tier})=>{ localStorage.setItem('ow_settings2',JSON.stringify({preset:tier,auto:false,fps:true}));localStorage.setItem('ow_quality','mobile');},{tier});
 const p=await c.newPage(),errors=[],net=[];
 p.on('pageerror',e=>errors.push(e.stack));p.on('requestfailed',r=>net.push({url:r.url(),error:r.failure()}));
 const cd=await c.newCDPSession(p);await cd.send('Network.enable');await cd.send('Network.setCacheDisabled',{cacheDisabled:true});
 const requests=new Map(); cd.on('Network.requestWillBeSent',e=>requests.set(e.requestId,{url:e.request.url,start:e.timestamp,type:e.type}));
 cd.on('Network.loadingFinished',e=>{const q=requests.get(e.requestId);if(q)net.push({...q,end:e.timestamp,encodedDataLength:e.encodedDataLength});});
 let status='not-started';
 try{await p.goto('http://127.0.0.1:8868/?ttpprof=1',{waitUntil:'domcontentloaded',timeout:30000}); status='loading';
 await p.waitForFunction(()=>window.__TTP?.marks.some(x=>x.name==='play-enabled'),{},{timeout:240000});status='play-enabled';
 await p.screenshot({path:out+'-enabled.png'}); await p.locator('#sgPlay').click();
 await p.screenshot({path:out+'-plus0.png'});await p.waitForTimeout(3000);await p.screenshot({path:out+'-plus3.png'});await p.waitForTimeout(7000);await p.screenshot({path:out+'-plus10.png'});await p.waitForTimeout(5000);
 }catch(e){errors.push(String(e));}
 let result={status,errors,net};try{result.data=await p.evaluate(()=>window.__TTP?JSON.parse(window.__TTP.export()):null);result.g50=await p.evaluate(()=>window.G50?.st);result.ua=await p.evaluate(()=>navigator.userAgent);await p.screenshot({path:out+'-end.png',timeout:15000});}catch(e){errors.push(String(e));}
 fs.writeFileSync(out+'.json',JSON.stringify(result,null,2));console.log(JSON.stringify({status,marks:result.data?.marks,errors:errors.slice(0,10),g50:result.g50}));await b.close();
})();
