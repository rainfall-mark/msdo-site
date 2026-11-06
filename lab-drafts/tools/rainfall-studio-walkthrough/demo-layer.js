/* Rainfall Studio walkthrough: demo-only layer injected for the recording.
   Adds a recorder cursor, and simulates two linked edits the prototype does not
   wire yet: a module dragged onto the Canvas shows up in the Output, and a
   guideline added in the Output shows up on the Canvas. Nothing here ships. */
(function () {
  if (window.DL) return;
  var css = `
  #__cur{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform}
  #__rip{position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;background:rgba(167,139,250,.45);transform:scale(0);opacity:0}
  #__rip.go{animation:dlRip .42s ease-out}
  @keyframes dlRip{from{transform:scale(.4);opacity:.95}to{transform:scale(2);opacity:0}}
  .dl-ghost.dl-lift{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.55),0 0 0 1px rgba(167,139,250,.7)}
  .dl-ghost{position:fixed;z-index:2147483646;pointer-events:none;transform:none;transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s;margin:0!important;box-shadow:0 0 0 1px rgba(167,139,250,.5);background:#26222f!important;color:#ece8ff!important;opacity:.96}
  .dl-slot{position:absolute;width:180px;height:77px;border:1.5px dashed rgba(167,139,250,.75);border-radius:10px;background:rgba(139,92,246,.08);opacity:0;transition:opacity .2s}
  .dl-slot.on{opacity:1}
  .ch-node.dl-new{animation:dlPop .38s cubic-bezier(.2,.9,.3,1.25) both, dlGlow 2.8s ease-out .2s both}
  @keyframes dlPop{from{transform:scale(.82);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes dlGlow{0%{box-shadow:0 0 0 2px rgba(167,139,250,.95),0 0 22px rgba(139,92,246,.55)}70%{box-shadow:0 0 0 2px rgba(167,139,250,.6),0 0 14px rgba(139,92,246,.25)}100%{box-shadow:0 0 0 1px rgba(167,139,250,.25)}}
  .ch-edge.dl-edge{stroke:#a78bfa;opacity:1;transition:stroke 2.4s ease .8s, opacity 2.4s ease .8s}
  .ch-edge.dl-edge.dl-settle{stroke:var(--tm);opacity:.7}
  .ch-edge.dl-edge.ch-edge-loopback.dl-settle{stroke:var(--bb);opacity:.85}
  .ch-edge.dl-out{transition:opacity .35s;opacity:0}
  .dl-hl{background:rgba(139,92,246,.28);border-radius:3px;box-shadow:0 0 0 2px rgba(139,92,246,.28);transition:background 2.6s ease 1.4s, box-shadow 2.6s ease 1.4s}
  .dl-hl.dl-settle{background:rgba(139,92,246,.10);box-shadow:0 0 0 2px rgba(139,92,246,.10)}
  li.dl-hl{animation:dlIn .35s ease-out both}
  @keyframes dlIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
  .ch-edge-chip.dl-chip{animation:dlIn .4s ease-out .25s both}
  `;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var cur = document.createElement('div'); cur.id = '__cur';
  cur.innerHTML = '<div id="__rip"></div><svg width="22" height="30" viewBox="0 0 22 30" style="position:absolute;left:-2px;top:-2px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))"><path d="M2 2 L2 23 L7.5 18 L11 27 L15 25.5 L11.5 16.5 L19 16 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  document.body.appendChild(cur);

  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var tween = function (ms, fn) {
    return new Promise(function (res) {
      var t0 = performance.now();
      (function step(now) { var k = Math.min(1, (now - t0) / ms); fn(ease(k)); if (k < 1) requestAnimationFrame(step); else res(); })(t0);
    });
  };
  var cx = 820, cy = 560, ghost = null, gx = 0, gy = 0;
  var place = function () { cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; if (ghost) { ghost.style.left = (cx + gx) + 'px'; ghost.style.top = (cy + gy) + 'px'; } };
  place();

  var vis = function (sel) { return [].slice.call(document.querySelectorAll(sel)).find(function (e) { return e.offsetParent !== null; }); };
  var inner = function () { return vis('.ch-canvas-inner'); };
  var canvas = function () { var i = inner(); return i && i.closest('.ch-canvas'); };
  var outMain = function () { var i = vis('.cs-guidelineInput'); return i && i.closest('.cs-main'); };
  var svgEl = function (tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; };
  var settleLater = function (els) { setTimeout(function () { els.forEach(function (e) { e.classList.add('dl-settle'); }); }, 60); };

  function node(id, label, kind, kindCls, x, y) {
    var n = document.createElement('div');
    n.className = 'ch-node ' + kindCls + ' dl-new'; n.dataset.nodeId = id;
    n.style.left = x + 'px'; n.style.top = y + 'px'; n.style.width = '180px';
    n.innerHTML = '<div class="ch-node-badge">' + id + '</div><div class="ch-node-label">' + label + '</div><div class="ch-node-kind">' + kind + '</div>';
    inner().appendChild(n); return n;
  }
  function edge(from, to, d, loop) {
    var svg = inner().querySelector('.ch-edge-layer');
    var p = svgEl('path', { d: d, 'class': 'ch-edge dl-edge' + (loop ? ' ch-edge-loopback' : ''), 'data-edge-from': from, 'data-edge-to': to });
    svg.appendChild(p);
    if (!loop) { var L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.getBoundingClientRect(); p.style.transition = 'stroke-dashoffset .55s ease-out, stroke 2.4s ease .8s, opacity 2.4s ease .8s'; p.style.strokeDashoffset = 0; setTimeout(function () { p.style.strokeDasharray = ''; }, 700); }
    else { p.style.opacity = 0; p.getBoundingClientRect(); p.style.transition = 'opacity .5s ease .15s, stroke 2.4s ease .8s'; p.style.opacity = ''; }
    settleLater([p]); return p;
  }
  function chip(text, x, y) {
    var c = document.createElement('div'); c.className = 'ch-edge-chip dl-chip'; c.textContent = text; c.style.left = x + 'px'; c.style.top = y + 'px';
    inner().querySelector('.ch-edge-labels').appendChild(c); return c;
  }

  // Clicked in-thread actions stay spent: the deck re-renders the thread, so re-apply.
  var spent = [];
  setInterval(function () {
    if (!spent.length) return;
    [].slice.call(document.querySelectorAll('.nc2__optConfirm, .cs2__action, .fw2__liveBtn')).forEach(function (b) {
      var t = b.textContent.replace(/^\u2713\s*/, '').trim();
      if (spent.indexOf(t) >= 0 && !b.classList.contains('is-taken')) { b.classList.add('is-taken'); b.disabled = true; }
    });
  }, 100);
  var liveCss = document.createElement('style');
  liveCss.textContent = '.fw2__liveBtn.is-taken{color:var(--tm)!important;background:var(--hover,#2b2b2b)!important;border-color:var(--hover,#2b2b2b)!important;cursor:default!important}.fw2__liveBtn.is-taken::before{content:"\\2713";display:inline-block;margin-right:8px;color:var(--tm)}';
  document.head.appendChild(liveCss);

  window.DL = {
    spend: function (t) { t = String(t).replace(/^\u2713\s*/, '').trim(); if (spent.indexOf(t) < 0) spent.push(t); },
    pos: function () { return [cx, cy]; },
    to: function (x, y, ms) { var x0 = cx, y0 = cy; return tween(ms || 600, function (k) { cx = x0 + (x - x0) * k; cy = y0 + (y - y0) * k; place(); }); },
    ripple: function () { var r = document.getElementById('__rip'); r.classList.remove('go'); void r.offsetWidth; r.classList.add('go'); },
    hide: function (h) { cur.style.display = h ? 'none' : ''; },
    box: function (sel, re) {
      var els = [].slice.call(document.querySelectorAll(sel)).filter(function (e) { return e.offsetParent !== null && (!re || new RegExp(re).test(e.textContent)); });
      var e = els[els.length - 1]; if (!e) return null; var r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width, r.height];
    },
    scrollCanvas: function (x, y, ms) { var c = canvas(), x0 = c.scrollLeft, y0 = c.scrollTop; return tween(ms || 1200, function (k) { c.scrollLeft = x0 + (x - x0) * k; c.scrollTop = y0 + (y - y0) * k; }); },
    scrollOut: function (target, ms) { var m = outMain(), y0 = m.scrollTop; return tween(ms || 1000, function (k) { m.scrollTop = y0 + (target - y0) * k; }); },
    // Output scrollTop that puts the element `el` (heading text) at `screenY`.
    outTarget: function (re, screenY) {
      var m = outMain(); var h = [].slice.call(m.querySelectorAll('h2,h3')).find(function (e) { return new RegExp(re).test(e.textContent); });
      return m.scrollTop + h.getBoundingClientRect().top - screenY;
    },
    // --- Canvas -> Output: drag Reflection Step in as Voice Self-Check
    grab: function () {
      var chipEl = [].slice.call(document.querySelectorAll('.ch-pal-chip')).find(function (c) { return c.textContent === 'Reflection Step' && c.offsetParent; });
      ghost = chipEl.cloneNode(true); ghost.classList.add('dl-ghost');
      var r = chipEl.getBoundingClientRect(); ghost.style.width = r.width + 'px'; ghost.style.height = r.height + 'px'; gx = r.left - cx; gy = r.top - cy; ghost.style.transformOrigin = (-gx) + 'px ' + (-gy) + 'px'; document.body.appendChild(ghost); place();
      requestAnimationFrame(function () { requestAnimationFrame(function () { if (ghost) ghost.classList.add('dl-lift'); }); });
      var s = document.createElement('div'); s.className = 'dl-slot'; s.style.left = '1200px'; s.style.top = '680px'; inner().appendChild(s);
      window.__slot = s;
    },
    slot: function (on) { window.__slot.classList.toggle('on', !!on); },
    dropVoiceCheck: function () {
      if (ghost) { ghost.remove(); ghost = null; }
      if (window.__slot) window.__slot.remove();
      node('N55', 'Voice Self-Check', 'Reflection Step', 'ch-kind-neutral', 1200, 680);
      var old = inner().querySelector('.ch-edge[data-edge-from="N14"][data-edge-to="N54"]'); if (old) old.classList.add('dl-out');
      setTimeout(function () {
        edge('N14', 'N55', 'M 1290 617 L 1290 680');
        edge('N55', 'N54', 'M 1380 718 L 1400 718 L 1400 586 L 1420 586');
        edge('N55', 'N13', 'M 1200 718 L 1070 718 L 1070 634', true);
        chip('off-voice: redraft', 1135, 718);
      }, 180);
    },
    voiceLine: function () {
      var m = outMain(); var h = [].slice.call(m.querySelectorAll('h3')).find(function (e) { return /When Someone Asks/.test(e.textContent); });
      var p = h.nextElementSibling; while (p && !p.matches('p')) { var q = p.querySelector && p.querySelector('p'); if (q) { p = q; break; } p = p.nextElementSibling; }
      var s = document.createElement('span'); s.className = 'dl-hl';
      s.textContent = ' After styling, a Voice Self-Check compares each draft with the Robbies’ own takes on the subject and sends anything off-voice back for a redraft.';
      p.appendChild(s); settleLater([s]);
    },
    // --- Output -> Canvas: a guideline becomes a guardrail check
    armGuideline: function () {
      var i = vis('.cs-guidelineInput'), b = i.parentElement.querySelector('.cs-guidelineBtn');
      i.readOnly = false; i.tabIndex = 0; b.tabIndex = 0;
      i.addEventListener('input', function () { b.disabled = !i.value.trim(); });
      b.addEventListener('click', function () { window.DL.addGuideline(); });
    },
    addGuideline: function () {
      var i = vis('.cs-guidelineInput'), b = i.parentElement.querySelector('.cs-guidelineBtn');
      var text = i.value.trim(); if (!text) return;
      var wrap = i.closest('.cs-guidelineAdd'); var ul = null, e = wrap;
      while (e && !ul) { e = e.previousElementSibling; if (e && e.matches('ul')) ul = e; else if (e) ul = e.querySelector && e.querySelector('ul.cs-projList'); }
      if (!ul) ul = wrap.parentElement.querySelector('ul.cs-projList');
      var li = document.createElement('li'); li.className = 'cs-projItem dl-hl'; li.textContent = text.replace(/^Never /, 'A ').replace(/^A state a score prediction as fact\.?$/, 'A score prediction stated as fact.');
      ul.appendChild(li); settleLater([li]);
      i.value = ''; b.disabled = true;
    },
    scoreNode: function () {
      node('N56', 'Score-Prediction Check', 'Action', 'ch-kind-info', 1860, 1100);
      var sc = [].slice.call(inner().querySelectorAll('.ch-scope')).find(function (s) { return /Guardrail Gauntlet/.test(s.textContent); });
      if (sc) { sc.style.transition = 'height .45s ease'; sc.style.height = '704px'; }
      setTimeout(function () {
        edge('N15', 'N56', 'M 1820 586 L 1840 586 L 1840 1138 L 1860 1138');
        edge('N56', 'N21', 'M 2040 1138 L 2060 1138 L 2060 866 L 2080 866');
      }, 180);
    },
    // --- Pre-flight carries the two new checks
    addChecks: function () {
      var pf = window.DEMO_DATA && window.DEMO_DATA.preflight; if (!pf || pf.__dl) return;
      var d = Object.getOwnPropertyDescriptor(pf, 'checks'), get = d.get;
      var extra = [{ id: '', name: 'Voice Self-Check Loop', status: 'pass', detail: '' }];
      Object.defineProperty(pf, 'checks', { configurable: true, enumerable: true, get: function () { var c = get.call(pf); c.splice(4, 0, extra[0]); return c; } });
      pf.__dl = true;
    },
  };
})();
