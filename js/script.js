document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll progress
  const progress = document.getElementById("progressBar");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  // Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Video placeholder: if no real VSL is available, keep the cinematic placeholder.
  const video = document.getElementById("vslVideo");
  const placeholder = document.querySelector(".video-placeholder");
  const fakePlay = document.getElementById("fakePlay");

  if (video) {
    video.addEventListener("loadeddata", () => {
      if (placeholder) placeholder.style.display = "none";
    });
    video.addEventListener("error", () => {
      if (placeholder) placeholder.style.display = "flex";
    });
  }

  if (fakePlay && video) {
    fakePlay.addEventListener("click", () => {
      if (video.readyState >= 2) {
        placeholder.style.display = "none";
        video.play().catch(() => {});
      } else {
        document.getElementById("videoShell").scrollIntoView({behavior:"smooth", block:"center"});
      }
    });
  }

  // Main CTA
  const cta = document.getElementById("mainCta");
  if (cta) {
    cta.addEventListener("click", (e) => {
      const url = (window.AVYRA_CONFIG && AVYRA_CONFIG.ctaUrl) || "#candidatura";
      if (url !== "#candidatura") {
        e.preventDefault();
        window.location.href = url;
      }
    });
  }
});
