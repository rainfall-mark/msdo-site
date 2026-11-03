// ─────────────────────────────────────────────────────────────
// KILLSWITCH DEMO RUNTIME (MSDO Lab)
// The real live dashboard runs as a private claude.ai page: a small database,
// a browser agent (Claude driving your own Chrome) and an in-page Claude chat.
// This public demo replaces all three with a local simulation so it runs as a
// static page. Every subscription, site, account and confirmation is sample data.
// Nothing is sent anywhere; reloading the page resets it.
// ─────────────────────────────────────────────────────────────
(function(){
  const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
  const store = new Map();            // 'coll/id' -> data
  const collSubs = {};                // coll -> [cb]
  const docSubs = {};                 // path -> [cb]
  const nowIso = (ms) => new Date(Date.now() - (ms || 0)).toISOString();
  const rid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  let pending = false; const dirty = new Set();
  function emit(path){
    dirty.add(path);
    if (pending) return; pending = true;
    setTimeout(() => {
      pending = false; const paths = [...dirty]; dirty.clear();
      const colls = new Set(paths.map(p => p.split('/')[0]));
      colls.forEach(c => (collSubs[c] || []).forEach(cb => cb(collSnap(c))));
      paths.forEach(p => (docSubs[p] || []).forEach(cb => cb(docSnap(p))));
    }, 0);
  }
  function collSnap(c){
    const docs = [];
    store.forEach((v, k) => { if (k.startsWith(c + '/')) docs.push({id: k.slice(c.length + 1), data: () => clone(v)}); });
    return {docs, size: docs.length, empty: !docs.length};
  }
  function docSnap(p){ const v = store.get(p); return {id: p.split('/').pop(), exists: v !== undefined, data: () => clone(v)}; }
  function docRef(path){
    return {
      id: path.split('/').pop(),
      async get(){ return docSnap(path); },
      async set(d){ store.set(path, clone(d)); emit(path); onWrite(path); },
      async update(p){ if (!store.has(path)) throw new Error('not found'); store.set(path, Object.assign(store.get(path), clone(p))); emit(path); onWrite(path); },
      async delete(){ store.delete(path); emit(path); },
      onSnapshot(cb){ (docSubs[path] = docSubs[path] || []).push(cb); setTimeout(() => cb(docSnap(path)), 0); return () => {}; },
    };
  }
  const db = {
    collection(c){ return {
      doc(id){ return docRef(c + '/' + (id || rid())); },
      onSnapshot(cb){ (collSubs[c] = collSubs[c] || []).push(cb); setTimeout(() => cb(collSnap(c)), 0); return () => {}; },
    }; },
    doc(p){ return docRef(p); },
  };
  const put = (p, d) => store.set(p, d);
  const patch = (p, d) => { store.set(p, Object.assign(store.get(p) || {}, d)); emit(p); };

  // ── Seed: a few kills already in motion so the dashboard looks lived in ──
  const DAY = 86400000;
  put('config/agent', {last_seen: nowIso(20000)});
  put('kills/streamhub-sports', {name:'StreamHub Sports', ann:419.88, priority:'Cancel', state:'verifying', attempts:1,
    step:'Canceled Oct 28. Your next statement confirms no new charge.', domain:'streamhub.example', updated_at: nowIso(5*DAY),
    result:{killed_at: nowIso(5*DAY), live_line:'Your membership is canceled. Access ends Nov 27.', confirmation_id:'SH-20931', effective_end:'2026-11-27'},
    history:[{at:nowIso(5*DAY+600000), text:'Opened streamhub.example in your Chrome'}, {at:nowIso(5*DAY+300000), text:'Declined the 3-months-for-$9.99 offer'}, {at:nowIso(5*DAY), text:'You said yes. Clicked "Cancel membership"'}],
    feed:[{at:nowIso(5*DAY+700000), from:'you', text:'You pressed Start kill'},
          {at:nowIso(5*DAY+600000), from:'claude', text:'Picked this up. Opening streamhub.example in your Chrome.'},
          {at:nowIso(5*DAY+300000), from:'claude', text:'They offered 3 months for $9.99. Declined it, as your rules say. Stopped at the final screen.'},
          {at:nowIso(5*DAY), from:'you', text:'Yes, click "Cancel membership"'},
          {at:nowIso(5*DAY-60000), from:'claude', text:'Done. The account page says "Canceled, access ends Nov 27". Confirmation SH-20931. I will check your next statement too.'}]});
  put('kills/initech-cinema', {name:'Initech Cinema+', ann:179.88, priority:'Cancel', state:'verified_statement', updated_at: nowIso(220*DAY), step:'No charge since March. Confirmed on your statements.'});
  put('kills/gymco-membership', {name:'GymCo Membership', ann:468, priority:'Cancel', state:'verified_statement', updated_at: nowIso(250*DAY), step:'No charge since February. Confirmed on your statements.'});
  put('kills/mystchg-svc-8885550123', {name:'MYSTCHG*SVC 8885550123', ann:119.88, priority:'Cancel', state:'ready', updated_at: nowIso(2*DAY),
    hold:'Nobody knows what this charge is yet. Identify it before anything is canceled.'});

  // ── The simulated browser agent ──
  const SITES = {
    'crunchwise-meal-kits': {domain:'crunchwise.example', plan:'Family plan · 3 meals a week · $39.98 a box', path:'Account → Plan settings',
      offer:'They offered 50% off the next two boxes. Declined it, as your rules say.',
      screen:'Cancel your plan? Your last box ships Nov 12 and nothing is charged after that.', button:'Cancel my plan',
      heads:'A box already locked for this week still ships', live:'Your plan is canceled. Last delivery Nov 12', conf:'CW-48213', end:'2026-11-12'},
    'nebula': {domain:'nebulaplus.example', plan:'Nebula+ Standard · $11.99 a month', path:'Account → Membership',
      offer:'They offered half price for 3 months. Declined it.',
      screen:'Are you sure? Your membership ends Nov 30 and you will not be charged again.', button:'Finish cancellation',
      live:'Membership canceled. Access until Nov 30', conf:'NB-77120', end:'2026-11-30'},
    'scribe-notes-ai': {domain:'scribenotes.example', plan:'Pro · $18 a month', path:'Settings → Billing', export:true,
      screen:'Cancel Pro? Your notes stay readable on the free plan.', button:'Cancel subscription',
      live:'Subscription canceled. You are on the Free plan from Nov 21', conf:'SN-30458', end:'2026-11-21'},
    'formflow-pro': {domain:'formflow.example', plan:'Pro workspace · $29 a month', path:'Workspace → Billing',
      screen:'Downgrade to Free and cancel billing? Pro features stop today.', button:'Downgrade and cancel',
      live:'You are on Free. Billing canceled. Refund of $29.00 requested', conf:'FF-11873', end:'2026-11-02'},
    'cloudvault-storage': {domain:'cloudvault.example', plan:'2 TB · $9.99 a month (using 140 GB)', path:'Account → Manage plan', reduce:true,
      screen:'Switch to 200 GB for $2.99 a month? The change starts with your next bill.', button:'Switch to 200 GB',
      heads:'Uploads pause if you go over 200 GB', live:'Plan changed to 200 GB, $2.99 a month, from Nov 18', conf:'CV-60291', end:'2026-11-18'},
    'audiobooks-hub': {domain:'audiobookshub.example', plan:'Premium · $14.95 a month · 6 credits banked', path:'Account → Membership details', reduce:true,
      screen:'Switch to Basic for $7.95 a month? Your 6 credits stay with you.', button:'Switch to Basic',
      live:'You are on Basic, $7.95 a month. 6 credits kept', conf:'AH-90314', end:'2026-11-15'},
  };
  const PACKETS = {
    'pulse-fitness-app': {state:'manual_packet', packet:'This one is billed by the App Store, so only your iPhone can cancel it. Settings → your name → Subscriptions → Pulse Fitness → Cancel Subscription. It stays active until Jan 14. Press "I did it" when you are done.'},
    'boxit-self-storage': {state:'manual_packet', packet:'Unit changes happen at the front desk. Bring your ID and ask: "I would like to move from my 10x10 to a 5x10, and keep auto-pay." Typical 5x10 rate: about $60 a month. Press "I did it" when you have switched.'},
    'daily-ledger-digital': {state:'awaiting_user_send', packet:'Subject: Cancel my digital subscription\n\nHello, please cancel my Daily Ledger Digital subscription for sam.avery@example.com effective today, and send a confirmation by email. No retention offer needed. Thank you, Sam Avery'},
    'mystchg-svc-8885550123': {state:'manual_packet', packet:'Call the number on your card and say: "I want to dispute a recurring charge from MYSTCHG*SVC 8885550123 and block it from billing again." Ask for a reference number.'},
  };
  const agentSeen = () => patch('config/agent', {last_seen: nowIso()});
  setInterval(agentSeen, 20000);
  const timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms * (window.KS_SLOW || 1)));
  const killDoc = slug => store.get('kills/' + slug);
  const mOf = slug => (typeof M !== 'undefined' ? M.find(m => kwSlug(m) === slug) : null) || {};
  function say(slug, text, extra){
    const k = killDoc(slug) || {}; const m = mOf(slug);
    const feed = (k.feed || []).concat([{at: nowIso(), from: 'claude', text}]).slice(-80);
    const hist = (k.history || []).concat(extra && extra.hist ? [{at: nowIso(), text: extra.hist}] : []).slice(-20);
    const base = store.has('kills/' + slug) ? {} : {name: m.name, ann: m.ann, priority: m.priority};
    const d = Object.assign(base, extra && extra.set || {}, {feed, history: hist, updated_at: nowIso()});
    patch('kills/' + slug, d);
  }
  function take(path){ patch(path, {status:'taken', taken_at: nowIso()}); agentSeen(); }
  function done(path){ patch(path, {status:'handled', handled_at: nowIso()}); }

  function runStart(path, r){
    const slug = r.slug, m = mOf(slug), site = SITES[slug], pk = PACKETS[slug];
    later(900, () => take(path));
    if (pk){
      later(2200, () => say(slug, 'Picked this up. ' + (pk.state === 'awaiting_user_send' ? 'Their cancel runs through a support chat, so an email is the cleaner route. Drafted it for you.' : 'This one needs you, so I wrote out exactly what to do.'), {set:{state:'executing', step:'Preparing your steps', attempts:1}, hist:'Picked up'}));
      later(4200, () => { say(slug, pk.state === 'awaiting_user_send' ? 'The email is below. Send it from your own inbox, then press "I sent it".' : 'Your steps are below. Press "I did it" when it is done and I will check your next statement.', {set:{state:pk.state, packet:pk.packet, step: pk.state === 'awaiting_user_send' ? 'Email drafted. Send it yourself.' : 'Your turn: steps below'}}); done(path); });
      return;
    }
    const s = site || {domain: (String(m.name||'site').toLowerCase().replace(/[^a-z0-9]+/g,'') + '.example'), plan: m.freq + ' · ' + kwMoney(m.mo) + ' a month', path:'Account → Billing', screen:'Cancel your subscription? You will not be charged again.', button:'Cancel subscription', live:'Subscription canceled', conf:'DM-' + Math.floor(10000 + Math.random()*89999), end:'2026-11-30'};
    later(2000, () => say(slug, `Picked this up. Opening ${s.domain} in your Chrome.`, {set:{state:'executing', step:`Opening ${s.domain}`, domain:s.domain, attempts:1}, hist:`Opened ${s.domain}`}));
    later(4200, () => say(slug, `Signed in as sam.avery@example.com. Going to ${s.path}.`, {set:{step:`Signed in · ${s.path}`}, hist:'Found the account'}));
    if (s.export) later(6000, () => say(slug, 'Exported your notes first, as the steps say. They are in your Downloads.', {set:{step:'Exported your notes'}, hist:'Exported notes'}));
    if (s.offer) later(6200, () => say(slug, s.offer, {set:{step:'Skipped the retention offer'}, hist:'Declined the offer'}));
    later(s.offer || s.export ? 8400 : 6800, () => {
      const nonce = rid();
      say(slug, `Stopped at the final screen. It shows your ${s.plan}. Press Yes and I'll click "${s.button}".`, {set:{state:'ready_to_commit', step:'Waiting for your go-ahead', paused:true,
        gate:{nonce, screen_says:s.screen, button_label:s.button, account_shown:'sam.avery@example.com', domain:s.domain, plan_shown:s.plan, destructive:s.heads||''}}, hist:'Reached the final screen'});
      done(path);
    });
  }
  function runConfirm(path, r){
    const slug = r.slug, k = killDoc(slug), s = SITES[slug] || {};
    later(700, () => take(path));
    if (!k || !k.gate || k.gate.nonce !== r.nonce || k.state !== 'ready_to_commit'){ later(1200, () => done(path)); return; }
    const label = k.gate.button_label;
    later(1600, () => say(slug, `Clicked "${label}".`, {set:{state:'submitted', step:'Submitted · confirming with the site', paused:false, committed_at: nowIso()}, hist:`You said yes. Clicked "${label}"`}));
    later(3800, () => say(slug, 'Opened the account page fresh to check it took.', {set:{state:'verifying', step:'Checking the account page'}}));
    later(6000, () => {
      say(slug, `Done. The account page now says "${s.live || 'Canceled'}". Confirmation ${s.conf || 'on file'}. I'll check your next statement too.`, {set:{state:'verified_live', step: s.live || 'Canceled', gate:null,
        result:{killed_at: nowIso(), live_line: s.live || 'Canceled', confirmation_id: s.conf || '', effective_end: s.end || ''}}, hist:'Verified on the account page'});
      done(path);
    });
  }
  function runSimple(path, r){
    const slug = r.slug, k = killDoc(slug) || {};
    later(700, () => take(path));
    if (r.kind === 'SKIP'){ later(1400, () => { say(slug, 'Stopped. Nothing was clicked. It stays on your dashboard.', {set:{state:'skipped', step:'Skipped · nothing changed', gate:null, paused:false}}); done(path); }); return; }
    if (r.kind === 'DONE_MANUAL'){ later(1500, () => { say(slug, 'Thanks. Marked as submitted. Your next statement confirms it stopped.', {set:{state:'verifying', step:'Checking your next statement', committed_at: nowIso(), packet:''}, hist:'You did it yourself'}); done(path); }); return; }
    if (r.kind === 'SIGNED_IN'){ later(1500, () => { say(slug, 'You are signed in now. Carrying on.', {set:{state:'executing', step:'Signed in · carrying on', paused:false}}); done(path); }); later(3500, () => runStart(path, r)); return; }
    if (r.kind === 'RUN' && slug === 'mystchg-svc-8885550123'){
      later(2000, () => say(slug, 'Searching your email for MYSTCHG and 888-555-0123.', {set:{state:'executing', step:'Searching your email'}}));
      later(5200, () => { say(slug, 'Found it: a welcome email from May for "PhotoShelf Plus", a photo backup add-on from a phone upgrade. It bills as MYSTCHG*SVC. Nothing is backed up there since June. The hold is cleared, so Start kill is back.', {set:{state:'ready', step:'Identified: PhotoShelf Plus photo backup', hold:''}, hist:'Identified the charge'}); done(path); });
      return;
    }
    if (r.kind === 'RUN'){ later(2200, () => { say(slug, 'Went through the recommended steps on the site. Nothing changed; here is what I found: the plan and price match your statement, and the change can be made online in a minute. Say the word and I will take it to the final screen.', {set:{state: k.state || 'ready', step:'Checked the site'}}); done(path); }); return; }
    if (r.kind === 'MESSAGE'){ later(1600, () => { say(slug, 'Noted. I saved that on this item.'); done(path); }); return; }
    later(1200, () => done(path));
  }
  function onWrite(path){
    if (!path.startsWith('requests/')) return;
    const r = store.get(path); if (!r || r.status !== 'new') return;
    if (r.kind === 'START' || r.kind === 'NEGOTIATE') runStart(path, r);
    else if (r.kind === 'CONFIRM') runConfirm(path, r);
    else runSimple(path, r);
  }

  // ── The in-column Claude, answering from the item's own data ──
  function lastUserLine(input){
    const who = (typeof KW_WHO === 'string' ? KW_WHO : 'Sam') + ': ';
    const i = input.lastIndexOf('\n' + who); return i < 0 ? '' : input.slice(i + who.length + 1).trim();
  }
  async function stream(text, onText){
    const words = text.split(' '); let out = '';
    await new Promise(r => setTimeout(r, 650));
    for (const w of words){ out += (out ? ' ' : '') + w; if (onText) onText({text: out}); await new Promise(r => setTimeout(r, 28)); }
    return text;
  }
  async function sample(input, opts){
    opts = opts || {};
    const q = lastUserLine(String(input)).toLowerCase();
    const slug = KWL.panel && KWL.panel.slug, m = mOf(slug), tools = {};
    (opts.tools || []).forEach(t => tools[t.name] = t);
    const call = async (n, args) => { try { if (tools[n]) await tools[n].execute(args); } catch(e){} };
    let reply;
    if (/\b(keep|still use|love|need) (it|this)|\bkeep\b/.test(q) && !/don.?t keep/.test(q)){
      await call('save_note', {note: 'Sam wants to keep this one.'}); await call('set_priority', {priority:'Keep', reason:'You still use it'});
      reply = 'Got it. It is marked Keep and off the kill list. I left a note so the next refresh does not flag it again.';
    } else if (/already|cancel(l)?ed it|it.?s gone|paused/.test(q)){
      await call('set_status', {state:'verifying', note:'You said it already ended. Your next statement confirms it.'});
      reply = 'Thanks. I marked it as checking: if no new charge shows on your next statement, it counts as killed.';
    } else if (/cheaper|deal|offer|discount|price|negotiat/.test(q)){
      reply = `Services like this often offer a discount on the cancel screen. If you would rather keep ${m.name || 'it'} for less, the agent can take the cancel flow to the offer screen and stop there, so you can decide. Nothing is accepted without your Yes.`;
    } else if (/what is|what.?s this|identify|recogni|don.?t know/.test(q)){
      reply = (kwKill(m)||{}).hold ? 'It has a hold until we know what it is. Press "Help me identify it" and the browser agent searches your email for the welcome message.' : `${m.name} bills as "${m.name}" on your card. ${m.why || ''}`;
    } else if (/how much|save|saving/.test(q)){
      reply = `It costs ${kwMoney(m.mo)} a month, about ${kwMoney(m.ann)} a year. ${m.priority === 'Reduce' ? 'The recommended change keeps it at a lower price.' : m.priority === 'Cancel' ? 'Killing it saves the full amount from the next billing date.' : ''}`.trim();
    } else if (/why|should i/.test(q)){
      reply = (m.why || 'This one is flagged for a look.') + (m.priority === 'Cancel' || m.priority === 'Reduce' ? ' Press Start when you are ready. I stop for your go-ahead before the final click.' : '');
    } else if (/cancel|kill|get rid/.test(q) && m.priority !== 'Cancel' && m.priority !== 'Reduce'){
      await call('set_priority', {priority:'Cancel', reason:'You decided to cancel it'});
      reply = 'Done: it is on the kill list now. Press Start kill when you are ready and I will take it to the final screen.';
    } else {
      reply = `Here is where ${m.name || 'it'} stands: ${m.why || 'flagged for a look.'} Tell me if you still use it, or press Start and I will handle the website for you.`;
    }
    return {text: await stream(reply, opts.onText)};
  }
  sample.limits = async () => ({images: {mediaTypes: [], maxCount: 0}});
  sample.json = async (input) => {
    // "Add a subscription": pull a name, price and cadence out of what was typed.
    const t = (String(input).split('USER TEXT:\n')[1] || '').split('\n\nFILES:')[0].trim();
    if (!t) return {items: []};
    await new Promise(r => setTimeout(r, 900));
    const amt = (t.match(/\$?\s*(\d+(?:\.\d{1,2})?)/) || [])[1];
    const freq = /year|annual|\/yr/i.test(t) ? 'Annual' : /week/i.test(t) ? 'Weekly' : /quarter/i.test(t) ? 'Quarterly' : 'Monthly';
    const name = (t.split(/[,$\d]/)[0] || 'New subscription').replace(/\b(app|subscription)\b/ig, '').trim().slice(0, 40) || 'New subscription';
    const cat = /calm|headspace|meditat|fitness|yoga|vitamin/i.test(t) ? 'Health & Supplements' : /stream|tv|music|movie|podcast/i.test(t) ? 'Streaming & Entertainment' : /news|times|magazine/i.test(t) ? 'News & Publishing' : 'Other';
    const ren = (t.match(/renews? in ([A-Za-z]+)/i) || [])[1];
    return {items: [{name, amount: Number(amt) || 0, frequency: freq, category: cat, last_charged: null, notes: ren ? 'Renews in ' + ren : ''}]};
  };
  window.claude = {
    use: async (cap) => ({
      db,
      user: {isOwner: () => true, name: 'Sam Avery'},
      sample,
    })[cap] || null,
  };
})();
