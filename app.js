// ذهب لايف 2.0 — منطق الواجهة
'use strict';
const TZ = 'Asia/Dubai';
const OZ = 31.1034768, TOLA = 11.6638038, LB_KG = 0.45359237;
const $ = id => document.getElementById(id);

const FX_NAMES = {
  USD: ['دولار أمريكي', '🇺🇸'], AED: ['درهم إماراتي', '🇦🇪'], EUR: ['يورو', '🇪🇺'], GBP: ['جنيه إسترليني', '🇬🇧'], SAR: ['ريال سعودي', '🇸🇦'],
  KWD: ['دينار كويتي', '🇰🇼'], QAR: ['ريال قطري', '🇶🇦'], OMR: ['ريال عماني', '🇴🇲'], BHD: ['دينار بحريني', '🇧🇭'], INR: ['روبية هندية', '🇮🇳'],
  PKR: ['روبية باكستانية', '🇵🇰'], EGP: ['جنيه مصري', '🇪🇬'], JPY: ['ين ياباني', '🇯🇵'], CNY: ['يوان صيني', '🇨🇳'], TRY: ['ليرة تركية', '🇹🇷'],
  CHF: ['فرنك سويسري', '🇨🇭'], JOD: ['دينار أردني', '🇯🇴'], PHP: ['بيزو فلبيني', '🇵🇭'], RUB: ['روبل روسي', '🇷🇺'], SYP: ['ليرة سورية (الجديدة)', '🇸🇾'], CAD: ['دولار كندي', '🇨🇦'],
  AUD: ['دولار أسترالي', '🇦🇺'], IQD: ['دينار عراقي', '🇮🇶'], BDT: ['تاكا بنغلاديشي', '🇧🇩'], LKR: ['روبية سريلانكية', '🇱🇰'], NPR: ['روبية نيبالية', '🇳🇵'],
  MAD: ['درهم مغربي', '🇲🇦'], SGD: ['دولار سنغافوري', '🇸🇬'], HKD: ['دولار هونغ كونغ', '🇭🇰'], KRW: ['وون كوري', '🇰🇷'], LBP: ['ليرة لبنانية', '🇱🇧']
};
const STOCK_NAMES = {
  'ADX:FAB': 'بنك أبوظبي الأول', 'ADX:IHC': 'العالمية القابضة', 'ADX:ALDAR': 'الدار العقارية', 'ADX:ADCB': 'بنك أبوظبي التجاري', 'ADX:ADIB': 'مصرف أبوظبي الإسلامي',
  'ADX:ADNOCGAS': 'أدنوك للغاز', 'ADX:ADNOCDRILL': 'أدنوك للحفر', 'ADX:ALPHADHABI': 'ألفا ظبي', 'ADX:ADPORTS': 'موانئ أبوظبي',
  'DFM:EMAAR': 'إعمار العقارية', 'DFM:EMIRATESNBD': 'الإمارات دبي الوطني', 'DFM:DIB': 'بنك دبي الإسلامي', 'DFM:DEWA': 'هيئة كهرباء ومياه دبي', 'DFM:SALIK': 'سالك',
  'DFM:DU': 'دو', 'DFM:AIRARABIA': 'العربية للطيران', 'DFM:EMAARDEV': 'إعمار للتطوير',
  AAPL: 'أبل', MSFT: 'مايكروسوفت', NVDA: 'إنفيديا', GOOGL: 'ألفابت (جوجل)', AMZN: 'أمازون', META: 'ميتا', TSLA: 'تسلا', 'BRK-B': 'بيركشاير',
  JPM: 'جي بي مورغان', V: 'فيزا', TSM: 'TSMC', AVGO: 'برودكوم', NFLX: 'نتفليكس', AMD: 'AMD', XOM: 'إكسون موبيل', ORCL: 'أوراكل', WMT: 'وول مارت',
  '2222.SR': 'أرامكو', 'EMAAR.AE': 'إعمار', 'FAB.AE': 'بنك أبوظبي الأول', 'ADNOCGAS.AE': 'أدنوك للغاز'
};
// شعارات الشركات: تُحمَّل مباشرة من الإنترنت مع بدائل تلقائية
const DOMAINS = {
  'ADX:FAB': 'bankfab.com', 'ADX:IHC': 'ihcuae.com', 'ADX:ALDAR': 'aldar.com', 'ADX:ADCB': 'adcb.com', 'ADX:ADIB': 'adib.ae', 'ADX:ADNOCGAS': 'adnocgas.ae',
  'ADX:ADNOCDRILL': 'adnocdrilling.ae', 'ADX:ALPHADHABI': 'alphadhabi.com', 'ADX:ADPORTS': 'adportsgroup.com', 'DFM:EMAAR': 'emaar.com', 'DFM:EMIRATESNBD': 'emiratesnbd.com',
  'DFM:DIB': 'dib.ae', 'DFM:DEWA': 'dewa.gov.ae', 'DFM:SALIK': 'salik.ae', 'DFM:DU': 'du.ae', 'DFM:AIRARABIA': 'airarabia.com', 'DFM:EMAARDEV': 'emaardevelopment.ae',
  AAPL: 'apple.com', MSFT: 'microsoft.com', NVDA: 'nvidia.com', GOOGL: 'google.com', GOOG: 'google.com', AMZN: 'amazon.com', META: 'meta.com',
  TSLA: 'tesla.com', 'BRK-B': 'berkshirehathaway.com', JPM: 'jpmorganchase.com', V: 'visa.com', MA: 'mastercard.com', TSM: 'tsmc.com',
  AVGO: 'broadcom.com', NFLX: 'netflix.com', AMD: 'amd.com', XOM: 'exxonmobil.com', ORCL: 'oracle.com', WMT: 'walmart.com', INTC: 'intel.com',
  KO: 'coca-cola.com', PEP: 'pepsico.com', DIS: 'disney.com', NKE: 'nike.com', BA: 'boeing.com', IBM: 'ibm.com', ADBE: 'adobe.com', CRM: 'salesforce.com',
  PLTR: 'palantir.com', UBER: 'uber.com', COIN: 'coinbase.com', BABA: 'alibaba.com', SONY: 'sony.com', MCD: 'mcdonalds.com', SBUX: 'starbucks.com',
  '2222.SR': 'aramco.com', 'EMAAR.AE': 'emaar.com', 'FAB.AE': 'bankfab.com', 'ADNOCGAS.AE': 'adnocgas.ae', 'EMIRATESNBD.AE': 'emiratesnbd.com',
  'DEWA.AE': 'dewa.gov.ae', 'SALIK.AE': 'salik.ae', 'ETISALAT.AE': 'eand.com', '1120.SR': 'alrajhibank.com.sa', '2010.SR': 'sabic.com'
};
function logoSources(sym) {
  if (sym.includes(':')) {
    const q = ((data && data.uae) || []).find(x => x.symbol === sym), tv = q && q.logoid ? [`https://s3-symbol-logo.tradingview.com/${q.logoid}--big.svg`, `https://s3-symbol-logo.tradingview.com/${q.logoid}.svg`] : [];
    return [`logos/${sym.replace(':', '_')}.svg`].concat(tv, DOMAINS[sym] ? [`https://www.google.com/s2/favicons?domain=${DOMAINS[sym]}&sz=256`, `https://icons.duckduckgo.com/ip3/${DOMAINS[sym]}.ico`] : []);
  }
  if (false) return DOMAINS[sym] ? [`https://www.google.com/s2/favicons?domain=${DOMAINS[sym]}&sz=256`, `https://icons.duckduckgo.com/ip3/${DOMAINS[sym]}.ico`] : [];
  const base = sym.split('.')[0];
  const list = [`https://financialmodelingprep.com/image-stock/${encodeURIComponent(sym)}.png`];
  if (base !== sym) list.push(`https://financialmodelingprep.com/image-stock/${encodeURIComponent(base)}.png`);
  if (DOMAINS[sym]) list.push(`https://www.google.com/s2/favicons?domain=${DOMAINS[sym]}&sz=256`);
  return list;
}
function logoHtml(sym, cls = '') {
  const src = logoSources(sym);
  return `<span class="logo-chip ${cls}${src[0] && src[0].startsWith('logos/') ? ' sq' : ''}" data-letter="${cls.includes('brand') ? sym.replace(/^[A-Z]+:/, '').replace(/\.[A-Z]+$/, '') : sym.replace(/[^A-Z0-9]/gi, '').slice(0, 2)}" title="${STOCK_NAMES[sym] || sym} · ${sym}"><img src="${src[0]}" data-alt="${src.slice(1).join('|')}" alt="" loading="lazy" referrerpolicy="no-referrer"></span>`;
}
// عند فشل تحميل شعار: جرّب المصدر التالي ثم اعرض أول حرفين
document.addEventListener('error', e => {
  const img = e.target; if (!(img instanceof HTMLImageElement) || !img.closest('.logo-chip')) return;
  const alt = (img.dataset.alt || '').split('|').filter(Boolean);
  if (alt.length) { img.dataset.alt = alt.slice(1).join('|'); img.src = alt[0]; }
  else { const c = img.closest('.logo-chip'); c.classList.add('letter'); img.remove(); }
}, true);
document.addEventListener('load', e => {
  const img = e.target; if (!(img instanceof HTMLImageElement) || !img.closest('.logo-chip')) return;
  if (!/\.svg(\?|$)/.test(img.src) && img.naturalWidth < 20 && img.dataset.alt) img.dispatchEvent(new Event('error'));
}, true);

document.addEventListener('error', e => { const img = e.target; if (img instanceof HTMLImageElement && img.dataset.fb) img.replaceWith(document.createTextNode(img.dataset.fb)); }, true);
// شعارات العملات الرقمية
const coinLogo = s => `https://assets.coincap.io/assets/icons/${s.toLowerCase()}@2x.png`;

