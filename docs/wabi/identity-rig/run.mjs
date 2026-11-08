import fs from 'node:fs/promises';import path from 'node:path';import http from 'node:http';import {spawnSync} from 'node:child_process';
import {chromium} from 'playwright';import {hash,compare,coverage,canonical} from './compare.mjs';
const argv=process.argv.slice(2), get=(k,d)=>argv.includes(k)?argv[argv.indexOf(k)+1]:d;
const repo=path.resolve(get('--repo','../repo')), out=path.resolve(get('--out','results')), smoke=argv.includes('--smoke');
const frames=+(get('--frames',smoke?'90':'1800')), every=+(get('--every','1'));
if(!Number.isInteger(frames)||frames<30||!Number.isInteger(every)||every<1)throw Error('invalid frames/every');
const variants=get('--variants','base,pr26,pr29,gc6').split(','), presets=get('--presets','vlow,low').split(','), scenarios=get('--scenarios','village,city,wild').split(',');
if(!variants.includes('base'))throw Error('base is required');
const init=await fs.readFile(new URL('./runtime-init.js',import.meta.url),'utf8');await fs.mkdir(out,{recursive:true});
const base='65fc5d3628908efc89ecac7496f2b93998bf6c53', refs={base,pr26:'73206f73a0a21752a17f8b6ea90464d9181c6bcb',pr29:'acc445651d1a5d7dc6a3bb48134da84d67cc7e55'};
const gc=['a3d860cb224a28fb48afdfebb3196d2438df9497','445f76d44389ede13fe012ab71e40f4c0171a7c5','bfafb78288610e732c359a1c0ad3e2a9a55f2a14','34dcf17a022c90e4fa40a8a8e7349ea03624ca97','7d3f29639d1f40131d363e6d9ce2ad56878e027e'];
const git=(...a)=>{const r=spawnSync('git',['-C',repo,...a],{encoding:'utf8',maxBuffer:100*1024*1024});if(r.status)throw Error(r.stderr);return r.stdout;};
// Use source overlays in scratch copies; never touch caller's branch. Fetch is explicit with --fetch.
if(argv.includes('--fetch'))for(const n of [26,29,33,34,35,36,37])git('fetch','origin',`pull/${n}/head:refs/det/pr${n}`);
const buildRoot=path.join(out,'builds');await fs.mkdir(buildRoot,{recursive:true});
for(const v of variants){const d=path.join(buildRoot,v);await fs.mkdir(d,{recursive:true});
 if(v==='gc6'){git('worktree','add','--detach',d,base);for(const ref of gc){const p=git('diff',`${ref}^`,ref,'--','v50g3/code');const r=spawnSync('git',['-C',d,'apply','--index','-'],{input:p,encoding:'utf8'});if(r.status)throw Error(`gc6 compose conflict: ${r.stderr}`);}}
 else {const ref=refs[v]||v;for(const f of ['part-000.txt','part-001.txt','part-002.txt']){const s=git('show',`${ref}:v50g3/code/${f}`);await fs.writeFile(path.join(d,f),s);}}
}
// Apply harness patch to each source through git apply in a temporary source directory.
const patch=await fs.readFile(new URL('./det1.patch',import.meta.url),'utf8');
for(const v of variants){const d=path.join(buildRoot,v),src=v==='gc6'?d:path.join(d,'src');await fs.mkdir(path.join(src,'v50g3/code'),{recursive:true});
 if(v!=='gc6')for(const f of ['part-000.txt','part-001.txt','part-002.txt'])await fs.copyFile(path.join(d,f),path.join(src,'v50g3/code',f));
 const r=spawnSync('git',['apply','--unsafe-paths','--directory='+src,'-'],{input:patch,encoding:'utf8',cwd:'/'});if(r.status)throw Error(`${v} harness patch conflict (not silently rewritten): ${r.stderr}`);
}
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.txt':'text/plain','.wasm':'application/wasm','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg'};
let activeVariant='base';
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost'),p=decodeURIComponent(u.pathname).split('/').filter(Boolean),v=activeVariant;const rel=p.join('/')||'index.html';if(rel.includes('..'))throw Error('bad path');
 const overlay=path.join(buildRoot,v,v==='gc6'?'':'src',rel);let bytes;try{if(rel.startsWith('v50g3/code/'))bytes=await fs.readFile(overlay);else throw 0;}catch{bytes=await fs.readFile(path.join(repo,rel));}
 res.setHeader('Content-Type',types[path.extname(rel)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(bytes);}catch(e){res.statusCode=404;res.end(String(e));}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-dev-shm-usage']});
async function run(v,preset,scenario,rep){const name=`${v}-${preset}-${scenario}-${rep}`,context=await browser.newContext({viewport:{width:960,height:540},deviceScaleFactor:1,ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await context.addInitScript({content:init});const page=await context.newPage(),errors=[],requests=[],consoleErrors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});page.on('requestfailed',r=>requests.push({url:r.url(),error:r.failure()?.errorText}));
 page.on('response',r=>{if(r.status()>=400)requests.push({url:r.url(),status:r.status()});});
 const evaluate=fn=>Promise.race([page.evaluate(fn),new Promise((_,reject)=>{const t=setTimeout(()=>reject(Error('page evaluation exceeded 120 s; no identity verdict')),120000);t.unref();})]);
 const rows=[],result={name,status:'incomplete',errors,requests,consoleErrors,frames,every,scope:'fixed-step test-mode sampled state; not production/visual identity'};
 try{activeVariant=v;await page.goto(`http://127.0.0.1:${port}/?det=1&detPreset=${preset}&seed=123456789&q=mobile`,{waitUntil:'domcontentloaded',timeout:60000});
 // Do not wait for the game adapter before ticking: the adapter is created near the end of boot, and controlled time must advance first.
 let ready=false;const start=Date.now();for(let n=0;n<9000&&Date.now()-start<+(get('--boot-ms','240000'));n++){if(n%30===0)await fs.writeFile(path.join(out,name+'-progress.json'),JSON.stringify({stage:'boot',tick:n,errors,requests,consoleErrors}));await page.waitForTimeout(1); await evaluate(()=>window.__DET_CLOCK?.tick());if(n%10===0){await page.waitForTimeout(5);ready=await evaluate(()=>!!(window.__DET_GAME&&window.G50?.st?.ready&&window.SG50?.ready()));if(ready)break;if(errors.length)throw Error('page error during boot: '+errors[0]);}}
 if(!ready){result.boot=await evaluate(()=>({clock:window.__DET_CLOCK&&{frame:__DET_CLOCK.frame,now:__DET_CLOCK.now},module:!!window.__ow,game:!!window.__DET_GAME,g50:window.G50?.st,body:document.body.innerText.slice(-1000)}));throw Error('boot did not reach G50 ready under controlled scheduler');}
 // Use existing play method, not bypass any readiness gate.
 const played=await evaluate(()=>{window.SG50.play();return window.G50.st.played;});if(!played)throw Error('G50.play refused');
 for(let n=0;n<60;n++){await page.waitForTimeout(1);await evaluate(()=>window.__DET_CLOCK.tick());}
 const anchors=await page.evaluate(()=>window.__DET_GAME.anchors());let anchor;
 if(scenario==='village')anchor=[...anchors.village].sort((a,b)=>(a.x-anchors.spawn.x)**2+(a.z-anchors.spawn.z)**2-((b.x-anchors.spawn.x)**2+(b.z-anchors.spawn.z)**2))[0];
 else if(scenario==='city')anchor=anchors.city;else if(scenario==='wild')anchor=anchors.wild[0];else throw Error('unknown scenario');
 if(!anchor)throw Error('scenario has no world anchor');result.anchor=anchor;
 await page.evaluate(({x,z})=>window.__DET_GAME.start(x,z),anchor);
 for(let f=0;f<=frames;f++){if(f%every===0||f===frames){const state=await page.evaluate(()=>window.__DET_GAME.snapshot());rows.push({tick:f,state});}
  if(f===frames)break;await page.waitForTimeout(1);await page.evaluate(f=>{window.__DET_GAME.input(f<600?{KeyW:true}:f<1200?{KeyD:true}:{KeyS:true});window.__DET_CLOCK.tick();},f);}
 if(errors.length||requests.length)throw Error('page or network failure invalidates trace');result.coverage=coverage(rows,scenario);result.status='recorded';result.hash=hash(rows);result.entropyWarnings=await page.evaluate(()=>window.__DET_CLOCK.events);
 }catch(e){result.reason=String(e);}finally{await fs.writeFile(path.join(out,name+'.json'),JSON.stringify(canonical({result,rows}),null,2));await Promise.race([context.close(),new Promise(r=>setTimeout(r,5000))]);}console.log(JSON.stringify({...result,errors:errors.slice(0,5),consoleErrors:consoleErrors.slice(0,5)}));return{result,rows};}
const report={format:1,base,refs,gc,comparisons:[],limitations:['Native async image decode, worker message delivery and external modules are not fully ordered. Reproducibility is a prerequisite, never assumed.','Snapshots cover scalar simulation state and selected nested AI data, not all hidden closure/animation state. No complete behavioural proof claimed.']};
try{for(const preset of presets)for(const scenario of scenarios){const a=await run('base',preset,scenario,1),b=await run('base',preset,scenario,2);const reproducible=a.result.status==='recorded'&&b.result.status==='recorded'?compare(a.rows,b.rows):{status:'inconclusive',reason:'baseline run incomplete'};
 report.comparisons.push({preset,scenario,pair:'base-repeat',...reproducible});for(const v of variants.filter(v=>v!=='base')){if(reproducible.status!=='sampled-state-match'){report.comparisons.push({preset,scenario,pair:`base-${v}`,status:'not-run',reason:'baseline reproducibility prerequisite failed'});continue;}const c=await run(v,preset,scenario,1);report.comparisons.push({preset,scenario,pair:`base-${v}`,...(c.result.status==='recorded'?compare(a.rows,c.rows):{status:'inconclusive',reason:c.result.reason})});}
 await fs.writeFile(path.join(out,'summary.json'),JSON.stringify(report,null,2));}}finally{await Promise.race([browser.close(),new Promise(r=>setTimeout(r,5000))]);server.closeAllConnections();server.close();}
