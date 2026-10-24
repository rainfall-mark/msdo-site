import sys
def patch(s):
    def rep(a,b,n=1):
        nonlocal s; assert s.count(a)==n,(a[:50],s.count(a)); s=s.replace(a,b)
    # Helper: split a trend into runs colored by where the trend sits against the range.
    helper = '''  const markColor = st => st === 'high' ? 'var(--high-mark)' : st === 'low' ? 'var(--low-mark)' : st === 'ok' ? 'var(--ok-mark)' : 'var(--neutral-mark)';
  // Trend segments: green while the trend is inside the range, high/low color where it leaves it.
  // Each run shares its end point with the next so the line stays continuous.
  function trendRuns(m, samples) {
    const ranged = m.state !== 'other' && (m.rmin != null || m.rmax != null);
    const stOf = v => !ranged ? m.state : (m.rmax != null && v > m.rmax) ? 'high' : (m.rmin != null && v < m.rmin) ? 'low' : 'ok';
    const runs = [];
    samples.forEach(p => {
      const st = stOf(p.v), last = runs[runs.length - 1];
      if (last && last.st === st) last.pts.push(p);
      else { if (last) last.pts.push(p); runs.push({ st, pts: [p] }); }
    });
    return runs.filter(r => r.pts.length > 1);
  }
  const trendPolylines = (runs, X, Y, width) => runs.map(r => `<polyline points="${r.pts.map(p => `${X(p.t).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ')}" fill="none" stroke="${markColor(r.st)}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
'''
    rep("  const markColor = st => st === 'high' ? 'var(--high-mark)' : st === 'low' ? 'var(--low-mark)' : st === 'ok' ? 'var(--ok-mark)' : 'var(--neutral-mark)';\n", helper)
    # sparkline
    rep("""      const pts = []; for (let k = 0; k <= 40; k++) { const t = t0 + (t1 - t0) * k / 40; pts.push(`${X(t).toFixed(1)},${Y(tr.f((t - tr.t0) / 864e5)).toFixed(1)}`); }
      trend = `<polyline points="${pts.join(' ')}" fill="none" stroke="${markColor(m.state)}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;""",
        """      const samples = []; for (let k = 0; k <= 40; k++) { const t = t0 + (t1 - t0) * k / 40; samples.push({ t, v: tr.f((t - tr.t0) / 864e5) }); }
      trend = trendPolylines(trendRuns(m, samples), X, Y, 1.6);""")
    # full chart
    rep("""      const pts = []; for (let k = 0; k <= 120; k++) { const t = t0 + (t1 - t0) * k / 120; pts.push(`${X(t).toFixed(1)},${Y(tr.f((t - tr.t0) / 864e5)).toFixed(1)}`); }
      svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${markColor(m.state)}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;""",
        """      const samples = []; for (let k = 0; k <= 120; k++) { const t = t0 + (t1 - t0) * k / 120; samples.push({ t, v: tr.f((t - tr.t0) / 864e5) }); }
      svg += trendPolylines(trendRuns(m, samples), X, Y, 2.4);""")
    # legend swatch: two-tone (green into the status color) when the marker is out of range
    rep("""${trendFor(m) ? `<span><svg width="22" height="6" aria-hidden="true"><line x1="1" y1="3" x2="21" y2="3" stroke="${markColor(st)}" stroke-width="2.4" stroke-linecap="round"/></svg>Trend</span>` : ''}""",
        """${trendFor(m) ? `<span><svg width="22" height="6" aria-hidden="true">${st === 'high' || st === 'low' ? `<line x1="1" y1="3" x2="11" y2="3" stroke="var(--ok-mark)" stroke-width="2.4" stroke-linecap="round"/><line x1="11" y1="3" x2="21" y2="3" stroke="${markColor(st)}" stroke-width="2.4" stroke-linecap="round"/>` : `<line x1="1" y1="3" x2="21" y2="3" stroke="${markColor(st)}" stroke-width="2.4" stroke-linecap="round"/>`}</svg>Trend</span>` : ''}""")
    return s
for f in sys.argv[1:]:
    s=open(f).read(); open(f,'w').write(patch(s)); print('patched', f)
