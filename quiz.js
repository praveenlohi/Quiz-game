const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Car Speed Setting"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  }
];

let currentIndex = 0;
let score = 0;
let selected = false;
let timer;
let timeLeft = 15;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  selected = false;
  timeLeft = 15;
  startTimer();

  const current = quizData[currentIndex];
  document.getElementById("question").innerText = current.question;
  document.getElementById("feedback").innerText = "";
  document.getElementById("nextBtn").disabled = true;

  updateProgressBar();

  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(li, option);
    optionsList.appendChild(li);
  });

  document.getElementById("score").innerText = `Score: ${score}`;
}

function checkAnswer(selectedOption, chosenAnswer) {
  if (selected) return;
  selected = true;
  clearInterval(timer);

  const correct = quizData[currentIndex].answer;
  const options = document.querySelectorAll("li");

  options.forEach(option => {
    option.onclick = null;
    if (option.textContent === correct) {
      option.classList.add("correct");
    } else if (option.textContent === chosenAnswer) {
      option.classList.add("wrong");
    }
  });

  if (chosenAnswer === correct) {
    document.getElementById("feedback").innerText = "✅ Correct!";
    score++;
  } else {
    document.getElementById("feedback").innerText = `❌ Wrong! Correct: ${correct}`;
  }

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("final-score").innerText = `Your final score is ${score}/${quizData.length}`;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  document.getElementById("result-box").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

function startTimer() {
  document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback").innerText = "⏰ Time's up!";
      document.querySelectorAll("li").forEach(li => li.onclick = null);
      document.getElementById("nextBtn").disabled = false;
    }
  }, 1000);
}

function updateProgressBar() {
  const percent = ((currentIndex) / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}
