const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = "#000000";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;

// Element references
const container = document.querySelector(".grid-container");
const sizeValue = document.querySelector(".size-value");
const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const borderButton = document.querySelector(".toggle-border");
const clearButton = document.querySelector(".clear-button");
const eraserButton = document.querySelector(".eraser");

// Create a single cell
function createCell(size) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute(
    "style",
    `width: ${size}; height: ${size}; border: 1px solid black`
  );
  return cell;
}

// Create the grid with the current size
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

// Color a square when clicked
function colorSquare(event) {
  const square = event.target.closest("div.cell");
  if (isDrawing && square) {
    square.style.backgroundColor = currentColor;
  }
}

// Set the current color from the color input
function setCurrentColor(event) {
  currentColor = event.target.value;
}

// Toggle between eraser and current color
function setEraseColor() {
  if (currentColor === colorInput.value) {
    currentColor = "#FFFFFF";
    eraserButton.style.backgroundColor = "blue";
  } else {
    currentColor = colorInput.value;
    eraserButton.style.backgroundColor = "white";
  }
}

// Update the size value displayed
function updateSizeValue(value) {
  sizeValue.value = value;
}

// Clear the grid by creating a new one
function clearGrid() {
  createGrid();
}

// Toggle the border of grid cells
function toggleBorder() {
  container.childNodes.forEach((node) => {
    node.style.border =
      node.style.border === "1px solid black" ? "none" : "1px solid black";
  });
}

// Event listeners

// Initialize the grid when the document is loaded
document.addEventListener("DOMContentLoaded", createGrid);

sizeInput.addEventListener("change", setGridSize);
eraserButton.addEventListener("click", setEraseColor);
clearButton.addEventListener("click", clearGrid);
colorInput.addEventListener("blur", setCurrentColor);
borderButton.addEventListener("click", toggleBorder);

// Event listeners to handle drawing when mouse is clicked and stop drawing when released
container.addEventListener("mousedown", (event) => {
  isDrawing = true;
  colorSquare(event);
});
container.addEventListener("mousemove", colorSquare);
container.addEventListener("mouseup", (event) => {
  isDrawing = false;
  colorSquare(event);
});
document.body.addEventListener("mousedown", () => (isDrawing = true));
document.body.addEventListener("mouseup", () => (isDrawing = false));
