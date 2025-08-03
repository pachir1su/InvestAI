"""뉴스·트윗 수집과 감정 지표 계산을 주기적으로 실행합니다."""
import os
from apscheduler.schedulers.blocking import BlockingScheduler

from .news_collector import collect_news
from .twitter_collector import collect_tweets
from .score_calculator import calculate_score

TARGETS = os.getenv("TARGETS", "KOSPI").split(",")


def main() -> None:
    scheduler = BlockingScheduler()
    for tgt in TARGETS:
        scheduler.add_job(collect_news, "interval", minutes=1, args=[tgt])
        scheduler.add_job(collect_tweets, "interval", minutes=1, args=[tgt])
        scheduler.add_job(calculate_score, "interval", minutes=5, args=[tgt])
    scheduler.start()


if __name__ == "__main__":
    main()
