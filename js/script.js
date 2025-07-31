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

// Quote fetch 功能
document.addEventListener("DOMContentLoaded", () => {
  const quoteBtn = document.getElementById("quote-button");
  const quoteDisplay = document.getElementById("quote-display");

  if (quoteBtn && quoteDisplay) {
    quoteBtn.addEventListener("click", () => {
      fetch("assets/quotes.json")
        .then(res => res.json())
        .then(data => {
          const quotes = data.quotes;
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          quoteDisplay.textContent = `"${randomQuote}"`;
        })
        .catch(err => {
          console.error("Quote fetch error:", err);
          quoteDisplay.textContent = "Oops! Couldn't load a quote.";
        });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
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

