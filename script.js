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
        seals.push({x: window.innerWidth / 2, y: window.innerHeight / 10, vx: 1, vy: 1, sx: 3, sy: 3});
        seal.classList.add("seal");
        seal.id = "seal" + sealCount;
        seal.src = "assets/seal." + file;
        seal.style.filter = model.style.filter;
        setInterval(function(){move(seal)}, 50);
        setInterval(function(){random(seal)}, 2000);
        area.appendChild(seal);
    } else {
        alert("too many seal!!")
    }
}
createBtn.onclick = create;

function move(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    if (s.x + (seal.width / 2) <= 0 || s.x + (seal.width / 2) >= window.innerWidth) {
        s.vx *= -1;
    }
    if (s.y + (seal.height / 2) <= 0 || s.y + (seal.height / 2) >= window.innerHeight) {
        s.vy *= -1;
    }
    s.vx += s.sx;
    if (s.sx < 0) {
        seal.style.transform = "scaleX(-1)";
    } else {
        seal.style.transform = "scaleX(1)";
    }
    s.vy += s.sy;
    seal.style.left = s.x + s.vx + "px";
    seal.style.top = s.y + s.vy + "px";
}

function random(seal) {
    let id = seal.id.split("l")[1];
    let s = seals[id];
    s.sx = Math.floor(Math.random() * 10) - 4;
    s.sy = Math.floor(Math.random() * 10) - 4;
}

function design() {
    model.style.filter = "hue-rotate(" + hue.value + "deg) grayscale(" + -sat.value + "%) brightness(" + bri.value + "%)";
}
hue.oninput = design;
bri.oninput = design;
sat.oninput = design;