const canvas = document.getElementById("catCanvas");
const ctx = canvas.getContext("2d");

let cat = JSON.parse(localStorage.getItem("cat")) || {
  hunger: 50,
  happiness: 50,
  energy: 50,
  clean: 50,
  alive: true
};

function updateStats() {
  ["hunger", "happiness", "energy", "clean"].forEach(k => {
    document.getElementById(k).innerText = cat[k];
  });
  drawCat();
  localStorage.setItem("cat", JSON.stringify(cat));
}

function drawCat() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = "#fff9f0";

  // Testa
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#dcb";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Orecchie
  ctx.beginPath();
  ctx.moveTo(130, 80);
  ctx.lineTo(120, 40);
  ctx.lineTo(140, 60);
  ctx.fillStyle = "#fff9f0";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(170, 80);
  ctx.lineTo(180, 40);
  ctx.lineTo(160, 60);
  ctx.fill();

  // Occhi
  const happy = cat.happiness;
  const eyeY = happy > 30 ? 120 : 130;
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(110, eyeY, 10, 0, Math.PI * 2);
  ctx.arc(190, eyeY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Bocca
  ctx.strokeStyle = "#c33";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (happy > 60) ctx.arc(150, 170, 20, 0, Math.PI, false);
  else if (happy < 30) ctx.arc(150, 185, 20, Math.PI, Math.PI * 2, false);
  else {
    ctx.moveTo(135, 175);
    ctx.lineTo(165, 175);
  }
  ctx.stroke();

  // Stato
  ctx.font = "16px Segoe UI";
  ctx.fillStyle = "#333";
  ctx.fillText(statusText(), 80, 280);
}

function statusText() {
  if (!cat.alive) return "💀 RIP";
  if (cat.hunger > 80) return "Ho fame!";
  if (cat.happiness < 30) return "Sono triste...";
  if (cat.energy < 30) return "Sono stanco...";
  if (cat.clean < 30) return "Sono sporco!";
  return "Tutto ok!";
}

function feed() {
  if (!cat.alive) return;
  cat.hunger = Math.max
