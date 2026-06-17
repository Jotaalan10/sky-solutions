const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const quoteOptions = document.querySelectorAll(".quote-option input");
const quoteTotal = document.getElementById("quoteTotal");
const quoteDetails = document.getElementById("quoteDetails");
const quoteWhatsapp = document.getElementById("quoteWhatsapp");
const phoneNumber = "529991234567";
const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

function getInitialTheme() {
  const savedTheme = localStorage.getItem("sky-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (themeToggle && themeLabel) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeLabel.textContent = isDark ? "Oscuro" : "Claro";
  }
}

applyTheme(getInitialTheme());

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("sky-theme", nextTheme);
  applyTheme(nextTheme);
});

function formatTotal(value) {
  return `${currency.format(value)} MXN`;
}

function updateQuote() {
  const selected = Array.from(quoteOptions)
    .filter((option) => option.checked)
    .map((option) => ({
      name: option.value,
      price: Number(option.dataset.price)
    }));

  const total = selected.reduce((sum, item) => sum + item.price, 0);
  const serviceNames = selected.map((item) => item.name);
  const message = selected.length
    ? `Hola, quiero cotizar estos servicios de Sky Solutions: ${serviceNames.join(", ")}. Total aproximado: ${formatTotal(total)}.`
    : "Hola, quiero una cotización de Sky Solutions.";

  quoteTotal.textContent = formatTotal(total);
  quoteDetails.textContent = selected.length
    ? `Seleccionaste ${selected.length} servicio${selected.length === 1 ? "" : "s"}: ${serviceNames.join(", ")}.`
    : "Selecciona uno o más servicios para calcular tu estimación.";
  quoteWhatsapp.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

quoteOptions.forEach((option) => {
  option.addEventListener("change", updateQuote);
});

if (quoteOptions.length) {
  updateQuote();
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

function animateNumber(element) {
  const target = Number(element.dataset.target || 0);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1000;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    element.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll(".stat-number").forEach((number) => {
  statsObserver.observe(number);
});
