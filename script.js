let highScore = 0;
let buttonColors = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

// Start game when any key is pressed
document.addEventListener("keydown", function () {

    if (!started) {
        document.getElementById("level-title").textContent =
            "Level " + level;

        nextSequence();
        started = true;
    }

});

let buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

    let userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

});




function nextSequence() {

    userClickedPattern = [];

    level++;

    if(level > highScore){
        highScore = level;
    }

    document.getElementById("level-title").innerHTML =
        "Level " + level +
        "<br>High Score: " + highScore;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);

    let activeButton =
        document.getElementById(randomChosenColor);

    activeButton.classList.add("pressed");

    setTimeout(() => {
        activeButton.classList.remove("pressed");
    }, 300);
}

function animatePress(currentColor) {

    let activeButton =
        document.getElementById(currentColor);

    activeButton.classList.add("pressed");

    setTimeout(function() {

        activeButton.classList.remove("pressed");

    }, 100);
}


function startOver() {

    level = 0;

    gamePattern = [];

    started = false;

}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Correct");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        document.body.classList.add("game-over");

        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        document.getElementById("level-title").textContent =
            "Game Over, Press Any Key to Restart";

        startOver();
    }
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

