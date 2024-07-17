const DEFAULT_SIZE = 20;
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
colorInput.addEventListener("blur", setCurrentColor);
borderBtn.addEventListener("click", setBorder);
eraserBtn.addEventListener("click", toggleEraserButton);
rainbowBtn.addEventListener("click", toggleRainbowButton);
clearBtn.addEventListener("click", clearGrid);

// Event listener for drawing management
container.addEventListener("mousedown", startDrawing);
container.addEventListener("mousemove", draw);
container.addEventListener("mouseup", stopDrawing);
// Stop drawing if the mouse is released outside the container
document.body.addEventListener("mouseup", () => (isDrawing = false));

function createCell() {
  const cell = document.createElement("div");
  cell.setAttribute("class", "cell");

  // Create cell without border if borderBtn is active
  if (isButtonActive(borderBtn)) {
    cell.classList.add("border");
  }
  return cell;
}

// Create the grid with the specified size
function createGrid() {
  container.innerHTML = ""; // Clear the container before creating the grid

  container.style.setProperty("--grid-size", currentSize);

  for (let i = 0; i < currentSize * currentSize; i++) {
    const cell = createCell();
    container.appendChild(cell);
  }
}

// Clear the grid by recreating it
function clearGrid() {
  createGrid();
}

function draw(event) {
  if (!isDrawing) return;

  const cell = event.target.closest(".cell");

  if (cell) {
    cell.style.backgroundColor = getDrawingColors(); // Get the colors based on the current settings
  }
}

function startDrawing(event) {
  isDrawing = true;
  draw(event);
}

function stopDrawing(event) {
  isDrawing = false;
  draw(event);
}

// Update the grid size and recreate the grid
function setGridSize() {
  currentSize = Number(sizeValue.value);
  createGrid();
}

// Update the size value displayed
function setGridSizeValue(value) {
  sizeValue.value = value;
}

function setCurrentColor(event) {
  currentColor = event.target.value;
}

// Toggle border visibility on all cells
function setBorder() {
  container.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.toggle("border");
  });
  toggleBorderButton();
}

// The erase button have priority over other buttons and input
function getDrawingColors() {
  if (isButtonActive(eraserBtn)) {
    return "#FFFFFF"; // Eraser
  } else if (isButtonActive(rainbowBtn)) {
    return rainbowEffect();
  } else {
    return currentColor;
  }
}

// Generate a random RGB color
function rainbowEffect() {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function toggleEraserButton() {
  toggleButton(eraserBtn);
}

function toggleBorderButton() {
  toggleButton(borderBtn);
}

function toggleRainbowButton() {
  toggleButton(rainbowBtn);
}

function toggleButton(button) {
  button.classList.toggle("active");
}

function isButtonActive(button) {
  return button.classList.contains("active");
}
