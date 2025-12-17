var area = document.getElementById("area");

var customize = document.getElementById("customize");
    var model = document.getElementById("model");
    var hue = document.getElementById("hue");
    var bri = document.getElementById("bri");
    var sat = document.getElementById("sat");
    var createBtn = document.getElementById("create");

var sealCount = 0;
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
        seals.push({x: window.innerWidth / 4, y: window.innerHeight / 4, vx: 5, vy: 5}); // default is 3
        seal.classList.add("seal");
        seal.id = "seal" + sealCount;
        seal.src = "assets/seal." + file;
        seal.style.filter = model.style.filter;
        setInterval(function(){move(seal)}, 50);
        setInterval(function(){random(seal)}, 2000);
        seal.oncontextmenu = function(){reset(seal)};
        area.appendChild(seal);
    } else {
        alert("too many seal!!");
    }
}
createBtn.onclick = create;

function move(seal) {
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
    if (s.vx < 0) {
        seal.style.transform = "scaleX(-1)";
    } else {
        seal.style.transform = "scaleX(1)";
    }
    s.x += s.vx;
    s.y += s.vy;
    seal.style.left = s.x + "px";
    seal.style.top = s.y + "px";
}

function random(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.vx = Math.random() * 10 - 4;
    s.vy = Math.random() * 10 - 4;
}

function reset(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.x = window.innerWidth / 4;
    s.y = window.innerWidth / 4;
    s.vx = 1;
    s.vy = 1;
}

function design() {
    model.style.filter = "hue-rotate(" + hue.value + "deg) grayscale(" + -sat.value + "%) brightness(" + bri.value + "%)";
}
hue.oninput = design;
bri.oninput = design;
sat.oninput = design;