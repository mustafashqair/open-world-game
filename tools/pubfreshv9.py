
import os, sys, json, hashlib, secrets, subprocess, shutil, time, urllib.request
OUT = sys.argv[1]; MODE = sys.argv[2]   # MODE: up (publish with upload route + upload) | close (publish final shell)
UPLIST = sys.argv[3] if len(sys.argv) > 3 else None
W = '/home/user/tab/tasks/fcd7cd60-8266-4b58-b659-0929ae85e7fc/work'; WG = '/home/user/tab/tasks/99246803-26f5-4c29-8685-a72a6a963872/work'; W5 = '/home/user/tab/tasks/1d432a42-ff25-48f6-ba62-b31fcadcd040/work'; W4B = '/home/user/tab/tasks/299cca2f-3447-4618-9817-a8f29d181393/work'; VER = os.environ.get('VER', 'v50g2'); WF = '/home/user/tab/tasks/fb271f3d-c51d-4d9b-902b-516cc1b8f419/work'; W50C = '/home/user/tab/tasks/e2e65256-e1c9-4300-b912-d0869bb327e0/work'; W50B = '/home/user/tab/tasks/73f41f73-47de-44b3-b687-af99bb0d183e/work'; SLUG = os.environ.get('SLUG', 'open-world-mustafa-v50d'); HOST = f'https://{SLUG}.sites.tab.bot/'
base_worker = open('/home/user/tab/files/game-v41/work/shell-v41/_worker.js').read()
SHELL = ['index.html', 'sw.js', 'offline-ui.js', 'offline-ui42.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'assets.json', 'assets-phone.json', 'CREDITS.txt']
def mkshell(d, route_hash=None, src=None):
    if os.path.exists(d): shutil.rmtree(d)
    os.makedirs(d)
    src = src or OUT
    for f in SHELL:
        if os.path.exists(f'{src}/{f}'): shutil.copy(f'{src}/{f}', f'{d}/{f}')
    wk = base_worker
    if route_hash:
        up = ("\n    if (request.method === 'PUT' && path.startsWith('__up/')) {\n      const t = request.headers.get('x-up-token') || '';\n"
              f"      if ((await sha(t)) !== '{route_hash}') return new Response('forbidden', {{ status: 403 }});\n"
              "      const key = path.slice(5); const body = await request.arrayBuffer();\n      await env.FILES.put(key, body, { httpMetadata: { contentType: ctOf(key) } });\n"
              "      return new Response(JSON.stringify({ ok: true, key, size: body.byteLength }), { headers: { 'content-type': 'application/json' } });\n    }\n")
        anchor = "    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('method not allowed', { status: 405 });"
        assert anchor in wk; wk = wk.replace(anchor, up + anchor)
    # fresh site: files not in this site's own bucket are read from the test-offline site (same files, same bytes)
    fa = "    return env.ASSETS.fetch(request);\n"
    fb = ("    const as = await env.ASSETS.fetch(request);\n    if (as.status !== 404 || !path || path.endsWith('/')) return as;\n"
          "    const up = await fetch('https://open-world-mustafa-test-offline.sites.tab.bot/' + url.pathname.replace(/^\\/+/, '') + url.search, { method: request.method });\n"
          "    if (!up.ok) return as;\n    const h2 = new Headers({ 'content-type': ctOf(path), 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' });\n"
          "    const cl = up.headers.get('content-length'); if (cl) h2.set('content-length', cl);\n    return new Response(request.method === 'HEAD' ? null : up.body, { headers: h2 });\n")
    assert wk.count(fa) == 1; wk = wk.replace(fa, fb)
    open(f'{d}/_worker.js', 'w').write(wk + '\n// build ' + str(time.time()) + '\n')   # a byte-identical shell is skipped by the publisher; a stamp forces the deploy
    shutil.copy('/home/user/tab/files/game-v41/work/shell-v41/tab-site.json', f'{d}/tab-site.json')
def publish(d):
    s = d.rstrip('/') + '-pub'
    if os.path.exists(s): shutil.rmtree(s)
    shutil.copytree(d, s); open(s + '/_worker.js', 'a').write('\n// pub ' + str(time.time()) + '\n'); d = s   # stamp: the publisher skips byte-identical shells (rollbacks included)
    r = subprocess.run(['timeout', '-k', '5', '600', 'node', '/home/user/tab/publish-cli.mjs', 'site.publish', json.dumps({'slug': SLUG, 'source_dir': d, 'title': 'العالم المفتوح'})], capture_output=True, text=True, timeout=620)
    print(r.stdout[-1500:], r.stderr[-800:]); j = json.loads(r.stdout); assert j.get('ok'), j; return j
if MODE == 'up':
    tok = secrets.token_hex(24); open(W + '/.uptok', 'w').write(tok); h = hashlib.sha256(tok.encode()).hexdigest()
    mkshell(W + f'/shellF-{VER}-up', h, os.environ.get('PREV_SHELL'))
    # PREV_SHELL = the shell live now, so the site keeps working while files upload
    publish(W + f'/shellF-{VER}-up'); time.sleep(20)
    files = [l.strip() for l in open(UPLIST) if l.strip()]; ok = 0; tot = 0
    for f in files:
        data = open(f'{OUT}/{f}', 'rb').read()
        for att in range(5):   # curl: the CDN 403s python-urllib's user agent
            rr = subprocess.run(['timeout', '-k', '5', '170', 'curl', '-s', '-o', '-', '-w', '\n%{http_code}', '-X', 'PUT', '-H', 'x-up-token: ' + tok, '-H', 'content-type: application/octet-stream', '--data-binary', '@' + f'{OUT}/{f}', HOST + '__up/' + f], capture_output=True, text=True, timeout=180)
            if rr.stdout.strip().endswith('200') and f'"size":{len(data)}' in rr.stdout: break
            print('retry', f, rr.stdout[-120:]); time.sleep(3 + att * 4)
        else: raise SystemExit('upload failed ' + f)
        for vt in range(6):   # v50c: right after a PUT the CDN can briefly serve stale bytes; re-read before failing
            got = subprocess.run(['timeout', '-k', '5', '170', 'curl', '-s', '-H', 'cache-control: no-cache', HOST + f + '?vfy=' + str(time.time())], capture_output=True, timeout=180).stdout
            if hashlib.sha256(got).digest() == hashlib.sha256(data).digest(): break
            print('verify retry', f, len(got)); time.sleep(5 + vt * 5)
        else: raise SystemExit('verify failed ' + f)
        ok += 1; tot += len(data)
    print('uploaded+verified', ok, 'files', round(tot / 1048576, 1), 'MB')
elif MODE == 'close':
    mkshell(W + f'/shellF-{VER}', None); publish(W + f'/shellF-{VER}')
    if os.path.exists(W + '/.uptok'): os.unlink(W + '/.uptok')

elif MODE == 'rollbackFg':
    publish(W + '/rb-shellF-v50g')  # exact live v50g shell (v50g2 only added new paths)
elif MODE == 'rollbackFf':
    publish(WG + '/rb-shellF-v50f')  # exact v50f shell (copied from task 3c7ce828; v50g only added new paths)
elif MODE == 'rollbackFe':
    publish(W5 + '/shellF-v50e')  # exact v50e shell on the fresh site
elif MODE == 'rollbackF':
    publish(W4B + '/shellF4b')  # exact v50d4b shell on the fresh site
elif MODE == 'rollbackF5':
    publish(W5 + '/shellF-v50d5')  # exact v50d5 shell on the fresh site
elif MODE == 'rollbackF4':
    publish(W4B + '/shellF4')
elif MODE == 'rollbackF3':
    publish(WF + '/shellF3')  # v50d3 shell on the fresh site
elif MODE == 'rollbackF2':
    publish(WF + '/shellF')  # v50d2 shell on the fresh site
elif MODE == 'rollback50c':
    publish(W50C + '/shell-v50c')
elif MODE == 'rollback50b':
    publish(W50B + '/shell-v50b')  # exact v50b shell (all v50b files stay in storage)
