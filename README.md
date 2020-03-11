# CodeQuiz

Created a timed quiz on coding fundamentals involving HTML, CSS, and JavaScript. 
High scores are stored in local data, and can be viewed from the HighScores page.

## Main Page

There is a link to the current list of high scores in the top left. When the quiz is started, a timer will appear in the top right.
To start with, some info text is displayed explaining the quiz, plus a button to start the quiz. 

### Quiz 

* When the button is pressed, the starting text and button are cleared and the quiz is started. 
* The timer then displays in the top right.
* The quiz question and answers are dynamically created via JavaScript, as well as the buttons to select an answer. 
* The buttons all have event listeners which trigger a function that validates the answer based on which button was clicked. 
  * If the player picked the right answer, their score will be increased and "correct!" will be displayed on the bottom of the screen
  * Otherwise, if they chose incorrectly, 5 seconds will be subtracted from their time and "incorrect" will be displayed at the bottom. 
  * Either way, the next question will be displayed.
* When either all questions have been displayed or time has run out, display an end screen with the player's score
  * If they got a new high score, ask the player to enter their new initials and store both their score and initials in local storage

## High Scores Page

A page that displays a list of high scores that are saved in local storage. Below the list is a link to return to the main quiz page and a button to clear the list of high scores. 

### High Score storage

In local storage, the code uses two variables to keep track of high scores. 
* One variable holds the current highest score for easy comparison with the player's score
* The other variable holds a string of comma separated values containing the player's initials and scores
  * When updating the list of high scores, initial-value pairs are concatenated onto the end of the string, separated by commas.
  * When reading the list, the string is split() around those commas and the resulting array is read starting from the last element of the array and working up to the first element of the array, thus reading and displaying the scores from highest to lowest. 