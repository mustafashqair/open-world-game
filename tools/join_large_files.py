#!/usr/bin/env python3
"""Rebuild the split game files after cloning. Run once, from the repo root:
    python3 tools/join_large_files.py

Two kinds of split files live in this repo:
  1. large-files/<path>.partNNN  -> <path>   (listed in large-files/manifest.json, SHA-256 checked)
  2. <path>.glb.0, <path>.glb.1, ... next to where the model belongs -> <path>.glb
     (70 models: houses, shops, guards, bandits, wagon, trees33, animals36, horses37, ...).
     These have no manifest; each joined file is checked against its own glTF header
     (magic "glTF", version 2, header length == file size).
Files already in place and correct are left alone. Exit code 1 if anything failed."""
import hashlib, json, os, re, struct, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bad = 0

# 1) manifest-listed files from large-files/
man_path = os.path.join(root, 'large-files', 'manifest.json')
man = json.load(open(man_path, encoding='utf-8')) if os.path.exists(man_path) else {}
for path, m in man.items():
    out = os.path.join(root, path)
    if os.path.exists(out) and os.path.getsize(out) == m['size'] and hashlib.sha256(open(out, 'rb').read()).hexdigest() == m['sha256']:
        continue
    os.makedirs(os.path.dirname(out), exist_ok=True)
    h = hashlib.sha256()
    with open(out + '.tmp', 'wb') as f:
        for p in m['parts']:
            b = open(os.path.join(root, p), 'rb').read(); f.write(b); h.update(b)
    if h.hexdigest() != m['sha256']:
        print('CHECKSUM MISMATCH', path); bad += 1; os.remove(out + '.tmp'); continue
    os.replace(out + '.tmp', out); print('ok', path, m['size'])
print('large-files:', len(man) - bad, 'of', len(man), 'files in place')

# 2) <name>.glb.N split models
PART = re.compile(r'^(.+\.glb)\.(\d+)$')
groups = {}
for d, dirs, files in os.walk(root):
    dirs[:] = [x for x in dirs if x not in ('.git', 'large-files', 'node_modules')]
    for fn in files:
        mm = PART.match(fn)
        if mm:
            groups.setdefault(os.path.join(d, mm.group(1)), {})[int(mm.group(2))] = os.path.join(d, fn)

def glb_ok(data):
    if len(data) < 12 or data[:4] != b'glTF':
        return False
    ver, length = struct.unpack('<II', data[4:12])
    return ver == 2 and length == len(data)

bad2 = 0
for out in sorted(groups):
    parts = groups[out]
    rel = os.path.relpath(out, root)
    idx = sorted(parts)
    if idx != list(range(len(idx))):
        print('MISSING PART', rel, 'have', idx); bad2 += 1; continue
    data = b''.join(open(parts[i], 'rb').read() for i in idx)
    if not glb_ok(data):
        print('BAD GLB HEADER', rel, len(data), 'bytes from', len(idx), 'parts'); bad2 += 1; continue
    if os.path.exists(out) and os.path.getsize(out) == len(data) and open(out, 'rb').read() == data:
        continue
    with open(out + '.tmp', 'wb') as f:
        f.write(data)
    os.replace(out + '.tmp', out); print('ok', rel, len(data), '(%d parts)' % len(idx))
print('split .glb models:', len(groups) - bad2, 'of', len(groups), 'in place')
bad += bad2
print('done' if not bad else 'FAILED: %d file(s)' % bad)
sys.exit(1 if bad else 0)
