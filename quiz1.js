
const options = document.querySelector(".options").children;
const answerTrackerBox = document.querySelector(".answer-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const percentage2 = document.querySelector(".percentage2");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let questionRepeat = [];
let questionArr = [];
let score = 0;


// Question Options and Answer

const questions=[
    {
        q: 'What are the five colours of the Olympic rings?',
        options: ['Blue, yellow, black, green and red',
        'White, yellow, black, green and red',
        'Cyan, yellow, black, green and red',
         'Blue, yellow, White, green and red'],
         answer: 0
       },
       {
        q: 'In football, which team has won the Champions League (formerly the European Cup) the most?',
        options: ['Liverpool (13)',
        'Chelsea (13)',
        'Real Madrid (13)',
         'Barcelona (13)'],
         answer: 2
       },
       {
        q: 'How many players are there in a rugby league team?',
        options: ['11',
        '13',
        '10',
        '14'],
         answer: 1
       },
       {
        q: 'Which horse is the only three-time winner of the Grand National?',
        options: ['Red rum',
        'bull',
        'ceazer',
         'Dask'],
         answer: 0
       },
       {
        q: 'Since 1977, where has snookers World Championship taken place?',
        options: ['Flinger Theatre',
        'Crucible Theatre',
        'All-white Theatre',
         'Level-up Theatre'],
         answer: 1
       }
    
]

// Set question Options and question number
totalQuestionSpan.innerHTML = questions.length;
function load () {
    questionNumberSpan.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}



function check(element){
    if(element.id == questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct")
        score++;
        percentage2.innerHTML = (score / questions.length)*100 + "%";
        console.log("score:" +score)
    }
    else {
        element.classList.add('wrong');
        updateAnswerTracker("wrong");
    }
    disabledOptions();
}

function disabledOptions(){
    for(let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
        if(options[i].id == questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}

function enableOptions() {
    for(let i = 0; i < options.length; i++) {
        options[i].classList.remove("wrong", "disabled", "correct");
    }
}
function validate() {
    if(!options[0].classList.contains("disabled")){
        alert("Oga abeg pick one option na, make we for commot here o jare.")
    }
    else {
        randomQuestions();
    }
}

function next() {
    validate();
    enableOptions();
}
function randomQuestions() {
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
        if(index === questions.length) {
            //console.log("quizOver:" +quizOver)
            quizOver();        
        
        } else{
            if(questionRepeat.length > 0) {
                for(let i = 0; i < questionRepeat.length; i++) {
                    if(questionRepeat[i] == randomNumber) {
                            hitDuplicate = 1;
                            break;
                    }
                }
                if(hitDuplicate == 1) {
                    randomQuestions();
                }
                else {
                    questionIndex = randomNumber;
                    load();
                    questionArr.push(questionIndex);
                }
            }
            if(questionRepeat.length == 0) {
                questionIndex = randomNumber;
                load();
                questionArr.push(questionIndex);
            }
        }
    
    questionRepeat.push(questionIndex);
}

function answerTracker() {
    for(let i = 0; i < questions.length; i++) {
        const div = document.createElement("div")
            answerTrackerBox.appendChild(div);
    }
}

//function scoreDisplay() {}


function updateAnswerTracker(classNam) {
    answerTrackerBox.children[index-1].classList.add(classNam);
}

function quizOver() {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score / questions.length)*100 + "%";
}

function tryAgain() {
   window.location.reload();
    //window.history.back();
}

window.onload = function () {
    randomQuestions();
    answerTracker();
}

