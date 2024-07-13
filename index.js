const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;

const container = document.querySelector(".grid-container");
const sizeValue = document.querySelector(".size-value");
const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const borderBtn = document.querySelector(".toggle-border");
const rainbowBtn = document.querySelector(".rainbow");
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");

// Create the grid when the page is fully loaded
document.addEventListener("DOMContentLoaded", createGrid);

sizeInput.addEventListener("change", setGridSize);
eraserBtn.addEventListener("click", toggleEraser);
clearBtn.addEventListener("click", clearGrid);
colorInput.addEventListener("blur", setCurrentColor);
borderBtn.addEventListener("click", toggleBorder);
rainbowBtn.addEventListener("click", toggleRainbowButton);

container.addEventListener("mousedown", startDrawing);
container.addEventListener("mousemove", colorSquare);
container.addEventListener("mouseup", stopDrawing);
// stop drawing if the mouse is released outside the container
document.body.addEventListener("mouseup", () => (isDrawing = false));

function createCell(size) {
  const cell = document.createElement("div");
  cell.setAttribute("class", "cell border");
  cell.style.width = size;
  cell.style.height = size;

  // create cell without border if border button is active
  if (isButtonActive(borderBtn)) {
    cell.classList.remove("border");
  }
  return cell;
}

// Create the grid with the specified size
function createGrid() {
  container.innerHTML = ""; // Clear the container before creating the grid
  const cellSize = `${100 / currentSize}%`;

  for (let i = 0; i < currentSize * currentSize; i++) {
    const cell = createCell(cellSize);
    container.appendChild(cell);
  }
}

// Update the grid size and recreate the grid
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

// Set the color based on the current settings
// the erase button have priority over buttons and input
function colorSquare(event) {
  const square = event.target.closest(".cell");

  if (isDrawing && square) {
    if (isButtonActive(eraserBtn)) {
      square.style.backgroundColor = "#FFFFFF"; // Eraser functionality
    } else if (isButtonActive(rainbowBtn)) {
      square.style.backgroundColor = rainbowEffect();
    } else {
      square.style.backgroundColor = currentColor;
    }
  }
}

// Update the current color only if the eraser is not active
function setCurrentColor(event) {
  if (!isButtonActive(eraserBtn)) {
    currentColor = event.target.value;
  }
}

function toggleEraser() {
  currentColor = isButtonActive(eraserBtn) ? colorInput.value : "#FFFFFF";
  toggleButton(eraserBtn);
}

// Toggle border visibility on all cells
function toggleBorder() {
  container.childNodes.forEach((node) => {
    node.classList.toggle("border");
  });
  toggleButton(borderBtn);
}

// Generate a random RGB color
function rainbowEffect() {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function toggleRainbowButton() {
  toggleButton(rainbowBtn);
}

// Clear the grid by recreating it
function clearGrid() {
  createGrid();
}

function isButtonActive(button) {
  return button.classList.contains("active");
}

function toggleButton(button) {
  button.classList.toggle("active");
}

// Update the size value displayed
function updateGridSizeValue(value) {
  sizeValue.value = value;
}
