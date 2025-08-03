"""뉴스 기사를 수집하여 PostgreSQL 데이터베이스에 저장합니다."""
import os
import requests
import psycopg2
from psycopg2.extras import execute_values


def collect_news(keyword: str = "finance") -> int:
    """뉴스 API에서 기사를 가져와 `raw_news` 테이블에 저장합니다.

    환경 변수
    ----------
    NEWS_API_KEY: NewsAPI 등의 API 키
    DATABASE_DSN: PostgreSQL 연결 문자열
    NEWS_API_URL: (선택) 기본 요청 URL
    """
    api_key = os.getenv("NEWS_API_KEY")
    if not api_key:
        raise RuntimeError("NEWS_API_KEY가 설정되지 않았습니다.")
    url = os.getenv(
        "NEWS_API_URL",
        "https://newsapi.org/v2/top-headlines?language=en&category=business",
    )
    headers = {"Authorization": f"Bearer {api_key}"}
    resp = requests.get(url, headers=headers, timeout=10)
    resp.raise_for_status()
    articles = resp.json().get("articles", [])
    rows = [
        (a.get("title"), a.get("description", ""), keyword) for a in articles
    ]

    dsn = os.getenv("DATABASE_DSN")
    if not dsn:
        raise RuntimeError("DATABASE_DSN이 설정되지 않았습니다.")
    conn = psycopg2.connect(dsn)
    with conn, conn.cursor() as cur:
        execute_values(
            cur,
            "INSERT INTO raw_news (title, summary, target) VALUES %s",
            rows,
        )
    return len(rows)


if __name__ == "__main__":
    print(f"Inserted {collect_news()} news rows")
