const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopupBtn");
const yesBanner = document.getElementById("yesBanner");
const countdownEl = document.getElementById("countdown");

let noIsLoose = false;

function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}

function moveNoButton(){
  if (!noBtn) return;

  const pad = 12;
  const w = noBtn.offsetWidth || 120;
  const h = noBtn.offsetHeight || 46;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const maxX = vw - w - pad;
  const maxY = vh - h - pad;

  const x = Math.random() * maxX + pad;
  const y = Math.random() * maxY + pad;

  noBtn.style.position = "fixed";
  noBtn.style.left = clamp(x, pad, maxX) + "px";
  noBtn.style.top = clamp(y, pad, maxY) + "px";
  noBtn.style.zIndex = "1200";
}

function openPopup(){
  if (!popup) return;
  popup.classList.add("show");
  popup.setAttribute("aria-hidden", "false");
}

function closePopup(){
  if (!popup) return;
  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");
}

function startCountdown(){
  if (!countdownEl) return;

  const target = new Date("2026-06-04T00:00:00");

  const tick = () => {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff < 0) diff = 0;

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;

    countdownEl.textContent =
      `${days} dagen, ${hours} uur, ${mins} min, ${secs} sec`;
  };

  tick();
  setInterval(tick, 1000);
}

// NO knop moet weg springen op hover en op click en op touch
if (noBtn) {
  const trigger = () => {
    noIsLoose = true;
    moveNoButton();
  };

  noBtn.addEventListener("mouseenter", trigger);
  noBtn.addEventListener("mousedown", trigger);
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trigger();
  });
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    trigger();
  }, { passive: false });
}

// Als scherm resized, en No al los is, zet hem opnieuw binnen scherm
window.addEventListener("resize", () => {
  if (noIsLoose) moveNoButton();
});

// YES
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    if (yesBanner) yesBanner.classList.add("show");
    openPopup();
    startCountdown();
  });
}

// Popup sluiten
if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);

// Klik buiten box sluit popup
if (popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
}
