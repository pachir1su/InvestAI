# 사업 아이디어 No.35 - InvestAI(주식 매매 비서)

## 📌 프로젝트 개요
**InvestAI**는 AI 기반의 투자 보조 웹 애플리케이션으로, **주식, 증시, 경제 지표, 차트 분석**을 제공합니다. 사용자가 빠르고 정확한 투자 결정을 내릴 수 있도록 실시간 시장 데이터를 분석하고, AI 기반 인사이트를 제공합니다.

이 프로젝트는 **웹(HTML, CSS, JavaScript)**으로 먼저 개발되며, 이후 **React 및 React Native**로 확장될 예정입니다.

## 🚀 주요 기능
### 🔹 실시간 증시 및 경제 데이터 분석
- 국내(코스피, 코스닥) 및 미국(나스닥, S&P 500, 다우존스) 실시간 증시 데이터 제공
- 주요 경제 지표(CPI, FOMC, 금리 변동, 실업률 등) 분석
- 개별 종목 검색 및 상세 데이터 조회

### 🔹 AI 기반 차트 분석 (추후 추가)
- AI가 이평선, RSI, MACD 등 기술적 지표 분석
- 주요 매매 신호 감지 및 투자 인사이트 제공

### 🔹 AI 뉴스 요약 및 필터링 (추후 추가)
- AI를 활용한 경제 뉴스 요약 제공
- 관심 키워드를 설정하여 원하는 뉴스만 필터링

### 🔹 투자자 맞춤 리포트 생성 (추후 추가)
- 관심 종목 및 경제 데이터를 기반으로 맞춤형 투자 분석 리포트 제공
- 데이터 시각화를 통해 시장 트렌드 분석

### 🔹 알림 시스템 (추후 추가)
- 주요 뉴스 및 시장 변동 실시간 알림 제공

## 🛠️ 기술 스택
### **프론트엔드**
- **초기 개발**: HTML, CSS, JavaScript
- **확장 개발**: React (Next.js), React Native (iOS & Android)
- Tailwind CSS (디자인 최적화)

### **백엔드 (추후 확장 가능)**
- Node.js (Express) or Python (FastAPI)
- Firebase / Supabase (데이터 저장 및 인증)
- WebSocket을 통한 실시간 데이터 제공

### **외부 API**
- Google Gemini API (AI 뉴스 요약 및 차트 분석)
- Yahoo Finance API / Alpha Vantage API (주식 데이터 제공)
- Web Push API (실시간 알림)
- FRED API (미국 경제 데이터 제공)

## 📂 프로젝트 구조
```
InvestAI/
│── public/         # 정적 파일
│── src/
│   ├── components/ # UI 컴포넌트 (확장용)
│   ├── pages/      # 페이지별 컴포넌트 (확장용)
│   ├── services/   # API 호출 로직 (확장용)
│   ├── styles/     # CSS 및 Tailwind 설정
│   ├── utils/      # 공통 유틸 함수
│── mobile/         # React Native (iOS & Android) 코드 (확장용)
│── backend/        # 백엔드(Node.js or FastAPI) 코드 (확장용)
│── README.md       # 프로젝트 소개
│── package.json    # 프로젝트 설정 및 의존성
│── .gitignore      # Git 무시 파일 목록
```

## 🎯 프로젝트 진행 로드맵
| 주차 | 목표 |
|---|---|
| **1주차** | HTML, CSS, JavaScript 기반 웹페이지 틀 개발 |
| **2주차** | 뉴스 및 증시 데이터 API 연결 |
| **3주차** | 실시간 차트 UI 개발 |
| **4주차** | React(Next.js)로 웹 리팩토링 시작 |
| **5주차** | AI 뉴스 요약 및 필터링 기능 추가 |
| **6주차** | 투자 리포트 및 데이터 시각화 기능 추가 |
| **7주차** | 모바일 앱(React Native) 개발 착수 |

## 🛠️ 설치 및 실행 방법
### 1️⃣ 프로젝트 클론
```sh
git clone https://github.com/your-repo/InvestAI.git
cd InvestAI
```
### 2️⃣ 로컬 서버 실행 (HTML, CSS, JS 버전)
```sh
open index.html
```

## 📢 기여 방법
1. 이슈를 확인하고 적절한 작업을 선택합니다.
2. 새로운 브랜치를 생성합니다.
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. 코드를 수정하고 커밋합니다.
   ```sh
   git commit -m "feat: 새로운 기능 추가"
   ```
4. 원격 저장소에 푸시합니다.
   ```sh
   git push origin feature/your-feature-name
   ```
5. Pull Request(PR)를 생성하고 코드 리뷰를 요청합니다.

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.

## 💡 문의 및 피드백
프로젝트 관련 문의나 제안 사항이 있다면 Issues 또는 Discussions를 통해 알려주세요!

## 🌟 향후 개선 사항
- 다크 모드 지원
- 모바일 최적화 UI 개선
- AI 기반 종목 추천 및 투자 전략 분석 추가
- 음성 명령 지원 (Google Gemini API 음성 인식 활용 가능)
