var clear = document.querySelector("#clear");
var list = document.querySelector(".list-group");
var p2 = document.querySelector("#p2");

//List out all of the scores
function displayScores() {
    //Get the most recent value of the string "scores", split into an array of values.
    var scores = localStorage.getItem("scores").split(",");
    p2.textContent = "";
    list.textContent = "";

    if (scores != "") {
        //Since higher values are added to the end, print the list starting from the end of the array
        for (let i = scores.length - 1; i >= 0; i--) {

            //Scores are stored as initial-value pairs, so split up the pair around the "-" character
            const scorePair = scores[i].split("-");

            //Skip past any empty values.
            if (scorePair != "") {
                //Create a list item element to display each high score in the list
                var li = document.createElement("li");
                li.setAttribute("class", "list-group-item")
                li.textContent = scorePair[0] + ": " + scorePair[1] + " points";

                //Add the new list item to the list
                list.appendChild(li);
            }

        }
    }
    else {
        p2.textContent = "There are currently no high scores. Take the quiz to log some new ones!"
    }
}

displayScores();

//Add event listener to button that clears the stored high scores when the button is pressed and refreshes the list
clear.addEventListener("click", function () {
    localStorage.setItem("highestScore", 0);
    localStorage.setItem("scores", "");
    displayScores();
});