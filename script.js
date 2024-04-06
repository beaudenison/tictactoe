let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let players = ['', ''];

const playerTurn = document.getElementById('playerTurn');
const gameStartScreen = document.getElementById('gameStart');
const gameBoardScreen = document.getElementById('gameBoard');
const newGameButton = document.getElementById('newGame');

function startGame() {
    players[0] = document.getElementById('player1').value || 'Player 1';
    players[1] = document.getElementById('player2').value || 'Player 2';
    gameStartScreen.classList.add('hide');
    gameBoardScreen.classList.remove('hide');
    playerTurn.textContent = `${players[0]}'s Turn (X)`;
}

function makeMove(index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer === 'X' ? players[0] : players[1]);
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        announceWinner('Draw');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `${currentPlayer === 'X' ? players[0] : players[1]}'s Turn (${currentPlayer})`;
}

function announceWinner(winner) {
    playerTurn.textContent = winner === 'Draw' ? 'Draw!' : `Winner: ${winner}!`;
    newGameButton.classList.remove('hide');
}

function newGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    playerTurn.textContent = `${players[0]}'s Turn (X)`;
    newGameButton.classList.add('hide');
}

