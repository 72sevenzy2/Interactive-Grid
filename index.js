var grid = document.querySelector('.grid');
var client = document.getElementById("client");
// === Build Grid ===
var squareSize = 25; // must match CSS
var cols = Math.ceil(window.innerWidth / squareSize);
var rows = Math.ceil(window.innerHeight / squareSize);
var total = cols * rows;
for (var i = 0; i < total; i++) {
    var square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}
var squares = Array.from(document.querySelectorAll('.square'));
var mouse = { x: 0, y: 0 };
var pos = { x: 0, y: 0 };
var speed = 0.3;
var radius = 90;
grid.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
function animate() {
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;
    client.style.left = "".concat(pos.x - client.offsetWidth / 2, "px");
    client.style.top = "".concat(pos.y - client.offsetHeight / 2, "px");
    squares.forEach(function (square) {
        var rect = square.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = pos.x - cx;
        var dy = pos.y - cy;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius) {
            // closer = brighter
            var intensity = 1 - distance / radius;
            square.style.width = "2vw";
            square.style.height = "4vh";
            square.style.borderRadius = "20%";
            square.style.background = "rgba(0, 0, 0, ".concat(0.15 + intensity * 0.7, ")");
        }
        else {
            square.style.background = "";
            square.style.width = "";
            square.style.height = "";
        }
    });
    requestAnimationFrame(animate);
}
animate();