const COINS = {
  BTC: ['بيتكوين', '#f7931a', '₿'], ETH: ['إيثريوم', '#627eea', 'Ξ'], SOL: ['سولانا', '#9945ff', '◎'], XRP: ['ريبل', '#1ba4e0', '✕'],
  BNB: ['بينانس', '#f3ba2f', '◆'], DOGE: ['دوجكوين', '#c2a633', 'Ð'], ADA: ['كاردانو', '#2a5ada', '₳'], TRX: ['ترون', '#ff2a36', '▼'],
  TON: ['تون', '#0098ea', '◇'], AVAX: ['أفالانش', '#e84142', '▲'], LINK: ['تشين لينك', '#2a5ada', '⬡'], DOT: ['بولكادوت', '#e6007a', '●'], LTC: ['لايتكوين', '#345d9d', 'Ł']
};

const DEFAULTS = {
  stocks: ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'TSM', 'AVGO', 'JPM', 'NFLX', 'XOM'],
  crypto: ['BTC', 'ETH', 'SOL', 'XRP', 'BNB', 'DOGE', 'ADA', 'TON'],
  fx: ['EUR', 'GBP', 'SAR', 'KWD', 'QAR', 'OMR', 'BHD', 'INR', 'PKR', 'EGP', 'JPY', 'CNY', 'TRY', 'CHF', 'SYP'],
  interval: 15, cur: 'AED', tv: 15
};
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
};
let cfg = Object.assign({}, DEFAULTS, store.get('cfg2', {}));
if (!['AED', 'USD', 'SYP'].includes(cfg.cur)) cfg.cur = 'AED';
if (!cfg.syp2) { cfg.sypMode = 'market'; cfg.sypMarket = 150.5; cfg.sypOfficial = 122; cfg.syp2 = true; store.set('cfg2', cfg); }
if (!cfg.live1) { cfg.interval = 15; cfg.live1 = true; store.set('cfg2', cfg); }
if (!cfg.syp1) { if (!cfg.fx.includes('SYP')) cfg.fx = cfg.fx.filter(c => c !== 'PHP').concat('SYP'); cfg.syp1 = true; store.set('cfg2', cfg); }
let data = store.get('lastData2', null);
const st = { page: 'home', metal: 'gold', coin: 'BTC', stock: null, ranges: { home: '1D', gold: '1D', crypto: '1D', stock: '1D', hist: '5Y' }, karat: 21 };

const fmt = (v, d = 2) => (v == null || !isFinite(v)) ? '—' : Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtAuto = v => v == null ? '—' : v >= 1000 ? fmt(v, 2) : v >= 1 ? fmt(v, 4) : fmt(v, 5);
const aed = () => (data && data.fx && data.fx.rates && data.fx.rates.AED) || 3.6725;
// سعر الليرة السورية الجديدة: يحدده المستخدم (سوق موازٍ أو نشرة المصرف المركزي)
cfg.sypMode = 'live';
// live: السعر اللحظي من sp-today (سعر الشراء)، وإن تعذّر نستخدم آخر سعر محفوظ
let sypCache = null;
const sypLive = () => sypCache || (data && data.syp && data.syp.buy > 0 ? data.syp.buy : null);
const syp = () => cfg.sypMode === 'official' ? (+cfg.sypOfficial || 122) : cfg.sypMode === 'live' ? (sypLive() || +cfg.sypMarket || 150.5) : (+cfg.sypMarket || 150.5);
const rateOf = c => c === 'AED' ? aed() : c === 'SYP' ? syp() : 1;
const conv = usd => usd * rateOf(cfg.cur);
const fmtC = (v, d = 2) => fmt(v, cfg.cur === 'SYP' ? 0 : d);
const FLAG_SY = '<svg class="flag" viewBox="0 0 30 20"><rect width="30" height="20" fill="#007a3d"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#000"/><g fill="#ce1126"><path id="sy-st" d="M8 8.2l.6 1.7h1.8l-1.5 1.1.6 1.7L8 11.6l-1.5 1.1.6-1.7-1.5-1.1h1.8z"/><use href="#sy-st" x="7"/><use href="#sy-st" x="14"/></g></svg>';
const curName = () => cfg.cur === 'AED' ? 'درهم' : cfg.cur === 'SYP' ? 'ليرة سورية' : 'دولار';
// السعر بالعملة الأخرى ليظهر بجانب السعر الرئيسي
// رمز الدرهم الإماراتي الجديد (حرف D بخطين أفقيين) ورمز الدولار
const DH = '<svg class="dh" viewBox="0 0 24 24" aria-label="درهم"><path d="M7 3.5v17M7 3.5h3.6a8.5 8.5 0 0 1 0 17H7M2.5 9.6h17.2M2.5 14.4h17.2"/></svg>';
const sym = c => c === 'AED' ? DH : c === 'SYP' ? '' : '<i class="usd-s">$</i>';
const money = (usd, cur, d = 2) => usd == null || !isFinite(usd) ? '—' : `<span class="m">${cur === 'AED' ? `${DH}${fmt(usd * aed(), d)}` : cur === 'SYP' ? `${fmt(usd * syp(), 0)} ليرة سورية` : `$${fmt(usd, d)}`}</span>`;
const unitHtml = (extra = '') => `<span>${curName()}${extra}</span>`;
// رمز العملة الكبير بجانب كل سعر رئيسي (بنفس حجم رمز السعر الثاني)
function syncSyms() { document.querySelectorAll('.cur-sym').forEach(e => { const c = e.dataset.fixed || cfg.cur; const h = c === 'AED' ? DH : c === 'SYP' ? '' : '$'; if (e._h !== h) { e._h = h; e.innerHTML = h; } }); }
const dual = (usd, d = 2) => money(usd, cfg.cur === 'AED' ? 'USD' : cfg.cur === 'SYP' ? 'USD' : 'AED', d);
const dualHtml = (usd, d = 2) => `<span class="dl">${dual(usd, d)}</span>`;
const setDual = (id, usd, d) => { const el = $(id); if (el) el.innerHTML = `<b>${dual(usd, d)}</b><small>${cfg.cur === 'USD' ? 'درهم' : 'دولار'}</small>`; };
const ok = x => x && !x.error;
const btcQ = () => (Array.isArray(data && data.crypto) ? data.crypto : []).find(c => c.symbol === 'BTC');

/* ================= العدّاد الدوّار ================= */
function odo(el, text, raw) {
  if (!el) return;
  const mask = text.replace(/\d/g, '0');
  if (el._mask !== mask) {
    el._mask = mask;
    el.innerHTML = [...text].map(ch => /\d/.test(ch)
      ? `<span class="d"><span class="s">${'0123456789'.split('').map(n => `<i>${n}</i>`).join('')}</span></span>`
      : `<span class="c">${ch}</span>`).join('');
  }
  const cols = el.querySelectorAll('.d .s');
  const digits = text.replace(/\D/g, '');
  const W = digitWidths(el);
  requestAnimationFrame(() => requestAnimationFrame(() => cols.forEach((c, i) => { c.style.transform = `translateY(-${+digits[i]}em)`; c.parentElement.style.width = W[+digits[i]]; })));
  if (raw != null && el._raw != null && raw !== el._raw) {
    el.classList.remove('flash-up', 'flash-down'); void el.offsetWidth;
    el.classList.add(raw > el._raw ? 'flash-up' : 'flash-down');
    el.dataset.dir = raw > el._raw ? 'up' : 'down';
  }
  el._raw = raw;
}
// عرض كل رقم بوحدة em (مستقل عن تكبير الصفحة) عبر قياس الخط على canvas
const _mc = document.createElement('canvas').getContext('2d');
function digitWidths(el) {
  const key = document.fonts.status;
  if (el._wfs === key && el._w) return el._w;
  _mc.font = "900 100px 'DIN'";
  const w = []; for (let d = 0; d < 10; d++) w.push((_mc.measureText(String(d)).width / 100 + 0.02).toFixed(3) + 'em');
  el._wfs = key; el._w = w; return w;
}
const badge = (pct, sm) => pct == null || !isFinite(pct) ? '' : `<span class="chgb ${pct >= 0 ? 'up' : 'down'}${sm ? ' sm' : ''}">${pct >= 0 ? '▲ +' : '▼ '}${fmt(pct)}%</span>`;
function delta(el, pct) {
  if (!el) return;
  if (pct == null || !isFinite(pct)) { el.textContent = '—'; el.className = el.className.replace(/\b(up|down)\b/g, ''); return; }
  const up = pct >= 0;
  el.textContent = `${up ? '▲ +' : '▼ '}${fmt(pct)}%`;
  el.classList.toggle('up', up); el.classList.toggle('down', !up);
}
function ring(svg, pct) {
  if (!svg) return;
  const p = svg.querySelector('.p');
  const v = Math.min(Math.abs(pct || 0) / 5, 1);
  p.style.strokeDashoffset = 113 * (1 - Math.max(v, .03));
  p.style.stroke = (pct || 0) >= 0 ? 'var(--up)' : 'var(--down)';
}

