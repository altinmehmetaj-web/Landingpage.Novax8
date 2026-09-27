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

});
