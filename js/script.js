const questionElement = document.querySelector('.question-text');
const optionBox = document.querySelector('.option-box');
const currentQuestionNum = document.querySelector('.current-question-num');
const answerDescription = document.querySelector('.answer-description');
const nextQuestionBtn = document.querySelector('.next-question-btn');
const correctAnswers = document.querySelector('.correct-answers');
const seeResultBtn = document.querySelector('.see-result-btn');
const remainingTime = document.querySelector('.remaining-time');
const timeIsUpText = document.querySelector('.time-is-up-text');
const quizHomeBox = document.querySelector('.quiz-home-container');
const quizBox = document.querySelector('.quiz-container');
const quizOverBox = document.querySelector('.quiz-over');
const startArgainQuizBtn = document.querySelector('.start-again-btn');
const goHomeBtn = document.querySelector('.go-home-btn')
const startQuizBtn = document.querySelector('.start-quiz-btn');
let attempt = 0;
let myArray = [];
let questionIndex = 0;
let num = 0;
let score = 0;
let interval;

const questionsData = [
    {
      question: 'In what city was coronavirus (COVID-19) first discovered?', 
      options: ['A: New York, USA', 'B: Lomardy, Italy', 'C: Wuhan, China', 'D; Lagos, Nigeria'],
      answers: 2,
      description:"The coronavirus outbreak was first identified in Wuhan, China in November, 2019." 
},
    {
        question: 'What is the full meaning of WHO?', 
        options: ['A: World Health Organisation', 'B: World Health Origin', 'C: Warn Health Organisation', 'D: Word Health Organisation'],
        answers: 0,
        description:"World Health Organisation is a United Nations agency responsible for public health."
},
    {
        question: 'HTML gives the web', 
        options: ['A: Behaviour','B: Styling', 'C: Presentation', 'D: Content Structure'],
        answers:3,
        description:'HTML gives content structure and meaning to a web page.' 
},
    {
        question: 'A disease that affects a large number of people within a community or region is called?', 
        options: ['A: Epidemic', 'B: Pandemic', 'C: Virus', 'D: Pandemonium'],
        answers:0,
        description:"Epidemic is a disease that affects a large number of people in a community or region." 
},
    {
        question: 'The largest organ of the human body is?', 
        options: ['A: Lungs','B: Legs', 'C: Skin','D: Heart'], 
        answers:2,
        description:"Skin is considered to be the largest organ of the human body."
},
]

function load() {
    num++
    questionElement.innerHTML = questionsData[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = num + " / " + questionsData.length;
}

function createOptions() {
    optionBox.innerHTML = "";
    let animationDelay = 0.2;
    for (let i = 0; i < questionsData[questionIndex].options.length; i++) {
        const data = questionsData[questionIndex].options[i];
        const option = document.createElement("div");
        option.innerHTML =  data; 
        option.classList.add('option');
        option.id = i;
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.2;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function generateRandomQuestion() {
    const randomNumber = Math.floor(Math.random() * questionsData.length);
    
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    } else {
        for (let i = 0; i < myArray.length; i++){
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        } else {
            questionIndex = randomNumber;
        }
    }
    myArray.push(randomNumber);
    load();
}

function check(elem) {
    const id = elem.id;
    if (id == questionsData[questionIndex].answers) {
        elem.classList.add('correct');
        score++;
        scoreBoard();
    } else {
        elem.classList.add('wrong');
        for (let i = 0; i < optionBox.children.length; i++) {
            if(optionBox.children[i].id == questionsData[questionIndex].answers)
               optionBox.children[i].classList.add("show-correct");
        }
    }
    attempt++;
    disableOptions()
    showAnswerDescription();
    showNextQuestionBtn();
    stoptTimer();
    if (num === questionsData.length) {
        quizOver();
    } 
}

function timeIsUp() {
    showTimeUpText();
    for (let i = 0; i < optionBox.children.length; i++) {
        if(optionBox.children[i].id == questionsData[questionIndex].answers)
           optionBox.children[i].classList.add("show-correct");
    }

    if (num !== questionsData.length) {
        showNextQuestionBtn();
    } else {
        quizOver();
    }
    disableOptions()
    showAnswerDescription();
}


function startTimer() {
   let timeLimit = 15;
   remainingTime.innerHTML = timeLimit;
   remainingTime.classList.remove("less-time");
   interval = setInterval(() => {
       timeLimit--;
       if (timeLimit < 10) {
           timeLimit = `0${timeLimit}`;
       }
       if (timeLimit <= 5) {
           remainingTime.classList.add("less-time")
       }
       remainingTime.innerHTML = timeLimit;
       if (timeLimit == 0) {
           clearInterval(interval);
           timeIsUp();
       }
   }, 1000)
}

function stoptTimer() {
    clearInterval(interval);
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].removeAttribute("onclick")
        optionBox.children[i].classList.add("already-answered");
    }
}

function showAnswerDescription() {
    if (typeof questionsData[questionIndex].description !== 'undefined') {
        answerDescription.classList.add('show');
        answerDescription.innerHTML = questionsData[questionIndex].description;
    } 
}

function hideAnswerDescription() {
    answerDescription.classList.remove('show');
    answerDescription.innerHTML = "";
}

function showTimeUpText() {
    timeIsUpText.classList.add("show");
}

function hideTimeUpText() {
    timeIsUpText.classList.remove("show");
}


function showNextQuestionBtn() {
 nextQuestionBtn.classList.add('show');
    
}

function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove('show');
}

function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener('click', nextQuestion)

function nextQuestion() {
generateRandomQuestion();
   hideNextQuestionBtn();
   hideAnswerDescription();
   hideTimeUpText();
   startTimer();
}

function quizResult() {
   document.querySelector('.total-questions').innerHTML = questionsData.length;
   document.querySelector('.total-attempt').innerHTML = attempt;
   document.querySelector('.total-correct').innerHTML = score;
   document.querySelector('.total-wrong').innerHTML = attempt - score;
   const percentage = (score / questionsData.length) * 100;
   document.querySelector('.percentage').innerHTML = percentage + "%";
}

function resetQuiz() {
    attempt = 0;
    myArray = [];
    num = 0;
    score = 0;
}

function quizOver() {
    nextQuestionBtn.classList.remove('show');
    seeResultBtn.classList.add('show');
}

seeResultBtn.addEventListener('click', () => {
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startArgainQuizBtn.addEventListener('click', () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

goHomeBtn.addEventListener('click', () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

startQuizBtn.addEventListener('click', () => {
    quizHomeBox.classList.remove("show");
    quizBox.classList.add("show");
    nextQuestion();
})
