document.addEventListener("DOMContentLoaded", () => {
  const c = window.AVYRA_CONFIG || {};
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const wa = document.querySelector("[data-whatsapp]");
  if (wa && c.whatsapp) wa.href = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent("Ciao, vorrei avere informazioni sul percorso.")}`;

  const email = document.querySelector("[data-email]");
  if (email && c.email) email.href = `mailto:${c.email}?subject=${encodeURIComponent("Richiesta informazioni")}`;

  document.querySelectorAll("[data-social]").forEach(a => {
    const key = a.dataset.social;
    if (c.social?.[key]) a.href = c.social[key];
  });

  const menu = document.querySelector(".hamburger");
  menu?.addEventListener("click", () => document.body.classList.toggle("menu-open"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, {threshold:.12});

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});