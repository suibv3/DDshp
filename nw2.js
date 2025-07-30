var obj = {};

obj.reset = function () {
    alert(document.querySelector("#name").innerHTML + " ¡PERDISTE!");
    for (let i = 0; i < robots.length; i++) {
        robots[i].style.top = "9vh";
        curr[i] = 9;
    }
    d = 60;
    l = 50;
    spaceship.style.top = d + "vh";
    spaceship.style.left = l + "vw";
    document.querySelector("#score").innerHTML = 0;
    document.querySelector("#name").innerHTML = prompt("Ingresa tu nombre:");
};

obj.checkCollision = function () {
    let a = parseInt(spaceship.style.left);
    let b = parseInt(spaceship.style.top);
    for (let i = 0; i < robots.length; i++) {
        let robotLeft = parseInt(robots[i].style.left);
        let robotTop = parseInt(robots[i].style.top);
        if (
            (robotLeft + 5 > a && a > robotLeft) ||
            (a + 5 > robotLeft && a < robotLeft) ||
            (a + 5 <= robotLeft + 5 && a >= robotLeft)
        ) {
            if (robotTop + 5 > b && b + 5 > robotTop) {
                obj.reset();
                return;
            }
        }
    }
};

obj.moveRobots = function () {
    for (let i = 0; i < robots.length; i++) {
        curr[i] += speeds[i];
        if (curr[i] >= 94) {
            curr[i] = 9;
            let k = Math.random() * 7;
            if (k < 1) k = 1;
            speeds[i] = k;
            document.querySelector("#score").innerHTML =
                parseInt(document.querySelector("#score").innerHTML) + 1;
        }
        robots[i].style.top = curr[i] + "vh";
    }
    obj.checkCollision();
};

// Movimiento del jugador
window.addEventListener("keydown", function (event) {
    let k = event.key.toLowerCase();
    if (k === 's') {
        if (d + 7 >= 100) {
            obj.reset();
            return;
        }
        d += 2;
        spaceship.style.top = d + "vh";
    } else if (k === 'w') {
        if (d <= 8) {
            obj.reset();
            return;
        }
        d -= 2;
        spaceship.style.top = d + "vh";
    } else if (k === 'd') {
        if (l + 6 >= 100) {
            obj.reset();
            return;
        }
        l += 2;
        spaceship.style.left = l + "vw";
    } else if (k === 'a') {
        if (l <= 0) {
            obj.reset();
            return;
        }
        l -= 2;
        spaceship.style.left = l + "vw";
    }
    obj.checkCollision(); // Verifica colisión después de mover la nave
});


document.querySelector("#name").innerHTML = prompt("Ingresa tu nombre:");
d = 60;
l = 50;
robots = document.querySelectorAll(".meta > div");
speeds = [];
curr = [];
for (let i = 0; i < robots.length; i++) {
    let k = (Math.random() ** 2) * 7;
    if (k < 1) k = 1;
    speeds[i] = k;
    curr[i] = 9 + speeds[i];
    robots[i].style.top = curr[i] + "vh";
}

spaceship = document.querySelector("#player");
spaceship.style.top = d + "vh";
spaceship.style.left = l + "vw";

setInterval(obj.moveRobots, 120);
