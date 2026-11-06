/* Rainfall Studio walkthrough, part two of the demo-only layer (loads after demo-layer.js).
   - Solo: the Canvas/Output panel stays closed and the conversation fills the window
     until the flow is generated, then the panel opens.
   - Build: the Canvas assembles column by column as the flow is generated.
   - Markdown: the Output shown as the spec file the AI wrote, ask-the-two-robbies.md. */
(function () {
  if (!window.DL || window.DL.build) return;
  var css = `
  html.dl-solo .cs2[data-fw2]{grid-template-columns:var(--dl-w,760px) 8px minmax(0,1fr) var(--fw2-pf-w,0px)!important}
  html.dl-solo .cs2[data-fw2] > .cs2__thread{transform:translateX(var(--dl-shift,0px))}
  html.dl-solo .cs2[data-fw2] > .cs2__design{opacity:0;transform:translateX(56px);pointer-events:none}
  html.dl-solo .cs2[data-fw2] > .fw2__resizer{opacity:0}
  html.dl-opening .cs2[data-fw2] > .cs2__design{transition:opacity .55s ease .6s, transform .75s cubic-bezier(.22,1,.36,1) .55s}
  html.dl-opening .cs2[data-fw2] > .fw2__resizer{transition:opacity .6s ease .4s}
  .cs-section.dl-typing .cs-sectionBody > *:not(.dl-shown){display:none!important}
  .dl-seq > *:not(.dl-shown){display:none!important}
  /* Who Does The Work is written last, at the bottom of the Output, when the Actors are composed */
  .cs-pad{display:flex!important;flex-direction:column!important}
  .cs-pad > .cs-section[data-cs-section="Who Does The Work"]{order:1}
  .cs-section.dl-typing .dl-shown, .dl-seq > .dl-shown{animation:dlFade .3s ease-out both}
  .dep-act, .dep-card{box-shadow:none!important}
  html.dl-build .ch-canvas-inner .ch-node:not(.dl-on), html.dl-build .ch-canvas-inner .ch-edge-chip:not(.dl-on), html.dl-build .ch-canvas-inner .ch-scope:not(.dl-on){opacity:0}
  html.dl-build .ch-canvas-inner .ch-edge:not(.dl-on){opacity:0}
  .ch-canvas-inner .ch-node.dl-on{animation:dlPop .42s cubic-bezier(.2,.9,.3,1.2) both, dlBuildGlow 1.6s ease-out both}
  @keyframes dlBuildGlow{0%{box-shadow:0 0 0 2px rgba(167,139,250,.85),0 0 18px rgba(139,92,246,.45)}100%{box-shadow:0 0 0 0 rgba(167,139,250,0)}}
  .ch-canvas-inner .ch-scope.dl-on, .ch-canvas-inner .ch-edge-chip.dl-on{animation:dlFade .5s ease-out both}
  @keyframes dlFade{from{opacity:0}to{opacity:1}}
  .dl-md{position:absolute;left:0;right:0;bottom:0;top:0;z-index:4;background:#151515;display:flex;flex-direction:column;opacity:0;transition:opacity .35s ease}
  .dl-md.on{opacity:1}
  .dl-mdTabs{flex:0 0 auto;display:flex;align-items:flex-end;gap:2px;height:40px;margin-top:58px;padding:0 14px;border-bottom:1px solid #2a2a2a}
  .dl-mdTab{display:flex;align-items:center;gap:8px;height:34px;padding:0 14px;border:1px solid #2a2a2a;border-bottom:0;border-radius:8px 8px 0 0;background:#1d1d1d;color:#e8e8e8;font:500 12.5px 'Geist Mono',ui-monospace,monospace}
  .dl-mdTab svg{width:14px;height:14px;color:#a78bfa}
  .dl-mdTab i{font-style:normal;color:#777;margin-left:6px}
  .dl-mdBody{flex:1 1 auto;overflow:auto;padding:18px 0 40px;font:400 13px/1.75 'Geist Mono',ui-monospace,monospace;color:#bdbdbd}
  .dl-mdLine{display:grid;grid-template-columns:52px minmax(0,1fr);padding-right:28px}
  .dl-mdNo{color:#4d4d4d;text-align:right;padding-right:18px;user-select:none}
  .dl-mdTx{white-space:pre-wrap;word-break:break-word;min-height:1.75em}
  .dl-mdH{color:#f2f2f2;font-weight:600}
  .dl-mdM{color:#a78bfa}
  .dl-mdB{color:#ededed;font-weight:600}
  .dl-mdNew{background:rgba(139,92,246,.26);border-radius:3px;box-shadow:0 0 0 2px rgba(139,92,246,.26);color:#efeaff}
  .dl-mdCaret{display:inline-block;width:7px;height:1.15em;vertical-align:-2px;background:#a78bfa;margin-left:1px;animation:dlBlink 1s steps(1) infinite}
  @keyframes dlBlink{50%{opacity:0}}
  html.dl-draft .cs-main .cs-section:not(.dl-on){display:none!important}
  .cs-main .cs-section.dl-in{animation:dlDraft .7s cubic-bezier(.2,.8,.3,1) both}
  @keyframes dlDraft{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  .dl-caret{display:inline-block;width:2px;height:1.05em;vertical-align:-2px;background:#a78bfa;margin-left:1px;animation:dlBlink 1s steps(1) infinite}
  .fw2__dialog{width:min(720px,100%)!important}
  .fw2__dialogBody{height:auto!important;min-height:556px;overflow:visible!important}
  `;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var tween = function (ms, fn) { return new Promise(function (res) { var t0 = performance.now(); (function step(now) { var k = Math.min(1, (now - t0) / ms); fn(ease(k), k); if (k < 1) requestAnimationFrame(step); else res(); })(t0); }); };
  var vis = function (sel) { return [].slice.call(document.querySelectorAll(sel)).find(function (e) { return e.offsetParent !== null; }); };
  var root = document.documentElement;

  // The chat says "on the right" about a panel that is closed until the flow exists.
  setInterval(function () {
    [].slice.call(document.querySelectorAll('.cs2__thread p')).forEach(function (p) {
      if (p.children.length === 0 && /, on the right —/.test(p.textContent)) p.textContent = p.textContent.replace(', on the right —', ', in the Output —');
    });
  }, 120);

  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var txt = function (e) { return (e ? e.textContent : '').replace(/\s+/g, ' ').trim(); };

  var outMain = function () { return [].slice.call(document.querySelectorAll('.cs-main')).find(function (e) { return e.offsetParent !== null; }); };
  var drafted = [], voice = null, lock = null;
  setInterval(function () {
    // Sections already drafted stay drafted when the deck re-renders the Output.
    if (drafted.length) [].slice.call(document.querySelectorAll('.cs-main .cs-section')).forEach(function (s) { if (drafted.indexOf(s.dataset.csSection) >= 0) s.classList.add('dl-on'); });
    // The new sentence stays in the Output when the workspace is rebuilt.
    if (voice && voice.done) { var m = outMain(); if (m && !m.querySelector('.dl-hl')) { var p = voicePara(m); if (p) { var s = document.createElement('span'); s.className = 'dl-hl dl-settle'; s.textContent = voice.text; p.appendChild(s); } } }
    // Actors list closed whenever a Canvas arrives, until asked for.
    if (window.__closeActors) { var b = vis('[data-fw2-actors-toggle]'); if (b && b.getAttribute('aria-expanded') === 'true') { b.click(); } }
  }, 40);
  // Hold the Output's scroll where the walkthrough wants it; the deck's own follow would move it.
  (function hold() {
    if (lock) {
      var m = outMain();
      if (m) {
        var f = window.__follow;
        if (f && f.isConnected) {
          var mr = m.getBoundingClientRect(), fr = f.getBoundingClientRect();
          var want = Math.min(m.scrollHeight - m.clientHeight, m.scrollTop + fr.bottom - mr.top - m.clientHeight * 0.78);
          if (want > lock.y) lock.y += (want - lock.y) * 0.09;
        }
        m.scrollTop = lock.y;
      }
    }
    requestAnimationFrame(hold);
  })();
  function voicePara(m) { var h = [].slice.call(m.querySelectorAll('h3')).find(function (e) { return /When Someone Asks/.test(e.textContent); }); if (!h) return null; var p = h.nextElementSibling; while (p && !p.matches('p')) { var q = p.querySelector && p.querySelector('p'); if (q) return q; p = p.nextElementSibling; } return p; }
  function secTop(m, re) { var h = [].slice.call(m.querySelectorAll('h2,h3')).find(function (e) { return new RegExp(re).test(e.textContent); }); return h ? m.scrollTop + h.getBoundingClientRect().top - m.getBoundingClientRect().top : 0; }

  // The Deploy popover passes through "Continue to ..." for a tenth of a second on its own;
  // log when, so the compose can hold the frame before it rather than flash it.
  window.__passes = [];
  (function () {
    var open = null;
    var check = function () {
      var b = [].slice.call(document.querySelectorAll('.fw2__dialog button')).some(function (x) { return x.offsetParent && /^Continue to/.test(x.textContent.trim()); });
      if (b && open === null) open = Date.now() / 1000;
      if (!b && open !== null) { window.__passes.push([open, Date.now() / 1000]); open = null; }
    };
    new MutationObserver(check).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'hidden', 'style'] });
  })();

  Object.assign(window.DL, {
    draftPrep: function (on) { root.classList.toggle('dl-draft', !!on); },
    // Each step writes the next sections into the Output, in order down the page, typed as they are generated.
    draft: function (which, cps) {
      var m = outMain(); var all = [].slice.call(m.querySelectorAll('.cs-section')); var secs = which.map(function (i) { return all[i]; });
      if (which[0] === 0) { m.scrollTop = 0; lock = { y: 0 }; } else if (!lock) lock = { y: m.scrollTop };
      var rate = cps || 300, sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
      var typeEl = async function (el) {
        var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
        while ((n = w.nextNode())) { nodes.push([n, n.nodeValue]); n.nodeValue = ''; }
        el.classList.add('dl-shown'); window.__follow = el;
        for (var i = 0; i < nodes.length; i++) {
          var full = nodes[i][1], k = 0;
          while (k < full.length) { k = Math.min(full.length, k + Math.max(1, Math.round(rate / 60))); nodes[i][0].nodeValue = full.slice(0, k); await sleep(1000 / 60); }
        }
      };
      var showEl = async function (el, ms) { el.classList.add('dl-shown'); window.__follow = el; await sleep(ms); };
      return (async function () {
        for (var s = 0; s < secs.length; s++) {
          var sec = secs[s]; sec.classList.add('dl-typing', 'dl-on'); window.__follow = sec.querySelector('.cs-sectionHead') || sec;
          await sleep(260);
          var blocks = [].slice.call(sec.querySelectorAll(':scope > .cs-sectionBody > *'));
          for (var b = 0; b < blocks.length; b++) {
            var el = blocks[b];
            if (el.matches('p')) await typeEl(el);
            else if (el.matches('ul, ol, .cs-services, .cs-refusals, .cs-ifaceComposed, .cs-descriptors, .cs-team') && el.children.length > 1) {
              el.classList.add('dl-seq', 'dl-shown');
              var kids = [].slice.call(el.children);
              for (var c = 0; c < kids.length; c++) await showEl(kids[c], el.matches('.cs-services, .cs-refusals, .cs-ifaceComposed') ? 300 : 120);
            } else if (/^(H3|H4)$/.test(el.tagName)) await showEl(el, 160);
            else await showEl(el, el.offsetHeight > 120 ? 340 : 160);
          }
          drafted.push(sec.dataset.csSection);
          sec.classList.remove('dl-typing');
          await sleep(220);
        }
        window.__follow = null;
      })();
    },
    draftDone: function () { root.classList.remove('dl-draft'); },
    // Scroll back up to where a held-back section goes (it sits just above section `nextIdx`).
    outToGap: function (nextIdx, frac, ms) {
      var m = outMain(); var all = [].slice.call(m.querySelectorAll('.cs-section')); var next = all[nextIdx];
      var target = Math.max(0, m.scrollTop + next.getBoundingClientRect().top - m.getBoundingClientRect().top - m.clientHeight * (frac || 0.32));
      if (!lock) lock = { y: m.scrollTop }; var y0 = lock.y;
      return tween(ms || 1500, function (k) { lock.y = y0 + (target - y0) * k; });
    },
    outTo: function (re, screenOffset, ms) {
      var m = outMain(); if (!lock) lock = { y: m.scrollTop };
      var target = Math.max(0, Math.min(m.scrollHeight - m.clientHeight, secTop(m, re) - (screenOffset || 40))), y0 = lock.y;
      return tween(ms || 1400, function (k) { lock.y = y0 + (target - y0) * k; });
    },
    release: function () { lock = null; },
    // Keep the chat column scrolled to its newest message (and the next action) as the thread grows.
    followThread: function (on) {
      window.__followThread = !!on;
      if (window.__ftLoop) return; window.__ftLoop = true;
      (function step() {
        if (window.__followThread) {
          var i = [].slice.call(document.querySelectorAll('.nc2__threadInner')).find(function (e) { return e.offsetParent; }), s = i;
          while (s && !(s.scrollHeight > s.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(s).overflowY))) s = s.parentElement;
          if (s) { var max = s.scrollHeight - s.clientHeight; if (max - s.scrollTop > 1) s.scrollTop += Math.max(1, (max - s.scrollTop) * 0.12); }
        }
        requestAnimationFrame(step);
      })();
    },
    closeActors: function (on) { window.__closeActors = !!on; },
    // The AI writes the new sentence into "When Someone Asks".
    // Where the new sentence will start: just past the end of the paragraph's text.
    voiceAt: function () {
      var p = voicePara(outMain()), w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT), n, last = null;
      while ((n = w.nextNode())) if (n.nodeValue.trim()) last = n;
      var end = last.nodeValue.replace(/\s+$/, '').length, r = document.createRange(); r.setStart(last, end - 1); r.setEnd(last, end);
      var rs = r.getClientRects(), b = rs[rs.length - 1];
      return [b.right + 8, b.top + b.height / 2];
    },
    voiceType: function (text, cps) {
      var m = outMain(); var p = voicePara(m);
      var s = document.createElement('span'); s.className = 'dl-hl'; var c = document.createElement('span'); c.className = 'dl-caret';
      p.appendChild(document.createTextNode(' ')); p.appendChild(s); p.appendChild(c);
      voice = { text: ' ' + text, done: false }; var k = 0;
      return new Promise(function (res) {
        var t = setInterval(function () { s.textContent = text.slice(0, ++k); if (k >= text.length) { clearInterval(t); setTimeout(function () { c.remove(); s.textContent = text; voice.done = true; s.classList.add('dl-settle'); res(); }, 700); } }, 1000 / (cps || 40));
      });
    },
    solo: function (on) {
      root.classList.toggle('dl-solo', !!on);
      if (on && !window.__shiftKeep) window.__shiftKeep = setInterval(function () {
        if (!root.classList.contains('dl-solo') || root.classList.contains('dl-opening')) return;
        var cs = vis('.cs2[data-fw2]'); var th = cs && cs.querySelector(':scope > .cs2__thread'); if (!th) return;
        root.style.setProperty('--dl-shift', Math.round(cs.clientWidth / 2 - (th.offsetLeft + th.offsetWidth / 2)) + 'px');
      }, 30);
    },
    // One move: the conversation narrows and slides from the centre into its column while the panel fades in.
    openSplit: function (ms) {
      var cs = vis('.cs2[data-fw2]'); var th = cs.querySelector(':scope > .cs2__thread');
      var W = cs.clientWidth, w0 = th.offsetWidth, w1 = W * 0.33333;
      var s0 = parseFloat(getComputedStyle(root).getPropertyValue('--dl-shift')) || (W / 2 - (th.offsetLeft + w0 / 2));
      root.classList.add('dl-opening'); void document.body.offsetWidth;
      var design = cs.querySelector(':scope > .cs2__design');
      var dur = ms || 1100;
      setTimeout(function () { design.style.transition = 'opacity .55s ease, transform .7s cubic-bezier(.22,1,.36,1)'; design.style.opacity = '1'; design.style.transform = 'none'; }, dur * 0.58);
      return tween(dur, function (k) {
        root.style.setProperty('--dl-w', (w0 + (w1 - w0) * k).toFixed(1) + 'px');
        root.style.setProperty('--dl-shift', (s0 * (1 - k)).toFixed(1) + 'px');
      }).then(function () {
        root.classList.remove('dl-solo'); root.style.removeProperty('--dl-w'); root.style.removeProperty('--dl-shift');
        return new Promise(function (r) { setTimeout(function () { root.classList.remove('dl-opening'); design.style.transition = ''; design.style.opacity = ''; design.style.transform = ''; r(); }, 700); });
      });
    },
    buildPrep: function (on) { root.classList.toggle('dl-build', !!on); },

    // Assemble the Choreograph left to right at a reduced zoom, the view following the build.
    build: function (ms, scale, oy) {
      var inner = vis('.ch-canvas-inner'), canvas = inner.closest('.ch-canvas');
      var s = scale || 0.45; inner.style.transformOrigin = '0 0'; inner.style.transform = 'scale(' + s + ')';
      canvas.scrollLeft = 0; canvas.scrollTop = (oy || 0) * s;
      var nodes = [].slice.call(inner.querySelectorAll('.ch-node'));
      var cols = {}; nodes.forEach(function (n) { var x = parseInt(n.style.left, 10) || 0; (cols[x] = cols[x] || []).push(n); });
      var xs = Object.keys(cols).map(Number).sort(function (a, b) { return a - b; });
      var on = {}; var edges = [].slice.call(inner.querySelectorAll('.ch-edge')), chips = [].slice.call(inner.querySelectorAll('.ch-edge-chip')), scopes = [].slice.call(inner.querySelectorAll('.ch-scope'));
      var step = (ms || 7000) / xs.length;
      var bar = vis('.fw2__actorsBar'); var viewW = canvas.clientWidth - (bar && bar.dataset.fw2Actors === 'open' ? 230 : 40);
      var maxX = xs[xs.length - 1] + 180;
      var front = 0;
      var revealTo = function (i) {
        var x = xs[i]; cols[x].forEach(function (n) { n.classList.add('dl-on'); on[n.dataset.nodeId] = true; });
        edges.forEach(function (e) {
          if (e.classList.contains('dl-on') || !on[e.dataset.edgeFrom] || !on[e.dataset.edgeTo]) return;
          var L = e.getTotalLength(); e.style.strokeDasharray = L; e.style.strokeDashoffset = L; e.classList.add('dl-on'); e.getBoundingClientRect();
          e.style.transition = 'stroke-dashoffset .5s ease-out'; e.style.strokeDashoffset = 0;
          setTimeout(function () { e.style.strokeDasharray = ''; e.style.strokeDashoffset = ''; e.style.transition = ''; }, 650);
        });
        chips.forEach(function (c) { if (!c.classList.contains('dl-on') && parseFloat(c.style.left) <= x + 200) c.classList.add('dl-on'); });
        scopes.forEach(function (c) { if (!c.classList.contains('dl-on') && parseFloat(c.style.left) <= x + 190) c.classList.add('dl-on'); });
        front = x + 180;
      };
      return new Promise(function (res) {
        var i = 0, t0 = performance.now(), done = false;
        var tick = setInterval(function () { if (i < xs.length) revealTo(i++); if (i >= xs.length) { clearInterval(tick); setTimeout(function () { done = true; }, 700); } }, step);
        (function pan() {
          var target = Math.max(0, Math.min(maxX * s - viewW, front * s - viewW * 0.72));
          canvas.scrollLeft += (target - canvas.scrollLeft) * 0.06;
          if (!done) requestAnimationFrame(pan); else res();
        })();
      });
    },
    buildDone: function () {
      var inner = vis('.ch-canvas-inner');
      inner.querySelectorAll('.ch-node, .ch-edge, .ch-edge-chip, .ch-scope').forEach(function (e) { e.classList.add('dl-on'); });
      root.classList.remove('dl-build');
    },
    // Zoom the canvas to scale s1 with the view's top-left at inner (ox, oy).
    zoomTo: function (s1, ox, oy, ms) {
      var inner = vis('.ch-canvas-inner'), canvas = inner.closest('.ch-canvas');
      var m = /scale\(([\d.]+)\)/.exec(inner.style.transform || ''); var s0 = m ? +m[1] : 1;
      var ox0 = canvas.scrollLeft / s0, oy0 = canvas.scrollTop / s0;
      return tween(ms || 1600, function (k) {
        var s = s0 + (s1 - s0) * k; inner.style.transform = 'scale(' + s + ')';
        canvas.scrollLeft = (ox0 + (ox - ox0) * k) * s; canvas.scrollTop = (oy0 + (oy - oy0) * k) * s;
      }).then(function () { if (s1 === 1) inner.style.transform = 'scale(1)'; });
    },

    // --- The Output as the markdown file the AI wrote
    mdText: function () {
      var doc = vis('.cs-docColumn'); var L = [];
      var push = function (s) { L.push(s); }, gap = function () { if (L.length && L[L.length - 1] !== '') L.push(''); };
      push('# ' + txt(doc.querySelector('.cs-docTitle'))); push('');
      doc.querySelectorAll('section.cs-section').forEach(function (sec) {
        gap(); push('## ' + txt(sec.querySelector('h2.cs-headerText'))); push('');
        var items = sec.querySelectorAll('h3.cs-subhead, p.cs-description, li.cs-bindItem, .cs-teamMember, li.cs-projItem, .cs-refusal, .cs-ifaceComposedPart, .cs-service');
        var n = 0, last = '';
        items.forEach(function (e) {
          if (e.closest('.cs-teamPop, .cs-tip')) return;
          var kind = e.matches('li, .cs-teamMember, .cs-service, .cs-refusal') ? 'list' : 'block';
          if (kind === 'block' || last === 'block') gap();
          if (e.matches('h3')) push('### ' + txt(e));
          else if (e.matches('p.cs-description')) push(txt(e));
          else if (e.matches('li.cs-bindItem')) push('- ' + txt(e).replace(/×$/, '').trim());
          else if (e.matches('.cs-teamMember')) push((++n) + '. **' + txt(e.querySelector('.cs-teamName')) + '**: ' + txt(e.querySelector('.cs-teamJob')));
          else if (e.matches('li.cs-projItem')) { var c = e.cloneNode(true); c.querySelectorAll('.cs-tip, button').forEach(function (x) { x.remove(); }); push('- ' + txt(c)); }
          else if (e.matches('.cs-refusal')) push('- **' + txt(e.querySelector('.cs-refusalCategory')) + '**: ' + txt(e.querySelector('.cs-refusalText--own')));
          else if (e.matches('.cs-ifaceComposedPart')) { push('### ' + txt(e.querySelector('h4'))); var bl = e.querySelector('.cs-ifaceBlurb'); if (bl) { push(''); push(txt(bl)); } }
          else if (e.matches('.cs-service')) push('- **' + txt(e.querySelector('h4')) + '** (' + txt(e.querySelector('.cs-serviceProvider')) + '): ' + txt(e.querySelector('.cs-serviceLineText')));
          last = kind;
        });
      });
      return L.join('\n');
    },
    mdShow: function () {
      var shell = vis('.cs-shell'); var host = shell.parentElement;
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      var md = document.createElement('div'); md.className = 'dl-md';
      md.innerHTML = '<div class="dl-mdTabs"><div class="dl-mdTab"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 1.5h5.5L13 5v9.5H4z"/><path d="M9.5 1.5V5H13"/></svg>ask-the-two-robbies.md<i>Markdown</i></div></div><div class="dl-mdBody"></div>';
      var body = md.querySelector('.dl-mdBody');
      var fmt = function (line) {
        var h = /^(#{1,4}) (.*)$/.exec(line);
        if (h) return '<span class="dl-mdM">' + h[1] + '</span> <span class="dl-mdH">' + esc(h[2]) + '</span>';
        var out = esc(line).replace(/\*\*(.+?)\*\*/g, '<span class="dl-mdM">**</span><span class="dl-mdB">$1</span><span class="dl-mdM">**</span>');
        return out.replace(/^(- |\d+\. )/, '<span class="dl-mdM">$1</span>');
      };
      this.mdText().split('\n').forEach(function (line, i) {
        var r = document.createElement('div'); r.className = 'dl-mdLine';
        r.innerHTML = '<span class="dl-mdNo">' + (i + 1) + '</span><span class="dl-mdTx">' + fmt(line) + '</span>';
        r.dataset.raw = line; body.appendChild(r);
      });
      host.appendChild(md); md.getBoundingClientRect(); md.classList.add('on');
      window.__md = md;
      // The deck rebuilds the workspace on Run and Deploy: carry the file view into whichever Output is showing.
      if (!window.__mdKeep) window.__mdKeep = setInterval(function () {
        var m = window.__md; if (!m) return;
        var sh = vis('.cs-shell'); if (!sh) return; var h = sh.parentElement;
        if (m.parentElement !== h) { var y = m.querySelector('.dl-mdBody').scrollTop; if (getComputedStyle(h).position === 'static') h.style.position = 'relative'; h.appendChild(m); var bd = m.querySelector('.dl-mdBody'); bd.scrollTop = y; requestAnimationFrame(function () { bd.scrollTop = y; }); setTimeout(function () { bd.scrollTop = y; }, 120); }
      }, 60);
      return body.children.length;
    },
    mdScrollTo: function (re, screenY, ms) {
      var body = window.__md.querySelector('.dl-mdBody');
      var line = [].slice.call(body.children).find(function (r) { return new RegExp(re).test(r.dataset.raw); });
      var target = body.scrollTop + line.getBoundingClientRect().top - (screenY || 260), y0 = body.scrollTop;
      return tween(ms || 1300, function (k) { body.scrollTop = y0 + (target - y0) * k; });
    },
    // The AI writes the new sentence into the paragraph under "### When Someone Asks".
    mdType: function (text, cps) {
      var body = window.__md.querySelector('.dl-mdBody'); var rows = [].slice.call(body.children);
      var i = rows.findIndex(function (r) { return /^### When Someone Asks/.test(r.dataset.raw); });
      var row = rows[i + 2] || rows[i + 1]; var tx = row.querySelector('.dl-mdTx');
      var span = document.createElement('span'); span.className = 'dl-mdNew'; var caret = document.createElement('span'); caret.className = 'dl-mdCaret';
      tx.appendChild(document.createTextNode(' ')); tx.appendChild(span); tx.appendChild(caret);
      var k = 0;
      return new Promise(function (res) {
        var t = setInterval(function () {
          span.textContent = text.slice(0, ++k);
          if (k >= text.length) { clearInterval(t); setTimeout(function () { caret.remove(); res(); }, 900); }
        }, 1000 / (cps || 38));
      });
    },
  });
})();
