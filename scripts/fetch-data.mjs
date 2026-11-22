// يجلب بيانات Yahoo Finance (الأسهم والنحاس وسجل الأسعار) على خوادم GitHub وينشرها مع الموقع
import fs from 'fs';
const SYMS = ['AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSLA','TSM','AVGO','JPM','NFLX','XOM','BRK-B','V','MA','WMT','ORCL','AMD','INTC','KO','PEP','DIS','NKE','IBM','ADBE','CRM','PLTR','UBER','COIN','BABA','MCD','2222.SR','EMAAR.AE','FAB.AE','GC=F','SI=F','HG=F','BTC-USD'];
const COMBOS = [['1d','5m'],['1d','15m'],['5d','30m'],['1mo','60m'],['1y','1d'],['5y','1wk'],['10y','1mo'],['max','1mo']];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
fs.mkdirSync('site/data/y', { recursive: true });
let ok = 0, fail = 0;
const jobs = [];
for (const s of SYMS) for (const [r, i] of COMBOS) {
  const futures = /=F$/.test(s);
  if (!futures && i === '15m') continue;
  if (!futures && s !== 'BTC-USD' && ['10y','max'].includes(r) && !SYMS.slice(0, 12).includes(s)) continue;
  jobs.push([s, r, i]);
}
async function one([s, r, i]) {
  for (const h of ['query1', 'query2']) {
    try {
      const res = await fetch(`https://${h}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?range=${r}&interval=${i}&includePrePost=false`, { headers: { 'User-Agent': UA } });
      if (!res.ok) continue;
      const t = await res.text(); JSON.parse(t);
      fs.writeFileSync(`site/data/y/${s}_${r}_${i}.json`, t); ok++; return;
    } catch (_) {}
  }
  fail++;
}
for (let k = 0; k < jobs.length; k += 6) await Promise.all(jobs.slice(k, k + 6).map(one));
fs.writeFileSync('site/data/updated.json', JSON.stringify({ at: Date.now(), ok, fail }));
console.log('ok', ok, 'fail', fail);
