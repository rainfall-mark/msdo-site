/* ClaimBot walkthrough, frame-stepped (each frame() = 1/30 s of video).
   The agent's reading and submitting are advanced by the script, off-camera waits are not filmed.
   usage: node record.js <url> <framesDir> */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [url, out] = process.argv.slice(2);
const FPS = 30, W = 1440, H = 900;
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const CURSOR = `<div id="__cur" style="position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform">
<div id="__rip" style="position:absolute;left:-16px;top:-16px;width:32px;height:32px;border-radius:50%;background:rgba(0,51,255,.32);transform:scale(0);opacity:0"></div>
<svg width="22" height="30" viewBox="0 0 22 30" style="position:absolute;left:-2px;top:-2px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"><path d="M2 2 L2 23 L7.5 18 L11 27 L15 25.5 L11.5 16.5 L19 16 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
const FILE = n => `<div style="display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #d6d6d6;border-radius:10px;padding:10px 14px;box-shadow:0 8px 24px rgba(17,0,129,.18);font:500 14px Figtree,Arial,sans-serif;color:#110081;white-space:nowrap">
<svg width="22" height="26" viewBox="0 0 22 26"><path d="M2 1h12l6 6v18H2z" fill="#fff" stroke="#0033ff" stroke-width="1.6"/><path d="M14 1v6h6" fill="none" stroke="#0033ff" stroke-width="1.6"/><text x="11" y="20" font-size="6.5" font-family="Arial" font-weight="700" fill="#0033ff" text-anchor="middle">PDF</text></svg>${n}</div>`;
const GHOST = `<div id="__ghost" style="position:fixed;left:0;top:0;z-index:2147483646;pointer-events:none;display:flex;flex-direction:column;gap:8px;opacity:.96">${FILE('TidewaterPT-Invoice-TPT-2341.pdf')}${FILE('TidewaterPT-Receipt-2026-10-27.pdf')}</div>`;
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const sec = s => Math.round(s * FPS);
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' });
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(url); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
  await p.evaluate(c => document.body.insertAdjacentHTML('beforeend', c), CURSOR);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Animation.enable');
  let n = 0, cx = W * 0.62, cy = H * 0.30, rip = -1, ghost = false, t0 = Date.now();
  const setCur = () => p.evaluate(([x, y, r, g]) => {
    document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)`;
    const gh = document.getElementById('__ghost'); if (gh) gh.style.transform = `translate(${x + 14}px,${y + 18}px)`;
    const el = document.getElementById('__rip');
    if (r >= 0) { const t = r / 12; el.style.transform = `scale(${0.4 + 1.6 * t})`; el.style.opacity = String(0.9 * (1 - t)); } else { el.style.transform = 'scale(0)'; el.style.opacity = '0'; }
  }, [cx, cy, rip, ghost]);
  const frame = async (count = 1) => { for (let i = 0; i < count; i++) {
    if (rip >= 0) rip = rip < 12 ? rip + 1 : -1; await setCur();
    if (!process.env.PREVIEW || n % 30 === 0) await p.screenshot({ path: path.join(out, String(n).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 90 }); n++;
    if (n === 20) { const ms = (Date.now() - t0) / 20; await cdp.send('Animation.setPlaybackRate', { playbackRate: Math.min(1, (1000 / FPS) / ms) }); console.log('ms/frame', ms.toFixed(0)); }
  } };
  const hold = s => frame(sec(s));
  const moveTo = async (x, y, s = 0.55) => { const x0 = cx, y0 = cy, k = sec(s); for (let i = 1; i <= k; i++) { const t = ease(i / k); cx = x0 + (x - x0) * t; cy = y0 + (y - y0) * t; await frame(); } };
  const box = async (sel) => { const loc = p.locator(sel).first(); await loc.waitFor({ state: 'visible', timeout: 15000 }); const r = await loc.boundingBox(); return [r.x + Math.min(r.width / 2, 60), r.y + r.height / 2, r]; };
  const click = async (sel, opts = {}) => {
    let [x, y, r] = await box(sel); if (opts.center) x = r.x + r.width / 2;
    await moveTo(x + (opts.dx || 0), y + (opts.dy || 0), opts.move ?? 0.6);
    await hold(0.15); rip = 0; await p.mouse.click(cx, cy); await hold(opts.after ?? 0.5);
  };
  const hover = async (sel, s = 0.5, h = 0.4) => { const [x, y] = await box(sel); await moveTo(x, y, s); await hold(h); };
  const scrollEl = async (sel, to, s = 1.0) => {
    const y0 = await p.evaluate(sel => (sel ? document.querySelector(sel) : document.scrollingElement).scrollTop, sel), k = sec(s);
    for (let i = 1; i <= k; i++) { await p.evaluate(([sel, v]) => { (sel ? document.querySelector(sel) : document.scrollingElement).scrollTop = v; }, [sel, y0 + (to - y0) * ease(i / k)]); await frame(); }
  };
  const maxScroll = sel => p.evaluate(sel => { const e = sel ? document.querySelector(sel) : document.scrollingElement; return e.scrollHeight - e.clientHeight; }, sel);
  // Scroll down through everything in steps, pausing on each screenful
  const scrollThrough = async (sel, step, s = 1.2, h = 1.4) => {
    const max = await maxScroll(sel);
    let y = await p.evaluate(sel => (sel ? document.querySelector(sel) : document.scrollingElement).scrollTop, sel);
    while (y < max - 4) { y = Math.min(max, y + step); await scrollEl(sel, y, s); await hold(h); }
  };
  const typeIn = async (sel, text) => { await p.focus(sel); for (const ch of text) { await p.keyboard.type(ch); await frame(3); } };

  // 1. The Claims tab, as it opens
  await hold(2.2);
  // 2. Drag the invoice and receipt in from the desktop
  cx = W + 40; cy = 520; await p.evaluate(g => document.body.insertAdjacentHTML('beforeend', g), GHOST); ghost = true;
  await moveTo(1000, 520, 0.9);
  await p.evaluate(() => { const d = document.getElementById('drop'); d.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer: new DataTransfer() })); });
  await moveTo(560, 470, 0.9); await hold(0.4);
  await p.evaluate(async () => {
    const names = ['TidewaterPT-Invoice-TPT-2341.pdf', 'TidewaterPT-Receipt-2026-10-27.pdf'];
    const dt = new DataTransfer();
    for (const nm of names) { const bl = await (await fetch('/files/' + nm)).blob(); dt.items.add(new File([bl], nm, { type: 'application/pdf' })); }
    document.getElementById('__ghost').remove();
    document.getElementById('drop').dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt }));
  });
  ghost = false; rip = 0;
  await hold(1.4);
  await p.waitForFunction(() => { const b = document.getElementById('createBtn'); return b && !b.disabled; }, null, { timeout: 15000 });
  await hold(0.8);
  // 3. The agent reads both documents and fills in the claim
  await click('#createBtn', { after: 0.4 });
  await moveTo(1080, 300, 0.7); await hold(2.0);
  await p.waitForFunction(() => window.CA_DEMO.readingPending(), null, { timeout: 15000 });
  await p.evaluate(() => window.CA_DEMO.finishReading()); await p.waitForTimeout(250);
  await hold(1.4);
  // 4. Review the card
  await hover('#pBody [data-k="dateOfService"]', 0.6, 0.5);
  await hover('#pBody [data-k="amount"]', 0.5, 0.5);
  await hover('#pBody [data-k="reimbursementCurrency"]', 0.5, 0.4);
  await hover('#pBody [data-k="diagnosis"]', 0.5, 0.7);
  await scrollThrough('#pBody', 480, 1.3, 1.6);
  // 5. Submit to Cigna, then the agent takes it from there
  await p.evaluate(() => document.querySelector('[data-act=approve]').scrollIntoView({ block: 'center' }));
  await click('[data-act=approve]', { center: true, after: 0.8 });
  await scrollEl('#pBody', 0, 0.9); await moveTo(1060, 240, 0.6); await hold(0.8);
  await p.evaluate(() => window.CA_DEMO.agentStep()); await p.waitForTimeout(150); await hold(2.6);
  await p.evaluate(() => window.CA_DEMO.agentStep()); await p.waitForTimeout(150); await hold(2.6);
  await p.evaluate(() => window.CA_DEMO.agentStep()); await p.waitForTimeout(150); await hold(3.0);
  await scrollEl('#pBody', await maxScroll('#pBody'), 1.8); await hold(1.6);
  // 6. Back to the list: the claim is tracked
  await click('#pClose', { center: true, after: 0.8 });
  await hover('#claims tr:has-text("Tidewater")', 0.7, 1.6);
  // 7. Settlement letters: every letter readable and searchable, opened in place
  await click('button.tab[data-tab=letters]', { center: true, after: 1.0 });
  await moveTo(900, 560, 0.5); await scrollEl(null, 420, 1.3); await hold(1.0); await scrollEl(null, 0, 1.0);
  await click('#q', { after: 0.2 });
  await typeIn('#q', 'MRI'); await hold(0.8);
  await click('#lettersList >> text=MRI scan', { after: 0.2 });
  await p.waitForFunction(() => document.querySelector('#pdfPages canvas'), null, { timeout: 20000 }); await p.waitForTimeout(300);
  await moveTo(1100, 420, 0.6); await hold(2.0);
  await scrollEl('#pBody', 260, 1.2); await hold(1.6);
  await click('#pClose', { center: true, after: 0.4 });
  await p.fill('#q', ''); await p.evaluate(() => document.getElementById('q').dispatchEvent(new Event('input', { bubbles: true })));
  // 8. Benefits: what's used, what's left, and what to do next
  await click('button.tab[data-tab=benefits]', { center: true, after: 1.2 });
  await moveTo(900, 520, 0.6);
  await scrollEl(null, 380, 1.4); await hold(1.2);
  await click('#benefitsView >> text=Physio, osteopathy and chiropractic', { after: 3.6 });
  await click('#pClose', { center: true, after: 0.5 });
  await click('#benefitsView >> text=Acupuncture and Chinese medicine', { after: 3.0 });
  await click('#pClose', { center: true, after: 0.5 });
  await scrollThrough(null, 520, 1.3, 1.4);
  await scrollEl(null, 0, 1.4); await hold(0.4);
  // 9. Back to Claims for the loop
  await click('button.tab[data-tab=claims]', { center: true, after: 0.6 });
  await moveTo(W * 0.62, H * 0.30, 0.7); await hold(0.8);
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ frames: n }));
  console.log('frames', n, (n / FPS).toFixed(1) + 's', 'errors', errs);
  await b.close();
})();
