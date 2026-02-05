const startBtn = document.getElementById("startBtn");
const fxLayer = document.getElementById("fx-layer");

if (!startBtn) {
  console.error("startBtn niet gevonden. Check id='startBtn' in index.html");
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnHeart() {
  const h = document.createElement("div");
  h.className = "fx-heart";
  h.style.left = rand(0, 100) + "vw";
  h.style.animationDuration = rand(2.2, 4.2) + "s";
  h.style.transform = `rotate(45deg) scale(${rand(0.7, 1.25)})`;
  fxLayer.appendChild(h);
  setTimeout(() => h.remove(), 4500);
}

function spawnChar(src, cls) {
  const img = document.createElement("img");
  img.className = cls;
  img.src = src;
  img.alt = "";
  img.style.left = rand(0, 92) + "vw";
  img.style.top = rand(0, 85) + "vh";
  img.style.transform = `rotate(${rand(-12, 12)}deg)`;
  fxLayer.appendChild(img);
  setTimeout(() => img.remove(), 4500);
}

let timer = null;
let heartTimer = null;

function startFx() {
  document.body.classList.add("started");

  // hartjes regen
  heartTimer = setInterval(() => {
    for (let i = 0; i < 3; i++) spawnHeart();
  }, 120);

  // angel en stitch verspreiden
  for (let i = 0; i < 10; i++) {
    setTimeout(() => spawnChar("assets/angel.png", "fx-char fx-angel"), i * 140);
    setTimeout(() => spawnChar("assets/stitch.png", "fx-char fx-stitch"), i * 140 + 70);
  }

  // na een paar sec naar volgende pagina
  timer = setTimeout(() => {
    clearInterval(heartTimer);
    window.location.href = "collage.html";
  }, 4200);
}

startBtn?.addEventListener("click", startFx);
