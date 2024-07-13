const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;

const container = document.querySelector(".grid-container");
const sizeValue = document.querySelector(".size-value");
const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const borderButton = document.querySelector(".toggle-border");
const clearButton = document.querySelector(".clear-button");
const eraserButton = document.querySelector(".eraser");

document.addEventListener("DOMContentLoaded", createGrid);
sizeInput.addEventListener("change", setGridSize);
eraserButton.addEventListener("click", toggleEraser);
clearButton.addEventListener("click", clearGrid);
colorInput.addEventListener("blur", setCurrentColor);
borderButton.addEventListener("click", toggleBorder);

// Event listeners to draw when mouse is pressed and stop when released
container.addEventListener("mousedown", startDrawing);
container.addEventListener("mousemove", colorSquare);
container.addEventListener("mouseup", stopDrawing);
// stop drawing if the mouse is released outside the container
document.body.addEventListener("mouseup", () => (isDrawing = false));

function createCell(size) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = size;
  cell.style.height = size;

  // create cell without border if border button is active
  if (!isButtonActive(borderButton)) {
    cell.style.border = "1px solid black";
  }
  return cell;
}

function createGrid() {
  container.innerHTML = ""; // Clear the container before creating the grid
  const cellSize = `${100 / currentSize}%`;

  for (let i = 0; i < currentSize * currentSize; i++) {
    const cell = createCell(cellSize);
    container.appendChild(cell);
  }
}

function setGridSize() {
  currentSize = Number(sizeValue.value);
  createGrid();
}

function startDrawing(event) {
  isDrawing = true;
  colorSquare(event);
}

function stopDrawing(event) {
  isDrawing = false;
  colorSquare(event);
}

function colorSquare(event) {
  const square = event.target.closest("div.cell");
  if (isDrawing && square) {
    square.style.backgroundColor = currentColor;
  }
}

function setCurrentColor(event) {
  if (!isButtonActive(eraserButton)) {
    currentColor = event.target.value;
  }
}

function toggleEraser() {
  currentColor = isButtonActive(eraserButton) ? colorInput.value : "#FFFFFF";
  toggleButton(eraserButton);
}

function clearGrid() {
  createGrid();
}

function toggleBorder() {
  container.childNodes.forEach((node) => {
    node.style.border =
      node.style.border === "1px solid black" ? "none" : "1px solid black";
  });
  toggleButton(borderButton);
}

function isButtonActive(button) {
  return button.classList.contains("active");
}

function toggleButton(button) {
  button.classList.toggle("active");
}

// Update the range input value when changed
function updateGridSizeValue(value) {
  sizeValue.value = value;
}
