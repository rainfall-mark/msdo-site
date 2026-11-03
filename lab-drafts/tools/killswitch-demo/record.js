/* Killswitch walkthrough, frame-stepped (each frame() = 1/30 s). Agent waits run off-camera, then hold.
   usage: node record.js <url> <framesDir> */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [url, out] = process.argv.slice(2);
const FPS = 30, W = 1440, H = 900;
fs.rmSync(out, {recursive:true, force:true}); fs.mkdirSync(out, { recursive: true });
const G = '/home/claude/fonts/node_modules/@fontsource/gelasio/files/';
const face = (w, st) => `@font-face{font-family:'Georgia';font-weight:${w};font-style:${st};src:url(data:font/woff2;base64,${fs.readFileSync(G+`gelasio-latin-${w}-${st}.woff2`).toString('base64')}) format('woff2');}`;
const CSS = [400,500,600,700].flatMap(w => [face(w,'normal'), face(w,'italic')]).join('\n') + "\n.ks-demo-bar{display:none!important} html,#kwMain{scroll-behavior:auto!important}";
const CURSOR = `<div id="__cur" style="position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform">
<div id="__rip" style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;background:rgba(160,52,26,.40);transform:scale(0);opacity:0"></div>
<svg width="22" height="30" viewBox="0 0 22 30" style="position:absolute;left:-2px;top:-2px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"><path d="M2 2 L2 23 L7.5 18 L11 27 L15 25.5 L11.5 16.5 L19 16 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const sec = s => Math.round(s * FPS);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { window.KS_SLOW = 2.5; }); await p.goto(url); await p.addStyleTag({ content: CSS }); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(c => document.body.insertAdjacentHTML('beforeend', c), CURSOR);
  await p.waitForTimeout(1200);
  let n = 0, cx = W * 0.56, cy = H * 0.62, rip = -1;
  const setCur = () => p.evaluate(([x, y, r]) => {
    document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)`;
    const el = document.getElementById('__rip');
    if (r >= 0) { const t = r / 12; el.style.transform = `scale(${0.4 + 1.6 * t})`; el.style.opacity = String(0.9 * (1 - t)); } else { el.style.transform = 'scale(0)'; el.style.opacity = '0'; }
  }, [cx, cy, rip]);
  const frame = async (count = 1) => { for (let i = 0; i < count; i++) { if (rip >= 0) rip = rip < 12 ? rip + 1 : -1; await setCur(); await p.screenshot({ path: path.join(out, String(n++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 88 }); } };
  const hold = s => frame(sec(s));
  const moveTo = async (x, y, s = 0.55) => { const x0 = cx, y0 = cy, k = sec(s); for (let i = 1; i <= k; i++) { const t = ease(i / k); cx = x0 + (x - x0) * t; cy = y0 + (y - y0) * t; await frame(); } };
  const box = async (sel, nth = 0) => {
    const loc = p.locator(sel).nth(nth); await loc.waitFor({state:'visible', timeout: 15000});
    const r = await loc.boundingBox(); return [r.x + r.width / 2, r.y + r.height / 2];
  };
  const click = async (sel, opts = {}) => {
    const [x, y] = await box(sel, opts.nth || 0);
    await moveTo(x + (opts.dx || 0), y, opts.move ?? 0.6);
    const [x2, y2] = await box(sel, opts.nth || 0); if (Math.abs(x2 - x) > 3 || Math.abs(y2 - y) > 3) await moveTo(x2 + (opts.dx || 0), y2, 0.2);
    await hold(0.15); rip = 0;
    if (process.env.DBG) console.log(sel, cx, cy, await p.evaluate(([x,y]) => { const e = document.elementFromPoint(x,y); return e ? e.outerHTML.slice(0,120) : null; }, [cx, cy]));
    await p.mouse.click(cx, cy); await hold(opts.after ?? 0.5);
  };
  const scrollMain = async (y, s = 0.9) => {
    const y0 = await p.evaluate(() => document.getElementById('kwMain').scrollTop), k = sec(s);
    for (let i = 1; i <= k; i++) { await p.evaluate(v => { document.getElementById('kwMain').scrollTop = v; }, y0 + (y - y0) * ease(i / k)); await frame(); }
  };
  const rowTop = name => p.evaluate(nm => { const i = M.findIndex(m => m.name === nm), r = document.getElementById('row-' + i), main = document.getElementById('kwMain'); return main.scrollTop + r.getBoundingClientRect().top - main.getBoundingClientRect().top; }, name);
  const feedLen = slug => p.evaluate(s => ((KWL.kills[s] || {}).feed || []).length, slug);
  const base = {}; const mark = async slug => { base[slug] = await feedLen(slug); };
  const nextLine = async (slug, s = 1.5) => { base[slug] += 1; await p.waitForFunction(([s, n]) => ((KWL.kills[s] || {}).feed || []).length >= n, [slug, base[slug]], {timeout: 60000}); await p.waitForTimeout(120); await hold(s); };
  const typeIn = async (sel, text) => { await p.focus(sel); for (const ch of text) { await p.keyboard.type(ch); await frame(2); } };
  const CW = 'crunchwise-meal-kits', MY = 'mystchg-svc-8885550123';

  // 1. Opening frame: dashboard and the agent's overview
  await hold(2.4);
  await moveTo(1240, 420, 0.8); await hold(1.0);
  // 2. Priority actions: go to Crunchwise
  await click('#kwTop >> text=/Go to it/i', { after: 1.4 });
  // 3. Why?
  const i = await p.evaluate(() => M.findIndex(m => m.name === 'Crunchwise Meal Kits'));
  await click(`#row-${i} .why-btn`, { after: 2.6 });
  await click('#dpTakeAction', { after: 1.0 });
  // 4. Start kill and watch the agent work
  await mark(CW); await click('#kwAgent >> text=/Start kill/i', { after: 0.3 }); base[CW] += 1;
  await moveTo(1180, 640, 0.6);
  await nextLine(CW, 1.4);   // picked up
  await nextLine(CW, 1.4);   // signed in
  await nextLine(CW, 1.6);   // declined the offer
  await p.waitForFunction(s => kwState(KWL.kills[s]) === 'ready_to_commit', CW, {timeout: 60000}); await p.waitForTimeout(150);
  await hold(1.4);
  // 5. Your go-ahead
  await moveTo(1240, 560, 0.7); await hold(2.4);
  await mark(CW); await click('#kwAgent >> text=/^Yes, click/i', { after: 0.3 });
  await moveTo(1180, 520, 0.5);
  await nextLine(CW, 1.0); await nextLine(CW, 1.0);
  await p.waitForFunction(s => kwState(KWL.kills[s]) === 'verified_live', CW, {timeout: 60000}); await p.waitForTimeout(200);
  await hold(2.6);
  // 6. Savings up top
  await scrollMain(0, 1.0); await moveTo(380, 140, 0.7); await hold(2.2);
  // 7. A charge nobody recognizes
  const yMy = await rowTop('MYSTCHG*SVC 8885550123');
  await scrollMain(yMy - 260, 1.2); await hold(0.4);
  const im = await p.evaluate(() => M.findIndex(m => m.name.startsWith('MYSTCHG')));
  await click(`#row-${im} .m-name`, { after: 1.4 });
  await mark(MY); await click('#kwAgent >> text=/Help me identify it/i', { after: 0.3 }); base[MY] += 1;
  await moveTo(1180, 560, 0.5);
  await nextLine(MY, 1.2); await nextLine(MY, 1.2);
  await p.waitForFunction(s => !(KWL.kills[s] || {}).hold, MY, {timeout: 60000}); await p.waitForTimeout(200);
  await hold(3.2);
  // 8. Tell it things: keep a Review item
  const yPP = await rowTop('PixelPerfect Design');
  await scrollMain(yPP - 300, 1.2);
  const ip = await p.evaluate(() => M.findIndex(m => m.name === 'PixelPerfect Design'));
  await click(`#row-${ip} .m-name`, { after: 1.0 });
  await click('#kwaInput', { after: 0.2 });
  await typeIn('#kwaInput', 'I still use it for client work. Keep it.');
  await hold(0.4); await p.keyboard.press('Enter');
  await p.waitForFunction(() => !KWL.panel.thinking, null, {timeout: 60000}).catch(()=>{});
  await hold(0.1);
  await p.waitForFunction(() => M.find(m => m.name === 'PixelPerfect Design').priority === 'Keep', null, {timeout: 60000});
  await hold(2.8);
  // 9. Back to the top
  await scrollMain(0, 1.3); await moveTo(W * 0.56, H * 0.62, 0.7); await hold(0.6);
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ frames: n }));
  console.log('frames', n, (n/FPS).toFixed(1)+'s', 'errors', errs);
  await b.close();
})();
