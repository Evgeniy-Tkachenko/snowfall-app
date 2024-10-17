const canvas = document.getElementById('snow');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
let snowman = {
    x: 50,
    y: canvas.height -20,
    size: 20,
    speed: 2,
}

function drawSnowman() {

    //тело
    context.beginPath();
    context.arc(snowman.x, snowman.y, snowman.size, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();

    // голова
    context.beginPath();
    context.arc(snowman.x, snowman.y - snowman.size * 1.5, snowman.size / 1.5, 0, Math.PI * 2);
    context.fill();

    // глаза
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(snowman.x - 5, snowman.y - snowman.size * 1.5 - 5, 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(snowman.x + 5, snowman.y - snowman.size * 1.5 - 5, 2, 0, Math.PI * 2);
    context.fill();
}

function moveSnowman() {
    snowman.x += snowman.speed;

    if (snowman.x > canvas.width - snowman.size || snowman.x < snowman.size) {
        snowman.speed *= -1;
    }
}

function createSnowflakes() {
    const numFlakes = 100;
    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: Math.random() * 2 + 1
        });
    }
}

function animateSnowflakes() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((flake) => {
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }


        context.beginPath();
        context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
    });

    drawSnowman();
    moveSnowman()
    requestAnimationFrame(animateSnowflakes);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes = [];
    createSnowflakes();
});

createSnowflakes();
animateSnowflakes();
