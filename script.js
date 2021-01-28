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

var currentQuestion = 0

var userInitials = []

var highScores = []


//set up timer that starts when startButton is pushed
var timer = document.querySelector("#timer")

var secondsLeft = 80;

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
//Functions

//This function removes the text from the first page
function removeFirst() {
    $("#startPage").hide();
    createQuestion()

}

function correctAnswer() {
    currentQuestion++;
    if(currentQuestion >= 5) {
    endOfGame()  
    }
    else {
    createQuestion()
    }
}


function createQuestion() {
    var firstH1 = document.createElement("h1")
    firstH1.textContent = questions[currentQuestion].title
    var body = document.getElementById("body")
    body.appendChild(firstH1)

   for(var i = 0; i < questions[currentQuestion].answers.length; i++) { 
    var button = document.createElement("button")
    button.setAttribute("class", "answer")
    button.textContent = questions[currentQuestion].answers[i]
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

