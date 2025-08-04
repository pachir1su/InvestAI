// 실시간 시세 위젯

function setStatus(key, message, isError = false) {
  const el = document.querySelector(`[data-status="${key}"]`);
  if (el) {
    el.textContent = message;
    el.classList.toggle('error', isError);
  }
}

export async function updateRates(symbols) {
  if (!symbols.length) return;
  try {
    const params = new URLSearchParams();
    symbols.forEach((s) => params.append('symbols', s));

    const res = await fetch(`/api/rates?${params.toString()}`);
    if (!res.ok) {
      setStatus('rates', '업데이트 실패', true);
      return;
    }
    const data = await res.json();
    for (const [sym, value] of Object.entries(data)) {
      const el = document.querySelector(`[data-rate="${sym}"]`);
      if (el) {
        const prev = parseFloat(el.textContent);
        el.textContent = value.toFixed(4);
        if (!isNaN(prev)) {
          el.classList.remove('up', 'down');
          if (value > prev) el.classList.add('up');
          else if (value < prev) el.classList.add('down');
        }
      }
    }
    setStatus('rates', `업데이트: ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Failed to update rates', err);
    setStatus('rates', '업데이트 실패', true);

  }
}

export async function updateStocks(symbols) {
  if (!symbols.length) return;
  try {
    const params = new URLSearchParams();
    symbols.forEach((s) => params.append('symbols', s));

    const res = await fetch(`/api/stock?${params.toString()}`);
    if (!res.ok) {
      setStatus('stocks', '업데이트 실패', true);
      return;
    }
    const data = await res.json();
    for (const [sym, price] of Object.entries(data)) {
      const el = document.querySelector(`[data-stock="${sym}"]`);
      if (el) {
        const prev = parseFloat(el.textContent);
        el.textContent = price.toFixed(2);
        if (!isNaN(prev)) {
          el.classList.remove('up', 'down');
          if (price > prev) el.classList.add('up');
          else if (price < prev) el.classList.add('down');
        }
      }
    }
    setStatus('stocks', `업데이트: ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Failed to update stocks', err);
    setStatus('stocks', '업데이트 실패', true);
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
