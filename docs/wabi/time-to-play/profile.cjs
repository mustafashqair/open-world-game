const fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const tier=process.argv[2]||'vlow', out=process.argv[3]||`ttp-${tier}`, timeout=+(process.env.TTP_TIMEOUT||300000);
 if(!['vlow','low'].includes(tier))throw Error('Use vlow or low');
 const sw=process.env.SW_MODE||'block', base=process.env.BASE_URL||'http://127.0.0.1:8868/';
 const b=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{}),args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
 const c=await b.newContext({viewport:{width:960,height:540},deviceScaleFactor:1,hasTouch:true,isMobile:true,serviceWorkers:sw});
 await c.addInitScript(({tier})=>{localStorage.setItem('ow_settings2',JSON.stringify({preset:tier,auto:false,fps:true}));localStorage.setItem('ow_quality','mobile');localStorage.setItem('ow_vlow_v50d3','1');localStorage.setItem('ow_lowauto_v50d2','1');},{tier});
 const p=await c.newPage(),errors=[],net=[],requests=new Map(); let trace=false;
 p.on('pageerror',e=>errors.push(e.stack));p.on('requestfailed',r=>net.push({url:r.url(),error:r.failure()}));
 const cd=await c.newCDPSession(p);await cd.send('Network.enable');await cd.send('Network.setCacheDisabled',{cacheDisabled:true});
 if(sw==='block')await cd.send('Network.setBypassServiceWorker',{bypass:true});
 cd.on('Network.requestWillBeSent',e=>requests.set(e.requestId,{url:e.request.url,start:e.timestamp,wallTime:e.wallTime,type:e.type,initiator:e.initiator}));
 cd.on('Network.loadingFinished',e=>{const q=requests.get(e.requestId);if(q)net.push({...q,end:e.timestamp,encodedDataLength:e.encodedDataLength});});
 if(process.env.TRACE==='1'){await cd.send('Tracing.start',{categories:'devtools.timeline,v8,blink.user_timing,disabled-by-default-v8.cpu_profiler',transferMode:'ReturnAsStream'});trace=true;}
 let status='not-started',data=null,snapshot=null,ua=null;
 try{const url=new URL(base);url.searchParams.set('ttpprof','1');url.searchParams.set('lowauto','0');url.searchParams.set('q','mobile');await p.goto(url.href,{waitUntil:'domcontentloaded',timeout:30000});status='loading';
 await p.waitForFunction(()=>window.__TTP?.marks.some(x=>x.name==='play-enabled'),null,{timeout});status='play-enabled';
 await p.screenshot({path:out+'-enabled.png',timeout:10000});await p.locator('#sgPlay').click({timeout:10000});
 const playStart=await p.evaluate(()=>performance.now());
 for(const sec of [0,3,10]){const elapsed=await p.evaluate(()=>performance.now());await p.waitForTimeout(Math.max(0,sec*1000-(elapsed-playStart)));await p.screenshot({path:out+`-plus${sec}.png`,timeout:10000});}
 const now=await p.evaluate(()=>performance.now());await p.waitForTimeout(Math.max(0,15000-(now-playStart)));
 }catch(e){errors.push(String(e));}
 try{({data,snapshot,ua}=await p.evaluate(()=>({data:window.__TTP?JSON.parse(window.__TTP.export()):null,snapshot:window.__TTP?.snapshot?.(),ua:navigator.userAgent})));}catch(e){errors.push(String(e));}
 let result={status,tier,sw,base,viewport:{width:960,height:540},timeout,errors,net,data,snapshot,ua};
 fs.writeFileSync(out+'.json',JSON.stringify(result,null,2));
 if(trace){try{const done=new Promise(r=>cd.once('Tracing.tracingComplete',r));await cd.send('Tracing.end');const e=await done;let text='';for(;;){const q=await cd.send('IO.read',{handle:e.stream});text+=q.data;if(q.eof)break;}await cd.send('IO.close',{handle:e.stream});fs.writeFileSync(out+'-trace.json',text);}catch(e){errors.push('trace export: '+e);fs.writeFileSync(out+'.json',JSON.stringify(result,null,2));}}
 console.log(JSON.stringify({status,tier,sw,marks:data?.marks,snapshot,errors}));
 await c.close();await b.close();
})();
