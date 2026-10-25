s=open('source.html').read()
fx=open('fixture.json').read()
shim=open('shim.js').read().replace('__FIXTURE__', fx)
def rep(old,new,count=1):
    global s
    assert s.count(old)==count, (old, s.count(old))
    s=s.replace(old,new)
rep('<title>Healthwise for Function</title>\n', '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex">\n<title>Healthwise for Function · MSDO Lab demo</title>\n')
rep("let UNLOCKED = store.get('hwf.unlocked', false) === true;", "let UNLOCKED = true; // MSDO Lab demo: opens as the full, unlocked edition")
rep("applyTheme(store.get('hwf.theme', null));", "applyTheme(store.get('hwf.theme', 'light'));")
rep('<span class="note">Uses your Claude account</span>', '<span class="note">Demo: pre-written sample</span>', 2)
rep(" · read live from Function, nothing saved`;", " · fictional sample data`;")
pill = '''<style>
.nav-btn .lock-dot { display: none; } /* demo is always unlocked; the app sets .hidden on an SVG, which has no effect */
#demo-note { position: fixed; right: 12px; bottom: 12px; z-index: 50; font-size: 11px; line-height: 1; padding: 7px 11px; border-radius: 999px; background: var(--surface); color: var(--muted); border: 1px solid var(--line-strong); box-shadow: var(--shadow); }
#demo-note a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
</style>
<div id="demo-note" role="note">Demo with fictional sample data · Not medical advice · A Lab project by <a href="https://www.msdo.us/" target="_blank" rel="noopener">MSDO</a></div>
'''
rep('<nav class="rail" aria-label="Sections">', pill + '<nav class="rail" aria-label="Sections">')
rep("<script>\n(() => {\n  'use strict';\n\n  // ── Config", "<script>\n" + shim + "</script>\n<script>\n(() => {\n  'use strict';\n\n  // ── Config")
open('index.html','w').write(s)
print(len(s))
