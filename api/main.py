"""FastAPI 기반 백엔드 서버."""
import json
import os

from fastapi import FastAPI, HTTPException, Query
import redis

app = FastAPI(title="InvestAI API")
r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))


@app.get("/api/sentiment")
def get_sentiment(target: str):
    data = r.get(f"sentiment:{target}")
    if not data:
        raise HTTPException(status_code=404, detail="No sentiment data")
    return json.loads(data)


@app.get("/api/rates")
def get_rates(symbols: list[str] = Query(...)):
    result = {}
    for sym in symbols:
        data = r.get(f"rates:{sym}")
        if data:
            result[sym] = json.loads(data)["value"]
    return result


@app.get("/api/stock")
def get_stock(symbols: list[str] = Query(...)):
    result = {}
    for sym in symbols:
        data = r.get(f"price:{sym}")
        if data:
            result[sym] = json.loads(data)["price"]
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
