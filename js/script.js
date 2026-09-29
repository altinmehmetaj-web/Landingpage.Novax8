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
========================================================= */

(function(){

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const close = document.getElementById("cookieClose");

  /* Se il banner non esiste, non fare nulla */
  if (!banner || !accept || !reject || !close) {
    return;
  }

  const consent =
    localStorage.getItem("cg_cookie_consent");


  function showBanner(){
    banner.classList.add("is-visible");
  }


  function hideBanner(){
    banner.classList.remove("is-visible");
  }


  function enableMarketing(){

    /*
      META PIXEL verrà attivato qui
      SOLO dopo il consenso.
    */

    if (
      typeof window.loadCreatorGenerationMetaPixel === "function"
    ){
      window.loadCreatorGenerationMetaPixel();
    }

  }


  function acceptCookies(){

    localStorage.setItem(
      "cg_cookie_consent",
      "accepted"
    );

    hideBanner();
    enableMarketing();

  }


  function rejectCookies(){

    localStorage.setItem(
      "cg_cookie_consent",
      "rejected"
    );

    hideBanner();

  }


  accept.addEventListener(
    "click",
    acceptCookies
  );


  reject.addEventListener(
    "click",
    rejectCookies
  );


  close.addEventListener(
    "click",
    rejectCookies
  );


  /* CONTROLLO DEL CONSENSO */

  if (consent === "accepted") {

    enableMarketing();

  } else if (consent !== "rejected") {

    showBanner();

  }


  /* RIAPRE LE PREFERENZE COOKIE */

  window.openCookiePreferences = function(){

    showBanner();

  };

})();
