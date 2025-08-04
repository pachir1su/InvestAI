// 감정 지수 위젯
function setStatus(message, isError = false) {
  const el = document.querySelector('[data-status="sentiment"]');
  if (el) {
    el.textContent = message;
    el.classList.toggle('error', isError);
  }
}

export async function updateSentiment(target) {
  try {
    const res = await fetch(`/api/sentiment?target=${target}`);
    if (!res.ok) {
      setStatus('업데이트 실패', true);
      return;
    }
    const { fear, greed } = await res.json();
    const fearEl = document.querySelector(`[data-fear="${target}"]`);
    const greedEl = document.querySelector(`[data-greed="${target}"]`);
    if (fearEl) fearEl.textContent = fear.toFixed(2);
    if (greedEl) greedEl.textContent = greed.toFixed(2);
    const fearBar = document.querySelector(`[data-fear-bar="${target}"]`);
    const greedBar = document.querySelector(`[data-greed-bar="${target}"]`);
    if (fearBar) fearBar.style.width = `${fear}%`;
    if (greedBar) greedBar.style.width = `${greed}%`;
    setStatus(`업데이트: ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Failed to update sentiment', err);
    setStatus('업데이트 실패', true);
  }
}

export function startSentimentPolling(target) {
  updateSentiment(target);
  return setInterval(() => updateSentiment(target), 60000);
}