/* ================= الرسم البياني التفاعلي ================= */
class Chart {
  constructor(canvas, tip, opts = {}) {
    this.c = canvas; this.tip = tip; this.o = opts; this.pts = []; this.hover = -1; this.prog = 1;
    new ResizeObserver(() => this.draw()).observe(canvas.parentElement);
    canvas.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); this.mx = e.clientX - r.left; this.pick(); });
    canvas.addEventListener('mouseleave', () => { this.mx = null; this.hover = -1; this.tip.style.opacity = 0; this.draw(); });
  }
  set(pts, opts = {}) {
    Object.assign(this.o, opts);
    const changed = !this.pts.length || pts.length !== this.pts.length || this.o._key !== opts.key;
    this.o._key = opts.key;
    this.pts = pts;
    if (changed) { this.prog = 0; const t0 = performance.now(); const step = t => { this.prog = Math.min(1, (t - t0) / 900); this.draw(); if (this.prog < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
    else this.draw();
  }
  geom() {
    const r = this.c.parentElement.getBoundingClientRect();
    return { W: r.width, H: r.height, L: 92, R: 16, T: 22, B: 34 };
  }
  pick() {
    if (!this.pts.length || this.mx == null) return;
    const g = this.geom(); const n = this.pts.length;
    const i = Math.round(((this.mx - g.L) / (g.W - g.L - g.R)) * (n - 1));
    this.hover = Math.max(0, Math.min(n - 1, i)); this.draw();
  }
  draw() {
    const c = this.c, g = this.geom(), dpr = window.devicePixelRatio || 1;
    if (g.W < 10 || g.H < 10) return;
    c.width = g.W * dpr; c.height = g.H * dpr;
    const x = c.getContext('2d'); x.direction = 'ltr'; x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, g.W, g.H);
    const pts = this.pts, n = pts.length, color = this.o.color || '#f2c75c';
    if (n < 2) { x.fillStyle = '#77736b'; x.font = '700 15px DIN'; x.textAlign = 'center'; x.fillText(this.o.empty || (this.pts && this.o._key ? 'لا توجد بيانات لهذه الفترة' : 'جارٍ تحميل البيانات…'), g.W / 2, g.H / 2); return; }
    const vals = pts.map(p => p[1]);
    let mn = Math.min(...vals), mx = Math.max(...vals); const pad = (mx - mn) * .12 || mx * .01; mn -= pad; mx += pad;
    const X = i => g.L + (i / (n - 1)) * (g.W - g.L - g.R);
    const Y = v => g.T + (1 - (v - mn) / (mx - mn)) * (g.H - g.T - g.B);
    const dec = this.o.dec ?? 2;
    // الشبكة
    x.font = '700 15px DIN'; x.textAlign = 'left'; x.textBaseline = 'middle';
    for (let k = 0; k <= 4; k++) {
      const v = mn + (mx - mn) * k / 4, y = Y(v);
      x.strokeStyle = 'rgba(255,255,255,.06)'; x.lineWidth = 1; x.setLineDash([3, 5]);
      x.beginPath(); x.moveTo(g.L, y); x.lineTo(g.W - g.R, y); x.stroke(); x.setLineDash([]);
      x.fillStyle = 'rgba(255,255,255,.78)'; x.fillText(fmt(v, dec), 6, y);
    }
    // محور الزمن
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.font = '700 14px DIN';
    const tf = timeFmt(this.o.range);
    for (let k = 0; k < 6; k++) { const i = Math.round(k * (n - 1) / 5); x.fillStyle = 'rgba(255,255,255,.75)'; x.fillText(tf.format(new Date(pts[i][0])), Math.min(Math.max(X(i), g.L + 34), g.W - 40), g.H - 9); }
    // القص للحركة
    x.save(); x.beginPath(); x.rect(0, 0, g.L + (g.W - g.L) * easeOut(this.prog), g.H); x.clip();
    const grad = x.createLinearGradient(0, g.T, 0, g.H - g.B);
    grad.addColorStop(0, hexA(color, .38)); grad.addColorStop(.6, hexA(color, .08)); grad.addColorStop(1, hexA(color, 0));
    x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(X(i), Y(p[1])) : x.moveTo(X(i), Y(p[1])));
    x.lineTo(X(n - 1), g.H - g.B); x.lineTo(X(0), g.H - g.B); x.closePath(); x.fillStyle = grad; x.fill();
    x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(X(i), Y(p[1])) : x.moveTo(X(i), Y(p[1])));
    x.strokeStyle = color; x.lineWidth = 2.6; x.lineJoin = 'round'; x.shadowColor = hexA(color, .7); x.shadowBlur = 14; x.stroke(); x.shadowBlur = 0;
    x.restore();
    // أعلى / أدنى
    const hi = vals.indexOf(Math.max(...vals)), lo = vals.indexOf(Math.min(...vals));
    [[hi, '#2fd07f', -14], [lo, '#ff5a67', 22]].forEach(([i, col, dy]) => {
      x.fillStyle = col; x.beginPath(); x.arc(X(i), Y(vals[i]), 3.5, 0, 7); x.fill();
      x.font = '700 15px DIN'; x.textAlign = X(i) > g.W - 80 ? 'right' : X(i) < g.L + 60 ? 'left' : 'center'; x.fillText(fmt(vals[i], dec), X(i), Y(vals[i]) + dy);
    });
    // خط آخر سعر
    if (this.prog >= 1) {
      const ly = Y(vals[n - 1]);
      x.strokeStyle = hexA(color, .55); x.setLineDash([4, 4]); x.beginPath(); x.moveTo(g.L, ly); x.lineTo(g.W - g.R, ly); x.stroke(); x.setLineDash([]);
      const t = (performance.now() % 2000) / 2000;
      x.fillStyle = hexA(color, .35 * (1 - t)); x.beginPath(); x.arc(X(n - 1), ly, 5 + 12 * t, 0, 7); x.fill();
      x.fillStyle = color; x.beginPath(); x.arc(X(n - 1), ly, 5, 0, 7); x.fill();
      if (!this._pulse) { this._pulse = true; const loop = () => { if (this.hover < 0 && this.c.closest('.page').classList.contains('on')) this.draw(); setTimeout(() => requestAnimationFrame(loop), 50); }; loop(); }
    }
    // التحويم
    if (this.hover >= 0) {
      const i = this.hover, hx = X(i), hy = Y(vals[i]);
      x.strokeStyle = 'rgba(255,255,255,.35)'; x.setLineDash([3, 3]); x.beginPath(); x.moveTo(hx, g.T); x.lineTo(hx, g.H - g.B); x.stroke(); x.setLineDash([]);
      x.fillStyle = '#05050a'; x.strokeStyle = color; x.lineWidth = 3; x.beginPath(); x.arc(hx, hy, 6, 0, 7); x.fill(); x.stroke();
      const chg = (vals[i] - vals[0]) / vals[0] * 100;
      this.tip.innerHTML = `<b>${fmt(vals[i], dec)}</b><span>${tipFmt.format(new Date(pts[i][0]))}</span><span style="color:${chg >= 0 ? '#2fd07f' : '#ff5a67'}">${chg >= 0 ? '+' : ''}${fmt(chg)}%</span>`;
      this.tip.style.left = Math.min(Math.max(hx, 80), g.W - 80) + 'px'; this.tip.style.top = Math.max(hy, 70) + 'px'; this.tip.style.opacity = 1;
    }
  }
}
const easeOut = t => 1 - Math.pow(1 - t, 3);
function hexA(hex, a) { const h = hex.replace('#', ''); const n = parseInt(h, 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; }
const tipFmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
function timeFmt(r) {
  const o = { timeZone: TZ };
  if (r === '1D') Object.assign(o, { hour: 'numeric', minute: '2-digit', hour12: true });
  else if (r === '1W') Object.assign(o, { weekday: 'short', day: 'numeric' });
  else if (r === '1M') Object.assign(o, { day: 'numeric', month: 'short' });
  else if (r === '1Y') Object.assign(o, { month: 'short', year: '2-digit' });
  else if (r === '3Y') Object.assign(o, { month: 'short', year: 'numeric' });
  else Object.assign(o, { year: 'numeric' });
  return new Intl.DateTimeFormat(r === '1D' ? 'en-US' : 'ar-AE-u-nu-latn', o);
}

function spark(canvas, values, color) {
  if (!canvas) return;
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, r.width * dpr); canvas.height = Math.max(1, r.height * dpr);
  const x = canvas.getContext('2d'); const v = (values || []).filter(isFinite);
  if (v.length < 2) return;
  const mn = Math.min(...v), mx = Math.max(...v), sp = mx - mn || 1, W = canvas.width, H = canvas.height;
  const P = v.map((y, i) => [i / (v.length - 1) * W, H - H * .1 - (y - mn) / sp * H * .8]);
  const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, hexA(color, .35)); gr.addColorStop(1, hexA(color, 0));
  x.beginPath(); P.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.lineTo(W, H); x.lineTo(0, H); x.fillStyle = gr; x.fill();
  x.beginPath(); P.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.strokeStyle = color; x.lineWidth = 2 * dpr; x.stroke();
}

/* ================= الخلفية (غبار ذهبي) ================= */
(function particles() {
  const c = $('fx-bg'), x = c.getContext('2d'); let W, H, P = [];
  const size = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
  size(); addEventListener('resize', size);
  for (let i = 0; i < 90; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .3, v: Math.random() * .35 + .08, a: Math.random() * Math.PI * 2, s: Math.random() * .02 + .005 });
  (function loop() {
    if (!document.hidden) {
      x.clearRect(0, 0, W, H);
      for (const p of P) {
        p.y -= p.v; p.x += Math.sin(p.a) * .25; p.a += p.s;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const al = .25 + Math.sin(p.a * 3) * .2 + .2;
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fillStyle = `rgba(242,199,92,${al})`; x.shadowColor = '#f2c75c'; x.shadowBlur = 8; x.fill();
      }
    }
    requestAnimationFrame(loop);
  })();
})();

