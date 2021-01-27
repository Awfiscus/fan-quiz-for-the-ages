var questions = [
    {
        title: "How Many Members does Judah and The Lion have?",
        answer: "4",
        answers: ["4", "3", "2", "6"]
    },
    {
        title: "On a scale of 1-10 how awesome are they?",
        answer: "10",
        answers: ["8", "6", "2", "5"]
    },

]

var currentQuestion = 0


//set up timer that starts when startButton is pushed
var timer = document.querySelector("#timer")

var secondsLeft = 80;

function countDown() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time:" + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);

            alert("Times Up")
        }
    }, 1000)
}

//Variable Declariations
var startButton = document.querySelector("#startButton")
var startPage = document.querySelector("#startPage")

//Functions

//This function removes the text from the first page
function removeFirst() {
    var body = document.getElementById("body")
    var page1 = document.getElementById("startPage")
    body.removeChild(page1);
    createQuestion()

}

function correctAnswer() {
    currentQuestion++
    body.clear()
    createQuestion()
}


function createQuestion() {
    var firstH1 = document.createElement("h1")
    console.log(firstH1);
    firstH1.setAttribute("id", "question1")
    firstH1.textContent = questions[currentQuestion].title
    var body = document.getElementById("body")
    body.appendChild(firstH1)

   for(var i = 0; i < questions[currentQuestion].answers.length; i++) { 
    var button = document.createElement("button")
    button.setAttribute("class", "answer")
    button.textContent = questions[currentQuestion].answers[i]
    button.addEventListener("click", correctAnswer)
    body.appendChild(button)
   }
}   

//Event Listeners
startButton.addEventListener("click", countDown)
startButton.addEventListener("click", removeFirst)