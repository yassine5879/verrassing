const photos = [
  "assets/photo1.jpeg",
  "assets/photo2.jpeg",
  "assets/photo3.jpeg", // volledige foto
  "assets/photo4.jpeg",
  "assets/photo5.jpeg",
  "assets/photo6.jpeg",
];

const spotlight = document.getElementById("spotlight");
const spotImg = document.getElementById("spotImg");
const heartsLayer = document.getElementById("hearts-layer");
const toQuizBtn = document.getElementById("toQuizBtn");

let index = 0;

function showNext() {
  if (index >= photos.length) {
    spotlight.classList.remove("show");
    startHearts();
    return;
  }

  spotImg.classList.remove("full");
  if (index === 2) spotImg.classList.add("full");

  spotImg.src = photos[index];
  spotlight.classList.add("show");

  setTimeout(() => {
    spotlight.classList.remove("show");
    index++;
    setTimeout(showNext, 400);
  }, 4000);
}

window.addEventListener("load", showNext);

/* HEARTS AFTER SLIDESHOW */
function startHearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    heartsLayer.appendChild(h);

    setTimeout(() => h.remove(), 3000);
  }, 200);
}

toQuizBtn.addEventListener("click", () => {
  window.location.href = "quiz.html";
});
