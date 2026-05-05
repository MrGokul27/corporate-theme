window.addEventListener("scroll", () => {
  const navbar = document.querySelector("#mainNavbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);
});

const headingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("heading-visible");
        headingObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll("h2").forEach((h) => headingObserver.observe(h));

function startHeroSlideshow() {
  const images = ["assets/images/hero.webp", "assets/images/hero2.webp"];
  let index = 0;
  const layer = document.querySelector(".hero-bg-layer");
  if (!layer) return;
  setInterval(() => {
    index = (index + 1) % images.length;
    layer.classList.add("fade");
    setTimeout(() => {
      layer.style.backgroundImage = `url('${images[index]}')`;
      layer.classList.remove("fade");
    }, 800);
  }, 5000);
}

function startCounters() {
  document.querySelectorAll(".hero-stat span[data-target]").forEach((el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
    const isK = el.dataset.format === "k";
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      const display = isK
        ? current >= 1000
          ? (current / 1000).toFixed(current < 1000 ? 1 : 0) + "K"
          : Math.floor(current)
        : Math.floor(current);
      el.textContent = display + suffix;
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

function setActiveNavLink() {
  const current = location.pathname.split("/").pop() || "index.html";
  if (current === "404.html") return;
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === current) link.classList.add("active");
  });
}

function goHome() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.trim() === "" || href.trim() === "#") {
      e.preventDefault();
      window.location.href = "404.html";
    }
  });
});
