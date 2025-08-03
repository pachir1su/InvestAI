"""환율과 주가를 외부 API에서 가져와 Redis에 캐시합니다."""
import json
import os
from typing import Iterable, Dict

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
    """IEX Cloud 등에서 주가를 가져옵니다. 토큰은 IEX_TOKEN 환경 변수 사용."""
    token = os.getenv("IEX_TOKEN")
    params = {
        "symbols": ",".join(symbols),
        "types": "quote",
        "token": token,
    }
    resp = requests.get(
        "https://cloud.iexapis.com/stable/stock/market/batch", params=params, timeout=10
    )
    resp.raise_for_status()
    data = resp.json()
    prices = {sym: data.get(sym, {}).get("quote", {}).get("latestPrice") for sym in symbols}

    r = redis.from_url(REDIS_URL)
    for sym, price in prices.items():
        r.setex(f"price:{sym}", 30, json.dumps({"symbol": sym, "price": price}))
    return prices
