const fs=require('node:fs');
const input=process.argv[2];if(!input)throw Error('node summarize.cjs run.json');
const r=JSON.parse(fs.readFileSync(input,'utf8')),d=r.data;
if(!d?.marks?.length)throw Error('FAIL: no instrumentation marks; never report an empty log as a successful profile');
const marks=d.marks.slice().sort((a,b)=>a.time-b.time), origin=marks.find(x=>x.name==='navigation-start')?.detail?.timeOrigin;
const resources=d.resources||[],tasks=d.tasks||[];
const phases=[{name:'pre-module',start:0}];
for(const n of ['module-body-start','G50-created','G50-force','G50-compile','G50-warm','G50-tex','G50-visit','G50-final','G50-ready','g50ready','play-enabled','play-click']){const m=marks.find(x=>x.name===n);if(m)phases.push({name:n,start:m.time});}
phases.sort((a,b)=>a.start-b.start);
const phaseAt=t=>{let p=phases[0];for(const q of phases)if(q.start<=t)p=q;return p.name;};
const groups=Object.fromEntries(phases.map(p=>[p.name,{cdpCompletedRequests:0,cdpCompletionBytes:0,resourceCompleted:0,resourceTransferSize:0,resourceEncodedBodySize:0,resourceDecodedBodySize:0}]));
const crossing=[],unmapped=[];
for(const x of resources){const start=x.startTime,end=x.responseEnd;if(!Number.isFinite(end))continue;const g=groups[phaseAt(end)];g.resourceCompleted++;for(const [a,b] of [['resourceTransferSize','transferSize'],['resourceEncodedBodySize','encodedBodySize'],['resourceDecodedBodySize','decodedBodySize']])g[a]+=x[b]||0;if(phaseAt(start)!==phaseAt(end))crossing.push({url:x.name,start,end,startPhase:phaseAt(start),completionPhase:phaseAt(end)});}
for(const x of r.net||[]){if(!Number.isFinite(x.encodedDataLength))continue;if(!Number.isFinite(x.wallTime)||!Number.isFinite(origin)){unmapped.push(x);continue;}const start=x.wallTime*1000-origin,end=start+(x.end-x.start)*1000;const g=groups[phaseAt(end)];g.cdpCompletedRequests++;g.cdpCompletionBytes+=x.encodedDataLength;}
const summary={status:r.status,ua:r.ua,sw:r.sw||'initial-run: allowed',marks,phaseCompletionBytes:groups,crossing,unmappedCDPCount:unmapped.length,longTasks:{count:tasks.length,totalMs:tasks.reduce((a,x)=>a+x.duration,0),maxMs:tasks.length?Math.max(...tasks.map(x=>x.duration)):null,largest:tasks.slice().sort((a,b)=>b.duration-a.duration).slice(0,10)},firstGameplayRAF:{count:d.frames?.length||0,maxGapMs:d.frames?.length?Math.max(...d.frames.map(x=>x.dt)):null},snapshot:r.snapshot||r.g50||null,limitations:['Bytes are charged to completion phase, not split by wire-time phase. Cross-boundary ResourceTiming entries are listed separately.','Service-worker-allowed CDP page target excludes some worker traffic; opaque/cached ResourceTiming fields can be zero. No count is physical total traffic without coverage checks.','An absent milestone/frame list is unobserved, never zero duration or a passing gameplay test.']};
fs.writeFileSync(input.replace(/\.json$/, '')+'-summary.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
