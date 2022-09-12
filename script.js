'use strict';

// Selecting elements
const player0 = document.querySelector('.player__0');
const player1 = document.querySelector('.player__1');
const score0 = document.querySelector('#score__0');
const score1 = document.querySelector('#score__1');
const current0 = document.querySelector('#current__0');
const current1 = document.querySelector('#current__1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn__new');
const btnHold = document.querySelector('.btn__hold');
const btnRoll = document.querySelector('.btn__roll');

//Starting conditions
let scores, currentScore, activePlayer, game;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  game = true;

  diceEl.classList.add('hidden');
  player0.classList.add('player__active');
  player0.classList.remove('player__winner');
  player1.classList.remove('player__winner');
  player1.classList.remove('player__active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current__${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player__active');
  player1.classList.toggle('player__active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (game) {
    // 1. Generate random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1. if correct, switch to next player or add
    if (dice !== 1) {
      //Add to current score
      currentScore += dice;
      document.getElementById(`current__${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Holding button
btnHold.addEventListener('click', function () {
  if (game) {
    // 1. Add current score to score
    scores[activePlayer] += currentScore;
    document.getElementById(`score__${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score = 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      game = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add('player__winner');
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove('player__active');
    } else {
      //Switch players
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
