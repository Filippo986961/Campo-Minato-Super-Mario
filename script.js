/* ----------------------
FASE DI PREPARAZIONE
---------------------- */

const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameImg = document.querySelector('.end-game-img');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');
const audio = document.querySelector('audio');
const iconContainer = document.querySelector('.icon-container');

const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) bombsList.push(number);
}

console.log(bombsList);

/* ----------------------
GRIGLIA E LOGICA DI GIOCO
---------------------- */

let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;

    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

    if (i % 10 === 0) isRowEven = !isRowEven;

    cell.addEventListener('click', function () {
        if (cell.classList.contains('cell-clicked')) return;

        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            cell.classList.add('cell-clicked');
            updateScore();
        }
    });

    grid.appendChild(cell);
}

/* ----------------------
FUNZIONI
---------------------- */

// Funzione per aggiornare il punteggio
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5, 0);

    if (score === maxScore) endGame(true);
}

// Funzione per decretare la fine del gioco
function endGame(isVictory) {
    const endGameImgContainer = document.getElementById("end-game-img");

    if (isVictory) {
        endGameScreen.classList.add('win');
        yaGetBanner(endGameImgContainer, 'mario.gif');
        endGameText.innerHTML = 'YOU WIN';
        playAudio('victoryAudio');
        if (bombsList.length > 0) {
            revealAllBombs('defused.png');
        }
    } else {
        yaGetBanner(endGameImgContainer, 'bowser.gif');
        endGameText.innerHTML = 'GAME OVER';
        playAudio('defeatAudio');
        if (bombsList.length > 0) {
            revealAllBombs('bomb.png');
        }
    }

    endGameScreen.classList.remove('hidden');
}

// Funzione per ricaricare la pagina
function playAgain() {
    location.reload();
}

// Funzione per rivelare tutte le bombe
function revealAllBombs(imagePath) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1];
            if (cellToReveal && !cellToReveal.classList.contains('cell-clicked')) {
                cellToReveal.style.backgroundImage = "url('" + imagePath + "')";
                cellToReveal.classList.add('cell-bomb');
            }
        }
    }
}

// Funzione per impostare dinamicamente l'immagine nella schermata di vittoria o sconfitta
function yaGetBanner(container, imagePath) {
    container.innerHTML = "<img src='" + imagePath + "'>";
}

// Funzione per gestire l'audio
function toggleAudio() {
    if (audio.paused) {
        audio.play();
        iconContainer.innerHTML = "<span class='material-icons'>volume_up</span>";
    } else {
        audio.pause();
        iconContainer.innerHTML = "<span class='material-icons'>volume_mute</span>";
    }
}

// Funzione per cambiare l'audio
function playAudio(audioId) {
    const audioElement = document.getElementById(audioId);
    audioElement.play();
}

/* ----------------------
EVENTI
---------------------- */

playAgainButton.addEventListener('click', playAgain);

audio.addEventListener('playing', function () {
    console.log('Audio in riproduzione');
    iconContainer.innerHTML = "<span class='material-icons'>volume_up</span>";
});

audio.addEventListener('pause', function () {
    console.log('Audio in pausa');
    iconContainer.innerHTML = "<span class='material-icons'>volume_mute</span>";
});