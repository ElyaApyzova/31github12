const cells = document.getElementsByClassName("cell");
const whoWins = document.getElementById("whoWins");
const currentPlayer = document.getElementById("currentPl");
const roundHistory = document.getElementById("roundHistory");
const sX = document.getElementById("sX");
const sO = document.getElementById("sO");
const sD = document.getElementById("sD");

// Game variables
let player = "X";
let ai = "O";
let state = {
  X: 0,
  O: 0,
  D: 0,
};

// Win combinations
const winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Add click event listeners to cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellOnClick);
}

// Cell click event handler
function cellOnClick() {
  if (!this.innerHTML) {
    this.innerHTML = player;
    currentPlayer.innerHTML = player === "X" ? "O" : "X";
    let data = getPlayerData();
    if (checkWinner(data)) {
      state[player] += 1;
      whoWins.innerHTML = `Win ${player}`;
      roundHistory.innerHTML += `Win ${player},<br>`;
      updateStatistics();
      refresh();
    } else if (isDraw()) {
      state.D += 1;
      whoWins.innerHTML = "Equal";
      roundHistory.innerHTML += `Equal, <br>`;
      updateStatistics();
      refresh();
    }
    if (!isDraw() && player === "X") {
      makeAIMove();
    }
  } else {
    alert("Cell is not empty!");
  }
}

// Get positions of player's moves
function getPlayerData() {
  let data = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === player) {
      data.push(parseInt(cells[i].getAttribute("id").split("-")[1]));
    }
  }
  return data;
}

// Check if the player has won
function checkWinner(data) {
  for (let i = 0; i < winCombination.length; i++) {
    let win = true;
    for (let j = 0; j < winCombination[i].length; j++) {
      let id = winCombination[i][j];
      if (!data.includes(id)) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

// Check if the game is a draw
function isDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

// Update the game statistics
function updateStatistics() {
  sX.innerHTML = state.X;
  sO.innerHTML = state.O;
  sD.innerHTML = state.D;
}

// Refresh the game board
function refresh() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}

// Make AI move
function makeAIMove() {
  let availableMoves = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      availableMoves.push(cells[i]);
    }
  }
  if (availableMoves.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let randomCell = availableMoves[randomIndex];
    randomCell.innerHTML = ai;
    currentPlayer.innerHTML = player;
    let data = getPlayerData();
    if (checkWinner(data)) {
      state[ai] += 1;
      whoWins.innerHTML = `Win ${ai}`;
      roundHistory.innerHTML += `Win ${ai},<br>`;
      updateStatistics();
      refresh();
    } else if (isDraw()) {
      state.D += 1;
      whoWins.innerHTML = "Equal";
      roundHistory.innerHTML += `Equal, <br>`;
      updateStatistics();
      refresh();
    } else {
      player = "X";
      ai = "O";
    }
  }
}

// Handle window resize for responsive design
window.addEventListener("resize", adjustCellSize);

// Adjust cell size for responsive design
function adjustCellSize() {
  const boardWidth = document.getElementById("board").offsetWidth;
  const cellSize = Math.floor(boardWidth / 3) - 20;
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.width = `${cellSize}px`;
    cells[i].style.height = `${cellSize}px`;
    cells[i].style.fontSize = `${Math.floor(cellSize * 0.7)}px`;
  }
}

// Initial adjustment of cell size on page load
adjustCellSize();