/* ================= الساعة ================= */
const fParts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
const fTime = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
const fShort = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true });
const fDate = new Intl.DateTimeFormat('ar-AE', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn' });
let fHijri; try { fHijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn' }); } catch (_) {}
function tickClock() {
  const now = new Date();
  const p = Object.fromEntries(fParts.formatToParts(now).map(o => [o.type, +o.value]));
  const s = p.second;
  const tp = fTime.formatToParts(now); const g = t => (tp.find(x => x.type === t) || {}).value || '';
  $('clock').textContent = `${g('hour')}:${g('minute')}:${g('second')}`; $('ampm').textContent = g('dayPeriod');
  $('dateG').textContent = fDate.format(now);
  if (fHijri) $('dateH').textContent = fHijri.format(now) + ' هـ';
  if (s === 0 || !$('mktGold').textContent) marketStatus();
}
function marketStatus() {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value; const wd = g('weekday'), m = (+g('hour') % 24) * 60 + +g('minute');
  const ny = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(wd) && m >= 570 && m < 960;
  let gold; if (wd === 'Sat') gold = false; else if (wd === 'Sun') gold = m >= 1080; else if (wd === 'Fri') gold = m < 1020; else gold = !(m >= 1020 && m < 1080);
  $('mktGold').innerHTML = `الذهب العالمي <b class="${gold ? 'o' : 'c'}">${gold ? '● مفتوح' : '● مغلق'}</b>`;
  $('mktNY').innerHTML = `بورصة نيويورك <b class="${ny ? 'o' : 'c'}">${ny ? '● مفتوحة' : '● مغلقة'}</b>`;
}

/* ================= التنقل بين الصفحات ================= */
const TITLES = { home: ['لوحة الأسواق', 'نظرة عامة على الأسواق'], gold: ['المعادن', 'الذهب والفضة والنحاس'], fx: ['أسواق الصرف', 'العملات مقابل الدرهم'], crypto: ['الأصول الرقمية', 'العملات الرقمية'], stocks: ['البورصات العالمية', 'الأسهم العالمية'], hist: ['المخططات التاريخية', 'تغيّر الأسعار من سنة إلى 20 سنة'] };
const ORDER = ['home', 'gold', 'fx', 'crypto', 'stocks', 'hist'];
function go(page) {
  st.page = page;
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('on', p.dataset.page === page));
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.page === page));
  const b = document.querySelector(`#nav button[data-page="${page}"]`);
  $('navInd').style.transform = `translateY(${b.offsetTop}px)`; $('navInd').style.height = b.offsetHeight + 'px';
  $('crumb').textContent = TITLES[page][0]; $('pageTitle').textContent = TITLES[page][1];
  setTimeout(() => { renderPage(); loadCharts(); }, 30);
}
document.querySelectorAll('#nav button').forEach(b => b.onclick = () => { stopTv(); go(b.dataset.page); });
document.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => {
  if (el.dataset.go === 'gold') { st.metal = el.dataset.metal || (el.classList.contains('silver-s') ? 'silver' : 'gold'); $('metalTabs').querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.m === st.metal)); }
  go(el.dataset.go);
}));

/* ================= الرسوم ================= */
const charts = {
  gold: new Chart($('goldChart'), $('goldTip'), { color: '#f2c75c' }),
  crypto: new Chart($('crChart'), $('crTip'), { color: '#f7931a', dec: 0 }),
  stock: new Chart($('skChart'), $('skTip'), { color: '#2fd07f' })
};
const hcache = {};
async function getHist(kind, symbol, range) {
  if (range === '1D') {
    let p = [];
    try { p = await getHistRaw(kind, symbol, '1D'); } catch (_) {}
    if (p.length >= 10) return p;
    // السوق مغلق (عطلة نهاية الأسبوع): نعرض آخر يوم تداول
    const w = await getHistRaw(kind, symbol, '1W'); const last = w.length ? w[w.length - 1][0] : 0;
    const d = w.filter(q => q[0] >= last - 864e5);
    return d.length >= 2 ? d : (p.length ? p : w);
  }
  return getHistRaw(kind, symbol, range);
}
async function getHistRaw(kind, symbol, range) {
  const key = `${kind}|${symbol}|${range}`, c = hcache[key];
  const ttl = range === '1D' ? 120e3 : 900e3;
  if (c && Date.now() - c.t < ttl) return c.p;
  let pts;
  if (window.api) { const r = await window.api.history({ kind, symbol, range }); if (r.error) throw new Error(r.error); pts = r.points; }
  else pts = demoHist(kind, symbol, range);
  hcache[key] = { t: Date.now(), p: pts };
  return pts;
}
async function loadChart(name) {
  const ch = charts[name], r = st.ranges[name];
  try {
    if (name === 'home') {
      if (!ok(data && data.gold)) return;
      const p = await getHist('gold', 'XAU', '1D');
      heroPts = p.map(q => [q[0], q[1] / OZ]);
      if (p.length) { const v = p.map(q => q[1] / OZ); $('gHi').innerHTML = money(Math.max(...v), cfg.cur); $('gLo').innerHTML = money(Math.min(...v), cfg.cur); drawHero(); }
    } else if (name === 'gold') {
      const m = st.metal; const p = await getHist(m, m === 'gold' ? 'XAU' : m === 'silver' ? 'XAG' : 'HG', r);
      const f = m === 'gold' ? q => conv(q / OZ) : m === 'copper' ? q => conv(q / LB_KG) : q => conv(q);
      ch.set(p.map(q => [q[0], f(q[1])]), { range: r, key: m + r + cfg.cur, dec: m === 'gold' ? 2 : 3, color: m === 'gold' ? '#f2c75c' : m === 'copper' ? '#e0875a' : '#cfd8e2' });
    } else if (name === 'crypto') {
      const p = await getHist('crypto', st.coin, r); const col = (COINS[st.coin] || [, '#f7931a'])[1];
      const last = p.length ? p[p.length - 1][1] : 1;
      ch.set(p.map(q => [q[0], conv(q[1])]), { range: r, key: st.coin + r + cfg.cur, dec: last > 100 ? 0 : last > 1 ? 2 : 4, color: col });
    } else if (name === 'stock' && st.stock) {
      if (st.stock.startsWith('ADX:')) { ch.set([], { empty: 'الرسم البياني غير متاح لأسهم سوق أبوظبي (الأسعار الحالية فقط)', key: 'adx' + st.stock }); return; }
      const p = await getHist('stock', st.stock.startsWith('DFM:') ? st.stock.slice(4) + '.AE' : st.stock, r);
      const q = (data.stocks || []).find(x => x.symbol === st.stock);
      const up = r === '1D' && q && q.changePct != null ? q.changePct >= 0 : p.length > 1 && p[p.length - 1][1] >= p[0][1];
      ch.set(p, { range: r, key: st.stock + r, dec: 2, color: up ? '#2fd07f' : '#ff5a67' });
    }
  } catch (e) { if (ch) ch.set([], { empty: 'تعذّر تحميل الرسم البياني', key: 'err' }); }
}
function loadCharts() {
  if (st.page === 'home') loadChart('home');
  if (st.page === 'gold') loadChart('gold');
  if (st.page === 'crypto') loadChart('crypto');
  if (st.page === 'stocks') loadChart('stock');
  if (st.page === 'hist') loadHist();
}
document.querySelectorAll('.ranges').forEach(g => g.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  st.ranges[g.dataset.chart] = b.dataset.r; g.dataset.chart === 'hist' ? loadHist() : loadChart(g.dataset.chart);
}));
$('metalTabs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  st.metal = b.dataset.m; $('metalTabs').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  renderGold(); loadChart('gold');
});

/* ================= الشارت اللحظي خلف بطاقة الذهب ================= */
let heroPts = [];
function drawHero() {
  const c = $('heroSpark'); if (!c || heroPts.length < 2) return;
  const r = c.getBoundingClientRect(), dpr = devicePixelRatio || 1; if (r.width < 10) return;
  c.width = r.width * dpr; c.height = r.height * dpr;
  const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const W = r.width, H = r.height, v = heroPts.map(p => conv(p[1]));
  const mn = Math.min(...v), mx = Math.max(...v), sp = (mx - mn) || mx * .001;
  const X = i => i / (v.length - 1) * W, Y = y => H - 8 - (y - mn) / sp * (H - 26);
  const up = v[v.length - 1] >= v[0], col = up ? '#2fd07f' : '#ff5a67';
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(242,199,92,.30)'); g.addColorStop(1, 'rgba(242,199,92,0)');
  x.beginPath(); v.forEach((y, i) => i ? x.lineTo(X(i), Y(y)) : x.moveTo(0, Y(y))); x.lineTo(W, H); x.lineTo(0, H); x.fillStyle = g; x.fill();
  x.beginPath(); v.forEach((y, i) => i ? x.lineTo(X(i), Y(y)) : x.moveTo(0, Y(y))); x.strokeStyle = '#f2c75c'; x.lineWidth = 2.2; x.shadowColor = 'rgba(242,199,92,.8)'; x.shadowBlur = 10; x.stroke(); x.shadowBlur = 0;
  const ly = Y(v[v.length - 1]);
  x.setLineDash([4, 4]); x.strokeStyle = 'rgba(255,255,255,.25)'; x.beginPath(); x.moveTo(0, ly); x.lineTo(W, ly); x.stroke(); x.setLineDash([]);
  x.fillStyle = col; x.beginPath(); x.arc(W - 5, ly, 5, 0, 7); x.fill();
  x.fillStyle = 'rgba(255,255,255,.55)'; x.font = '700 13px DIN'; x.textAlign = 'left';
  if (W > 600) { x.textAlign = 'right'; x.fillText('حركة الذهب اليوم · لحظي', W - 12, H - 10); }
}
addEventListener('resize', () => setTimeout(drawHero, 200));

