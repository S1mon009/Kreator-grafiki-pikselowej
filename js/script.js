"use strict";

const pixelsBox = document.querySelector(".pixels");
const colorPicker = document.querySelector(".color-picker");
const btnClear = document.querySelector(".clear");
const activeToolBox = document.querySelector(".active-tool");
const listOfTools = document.querySelector(".list-of-tools");
const listOfToolsItems = document.querySelectorAll(".tool");
const paletColors = document.querySelector(".palet-colors");
const btnDownload = document.querySelector(".btn-download");

let pixels;
let tools = ["Pędzel", "Gumka"];
let activeTool = tools[0];
let activeColor = colorPicker.value;
let down = false;

function displayPixels() {
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 18; j++) {
      pixelsBox.insertAdjacentHTML("afterbegin", `<span class="pixel"></span>`);
    }
  }
  pixels = document.querySelectorAll(".pixel");
}
function displayColor(color) {
  paletColors.insertAdjacentHTML(
    "afterbegin",
    `<span class="color" data-color="${color}" style="background: ${color};"></span>`
  );
}

colorPicker.addEventListener("change", function () {
  activeColor = colorPicker.value;
  displayColor(colorPicker.value);
});

btnClear.addEventListener("click", function () {
  pixels.forEach((element) => {
    element.style.background = "#d9d9d9";
  });
});

activeToolBox.addEventListener("click", function () {
  listOfTools.classList.remove("none");
});

listOfToolsItems.forEach((element, index) => {
  element.addEventListener("click", function () {
    element.innerHTML = `${tools[index]} <i class="fa-solid fa-check"></i>`;
    listOfToolsItems[index === 0 ? 1 : 0].innerHTML =
      index === 0 ? `Gumka` : `Pędzel`;
    activeToolBox.innerHTML = `${tools[index]} <i class="fa-solid fa-check"></i>`;
    activeTool = tools[index];
    listOfTools.classList.add("none");
  });
});

paletColors.addEventListener("click", function (event) {
  if (event.target.classList.contains("color")) {
    activeColor = event.target.dataset.color;
    colorPicker.value = event.target.dataset.color;
  }
});

btnDownload.addEventListener("click", async function () {
  html2canvas(pixelsBox).then((canvas) => {
    let a = document.createElement("a");
    a.download = "art.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
});

pixelsBox.addEventListener("mousedown", function () {
  down = true;

  pixelsBox.addEventListener("mouseup", function () {
    down = false;
  });

  pixelsBox.addEventListener("mouseleave", function () {
    down = false;
  });

  pixelsBox.addEventListener("mouseover", function (event) {
    if (down && event.target.classList.contains("pixel")) {
      event.target.style.background =
        activeTool === "Pędzel" ? activeColor : "#d9d9d9";
    }
  });
  pixelsBox.addEventListener("mousedown", function (event) {
    if (event.target.classList.contains("pixel")) {
      event.target.style.background =
        activeTool === "Pędzel" ? activeColor : "#d9d9d9";
    }
  });
});

displayPixels();
