"""Twitter API를 통해 트윗을 수집하여 PostgreSQL에 저장합니다."""
import os
import requests
import psycopg2
from psycopg2.extras import execute_values


def collect_tweets(query: str = "finance") -> int:
    """최근 트윗을 검색해 `raw_tweets` 테이블에 저장합니다."""
    token = os.getenv("TWITTER_BEARER_TOKEN")
    if not token:
        raise RuntimeError("TWITTER_BEARER_TOKEN이 설정되지 않았습니다.")
    url = "https://api.twitter.com/2/tweets/search/recent"
    params = {"query": query, "max_results": 10, "tweet.fields": "created_at"}
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(url, params=params, headers=headers, timeout=10)
    resp.raise_for_status()
    data = resp.json().get("data", [])
    rows = [(t["id"], t["text"], query) for t in data]

    dsn = os.getenv("DATABASE_DSN")
    if not dsn:
        raise RuntimeError("DATABASE_DSN이 설정되지 않았습니다.")
    conn = psycopg2.connect(dsn)
    with conn, conn.cursor() as cur:
        execute_values(
            cur,
            "INSERT INTO raw_tweets (tweet_id, text, target) VALUES %s",
            rows,
        )
    return len(rows)


if __name__ == "__main__":
    print(f"Inserted {collect_tweets()} tweets")
