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
function removeFirst() {
    var parent = document.getElementById("body")
    var child = document.getElementById("startPage")
    parent.removeChild(child)
}

//Event Listeners
startButton.addEventListener("click", countDown)
startButton.addEventListener("click", removeFirst)