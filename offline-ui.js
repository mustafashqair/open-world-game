/* العالم المفتوح — زر «تنزيل للعب بدون نت» (PWA). لا يغيّر شيئاً في اللعبة نفسها. */
(function () {
  if (location.protocol === 'file:' || !('serviceWorker' in navigator) || !window.caches) return;
  var VER = 'v41', KEY = 'ow_offline_ok_' + VER, CACHE = 'ow-offline-' + VER;
  var MB_FULL = 260, MB_PHONE = 202;
  function tier() { var s = null, q = null; try { s = localStorage.getItem('ow_quality'); } catch (e) {} try { q = new URLSearchParams(location.search).get('q'); } catch (e) {}
    if (q === 'high' || q === 'mobile') return q; if (s === 'high' || s === 'mobile') return s;
    try { var mm = function (x) { return !!(window.matchMedia && matchMedia(x).matches); };
      var touch = mm('(pointer:coarse)') || (navigator.maxTouchPoints > 0 && mm('(hover:none)')); var ua = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(navigator.userAgent || '');
      var small = Math.min(screen.width || innerWidth, screen.height || innerHeight) < 600; var mem = navigator.deviceMemory, hc = navigator.hardwareConcurrency; var weak = (mem && mem < 4) || (hc && hc < 4);
      return (touch || ua || small || weak) ? 'mobile' : 'high'; } catch (e) { return 'mobile'; } }
  var PHONE = tier() === 'mobile';
  var IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var STANDALONE = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || (window.matchMedia && matchMedia('(display-mode: fullscreen)').matches) || navigator.standalone === true;
  var ok = false; try { ok = localStorage.getItem(KEY) === '1'; } catch (e) {}
  var reg = navigator.serviceWorker.register('sw.js').catch(function () {});

  var css = '#owOff{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:2147483000;font:600 13px/1 Cairo,system-ui,sans-serif;direction:rtl;' +
    'background:rgba(18,32,58,.88);color:#f6dd95;border:1px solid #d7aa4c;border-radius:16px;padding:7px 12px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:opacity .6s}' +
    '#owOffP{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);direction:rtl;font-family:Cairo,system-ui,sans-serif}' +
    '#owOffP .b{background:#12203a;color:#f4ecd6;border:1px solid #d7aa4c;border-radius:14px;max-width:420px;width:90%;padding:18px 18px 14px;text-align:center;box-shadow:0 10px 40px #000a;max-height:90vh;overflow:auto}' +
    '#owOffP h3{margin:0 0 8px;color:#f6dd95;font-size:19px}#owOffP p{margin:6px 0;font-size:14px;line-height:1.6}' +
    '#owOffP .bar{height:12px;background:#2b2c2a;border-radius:6px;overflow:hidden;margin:12px 0 4px}#owOffP .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d7aa4c,#f6dd95)}' +
    '#owOffP button{font:700 16px Cairo,system-ui,sans-serif;padding:10px 20px;border-radius:10px;border:0;background:#d7aa4c;color:#1b1b1b;margin:8px 4px 2px;cursor:pointer}' +
    '#owOffP button.x{background:#474845;color:#f4ecd6}#owOffP .h{font-size:13px;opacity:.85;text-align:right;background:#0c1729;border-radius:8px;padding:8px 10px;margin-top:10px;line-height:1.7}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var chip = document.createElement('div'); chip.id = 'owOff';
  var pan = document.createElement('div'); pan.id = 'owOffP';
  var hint = IOS ? 'آيفون (Safari): اضغط زر المشاركة <b>⬆︎</b> تحت ← «إضافة إلى الشاشة الرئيسية» ← إضافة.' :
    'أندرويد (Chrome): اضغط القائمة <b>⋮</b> فوق ← «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق».';
  var hint2 = IOS ? 'أندرويد (Chrome): القائمة ⋮ ← «إضافة إلى الشاشة الرئيسية».' : 'آيفون (Safari): زر المشاركة ⬆︎ ← «إضافة إلى الشاشة الرئيسية».';
  pan.innerHTML = '<div class="b"><h3>اللعب بدون نت</h3><p id="owOffS"></p><div class="bar"><i id="owOffG"></i></div><p id="owOffN" style="font-size:12px;opacity:.8"></p>' +
    '<button id="owOffGo">تنزيل للعب بدون نت</button><button class="x" id="owOffX">إغلاق</button>' +
    '<div class="h"><b>بعد التنزيل أضِف اللعبة للشاشة الرئيسية</b> وافتحها من الأيقونة، بتشتغل حتى بلا إنترنت:<br>• ' + hint + '<br>• ' + hint2 + '</div></div>';
  function $(id) { return document.getElementById(id); }
  function idle() { $('owOffS').innerHTML = 'ينزّل اللعبة كاملة على جهازك مرة وحدة (حوالي <b>' + (PHONE ? MB_PHONE : MB_FULL) + '</b> ميغابايت، الأفضل على واي فاي)، وبعدها بتشتغل بدون إنترنت.'; }
  function ready() { chip.textContent = 'جاهز ✓ بدون نت'; $('owOffS').innerHTML = '<b style="color:#8fe39a">جاهز ✓ بدون نت</b><br>اللعبة محفوظة على جهازك.'; $('owOffG').style.width = '100%'; $('owOffGo').textContent = 'تحديث التنزيل'; }
  var busy = false;
  function show() { pan.style.display = 'flex'; }
  function hide() { pan.style.display = 'none'; }
  async function run() {
    if (busy) return; busy = true; $('owOffGo').disabled = true; $('owOffS').textContent = 'جاري التنزيل… خلي الصفحة مفتوحة'; chip.textContent = 'جاري التنزيل…';
    try {
      try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
      await reg; await navigator.serviceWorker.ready;
      var list = await (await fetch(PHONE ? 'assets-phone.json' : 'assets.json', { cache: 'no-store' })).json();
      var total = list.reduce(function (a, x) { return a + x[1]; }, 0), done = 0, bad = [], i = 0, c = await caches.open(CACHE);
      async function one() { while (i < list.length) { var it = list[i++], p = it[0], good = false;
          for (var t = 0; t < 3 && !good; t++) { try { var url = new URL(p, location.href).href; if (await c.match(url, { ignoreSearch: true })) { good = true; break; }
              var r = await fetch(url, { cache: 'reload' }); if (r.ok) { if (r.redirected) r = new Response(await r.blob(), { status: 200, headers: r.headers }); await c.put(url, r); good = true; } } catch (e) {} }
          if (!good) bad.push(p); done += it[1];
          $('owOffG').style.width = (100 * done / total).toFixed(1) + '%'; $('owOffN').textContent = Math.round(done / 1048576) + ' / ' + Math.round(total / 1048576) + ' MB';
          chip.textContent = 'جاري التنزيل… ' + Math.round(100 * done / total) + '%'; } }
      await Promise.all([one(), one(), one(), one()]);
      if (bad.length) { $('owOffS').textContent = 'ما كمل التنزيل (' + bad.length + ' ملف). تأكد من النت واضغط مرة ثانية.'; chip.textContent = 'تنزيل للعب بدون نت'; }
      else { try { localStorage.setItem(KEY, '1'); } catch (e) {} ok = true; ready(); }
    } catch (e) { $('owOffS').textContent = 'خطأ: ' + (e && e.message || e) + ' — جرّب مرة ثانية.'; chip.textContent = 'تنزيل للعب بدون نت'; }
    busy = false; $('owOffGo').disabled = false;
  }
  function mount() {
    document.body.appendChild(chip); document.body.appendChild(pan);
    chip.onclick = show; $('owOffX').onclick = hide; $('owOffGo').onclick = run; pan.onclick = function (e) { if (e.target === pan) hide(); };
    idle(); chip.textContent = '⬇ تنزيل للعب بدون نت';
    if (ok) { ready(); setTimeout(function () { chip.style.opacity = '0'; setTimeout(function () { chip.style.display = 'none'; }, 700); }, STANDALONE ? 2500 : 6000); }
    window.__owOffline = { run: run, show: show, phone: PHONE, ready: function () { return ok; } };
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
