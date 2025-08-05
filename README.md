# InvestAI

InvestAI는 뉴스와 소셜 미디어 데이터를 분석하여 시장의 Fear/Greed 지표를 제공하고,
실시간 환율과 주가 정보를 보여주는 웹 위젯 프로젝트입니다.

## 요구 사항
- Python 3.10+
- Redis, PostgreSQL
- 선택: Node.js (프론트엔드 빌드 시)

## 설치 및 실행
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 데이터 수집기
```bash
python data-collector/news_collector.py
python data-collector/twitter_collector.py
python data-collector/score_calculator.py  # Fear/Greed 계산 및 Redis 캐시
python - <<'PY'
from data-collector.market_data import fetch_rates, fetch_stock
fetch_rates(["USD", "EUR"])
fetch_stock(["AAPL"])
PY
```

#### 환경 변수
환경 변수 예시는 저장소의 `.env.example` 파일을 참고하여 `.env`로 복사해 사용하세요.
주가 데이터를 조회하려면 [Alpha Vantage](https://www.alphavantage.co/) API 키가 필요합니다.
아래와 같이 `ALPHAVANTAGE_API_KEY` 환경 변수에 키를 설정하세요.

```bash
export ALPHAVANTAGE_API_KEY=YOUR_KEY
```

=======


### 스케줄러
`TARGETS` 환경 변수로 대상 심볼을 지정한 뒤 실행하면 1분 간격으로 수집하고 5분마다 점수를 갱신합니다.
```bash
export TARGETS=KOSPI,AAPL
python data-collector/scheduler.py
```

=======



### API 서버
```bash
uvicorn api.main:app --reload
```


=======

환율과 주가 API는 여러 심볼을 `symbols` 파라미터를 반복해 전달합니다. 예: `/api/rates?symbols=USD&symbols=EUR`.

### 위젯 사용
API 서버를 실행한 뒤 브라우저에서 [http://localhost:8000](http://localhost:8000) 에 접속하면 `widget/index.html` 데모 페이지가 표시됩니다.
또는 기존 페이지에 `widget/widget.js`, `widget/sentimentWidget.js`를 포함하고
`startPolling` 및 `startSentimentPolling` 함수를 호출하여 DOM을 업데이트할 수 있습니다.

=======



## 기여 가이드
1. 이슈를 확인하고 작업할 내용을 선택합니다.
2. 포크 후 Pull Request를 생성합니다.
3. 코드 스타일을 유지하고 테스트를 추가하세요.

## 로드맵
- 추가 데이터 소스 지원
- Docker 기반 배포 환경
- 백테스트 및 전략 추천 기능

## 라이선스
이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
