//Initial data
let currentQuestion = 0;
let correctAnswers = 0;

//Functions

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-opt"));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let correctAnswersPercent = Math.round(
    (correctAnswers / questions.length) * 100
  );
  console.log(correctAnswersPercent);
  let scoreText1 = document.querySelector(".scoreText1");
  let scoreText2 = document.querySelector(".scoreText2");
  let scorePercent = document.querySelector(".scorePct");

  if (correctAnswersPercent < 30) {
    scoreText1.innerHTML = "Tá ruim em?!";
    scorePercent.style.color = "#FF0000";
  } else if (correctAnswersPercent >= 30 && correctAnswersPercent < 70) {
    scoreText1.innerHTML = "Muito bom";
    scorePercent.style.color = "#FFFF00";
  } else if (correctAnswersPercent >= 70) {
    scoreText1.innerHTML = "Parabéns!";
    scorePercent.style.color = "#0D630D";
  }
  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = `100%`;
  scorePercent.innerHTML = `Acertou ${correctAnswersPercent}%`;
  scoreText2.innerHTML = `Você acertou ${correctAnswers} de ${questions.length} questões.`;
}

function showQuestion() {
  let q = questions[currentQuestion];
  let barPercent = Math.round((currentQuestion / questions.length) * 100);
  if (q) {
    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";
    document.querySelector(".progress--bar").style.width = `${barPercent}%`;
    document.querySelector(".question").innerHTML = q.question;
    let optionsHTML = "";
    for (let option in q.options) {
      optionsHTML += `<div data-opt="${option}" class="option"><span>${
        parseInt(option) + 1
      }</span>${q.options[option]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHTML;

    document.querySelectorAll(".options .option").forEach((option) => {
      option.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function resetEvent() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}

// Events
document
  .querySelector(".scoreArea button")
  .addEventListener("click", resetEvent);

showQuestion();
