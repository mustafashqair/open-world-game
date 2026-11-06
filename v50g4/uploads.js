// Cooperative budget: atomic driver calls/callbacks cannot be preempted.
export function createUploadQueue(enabled) {
  const queue = [];
  const st = { pending: 0, bytes: 0, tasks: 0, maxTaskMs: 0, maxSliceMs: 0, oversize: 0, errors: 0 };
  let start = null, used = 0, spent = 0;
  const cap = 4 * 1024 * 1024;
  function begin() { start = null; used = spent = 0; }
  function allow(bytes = 0) {
    if (!enabled()) return true;
    if (spent + (start === null ? 0 : performance.now() - start) >= 2 || (used && used + bytes > cap)) return false;
    if (bytes > cap) st.oversize++;
    used += bytes; st.bytes = used; return true;
  }
  function add(run, bytes = 0) {
    if (!enabled()) { run(); return; }
    queue.push({ run, bytes }); st.pending = queue.length;
  }
  function resume() { start = performance.now(); }
  function pause() { if (start !== null) spent += performance.now() - start; start = null; st.maxSliceMs = Math.max(st.maxSliceMs, spent); }
  function pump() {
    resume();
    while (queue.length && allow(queue[0].bytes)) {
      const job = queue.shift(), t = performance.now();
      try { job.run(); } catch (e) { st.errors++; console.error('[v50g4 upload]', e); }
      st.maxTaskMs = Math.max(st.maxTaskMs, performance.now() - t); st.tasks++;
    }
    st.pending = queue.length; pause();
  }
  return { st, add, begin, pump, allow, resume, pause, get pending() { return queue.length; } };
}
