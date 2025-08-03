"""FastAPI 기반 백엔드 서버."""
import json
import os


from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
import redis

app = FastAPI(title="InvestAI API")
BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/static", StaticFiles(directory=BASE_DIR / "widget"), name="static")
r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))


@app.get("/", include_in_schema=False)
def root():
    """위젯 데모 페이지로 리디렉트."""
    return RedirectResponse("/static/index.html")

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
