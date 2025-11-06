var area = document.getElementById("area");

var customize = document.getElementById("customize");
    var model = document.getElementById("model");
    var hue = document.getElementById("hue");
    var sat = document.getElementById("sat");
    var bri = document.getElementById("bri");
    var createBtn = document.getElementById("create");

function create(moving = true) {
    let seal = document.createElement("img");
    let file = "gif"
    if (moving == true) {
        file = "png";
        seal.style.width = "214px";
    }
    seal.src = "assets/seal." + file;
    seal.style.filter = model.style.filter;
    area.appendChild(seal);
}
createBtn.onclick = create;

function design() {
    model.style.filter = "hue-rotate(" + hue.value + "deg) grayscale(" + -sat.value + "%) brightness(" + bri.value + "%)";
}
hue.oninput = design;
sat.oninput = design;
bri.oninput = design;