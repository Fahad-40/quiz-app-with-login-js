if (localStorage.getItem("isloggedIn") !== "true") {
    window.location.href = "logIn.html"
}
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "India"],
        answer: "Japan"
    }
];

//Welcome Screen
const welcomeScreen = document.querySelector('.welcome-screen');
const quizContainer = document.querySelector('.quiz-container');
const startBtn = document.querySelector('.start-btn');
const userNameSpan = document.getElementById('userName');

let storedName = localStorage.getItem("userName");
if (storedName) {
    userNameSpan.innerText = storedName;
}

startBtn.onclick = () => {
welcomeScreen.style.display = "none";
resultScreen.style.display = "none";
quizContainer.style.display = "block";

   currentQuestion = 0;
    timeLeft = 20;
    score = 0;

    loadQuestion();  

};

let totalQuestions = quizData.length;
let currentQuestion = 0;
let timeLeft = 20;
let score = 0;
let DecreaseTimer;
let selectedOption = null;
let submitBtn = document.querySelector('.submit-btn');
let resultScreen = document.querySelector('.result-screen');
let timerwhole = document.querySelector('.timer');

let currentQuestionDisplay = document.querySelector("#CurrentQuestion");
let totalQuestionsDisplay = document.querySelector('#totalQuestion');

totalQuestionsDisplay.innerText = totalQuestions;

let timeDisplay = document.getElementById('time');
let quizQuestion = document.querySelector('.question');
let quizOptionBox = document.querySelector('.options');
let quizResult = document.querySelector('.result');
let QuizScore = document.getElementById('score');
let restartBtn = document.querySelector('.restart-btn');


function loadQuestion() {

    if (currentQuestion >= quizData.length) {
        endGame();
        return;
    }
    timeLeft = 20;
    timeDisplay.textContent = timeLeft;

    currentQuestionDisplay.innerText = currentQuestion + 1;

    selectedOption = null;
    submitBtn.disabled = true;


    clearInterval(DecreaseTimer);
    startTimer();

    let currentQuizData = quizData[currentQuestion];
    quizQuestion.textContent = currentQuizData.question;
    quizOptionBox.textContent = "";

    currentQuizData.options.forEach((option) => {

        let button = document.createElement("button");
        button.classList.add("option")
        button.textContent = option;
        quizOptionBox.appendChild(button);
        button.onclick = () => {
            selectedOption = option;
            Array.from(quizOptionBox.children).forEach((btn) => btn.style.backgroundColor = "#f9f9f9");
            button.style.backgroundColor = "#d0f0c0";
            submitBtn.disabled = false;
            checkAnswer(option);
        }

    });
}

submitBtn.onclick = () => {
    if (selectedOption) {
        if (selectedOption === quizData[currentQuestion].answer) {
            score += 10;
        }
        currentQuestion++;
        loadQuestion();
    }
}

// function checkAnswer(selectedOption) {
//     if (selectedOption === quizData[currentQuestion].answer) {
//         score += 10;
//     }
//     currentQuestion++;
//     loadQuestion();
// }

function startTimer() {

    DecreaseTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(DecreaseTimer);
            endGame();
        }
    }, 1000);

}

function endGame() {

    clearInterval(DecreaseTimer);

    quizQuestion.style.display = "none";
    quizOptionBox.style.display = "none";
    QuizScore.textContent = score;
    timerwhole.style.display = "none";
    submitBtn.style.display = "none";
    
    quizResult.style.display = "block";
    restartBtn.style.display = "block";
    resultScreen.style.display = "block";
    
    quizContainer.style.display = "none";
    resultScreen.style.display = "block";   
    
    document.getElementById("score").textContent = score;
    
}

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    timeLeft = 20;
    score = 0;

    quizQuestion.style.display = "block";
    quizOptionBox.style.display = "block";
    quizResult.style.display = "none";
    restartBtn.style.display = "none";
    
    quizContainer.style.display = "block";
    timerwhole.style.display = "block";
    submitBtn.style.display = "block";

    resultScreen.style.display = "none";

    loadQuestion();

});
loadQuestion();

