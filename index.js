// #TODO: Aggiungere funzione shader, toggleShader e conversione RGB to RGBA per valore shader

// #TODO: Se shader attivo, disattivare rainbow e viceversa

// #TODO: Aggiungere button shader, titolo e miglioramento struttura a HTML

// #TODO: Aggiungere foglio di stile per il design finale

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let isDrawing = false;

/*
 *    Components
 */

const container = document.querySelector(".grid-container");
const sizeValue = document.querySelector(".size-value");
const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const borderBtn = document.querySelector(".toggle-border");
const rainbowBtn = document.querySelector(".rainbow");
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");

/*
 *    Event listeners
 */

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

/*
 *    Grid creations
 */

function createCell(size) {
  const cell = document.createElement("div");
  cell.setAttribute("class", "cell");
  cell.style.width = size;
  cell.style.height = size;

  // Create cell without border if borderBtn is active
  if (!isButtonActive(borderBtn)) {
    cell.classList.add("border");
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

/*
 *    Draw functions
 */

function draw(event) {
  if (!isDrawing) return;

  const square = event.target.closest(".cell");

  if (square) {
    square.style.backgroundColor = getDrawingColors(); // Get the colors based on the current settings
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

/*
 *    Setter
 */

// Update the grid size and recreate the grid
function setGridSize() {
  currentSize = Number(sizeValue.value);
  createGrid();
}

// Update the current color only if the eraser is not active
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

// Update the size value displayed
function setGridSizeValue(value) {
  sizeValue.value = value;
}

/*
 *    Getter
 */

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

/*
 *    Effects
 */

// Generate a random RGB color
function rainbowEffect() {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

/*
 *    Clear grid
 */

// Clear the grid by recreating it
function clearGrid() {
  createGrid();
}

/*
 *    Buttons toggles
 */

function toggleEraserButton() {
  toggleButton(eraserBtn);
}

function toggleBorderButton() {
  toggleButton(borderBtn);
}

function toggleRainbowButton() {
  toggleButton(rainbowBtn);
}

/*
 *    Helper functions
 */

function toggleButton(button) {
  button.classList.toggle("active");
}

function isButtonActive(button) {
  return button.classList.contains("active");
}
