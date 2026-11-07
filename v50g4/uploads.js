// Cooperative budget: atomic driver calls/callbacks cannot be preempted.
// Tab v50g4 port: time comes from the shared per-frame budget (./budget.js), bytes stay per queue.
import { frameBudget, budgetLeft, budgetCharge } from './budget.js';
export function createUploadQueue(enabled) {
  const queue = [], B = frameBudget(2);
  const st = { pending: 0, bytes: 0, tasks: 0, maxTaskMs: 0, maxSliceMs: 0, oversize: 0, errors: 0 };
  let start = null, used = 0, spent = 0;
  const cap0 = 4 * 1024 * 1024; let cap = cap0;
  function begin() { start = null; used = spent = 0; cap = cap0 * Math.max(1, B.ms / 2); }   // bytes scale with the time budget (loading screen gets more)
  function allow(bytes = 0) {
    if (!enabled()) return true;
    if (budgetLeft(B) - (start === null ? 0 : performance.now() - start) <= 0 || (used && used + bytes > cap)) return false;
    if (bytes > cap) st.oversize++;
    used += bytes; st.bytes = used; return true;
  }
  function add(run, bytes = 0) {
    if (!enabled()) { run(); return; }
    queue.push({ run, bytes }); st.pending = queue.length;
  }
  function resume() { start = performance.now(); }
  function pause() { if (start !== null) { const d = performance.now() - start; spent += d; budgetCharge(B, d); } start = null; st.maxSliceMs = Math.max(st.maxSliceMs, spent); }
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
