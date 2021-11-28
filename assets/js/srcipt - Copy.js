var timerEl = document.getElementById("countdown");
var formEl = document.getElementById("form");
var welcomeEl = document.getElementById("welcome");
var mainEl = document.getElementById("main");
var buttonEl = document.getElementById("btn");
buttonEl.addEventListener("click", countdown);

// array of questions
var questionsArr = [
  {
    question:
      " ______ tag is an extension to HTML that can enclose any number of JavaScript statements.",
    answers: {
      a: "<SCRIPT>",
      b: "<BODY>",
      c: "<HEAD>",
      d: "<TITLE>",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Using _______ statement is how you test for a specific condition.",
    answers: {
      a: "Select",
      b: "If",
      c: "For",
      d: "While",
    },
    correctAnswer: "b",
  },
  {
    question: "Which type of JavaScript language is ___",
    answers: {
      a: "Object-Oriented",
      b: "Object-Based",
      c: "Assembly-language",
      d: "High-level",
    },
    correctAnswer: "b",
  },
  {
    question:
      "var x=5,y=1  " +
      "var obj ={x:10}  " +
      "with(obj)  " +
      "{  " +
      "      alert(y)  " +
      "}",
    answers: {
      a: "1",
      b: "Error",
      c: "10",
      d: "5",
    },
    correctAnswer: "a",
  },
  {
    question: "The 'function' and 'var' are known as:",
    answers: {
      a: "Keywords",
      b: "Data types",
      c: "Declaration statements",
      d: "Prototypes",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following variables takes precedence over the others if the names are the same?",
    answers: {
      a: "Global variable",
      b: "The local element",
      c: "The two of the above",
      d: "None of the above",
    },
    correctAnswer: "b",
  },
];

// countdown timer function
function countdown() {
  var timeLeft = 60;

  // start timer
  var timerCountdown = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      timerEl.textContent = "Time: " + timeLeft;
      clearInterval(timerCountdown);
    }
  }, 1000);

  removeEl("welcome");
  removeEl("main");
  removeEl("btn");
  createQuizForm();
  nextQuestion();
}

// remove element object from screen and html
function removeEl(elementId) {
  var elementObj = document.getElementById(elementId);
  elementObj.remove();
}

function createQuizForm() {
  var questionEl = document.createElement("div");
  questionEl.setAttribute("id", "question");
  formEl.appendChild(questionEl);

  // var answersEl = document.createElement("div");
  // answersEl.setAttribute("id", "answers");
  // questionEl.appendChild(answersEl);

  // var buttonOneEl = document.createElement("button");
  // buttonOneEl.setAttribute("id", "answerOne");
  // answersEl.appendChild(buttonOneEl);

  // var buttonTwoEl = document.createElement("button");
  // buttonTwoEl.setAttribute("id", "answerTwo");
  // answersEl.appendChild(buttonTwoEl);

  // var buttonThreeEl = document.createElement("button");
  // buttonThreeEl.setAttribute("id", "answerThird");
  // answersEl.appendChild(buttonThreeEl);

  // var buttonFourEl = document.createElement("button");
  // buttonFourEl.setAttribute("id", "answerFour");
  // answersEl.appendChild(buttonFourEl);

  // var pagePagnationEl = document.createElement("div");
  // pagePagnationEl.setAttribute("id", "page");
  // questionEl.appendChild(pagePagnationEl);

  // var buttonNextEl = document.createElement("button");
  // buttonNextEl.setAttribute("id", "nxt-btn");
  // buttonNextEl.textContent = "Next";
  // pagePagnationEl.appendChild(buttonNextEl);

  // return createQuizForm;
}

// display question
// function displayQuiz(questionsArr) {
//   for (var i = 0; i < questionsArr.length; i += 1) {
//     function getQuestion() {
//       var questionInner = document.getElementById("question");
//       return (questionInner.innerHTML = questionsArr[i].question);
//     }
//     getQuestion();

//     function getAnswerOne() {
//       var answerOneInner = document.getElementById("answerOne");
//       return (answerOneInner.innerHTML = questionsArr[i].answers.a);
//     }
//     getAnswerOne();

//     function getAnswerTwo() {
//       var answerTwoInner = document.getElementById("answerTwo");
//       return (answerTwoInner.innerHTML = questionsArr[i].answers.b);
//     }
//     getAnswerTwo();

//     function getAnswerThree() {
//       var answerThreeInner = document.getElementById("answerThree");
//       return (answerThreeInner.innerHTML = questionsArr[i].answers.c);
//     }
//     getAnswerThree();

//     function getAnswerFour() {
//       var answerFourInner = document.getElementById("answerFour");
//       return (answerFourInner.innerHTML = questionsArr[i].answers.d);
//     }
//     getAnswerFour();
//   }
// }

var questionIndex = -1;

// display question one at a time
function nextQuestion() {
  questionEl.innerHTML = "";
  ++questionIndex;
  questionEl.write(questionsArr[questionIndex].question + "<br />");

  for (var j = 0; j < questionsArr[questionIndex].answers.length; j++) {
    document.write(
      "<input type=radio id=myRadio name=radAnswer>" +
        questionsArr[questionIndex].answers[j] +
        "<br />"
    );
  }

  if (questionIndex < questionsArr.length - 1) {
    var nextButton = document.createElement("input");
    nextButton.type = "button";
    nextButton.value = "Next question";
    nextButton.addEventListener("click", nextQuestion);
    document.body.appendChild(nextButton);
  }
}

// display result
