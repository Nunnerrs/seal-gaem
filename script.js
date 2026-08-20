var area = document.getElementById("area");

var customize = document.getElementById("customize");
    var model = document.getElementById("model");
    var hue = document.getElementById("hue");
    var bri = document.getElementById("bri");
    var sat = document.getElementById("sat");
    var randomBtn = document.getElementById("randomize");
    var createBtn = document.getElementById("create");

var sealCount = 0;
// Stores seal speed and velocity
var seals = [[]];

function toggleMenu(open) {
    if (open) {
        customize.style.cursor = "default";
        customize.style.animation = "openMenu 1s forwards";
        customize.onclick = null;
        setTimeout(function(){
            area.onclick = function(){toggleMenu(false)};;
        }, 1000);
    } else {
        customize.style.cursor = "pointer";
        customize.style.animation = "closeMenu 1s forwards";
        area.onclick = null;
        setTimeout(function(){
            customize.onclick = function(){toggleMenu(true)};;
        }, 1000);
    }
}
customize.onclick = function(){toggleMenu(true)};

function create(e, moving = true) {
    if (sealCount <= 100) {
        let seal = document.createElement("img");
        let file = "gif";
        if (moving == false) {
            file = "png";
            seal.style.width = "100px";
            //seal.style.width = "214px";
        }
        sealCount++;
        seals.push({x: window.innerWidth / 4, y: window.innerHeight / 4, vx: 5, vy: 5, moving: true}); // default is 3
        seal.classList.add("seal");
        seal.id = "seal" + sealCount;
        seal.src = "assets/seal." + file;
        seal.style.filter = model.style.filter;
        setInterval(function(){move(seal)}, 50);
        setInterval(function(){speed(seal)}, 2000);
        seal.onclick = function(){pat(seal)};
        seal.oncontextmenu = function(){reset(seal)};
        seal.oncontextmenu = function(){reset(seal)};
        area.appendChild(seal);
    } else {
        alert("too many seal!!");
    }
}
createBtn.onclick = create;

// Moves seal, bounces off walls
function move(seal) {
    // ID is formatted as "seal#"
    let id = seal.id.split("l")[1];
    let s = seals[id];
    if (s.x >= window.innerWidth) {
        s.vx = -10;
    } else if (s.x + s.vx <= 0 || s.x + seal.width + s.vx >= window.innerWidth) {
        s.vx *= -1;
    }
    if (s.y >= window.innerHeight) {
        s.vy = -10;
    } else if (s.y + s.vy <= 0 || s.y + seal.height + s.vy >= window.innerHeight) {
        s.vy *= -1;
    }
    if (s.moving == true) {
        if (s.vx < 0) {
            seal.style.transform = "scaleX(-1)";
        } else {
            seal.style.transform = "scaleX(1)";
        }
        s.x += s.vx;
        s.y += s.vy;
    }
    seal.style.left = s.x + "px";
    seal.style.top = s.y + "px";
    if (Math.round(Math.random() * 10) == 0) {
        seal.style.zIndex = Math.round(Math.random() * sealCount) - 1;
    }
}

// Randomizes speed
function speed(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.vx = Math.random() * 10 - 4;
    s.vy = Math.random() * 10 - 4;
}

function pat(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.moving = false;
    s.vx = 0;
    s.vy = 0;
    setTimeout(function(){
        s.moving = true;
    }, 1000)
}

// Fixes seal on right-click
function reset(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.x = window.innerWidth / 4;
    s.y = window.innerWidth / 4;
    s.vx = 1;
    s.vy = 1;
}

// Keyboard events
function keyboard(e) {
    switch (e.key) {
        case "Backspace":
            if (sealCount > 0) {
                let c = confirm("are you sure you want to clear all seals? :c");
                if (c == true) {
                    sealCount = 0;
                    seals = [[]];
                    area.innerHTML = "";
                }
            }
        break;
        case "r":
            random();
        break;
        case "Enter":
            create();
        break;
    }
}
document.body.onkeydown = keyboard;

// Sets display seal
function design() {
    model.style.filter = "hue-rotate(" + hue.value + "deg) grayscale(" + -sat.value + "%) brightness(" + bri.value + "%)";
}
hue.oninput = design;
bri.oninput = design;
sat.oninput = design;

// Randomizes seal design
function random() {
    hue.value = Math.round(Math.random() * 365);
    bri.value = Math.round(Math.random() * 50) + 100;
    sat.value = Math.round(Math.random() * 100) - 75;
    design();
}
randomBtn.onclick = random;