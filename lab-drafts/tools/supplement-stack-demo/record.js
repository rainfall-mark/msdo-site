/* Supplement Stack walkthrough, frame-stepped like the Healthwise recorder:
   each frame() call captures one 1/30 s frame. usage: node record.js <demo.html> <framesDir> <fontsRoot> */
const { chromium } = require(require.resolve('playwright', { paths: ['/home/claude/msdo-site', process.cwd()] }));
const fs = require('fs'), path = require('path');
const [demo, out, fontRoot] = process.argv.slice(2);
const FPS = 30, W = 1440, H = 900;
fs.mkdirSync(out, { recursive: true });

let css = '';
for (const w of [400, 500, 600, 700]) css += `@font-face{font-family:'Inter';font-style:normal;font-weight:${w};font-display:block;src:url(https://localfonts.test/@fontsource/inter/files/inter-latin-${w}-normal.woff2) format('woff2');}\n`;
css += `@font-face{font-family:'Newsreader';font-style:normal;font-weight:200 800;font-display:block;src:url(https://localfonts.test/@fontsource-variable/newsreader/files/newsreader-latin-standard-normal.woff2) format('woff2-variations');}\n`;

const CURSOR = `<div id="__cur" style="position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform">
<div id="__rip" style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;background:rgba(201,106,74,.45);transform:scale(0);opacity:0"></div>
<svg width="22" height="30" viewBox="0 0 22 30" style="position:absolute;left:-2px;top:-2px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"><path d="M2 2 L2 23 L7.5 18 L11 27 L15 25.5 L11.5 16.5 L19 16 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;

const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const sec = s => Math.round(s * FPS);

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await ctx.route(/fonts\.googleapis\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  await ctx.route(/fonts\.gstatic\.com/, r => r.abort());
  await ctx.route(/localfonts\.test/, r => r.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(fontRoot + new URL(r.request().url()).pathname) }));
  await p.addInitScript(() => { try { localStorage.setItem('ss-theme', 'light'); } catch {} });
  await p.goto('file://' + demo);
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: '.demo-banner{display:none!important} html{scroll-behavior:auto!important}' });
  await p.evaluate(c => document.body.insertAdjacentHTML('beforeend', c), CURSOR);
  // tag rows/cells we target
  await p.evaluate(() => {
    const tag = (sel, text, id) => { const el = [...document.querySelectorAll(sel)].find(e => e.textContent.trim().endsWith(text)); if (el) el.id = id; };
    tag('#vprod tr.prow', 'Magnesium Glycinate', 'r-mg');
    tag('#vprod tr.prow', "Men's 40+ Multivitamin", 'r-multi');
  });
  await p.waitForTimeout(400);

  let n = 0, cx = W * 0.62, cy = H * 0.72, rip = -1, live = false;
  const setCur = () => p.evaluate(([x, y, r]) => {
    document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)`;
    const el = document.getElementById('__rip');
    if (r >= 0) { const t = r / 12; el.style.transform = `scale(${0.4 + 1.6 * t})`; el.style.opacity = String(0.9 * (1 - t)); } else { el.style.transform = 'scale(0)'; el.style.opacity = '0'; }
  }, [cx, cy, rip]);
  const frame = async (count = 1) => {
    for (let i = 0; i < count; i++) {
      if (rip >= 0) rip = rip < 12 ? rip + 1 : -1;
      if (live) await p.mouse.move(cx, cy);
      await setCur();
      await p.screenshot({ path: path.join(out, String(n++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 88 });
    }
  };
  const hold = s => frame(sec(s));
  const moveTo = async (x, y, s = 0.55) => {
    const x0 = cx, y0 = cy, k = sec(s);
    for (let i = 1; i <= k; i++) { const t = ease(i / k); cx = x0 + (x - x0) * t; cy = y0 + (y - y0) * t; await frame(); }
  };
  const box = async (sel, dx = 0, dy = 0) => {
    const r = await p.evaluate(sel => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2, b.width, b.height]; }, sel);
    if (!r) throw new Error('not found: ' + sel);
    return [r[0] + dx * r[2], r[1] + dy * r[3]];
  };
  const click = async (sel, opts = {}) => {
    const [x, y] = await box(sel, opts.dx || 0, opts.dy || 0);
    await moveTo(x, y, opts.move ?? 0.55);
    await hold(0.18);
    rip = 0;
    await p.mouse.click(cx, cy);
    await hold(opts.after ?? 0.5);
  };
  const hover = async (sel, s = 0.6) => { const [x, y] = await box(sel, 0.1, 0.1); live = true; await moveTo(x, y, s); };
  const away = async (x, y, s = 0.5) => { await moveTo(x, y, s); live = false; await p.mouse.move(5, 5); };
  const scrollTo = async (y, s = 0.9) => {
    const y0 = await p.evaluate(() => window.scrollY), k = sec(s);
    for (let i = 1; i <= k; i++) { await p.evaluate(v => window.scrollTo(0, v), y0 + (y - y0) * ease(i / k)); await frame(); }
  };
  const scrollToSel = async (sel, offset = 48, s = 0.9) => {
    const y = await p.evaluate(([sel, off]) => { const e = document.querySelector(sel); return Math.max(0, e.getBoundingClientRect().top + scrollY - off); }, [sel, offset]);
    await scrollTo(y, s);
  };
  const secSel = i => `section:nth-of-type(${i})`;

  // 1. Opening frame
  await hold(1.6);
  // 2. Today's protocol
  await scrollToSel(secSel(2), 40, 1.0); await hold(2.4);
  // 3. Goals, then safety flags
  await scrollToSel(secSel(3), 40, 0.9); await hold(1.6);
  await scrollToSel(secSel(4), 40, 0.8); await hold(2.0);
  // 4. Recommendations
  await scrollToSel(secSel(5), 40, 0.8); await hold(2.2);
  // 5. Timeline
  await scrollToSel(secSel(7), 30, 1.1); await hold(1.0);
  await click('#curBtn', { after: 0.8 });
  await click('#r-mg td.pname', { dx: -0.2, after: 0.5 });
  await hover('tr.irow.g' + (await p.evaluate(() => document.getElementById('r-mg').dataset.g.slice(1))) + ' td[data-k="Magnesium"]', 0.6);
  await hold(2.8);
  await away(cx - 260, cy + 40, 0.4);
  await click('#r-multi td.pname', { dx: -0.2, after: 0.5 });
  await hover('tr.irow.g' + (await p.evaluate(() => document.getElementById('r-multi').dataset.g.slice(1))) + ' td[data-k="Vitamin B6"]', 0.6);
  await hold(2.6);
  await away(cx - 300, cy - 200, 0.4);
  await click('.vt[data-v="ing"]', { after: 0.7 });
  await hover('#ving td[data-k="Soluble fiber"]', 0.7);
  await hold(2.6);
  await away(W * 0.62, H * 0.6, 0.5);
  // 6. Cost
  await scrollToSel(secSel(8), 30, 1.1); await hold(2.8);
  // 7. Dark mode, back to the top, light again
  await click('.toggle', { after: 1.2 });
  await scrollTo(0, 1.6); await hold(1.2);
  await click('.toggle', { after: 0.4 });
  await moveTo(W * 0.62, H * 0.72, 0.6);
  await hold(0.6);

  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ frames: n }));
  console.log('frames', n, 'errors', errs);
  await b.close();
})();
