const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function randomColor() {
    const colors = ['#ff4d4d', '#ff66cc', '#ffcc00', '#66ffcc', '#66ccff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 4 + 1;
    this.color = randomColor();
    this.velocityX = (Math.random() - 0.5) * 5;
    this.velocityY = (Math.random() - 0.5) * 5;
    this.life = 100;
}

Particle.prototype.update = function () {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.life -= 2;
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

function createFirework(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
});

animate();
