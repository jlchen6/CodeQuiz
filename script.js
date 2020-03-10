//Define variables
var timer = document.querySelector("#quizTime");
var startBtn = document.querySelector("#start");
var quizText = document.querySelector(".quizText");
var questResult = document.querySelector(".questionResult");
var initials = document.querySelector("#initials");
var initRow = document.querySelector("#initialRow");
var initButton = document.querySelector("#submitInitials");
var displaySubmitted = document.querySelector("#displaySubmitted");
var formContainer = document.querySelector(".formContainer");
var quizCountdown = 75;
var questNo = 0;
var playerScore = 0;
var currQ;
var questHeader;
var questText;
var questAnswers;
var questResultDisplayed = false;
var quizInterval;
var scores;
var currentBest;

//Object to hold quiz question data
var questions = [
    {
        text: "What does HTML stand for?",
        answers: ["Hero Time My Lord", "Hunger Text Makeup Language", "Hyper Text Markup Language", "Hyper Text Mixup Language"],
        correct: 2
    },
    {
        text: "Which of the following is a self closing HTML tag?",
        answers: ["img", "button", "div", "body", "The above are all self-closing tags"],
        correct: 0
    },
    {
        text: "What are the different types of CSS Positioning?",
        answers: ["Strict, Abstract", "Static, Relative, Absolute, Fixed", "Left, Right, Center", "Float, Sticky, Clear"],
        correct: 1
    },
    {
        text: "Which of the following is referred to as 'Strict Equality' in JavaScript?",
        answers: ["=", "==", "+=", "==="],
        correct: 3
    },
    {
        text: "Bootstrap is known as a CDN. What does CDN stand for?",
        answers: ["Connected Database Network", "Content Delivery Network", "Cloud Database Nexus", "Clone Database Nodes"],
        correct: 1
    },
    {
        text: "Which of the following is not a common data type for a variable in Javascript?",
        answers: ["number", "boolean", "function", "string"],
        correct: 2
    },
    {
        text: "What does DOM stand for?",
        answers: ["Document Object Model", "Database Oriented Macro", "Directed Office Machine", "Double Or Monday", "None of the above"],
        correct: 0
    }
];

//Function to start the quiz
function startQuiz() {
    //Clear out the quiz introduction text
    quizText.textContent = "";
    //Create a timer for the quiz
    quizInterval = setInterval(function () {
        //Display the current time left for the quiz 
        timer.textContent = "Timer: " + quizCountdown;
        //If the previous question's result is still being displayed, clear it.
        if (questResultDisplayed) {
            questResult.textContent = "";
            questResultDisplayed = false;
        }
        //If User ran out of time, display end screen and clear counter.
        if (quizCountdown <= 0) {
            endQuiz();
        }
        quizCountdown--;


    }, 1000);

    //Display questions
    showQuestions();
}

//Function to display the questions
function showQuestions() {
    //Clear last question
    quizText.textContent = "";
    if (quizCountdown <= 0) {
        return;
    }

    //Grab the question data for the current question
    currQ = questions[questNo];

    //Create a header with the question number
    questHeader = document.createElement("h2");
    questHeader.textContent = "Question " + (questNo + 1);

    //Display the question
    questText = document.createElement("h4");
    questText.textContent = currQ.text;

    //Set up a container for the question answers
    questAnswers = document.createElement("ul");
    questAnswers.setAttribute("class", "list-group text-align-right");

    //Create elements for the answers, plus buttons to select them with.
    for (let i = 0; i < currQ.answers.length; i++) {
        answerText = currQ.answers[i];
        let li = document.createElement("li");
        li.textContent = answerText;
        li.setAttribute("data-index", i);
        li.setAttribute("class", "list-group-item list-group-item-info")

        let button = document.createElement("button");
        button.textContent = "Select";
        button.setAttribute("class", "btn-primary float-left")
        button.addEventListener("click", checkAnswer);

        li.appendChild(button);
        questAnswers.appendChild(li);
    }

    //Add the new elements to the page
    quizText.appendChild(questHeader);
    quizText.appendChild(questText);
    quizText.appendChild(questAnswers);
}

