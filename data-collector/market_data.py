"""환율과 주가를 외부 API에서 가져와 Redis에 캐시합니다."""
import json
import os
from typing import Dict, Iterable

import redis
import requests

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")


def fetch_rates(symbols: Iterable[str]) -> Dict[str, float]:
    """exchangerate.host API에서 환율을 가져옵니다."""
    params = {"symbols": ",".join(symbols)}
    resp = requests.get("https://api.exchangerate.host/latest", params=params, timeout=10)
    resp.raise_for_status()
    rates = resp.json().get("rates", {})

    r = redis.from_url(REDIS_URL)
    for sym, value in rates.items():
        r.setex(f"rates:{sym}", 300, json.dumps({"symbol": sym, "value": value}))
    return rates


def fetch_stock(symbols: Iterable[str]) -> Dict[str, float]:
    """Alpha Vantage에서 주가를 가져옵니다.

    각 심볼은 `GLOBAL_QUOTE` 엔드포인트를 사용해 개별적으로 조회합니다.
    """
    token = os.getenv("ALPHAVANTAGE_API_KEY")
    if not token:
        raise RuntimeError("ALPHAVANTAGE_API_KEY environment variable is required")

    r = redis.from_url(REDIS_URL)
    prices: Dict[str, float] = {}
    for sym in symbols:
        params = {
            "function": "GLOBAL_QUOTE",
            "symbol": sym,
            "apikey": token,
        }
        resp = requests.get("https://www.alphavantage.co/query", params=params, timeout=10)
        resp.raise_for_status()

        data = resp.json().get("Global Quote", {})
        price_str = data.get("05. price")
        price = None
        if price_str is not None:
            try:
                price = float(price_str)
            except ValueError:
                price = None

        prices[sym] = price
        r.setex(f"price:{sym}", 30, json.dumps({"symbol": sym, "price": price}))

    return prices
