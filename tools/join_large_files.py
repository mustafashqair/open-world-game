#!/usr/bin/env python3
"""Rebuild the large game files (>3 MB) from large-files/*.partNNN into their real paths.
Run once after cloning, from the repo root:  python3 tools/join_large_files.py"""
import hashlib, json, os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.load(open(os.path.join(root, 'large-files', 'manifest.json'), encoding='utf-8'))
bad = 0
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
print('done,', len(man) - bad, 'of', len(man), 'files in place')
sys.exit(1 if bad else 0)
