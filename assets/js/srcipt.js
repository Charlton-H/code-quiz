var timerEl = document.getElementById("countdown");
var formEl = document.getElementById("form");
var welcomeEl = document.getElementById("welcome");
var mainEl = document.getElementById("main");
var buttonEl = document.getElementById("btn");
buttonEl.addEventListener("click", countdown);
formEl.addEventListener("click", questionEventHandler);

$("#scores").click(function () {
  startScreenScores();
});

var questionIndex = 0;
var timeLeft = 60;
var isComplete = false;
var highScores = [];
var playerName = "";

// array of questions
var questionsArr = [
  {
    question: "Which is not valid data type in Javascript?",
    answers: ["Undefinded", "Boolean", "float", "Number"],
    correctAnswer: 2,
  },
  {
    question: "Which type of language is Javascript?",
    answers: ["Programming", "Scripting", "Markup", "None of the above"],
    correctAnswer: 1,
  },
  {
    question: "By which javascript code is used?",
    answers: ["Classes", "Methods/Functions", "RMI", "Events"],
    correctAnswer: 1,
  },
  {
    question: "Which tag is used to write the javascript code?",
    answers: ["<script>", "<sp>", "<head>", "<javascript>"],
    correctAnswer: 0,
  },
  {
    question: "Why so JavaScript and Java have similar name?",
    answers: [
      "They both originated on the island of Java",
      "JavaScript's syntax is loosely based on Java's",
      "Both A and B",
      "None of the above",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following function of Array object removes the last element from an array and returns that element?",
    answers: ["push()", "delete()", "pop()", "link()"],
    correctAnswer: 2,
  },
];

// countdown timer function
function countdown() {
  // start timer
  var timerCountdown = setInterval(function () {
    if (timeLeft > 0 && !isComplete) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 0 || isComplete) {
      timerEl.textContent = "Time: " + timeLeft;
      clearInterval(timerCountdown);
      displayFinalResults();
    }
  }, 1000);

  welcomeEl.remove();
  mainEl.remove();
  buttonEl.remove();
  nextQuestion();
}

// display question one at a time
function nextQuestion() {
  formEl.innerHTML = "";

  // while loop to clear form div
  // while (formEl.firstChild) {
  //   formEl.removeChild(formEl.firstChild);
  // }

  var qId = questionIndex;
  // access to data array at appropriate index
  var qDataObj = questionsArr[qId];

  // create question element
  var questionEl = document.createElement("h2");
  questionEl.className = "question";
  questionEl.textContent = qDataObj.question;
  formEl.appendChild(questionEl);

  // create ul element
  var answersListEl = document.createElement("ul");
  answersListEl.className = "answers"; //css styling
  answersListEl.setAttribute("id", "answers"); //accessing via js manipulation

  var answers = qDataObj.answers;
  for (var i = 0; i < answers.length; i++) {
    var answerListItemEl = document.createElement("li");
    answerListItemEl.className = "answer-li";
    // set custom id to match with correct answer later
    answerListItemEl.setAttribute("data-id", i);
    answerListItemEl.setAttribute("type", "button");
    // display answer
    answerListItemEl.textContent = answers[i]; // set li to answers
    answersListEl.appendChild(answerListItemEl);
  }

  // create answer list item elements

  formEl.appendChild(answersListEl);

  questionIndex++;
}

// question event handler
function questionEventHandler(event) {
  var isAnswer = event.target.matches(".answer-li");

  if (isAnswer) {
    var selectAnswerEl = event.target;
    console.log(selectAnswerEl.dataset.id);
    console.log(questionsArr[questionIndex].correctAnswer);
    var isCorrect =
      questionsArr[questionIndex].correctAnswer ===
      parseInt(selectAnswerEl.dataset.id);

    if (!isCorrect) {
      timeLeft -= 10;
    }

    if (questionIndex < questionsArr.length - 1) {
      nextQuestion();
    } else {
      displayFinalResults();
    }
  }
}

// display result
function displayFinalResults() {
  isComplete = true;

  formEl.innerHTML = "";
  var finalResultsHeader = document.createElement("h2");
  finalResultsHeader.className = "final-header";
  finalResultsHeader.setAttribute("id", "final-header");
  finalResultsHeader.textContent = "Here's your score!";
  formEl.appendChild(finalResultsHeader);

  var finalResultsText = document.createElement("p");
  finalResultsText.className = "final-text";
  finalResultsText.setAttribute("id", "final-text");
  finalResultsText.textContent = "Your final score is " + timeLeft;
  formEl.appendChild(finalResultsText);

  var playerNameFormEl = document.createElement("input");
  playerNameFormEl.setAttribute("id", "name-input");
  playerNameFormEl.setAttribute("type", "text");
  playerNameFormEl.setAttribute(
    "placeholder",
    "Enter your name or initials here"
  );
  formEl.appendChild(playerNameFormEl);

  var submitElBtn = document.createElement("button");
  submitElBtn.setAttribute("id", "submit-btn");
  submitElBtn.className = "submit-btn";
  submitElBtn.textContent = "Submit";
  formEl.appendChild(submitElBtn);
  submitElBtn.addEventListener("click", saveScore);

  var highScoresListEl = document.createElement("ul");
  highScoresListEl.className = "hs-list";
  formEl.appendChild(highScoresListEl);
}

function saveScore() {
  highScores = loadScores();
  // var highScores = [];
  var playerName = document.getElementById("name-input").value;
  // console.log(playerName);

  var playerInfo = {
    player: playerName,
    highScores: timeLeft,
  };

  highScores.push(playerInfo);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  showScores();
}

function loadScores() {
  return JSON.parse(localStorage.getItem("highScores")) || [];

  // for(var i = 0 ; i < highScoresTemp.length; i++){
  //   temp.push(highScoresTemp[i])
  // }
}

function showScores() {
  var list = document.querySelector(".hs-list");

  for (var i = 0; i < highScores.length; i++) {
    var highScoresListItemEl = document.createElement("li");
    highScoresListItemEl.className = "hs-item";
    highScoresListItemEl.textContent =
      "Player Name: " +
      highScores[i].player +
      ", Score: " +
      highScores[i].highScores;
    list.appendChild(highScoresListItemEl);
  }

  var submitElBtn = document.querySelector("#submit-btn");
  submitElBtn.removeEventListener("click", saveScore);
  submitElBtn.textContent = "Restart Quiz";
  submitElBtn.className = "reset-btn";
  submitElBtn.addEventListener("click", playAgain);
}

function startScreenScores() {
  var list = document.getElementsByClassName("hs-list")[0]; // returns HTML collection

  if (list) {
    list.remove();
  } else {
    var highScoresList = document.createElement("ul");
    highScoresList.className = "hs-list";
    formEl.appendChild(highScoresList);

    var loadedScores = loadScores();

    for (var i = 0; i < loadedScores.length; i++) {
      var highScoresListItemEl = document.createElement("li");
      highScoresListItemEl.className = "hs-item";
      highScoresListItemEl.textContent =
        "Player Name: " +
        loadedScores[i].player +
        ", Score: " +
        loadedScores[i].highScores;
      highScoresList.appendChild(highScoresListItemEl);
    }
  }
}

function playAgain() {
  location.reload();
}
