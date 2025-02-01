document.addEventListener("DOMContentLoaded", function () {
  console.log("InvestAI 스크립트 로드 완료");

  // 네비게이션 클릭 시 해당 섹션으로 스크롤 이동
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // 가짜 뉴스 데이터 로드
  const newsContainer = document.getElementById("news-container");
  const dummyNews = [
    "삼성전자, AI 반도체 시장 진출 가속화",
    "미국 연준, 금리 인상 여부 결정 예정",
    "나스닥 2% 상승, 기술주 강세",
    "코스피 3000 돌파… 외국인 매수세 확대",
  ];

  newsContainer.innerHTML = dummyNews
    .map((news) => `<p>📢 ${news}</p>`)
    .join("");

  // 차트 더미 데이터 표시
  const chartCanvas = document.getElementById("chart");
  chartCanvas.innerHTML = "📊 차트 데이터 준비 중...";
});
