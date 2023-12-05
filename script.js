'use strict';

let secretNumber, score, highScore;

const displayMessage = function (selectorName, message) {
  document.querySelector(selectorName).textContent = message;
};

const toggleButtonState = function (buttonSelector, disabled, text) {
  const button = document.querySelector(buttonSelector);
  button.disabled = disabled;
  button.textContent = text;
};

const initializeGame = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayMessage('.score', score);
  displayMessage('.number', '?');
  displayMessage('.message', 'Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;
};

const updateScore = function () {
  score > 1 ? (score--, displayMessage('.score', score)) : gameOver();
};

const gameOver = function () {
  displayMessage('.score', 0);
  displayMessage('.message', 'You Lost the game');
  document.querySelector('body').style.backgroundColor = '#fd5c63';
  document.querySelector('.guess').disabled = true;
  document.querySelector('.check').disabled = true;
};

const checkEventHandler = function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess || guess <= 0 || guess > 20) {
    displayMessage('.message', 'Try Between <1-20> ');
    document.querySelector('body').style.backgroundColor = '#fd5c63';
  } else {
    displayMessage('.message', 'Checking...');
    toggleButtonState('.check', true, 'Checking...');
    document.querySelector('body').style.backgroundColor = '#222';

    setTimeout(() => {
      document.querySelector('.message').textContent = 'Start guessing...';
      toggleButtonState('.check', false, 'Check!');

      if (guess === secretNumber) {
        displayMessage('.number', secretNumber);
        displayMessage('.message', 'You are Correct');
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.guess').disabled = true;

        if (score > highScore || !highScore) {
          highScore = score;
          displayMessage('.high-score', highScore);
        }
      } else {
        guess > secretNumber
          ? displayMessage('.message', 'Try Lower', updateScore())
          : (displayMessage('.message', 'Try Higher'), updateScore());
      }
    }, 500);
  }
};

document.querySelector('.again').addEventListener('click', initializeGame);
document.querySelector('.check').addEventListener('click', checkEventHandler);

initializeGame();
