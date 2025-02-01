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

  // 가짜 뉴스 데이터
  const newsContainer = document.getElementById("news-container");
  const dummyNews = [
    "삼성전자, AI 반도체 시장 진출 가속화",
    "미국 연준, 금리 인상 여부 결정 예정",
    "나스닥 2% 상승, 기술주 강세",
    "코스피 2600 돌파… 외국인 매수세 확대",
  ];

  newsContainer.innerHTML = dummyNews
    .map((news) => `<p>📢 ${news}</p>`)
    .join("");

  // 차트 더미 데이터 표시
  const chartCanvas = document.getElementById("chart");
  chartCanvas.innerHTML = "📊 차트 데이터 준비 중...";
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".clickable-section");
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlay-text");
  const closeBtn = document.querySelector(".close-btn");

  sections.forEach((section) => {
    section.addEventListener("click", function () {
      const sectionTitle = this.querySelector("h2").textContent;
      const sectionContent = this.querySelector("p")
        ? this.querySelector("p").textContent
        : "상세 정보 없음";

      overlayText.innerHTML = `<h2>${sectionTitle}</h2><p>${sectionContent}</p>`;
      overlay.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".clickable-section");
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlay-text");
  const closeBtn = document.querySelector(".close-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // 섹션 클릭 이벤트
  sections.forEach((section) => {
    section.addEventListener("click", function () {
      const sectionTitle = this.querySelector("h2").textContent;
      const sectionContent = this.querySelector("p")
        ? this.querySelector("p").textContent
        : "상세 정보 없음";

      overlayText.innerHTML = `<h2>${sectionTitle}</h2><p>${sectionContent}</p>`;
      overlay.classList.add("active");
    });
  });

  // 오버레이 닫기 이벤트
  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  // 다크 모드 토글
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    themeToggle.textContent = body.classList.contains("dark-mode")
      ? "☀️ 라이트 모드"
      : "🌙 다크 모드";
  });

  // 주식 검색 기능
  window.searchStock = function () {
    const stockName = document.getElementById("stock-search").value.trim();
    if (!stockName) {
      alert("종목명을 입력하세요!");
      return;
    }

    // 가상의 검색 결과 표시
    document.getElementById("stock-result").innerHTML = `
            <p>🔎 검색 결과: <strong>${stockName.toUpperCase()}</strong></p>
            <p>📈 현재 가격: ${Math.floor(Math.random() * 100000)}원</p>
            <p>📊 변동률: ${(Math.random() * 5).toFixed(2)}%</p>
        `;
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".clickable-section");
  const overlay = document.getElementById("overlay");
  const overlayText = document.getElementById("overlay-text");
  const closeBtn = document.querySelector(".close-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // 섹션 클릭 이벤트
  sections.forEach((section) => {
    section.addEventListener("click", function () {
      const sectionTitle = this.querySelector("h2").textContent;
      const sectionContent = this.querySelector("p")
        ? this.querySelector("p").textContent
        : "상세 정보 없음";

      overlayText.innerHTML = `<h2>${sectionTitle}</h2><p>${sectionContent}</p>`;
      overlay.classList.add("active");
    });
  });

  // 오버레이 닫기 이벤트
  closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  // 다크 모드 토글
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    themeToggle.textContent = body.classList.contains("dark-mode")
      ? "☀️ 라이트 모드"
      : "🌙 다크 모드";
  });

  // 주식 검색 기능
  window.searchStock = function () {
    const stockName = document.getElementById("stock-search").value.trim();
    if (!stockName) {
      alert("종목명을 입력하세요!");
      return;
    }

    // 가상의 검색 결과 표시
    document.getElementById("stock-result").innerHTML = `
            <p>🔎 검색 결과: <strong>${stockName.toUpperCase()}</strong></p>
            <p>📈 현재 가격: ${Math.floor(Math.random() * 100000)}원</p>
            <p>📊 변동률: ${(Math.random() * 5).toFixed(2)}%</p>
        `;
  };
});
