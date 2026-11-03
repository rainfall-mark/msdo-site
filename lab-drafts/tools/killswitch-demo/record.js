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
  await p.addInitScript(() => {
    window.KS_SLOW = 2.5;
    window.scroller = () => { const m = document.getElementById('kwMain'); return m && m.scrollHeight > m.clientHeight + 4 ? m : document.scrollingElement; };
    // Record where a jump would land, so the recorder can animate the scroll itself.
    Element.prototype.scrollIntoView = function(){ const sc = window.scroller(), r = this.getBoundingClientRect(), top = sc === document.scrollingElement ? 0 : sc.getBoundingClientRect().top, h = sc === document.scrollingElement ? innerHeight : sc.clientHeight; window.__sivTop = sc.scrollTop + r.top - top - (h - r.height) / 2; };
  }); await p.goto(url); await p.addStyleTag({ content: CSS }); await p.evaluate(() => document.fonts.ready);
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
  const feedLen = slug => p.evaluate(s => ((KWL.kills[s] || {}).feed || []).length, slug);
  const typeIn = async (sel, text) => { await p.focus(sel); for (const ch of text) { await p.keyboard.type(ch); await frame(2); } };
  const CW = 'crunchwise-meal-kits';
  const animateTo = async (y, s = 0.9) => {
    const y0 = await p.evaluate(() => scroller().scrollTop), k = sec(s);
    for (let i = 1; i <= k; i++) { await p.evaluate(v => { scroller().scrollTop = v; }, y0 + (y - y0) * ease(i / k)); await frame(); }
  };
  const waitFeed = async (slug, re, s = 1.4) => {
    await p.waitForFunction(([s, src]) => { const r = new RegExp(src); return ((KWL.kills[s] || {}).feed || []).some(f => r.test(f.text)); }, [slug, re.source], {timeout: 60000});
    await p.waitForTimeout(120); await hold(s);
  };

  // 1. Opening frame: the dashboard alone, agent column closed
  await hold(2.6);
  await moveTo(1040, 330, 0.9); await hold(0.6);
  // 2. A top priority action: jump down the page to it
  await click('#kwTop >> text=/Go to it/i', { after: 0 });
  await animateTo(await p.evaluate(() => window.__sivTop || 0), 1.1); await hold(1.2);
  // 3. Why? explains why to cancel it
  const i = await p.evaluate(() => M.findIndex(m => m.name === 'Crunchwise Meal Kits'));
  await click(`#row-${i} .why-btn`, { after: 3.4 });
  await click('.dp-close', { after: 0.6 });
  // 4. Details: the row opens and the agent column slides in
  await click(`#expbtn-${i}`, { after: 0.3 });
  await hold(0.5);
  await animateTo(await p.evaluate(nm => { const i = M.findIndex(m => m.name === nm), r = document.getElementById('row-' + i), sc = scroller(); return sc.scrollTop + r.getBoundingClientRect().top - 300; }, 'Crunchwise Meal Kits'), 0.7);
  await hold(1.6);
  // 5. Cancel subscription: the agent works, then gets stuck on a Pause-only page
  await click('#kwAgent >> text=/Cancel subscription/i', { after: 0.3 });
  await moveTo(1200, 600, 0.6);
  await waitFeed(CW, /Picked this up/, 1.3);
  await waitFeed(CW, /Signed in as/, 1.3);
  await waitFeed(CW, /Stuck here/, 2.6);
  // 6. Ask the agent to figure it out
  await click('#kwaInput', { after: 0.2 });
  await typeIn('#kwaInput', 'Can you figure it out? I want it canceled, not paused.');
  await hold(0.4); await p.keyboard.press('Enter'); await frame(4);
  await p.waitForFunction(() => !KWL.panel.thinking, null, {timeout: 60000}); await p.waitForTimeout(150);
  await hold(2.6);
  await waitFeed(CW, /Looking through/, 1.4);
  await waitFeed(CW, /Found it/, 1.8);
  await waitFeed(CW, /offered/, 1.4);
  await p.waitForFunction(s => kwState(KWL.kills[s]) === 'ready_to_commit', CW, {timeout: 60000}); await p.waitForTimeout(150);
  await hold(1.0);
  // 7. Your go-ahead, then canceled and verified
  await moveTo(1240, 600, 0.7); await hold(2.2);
  await click('#kwAgent >> text=/^Yes, click/i', { after: 0.3 });
  await moveTo(1190, 520, 0.5);
  await waitFeed(CW, /^Clicked/, 1.0);
  await p.waitForFunction(s => kwState(KWL.kills[s]) === 'verified_live', CW, {timeout: 60000}); await p.waitForTimeout(200);
  await hold(2.8);
  // 8. Saved so far goes up
  await animateTo(0, 1.1); await moveTo(330, 140, 0.7); await hold(2.6);
  // 9. Close the agent column, back to the opening view
  await click('#kwAgent .kwa-x', { after: 1.0 });
  await moveTo(W * 0.56, H * 0.62, 0.6); await hold(0.6);
  fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ frames: n }));
  console.log('frames', n, (n/FPS).toFixed(1)+'s', 'errors', errs);
  await b.close();
})();
