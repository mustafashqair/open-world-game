from pathlib import Path
import json
r=Path(__file__).parent/'repo'
def edit(f,old,new):
 p=r/f;s=p.read_text();assert old in s,(f,old[:100]);s=s.replace(old,new,1);p.write_text(s)
helper=r'''<script>
(function(){
  const q=new URLSearchParams(location.search); let preset='';
  try { preset=JSON.parse(localStorage.getItem('ow_settings2')||'{}').preset; }catch(e){}
  if(q.get('ttpprof')!=='1'||q.get('v50g5')==='0'||!['low','vlow'].includes(preset))return;
  const d=window.__TTP={version:1,preset,marks:[],tasks:[],resources:[],frames:[],samples:[],errors:[],emb:new Set(),embDone:new Set()};
  const seen=new Set();d.mark=(name,detail)=>{if(seen.has(name))return;seen.add(name);const time=name==='navigation-start'?0:performance.now();d.marks.push({name,time,detail});performance.mark('ttp:'+name,{detail,...(name==='navigation-start'?{startTime:0}:{})});};
  d.mark('navigation-start',{timeOrigin:performance.timeOrigin});d.marks[0].time=0;
  performance.setResourceTimingBufferSize(20000);
  try{new PerformanceObserver(l=>{for(const x of l.getEntries())d.tasks.push({start:x.startTime,duration:x.duration,attribution:x.attribution?.map(a=>({name:a.name,type:a.entryType,containerType:a.containerType,containerSrc:a.containerSrc,containerId:a.containerId,containerName:a.containerName}))});}).observe({type:'longtask',buffered:true});}catch(e){d.errors.push('longtask: '+e);}
  try{new PerformanceObserver(l=>{for(const x of l.getEntries())d.resources.push(x.toJSON());}).observe({type:'resource',buffered:true});}catch(e){d.errors.push('resource: '+e);}
  addEventListener('error',e=>d.errors.push(e.message));addEventListener('unhandledrejection',e=>d.errors.push(String(e.reason)));
  addEventListener('g50ready',()=>d.mark('g50ready'));addEventListener('g50play',()=>d.mark('play-click'));
  d.embStart=k=>{d.emb.add(k);d.mark('EMB42-decode-start');};
  d.embEnd=k=>{d.embDone.add(k);if(d.embDone.size===d.emb.size)d.mark('EMB42-parse-templates-end');};
  let last=0;function frame(t){const play=d.marks.find(m=>m.name==='play-click');if(play&&t-play.time<=15000)d.frames.push({time:t,dt:last?t-last:0});last=t;requestAnimationFrame(frame);}requestAnimationFrame(frame);
  d.export=()=>JSON.stringify({...d,emb:[...d.emb],embDone:[...d.embDone],navigation:performance.getEntriesByType('navigation').map(x=>x.toJSON())},null,2);
  new MutationObserver(()=>{const b=document.getElementById('sgPlay');if(b&&!b.disabled)d.mark('play-enabled');}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['disabled']});
})();
</script>
'''
edit('index.html','<head>','<head>\n'+helper)
edit('index.html','return r.text(); })))',"return r.text().then(t=>{ window.__TTP?.mark('code-part-'+i+'-fetched'); return t; }); })))")
edit('v50g3/code/part-000.txt','const Q4 =',"window.__TTP?.mark('module-body-start');\nconst Q4 =")
edit('v50g3/code/part-000.txt','const ready = Promise.all(Array.from({ length: N }',"window.__TTP?.mark('EMB42-start');\n  const ready = Promise.all(Array.from({ length: N }")
edit('v50g3/code/part-000.txt','then(bs => { const u = new Uint8Array(L);',"then(bs => { window.__TTP?.mark('EMB42-bodies-ready'); const u = new Uint8Array(L);")
edit('v50g3/code/part-000.txt','AB = u.buffer; return AB;',"AB = u.buffer; window.__TTP?.mark('EMB42-join-end'); return AB;")
edit('v50g3/code/part-000.txt','if (MODELS.ready) return; MODELS.ready = true;',"if (MODELS.ready) return; MODELS.ready = true; window.__TTP?.mark('MODELS-ready');")
# Queue every key before issuing any parse, so a synchronous callback cannot signal premature completion.
edit('v50g3/code/part-000.txt','EMB42.ready.then(() => { for (const k of Object.keys(MDEF)) {',"EMB42.ready.then(() => { for(const k of Object.keys(MDEF)) window.__TTP?.embStart(k); for (const k of Object.keys(MDEF)) {")
edit('v50g3/code/part-000.txt',"g => onLoad(k, d, g), err => onFail(k, err)","g => { onLoad(k, d, g); window.__TTP?.embEnd(k); }, err => { window.__TTP?.embEnd(k); onFail(k, err); }")
edit('v50g3/code/part-000.txt','TREESET.ready=true;',"TREESET.ready=true;window.__TTP?.mark('TREESET-ready');")
# Observe readiness without invoking cityReady an additional time.
edit('v50g3/code/part-000.txt',"function cityReady() { return ","function cityReady() { const ready = ")
edit('v50g3/code/part-000.txt',"performance.now() - CITY_GLB_T0 > 120000; }", "performance.now() - CITY_GLB_T0 > 120000; if(ready)window.__TTP?.mark('cityReady-first-observed',{timeout:performance.now()-CITY_GLB_T0>120000}); return ready; }")
edit('v50g3/code/part-001.txt',"chunks.set(k, { cx, cz, res, gr, mesh: m });", "chunks.set(k, { cx, cz, res, gr, mesh: m }); if(chunks.size>=12)window.__TTP?.mark('chunk-12-installed');")
edit('v50g3/code/part-001.txt',"const pct = Math.floor(LOADX.p * 100);", "if(LOADX.p>=0.999)window.__TTP?.mark('LOADX-0.999'); const pct = Math.floor(LOADX.p * 100);")
edit('v50g3/code/part-002.txt',"if (!plan && !fxReady()) { if (!tFx) tFx = RN();", "if (!plan && !fxReady()) { window.__TTP?.mark('WARM2-FX-wait-start'); if (!tFx) tFx = RN();")
edit('v50g3/code/part-002.txt','if (!plan) { plan = makePlan();',"if (!plan) { window.__TTP?.mark('WARM2-FX-wait-end'); window.__TTP?.mark('WARM2-start'); plan = makePlan();")
edit('v50g3/code/part-002.txt',"st.phase = 'done'; st.ms = Math.round(RN() - t0);","st.phase = 'done'; window.__TTP?.mark('WARM2-end'); st.ms = Math.round(RN() - t0);")
edit('v50g3/code/part-002.txt','window.G50 = api;',"window.__TTP?.mark('G50-created',{phase:st.phase}); if(window.__TTP)window.__TTP.snapshot=()=>({preset:S.preset,models:{loaded:MODELS.loaded,total:MODELS.total,ready:MODELS.ready},chunks:chunks.size,trees:{ready:TREESET.ready,loaded:TREESET.models.length,failed:TREESET.failed.length},load:{...LOADX},warm2:{...WARM2.st},g50:{...st},renderer:{memory:{...renderer.info.memory},render:{...renderer.info.render},programs:renderer.info.programs.length}}); window.G50 = api;")
edit('v50g3/code/part-002.txt','ph = st.phase = n; st.step = s;',"ph = st.phase = n; window.__TTP?.mark('G50-'+n); st.step = s;")
print('instrumented')
