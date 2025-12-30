// ===== CANVAS & FIREWORK ENGINE =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let fireworks = [];

function Firework(x, y) {
  this.x = x;
  this.y = canvas.height;
  this.targetY = y;
  this.exploded = false;
  this.particles = [];
}

function createExplosion(x, y) {
  for (let i = 0; i < 50; i++) {
    fireworks.push({
      x,
      y,
      vx: Math.cos(Math.random() * Math.PI * 2) * Math.random() * 5,
      vy: Math.sin(Math.random() * Math.PI * 2) * Math.random() * 5,
      life: 60
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((p, i) => {
    if (p.life !== undefined) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
      ctx.fill();

      if (p.life <= 0) fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

function startFireworks() {
  setInterval(() => {
    createExplosion(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.6
    );
  }, 300);
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// ===== IST COUNTDOWN =====
const targetDate = new Date("2026-01-01T00:00:00+05:30");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("midnightText").classList.remove("hidden");

    setInterval(() => {
      fireworks.push(
        new Firework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.6
        )
      );
    }, 300);

    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  days.textContent = String(d).padStart(2, "0");
  hours.textContent = String(h).padStart(2, "0");
  minutes.textContent = String(m).padStart(2, "0");
  seconds.textContent = String(s).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
