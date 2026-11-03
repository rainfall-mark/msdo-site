// Demo-only display tweaks, applied after the live layer loads.
// Elapsed times past an hour read as hours or days instead of thousands of minutes.
kwElapsed = function(iso){ const t = Date.parse(iso); if (isNaN(t)) return ''; const s = Math.max(0, Math.round((Date.now()-t)/1000));
  if (s < 60) return s + 's'; if (s < 3600) return Math.floor(s/60) + 'm ' + (s%60) + 's'; if (s < 86400) return Math.floor(s/3600) + 'h'; return Math.floor(s/86400) + 'd'; };
// "Saved so far" shows dollars a year from verified kills, so it moves as the agent finishes one.
(function(){
  const base = renderGlobalStats;
  renderGlobalStats = function(){
    base();
    const slots = document.querySelectorAll('.gstat-value');
    if (slots[1] && typeof kwStats === 'function') { const s = kwStats().saved; slots[1].textContent = s > 0 ? fmt(s) : '—'; }
    // To Kill: what is still on the list, so it drops as kills finish.
    if (slots[3] && typeof kwKill === 'function') { const left = M.filter(m => m.included !== false && m.priority === 'Cancel' && !/\b(killed|cancell?ed)\b/i.test(m.status||'') && !KW_DONE.has(kwState(kwKill(m)))).reduce((a,m)=>a+(m.ann||0),0); slots[3].textContent = left > 0 ? fmt(left) : '—'; }
    const notes = document.querySelectorAll('.gstat-savings-note');
    if (notes[1]) notes[1].textContent = 'A year, from confirmed kills';
  };
  renderGlobalStats();
})();
// Open on the agent's overview (Waiting on you, Working, Ready to kill, Saved) instead of auto-picking an item.
if (typeof KWL !== 'undefined' && !location.hash){ KWL.panel.slug = null; KWL.panel.cleared = true; kwRenderPanel(); }
// Give the go-ahead card room so the quote, details and both buttons show together.
(function(){ const st = document.createElement('style'); st.textContent = '.kwa-actions:has(.kw-gate),.kwa-actions:has(.kw-done){max-height:52%}'; document.head.appendChild(st); })();
