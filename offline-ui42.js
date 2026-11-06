/* العالم المفتوح — زر «تنزيل للعب بدون نت» (PWA). v42: تنزيل حقيقي بالخلفية (Background Fetch): بيكمل لو سكّرت المتصفح، مع إشعار فيه شريط التقدم، وإشعار لما يخلص. لا يغيّر شيئاً في اللعبة نفسها. */
(function () {
  if (location.protocol === 'file:' || !('serviceWorker' in navigator) || !window.caches) return;
  var VER = 'v42', KEY = 'ow_offline_ok_' + VER, CACHE = 'ow-offline-v50g' /* v50b: نفس اسم كاش sw.js (كان ow-offline-v42 فينزل لكاش ما بيقراه الـ SW) */, BGID = 'ow-offline-' + VER, PEND = 'ow_offline_pending_' + VER, DONE = '__ow_offline_done_' + VER;
  function tier() { var s = null, q = null; try { s = localStorage.getItem('ow_quality'); } catch (e) {} try { q = new URLSearchParams(location.search).get('q'); } catch (e) {}
    if (q === 'high' || q === 'mobile') return q; if (s === 'high' || s === 'mobile') return s;
    try { var mm = function (x) { return !!(window.matchMedia && matchMedia(x).matches); };
      var touch = mm('(pointer:coarse)') || (navigator.maxTouchPoints > 0 && mm('(hover:none)')); var ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent || '');
      var small = Math.min(screen.width || innerWidth, screen.height || innerHeight) < 600; var mem = navigator.deviceMemory, hc = navigator.hardwareConcurrency; var weak = (mem && mem < 4) || (hc && hc < 4);
      return (touch || ua || small || weak) ? 'mobile' : 'high'; } catch (e) { return 'mobile'; } }
  var PHONE = tier() === 'mobile', LIST = PHONE ? 'assets-phone.json' : 'assets.json', MB0 = PHONE ? 202 : 260;
  var IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var STANDALONE = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || (window.matchMedia && matchMedia('(display-mode: fullscreen)').matches) || navigator.standalone === true;
  var ok = false; try { ok = localStorage.getItem(KEY) === '1'; } catch (e) {}
  var reg = navigator.serviceWorker.register('sw.js').catch(function () { return null; });
  var BGF = ('BackgroundFetchManager' in window);
  var S = { mode: BGF ? 'background' : 'page', events: 0, last: null, state: 'idle', missing: null, total: 0 };

  var css = '#owOff{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:2147483000;font:600 13px/1 Cairo,system-ui,sans-serif;direction:rtl;' +
    'background:rgba(18,32,58,.88);color:#f6dd95;border:1px solid #d7aa4c;border-radius:16px;padding:7px 12px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:opacity .6s}' +
    '#owOffP{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);direction:rtl;font-family:Cairo,system-ui,sans-serif}' +
    '#owOffP .b{background:#12203a;color:#f4ecd6;border:1px solid #d7aa4c;border-radius:14px;max-width:420px;width:90%;padding:18px 18px 14px;text-align:center;box-shadow:0 10px 40px #000a;max-height:90vh;overflow:auto}' +
    '#owOffP h3{margin:0 0 8px;color:#f6dd95;font-size:19px}#owOffP p{margin:6px 0;font-size:14px;line-height:1.6}' +
    '#owOffP .bar{height:12px;background:#2b2c2a;border-radius:6px;overflow:hidden;margin:12px 0 4px}#owOffP .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d7aa4c,#f6dd95);transition:width .3s}' +
    '#owOffP button{font:700 16px Cairo,system-ui,sans-serif;padding:10px 20px;border-radius:10px;border:0;background:#d7aa4c;color:#1b1b1b;margin:8px 4px 2px;cursor:pointer}' +
    '#owOffP button.x{background:#474845;color:#f4ecd6}#owOffP .h{font-size:13px;opacity:.85;text-align:right;background:#0c1729;border-radius:8px;padding:8px 10px;margin-top:10px;line-height:1.7}' +
    '#owOffP .m{font-size:12.5px;background:#0c1729;border-radius:8px;padding:7px 9px;margin-top:8px;line-height:1.6}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var chip = document.createElement('div'); chip.id = 'owOff';
  var pan = document.createElement('div'); pan.id = 'owOffP';
  var hint = IOS ? 'آيفون (Safari): اضغط زر المشاركة <b>⬆︎</b> تحت ← «إضافة إلى الشاشة الرئيسية» ← إضافة.' :
    'أندرويد (Chrome): اضغط القائمة <b>⋮</b> فوق ← «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق».';
  var hint2 = IOS ? 'أندرويد (Chrome): القائمة ⋮ ← «إضافة إلى الشاشة الرئيسية».' : 'آيفون (Safari): زر المشاركة ⬆︎ ← «إضافة إلى الشاشة الرئيسية».';
  var modeLine = BGF ? '✓ التنزيل بيصير بالخلفية: بيكمل لو طلعت من الصفحة أو سكّرت المتصفح، وبيطلعلك إشعار فيه شريط التقدم، وإشعار لما يخلص.'
    : '⚠︎ هالمتصفح ما بيدعم التنزيل بالخلفية (متل Safari على الآيفون وFirefox): خلي الصفحة مفتوحة لحتى يخلص التنزيل، وإذا سمحت بالإشعارات بيطلعلك إشعار لما يخلص.';
  pan.innerHTML = '<div class="b"><h3>اللعب بدون نت</h3><p id="owOffS"></p><div class="bar"><i id="owOffG"></i></div><p id="owOffN" style="font-size:12px;opacity:.8"></p>' +
    '<button id="owOffGo">تنزيل للعب بدون نت</button><button class="x" id="owOffX">إغلاق</button><div class="m" id="owOffM">' + modeLine + '</div>' +
    '<div class="h"><b>بعد التنزيل أضِف اللعبة للشاشة الرئيسية</b> وافتحها من الأيقونة، بتشتغل حتى بلا إنترنت:<br>• ' + hint + '<br>• ' + hint2 + '</div></div>';
  function $(id) { return document.getElementById(id); }
  var MB = function (b) { return Math.round(b / 1048576); };
  function idle() { $('owOffS').innerHTML = 'ينزّل اللعبة كاملة على جهازك مرة وحدة (حوالي <b>' + MB0 + '</b> ميغابايت، الأفضل على واي فاي)، وبعدها بتشتغل بدون إنترنت.'; }
  function ready() { ok = true; try { localStorage.setItem(KEY, '1'); localStorage.removeItem(PEND); } catch (e) {} S.state = 'done';
    chip.textContent = 'جاهز ✓ بدون نت'; $('owOffS').innerHTML = '<b style="color:#8fe39a">جاهز ✓ بدون نت</b><br>اللعبة محفوظة على جهازك.'; $('owOffG').style.width = '100%'; var tt = (S.last && S.last.total) || 0; if (tt) $('owOffN').textContent = MB(tt) + ' / ' + MB(tt) + ' MB  (100%)'; $('owOffGo').textContent = 'تحديث التنزيل'; $('owOffGo').disabled = false; busy = false; }
  function prog(done, total, extra) { S.events++; S.last = { done: done, total: total, t: Date.now() };
    var pc = total ? Math.min(100, 100 * done / total) : 0; $('owOffG').style.width = pc.toFixed(1) + '%';
    $('owOffN').textContent = MB(done) + ' / ' + MB(total) + ' MB  (' + Math.floor(pc) + '%)' + (extra || ''); chip.textContent = 'جاري التنزيل… ' + Math.floor(pc) + '%'; }
  var busy = false;
  function show() { pan.style.display = 'flex'; }
  function hide() { pan.style.display = 'none'; }
  async function missingList(c) {
    var list = await (await fetch(LIST, { cache: 'no-store' })).json(), miss = [], have = 0, total = 0;
    for (var k = 0; k < list.length; k++) { var url = new URL(list[k][0], location.href).href; total += list[k][1]; if (await c.match(url, { ignoreSearch: true })) have += list[k][1]; else miss.push([url, list[k][1]]); }
    S.missing = miss.length; S.total = total; return { miss: miss, have: have, total: total, n: list.length };
  }
  function watch(r, have, total) {   // تقدّم التنزيل بالخلفية داخل الصفحة
    var upd = function () { prog(have + r.downloaded, total, '  — بالخلفية'); if (r.result === 'failure') { S.state = 'failed:' + r.failureReason; $('owOffS').textContent = 'التنزيل وقف (' + (r.failureReason || 'خطأ') + '). الملفات يلي نزلت محفوظة، وبيكمل الباقي لحاله لما تفتح اللعبة مرة تانية أو تضغط الزر.'; chip.textContent = 'تنزيل للعب بدون نت'; busy = false; $('owOffGo').disabled = false; } };
    r.addEventListener('progress', upd); upd();
  }
  async function viaBackground(sw, m) {
    var bf = sw.backgroundFetch, r = await bf.get(BGID);
    if (!r) {
      var dl = Math.ceil(m.miss.reduce(function (a, x) { return a + (x[1] || 524288); }, 0) * 1.02) + 65536;   // هامش صغير: Chrome بيلغي التنزيل إذا تجاوز الحجم المعلن
      r = await bf.fetch(BGID, m.miss.map(function (x) { return x[0]; }), { title: 'العالم المفتوح — تنزيل للعب بدون نت', downloadTotal: dl,
        icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }] });
    }
    S.state = 'background'; S.bgId = r.id; $('owOffS').textContent = 'جاري التنزيل بالخلفية… فيك تطلع من الصفحة أو تسكّر المتصفح، التنزيل بيكمل وبيطلعلك إشعار.';
    watch(r, m.have, m.total);
  }
  async function viaPage(c, m) {
    try { if (window.Notification && Notification.permission === 'default') await Notification.requestPermission(); } catch (e) {}
    S.state = 'page'; $('owOffS').textContent = 'جاري التنزيل… خلي الصفحة مفتوحة';
    var done = m.have, bad = [], i = 0, list = m.miss;
    async function one() { while (i < list.length) { var it = list[i++], url = it[0], good = false;
        for (var t = 0; t < 3 && !good; t++) { try { var r = await fetch(url, { cache: 'reload' }); if (r.ok) { if (r.redirected) r = new Response(await r.blob(), { status: 200, headers: r.headers }); await c.put(url, r); good = true; } } catch (e) {} }
        if (!good) bad.push(url); done += it[1]; prog(done, m.total); } }
    await Promise.all([one(), one(), one(), one()]);
    if (bad.length) { S.state = 'page-incomplete'; $('owOffS').textContent = 'ما كمل التنزيل (' + bad.length + ' ملف). تأكد من النت واضغط مرة ثانية، بيكمل من وين وقف.'; chip.textContent = 'تنزيل للعب بدون نت'; busy = false; $('owOffGo').disabled = false; return; }
    ready(); try { if (window.Notification && Notification.permission === 'granted') { var sw = await navigator.serviceWorker.ready; sw.showNotification('العالم المفتوح جاهزة ✓', { body: 'اللعبة نزلت كاملة، بتشتغل هلق بدون إنترنت.', icon: 'icon-192.png', tag: BGID }); } } catch (e) {}
  }
  async function run(auto) {
    if (busy) return; busy = true; $('owOffGo').disabled = true; chip.textContent = 'جاري التنزيل…';
    try {
      try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
      await reg; var sw = await navigator.serviceWorker.ready, c = await caches.open(CACHE);
      var m = await missingList(c); prog(m.have, m.total);
      if (!m.miss.length) { ready(); return; }
      try { localStorage.setItem(PEND, '1'); } catch (e) {}
      if (BGF && sw.backgroundFetch) { try { await viaBackground(sw, m); return; } catch (e) { console.warn('[offline] background fetch غير متاح، تنزيل داخل الصفحة', e); S.bgErr = String(e && e.message || e); $('owOffM').textContent = '⚠︎ التنزيل بالخلفية ما زبط هون (' + S.bgErr + ')، عم ينزل داخل الصفحة: خليها مفتوحة.'; } }
      await viaPage(c, m);
    } catch (e) { $('owOffS').textContent = 'خطأ: ' + (e && e.message || e) + ' — جرّب مرة ثانية.'; chip.textContent = 'تنزيل للعب بدون نت'; busy = false; $('owOffGo').disabled = false; }
  }
  navigator.serviceWorker.addEventListener('message', function (e) { var d = e.data || {}; if (d.ow === 'bgf-done') { S.swDone = d; if (!d.missing) ready(); else { busy = false; run(true); } } else if (d.ow === 'bgf-fail') { S.swFail = d; } });
  async function resumeCheck() {   // تنزيل وقف قبل (فشل/إلغاء/سكّرت قبل ما يخلص) ← نكمّل الملفات الناقصة بس
    try { var c = await caches.open(CACHE); if (await c.match(DONE)) { if (!ok) ready(); return; }
      var pend = false; try { pend = localStorage.getItem(PEND) === '1'; } catch (e) {}
      var sw = await navigator.serviceWorker.ready; var r = BGF && sw.backgroundFetch ? await sw.backgroundFetch.get(BGID) : null;
      if (r) { busy = true; $('owOffGo').disabled = true; var m = await missingList(c); S.state = 'background'; watch(r, m.total - r.downloadTotal, m.total); return; }
      if (pend && !ok) run(true);
    } catch (e) {}
  }
  function mount() {
    document.body.appendChild(chip); document.body.appendChild(pan);
    chip.onclick = show; $('owOffX').onclick = hide; $('owOffGo').onclick = function () { run(false); }; pan.onclick = function (e) { if (e.target === pan) hide(); };
    idle(); chip.textContent = '⬇ تنزيل للعب بدون نت';
    if (ok) { ready(); setTimeout(function () { chip.style.opacity = '0'; setTimeout(function () { chip.style.display = 'none'; }, 700); }, STANDALONE ? 2500 : 6000); }
    window.__owOffline = { run: run, show: show, phone: PHONE, ready: function () { return ok; }, S: S, bgf: BGF };
    setTimeout(resumeCheck, 4000);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
