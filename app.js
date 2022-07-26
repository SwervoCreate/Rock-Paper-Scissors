let explosion = new Audio("/resources/explosion.mp3")
let snippingSound = new Audio("/resources/snipping.mp3");
let backgroundMusicA = new Audio("/resources/backgroundmusic.mp3");
let backgroundMusicB = new Audio("/resources/backgroundmusic2.mp3");
let backgroundMusicC = new Audio("/resources/backgroundmusic3.mp3");
let music = [backgroundMusicA, backgroundMusicB, backgroundMusicC];
let winner = document.getElementById("winner");
let computerScore = 0;
let playerScore = 0;
let volume = 0;

backgroundMusicA.play();

document.getElementById("muteButton").addEventListener("click", function() {
    volume += 1
    if (volume % 2 === 0 ) {
        document.getElementById("muteButton").src = "/resources/volume.png"
        backgroundMusicB.play();
    } else {
       
        document.getElementById("muteButton").src = "/resources/mute.png";
        backgroundMusicA.pause();
        backgroundMusicB.pause();
        backgroundMusicC.pause();
}
})




backgroundMusicA.loop = false;
backgroundMusicB.loop = false;
backgroundMusicC.loop = false;
function playerAi() {
    let computerGuess = Math.floor(Math.random() * 3);
    console.log(computerGuess);
    switch (computerGuess) {
        case 0 :
            computerGuess = "rock"
        break;
        case 1: 
            computerGuess = "paper"
        break;
        case 2:
            computerGuess = "scissors"
            break;
    }

    return computerGuess;
}

function checkForWinner() {
    if (computerScore === 5) {
        playerScore = 0;
        computerScore = 0;
        winner.innerHTML = "Computer Wins!";
        winner.style.border = "2px solid black";
        winner.style.backgroundColor = "red"
    } else if (playerScore === 5) {
        playerScore = 0;
        computerScore = 0;
        winner.innerHTML = "Player Wins!";
        winner.style.border = "2px solid black";
        winner.style.backgroundColor = "green"
    }
}

function RockScissorsAnimation() {
    document.getElementById("paperPicture").src = null;
    document.querySelector("html").style.cursor = "none";
    document.getElementById("scissors").style.animation = "scissorsAttack 2s linear 1 forwards";
    document.getElementById("rock").style.animation = "rockAttack 2s linear 1 forwards"
    setTimeout(function() {
        document.getElementById("paperPicture").src = "/resources/explosion.png";
        document.getElementById("paperPicture").style.zIndex = "5"
       explosion.play();
    }, 2300)
    setTimeout(function() { 
        document.getElementById("scissors").style.animation = "scissorDie 2s linear 1 forwards"
    },2500);
    setTimeout(function() {
        document.getElementById("scissors").style.animation = null;
        document.getElementById("rock").style.animation = null;
        document.querySelector("html").style.cursor = "auto";
        
        document.getElementById("paperPicture").src = "/resources/paper.png"
        document.getElementById("paperPicture").style.zIndex = "1"           
    },3500);
};

function rockPaperAnimation() {
    document.querySelector("html").style.cursor = "none";
    document.getElementById("paper").style.animation = "paperCoverRock 2s linear 1 forwards"
        document.getElementById("paperPicture").style.height = "30em" 
    setTimeout(function() {
        document.querySelector("html").style.cursor = "auto";
        document.getElementById("paper").style.animation = null;
        document.getElementById("paperPicture").style.height = "15em"
    }, 2500);

}

function scissorsPaperAnimation() {
    
    document.getElementById("scissors").style.animation = "scissorsAttackPaper 2s linear 1 forwards";

    setTimeout( function() {
        document.getElementById("paperPicture").src = "/resources/snippedPaper.png";
        snippingSound.play();
    }, 2000)
    setTimeout(function() {
        document.getElementById("scissors").style.animation = null;
        document.getElementById("paperPicture").src = "/resources/paper.png"
        
    }, 3000)
}
    


document.getElementById("rock").addEventListener("click", function() {
    winner.style.border = "none";
    winner.style.backgroundColor = "transparent";
    let computerGuess = playerAi();
    switch (computerGuess) {
        case "rock":
            console.log("Tie Rocks")
            winner.innerHTML = "Tie Rocks Go Again"
        break;
        case "paper":
            rockPaperAnimation();
            console.log("Paper Cover Rock. Player Loses")
            winner.innerHTML = "Paper Covers Rock. Player Loses"
            computerScore += 1;
        break;
        case "scissors":
            RockScissorsAnimation();
           console.log("Rock Smashes Scissors. Player Wins")
            winner.innerHTML = "Rock Smashes Scissors. Player Wins."
            playerScore += 1;
            break;
        
    };

    document.getElementById("playerScore").innerHTML = playerScore;   
    document.getElementById("computerScore").innerHTML = computerScore;
    checkForWinner();

});

let paper = document.getElementById("paper");

paper.addEventListener("click", function() {
    winner.style.border = "none";
    winner.style.backgroundColor = "transparent";
    let computerGuess = playerAi();
    switch (computerGuess) {
        case "rock":
            rockPaperAnimation();
            winner.innerHTML = "Paper Covers Rock. Player Wins"
            playerScore += 1;
        break;
        case "paper":
            winner.innerHTML = "Tie Papers. Go Again"
        break;
        case "scissors":
            scissorsPaperAnimation()
            winner.innerHTML = "Scissors Cut Paper. Player Loses"
            computerScore += 1;        
            break;
    };
    document.getElementById("playerScore").innerHTML = playerScore;   
    document.getElementById("computerScore").innerHTML = computerScore;
    checkForWinner();
    
});

let scissors = document.getElementById("scissors");

scissors.addEventListener("click", function() {
    winner.style.border = "none";
    winner.style.backgroundColor = "transparent";
    let computerGuess = playerAi();
    switch (computerGuess) {
        case "rock":
            RockScissorsAnimation();
            winner.innerHTML = "Rock Smashes Scissors. Player Loses"
            computerScore += 1;
        break;
        case "paper":
            scissorsPaperAnimation();
            winner.innerHTML = "Scissors Cut Paper. Player Wins"
            playerScore += 1;
            break;
        case "scissors":
            winner.innerHTML = "Tie Scissors. Go Again"
        break;
    };
    checkForWinner();
    document.getElementById("playerScore").innerHTML = playerScore;   
    document.getElementById("computerScore").innerHTML = computerScore;
    
});



