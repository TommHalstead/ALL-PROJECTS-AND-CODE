'use strict';
/*
document.querySelector(`.message`).textContent = `Correct Number! 🥳`;
document.querySelector(`.number`).textContent = Math.trunc(Math.random() * 20);
document.querySelector(`.score`).textContent = 20;

document.querySelector(`.guess`).value = 23;
console.log(document.querySelector(`.guess`).value);

document.querySelector(`.number`).textContent = Math.trunc(Math.random() * 20);
*/
let score = 20;
const randomNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;

document.querySelector(`.again`).addEventListener(`click`, function () {
  document.querySelector(`.message`).textContent = `Start guessing...`;
  document.querySelector(`.score`).textContent = score;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.guess`).value = ``;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
  // window.location.reload();
});

//FUNCTION TO DROP THE SCORE WHEN A WRONG NUMBER IS GUESSED
const scoreDrop = function () {
  score--;
  document.querySelector(`.score`).textContent = score;
  if (score === 0) {
    displayMessage(`Too many guesses, you lost. Try again! 👍`);
  }
};

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

// GAME
document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  //NO INPUT RECEIVED
  if (!guess) {
    // document.querySelector(`.message`).textContent = `🚫 No Number!`;
    displayMessage(`🚫 No Number!`);

    //WHEN PLAYER WINS
  } else if (guess === randomNumber) {
    displayMessage(`🥳 Correct Number!`);
    document.body.style.backgroundColor = `#60b347`;
    document.querySelector(`.number`).textContent = randomNumber;
    document.querySelector(`.number`).style.width = `30rem`;

    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }

    //GUESS IS WRONG
  } else if (guess !== randomNumber) {
    if (score > 1) {
      displayMessage(guess > randomNumber ? `📈 Too high!` : `📉 Too low!`);
      scoreDrop();
    } else {
      displayMessage(`💥 You lost the game!`);
      document.querySelector(`.score`).textContent = 0;
    }
  }
});
// } else if (guess < randomNumber) {
//   if (score > 1) {
//     document.querySelector(`.message`).textContent = `📉 Too low!`;
//     scoreDrop();
//   } else {
//     document.querySelector(`.message`).textContent = `💥 You lost the game!`;
//     document.querySelector(`.score`).textContent = 0;
//   }

//GUESS IS TOO HIGH
// } else if (guess > randomNumber) {
//   if (score > 1) {
//     document.querySelector(`.message`).textContent = `📈 Too high!`;
//     scoreDrop();
//   } else {
//     document.querySelector(`.message`).textContent = `💥 You lost the game!`;
//     document.querySelector(`.score`).textContent = 0;
//   }
// }
// This is a query selector that grabs the button with the class name of .check and adds an eventlistener to that element, which checks for a click, then within the parameters of the eventhandler is a function value which will describe what is to happen when that event is triggered.

// In this case, when the event is triggered, then the .value of the .guess input field is written to the console as specified within the function.
