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

/* =========================================================
   COOKIE CONSENT - CREATOR GENERATION
   Gestione separata Analytics (GA4) e Marketing (Meta Pixel)
========================================================= */

(function () {

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const close = document.getElementById("cookieClose");

  if (!banner || !accept || !reject || !close) {
    return;
  }

  const STORAGE_KEY = "cg_cookie_preferences";


  /* =========================================================
     MOSTRA / NASCONDE BANNER
  ========================================================== */

  function showBanner() {
    banner.classList.add("is-visible");
  }

  function hideBanner() {
    banner.classList.remove("is-visible");
  }


  /* =========================================================
     ATTIVA ANALYTICS
  ========================================================== */

  function enableAnalytics() {

    if (
      typeof window.loadCreatorGenerationGA4 === "function"
    ) {
      window.loadCreatorGenerationGA4();
    }

  }


  /* =========================================================
     ATTIVA MARKETING
  ========================================================== */

  function enableMarketing() {

    if (
      typeof window.loadCreatorGenerationMetaPixel === "function"
    ) {
      window.loadCreatorGenerationMetaPixel();
    }

  }


  /* =========================================================
     SALVA LE PREFERENZE
  ========================================================== */

  function savePreferences(analytics, marketing) {

    const preferences = {
      necessary: true,
      analytics: analytics,
      marketing: marketing,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    );

  }


  /* =========================================================
     ACCETTA TUTTO
  ========================================================== */

  function acceptAll() {

    savePreferences(true, true);

    hideBanner();

    enableAnalytics();
    enableMarketing();

  }


  /* =========================================================
     RIFIUTA TUTTO
  ========================================================== */

  function rejectAll() {

    savePreferences(false, false);

    hideBanner();

  }


  /* =========================================================
     EVENTI
  ========================================================== */

  accept.addEventListener(
    "click",
    acceptAll
  );

  reject.addEventListener(
    "click",
    rejectAll
  );

  close.addEventListener(
    "click",
    rejectAll
  );


  /* =========================================================
     LEGGE LE PREFERENZE SALVATE
  ========================================================== */

  let preferences = null;

  try {

    preferences = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

  } catch (error) {

    preferences = null;

  }


  if (!preferences) {

    showBanner();

  } else {

    if (preferences.analytics === true) {
      enableAnalytics();
    }

    if (preferences.marketing === true) {
      enableMarketing();
    }

  }


  /* =========================================================
     RIAPRE LE PREFERENZE COOKIE
  ========================================================== */

  window.openCookiePreferences = function () {

    showBanner();

  };

})();
