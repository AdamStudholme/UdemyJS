'use strict';

//Selected score elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, gameActive;

const togglePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

const init = () => {
  // Set scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  gameActive = true;
  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);
  document.querySelector(`.player--0`).classList.add('player--active');
  diceEl.classList.add('hidden'); // Add hidden class to dice
};
init();

btnRoll.addEventListener('click', () => {
  if (gameActive) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`; // Use a template literal to select the image matching the dice number
    //Add dice to current players score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //Change player
    else {
      scores[activePlayer] = 0;
      togglePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (gameActive) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      gameActive = false;
    } else {
      togglePlayer();
    }
  }
});

btnNew.addEventListener('click', init);
