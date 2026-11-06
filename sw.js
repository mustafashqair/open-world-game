/* العالم المفتوح — offline service worker: cache-first for everything on this site */
const CACHE = 'ow-offline-v50g2';
const CORE = ["./", "manifest.webmanifest", "offline-ui42.js", "icon-192.png", "icon-512.png", "v50g2/code/part-000.txt", "v50g2/code/part-001.txt", "v50g2/code/part-002.txt", "v50g2/menu1.jpg", "v50g2/menu2.jpg", "v42/emb/e-000.txt", "v42/emb/e-001.txt", "v42/emb/e-002.txt", "v42/emb/e-003.txt", "v42/emb/e-004.txt", "v42/emb/e-005.txt", "v42/emb/e-006.txt", "v42/emb/e-007.txt", "v42/emb/e-008.txt", "v42/emb/e-009.txt", "v42/emb/e-010.txt", "v42/emb/e-011.txt", "v42/emb/e-012.txt", ];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})); });
/* v50d: الترقية ما عادت توقّف فتح اللعبة: التفعيل بس بياخد الصفحات وبيعيد تحميلها مرة وحدة فوراً؛ نسخ الملفات من الكاش القديم بيصير بالخلفية، ولحد ما يخلص الطلبات بتنجاب من الكاش القديم */
const SKIP = /\/(index\.html|sw\.js|offline-ui\.js|manifest\.webmanifest|assets(-phone)?\.json)$|\/v\w+\/code\/|\/$/;
let OLDC = null, MIG = null;
async function oldCaches() { if (!OLDC) OLDC = (await caches.keys()).filter(k => k.startsWith('ow-offline-') && k !== CACHE); return OLDC; }
function migrate() { return MIG || (MIG = (async () => { const ks = await oldCaches(); if (!ks.length) return; const nc = await caches.open(CACHE);
    await new Promise(r => setTimeout(r, 30000));   /* اللعبة بتفتح أول شي، والنسخ بعدين على مهل */
    for (const k of ks) { try { if (!(await caches.has(k))) continue; const oc = await caches.open(k); const rs = await oc.keys(); rs.sort((a, b) => (/__ow_offline_done/.test(b.url) ? 1 : 0) - (/__ow_offline_done/.test(a.url) ? 1 : 0));
        for (const rq of rs) { const u = new URL(rq.url); if (SKIP.test(u.pathname) || await nc.match(rq)) continue; const r = await oc.match(rq); if (r) await nc.put(rq, r); await new Promise(z => setTimeout(z, 4)); } await caches.delete(k); } catch (e) { MIG = null; return; } }
    OLDC = []; })()); }
self.addEventListener('activate', e => { e.waitUntil((async () => { const upg = (await oldCaches()).length > 0; await self.clients.claim();
    if (upg) for (const cl of await self.clients.matchAll({ type: 'window' })) { try { await cl.navigate(cl.url); } catch (e) {} } })()); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url); if (u.origin !== location.origin) return;
  if (OLDC === null || OLDC.length) { try { e.waitUntil(oldCaches().then(o => o.length ? migrate() : null).catch(() => {})); } catch (x) {} }
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    const olds = await oldCaches(); if (olds.length && !SKIP.test(u.pathname)) for (const k of olds) { try { const r = await caches.match(req, { ignoreSearch: true, cacheName: k }); if (r) return r; } catch (x) {} }
    try { const r = await fetch(req); if (r && r.ok && r.status === 200 && !r.redirected) { const key = u.origin + u.pathname; c.put(key, r.clone()).catch(() => {}); } return r; }
    catch (err) { if (req.mode === 'navigate') { const idx = (await c.match(new URL('./', self.registration.scope).href)) || (await c.match(new URL('index.html', self.registration.scope).href)); if (idx) return idx; } throw err; }
  })());
});

/* v42: تنزيل بالخلفية (Background Fetch) — لما يخلص بنحط كل الملفات بالكاش، وبنحدّث الإشعار، وإذا فشل/انلغى بنحفظ يلي نزل والباقي بيكمل بالفتحة الجاية */
async function owStore(reg) { const c = await caches.open(CACHE); let n = 0, bytes = 0, bad = 0;
  for (const rec of await reg.matchAll()) { try { const r = await rec.responseReady; if (r && r.ok) { const u = new URL(rec.request.url); const b = await r.clone().arrayBuffer(); await c.put(u.origin + u.pathname, new Response(b, { status: 200, headers: r.headers })); n++; bytes += b.byteLength; } else bad++; } catch (e) { bad++; } }
  return { n, bytes, bad }; }
async function owTell(msg) { for (const cl of await self.clients.matchAll({ includeUncontrolled: true })) cl.postMessage(msg); }
self.addEventListener('backgroundfetchsuccess', e => { e.waitUntil((async () => { const s = await owStore(e.registration);
  if (!s.bad) { const c = await caches.open(CACHE); await c.put(new URL('__ow_offline_done_v42', self.registration.scope).href, new Response('1')); }
  try { await e.updateUI({ title: s.bad ? 'العالم المفتوح: نزل ' + s.n + ' ملف، ناقص ' + s.bad + ' — افتح اللعبة ليكمل' : 'العالم المفتوح جاهزة للعب بدون نت ✓' }); } catch (x) {}
  await owTell({ ow: 'bgf-done', n: s.n, bytes: s.bytes, missing: s.bad }); })()); });
self.addEventListener('backgroundfetchfail', e => { e.waitUntil((async () => { const s = await owStore(e.registration);
  try { await e.updateUI({ title: 'العالم المفتوح: التنزيل ما كمل (' + s.n + ' ملف نزل) — افتح اللعبة ليكمل الباقي' }); } catch (x) {}
  await owTell({ ow: 'bgf-fail', n: s.n, bytes: s.bytes, reason: e.registration.failureReason }); })()); });
self.addEventListener('backgroundfetchabort', e => { e.waitUntil((async () => { const s = await owStore(e.registration); await owTell({ ow: 'bgf-fail', n: s.n, bytes: s.bytes, reason: 'aborted' }); })()); });
self.addEventListener('backgroundfetchclick', e => { e.waitUntil(self.clients.openWindow('./')); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.openWindow('./')); });
