// 실시간 시세 위젯
export async function updateRates(symbols) {
  const res = await fetch(`/api/rates?symbols=${symbols.join(',')}`);
  const data = await res.json();
  for (const [sym, value] of Object.entries(data)) {
    const el = document.querySelector(`[data-rate="${sym}"]`);
    if (el) el.textContent = value.toFixed(4);
  }
}

export async function updateStocks(symbols) {
  const res = await fetch(`/api/stock?symbols=${symbols.join(',')}`);
  const data = await res.json();
  for (const [sym, price] of Object.entries(data)) {
    const el = document.querySelector(`[data-stock="${sym}"]`);
    if (el) el.textContent = price.toFixed(2);
  }
}

export function startPolling(rateSymbols, stockSymbols) {
  async function tick() {
    await Promise.all([
      updateRates(rateSymbols),
      updateStocks(stockSymbols)
    ]);
  }
  tick();
  return setInterval(tick, 5000);
}
