import crypto from 'node:crypto';
export function canonical(v) { if (typeof v === 'number') {if(!Number.isFinite(v)) return {'$number':String(v)};if(Object.is(v,-0))return {'$number':'-0'};}
  if(Array.isArray(v))return v.map(canonical); if(v && typeof v==='object')return Object.fromEntries(Object.keys(v).sort().filter(k=>v[k]!==undefined).map(k=>[k,canonical(v[k])])); return v; }
export const hash = v => crypto.createHash('sha256').update(JSON.stringify(canonical(v))).digest('hex');
export function firstDiff(a,b,path='$') {if(Object.is(a,b))return null;if(typeof a!==typeof b||a===null||b===null)return {path,a,b};
 if(Array.isArray(a)||Array.isArray(b)){if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length)return{path:path+'.length',a:a?.length,b:b?.length};for(let i=0;i<a.length;i++){const d=firstDiff(a[i],b[i],`${path}[${i}]`);if(d)return d;}return null;}
 if(typeof a==='object'){for(const k of [...new Set([...Object.keys(a),...Object.keys(b)])].sort()){const d=firstDiff(a[k],b[k],`${path}.${k}`);if(d)return d;}return null;} return{path,a,b}; }
export function coverage(rows,scenario) { if(rows.length<2)throw Error('empty/short trace');for(const r of rows){const s=r.state;if(!s?.player||!s?.camera||!Array.isArray(s.npc))throw Error('missing schema');for(const k of ['npc','wolf','animal','fauna','bandit','vehicle'])if(!Array.isArray(s[k]))throw Error('missing entity category: '+k);if(!Number.isFinite(s.player.x)||!Number.isFinite(s.player.z))throw Error('invalid player');}
 const peak=k=>Math.max(...rows.map(r=>r.state[k]?.length||0));if(peak('npc')===0)throw Error('no NPCs hashed');
 if(scenario==='wild'&&(peak('wolf')===0||peak('bandit')===0))throw Error('wild scenario did not cover both wolves and bandits');
 return Object.fromEntries(['npc','wolf','animal','fauna','bandit','vehicle'].map(k=>[k,peak(k)])); }
export function compare(a,b) {if(!Array.isArray(a)||!Array.isArray(b)||a.length<2||b.length<2)return {status:'inconclusive',reason:'empty/short trace'};coverage(a,'generic');coverage(b,'generic');if(a.length!==b.length)return {status:'different',reason:'trace-length',a:a.length,b:b.length};
 for(let i=0;i<a.length;i++){const d=firstDiff(canonical(a[i]),canonical(b[i]));if(d)return{status:'different',sample:i,frame:a[i].tick,...d};}return {status:'sampled-state-match',samples:a.length}; }
