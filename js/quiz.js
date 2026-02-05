const qEl = document.getElementById("q");
const optsEl = document.getElementById("opts");
const statusEl = document.getElementById("status");
const nextLink = document.getElementById("nextLink");

const quiz = [
  {
    q: "1. Wat betekent “to fall for someone” in deze zin?\nSomewhere along the way, I think I started to fall for you.",
    a: [
      ["A) Iemand letterlijk laten vallen", false],
      ["B) Geleidelijk verliefd worden", true],
      ["C) Iemand teleurstellen", false],
      ["D) Iemand volgen", false],
    ],
  },
  {
    q: "2. Welke betekenis past het best bij “cherish”?\nEvery moment with you is something I truly cherish.",
    a: [
      ["A) Vergeten", false],
      ["B) Koesteren", true],
      ["C) Plannen", false],
      ["D) Vermijden", false],
    ],
  },
  {
    q: "3. Wat betekent “to feel a connection”?",
    a: [
      ["A) Iets logisch begrijpen", false],
      ["B) Emotionele of persoonlijke band voelen", true],
      ["C) Iemand vaak zien", false],
      ["D) Samenwerken aan een taak", false],
    ],
  },
  {
    q: "4. Welke zin klinkt het meest romantisch en correct?",
    a: [
      ["A) Will you be my Valentine?", true],
      ["B) Do you want be one of my Valentines baby mommas?", false],
      ["C) You are my Valentine now.", false],
      ["D) Be Valentine with me.", false],
    ],
  },
  {
    q: "5. Wat betekent “you mean the world to me”?",
    a: [
      ["A) Je bent overal aanwezig", false],
      ["B) Je bent het belangrijkste voor mij", true],
      ["C) Je begrijpt alles", false],
      ["D) Je bent heel beroemd", false],
    ],
  },
];

let i = 0;
let locked = false;

function render() {
  locked = false;
  const item = quiz[i];

  qEl.textContent = item.q;
  optsEl.innerHTML = "";
  statusEl.textContent = `Vraag ${i + 1} van ${quiz.length}`;

  item.a.forEach(([text, ok]) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.type = "button";
    b.textContent = text;

    b.addEventListener("click", () => {
      if (locked) return;

      // reset styles
      [...optsEl.querySelectorAll(".opt")].forEach(x => x.classList.remove("bad", "good"));

      if (!ok) {
        b.classList.add("bad");
        statusEl.textContent = "Nope. Probeer opnieuw.";
        return;
      }

      b.classList.add("good");
      statusEl.textContent = "Goed!";

      locked = true;
      setTimeout(() => {
        i += 1;
        if (i >= quiz.length) {
          statusEl.textContent = "Alles goed. Volgende is open.";
          unlockNext();
          fireConfetti(1600);
          return;
        }
        render();
      }, 550);
    });

    optsEl.appendChild(b);
  });
}

function unlockNext() {
  nextLink.classList.add("enabled");
  nextLink.setAttribute("aria-disabled", "false");
}

render();

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resize);
resize();

let parts = [];
let stopAt = 0;
let anim = false;

function fireConfetti(ms) {
  anim = true;
  canvas.classList.add("show");
  stopAt = performance.now() + ms;

  const dpr = window.devicePixelRatio || 1;
  parts = [];
  for (let k = 0; k < 180; k++) {
    parts.push({
      x: Math.random() * canvas.width,
      y: -Math.random() * canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 2.1 * dpr,
      vy: (Math.random() * 3.0 + 1.4) * dpr,
      r: (Math.random() * 6 + 4) * dpr,
      a: Math.random() * Math.PI,
      va: (Math.random() - 0.5) * 0.12,
      hue: 320 + Math.random() * 60,
    });
  }
  requestAnimationFrame(tick);
}

function tick(t) {
  if (!anim) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of parts) {
    p.x += p.vx;
    p.y += p.vy;
    p.a += p.va;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.a);
    ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, .95)`;
    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
    ctx.restore();
  }

  if (t >= stopAt) {
    anim = false;
    canvas.classList.remove("show");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  requestAnimationFrame(tick);
}
