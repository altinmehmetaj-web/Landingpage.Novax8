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
   Analytics (GA4) + Marketing (Meta Pixel)
========================================================= */

(function () {

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const close = document.getElementById("cookieClose");

  const customize = document.getElementById("cookieCustomize");
  const preferencesPanel =
    document.getElementById("cookiePreferencesPanel");

  const analyticsCheckbox =
    document.getElementById("cookieAnalytics");

  const marketingCheckbox =
    document.getElementById("cookieMarketing");

  const saveButton =
    document.getElementById("cookieSavePreferences");

  const STORAGE_KEY = "cg_cookie_preferences";

  if (!banner || !accept || !reject || !close) {
    return;
  }


  /* =========================================================
     MOSTRA / NASCONDE IL BANNER
  ========================================================== */

  function showBanner() {
    banner.classList.add("is-visible");
  }

  function hideBanner() {
    banner.classList.remove("is-visible");
  }


  /* =========================================================
     ATTIVA GOOGLE ANALYTICS 4
  ========================================================== */

  function enableAnalytics() {

    if (
      typeof window.loadCreatorGenerationGA4 === "function"
    ) {
      window.loadCreatorGenerationGA4();
    }

  }


  /* =========================================================
     ATTIVA META PIXEL
  ========================================================== */

  function enableMarketing() {

    if (
      typeof window.loadCreatorGenerationMetaPixel === "function"
    ) {
      window.loadCreatorGenerationMetaPixel();
    }

  }


  /* =========================================================
     SALVA PREFERENZE
  ========================================================== */

  function savePreferences(analytics, marketing) {

    const preferences = {

      necessary: true,

      analytics: Boolean(analytics),

      marketing: Boolean(marketing),

      timestamp: new Date().toISOString()

    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    );

    return preferences;

  }


  /* =========================================================
     LEGGE PREFERENZE
  ========================================================== */

 function getPreferences() {

  try {

    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const preferences = JSON.parse(stored);

    if (!preferences.timestamp) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    const consentDate =
      new Date(preferences.timestamp);

    const expiryDate =
      new Date(consentDate);

    expiryDate.setMonth(
      expiryDate.getMonth() + 6
    );

    if (new Date() >= expiryDate) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return preferences;

  } catch (error) {

    localStorage.removeItem(STORAGE_KEY);
    return null;

  }

}

  /* =========================================================
     APPLICA PREFERENZE
  ========================================================== */

  function applyPreferences(preferences) {

    if (!preferences) {
      return;
    }

    if (preferences.analytics === true) {
      enableAnalytics();
    }

    if (preferences.marketing === true) {
      enableMarketing();
    }

  }


  /* =========================================================
     ACCETTA TUTTO
  ========================================================== */

  function acceptAll() {

    const preferences =
      savePreferences(true, true);

    if (analyticsCheckbox) {
      analyticsCheckbox.checked = true;
    }

    if (marketingCheckbox) {
      marketingCheckbox.checked = true;
    }

    applyPreferences(preferences);

    hideBanner();

  }


  /* =========================================================
     RIFIUTA TUTTO
  ========================================================== */

  function rejectAll() {

    savePreferences(false, false);

    if (analyticsCheckbox) {
      analyticsCheckbox.checked = false;
    }

    if (marketingCheckbox) {
      marketingCheckbox.checked = false;
    }

    hideBanner();

  }


  /* =========================================================
     PERSONALIZZA
  ========================================================== */

  function openCustomize() {

    if (!preferencesPanel) {
      return;
    }

    const preferences = getPreferences();

    if (analyticsCheckbox) {
      analyticsCheckbox.checked =
        preferences?.analytics === true;
    }

    if (marketingCheckbox) {
      marketingCheckbox.checked =
        preferences?.marketing === true;
    }

    preferencesPanel.hidden = false;

  }


  /* =========================================================
     SALVA PERSONALIZZAZIONE
  ========================================================== */

  function saveCustomPreferences() {

    const analytics =
      analyticsCheckbox
        ? analyticsCheckbox.checked
        : false;

    const marketing =
      marketingCheckbox
        ? marketingCheckbox.checked
        : false;

    const preferences =
      savePreferences(
        analytics,
        marketing
      );

    applyPreferences(preferences);

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

  if (customize) {

    customize.addEventListener(
      "click",
      openCustomize
    );

  }

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      saveCustomPreferences
    );

  }


  /* =========================================================
     AVVIO
  ========================================================== */

  const savedPreferences =
    getPreferences();

  if (!savedPreferences) {

    showBanner();

  } else {

    applyPreferences(
      savedPreferences
    );

  }


  /* =========================================================
     RIAPRI PREFERENZE DAL FOOTER
  ========================================================== */

  window.openCookiePreferences = function () {

    const preferences =
      getPreferences();

    if (analyticsCheckbox) {
      analyticsCheckbox.checked =
        preferences?.analytics === true;
    }

    if (marketingCheckbox) {
      marketingCheckbox.checked =
        preferences?.marketing === true;
    }

    if (preferencesPanel) {
      preferencesPanel.hidden = false;
    }

    showBanner();

  };

})();
