const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false }
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false }
    ]
  }
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNext);

function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-btn');
    button.addEventListener('click', () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  feedbackEl.innerText = '';
  nextBtn.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    const isCorrect = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText).correct;
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
  });

  if (correct) {
    feedbackEl.innerText = "✅ Correct!";
    score++;
  } else {
    feedbackEl.innerText = "❌ Wrong!";
  }

  nextBtn.classList.remove('hide');
  nextBtn.innerText = currentQuestionIndex < questions.length - 1 ? "Next" : "Finish";
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hide');
  resultScreen.classList.remove('hide');
  scoreText.innerText = `You scored ${score} out of ${questions.length}`;
}
