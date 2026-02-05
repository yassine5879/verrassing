const btn = document.getElementById("startBtn");
let hoverInterval = null;
let clicked = false;

function spawnHeart(x = null, y = null) {
  const heart = document.createElement("div");
  heart.className = "heart";

  const px = x ?? Math.random() * window.innerWidth;
  const py = y ?? (window.innerHeight + 20);

  heart.style.left = `${px}px`;
  heart.style.top = `${py}px`;

  const s = 0.8 + Math.random() * 1.3;
  heart.style.transform = `rotate(45deg) scale(${s})`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2800);
}

function spawnSticker(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "sticker";

  img.style.position = "fixed";
  img.style.left = `${Math.random() * (window.innerWidth - 80)}px`;
  img.style.top = `${Math.random() * (window.innerHeight - 80)}px`;
  img.style.width = `${50 + Math.random() * 50}px`;
  img.style.height = "auto";
  img.style.zIndex = "20";
  img.style.pointerEvents = "none";
  img.style.filter = "drop-shadow(0 14px 24px rgba(0,0,0,0.45))";
  img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;

  document.body.appendChild(img);
  setTimeout(() => img.remove(), 3200);
}

btn.addEventListener("mouseenter", () => {
  if (hoverInterval) return;
  hoverInterval = setInterval(() => {
    for (let i = 0; i < 6; i++) spawnHeart();
  }, 180);
});

btn.addEventListener("mouseleave", () => {
  if (!hoverInterval) return;
  clearInterval(hoverInterval);
  hoverInterval = null;
});

btn.addEventListener("click", () => {
  if (clicked) return;
  clicked = true;

  // burst hearts
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 40; i++) {
    const ox = (Math.random() - 0.5) * 420;
    const oy = (Math.random() - 0.5) * 220;
    spawnHeart(cx + ox, cy + oy);
  }

  // sprinkle Angel + Stitch
  const angel = "assets/angel.jpg";
  const stitch = "assets/stitch.png";
  const total = 18;

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      spawnSticker(i % 2 === 0 ? angel : stitch);
    }, i * 80);
  }

  setTimeout(() => {
    window.location.href = "collage.html";
  }, 2500);
});

// extra hearts on clicks
document.addEventListener("click", (e) => {
  if (e.target === btn) return;
  for (let i = 0; i < 10; i++) {
    spawnHeart(
      e.clientX + (Math.random() - 0.5) * 120,
      e.clientY + (Math.random() - 0.5) * 120
    );
  }
});
