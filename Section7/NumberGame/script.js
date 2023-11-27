'use strict';

let randomNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Put query selectors that are commonly used into functions
const displayMessage = message =>
  (document.querySelector('.message').textContent = message);
const displayedNumber = number =>
  (document.querySelector('.number').textContent = number);

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  // No number input
  if (!guess) {
    displayMessage('⛔ No number');
  }
  // Correct number input
  else if (guess === randomNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    displayedNumber(randomNumber);
    if (score > highScore)
      document.querySelector('.highscore').textContent = score;
  } else if (guess !== randomNumber) {
    score--;
    if (score > 1) {
      displayMessage(guess > randomNumber ? 'Too high' : 'Too Low');
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You have lost!');
      document.querySelector('.score').textContent = score;
      document.querySelector('body').style.backgroundColor = 'red';
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('body').style.backgroundColor = '';
  document.querySelector('.number').style.width = '';
  document.querySelector('.score').textContent = score;
  displayedNumber('?');
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
});