/* ================= المخططات التاريخية ================= */
const histCharts = {};
const HIST = {
  gold: { kind: 'gold', sym: 'XAU', f: v => v / OZ, col: '#f2c75c', d: 2 },
  silver: { kind: 'silver', sym: 'XAG', f: v => v, col: '#cfd8e2', d: 2 },
  copper: { kind: 'copper', sym: 'HG', f: v => v / LB_KG, col: '#e0875a', d: 2 },
  btc: { kind: 'crypto', sym: 'BTC', f: v => v, col: '#f7931a', d: 0 }
};
const YLBL = { '1Y': 'سنة', '3Y': '3 سنوات', '5Y': '5 سنوات', '10Y': '10 سنوات', '15Y': '15 سنة', '20Y': '20 سنة' };
function loadHist() {
  const r = st.ranges.hist;
  Object.entries(HIST).forEach(async ([k, h]) => {
    if (!histCharts[k]) histCharts[k] = new Chart($('hc_' + k), $('ht_' + k), { color: h.col });
    const ch = histCharts[k], box = $('hs_' + k);
    try {
      const p = await getHist(h.kind, h.sym, r);
      const pts = p.map(q => [q[0], conv(h.f(q[1]))]);
      ch.set(pts, { range: r, key: 'h' + k + r + cfg.cur, dec: h.d, color: h.col });
      if (pts.length > 1) {
        const a = h.f(p[0][1]), b = h.f(p[p.length - 1][1]), pct = (b / a - 1) * 100;
        const yrs = (p[p.length - 1][0] - p[0][0]) / 31557600000;
        const short = yrs < ({ '1Y': 1, '3Y': 3, '5Y': 5, '10Y': 10, '15Y': 15, '20Y': 20 }[r] || 0) - .5;
        box.innerHTML = `<span class="hp ${pct >= 0 ? 'up' : 'down'}">${pct >= 0 ? '▲ +' : '▼ '}${fmt(pct, 1)}%</span>
          <span class="hr">من ${money(a, cfg.cur, h.d)} إلى ${money(b, cfg.cur, h.d)}</span>
          <span class="hy">${short ? 'منذ ' + new Date(p[0][0]).getFullYear() + ' (أقدم بيانات متاحة)' : 'خلال ' + YLBL[r]}</span>`;
      }
    } catch (e) { ch.set([], { empty: 'تعذّر تحميل البيانات', key: 'err' }); box.innerHTML = ''; }
  });
}

/* ================= العرض ================= */
function renderPage() {
  if (!data) return;
  renderTicker();
  ({ home: renderHome, gold: renderGold, fx: renderFx, crypto: renderCrypto, stocks: renderStocks, hist: () => {} })[st.page]();
}
function renderAll() { if (!data) return; document.body.dataset.cur = cfg.cur; syncSyms(); renderHome(); renderGold(); renderFx(); renderCrypto(); renderStocks(); renderTicker(); }

function renderHome(live) {
  const g = data.gold, s = data.silver, b = btcQ(), f = data.fx, cu = curName();
  document.querySelectorAll('#curSeg button').forEach(x => x.classList.toggle('on', x.dataset.cur === cfg.cur));
  if (ok(g)) {
    const gram = g.price / OZ;
    odo($('g24'), fmtC(conv(gram)), +conv(gram).toFixed(2));
    $('g24u').innerHTML = unitHtml(); $('ozU').textContent = 'الأونصة';
    $('oz').innerHTML = money(g.price, cfg.cur) + dualHtml(g.price);
    setDual('g24dual', gram);
    delta($('gDelta'), g.changePct);
    $('karatCol').innerHTML = [[24, '999.9 ذهب خالص'], [22, '916 · سبائك وحُلي'], [21, '875 · الأكثر طلباً'], [18, '750 · مجوهرات']].map(([k, d]) => `
      <div class="karat"><div class="kb"><div class="badge">${k}</div><div class="kt">عيار ${k}<small>${d}</small></div></div>
      <div class="kv"><span class="kp"><b>${money(gram * k / 24, cfg.cur)}</b><b class="alt">${dual(gram * k / 24)}</b></span><small>${badge(g.changePct, 1)} للغرام</small></div></div>`).join('');
  }
  if (ok(s)) {
    odo($('agOz'), fmtC(conv(s.price)), +s.price.toFixed(3)); $('agU').innerHTML = unitHtml();
    $('agKg').innerHTML = money(s.price / OZ * 1000, cfg.cur) + dualHtml(s.price / OZ * 1000);
    $('agG').innerHTML = money(s.price / OZ, cfg.cur) + dualHtml(s.price / OZ); setDual('agDual', s.price); delta($('agDelta'), s.changePct); ring($('agRing'), s.changePct);
    spark($('agSpark'), s.spark, '#cfd8e2');
  }
  if (b) {
    odo($('btc'), fmtC(conv(b.price), 0), Math.round(b.price)); $('btcU').innerHTML = unitHtml();
    setDual('btcDual', b.price, 0);
    $('btcH').innerHTML = b.high ? money(b.high, cfg.cur, 0) + dualHtml(b.high, 0) : '—';
    $('btcL').innerHTML = b.low ? money(b.low, cfg.cur, 0) + dualHtml(b.low, 0) : '—';
    delta($('btcDelta'), b.changePct);
    getHist('crypto', 'BTC', '1D').then(p => spark($('btcSpark'), p.map(q => q[1]), '#f7931a')).catch(() => {});
  }
  if (ok(f)) $('usdAed').textContent = fmt(f.rates.AED, 4);
  const c = data.copper;
  if (ok(c)) {
    const kg = c.price / LB_KG;
    odo($('cuKg'), fmtC(conv(kg)), +kg.toFixed(3)); $('cuU').innerHTML = unitHtml();
    setDual('cuDual', kg);
    $('cuT').innerHTML = money(kg * 1000, cfg.cur, 0) + dualHtml(kg * 1000, 0);
    delta($('cuDelta'), c.changePct); ring($('cuRing'), c.changePct);
    spark($('cuSpark'), c.spark, '#e0875a');
  }
  if (live) return;
  const stx = marketList('home').slice(0, 8);
  $('homeHeat').style.setProperty('--c', Math.min(4, Math.max(1, stx.length)));
  $('homeHeat').innerHTML = stx.map(q => tileHtml(q, true)).join(''); requestAnimationFrame(() => fitPrices($('homeHeat')));
  $('homeHeat').querySelectorAll('.tile').forEach((t, i) => { spark(t.querySelector('canvas'), stx[i].spark, '#ffffff'); t.onclick = () => { st.stock = t.dataset.s; mkt.stocks = mkt.home; document.querySelectorAll('.mkt-tabs[data-mt=stocks] button').forEach(x => x.classList.toggle('on', x.dataset.m === mkt.stocks)); go('stocks'); }; });
}
// اختيار السوق: العالمية أو أبوظبي أو دبي
const mkt = { home: 'global', stocks: 'global' };
function marketList(which) {
  if (mkt[which] === 'global') return (Array.isArray(data.stocks) ? data.stocks : []).filter(q => !q.error);
  return (Array.isArray(data.uae) ? data.uae : []).filter(q => q.market === mkt[which]);
}
document.querySelectorAll('.mkt-tabs').forEach(g => g.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; e.stopPropagation();
  mkt[g.dataset.mt] = b.dataset.m; g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  g.dataset.mt === 'home' ? renderHome() : (renderStocks(), loadChart('stock'));
}));
function tileHtml(q, big) {
  const p = q.changePct || 0, a = Math.min(Math.abs(p) / 3, 1);
  const bg = p >= 0 ? `linear-gradient(155deg,rgba(47,208,127,${.12 + a * .45}),rgba(20,80,50,${.15 + a * .3}))` : `linear-gradient(155deg,rgba(255,90,103,${.12 + a * .45}),rgba(90,20,30,${.15 + a * .3}))`;
  const cur = q.currency || 'USD';
  const inUsd = cur === 'USD' ? q.price : cur === 'AED' ? q.price / aed() : null;
  const usd = inUsd == null ? fmt(q.price) + ' ' + cur : '$' + fmt(inUsd);
  const aedLine = inUsd == null ? '' : `<div class="aedp">${DH}${fmt(cur === 'AED' ? q.price : q.price * aed())}</div>`;
  // تخطيط بصفوف ثابتة: لا يتداخل الشعار أو النسبة مع الأسعار
  // v3.3: الاسم والنسبة بالأعلى، شعار كبير بالوسط، السعران بخط كبير يتكيّف مع عرض البطاقة
  return `<div class="tile v3 ${st.stock === q.symbol && big ? 'sel' : ''}" data-s="${q.symbol}" style="background:${bg}">
    ${big ? '<canvas></canvas>' : ''}
    <div class="v3-top"><div class="cname">${STOCK_NAMES[q.symbol] || q.name || q.symbol}</div><div class="pc ${p >= 0 ? 'up' : 'down'}">${p >= 0 ? '▲ +' : '▼ '}${fmt(p)}%</div></div>
    <div class="v3-logo">${logoHtml(q.symbol, 'brand')}</div>
    <div class="t-row t-prices"><div class="pr">${usd}</div>${aedLine}</div></div>`;
}
// تكبير أرقام الأسعار لأقصى حجم يتسع في البطاقة دون قص
function fitPrices(root) {
  (root || document).querySelectorAll('.tile.v3 .t-prices').forEach(r => {
    const W = r.clientWidth; if (!W) return;
    const kids = [...r.children];
    let fs = Math.min(40, Math.max(18, r.closest('.tile').clientHeight * .24));
    r.style.fontSize = fs + 'px';
    const need = kids.reduce((a, k) => a + k.scrollWidth, 0) + 14 * (kids.length - 1);
    if (need > W) r.style.fontSize = Math.max(12, Math.floor(fs * W / need * 10) / 10) + 'px';
  });
}

