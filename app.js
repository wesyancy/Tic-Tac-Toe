
// VARIABLES THAT CHANGE
let gameState = {};
let currentPlayer
let usedCells
let playerXName
let playerOName
let isOnePlayerGame
let turn


// VARIABLES THAT WON'T CHANGE
const playerX = 'x'
const playerO = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessage = document.getElementById('you-win')
const mainMenuButton = document.getElementById('mainMenuButton')
const restartButton = document.getElementById('restart')
const startButton = document.getElementById('startGame')
const onePlayerButton = document.getElementById('onePlayer')
const twoPlayerButton = document.getElementById('twoPlayer')
const winMessageText = document.querySelector('[data-win-message-text]')
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// BUTTONS 
mainMenuButton.addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('mainMenu').style.display = "flex"
  document.getElementById('playerNameStart').style.display = "none"
  document.getElementById('board').style.display = "none";
  winningMessage.style.display = 'none'
  turn = false;
  initialState()
});

restartButton.addEventListener('click', event => {
  event.preventDefault();
  winningMessage.style.display = 'none'
  turn = false;
  currentPlayer = turn ? playerO : playerX;
  initialState()
});

onePlayerButton.addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('mainMenu').style.display = "none";
  document.getElementById('playerO').style.display = "none";
  document.getElementById('playerO').value = "Computer";
  document.getElementById('playerNameStart').style.display = "flex";
  document.getElementById('enterNames').innerHTML = "Enter Player Name";
  isOnePlayerGame = true
});

twoPlayerButton.addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('mainMenu').style.display = "none"
  document.getElementById('playerNameStart').style.display = "flex"
  document.getElementById('playerO').style.display = "flex"
  document.getElementById('enterNames').innerHTML = "Enter Player Names";
  isOnePlayerGame = false
});

startButton.addEventListener('click', event => {
  event.preventDefault();
  playerXName = document.getElementById('playerX').value;
  playerOName = document.getElementById('playerO').value;
  document.getElementById('playerNameStart').style.display = "none";
  document.getElementById('board').style.display = "grid";
  initialState();
});

// GAME STATES
function initialState() {

  turn = false

  cellElements.forEach(cell => {
    cell.classList.remove(playerX)
    cell.classList.remove(playerO)
    cell.removeEventListener('click', activeState)
    cell.innerHTML = ''
    cell.addEventListener('click', activeState, { once: true })
  })

  document.getElementById('playerX').value = '';
  document.getElementById('playerO').value = '';
  winningMessage.classList.remove('show');
};

function activeState(event) {

  const clickedCell = event.target

  currentPlayer = turn ? playerO : playerX

  selection(clickedCell, currentPlayer)

  if (checkWin(currentPlayer)) {
    endGame(true);
  } else if (isDraw()) {
    endGame(false);
  } else {
    swapTurns();
  }

  if (isOnePlayerGame && turn === true) {
    AIclick();
  }
};

// ARTIFICIAL INTELLIGENCE
function AIclick() {

  let random = Math.floor(Math.random() * 8)
  let counter = 0;

  while (counter < 8 && document.getElementsByClassName('cell')[random].innerHTML) {
    counter++
    random = Math.floor(Math.random() * 8)
  }

  document.getElementsByClassName('cell')[random].click()
};

// PLAYER SELECTION FUNCTION
function selection(clickedCell, currentPlayer) {

  clickedCell.classList.add(currentPlayer)

  if (currentPlayer === 'circle') {
    let img = document.createElement('img');
    img.src = 'images/o.png';
    clickedCell.appendChild(img)
  } else {
    let imgX = document.createElement('img');
    imgX.src = 'images/x.png';
    clickedCell.appendChild(imgX)
  }
};

// CHECK FOR A WINNER
function checkWin(currentPlayer) {

  return winCombos.some(playerMoves => {

    return playerMoves.every(index => {

      return cellElements[index].classList.contains(currentPlayer)
    })
  })
};

// END THE GAME
function endGame(win) {

  if (win) {
    winMessageText.innerText = `${turn ? playerOName : playerXName}, you WIN!`
  } else {
    winMessageText.innerText = 'Draw!'
  }

  winningMessage.style.display = 'flex'
};

// CHECK FOR A DRAW
function isDraw() {

  return [...cellElements].every(cell => {

    return cell.classList.contains(playerX) || cell.classList.contains(playerO)
  })
};

// SWAP TURNS
function swapTurns() {

  turn = !turn
};