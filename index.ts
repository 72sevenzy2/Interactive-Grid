const grid = document.querySelector('.grid') as HTMLDivElement;
const client = document.getElementById("client") as HTMLDivElement;

// === Build Grid ===
const squareSize = 25; // must match CSS
const cols = Math.ceil(window.innerWidth / squareSize);
const rows = Math.ceil(window.innerHeight / squareSize);
const total = cols * rows;

for (let i = 0; i < total; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll<HTMLDivElement>('.square'));

let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
const speed = 0.3;
const radius = 90;

grid.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;

  client.style.left = `${pos.x - client.offsetWidth / 2}px`;
  client.style.top = `${pos.y - client.offsetHeight / 2}px`;
  
  squares.forEach((square) => {
    const rect = square.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = pos.x - cx;
    const dy = pos.y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      // closer = brighter
      const intensity = 1 - distance / radius;
      square.style.width = "2vw";
      square.style.height = "4vh";
      square.style.borderRadius = `20%`;
      square.style.background = `rgba(0, 0, 0, ${0.20 + intensity * 0.7})`;
    } else {
      square.style.background = "";
      square.style.width = "";
      square.style.height = "";
    }
  });

  requestAnimationFrame(animate);
}

animate();
