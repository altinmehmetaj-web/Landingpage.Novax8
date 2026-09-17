document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Progress bar
  const bar = document.getElementById("progressBar");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  // Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // VSL placeholder: disappears when a real video can play.
  const video = document.getElementById("vslVideo");
  const placeholder = document.getElementById("videoPlaceholder");
  if (video && placeholder) {
    const hidePlaceholder = () => placeholder.style.display = "none";
    video.addEventListener("loadeddata", hidePlaceholder);
    video.addEventListener("play", hidePlaceholder);

    // If the video file is not present, keep the premium placeholder visible.
    video.addEventListener("error", () => {
      placeholder.style.display = "flex";
    });
  }

  // Application form
  const form = document.getElementById("applicationForm");
  const message = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = data.get("name") || "";

      // If an external application URL is configured, send the visitor there.
      if (LANDING_CONFIG.applicationUrl) {
        window.location.href = LANDING_CONFIG.applicationUrl;
        return;
      }

      // Temporary front-end confirmation until the real form/CRM endpoint is connected.
      message.hidden = false;
      message.innerHTML = `<strong>Perfetto${name ? ", " + name : ""}.</strong><br>
      Il modulo è pronto. Per ricevere realmente le candidature, collega ora questo form
      a WhatsApp, CRM, email o a un modulo esterno nella configurazione.`;
      form.reset();
    });
  }
});