function renderGold() {
  const g = data.gold, s = data.silver, cu = curName();
  const m = st.metal === 'gold' ? g : st.metal === 'copper' ? data.copper : s;
  if (ok(m)) {
    if (st.metal === 'gold') { odo($('gpBig'), fmtC(conv(m.price / OZ)), m.price); $('gpBig').className = 'odo gold'; $('gpBigU').innerHTML = unitHtml(' / غرام عيار 24'); setDual('gpDual', m.price / OZ); }
    else if (st.metal === 'copper') { odo($('gpBig'), fmtC(conv(m.price / LB_KG), 3), m.price); $('gpBig').className = 'odo copper'; $('gpBigU').innerHTML = unitHtml(' / كيلو نحاس'); setDual('gpDual', m.price / LB_KG, 3); }
    else { odo($('gpBig'), fmtC(conv(m.price), 3), m.price); $('gpBig').className = 'odo silver'; $('gpBigU').innerHTML = unitHtml(' / أونصة'); setDual('gpDual', m.price, 3); }
    delta($('gpDelta'), m.changePct);
  }
  const head = `<tr><th>الوحدة</th><th>${DH} درهم إماراتي</th><th>$ دولار أمريكي</th></tr>`;
  let rowPct = null;
  const arrow = () => rowPct == null ? '' : `<i class="rarr ${rowPct >= 0 ? 'up' : 'down'}">${rowPct >= 0 ? '▲' : '▼'}</i>`;
  const row = (lbl, usd) => `<tr><td>${arrow()}${lbl}</td><td><span class="num">${DH}${fmt(usd * aed())}</span></td><td class="u"><span class="num">$${fmt(usd)}</span></td></tr>`;
  $('gtBadge').innerHTML = ok(g) ? badge(g.changePct) : '';
  $('stBadge').innerHTML = (ok(s) ? 'فضة ' + badge(s.changePct, 1) : '') + (ok(data.copper) ? ' نحاس ' + badge(data.copper.changePct, 1) : '');
  if (ok(g)) {
    const gr = g.price / OZ; rowPct = g.changePct;
    $('goldTable').innerHTML = head +
      [24, 22, 21, 18, 14].map(k => row(`<span class="kb">${k}</span>غرام عيار ${k}`, gr * k / 24)).join('') +
      row('<span class="kb">oz</span>أونصة (31.1 غ)', g.price) + row('<span class="kb">TT</span>تولة (11.66 غ)', gr * TOLA) +
      row('<span class="kb">10T</span>سبيكة 10 تولة', gr * TOLA * 10) + row('<span class="kb">¼kg</span>ربع كيلو ذهب', gr * 250) + row('<span class="kb">½kg</span>نصف كيلو ذهب', gr * 500) + row('<span class="kb">1kg</span>كيلو ذهب', gr * 1000);
  }
  if (ok(s)) {
    const gr = s.price / OZ; rowPct = s.changePct;
    $('silverTable').innerHTML = head + [['غرام', gr], ['أونصة', s.price], ['تولة', gr * TOLA], ['100 غرام', gr * 100], ['كيلو', gr * 1000]]
      .map(([l, v]) => row(`<span class="kb s">Ag</span>${l}`, v)).join('');
  }
  if (ok(data.copper)) {
    const kg = data.copper.price / LB_KG; rowPct = data.copper.changePct;
    $('silverTable').innerHTML += [['كيلو نحاس', kg], ['رطل نحاس', data.copper.price], ['طن نحاس', kg * 1000]]
      .map(([l, v]) => row(`<span class="kb cu">Cu</span>${l}`, v)).join('');
  }
  calc();
}
const toNum = v => +String(v || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٫,]/g, '.').replace(/[^0-9.]/g, '') || 0;
function calc() {
  if (!ok(data && data.gold)) return;
  const w = toNum($('cW').value), m = toNum($('cM').value);
  let total = w * (data.gold.price / OZ * st.karat / 24 * aed() + m);
  if ($('cV').checked) total *= 1.05;
  $('cOut').innerHTML = `<span class="num">${DH}${fmt(total)}</span> <small class="cu-u">درهم</small><span class="calc-alt"><span class="num">$${fmt(total / aed())}</span> <small>دولار</small></span>`;
  $('cOutUsd').textContent = `${fmt(w)} غرام عيار ${st.karat}`;
}
['cW', 'cM', 'cV'].forEach(id => $(id).addEventListener('input', calc));
$('cK').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.karat = +b.dataset.k; $('cK').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); calc(); });

function renderFx() {
  const f = data.fx; if (!ok(f)) return; const r = f.rates;
  odo($('usdAed2'), fmt(r.AED, 4));
  $('fxSrc').textContent = 'المصدر: ' + f.source;
  $('fxTiles').innerHTML = cfg.fx.filter(c => r[c]).map(c => {
    const v = r.AED / r[c]; let [n, fl] = FX_NAMES[c] || [c, '🏳']; if (c === 'SYP') { fl = FLAG_SY; n = 'ليرة سورية · ' + (cfg.sypMode === 'official' ? 'المصرف المركزي' : cfg.sypMode === 'live' ? 'sp-today' : 'السوق'); }
    // التغيّر: قيمة العملة مقابل الدرهم اليوم مقارنة بالأمس
    const fc = f.prev && f.cur && f.prev[c] && f.cur[c] ? ((3.6725 / f.cur[c]) / (3.6725 / f.prev[c]) - 1) * 100 : null;
    const bd = fc == null ? '' : badge(Math.abs(fc) < 0.005 ? 0 : fc, 1);
    if (v < 0.2) return `<div class="fxt"><div class="t"><span class="fl">${fl}</span>${c}${bd}</div><div class="n">1 درهم يساوي</div><div class="r">${fmt(1 / v, 2)} <small>${n}</small></div></div>`;
    return `<div class="fxt"><div class="t"><span class="fl">${fl}</span>${c}${bd}</div><div class="n">1 ${n}</div><div class="r">${fmt(v, v < 1 ? 4 : 3)} <small>درهم</small></div></div>`;
  }).join('');
  const sels = [$('cvFrom'), $('cvTo')];
  const list = ['AED', 'USD', ...(r.SYP ? ['SYP'] : []), ...Object.keys(FX_NAMES).filter(c => !['AED', 'USD', 'SYP'].includes(c) && r[c])];
  sels.forEach((s, i) => { if (s.options.length !== list.length) { const v = s.value || (i ? 'AED' : 'USD'); s.innerHTML = list.map(c => `<option value="${c}">${FX_NAMES[c][1]} ${c} — ${FX_NAMES[c][0]}</option>`).join(''); s.value = v; } });
  convert();
}
function convert() {
  if (!ok(data && data.fx)) return; const r = data.fx.rates;
  const a = toNum($('cvAmt').value), f = $('cvFrom').value, t = $('cvTo').value;
  const v = a / r[f] * r[t]; $('cvOut').textContent = fmtAuto(v);
  $('cvRate').textContent = `1 ${f} = ${fmtAuto(r[t] / r[f])} ${t}   ·   1 ${t} = ${fmtAuto(r[f] / r[t])} ${f}`;
}
['cvAmt', 'cvFrom', 'cvTo'].forEach(id => $(id).addEventListener('input', convert));
$('cvSwap').onclick = () => { const a = $('cvFrom').value; $('cvFrom').value = $('cvTo').value; $('cvTo').value = a; convert(); };

function renderCrypto() {
  const L = Array.isArray(data.crypto) ? data.crypto : []; const cu = curName();
  const q = L.find(c => c.symbol === st.coin) || L[0]; if (!q) return; st.coin = q.symbol;
  const [nm, col, ic] = COINS[q.symbol] || [q.symbol, '#888', q.symbol[0]];
  $('crIcon').innerHTML = `<img src="${coinLogo(q.symbol)}" alt="" data-fb="${ic}">`; $('crIcon').style.background = `radial-gradient(circle at 30% 25%,${hexA(col, 1)},${hexA(col, .6)})`;
  $('crName').textContent = `${nm} · ${q.symbol}`;
  odo($('crBig'), q.price > 100 ? fmtC(conv(q.price), 0) : fmtC(conv(q.price), q.price > 1 ? 2 : 4), q.price); $('crBigU').innerHTML = unitHtml();
  delta($('crDelta'), q.changePct); setDual('crDual', q.price, q.price > 100 ? 0 : q.price > 1 ? 2 : 4);
  $('crList').innerHTML = L.map(c => {
    const [n, cl, i] = COINS[c.symbol] || [c.symbol, '#888', c.symbol[0]];
    return `<div class="crow ${c.symbol === st.coin ? 'sel' : ''}" data-c="${c.symbol}"><span class="coin" style="background:radial-gradient(circle at 30% 25%,${cl},${hexA(cl, .6)})"><img src="${coinLogo(c.symbol)}" alt="" data-fb="${i}"></span>
      <div class="nm"><b>${n}</b><small>${c.symbol}</small></div><div class="pv"><b>${money(c.price, cfg.cur, c.price > 100 ? 0 : c.price > 1 ? 2 : 4)}</b><span class="dl blk">${dual(c.price, c.price > 100 ? 0 : c.price > 1 ? 2 : 4)}</span><span class="delta ${(c.changePct || 0) >= 0 ? 'up' : 'down'}">${(c.changePct || 0) >= 0 ? '+' : ''}${fmt(c.changePct)}%</span></div></div>`;
  }).join('');
  $('crList').querySelectorAll('.crow').forEach(r => r.onclick = () => { st.coin = r.dataset.c; renderCrypto(); loadChart('crypto'); });
}

function renderStocks() {
  const L = marketList('stocks');
  if (!L.length) { $('skHeat').innerHTML = '<div class="empty">جارٍ تحميل أسعار هذا السوق…</div>'; return; }
  if (!st.stock || !L.find(q => q.symbol === st.stock)) st.stock = L[0].symbol;
  const q = L.find(x => x.symbol === st.stock);
  $('skName').textContent = `${STOCK_NAMES[q.symbol] || q.name} · ${q.symbol}`;
  if ($('skLogo')._s !== q.symbol) { $('skLogo')._s = q.symbol; $('skLogo').outerHTML = logoHtml(q.symbol, 'lg').replace('<span class="logo-chip', '<span id="skLogo" class="logo-chip'); }
  const isAed = q.currency === 'AED';
  odo($('skBig'), fmt(isAed ? q.price / aed() : q.price), q.price); delta($('skDelta'), q.changePct);
  $('skDual').innerHTML = q.currency && !['USD', 'AED'].includes(q.currency) ? '' : `<b>${DH}${fmt(isAed ? q.price : q.price * aed())}</b><small>درهم</small>`;
  const h = $('skHeat'); h.style.setProperty('--c', Math.min(5, Math.max(3, Math.ceil(L.length / 3))));
  h.innerHTML = L.map(x => tileHtml(x, true)).join(''); requestAnimationFrame(() => fitPrices(h));
  h.querySelectorAll('.tile').forEach((t, i) => {
    spark(t.querySelector('canvas'), L[i].spark, '#ffffff');
    t.onclick = () => { st.stock = t.dataset.s; renderStocks(); loadChart('stock'); };
  });
}

