//Define variables
var timer = document.querySelector("#quizTime");
var startBtn = document.querySelector("#start");
var quizText = document.querySelector(".quizText");
var quizCountdown = 75;
var questNo = 0;
var playerScore = 0;
var currentBest = localStorage.getItem("highestScore");
var scores = localStorage.getItem("scores");
var currQ;
var questHeader;
var questText;
var questAnswers;

//Object to hold quiz question data
var questions = [
    {
        text: "What does HTML stand for?",
        answers: ["Hero Time My Lord","Hunger Text Makeup Language","Hyper Text Markup Language","Hyper Text Mixup Language"],
        correct: 2
    },
    {
        text: "",
        answers: ["","","",""],
        correct: 0
    },
    {
        text: "",
        answers: ["","","",""],
        correct: 3
    },

];

//Function to start the quiz
function startQuiz() {
    //Clear out the quiz introduction text
    quizText.textContent = "";
    //Create a timer for the quiz
    var quizInterval = setInterval(function () {
       //Display the current time left for the quiz 
        timer.textContent = "Timer: " + quizCountdown;
        if(quizCountdown <= 0){
            clearInterval(quizInterval);
            //User ran out of time, so display lose screen
            noMoreTime();
        }
        quizCountdown--;


    }, 1000);

    //Display questions
    showQuestions();
}

//Function to display the questions
function showQuestions(){
    //Grab the question data for the current question
    currQ = questions[questNo];

    //Create a header with the question number
    questHeader = document.createElement("h2");
    questHeader.textContent = "Question " + (questNo + 1);

    //Display the question
    questText = document.createElement("h4");
    questText.textContent = currQ.text;

    //Add the new elements to the page
    quizText.appendChild(questHeader);
    quizText.appendChild(questText);
}

//Function to validate the user's answer to a question
function checkAnswer(){

}

//Function to display a loss screen if user runs out of time
function noMoreTime(){

}

//Create an event listener to start the quiz when the user clicks the button
startBtn.addEventListener("click", startQuiz);