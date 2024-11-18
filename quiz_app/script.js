import { problem } from "./problemClass.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const start = document.getElementById("start");

  let score = JSON.parse(localStorage.getItem("socre")) || 0;
  let currentIndex = JSON.parse(localStorage.getItem("index")) || 0;
  const quizQuestions = [
    new problem("What is the capital of France?", "Paris", [
      "Berlin",
      "Madrid",
      "Paris",
      "Rome",
    ]),
    new problem("Which planet is known as the Red Planet?", "Mars", [
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
    ]),
    new problem("What is the largest ocean on Earth?", "Pacific Ocean", [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ]),
    new problem("Who wrote 'Hamlet'?", "Shakespeare", [
      "Shakespeare",
      "Dickens",
      "Hemingway",
      "Austen",
    ]),
  ];

  const renderQuiz = (quizProblem) => {
    container.innerHTML = `<h1 class="font-bold text-4xl mb-4 text-white" id="title">Quiz app</h1>`;

    const questionElement = document.createElement("h2");
    questionElement.textContent = quizProblem.question;

    const quizList = document.createElement("ul");
    quizList.setAttribute("id", "problemList");

    quizProblem.choices.forEach((choice) => {
      const choiceElement = document.createElement("li");
      choiceElement.textContent = choice;
      choiceElement.classList.add("choice", "notselected");
      quizList.appendChild(choiceElement);
    });

    container.appendChild(questionElement);
    container.appendChild(quizList);

    quizList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        handleChoiceSelection(event.target, quizList, quizProblem);
      }
    });
  };

  const handleChoiceSelection = (selectedItem, quizList, quizProblem) => {
    const allChoices = quizList.querySelectorAll("li");
    allChoices.forEach((li) => {
      li.classList.remove("selected");
      li.classList.add("notselected");
    });

    selectedItem.classList.remove("notselected");
    selectedItem.classList.add("selected");

    createNextButton(selectedItem, quizProblem);
  };

  const createNextButton = (selectedItem, quizProblem) => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.remove());

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("next");
    container.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
      const selectedValue = selectedItem.textContent;

      if (selectedValue === quizProblem.answer) {
        score++;
      }

      localStorage.setItem("index", JSON.stringify(currentIndex));
      localStorage.setItem("score", JSON.stringify(score));
      currentIndex++;
      if (currentIndex < quizQuestions.length) {
        renderQuiz(quizQuestions[currentIndex]);
      } else {
        renderscore();
      }
    });
  };

  const renderscore = () => {
    container.innerHTML = `<h1 class="font-bold text-4xl mb-4 text-white" id="title">Quiz app</h1>`;

    let msg = document.createElement("h2");
    let myscore = document.createElement("h2");

    if (score == quizQuestions.length) {
      msg.textContent = "Perfect !";
      msg.classList.add("text-green-400");
    } else {
      msg.textContent = "msatak ! ";
      msg.classList.add("text-red-400");
    }
    myscore.textContent = `your scored ${score}/${quizQuestions.length}`;

    container.appendChild(msg);
    container.appendChild(myscore);

    score = 0;
    currentIndex = 0;
    localStorage.setItem("index", JSON.stringify(score));
    localStorage.setItem("score", JSON.stringify(currentIndex));
  };

  start.addEventListener("click", () => {
    container.removeChild(start);
    renderQuiz(quizQuestions[currentIndex]);
  });
});
