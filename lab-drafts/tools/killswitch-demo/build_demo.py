#!/usr/bin/env python3
"""Build the public Killswitch demo: plugin dashboard template + fictional data
-> hosted live layer (build_hosted.py) -> local simulation of db/agent/chat."""
import json, re, subprocess, sys, os
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
M = json.loads(subprocess.check_output(['node', '-e', 'console.log(JSON.stringify(require("./sample_data.js")))'], cwd=here))
t = open(os.path.join(here, 'Dashboard_Template.html'), encoding='utf-8').read()
i = t.index('const M = ['); j = t.index('\n];', i) + 3
lit = 'const M = ' + json.dumps(M, indent=1, ensure_ascii=False).replace('</', '<\\/') + ';'
t = t[:i] + lit + t[j:]
# Header stats the plugin fills on a scan
stats = [('Annual Spend', None, 'From Jan to Oct 2026 statements'),
         ('Saved So Far', None, 'Kills confirmed by the agent'),
         ('Under Review', None, 'Decisions pending'),
         ('To Kill', None, 'In your queue')]
notes = re.findall(r'<div class="gstat-savings-note">(.*?)</div>', t)
for old, (_, _, new) in zip(notes, stats):
    t = t.replace(f'<div class="gstat-savings-note">{old}</div>', f'<div class="gstat-savings-note">{new}</div>', 1)
tmp = os.path.join(here, '_local.html'); open(tmp, 'w', encoding='utf-8').write(t)
subprocess.check_call([sys.executable, os.path.join(here, 'build_hosted.py'), tmp, os.path.join(here, 'kill_layer.js'), os.path.join(here, 'kill_layer.css'), out, 'Sam'])
h = open(out, encoding='utf-8').read()
shim = open(os.path.join(here, 'demo_shim.js'), encoding='utf-8').read()
marker = '<script>const KW_USER_NAME'
assert h.count(marker) == 1
h = h.replace(marker, '<script>\n' + shim + '\n</script>\n' + marker, 1)
head = ('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        '<meta name="robots" content="noindex">\n<title>Killswitch demo · MSDO Lab</title>\n')
h = h.replace('<title>Killswitch Dashboard</title>\n', '', 1)
banner_css = ('<style>.ks-demo-bar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9999;background:rgba(26,26,26,.86);color:#f6f1e7;'
              'font:500 11px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.06em;padding:8px 14px;border-radius:999px;pointer-events:none;white-space:nowrap}'
              'body.ks-capture .ks-demo-bar{display:none}</style>\n')
bar = '<div class="ks-demo-bar">Demo with sample data · Sam Avery is fictional</div>\n'
body_open = '</head>\n<body>\n'
# build_hosted emits <title>..<style>..</style> then the body markup
k = h.index('</style>') + len('</style>')
post = open(os.path.join(here, 'demo_post.js'), encoding='utf-8').read()
h = h.rstrip() + '\n<script>\n' + post + '\n</script>'
k = h.index('</style>') + len('</style>')
h = head + h[:k] + '\n' + banner_css + body_open + bar + h[k:] + '\n</body>\n</html>\n'
open(out, 'w', encoding='utf-8').write(h)
os.remove(tmp)
print('demo', out, len(h))
