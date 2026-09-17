document.addEventListener("DOMContentLoaded", () => {
  const config = window.AVYRA_CONFIG || { contact: {}, social: {} };

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact links
  const whatsapp = document.querySelector('[data-contact="whatsapp"]');
  const email = document.querySelector('[data-contact="email"]');

  if (whatsapp && config.contact?.whatsapp) {
    whatsapp.href = `https://wa.me/${config.contact.whatsapp}`;
  }

  if (email && config.contact?.email) {
    email.href = `mailto:${config.contact.email}`;
  }

  // Social links
  document.querySelectorAll("[data-social]").forEach(link => {
    const key = link.dataset.social;
    if (config.social?.[key]) link.href = config.social[key];
  });

  // Mobile menu
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    mobileMenu.classList.toggle("is-open", !open);
    mobileMenu.setAttribute("aria-hidden", String(open));
    document.body.classList.toggle("menu-open", !open);
  });

  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuButton?.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Number counters
  const counters = document.querySelectorAll("[data-target]");
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + "+";
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Smooth anchor behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const id = anchor.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Subtle cursor glow on desktop
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      glow.style.transform = `translate(${e.clientX - 120}px, ${e.clientY - 120}px)`;
    });
  }
});
