/* Rainfall Studio walkthrough recorder. Real-time CDP screencast of the v2 prototype,
   driven by script with a drawn cursor; markers let compose.py speed up the waits.
   usage: node record.js <outDir> */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const out = process.argv[2] || 'rec';
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out + '/main', { recursive: true }); fs.mkdirSync(out + '/app', { recursive: true });
const FONTS = fs.readFileSync(__dirname + '/fonts.css', 'utf8');
const LAYER = fs.readFileSync(__dirname + '/demo-layer.js', 'utf8') + '\n' + fs.readFileSync(__dirname + '/demo-build.js', 'utf8');
const HIDE = '.fw2__dockToggle{opacity:0!important;pointer-events:none!important}';
const W = 1440, H = 900;
const marks = []; const now = () => Date.now() / 1000;
const mark = (name) => { marks.push({ name, t: now() }); console.log('mark', name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function screencast(ctx, page, dir) {
  const cdp = await ctx.newCDPSession(page); const idx = [];
  cdp.on('Page.screencastFrame', async f => {
    const fn = String(idx.length).padStart(5, '0') + '.jpg';
    fs.writeFileSync(path.join(dir, fn), Buffer.from(f.data, 'base64'));
    idx.push([fn, f.metadata.timestamp]);
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W * 2, maxHeight: H * 2, everyNthFrame: 1 });
  return { stop: async () => { await cdp.send('Page.stopScreencast').catch(() => {}); fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(idx)); } };
}

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx.addInitScript(([fonts, hide]) => {
    const add = () => { const s = document.createElement('style'); s.textContent = fonts + hide; document.head.appendChild(s); };
    if (document.head) add(); else document.addEventListener('DOMContentLoaded', add);
  }, [FONTS, HIDE]);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8420/v2/index.html', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => { const t = document.querySelector('.fw2__dockToggle'); if (t) t.click(); });
  await p.waitForTimeout(900);
  await p.addScriptTag({ content: LAYER });
  await p.waitForTimeout(300);

  const DL = (fn, ...a) => p.evaluate(([fn, a]) => window.DL[fn](...a), [fn, a]);
  const box = (sel, re) => p.evaluate(([s, r]) => window.DL.box(s, r), [sel, re ? re.source : null]);
  const waitBox = async (sel, re, t = 90000) => { await p.waitForFunction(([s, r]) => !!window.DL.box(s, r), [sel, re ? re.source : null], { timeout: t }); return box(sel, re); };
  const moveTo = async (x, y, ms = 650, sync) => { if (sync) await p.mouse.move(x, y, { steps: 2 }); await DL('to', x, y, ms); };
  const click = async (sel, re, o = {}) => {
    const bx = await waitBox(sel, re);
    await moveTo(bx[0] + (o.dx || 0), bx[1] + (o.dy || 0), o.ms || 650);
    await sleep(140); await DL('ripple');
    const [x, y] = await DL('pos');
    const hit = await p.evaluate(([x, y, s, r]) => { const e = document.elementFromPoint(x, y); const t = [...document.querySelectorAll(s)].filter(b => b.offsetParent && (!r || new RegExp(r).test(b.textContent))).pop(); return !!(e && t && (t === e || t.contains(e) || e.contains(t))); }, [x, y, sel, re ? re.source : null]);
    await p.evaluate(([s, r]) => { const t = [...document.querySelectorAll(s)].filter(b => b.offsetParent && (!r || new RegExp(r).test(b.textContent))).pop(); if (t && t.matches('.nc2__optConfirm, .cs2__action, .fw2__liveBtn')) window.DL.spend(t.textContent); }, [sel, re ? re.source : null]);
    if (o.mark) mark(o.mark);
    if (hit) { await p.mouse.click(x, y); if (/railBtn/.test(sel)) await p.evaluate(() => document.activeElement && document.activeElement.blur()); }
    else { console.log('  js-click', sel, re); await p.evaluate(([s, r]) => { const t = [...document.querySelectorAll(s)].filter(b => b.offsetParent && (!r || new RegExp(r).test(b.textContent))).pop(); if (t) t.click(); }, [sel, re ? re.source : null]); }
    await sleep(o.after ?? 400);
  };
  const cta = async (re, o) => { await p.evaluate(() => { const t = window.RCS_thread || document.querySelector('.nc2__thread'); const b = [...document.querySelectorAll('.nc2__optConfirm, .cs2__action')].filter(b => b.offsetParent && !b.disabled && !b.classList.contains('is-taken')).pop(); if (b) b.scrollIntoView({block: 'nearest'}); }); await sleep(250); return click('.nc2__optConfirm:not(.is-taken):not([disabled]), .cs2__action:not(.is-taken):not([disabled])', re, o || {}); };
  const ctaReady = (re, t = 120000) => p.waitForFunction((src) => [...document.querySelectorAll('.nc2__optConfirm, .cs2__action')].some(b => b.offsetParent && !b.disabled && !b.classList.contains('is-taken') && new RegExp(src).test(b.textContent)), re.source, { timeout: t });

  await DL('solo', true);
  const sc = await screencast(ctx, p, out + '/main');
  await sleep(400);
  mark('start');
  // 1. Open
  await sleep(1800);
  await moveTo(760, 300, 900);
  await sleep(300);
  // 2. Describe: the walk types the brief and sends it
  mark('typing');
  // Hold the brief once it is fully typed, so the cursor can be the one that sends it.
  await p.evaluate(() => { (function watch() { const i = document.querySelector('.nc2__input'); if (i && window.RCS_SEED && i.value === window.RCS_SEED) { window.RCSClock.pause(); window.__briefDone = true; return; } requestAnimationFrame(watch); })(); });
  await p.evaluate(() => document.querySelector('.rcs-btn--primary').click());
  const ib = await waitBox('.nc2__input');
  await moveTo(ib[0] - ib[2] / 2 + 120, ib[1], 900); await sleep(120); await DL('ripple');   // click into the box (drawn only: a real press would stop the typing)
  await moveTo(ib[0] + 40, ib[1] + ib[3] / 2 + 30, 1400);
  await p.waitForFunction(() => window.__briefDone, null, { timeout: 60000, polling: 16 });
  const sb = await box('.nc2__send');
  await moveTo(sb[0], sb[1], 500); await sleep(150); await DL('ripple');
  await p.mouse.click(sb[0], sb[1]); await p.mouse.move(1436, 896);
  await p.evaluate(() => { window.RCSClock.play(); const i = document.querySelector('.nc2__input'); i.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });   // the walk hands the questions to the cursor
  await p.waitForFunction(() => window.currentScreen && window.currentScreen() === 'new-capp' && document.querySelector('.nc2__threadInner'), null, { timeout: 60000 });
  await moveTo(sb[0] - 260, sb[1] - 160, 900);
  mark('qa');
  // 3. Clarify: each answer is clicked; multi-answer questions are sent once their picks are in
  const plan = () => p.evaluate(() => {
    const rows = [...document.querySelectorAll('.nc2__row:not(.nc2__row--free)')].filter(r => r.offsetParent);
    if (!rows.length) return null;
    const msgs = [...document.querySelectorAll('.nc2__threadInner *')].filter(e => e.offsetParent && e.children.length === 0 && /\?\s*$/.test(e.textContent));
    const qt = msgs.length ? msgs[msgs.length - 1].textContent.trim() : '';
    const it = (window.NEWCAPP_CLARIFY_ITEMS || []).find(i => i.q && i.q.trim() === qt);
    const picks = it && it.compose && it.compose.picks || [];
    const multi = picks.length > 1;
    const idx = multi ? picks : [Math.max(0, rows.findIndex(r => r.querySelector('.nc2__rowRec')))];
    return { multi, q: qt, labels: idx.map(i => rows[i].textContent.trim().slice(0, 40)), rows: idx.map(i => { const b = rows[i].getBoundingClientRect(); return [b.x + Math.min(160, b.width / 3), b.y + b.height / 2]; }) };
  });
  let asked = 0;
  while (true) {
    const st = await p.waitForFunction(() => { const rows = [...document.querySelectorAll('.nc2__row:not(.nc2__row--free)')].filter(r => r.offsetParent); if (rows.length) return 'q'; return [...document.querySelectorAll('.nc2__optConfirm')].some(b => b.offsetParent && /Define the Requirements/.test(b.textContent)) ? 'done' : false; }, null, { timeout: 90000, polling: 30 });
    if ((await st.jsonValue()) === 'done') break;
    await sleep(550);
    const pl = await plan();
    if (!pl) continue;
    if (asked === 2) mark('qa_fast');
    console.log('  q', pl.multi ? 'multi' : 'single', pl.q.slice(0, 40), '->', pl.labels.join(' | '));
    for (const [x, y] of pl.rows) {
      await moveTo(x, y, 600); await sleep(260); await DL('ripple');
      await p.mouse.click(x, y); await p.mouse.move(1436, 896); await sleep(pl.multi ? 380 : 200);   // park the real mouse so no row lights up away from the drawn cursor
    }
    if (pl.multi) {
      await p.evaluate(() => { const s = document.querySelector('.nc2__send'); s.disabled = false; });
      const s2 = await box('.nc2__send');
      await moveTo(s2[0], s2[1], 650); await sleep(180); await DL('ripple');
      await p.mouse.click(s2[0], s2[1]); await p.mouse.move(1436, 896);
      await p.evaluate(() => document.querySelector('.nc2__input').focus()); await p.keyboard.press('Enter');
      await sleep(200);
    }
    asked++;
    await p.waitForFunction(() => ![...document.querySelectorAll('.nc2__row:not(.nc2__row--free)')].some(r => r.offsetParent), null, { timeout: 10000 }).catch(() => console.log('  picker still open'));
  }
  await ctaReady(/Define the Requirements/);
  mark('qa_done');
  await sleep(1200);
  // 4. Requirements: the Output panel opens and the requirements are drafted into it
  const PARK = [430, 700];
  await DL('draftPrep', true);
  await cta(/Define the Requirements/, { mark: 'req_click' });
  mark('req');
  await p.waitForFunction(() => { if (!(window.currentScreen && window.currentScreen() === 'capp-surface')) return false; const cs = [...document.querySelectorAll('.cs2[data-fw2]')].find(e => e.offsetParent); if (!cs) return false; const th = cs.querySelector(':scope > .cs2__thread'); const sh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dl-shift')) || 0; const want = cs.clientWidth / 2 - (th.offsetLeft + th.offsetWidth / 2); return document.querySelectorAll('.cs-main .cs-section').length > 0 && Math.abs(sh - want) < 2 && getComputedStyle(th).transform !== 'none'; }, null, { timeout: 60000, polling: 20 });
  await sleep(120);
  mark('surface_ok');
  await DL('followThread', true);
  const opening = DL('openSplit', 1100);
  await moveTo(PARK[0], PARK[1], 1100);
  await opening;
  mark('draft');
  await DL('draft', [0, 1]);
  await ctaReady(/Draft the Design/); await sleep(700);
  // 5. The Design: the next sections are written in below
  await cta(/Draft the Design/);
  mark('design');
  await moveTo(PARK[0], PARK[1], 900);
  await DL('draft', [3, 4, 5, 6, 7, 8]);
  // 6. Actors, then the flow
  await ctaReady(/Compose the Actors/); await sleep(500);
  await cta(/Compose the Actors/);
  await moveTo(PARK[0], PARK[1], 900);
  // the deck re-renders the Output after Compose: wait until the section node has stopped changing
  await p.evaluate(() => new Promise(res => { let last = null, since = Date.now(), t0 = Date.now();
    const tick = () => { const m = [...document.querySelectorAll('.cs-main')].find(e => e.offsetParent); const s = m && m.querySelectorAll('.cs-section')[2];
      if (s !== last) { last = s; since = Date.now(); }
      if (Date.now() - since > 500 || Date.now() - t0 > 4000) return res(); setTimeout(tick, 50); }; tick(); }));
  await DL('draft', [2]); await DL('draftDone'); await sleep(1400);
  await ctaReady(/Build the flow/); await sleep(300);
  await DL('buildPrep', true); await DL('closeActors', true);
  await cta(/Build the flow/, { mark: 'build_click' });
  await p.waitForFunction(() => window.currentScreen && window.currentScreen() === 'choreograph', null, { timeout: 60000 });
  await p.waitForFunction(() => { const c = [...document.querySelectorAll('.cs2[data-fw2] .ch-canvas-inner')].find(e => e.offsetParent); const b = [...document.querySelectorAll('.cs2[data-fw2] [data-fw2-actors-toggle]')].find(e => e.offsetParent); const i = [...document.querySelectorAll('.nc2__threadInner')].find(e => e.offsetParent); let s = i; while (s && !(s.scrollHeight > s.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(s).overflowY))) s = s.parentElement; if (s) s.scrollTop = s.scrollHeight; const atEnd = !s || s.scrollTop + s.clientHeight >= s.scrollHeight - 4; return !!c && !!b && b.getAttribute('aria-expanded') === 'false' && atEnd; }, null, { timeout: 20000, polling: 20 });
  await sleep(120);
  mark('canvas_ok');
  await p.evaluate(() => { try { window.demoPause && window.demoPause(); } catch (e) {} });
  await DL('release');
  mark('canvas');
  await p.evaluate(() => { const i = document.querySelector('.nc2__threadInner'); let s = i; while (s && !(s.scrollHeight > s.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(s).overflowY))) s = s.parentElement; if (s) s.scrollTop = s.scrollHeight; });
  // 7. The Canvas, Actors list closed, and the flow assembles module by module
  await sleep(500);
  await DL('closeActors', false);
  await moveTo(300, 760, 900);
  mark('build');
  await DL('build', 7600, 0.45, 60);
  await DL('buildDone');
  await sleep(500);
  mark('zoom');
  await moveTo(1000, 420, 700); await sleep(200);   // the cursor rests over the area the view zooms in on
  await DL('zoomTo', 1, 840, 288, 2000);
  await sleep(700);
  // 8. Open the Actors list only to drag Reflection Step in
  mark('drag');
  await click('[data-fw2-actors-toggle]', null, { ms: 1000, after: 700 });
  const chip = await waitBox('.ch-pal-chip', /^Reflection Step$/);
  await moveTo(chip[0] - 30, chip[1], 1000); await sleep(300);
  await DL('ripple'); await DL('grab'); await sleep(250);
  const slot = await box('.dl-slot');
  await moveTo(slot[0] + 120, slot[1] + 60, 800);
  await DL('slot', true);
  await moveTo(slot[0] - 18, slot[1], 700); await sleep(300);
  await DL('ripple'); await DL('dropVoiceCheck');
  await sleep(900);
  await click('[data-fw2-actors-toggle]', null, { ms: 1000, after: 500 });
  await moveTo(slot[0] + 120, slot[1] + 170, 800); await sleep(1300);
  // 9. Over to the Output, and the new step is written into the spec
  mark('output');
  await click('.fw2__tBtn', /Output/, { after: 300 });
  await moveTo(1230, 640, 800);
  await DL('outTo', 'When Someone Asks', 120, 1800);
  await sleep(500);
  const va = await DL('voiceAt');
  await moveTo(va[0] + 2, va[1] + 2, 800); await sleep(250); await DL('ripple'); await sleep(200);   // click in where the new sentence starts
  const typed = DL('voiceType', 'After styling, a Voice Self-Check compares each draft with the Robbies\u2019 own takes on the subject and sends anything off-voice back for a redraft.', 42);
  await sleep(300); await moveTo(va[0] + 14, va[1] + 46, 700);   // ease off the line so the words are not under the pointer
  await typed;
  await sleep(2000);
  // 11. Run
  mark('run');
  await DL('addChecks');
  await click('.fw2__gBtn--primary', /Run/, { after: 600 });
  await sleep(5200);
  // 12. Deploy
  mark('deploy');
  await click('.fw2__gBtn', /Deploy/, { after: 900 });
  const STEPS = /^(Sign as Robbie and Robbie|Approve for Publish|Commit|Done)$/;
  let idle = 0, played = false, last = '', lastAt = 0;
  for (let k = 0; k < 600; k++) {
    const t = await p.evaluate((src) => { const b = [...document.querySelectorAll('button')].filter(b => b.offsetParent && !b.disabled && new RegExp(src).test(b.textContent.trim())).pop(); return b ? b.textContent.trim() : null; }, STEPS.source);
    if (t && !(t === last && Date.now() - lastAt < 4000)) {
      await sleep(650);
      const re = new RegExp('^' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
      if (await box('button', re)) { console.log('  step', t); await click('button', re, { after: 250 }); last = t; lastAt = Date.now(); if (t === 'Done') break; }
      idle = 0;
    } else { await sleep(60); if (++idle > 120 && !played) { console.log('  deck nudge'); played = true; await p.evaluate(() => { try { window.demoPlay && window.demoPlay(); } catch (e) {} }); } }
  }
  mark('handoff');
  await DL('release');
  await moveTo(330, 600, 900);
  await sleep(1800);
  mark('back');
  await click('.rcs-railBtn[aria-label="Projects"]', null, { ms: 900, after: 600 });
  mark('projects');
  await sleep(500);
  const card = await p.evaluate(() => { const els = [...document.querySelectorAll('div, a, article, li, button')].filter(e => e.offsetParent && /^\s*Ask The Two Robbies/.test(e.textContent) && /Opened just now/.test(e.textContent)); els.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height); const e = els[0]; if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  console.log('card', card);
  if (card) await moveTo(card[0] + 60, card[1] + 20, 900, true);
  await sleep(1800);
  await click('.rcs-railBtn[aria-label="Library"]', null, { ms: 900, after: 600 });
  mark('library');
  await moveTo(760, 420, 900, true); await sleep(1600);
  await click('.rcs-railBtn[aria-label="Home"]', null, { ms: 800, after: 300 });
  mark('home');
  await moveTo(760, 300, 900, true);
  await sleep(1500);
  mark('end');
  await sc.stop();
  const passes = await p.evaluate(() => window.__passes || []).catch(() => []);
  passes.forEach(([a, b]) => { marks.push({ name: 'pass_start', t: a }); marks.push({ name: 'pass_end', t: b }); });
  console.log('passes', JSON.stringify(passes));
  fs.writeFileSync(path.join(out, 'marks.json'), JSON.stringify(marks, null, 1));
  console.log('errors', errs.slice(0, 5));
  await b.close();
})();
