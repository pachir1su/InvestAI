// 실시간 시세 위젯
export async function updateRates(symbols) {
  try {
    const res = await fetch(`/api/rates?symbols=${symbols.join(',')}`);
    if (!res.ok) return;
    const data = await res.json();
    for (const [sym, value] of Object.entries(data)) {
      const el = document.querySelector(`[data-rate="${sym}"]`);
      if (el) el.textContent = value.toFixed(4);
    }
  } catch (err) {
    console.error('Failed to update rates', err);
  }
}

export async function updateStocks(symbols) {
  try {
    const res = await fetch(`/api/stock?symbols=${symbols.join(',')}`);
    if (!res.ok) return;
    const data = await res.json();
    for (const [sym, price] of Object.entries(data)) {
      const el = document.querySelector(`[data-stock="${sym}"]`);
      if (el) el.textContent = price.toFixed(2);
    }
  } catch (err) {
    console.error('Failed to update stocks', err);
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
