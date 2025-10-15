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
  ctx.fillStyle = "#221";
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


function decay(){
  if(!cat.alive) return;
  cat.hunger+=5;
  cat.happiness-=3;
  cat.energy-=2;
  cat.clean-=2;
  if (cat.hunger >= 100 || cat.happiness <= 0 || cat.energy <= 0) {
  cat.alive = false;
  alert("Il gattino è morto... 🐿 Rinascerà tra 20 secondi.");
  setTimeout(() => {
    localStorage.removeItem("cat"); // ← reset del localStorage
    cat = {
      hunger: 50,
      happiness: 50,
      energy: 50,
      clean: 50,
      alive: true
    };
    updateStats();
  }, 20000); // 20 secondi
}
updateStats();
}

function feed(){cat.hunger-=20;cat.happiness+=5;cat.clean-=5;updateStats();}
function play(){cat.happiness+=15;cat.energy-=10;cat.hunger+=5;updateStats();}
function sleep(){cat.energy+=25;cat.hunger+=10;updateStats();}
function cleanCat(){cat.clean=100;cat.happiness-=5;updateStats();}

setInterval(decay,5000);
updateStats();