function renderTicker() {
  const g = data.gold, s = data.silver, f = data.fx, items = [];
  const it = (n, v, c) => items.push(`<span><b class="tn">${n}</b><b class="tv">${v}</b>${c == null ? '' : `<b class="${c >= 0 ? 'up' : 'down'}">${c >= 0 ? '▲' : '▼'} ${fmt(Math.abs(c))}%</b>`}<b class="sep">◆</b></span>`);
  if (ok(g)) { it('ذهب 24 / غرام', DH + fmt(g.price / OZ * aed()) + ' · $' + fmt(g.price / OZ), g.changePct); it('ذهب 21 / غرام', DH + fmt(g.price / OZ * aed() * 21 / 24) + ' · $' + fmt(g.price / OZ * 21 / 24), g.changePct); it('XAU/USD', fmt(g.price), g.changePct); }
  if (ok(s)) it('XAG/USD', fmt(s.price, 3), s.changePct);
  if (ok(data.copper)) it('نحاس / كيلو', DH + fmt(data.copper.price / LB_KG * aed()) + ' · $' + fmt(data.copper.price / LB_KG), data.copper.changePct);
  if (ok(f)) it('USD/AED', fmt(f.rates.AED, 4), null);
  (Array.isArray(data.crypto) ? data.crypto : []).slice(0, 5).forEach(c => it(c.symbol, '$' + fmt(c.price, c.price > 100 ? 0 : 2), c.changePct));
  (Array.isArray(data.stocks) ? data.stocks : []).filter(q => !q.error).forEach(q => it(q.symbol, fmt(q.price), q.changePct));
  const h = items.join(''); if ($('ticker')._h !== h) { $('ticker')._h = h; $('ticker').innerHTML = h + h; }
}

/* ================= جلب البيانات ================= */
let timer;
async function refresh() {
  try {
    const fresh = window.api ? await window.api.fetchAll({ stocks: cfg.stocks, crypto: cfg.crypto }) : demoData();
    if (!['gold', 'silver', 'crypto', 'fx'].some(k => ok(fresh[k]))) throw new Error('offline');
    if (data) ['gold', 'silver', 'crypto', 'fx', 'stocks', 'copper'].forEach(k => { if (fresh[k] && fresh[k].error && ok(data[k])) fresh[k] = data[k]; });
    // الليرة السورية الجديدة = 100 ليرة قديمة: إذا أعاد المصدر السعر القديم نحوّله
    if (!ok(fresh.syp) && data && ok(data.syp)) fresh.syp = data.syp;
    if (ok(fresh.syp) && fresh.syp.buy > 0) { sypCache = fresh.syp.buy; if (cfg.sypMarket !== sypCache) { cfg.sypMarket = sypCache; store.set('cfg2', cfg); } }
    if (ok(fresh.fx)) ['rates', 'prev', 'cur'].forEach(k => { const r = fresh.fx[k]; if (r) r.SYP = syp(); });
    // التغير اليومي لليرة من sp-today
    if (ok(fresh.fx) && fresh.fx.prev && cfg.sypMode === 'live' && ok(fresh.syp) && fresh.syp.changePct) fresh.fx.prev.SYP = syp() / (1 + fresh.syp.changePct / 100);
    const first = !data;
    // احتفظ بأحدث أسعار البث اللحظي للعملات الرقمية
    if (data && Array.isArray(data.crypto) && Array.isArray(fresh.crypto)) fresh.crypto.forEach(c => { const o = data.crypto.find(x => x.symbol === c.symbol); if (o && o._live && Date.now() - o._live < 10000) Object.assign(c, { price: o.price, changePct: o.changePct, high: o.high, low: o.low, _live: o._live }); });
    ['gold', 'silver'].forEach(k => { const m = fresh[k]; if (ok(m) && m.changePct != null) m.prevClose = m.price / (1 + m.changePct / 100); });
    data = fresh; store.set('lastData2', data);
    $('liveDot').className = 'ok'; $('liveText').innerHTML = 'مباشر · <span class="num">' + fShort.format(new Date(data.at)) + '</span>';
    renderAll(); if (first) loadCharts(); else if (st.ranges[st.page === 'stocks' ? 'stock' : st.page] === '1D') loadCharts();
  } catch (e) {
    $('liveDot').className = 'err'; $('liveText').textContent = data ? 'غير متصل — آخر أسعار محفوظة' : 'لا يوجد اتصال بالإنترنت';
    renderAll();
  }
}
function schedule() { clearInterval(timer); timer = setInterval(refresh, cfg.interval * 1000); }

/* ================= التحديث اللحظي ================= */
// عرض خفيف للتحديثات اللحظية (بدون إعادة بناء البطاقات الثقيلة)
let liveQueued = false;
function renderLive() {
  if (liveQueued || !data) return; liveQueued = true;
  const wait = Math.max(0, 500 - (performance.now() - (renderLive._t || 0)));
  setTimeout(() => requestAnimationFrame(() => { renderLive._t = performance.now();
    liveQueued = false;
    renderHome(true);
    if (st.page === 'gold') renderGold();
    if (st.page === 'crypto') renderCrypto();
    $('liveText').innerHTML = '<b class="zap">⚡</b> لحظي · <span class="num">' + fTime.format(new Date()) + '</span>';
  }), wait);
}
// 1) الذهب والفضة: السعر الفوري كل 3 ثوانٍ
async function metalsTick() {
  if (!data || document.hidden) return;
  try {
    let r;
    if (window.api) r = await window.api.metalsFast();
    else r = { gold: data.gold.price * (1 + (Math.random() - .5) * .0006), silver: data.silver.price * (1 + (Math.random() - .5) * .0008) };
    let changed = false;
    [['gold', r.gold], ['silver', r.silver]].forEach(([k, v]) => {
      const m = data[k]; if (!ok(m) || !v || !isFinite(v) || Math.abs(v / m.price - 1) > .1) return;
      if (v !== m.price) { m.price = v; changed = true; if (m.prevClose) m.changePct = (v / m.prevClose - 1) * 100; }
    });
    if (changed && heroPts.length && ok(data.gold)) { heroPts.push([Date.now(), data.gold.price / OZ]); if (heroPts.length > 600) heroPts.shift(); drawHero(); }
    if (changed) renderLive();
  } catch (_) {}
}
setInterval(metalsTick, 3000);

// 2) العملات الرقمية: بث مباشر من Binance (كل صفقة)
let ws = null, wsTry = 0, wsHosts = ['wss://stream.binance.com:9443', 'wss://data-stream.binance.vision'];
function connectCrypto() {
  if (!window.WebSocket) return;
  try { if (ws) ws.close(); } catch (_) {}
  const list = (cfg.crypto || []).map(c => c.toLowerCase() + 'usdt@miniTicker').join('/');
  if (!list) return;
  if (!window.api) return demoCryptoStream();
  const host = wsHosts[wsTry % wsHosts.length];
  ws = new WebSocket(`${host}/stream?streams=${list}`);
  ws.onopen = () => { wsTry = 0; };
  ws.onmessage = ev => {
    try {
      const d = JSON.parse(ev.data).data; if (!d || !data || !Array.isArray(data.crypto)) return;
      const sym = d.s.replace(/USDT$/, ''); const c = data.crypto.find(x => x.symbol === sym); if (!c) return;
      const price = +d.c, open = +d.o;
      c.price = price; c.changePct = open ? (price / open - 1) * 100 : c.changePct; c.high = +d.h; c.low = +d.l; c._live = Date.now();
      renderLive();
    } catch (_) {}
  };
  ws.onclose = () => { wsTry++; setTimeout(connectCrypto, Math.min(30000, 1500 * wsTry)); };
  ws.onerror = () => { try { ws.close(); } catch (_) {} };
}
function demoCryptoStream() {
  setInterval(() => { if (!data || !Array.isArray(data.crypto)) return; data.crypto.forEach(c => { c.price *= 1 + (Math.random() - .5) * .0008; }); renderLive(); }, 1000);
}
setTimeout(connectCrypto, 1500);

/* ================= وضع العرض التلقائي ================= */
let tvT = null;
function startTv() {
  document.body.classList.add('tv'); $('btnTv').classList.add('on');
  let i = ORDER.indexOf(st.page), t0 = performance.now();
  const bar = $('tvBar').firstElementChild;
  const loop = now => {
    if (!tvT) return;
    const p = (now - t0) / (cfg.tv * 1000); bar.style.width = Math.min(p, 1) * 100 + '%';
    if (p >= 1) { i = (i + 1) % ORDER.length; go(ORDER[i]); t0 = now; }
    tvT = requestAnimationFrame(loop);
  };
  tvT = requestAnimationFrame(loop);
}
function stopTv() { if (tvT) cancelAnimationFrame(tvT); tvT = null; document.body.classList.remove('tv'); $('btnTv').classList.remove('on'); }
$('btnTv').onclick = () => tvT ? stopTv() : startTv();

