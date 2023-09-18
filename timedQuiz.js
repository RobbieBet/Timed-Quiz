//JavaScript Action: Declare most variables that I'll be using
const beginButton = document.getElementById("beginButton");
const questionContainers = document.querySelectorAll(".question-container");
const proceedButtons = document.querySelectorAll(".proceed-button");
const timerElement = document.getElementById("timer");
const highScoreElement = document.getElementById("highScore");
let currentQuestionIndex = 0;
let timeLeft = 30;
let timerInterval;
let score = 0;
// JavaScript Action: Implement the highscore to the local storage
const savedHighestScore = localStorage.getItem("highScore");
if (savedHighestScore !== null) {
  highScoreElement.textContent = `High Score: ${savedHighestScore}`;
}

//JavaScript Action: Set up a timer function
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft >= 0) {
      timerElement.textContent = `Time left: ${timeLeft} seconds`;
    } else {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

//JavaScript Action: Make a function which handles showing one question at a time
function showQuestion(index) {
  questionContainers.forEach((container, i) => {
    if (i === index) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}

//JavaScript Action: Make a function which handles the high score 
function showResults() {
  const scoreElement = document.createElement("p");
  scoreElement.textContent = `Your Score: ${score}/${questionContainers.length}`;
  document.body.appendChild(scoreElement);
  // JavaScript Action: Add a way to change the highest score and save it back to local storage
  if (score > savedHighestScore || savedHighestScore === null) {
    localStorage.setItem("highScore", score);
    highScoreElement.textContent = `High Score: ${score}`;
  }
  questionContainers.forEach((container) => (container.style.display = "none"));
  timerElement.style.display = "none";
  proceedButtons.forEach((button) => (button.style.display = "none"));
}
//JavaScript Action: Make the begin button functionable
beginButton.addEventListener("click", () => {
  beginButton.style.display = "none";
  showQuestion(currentQuestionIndex);
  startTimer();
});
//JavaScript Action: Make the proceed buttons functionable
proceedButtons.forEach((proceedButton, index) => {
  proceedButton.addEventListener("click", () => {
    const choices = document.querySelectorAll(
      `#choices${currentQuestionIndex + 1} input[type=radio]`
    );
  //JavaScript Action: Create a method regarding the answer choices
    const selectedChoice = Array.from(choices).find((choice) => choice.checked);
    if (selectedChoice) {
      if (selectedChoice.value === "correct") {
        score++;
      } else {
        
        timeLeft -= 5;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questionContainers.length) {
        showQuestion(currentQuestionIndex);
      } else {
        clearInterval(timerInterval);
        proceedButtons.forEach((button) => (button.style.display = "none"));
        showResults();
      }
    } else {
      alert("You must pick an answer before proceeding!");
    }
  });
});
