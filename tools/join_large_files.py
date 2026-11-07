#!/usr/bin/env python3
"""Rebuild the large game files from their parts. Run once after cloning, from the repo root:
    python3 tools/join_large_files.py            (rebuild + verify)
    python3 tools/join_large_files.py --check    (verify only, write nothing)
Handles BOTH layouts in this repo:
  1) large-files/manifest.json  -> large-files/<path>.partNNN  (sha256 checked against the manifest)
  2) <dir>/<name>.glb.0, .glb.1, ... (and .bin.N) next to where the real file goes
     (the same groups index.html's SPL table fetches at runtime and concatenates).
For every group: indices must be contiguous 0..N-1, a GLB must have magic 'glTF', version 2,
header length == joined size, a first chunk of type JSON that parses. Prints size + sha256."""
import hashlib, json, os, re, struct, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHECK = '--check' in sys.argv
SKIP_DIRS = {'.git', 'node_modules', 'large-files'}

def glb_check(b):
    if len(b) < 20: return 'too short'
    magic, ver, length = struct.unpack_from('<4sII', b, 0)
    if magic != b'glTF': return 'magic %r' % magic
    if ver != 2: return 'version %d' % ver
    if length != len(b): return 'header length %d != size %d' % (length, len(b))
    clen, ctype = struct.unpack_from('<II', b, 12)
    if ctype != 0x4E4F534A: return 'first chunk not JSON'
    if 20 + clen > len(b): return 'JSON chunk overruns file'
    try: json.loads(b[20:20 + clen].decode('utf-8'))
    except Exception as e: return 'JSON chunk does not parse: %s' % e
    off = 20 + ((clen + 3) & ~3)
    while off < len(b):                      # walk the remaining chunks (BIN), must end exactly at length
        if off + 8 > len(b): return 'truncated chunk header at %d' % off
        n, _t = struct.unpack_from('<II', b, off); off += 8 + n
    if off != len(b): return 'chunks end at %d, file is %d' % (off, len(b))
    return None

def finish(out, data, want_sha=None):
    sha = hashlib.sha256(data).hexdigest()
    if want_sha and sha != want_sha: return 'CHECKSUM MISMATCH', sha
    err = glb_check(data) if out.lower().endswith('.glb') else None
    if err: return 'BAD GLB: ' + err, sha
    if not CHECK:
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out + '.tmp', 'wb') as f: f.write(data)
        os.replace(out + '.tmp', out)
    return None, sha

rows, bad = [], 0
# 1) manifest parts
mp = os.path.join(root, 'large-files', 'manifest.json')
if os.path.exists(mp):
    for path, m in json.load(open(mp, encoding='utf-8')).items():
        out = os.path.join(root, path)
        try: data = b''.join(open(os.path.join(root, p), 'rb').read() for p in m['parts'])
        except OSError as e: rows.append((path, 0, '-', 'MISSING PART ' + str(e))); bad += 1; continue
        if len(data) != m['size']: rows.append((path, len(data), '-', 'SIZE %d != manifest %d' % (len(data), m['size']))); bad += 1; continue
        err, sha = finish(out, data, m['sha256']); rows.append((path, len(data), sha, err or 'ok')); bad += bool(err)
# 2) <file>.glb.N / <file>.bin.N groups
groups = {}
for d, dirs, files in os.walk(root):
    dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
    for f in files:
        m = re.match(r'^(.+\.(?:glb|bin))\.(\d+)$', f, re.I)
        if m: groups.setdefault(os.path.join(d, m.group(1)), {})[int(m.group(2))] = os.path.join(d, f)
for out in sorted(groups):
    g, rel = groups[out], os.path.relpath(out, root)
    if sorted(g) != list(range(len(g))):
        rows.append((rel, 0, '-', 'NON-CONTIGUOUS parts %s' % sorted(g))); bad += 1; continue
    data = b''.join(open(g[i], 'rb').read() for i in range(len(g)))
    err, sha = finish(out, data); rows.append((rel, len(data), sha, (err or 'ok') + ' (%d parts)' % len(g))); bad += bool(err)
for r in rows: print('%-55s %10d  %s  %s' % r)
print('done,', len(rows) - bad, 'of', len(rows), 'files', 'verified' if CHECK else 'in place')
sys.exit(1 if bad else 0)
