// نسخة الموبايل والمتصفح: نفس محرك جلب الأسعار في نسخة سطح المكتب (مولّد تلقائياً من main.js)
(function () {
'use strict';
const HANDLERS = {};
const _fetch = window.fetch.bind(window);
const PROXIES = [u => 'https://corsproxy.io/?url=' + encodeURIComponent(u), u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u)];
const fetch = async (u, o = {}) => {
  const opts = Object.assign({}, o); delete opts.headers;
  // بيانات Yahoo تُجلب على خوادم GitHub وتُنشر مع الموقع كل 10 دقائق
  const y = u.match(/finance.yahoo.com/v8/finance/chart/([^?]+)?range=([^&]+)&interval=([^&]+)/);
  if (y) { const r = await _fetch('data/y/' + encodeURIComponent(decodeURIComponent(y[1])) + '_' + y[2] + '_' + y[3] + '.json?t=' + Math.floor(Date.now() / 300000), opts); if (r.ok) return r; throw new Error('no data'); }
  if (/stooq/.test(u)) throw new Error('unavailable');
  return _fetch(u, opts);
};
const OZ_TO_GRAM = 31.1034768;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

async function getJSON(url, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } finally { clearTimeout(t); }
}
async function getText(url, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.text();
  } finally { clearTimeout(t); }
}
async function firstOk(fns) {
  let lastErr;
  for (const fn of fns) {
    try { const v = await fn(); if (v && isFinite(v.price) && v.price > 0) return v; } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('no source');
}

// ---------- Yahoo Finance (أسهم + عقود الذهب والفضة) ----------
async function yahooChart(symbol, range = '1d', interval = '5m') {
  const hosts = ['query1', 'query2'];
  let lastErr;
  for (const h of hosts) {
    try {
      const j = await getJSON(`https://${h}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&includePrePost=false`);
      const r = j.chart.result[0];
      const m = r.meta;
      const closes = (r.indicators.quote[0].close || []).filter(v => v != null);
      const price = m.regularMarketPrice ?? closes[closes.length - 1];
      const prev = m.chartPreviousClose ?? m.previousClose;
      return {
        symbol, price, prev,
        change: prev ? price - prev : null,
        changePct: prev ? ((price - prev) / prev) * 100 : null,
        name: m.longName || m.shortName || symbol,
        currency: m.currency || 'USD',
        spark: closes.slice(-80),
        marketState: m.marketState || null,
        exchange: m.fullExchangeName || m.exchangeName || '',
        source: 'Yahoo Finance'
      };
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}
async function stooqQuote(symbol) {
  const s = symbol.toLowerCase().includes('.') ? symbol.toLowerCase() : symbol.toLowerCase() + '.us';
  const csv = await getText(`https://stooq.com/q/l/?s=${s}&f=sd2t2ohlcv&h&e=csv`);
  const row = csv.trim().split('\n')[1].split(',');
  const open = parseFloat(row[3]), close = parseFloat(row[6]);
  return { symbol, price: close, prev: open, change: close - open, changePct: ((close - open) / open) * 100, name: symbol, currency: 'USD', spark: [], source: 'Stooq' };
}

// ---------- الذهب والفضة ----------
async function metal(code, yahooSym) {
  // السعر الفوري العالمي للأونصة بالدولار
  const spot = await firstOk([
    async () => { const j = await getJSON(`https://api.gold-api.com/price/${code}`); return { price: +j.price, source: 'gold-api.com (Spot)' }; },
    async () => { const y = await yahooChart(yahooSym); return { price: y.price, source: 'COMEX ' + yahooSym }; },
    ...(code === 'XAU' ? [async () => { const j = await getJSON('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT'); return { price: +j.price, source: 'PAXG' }; }] : [])
  ]);
  // نسبة التغير اليومي + منحنى اليوم من العقود الآجلة
  let changePct = null, spark = [];
  try {
    const y = await yahooChart(yahooSym, '1d', '15m');
    changePct = y.changePct; spark = y.spark;
  } catch (_) {}
  return { ...spot, changePct, spark, perGram: spot.price / OZ_TO_GRAM };
}

// ---------- الأسهم الإماراتية: سوق أبوظبي (ADX) وسوق دبي (DFM) عبر TradingView ----------
const UAE_TICKERS = ['ADX:FAB','ADX:IHC','ADX:ALDAR','ADX:ADCB','ADX:ADIB','ADX:ADNOCGAS','ADX:ADNOCDRILL','ADX:ALPHADHABI','ADX:ADPORTS',
  'DFM:EMAAR','DFM:EMIRATESNBD','DFM:DIB','DFM:DEWA','DFM:SALIK','DFM:DU','DFM:AIRARABIA','DFM:EMAARDEV'];
async function uaeStocks() {
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch('https://scanner.tradingview.com/uae/scan', { method: 'POST', signal: ctrl.signal, headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ symbols: { tickers: UAE_TICKERS }, columns: ['name', 'description', 'close', 'change', 'currency', 'high', 'low'] }) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const j = await res.json();
    return j.data.map(r => ({ symbol: r.s, market: r.s.split(':')[0], price: r.d[2], changePct: r.d[3], name: r.d[1], currency: r.d[4] || 'AED', high: r.d[5], low: r.d[6], spark: [], source: 'TradingView' }));
  } finally { clearTimeout(t); }
}

// ---------- النحاس (COMEX، السعر بالدولار للرطل) ----------
const LB_KG = 0.45359237;
async function copper() {
  try {
    const y = await yahooChart('HG=F', '1d', '15m');
    return { price: y.price, changePct: y.changePct, spark: y.spark, source: 'COMEX HG=F' };
  } catch (e) {
    const j = await getJSON('https://api.gold-api.com/price/HG');
    let p = +j.price; if (p > 100) p = p / 2204.62; // إذا كان بالطن نحوله للرطل
    return { price: p, changePct: null, spark: [], source: 'gold-api.com' };
  }
}

// ---------- العملات الرقمية ----------
const CRYPTO_IDS = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', XRP: 'ripple', BNB: 'binancecoin', DOGE: 'dogecoin', ADA: 'cardano', TRX: 'tron', TON: 'the-open-network', AVAX: 'avalanche-2', LINK: 'chainlink', DOT: 'polkadot', LTC: 'litecoin' };
async function cryptos(list) {
  try {
    const syms = JSON.stringify(list.map(c => c + 'USDT'));
    const j = await getJSON('https://api.binance.com/api/v3/ticker/24hr?symbols=' + encodeURIComponent(syms));
    return j.map(t => ({ symbol: t.symbol.replace(/USDT$/, ''), price: +t.lastPrice, changePct: +t.priceChangePercent, high: +t.highPrice, low: +t.lowPrice, volume: +t.quoteVolume, source: 'Binance' }));
  } catch (e) {
    const ids = list.map(c => CRYPTO_IDS[c]).filter(Boolean).join(',');
    const j = await getJSON(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`);
    const rev = Object.fromEntries(Object.entries(CRYPTO_IDS).map(([k, v]) => [v, k]));
    return j.map(c => ({ symbol: rev[c.id], price: c.current_price, changePct: c.price_change_percentage_24h, high: c.high_24h, low: c.low_24h, volume: c.total_volume, source: 'CoinGecko' }));
  }
}

// ---------- السجل التاريخي للرسوم البيانية ----------
const RANGES = {
  '1D': ['1d', '5m', '5m', 288], '1W': ['5d', '30m', '30m', 336], '1M': ['1mo', '60m', '4h', 180], '1Y': ['1y', '1d', '1d', 365],
  '3Y': ['5y', '1wk', '1w', 160], '5Y': ['5y', '1wk', '1w', 260], '10Y': ['10y', '1mo', '1M', 120], '15Y': ['max', '1mo', '1M', 180], '20Y': ['max', '1mo', '1M', 240]
};
const YEARS = { '3Y': 3, '5Y': 5, '10Y': 10, '15Y': 15, '20Y': 20 };
const cutYears = (pts, range) => YEARS[range] ? pts.filter(p => p[0] >= Date.now() - YEARS[range] * 365.25 * 864e5) : pts;
async function history(kind, symbol, range) {
  const [yr, yi, bi, bl] = RANGES[range] || RANGES['1D'];
  if (kind === 'crypto') {
    // للفترات الطويلة (3 سنوات فأكثر) نستخدم سجل Yahoo الأطول
    if (YEARS[range]) {
      const y = await getJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}-USD?range=${yr}&interval=${yi}`);
      const r = y.chart.result[0]; return cutYears((r.timestamp || []).map((t, i) => [t * 1000, r.indicators.quote[0].close[i]]).filter(p => p[1] != null), range);
    }
    try {
      const k = await getJSON(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${bi}&limit=${Math.min(bl, 1000)}`);
      return k.map(r => [r[6], +r[4]]);
    } catch (_) {
      const y = await getJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}-USD?range=${yr}&interval=${yi}`);
      const r = y.chart.result[0]; return (r.timestamp || []).map((t, i) => [t * 1000, r.indicators.quote[0].close[i]]).filter(p => p[1] != null);
    }
  }
  const ysym = kind === 'gold' ? 'GC=F' : kind === 'silver' ? 'SI=F' : kind === 'copper' ? 'HG=F' : symbol;
  let last = null;
  for (const h of ['query1', 'query2']) {
    try {
      const y = await getJSON(`https://${h}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ysym)}?range=${yr}&interval=${yi}`);
      const r = y.chart.result[0];
      let pts = cutYears((r.timestamp || []).map((t, i) => [t * 1000, r.indicators.quote[0].close[i]]).filter(p => p[1] != null), range);
      // معايرة العقود الآجلة على السعر الفوري الحالي
      if ((kind === 'gold' || kind === 'silver') && pts.length) {
        try {
          const j = await getJSON(`https://api.gold-api.com/price/${kind === 'gold' ? 'XAU' : 'XAG'}`);
          const f = +j.price / pts[pts.length - 1][1];
          if (f > 0.9 && f < 1.1) pts = pts.map(p => [p[0], p[1] * f]);
        } catch (_) {}
      }
      return pts;
    } catch (e) { last = e; }
  }
  throw last;
}
HANDLERS['history'] = async (_e, { kind, symbol, range }) => {
  try { return { points: await history(kind, symbol, range) }; } catch (e) { return { error: String(e.message || e) }; }
};

// ---------- أسعار الصرف ----------
async function fx() {
  try {
    const j = await getJSON('https://open.er-api.com/v6/latest/USD');
    if (j.result !== 'success') throw new Error('fx');
    const out = { rates: j.rates, updated: j.time_last_update_unix * 1000, source: 'ExchangeRate-API' };
    // أسعار اليوم السابق لحساب نسبة التغيّر (البنك المركزي الأوروبي)
    try {
      const d = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
      const [prev, now] = await Promise.all([getJSON(`https://api.frankfurter.app/${d}?from=USD`), getJSON('https://api.frankfurter.app/latest?from=USD')]);
      if (prev.date !== now.date) out.prev = { ...prev.rates, USD: 1, AED: 3.6725 }, out.cur = { ...now.rates, USD: 1, AED: 3.6725 };
    } catch (_) {}
    return out;
  } catch (e) {
    const j = await getJSON('https://api.frankfurter.app/latest?from=USD');
    return { rates: { USD: 1, AED: 3.6725, ...j.rates }, updated: Date.now(), source: 'Frankfurter (ECB)' };
  }
}

async function stocks(symbols) {
  const out = await Promise.all(symbols.map(async s => {
    try { return await yahooChart(s); } catch (_) {
      try { return await stooqQuote(s); } catch (e) { return { symbol: s, error: true }; }
    }
  }));
  return out;
}

HANDLERS['fetch-all'] = async (_e, opts) => {
  const symbols = (opts && opts.stocks) || [];
  const cl = (opts && opts.crypto) || ['BTC', 'ETH'];
  const [gold, silver, cr, rates, stk, cu, uae] = await Promise.allSettled([
    metal('XAU', 'GC=F'), metal('XAG', 'SI=F'), cryptos(cl), fx(), stocks(symbols), copper(), uaeStocks()
  ]);
  const pick = r => r.status === 'fulfilled' ? r.value : { error: String(r.reason && r.reason.message || r.reason) };
  return { gold: pick(gold), silver: pick(silver), crypto: pick(cr), fx: pick(rates), stocks: pick(stk), copper: pick(cu), uae: pick(uae), at: Date.now() };
};

// تحديث سريع للذهب والفضة (السعر الفوري فقط) لاستخدامه كل بضع ثوانٍ
HANDLERS['metals-fast'] = async () => {
  const [g, sv] = await Promise.allSettled([
    getJSON('https://api.gold-api.com/price/XAU', 5000), getJSON('https://api.gold-api.com/price/XAG', 5000)
  ]);
  return { gold: g.status === 'fulfilled' ? +g.value.price : null, silver: sv.status === 'fulfilled' ? +sv.value.price : null, at: Date.now() };
};


window.api = {
  fetchAll: opts => HANDLERS['fetch-all'](null, opts),
  history: q => HANDLERS['history'](null, q),
  metalsFast: () => HANDLERS['metals-fast'](),
  toggleFullscreen: () => {}
};
})();
