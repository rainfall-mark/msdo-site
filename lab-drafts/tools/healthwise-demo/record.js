/* Records the Healthwise for Function walkthrough as numbered frames.
   Frame-stepped: every call to frame() captures one 1/30s frame, so pacing is
   deterministic regardless of how long a screenshot takes. */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [demo, out, fontDir] = process.argv.slice(2);
const FPS = 30, W = 1440, H = 900;
fs.mkdirSync(out, { recursive: true });

const FS = `${fontDir}/node_modules`;
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
  await ctx.route(/localfonts\.test/, r => r.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(FS + new URL(r.request().url()).pathname) }));
  await p.addInitScript(() => {
    try { localStorage.setItem('hwf.experts', '[]'); localStorage.setItem('hwf.theme', '"light"'); } catch {}
    window.__demoStreamSteps = 48; window.__demoStreamMs = 170; window.__demoConnectMs = 1400;
  });
  await p.goto('file://' + demo + '#home');
  await p.waitForSelector('.tile');
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: '#demo-note{display:none!important} html{scroll-behavior:auto!important} *{caret-color:transparent!important}' });
  await p.evaluate(c => document.body.insertAdjacentHTML('beforeend', c), CURSOR);
  await p.waitForTimeout(400);

  let n = 0, cx = W * 0.62, cy = H * 0.72, rip = -1;
  const setCur = () => p.evaluate(([x, y, r]) => {
    document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)`;
    const el = document.getElementById('__rip');
    if (r >= 0) { const t = r / 12; el.style.transform = `scale(${0.4 + 1.6 * t})`; el.style.opacity = String(0.9 * (1 - t)); } else { el.style.transform = 'scale(0)'; el.style.opacity = '0'; }
  }, [cx, cy, rip]);
  const frame = async (count = 1) => {
    for (let i = 0; i < count; i++) {
      if (rip >= 0) rip = rip < 12 ? rip + 1 : -1;
      await setCur();
      await p.screenshot({ path: path.join(out, String(n++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 88 });
    }
  };
  const hold = s => frame(sec(s));
  const moveTo = async (x, y, s = 0.55) => {
    const x0 = cx, y0 = cy, k = sec(s);
    for (let i = 1; i <= k; i++) { const t = ease(i / k); cx = x0 + (x - x0) * t; cy = y0 + (y - y0) * t; await frame(); }
  };
  const center = async (sel, dx = 0, dy = 0) => {
    const r = await p.evaluate(sel => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2, b.width, b.height]; }, sel);
    if (!r) throw new Error('not found: ' + sel);
    return [r[0] + dx * r[2], r[1] + dy * r[3]];
  };
  const click = async (sel, opts = {}) => {
    const [x, y] = await center(sel, opts.dx || 0, opts.dy || 0);
    await moveTo(x, y, opts.move ?? 0.55);
    await hold(0.18);
    rip = 0;
    await p.mouse.click(cx, cy);
    await hold(opts.after ?? 0.5);
  };
  const scrollTo = async (y, s = 0.9) => {
    const y0 = await p.evaluate(() => window.scrollY), k = sec(s);
    for (let i = 1; i <= k; i++) { await p.evaluate(v => window.scrollTo(0, v), y0 + (y - y0) * ease(i / k)); await frame(); }
  };
  const scrollIntoView = async (sel, offset = 120, s = 0.9) => {
    const y = await p.evaluate(([sel, off]) => { const e = document.querySelector(sel); return Math.max(0, e.getBoundingClientRect().top + scrollY - off); }, [sel, offset]);
    await scrollTo(y, s);
  };
  const closeDialog = async () => { await click('#chart-dlg[open] #dlg-close', { after: 0.5 }); await p.waitForSelector('#chart-dlg[open]', { state: 'detached' }).catch(() => {}); };
  const waitWhileFraming = async (pred, max = 20) => { for (let i = 0; i < sec(max); i++) { if (await p.evaluate(pred)) return; await frame(); } };

  // 1-2. Open on the loaded Dashboard
  await hold(1.2);
  await moveTo(W * 0.5, H * 0.5, 0.5);
  await hold(2.0);
  // 3. First out-of-range tile
  await click('.tiles .tile', { after: 0.4 });
  await p.waitForSelector('#chart-dlg[open] svg');
  await moveTo(cx + 60, cy + 40, 0.4);
  await hold(3.0);
  await closeDialog();
  await hold(0.4);
  // 4. Biggest mover
  await scrollIntoView('.dash-mid', 110, 1.0);
  await hold(0.6);
  await click('.dash-mid .movers .mover', { after: 0.4 });
  await p.waitForSelector('#chart-dlg[open] svg');
  await moveTo(cx + 40, cy + 60, 0.4);
  await hold(3.0);
  await closeDialog();
  await hold(0.4);
  // 5. By system: Heart -> Labs
  await click('.dash-mid [data-go="labs"][data-cat="Heart"]', { after: 0.3 });
  await p.waitForSelector('#lab-sections');
  await moveTo(W * 0.5, H * 0.45, 0.4);
  await hold(1.8);
  // 6. Total Cholesterol row
  const tcSel = await p.evaluate(() => { const tr = [...document.querySelectorAll('tr[data-marker]')].find(r => r.querySelector('.mk').firstChild.textContent.trim() === 'Total Cholesterol'); return 'tr[data-marker="' + tr.dataset.marker + '"]'; });
  await scrollIntoView(tcSel, 420, 1.1);
  await hold(0.5);
  await click(tcSel, { dx: -0.3, after: 0.4 });
  await p.waitForSelector('#chart-dlg[open] svg');
  await moveTo(cx + 30, cy + 50, 0.4);
  await hold(3.0);
  await closeDialog();
  await hold(0.4);
  // 7. Advisor: choose three, review
  await click('.nav-btn[data-view="advisor"]', { after: 0.6 });
  for (const id of ['attia', 'hyman', 'patrick']) await click(`[data-expert="${id}"]`, { after: 0.45 });
  await hold(0.4);
  await click('#review-btn', { after: 0.2 });
  await moveTo(W * 0.72, H * 0.78, 0.5);
  await waitWhileFraming(() => !!document.querySelector('.consensus'), 30);
  await hold(1.6);
  // 8. Scroll down through the reviews and back up
  const maxY = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await scrollTo(Math.min(maxY, 1500), 3.2);
  await hold(1.0);
  await scrollTo(0, 1.6);
  await hold(0.8);
  // 9. Research: new conversation, pick a suggested question, read the answer
  await click('.nav-btn[data-view="research"]', { after: 1.2 });
  await click('#rs-chips .rs-chip', { after: 0.2 });
  await moveTo(W * 0.82, H * 0.5, 0.5);
  await waitWhileFraming(() => !!document.querySelector('.rs-followups'), 30);
  await hold(1.6);
  // 10. Follow-up question, read the answer
  await click('.rs-followups .rs-chip', { after: 0.2 });
  await moveTo(W * 0.82, H * 0.5, 0.5);
  await waitWhileFraming(() => document.querySelectorAll('.chat-msg.assistant').length === 2 && !document.querySelector('#chat-send[disabled]'), 30);
  await hold(2.2);
  // 11. Home: the dashboard is the opening frame, so settle the cursor back where it started
  await click('.nav-btn[data-view="home"]', { after: 0.6 });
  await moveTo(W * 0.62, H * 0.72, 0.8);
  await hold(0.6);

  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ frames: n, fps: FPS, errors: errs }));
  console.log('frames', n, 'errors', errs);
  await b.close();
})();
