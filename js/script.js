// 載入 header
fetch("shared/header.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  })
  .then(data => {
    const header = document.getElementById("site-header");
    if (header) header.innerHTML = data;
  })
  .catch(err => console.error("Header load error:", err));

// 載入 footer
fetch("shared/footer.html")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  })
  .then(data => {
    const footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = data;
  })
  .catch(err => console.error("Footer load error:", err));

// DOM 載入後的互動功能
document.addEventListener("DOMContentLoaded", () => {
  // Accordion toggle
  const toggleBtn = document.querySelector(".accordion-toggle");
  const content = document.querySelector(".accordion-content");
  if (toggleBtn && content) {
    toggleBtn.addEventListener("click", () => {
      content.classList.toggle("open");
    });
  }

  // Quote fetch
  const quoteBtn = document.getElementById("quote-button");
  const quoteDisplay = document.getElementById("quote-display");
  if (quoteBtn && quoteDisplay) {
    quoteBtn.addEventListener("click", () => {
      fetch("assets/quotes.json")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!Array.isArray(data.quotes)) throw new Error("Invalid JSON format");
          const quotes = data.quotes;
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          quoteDisplay.textContent = `"${randomQuote}"`;
        })
        .catch((err) => {
          console.error("Quote fetch error:", err);
          quoteDisplay.textContent = "Oops! Couldn't load a quote.";
        });
    });
  }
});
/*contact*/
// 表單送出後顯示提示
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const message = document.getElementById("form-message");

  if (form && message) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // 阻止預設提交
      form.reset();       // 清空表單

      // 顯示提示訊息
      message.classList.remove("hidden");
      message.classList.add("show");

      // 幾秒後自動淡出
      setTimeout(() => {
        message.classList.remove("show");
        message.classList.add("hidden");
      }, 3000);
    });
  }
});
/*projects*/
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("projects-grid");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let allProjects = [];

  fetch("assets/projects.json")
    .then(res => res.json())
    .then(data => {
      allProjects = data.projects;
      renderProjects(allProjects);
    });

  function renderProjects(projects) {
    grid.innerHTML = "";

    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="overlay-text">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = project.image;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
      });
      grid.appendChild(card);
    });
  }

  // Modal 關閉
  if (modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // 篩選功能
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const filtered = category === "all" ? allProjects : allProjects.filter(p => p.category === category);
      renderProjects(filtered);
    });
  });
});
/*about*/
// Accordion toggle 功能
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".accordion-toggle");
  const content = document.querySelector(".accordion-content");

  if (toggleBtn && content) {
    toggleBtn.addEventListener("click", () => {
      content.classList.toggle("open");
    });
  }
});
