// 감정 지수 위젯
export async function updateSentiment(target) {
  const res = await fetch(`/api/sentiment?target=${target}`);
  if (!res.ok) return;
  const { fear, greed } = await res.json();
  const fearEl = document.querySelector(`[data-fear="${target}"]`);
  const greedEl = document.querySelector(`[data-greed="${target}"]`);
  if (fearEl) fearEl.textContent = fear.toFixed(2);
  if (greedEl) greedEl.textContent = greed.toFixed(2);
  const fearBar = document.querySelector(`[data-fear-bar="${target}"]`);
  const greedBar = document.querySelector(`[data-greed-bar="${target}"]`);
  if (fearBar) fearBar.style.width = `${fear}%`;
  if (greedBar) greedBar.style.width = `${greed}%`;

}

export function startSentimentPolling(target) {
  updateSentiment(target);
  return setInterval(() => updateSentiment(target), 60000);
}
