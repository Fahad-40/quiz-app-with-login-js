if (localStorage.getItem("isloggedIn") !== "true") {
    window.location.href = "index.html"
}
const quizData = [
    {
        topic: "Geography",
        question: "Which country has the largest population in the world?",
        options: ["India", "USA", "China", "Russia"],
        answer: "China"
    },
    {
        topic: "Technology",
        question: "Why are NVIDIA chips popular in AI?",
        options: [
            "Cheap price",
            "Fast processing",
            "Good cameras",
            "Long battery"
        ],
        answer: "Fast processing"
    }
    ,
    {
        topic: "Web Development",
        question: "Why is React popular for building user interfaces?",
        options: [
            "Fast updates",
            "Easy animations",
            "Built-in database",
            "No JavaScript"
        ],
        answer: "Fast updates"
    },
    {
        topic: "Programming",
        question: "Which language is mainly used for web page styling?",
        options: ["HTML", "JavaScript", "CSS", "Python"],
        answer: "CSS"
    },
    {
        topic: "Space",
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        topic: "General Knowledge",
        question: "How many days are there in a leap year?",
        options: ["365", "366", "364", "360"],
        answer: "366"
    },
    {
        topic: "Internet",
        question: "Which company owns Instagram?",
        options: ["Google", "Microsoft", "Meta", "Apple"],
        answer: "Meta"
    },
    {
        topic: "Nature",
        question: "Which is the only bird that can fly backwards?",
        options: ["Hummingbird", "Parrot", "Eagle", "Woodpecker"],
        answer: "Hummingbird"
    },
    {
        topic: "Animal Kingdom",
        question: "How many hearts does an octopus have?",
        options: ["One", "Two", "Three", "Eight"],
        answer: "Three"
    },
    {
        topic: "Technology",
        question: "What was the first product ever sold on Amazon?",
        options: ["Books", "Software", "CDs", "Electronics"],
        answer: "Books"
    },

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
let TopicName = document.querySelector("#topic-name")

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
    TopicName.textContent = currentQuizData.topic;
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