//Function to validate the user's answer to a question
function checkAnswer(event) {
    //Get the answer number of the button that was clicked on, as well as what the correct answer number should be.
    var answerNo = event.target.parentElement.getAttribute("data-index");
    correctNo = questions[questNo].correct;

    //If they got the question correct, inform the player and increase their score
    if (answerNo == correctNo) {
        playerScore += 5;
        questResult.textContent = "Correct!"
        questResultDisplayed = true;
    }
    //Otherwise, subtract time from the timer
    else {
        quizCountdown -= 5;
        questResult.textContent = "Incorrect"
        questResultDisplayed = true;
        //If that would push the counter negative, clear the interval and display the end screen
        if (quizCountdown <= 0) {
            quizCountdown = 0;
            timer.textContent = "Timer: " + quizCountdown;
            quizText.textContent = "";
            endQuiz();
            return;
        }
    }

    //Increase the question number and display next question.
    questNo++;
    if (questNo < questions.length) {
        console.log("got here " + questNo);
        showQuestions();
    }
    //Otherwise, show end screen of quiz.
    else {
        timer.textContent = "";
        endQuiz();
    }

}

//Function to display the ending screen, and log any high scores
function endQuiz() {
    //Clear the screen
    quizText.textContent = "";
    clearInterval(quizInterval);
    timer.textContent = "";
    questResult.textContent = "";

    //Check the past high scores. If they're empty, set them.
    currentBest = localStorage.getItem("highestScore");
    scores = localStorage.getItem("scores");
    if (scores == null || currentBest == null) {
        localStorage.setItem("highestScore", 0);
        localStorage.setItem("scores", "");
        scores = "";
        currentBest = 0;
    }

    //If the player ran out of time, display that
    if (quizCountdown <= 0) {
        let p = document.createElement("p");
        p.textContent = "You ran out of time!!"
        quizText.appendChild(p);
    }

    //Otherwise, display the ending screen with the player's score
    playerScore += quizCountdown;
    var h3 = document.createElement("h3");
    h3.textContent = "Your score was " + playerScore;
    quizText.appendChild(h3);

    //If the player got a new highscore, save it and inform the player.
    if (playerScore > currentBest) {
        newHighScore();
    }

    //Create a link to the main page
    var a = document.createElement("a");
    a.setAttribute("href", "index.html");
    //Create a button to retake the quiz
    var button = document.createElement("button");
    button.textContent = "Retake Quiz";
    button.setAttribute("class", "btn-primary");
    //Add the button to the link, so that clicking the button follows the link and refreshes the page.
    a.appendChild(button);
    //Add the link to the form
    formContainer.appendChild(a);
}

//Function to store a new high score
function newHighScore() {
    //Display text to inform user that they beat previous high score
    let h4 = document.createElement("h4");
    h4.textContent = "You beat the previous high score!";

    //Display the input box and button for the user to submit their initials to save their score
    let p = document.createElement("p");
    p.textContent = "Please enter your initials below to save your score!";
    initRow.setAttribute("class", "text-center d-block");

    //Add those display elements to the div
    quizText.appendChild(h4);
    quizText.appendChild(p);

}

//Create an event listener to start the quiz when the user clicks the button
startBtn.addEventListener("click", startQuiz);
initButton.addEventListener("click", function (event) {
    //Prevent the button from refreshing the page
    event.preventDefault();

    //Store the usere's entered text
    var inits = initials.value.trim();
    console.log(inits);

    //Concatenate the player's initials and score to the locally stored scores, separated by a comma
    scores += inits + "-" + playerScore + ",";

    //Display to the user that they have submitted their score
    displaySubmitted = document.querySelector("#displaySubmitted");
    displaySubmitted.textContent = "Thank you for submitting your high score, " + inits;

    //Save the updated scores to local storage
    localStorage.setItem("scores", scores);

    //Update highest score to date
    localStorage.setItem("highestScore", playerScore);

    //Set the display of the form to "none" so that the user can't submit their initials multiple times for the same score
    initRow.setAttribute("class", "row d-none");
});
