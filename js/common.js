const STORAGE_KEY = "valentine_progress_v1";

function getProgress(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { p2:false, p3:false, p4:false };
  }catch{
    return { p2:false, p3:false, p4:false };
  }
}
function setProgress(p){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function setNavActive(current){
  const pill = document.getElementById("statusPill");
  const p = getProgress();

  const navMap = {
    p1: document.getElementById("nav1"),
    p2: document.getElementById("nav2"),
    p3: document.getElementById("nav3"),
    p4: document.getElementById("nav4"),
  };

  // enable based on progress
  navMap.p2.disabled = !p.p2;
  navMap.p3.disabled = !p.p3;
  navMap.p4.disabled = !p.p4;

  Object.entries(navMap).forEach(([id, el]) => {
    el.classList.toggle("active", id === current);
    el.addEventListener("click", () => {
      if (el.disabled) return;
      const href = el.dataset.href;
      if (href) window.location.href = href;
    });
  });

  const locked = [!p.p2, !p.p3, !p.p4].filter(Boolean).length;
  pill.textContent = locked ? (locked + " locked") : "all open";
}

// --------------------
// Confetti (canvas)
// --------------------
let confOn = false;
let confParts = [];
let confStopAt = 0;

function confettiSetup(){
  const main = document.getElementById("main");
  const conf = document.getElementById("confetti");
  if (!main || !conf) return null;

  const ctx = conf.getContext("2d");

  function resize(){
    conf.width = main.clientWidth * devicePixelRatio;
    conf.height = main.clientHeight * devicePixelRatio;
    conf.style.width = main.clientWidth + "px";
    conf.style.height = main.clientHeight + "px";
  }
  window.addEventListener("resize", resize);
  resize();

  function fire(ms){
    resize();
    confOn = true;
    conf.classList.add("on");

    const now = performance.now();
    confStopAt = now + ms;

    confParts = [];
    const count = 160;

    for(let i=0;i<count;i++){
      confParts.push({
        x: Math.random() * conf.width,
        y: -Math.random() * conf.height * 0.4,
        vx: (Math.random() - 0.5) * 1.6 * devicePixelRatio,
        vy: (Math.random() * 2.6 + 1.4) * devicePixelRatio,
        r: Math.random() * 6 + 4,
        a: Math.random() * Math.PI,
        va: (Math.random() - 0.5) * 0.12,
        hue: Math.random() * 360,
      });
    }
    requestAnimationFrame(tick);
  }

  function tick(t){
    if (!confOn) return;
    ctx.clearRect(0,0,conf.width, conf.height);

    for(const p of confParts){
      p.x += p.vx;
      p.y += p.vy;
      p.a += p.va;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = "hsla(" + p.hue + ", 90%, 62%, .92)";
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
      ctx.restore();

      if (p.y > conf.height + 20) p.y = -20;
      if (p.x < -20) p.x = conf.width + 20;
      if (p.x > conf.width + 20) p.x = -20;
    }

    if (t > confStopAt){
      confOn = false;
      conf.classList.remove("on");
      ctx.clearRect(0,0,conf.width, conf.height);
      return;
    }
    requestAnimationFrame(tick);
  }

  return { fire };
}
