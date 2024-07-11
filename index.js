const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = "#000000";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

const container = document.querySelector(".grid-container");
const sizeValue = document.querySelector(".size-value");
const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const clearButton = document.querySelector(".clear-button");

function createGrid() {
  for (let i = 0; i < currentSize * currentSize; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute(
      "style",
      `width: ${100 / currentSize}%; height: ${100 / currentSize}%;`
    );
    container.appendChild(cell);
  }
}

function setGridSize() {
  const newSize = Number(sizeValue.value);
  currentSize = newSize;
  container.innerHTML = "";
  createGrid();
}

function colorSquare(event) {
  const square = event.target.closest("div.cell");

  if (square) {
    square.style.backgroundColor = currentColor;
  }
}

function setCurrentColor(event) {
  newColor = event.target.value;
  currentColor = newColor;
}

function updateSizeValue(value) {
  sizeValue.value = value;
}

function clearGrid() {
  container.innerHTML = "";
  createGrid();
}

sizeInput.addEventListener("change", setGridSize);
container.addEventListener("mouseover", colorSquare);
clearButton.addEventListener("click", clearGrid);
colorInput.addEventListener("input", setCurrentColor);

createGrid();
