"""수집된 텍스트를 기반으로 Fear/Greed 지표를 계산합니다."""
import json
import os
from typing import List

import psycopg2
import redis
from konlpy.tag import Okt

WORD_SCORES = {"하락": -1, "폭락": -2, "상승": 1, "호재": 2}


def _token_scores(text: str) -> int:
    okt = Okt()
    tokens = okt.morphs(text)
    return sum(WORD_SCORES.get(tok, 0) for tok in tokens)


def calculate_score(target: str) -> dict:
    """PostgreSQL에서 텍스트를 읽어 지표를 계산하고 Redis에 저장합니다."""
    dsn = os.getenv("DATABASE_DSN")
    if not dsn:
        raise RuntimeError("DATABASE_DSN이 설정되지 않았습니다.")
    conn = psycopg2.connect(dsn)
    with conn, conn.cursor() as cur:
        cur.execute("SELECT summary FROM raw_news WHERE target=%s", (target,))
        texts = [row[0] for row in cur.fetchall()]
        cur.execute("SELECT text FROM raw_tweets WHERE target=%s", (target,))
        texts += [row[0] for row in cur.fetchall()]

    scores = [_token_scores(t) for t in texts]
    fear = sum(1 for s in scores if s < 0) / max(1, len(scores))
    greed = sum(1 for s in scores if s > 0) / max(1, len(scores))
    result = {"fear": fear, "greed": greed}

    r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
    r.setex(f"sentiment:{target}", 60, json.dumps(result))
    return result


if __name__ == "__main__":
    print(calculate_score("KOSPI"))
