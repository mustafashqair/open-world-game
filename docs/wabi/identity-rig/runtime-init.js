// Test-only deterministic clock/scheduler. Installed BEFORE navigation by run.mjs.
(() => {
  if (typeof window === 'undefined' || window.__DET_CLOCK) return;
  const q = new URLSearchParams(location.search), preset = q.get('detPreset');
  if (q.get('det') !== '1' || q.get('v50g5') === '0' || !['vlow','low'].includes(preset)) return;
  const native = { now: performance.now.bind(performance), random: Math.random, dateNow: Date.now,
    timeout: setTimeout.bind(window) };
  const epoch = 1700000000000, dt = 1000/30;
  let now = 0, seq = 0, seed = +(q.get('seed') || 123456789) >>> 0, frame = 0;
  const timers = new Map(), raf = new Map(), events=[];
  let ai=0, aa=0; const assets=new Map();
  let gameSeed=+(q.get('seed') || 123456789) >>> 0;
  const gameRandom=()=>{ gameSeed += 0x6D2B79F5; let t=gameSeed; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
  let issued=0, applied=0; const terrain=new Map(), waiters=[]; let ioError=null;
  const notify=()=>{if([...terrain.values(),...assets.values()].every(Boolean)) for(const r of waiters.splice(0)) r();};
  function random() { seed += 0x6D2B79F5; let t=seed; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }
  Math.random = random;
  Date.now = () => epoch + now;
  const NativeDate = Date;
  class TestDate extends NativeDate { constructor(...a) { super(...(a.length ? a : [epoch+now])); } static now() { return epoch+now; } }
  window.Date = TestDate;
  Object.defineProperty(performance,'now',{value:()=>now,configurable:true});
  Object.defineProperty(performance,'timeOrigin',{value:epoch,configurable:true});
  const later=(fn,ms,args,repeat)=>{ const id=++seq; timers.set(id,{id,fn,args,due:now+Math.max(1,+ms||0),repeat:repeat?Math.max(1,+ms||0):0}); return id; };
  window.setTimeout=(fn,ms,...args)=>later(fn,ms,args,false);
  window.setInterval=(fn,ms,...args)=>later(fn,ms,args,true);
  window.clearTimeout=window.clearInterval=id=>timers.delete(id);
  window.requestAnimationFrame=fn=>{const id=++seq;raf.set(id,fn);return id;};
  window.cancelAnimationFrame=id=>raf.delete(id);
  // getRandomValues/UUID are test values ONLY. Never use this mode for credentials.
  try { Object.defineProperty(crypto,'getRandomValues',{value:a=>{const b=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);for(let i=0;i<b.length;i++)b[i]=(random()*256)|0;return a;}});
    Object.defineProperty(crypto,'randomUUID',{value:()=> 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=(random()*16)|0;return(c==='x'?r:(r&3)|8).toString(16);} )});
  } catch(e){events.push({type:'crypto-uncontrolled',error:String(e)});}
  localStorage.clear();
  localStorage.setItem('ow_settings2',JSON.stringify({preset,auto:false}));
  localStorage.setItem('ow_quality','mobile');
  localStorage.setItem('ow_vlow_v50d3','1'); localStorage.setItem('ow_lowauto_v50d2','1');
  window.__DET_CLOCK={dt:1/30,native,events,version:3,random:gameRandom,
    assetTicket(label){const id=++ai;assets.set(id,null);events.push({type:'asset-request',id,label,frame});return id;},
    assetDone(id,fn){if(!assets.has(id))throw Error('unknown asset ticket');assets.set(id,fn);notify();},
    assetError(id,err){ioError='asset failed: '+String(err);assets.set(id,()=>{});notify();},
    terrainTicket(){const id=++issued;terrain.set(id,null);return id;},
    terrainDone(id,fn){if(!terrain.has(id))throw Error('unknown terrain ticket');terrain.set(id,fn);notify();},
    terrainError(id){ioError='terrain worker failed at ticket '+id;terrain.set(id,()=>{});notify();},
    async settle(){if(ioError)throw Error(ioError);await new Promise(r=>native.timeout(r,0));if(ioError)throw Error(ioError);},
    get assetPending(){return ai-aa;},get terrainPending(){return issued-applied;},get frame(){return frame;}, get now(){return now;},
    // Every call is one fixed simulation tick; native browser tasks flush between calls.
    tick(){ if(ioError)throw Error(ioError);
      // Commit completed async results in request-ticket order; never block ticks waiting for the tail of all I/O.
      while(applied<issued && terrain.get(applied+1)){const id=++applied,fn=terrain.get(id);terrain.delete(id);fn();}
      while(aa<ai && assets.get(aa+1)){const id=++aa,fn=assets.get(id);assets.delete(id);fn();}
      now+=dt;frame++;let count=0;
      for(;;){const t=[...timers.values()].filter(t=>t.due<=now).sort((a,b)=>a.due-b.due||a.id-b.id)[0];if(!t)break;
        if(++count>10000)throw Error('timer runaway');if(t.repeat)t.due+=t.repeat;else timers.delete(t.id);
        if(typeof t.fn!=='function')throw Error('string timer unsupported');t.fn(...t.args);}
      const callbacks=[...raf.entries()];raf.clear();for(const [,fn] of callbacks)fn(now);
      return {frame,now,timers:timers.size,raf:raf.size};},
    entropy(){return gameSeed>>>0;},log(type,value){events.push({frame,type,value});}
  };
})();
