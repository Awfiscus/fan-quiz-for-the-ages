
//this is my object array for the questions in the quiz
var questions = [
    {
        title: "How Many Members does Judah and The Lion have?",
        answer: "3",
        answers: ["4", "3", "2", "6"]
    },
    {
        title: "On a scale of 1-10 how awesome are they?",
        answer: "10",
        answers: ["10", "6", "2", "5"]
    },
    {
        title: "Who is the lead singer of Judah and the Lion?",
        answer: "Judah Akers",
        answers: ["Judah Akers", "Brian Macdonald", "Nate Zuercher", "Andrew Fiscus"]
    },
    {
        title: "Where did they first meet?",
        answer: "Nashville",
        answers: ["New York", "Pittsburg", "Nashville", "Denver"]
    },
    {
        title: "The Ep Take it All Back was #1 on Billboards Alternative songs charts for how many weeks?",
        answer: "3",
        answers: ["1", "2", "3", "4"]
    }

]

//variable used for the index to determine which question is used
var currentQuestion = 0

var highScores = []


//set up timer that starts when startButton is pushed
var timer = document.querySelector("#timer")

var secondsLeft = 80;

//this function controls the time left in the game and alerts the user if he runs out of time and clears the time interval if all 5 questions have been answered.
function countDown() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time:" + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);

            alert("Times Up");
        }
        if(currentQuestion >= 5) {
            clearInterval(timerInterval)
        }
    }, 1000)
}

//Variable Declariations
var startButton = document.querySelector("#startButton")
var startPage = document.querySelector("#startPage")
var highScoreList = document.querySelector("#userEnteredData")
var highScoreButton = document.getElementById("#highScoreButton")

//This function hides the text from the first page and starts the createQuestion function
function removeFirst() {
    $("#startPage").hide();
    createQuestion()

}

//this function goes through the questions in the array added 1 to index of currentQuestion each time
function correctAnswer() {
    currentQuestion++;
    if(currentQuestion >= 5) {
    endOfGame()  
    }
    else {
    createQuestion()
    }
}

//this function creates the questions and removes them all in one
function createQuestion() {
    var firstH1 = document.createElement("h1")
    firstH1.textContent = questions[currentQuestion].title
    var body = document.getElementById("body")
    body.appendChild(firstH1)

   for(var i = 0; i < questions[currentQuestion].answers.length; i++) { 
    var button = document.createElement("button")
    button.setAttribute("class", "answer")
    button.textContent = questions[currentQuestion].answers[i]
    //upon clicking the answer, if it is incorrect 15s is subtracted from the time left. Then the question and answers are hidden and a new one is revealed.
    button.addEventListener("click", function() {
        if(this.textContent !== questions[currentQuestion].answer) {
            (secondsLeft -= 15)
            console.log(questions[currentQuestion].answer);
        }
        $("h1").hide();
        $(".answer").hide();
        correctAnswer()
    })
    body.appendChild(button)
   }
}   
//function for the end of game html and code
function endOfGame() {
    //creates html for end of game page
    var gameOver = document.createElement("h1")
    gameOver.textContent = "Game Over!!"

    var body = document.getElementById("body")
    body.appendChild(gameOver)

    var finalScore = document.createElement("h4")
    finalScore.setAttribute("id", "finalScore")
    finalScore.textContent = "Your Final score: " + secondsLeft
    body.appendChild(finalScore)

    var initialInput = document.createElement("input")
    initialInput.setAttribute("class", "initialsBar")
    body.appendChild(initialInput)

    var initials = document.createElement("h6")
    initials.setAttribute("class", "initials")
    initials.textContent = "Enter Your Initials"
    finalScore.appendChild(initials)
    console.log(initialInput);

    var submitButton = document.createElement("button")
    submitButton.setAttribute("class", "submit")
    submitButton.textContent = "Submit HighScore"
    body.appendChild(submitButton)
    //adds event listener to the submit bar to save the value applied to it and saves it to local storage
    submitButton.addEventListener("click", function() {
        highScores.push(initialInput.value + secondsLeft)
        localStorage.setItem("scores", highScores)
        

        $(gameOver).hide()
        $(finalScore).hide()
        $(initialInput).hide()
        $(initials).hide()
        $(submitButton).hide()
        
        var finalMessage = document.createElement("h1")
        finalMessage.textContent = "Reload and Try Again. High Scores are saved!"
        body.appendChild(finalMessage)

        
    })
}

//could not get this portion to work properly
function formHighScores() {
    var scoresList = document.querySelector("h3")
    var highScoreButton = document.getElementById("#highScoreButton")
    var resetButton = document.querySelector("#resetButton")
    var highScores = localStorage.getItem("scores")

    scoresList.textContent = highScores

}



//Event Listeners
startButton.addEventListener("click", countDown)
startButton.addEventListener("click", removeFirst)