/* ================= الإعدادات ================= */
$('btnSettings').onclick = () => {
  $('sStocks').value = cfg.stocks.join(', '); $('sCrypto').value = cfg.crypto.join(', '); $('sFx').value = cfg.fx.join(', ');
  $('sInt').value = String(cfg.interval); $('sSypNow').innerHTML = '1 دولار = <span class="num">' + fmt(syp()) + '</span> ليرة سورية'; $('sTv').value = String(cfg.tv); $('setModal').classList.add('open');
};
$('sSave').onclick = () => {
  const list = v => v.split(/[,\s،]+/).map(x => x.trim().toUpperCase()).filter(Boolean);
  cfg.stocks = list($('sStocks').value).slice(0, 16); cfg.crypto = list($('sCrypto').value).slice(0, 12); cfg.fx = list($('sFx').value).slice(0, 20);
  
  cfg.interval = +$('sInt').value; cfg.tv = +$('sTv').value; store.set('cfg2', cfg);
  if (data && data.fx && data.fx.rates) data.fx.rates.SYP = syp();
  $('setModal').classList.remove('open'); schedule(); refresh(); connectCrypto(); renderAll();
};
document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.hasAttribute('data-close')) m.classList.remove('open'); }));
document.querySelectorAll('#curSeg button').forEach(b => b.onclick = () => {
  cfg.cur = b.dataset.cur; store.set('cfg2', cfg);
  document.querySelectorAll('.odo').forEach(o => o._raw = null);
  renderAll(); loadCharts();
});
$('btnFull').onclick = () => window.api ? window.api.toggleFullscreen() : (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
document.addEventListener('keydown', e => {
  if (e.key === 'F11') { e.preventDefault(); $('btnFull').click(); }
  if (e.key === 'Escape') { document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); stopTv(); }
  if (e.target.tagName !== 'INPUT' && /^[1-6]$/.test(e.key)) go(ORDER[+e.key - 1]);
});
// ملاءمة الواجهة لأي حجم شاشة: تكبير/تصغير متناسب بحيث لا تتداخل العناصر أبداً
const BASE_W = 1920, BASE_H = 1060;
function fitScreen() {
  if (window.api && window.api.setZoom) {
    const z0 = window.api.getZoom(), W = innerWidth * z0, H = innerHeight * z0;
    const z = Math.max(.45, Math.min(1.8, Math.min(W / BASE_W, H / BASE_H)));
    if (Math.abs(z - z0) > .005) { window.api.setZoom(z); return true; }
  }
  return false;
}
let fitT;
addEventListener('resize', () => { clearTimeout(fitT); fitT = setTimeout(() => { fitScreen(); go(st.page); }, 120); });
fitScreen();

/* ================= بيانات المعاينة (فقط خارج التطبيق) ================= */
function rw(n, end, vol, seed) { let v = 1, a = []; let s = seed || 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < n; i++) { v *= 1 + (rnd() - .48) * vol; a.push(v); } return a.map(x => x / a[n - 1] * end); }
function demoData() {
  const mk = (sym, p, c, i) => ({ symbol: sym, price: p, changePct: c, spark: rw(60, p, c / 300 + .004, i + 3), currency: 'USD' });
  return {
    gold: { price: 4062.4, changePct: 0.84, source: 'معاينة' }, copper: { price: 5.06, changePct: 1.35, spark: rw(60, 5.06, .005, 9), source: 'معاينة' }, silver: { price: 50.82, changePct: -0.42, spark: rw(60, 50.8, .006, 5), source: 'معاينة' },
    crypto: [['BTC', 91250, 2.1], ['ETH', 3080, 3.4], ['SOL', 141.2, -1.8], ['XRP', 2.18, 0.6], ['BNB', 905, 1.1], ['DOGE', .162, -2.4], ['ADA', .47, -0.9], ['TON', 1.62, 4.2]].map(([s, p, c]) => ({ symbol: s, price: p, changePct: c, high: p * 1.012, low: p * .975 })),
    fx: { rates: { USD: 1, AED: 3.6725, EUR: .866, GBP: .762, SAR: 3.75, KWD: .307, QAR: 3.64, OMR: .3845, BHD: .376, INR: 88.6, PKR: 281.2, EGP: 47.3, JPY: 156.2, CNY: 7.11, TRY: 42.3, CHF: .806, PHP: 59.1, CAD: 1.41, JOD: .709, SYP: 13000 }, source: 'معاينة' },
    stocks: [['AAPL', 268.2, 1.2], ['MSFT', 478.5, -0.6], ['NVDA', 182.4, 2.7], ['GOOGL', 289.1, 0.4], ['AMZN', 221.6, -1.1], ['META', 594.3, 0.9], ['TSLA', 395.7, -2.3], ['TSM', 284.2, 1.5], ['AVGO', 342.8, 0.2], ['JPM', 301.4, -0.3], ['NFLX', 112.5, -1.6], ['XOM', 118.9, 0.7]].map((x, i) => mk(...x, i)),
    at: Date.now()
  };
}
function demoHist(kind, sym, range) {
  const yrs = { '3Y': 3, '5Y': 5, '10Y': 10, '15Y': 15, '20Y': 20 }[range];
  const n = yrs ? Math.min(240, yrs * 26) : { '1D': 120, '1W': 140, '1M': 160, '1Y': 250 }[range]; const span = yrs ? yrs * 31536e6 : { '1D': 864e5, '1W': 6048e5, '1M': 2592e6, '1Y': 31536e6 }[range];
  const end = kind === 'gold' ? data.gold.price : kind === 'silver' ? data.silver.price : kind === 'copper' ? data.copper.price : kind === 'crypto' ? data.crypto.find(c => c.symbol === sym).price : data.stocks.find(s => s.symbol === sym).price;
  const vol = (yrs ? .02 + yrs * .004 : { '1D': .002, '1W': .004, '1M': .008, '1Y': .015 }[range]) * (kind === 'crypto' ? 2.5 : 1);
  const now = Date.now(); return rw(n, end, vol, sym.length * 13 + n).map((v, i) => [now - span + span * i / (n - 1), v]);
}

/* ================= البدء ================= */
tickClock(); setInterval(tickClock, 1000);
go('home'); renderAll(); refresh(); schedule();
document.fonts.ready.then(() => { document.querySelectorAll('.odo').forEach(o => o._wfs = null); renderAll(); });
document.fonts && document.fonts.ready.then(() => fitPrices());

/* ===== التحديث من داخل البرنامج ===== */
const UPD_URL = 'https://raw.githubusercontent.com/Withnourak/WithnourakGlobalPrices-Web/downloads/latest.json';
const CAP = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() ? window.Capacitor.getPlatform() : null;
const IS_DESKTOP = !!(window.api && window.api.updateInstall);
const IS_WEB = !IS_DESKTOP && !CAP;
const verCmp = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); } return 0; };
let updInfo = null, updBusy = false;
function updMsg(t, cls) { const m = $('updMsg'); if (m) { m.innerHTML = t; m.className = 'upd-msg ' + (cls || ''); } }
function updBar(p) { const b = $('updBar'); if (!b) return; b.classList.toggle('on', p != null); b.firstElementChild.style.width = Math.round((p || 0) * 100) + '%'; }
async function curVersion() { try { if (IS_DESKTOP && window.api.appVersion) return await window.api.appVersion(); } catch (_) {} return window.APP_VERSION || '0'; }
async function fetchManifest() {
  if (IS_DESKTOP) return window.api.updateCheck();
  const r = await fetch(UPD_URL + '?t=' + Date.now(), { cache: 'no-store' });
  return r.json();
}
async function checkUpdate(silent) {
  if (updBusy) return; const btn = $('updBtn');
  const cur = await curVersion(); if ($('updCur')) $('updCur').textContent = cur;
  if (!silent) { updMsg('جارٍ التحقق من آخر نسخة…'); btn.disabled = true; }
  try {
    updInfo = await fetchManifest();
    const newer = verCmp(updInfo.version, cur) > 0;
    if (!newer) { if (!silent) updMsg('✓ لديك أحدث نسخة (' + cur + ')', 'ok'); btn.textContent = '⟳ التحقق من التحديثات'; btn.dataset.act = ''; }
    else {
      updMsg('تتوفر نسخة جديدة: <b class="num">' + updInfo.version + '</b>' + (updInfo.notes ? '<br><small>' + updInfo.notes + '</small>' : ''), 'new');
      btn.textContent = '⬇ تحديث الآن إلى ' + updInfo.version; btn.dataset.act = 'install';
      $('btnSettings')?.classList.add('has-upd');
    }
  } catch (e) { if (!silent) updMsg('تعذّر الاتصال بخادم التحديث، تأكد من الإنترنت وحاول مجدداً', 'err'); }
  btn.disabled = false;
}
async function installUpdate() {
  if (updBusy || !updInfo) return; updBusy = true; const btn = $('updBtn'); btn.disabled = true;
  try {
    if (IS_WEB) { updMsg('جارٍ تحميل النسخة الجديدة…'); location.replace(location.pathname + '?v=' + updInfo.version + '-' + Date.now()); return; }
    if (IS_DESKTOP) {
      updMsg('جارٍ تنزيل النسخة ' + updInfo.version + '… سيُغلق البرنامج ويُعاد فتحه تلقائياً بعد التثبيت');
      window.api.onUpdateProgress(p => { updBar(p); btn.textContent = 'جارٍ التنزيل ' + Math.round(p * 100) + '%'; });
      updBar(0); await window.api.updateInstall();
      updMsg('✓ اكتمل التنزيل، جارٍ التثبيت…', 'ok'); return;
    }
    const f = updInfo.files && updInfo.files[CAP];
    if (!f) throw new Error('no file');
    if (CAP === 'android') updMsg('سيُنزَّل ملف التحديث عبر المتصفح، افتحه ثم اضغط «تحديث» — لا حاجة لحذف التطبيق', 'new');
    else updMsg('سيُنزَّل ملف الآيفون؛ ثبّته عبر Sideloadly فوق النسخة الحالية دون حذفها', 'new');
    location.href = f.parts[0];
  } catch (e) { updMsg('تعذّر التحديث: ' + (e && e.message ? e.message : e) + ' — حاول مجدداً', 'err'); updBar(null); }
  updBusy = false; btn.disabled = false;
}
document.addEventListener('click', ev => {
  const b = ev.target.closest('#updBtn'); if (!b) return;
  if (b.dataset.act === 'install') installUpdate(); else checkUpdate(false);
});
setTimeout(() => checkUpdate(true), 8000);
$('btnSettings')?.addEventListener('click', () => { curVersion().then(v => { if ($('updCur')) $('updCur').textContent = v; }); });
