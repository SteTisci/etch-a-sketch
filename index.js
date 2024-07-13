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

// Create a single cell
function createCell(size) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = size;
  cell.style.height = size;

  // Create cell without border if the toggle border button is active
  if (!isButtonActive(borderButton)) {
    cell.style.border = "1px solid black";
  }
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
  if (!isButtonActive(eraserButton)) {
    currentColor = event.target.value;
  }
}

// Toggle between eraser and current color
function toggleEraser() {
  if (!isButtonActive(eraserButton)) {
    currentColor = "#FFFFFF";
  } else {
    currentColor = colorInput.value;
  }
  toggleButton(eraserButton);
}

// Update the size value displayed
function updateGridSizeValue(value) {
  sizeValue.value = value;
}

function clearGrid() {
  createGrid();
}

// Toggle the border of grid cells
function toggleBorder() {
  container.childNodes.forEach((node) => {
    node.style.border =
      node.style.border === "1px solid black" ? "none" : "1px solid black";
  });
  toggleButton(borderButton);
}

// Check if a button is active or not
function isButtonActive(button) {
  return button.classList.contains("active");
}

// Activate a button by adding the class "active"
function toggleButton(button) {
  if (!isButtonActive(button)) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
}

// Event listeners

// Initialize the grid when the document is loaded
document.addEventListener("DOMContentLoaded", createGrid);

sizeInput.addEventListener("change", setGridSize);
eraserButton.addEventListener("click", toggleEraser);
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
