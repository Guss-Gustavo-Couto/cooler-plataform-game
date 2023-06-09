// JS Initialization
console.log("JS is loaded");

// Canvas Initialization
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Start Button
const startButton = document.getElementById("start");

//Create the Player

const playerImages = [
  "docs/assets/images/player-01.png",
  "docs/assets/images/player-02.png",
  "docs/assets/images/player-03.png",
  "docs/assets/images/player-04.png",
];

const player = new Component(
  70,
  235,
  220,
  280,
  "./docs/assets/images/player-01.png",
  ctx,
  0
);

let game;

startButton.onclick = function(){
  console.log("starting");
  runRightAnim = true;
  game = new Game(ctx, canvas.width, canvas.height, player);
  game.start();
  setInterval(updateTimer, 10);
  var div = document.querySelector("#start");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
}
}



// Set Timer
let elapsedTime = 0;
function updateTimer() {
  elapsedTime += 10;
  const seconds = Math.floor(elapsedTime / 1000);
  const centiseconds = Math.floor((elapsedTime % 1000) / 10);
  document.getElementById("timer").innerHTML = `${seconds
    .toString()
    .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;

  if (seconds === 20) {
    document.getElementById("level").innerHTML = "LEVEL 2";
  } else if (seconds === 30) {
    document.getElementById("level").innerHTML = "LEVEL 3";
  } else if (seconds === 40) {
    document.getElementById("level").innerHTML = "LEVEL 4";
  } else if (seconds === 50) {
    document.getElementById("level").innerHTML = "LAST LEVEL";
  } else if (seconds >= 60) {
    document.getElementById("timer").innerHTML = "60:00";
    document.getElementById("level").innerHTML = "FINISH";
  }
}

// Add event listener for keydown event
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === `ArrowUp`) {
    player.isJumping = true;
   
    //animation
    runRightAnim = false;
    runLeftAnim = false;
    crouchAnim = false;
    collisionAnim = false;
    gameOverAnim = false;
    swordAnim = false;
    jumpAnim = true;
    setTimeout(() => {
      jumpAnim = false;
      runRightAnim = true;
    }, 1500);
  }
});

// Move the Player
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      player.speedX -= 0.2;
      //animation
      runRightAnim = false;
      crouchAnim = false;
      collisionAnim = false;
      gameOverAnim = false;
      jumpAnim = false;
      swordAnim = false;
      runLeftAnim = true;
      break;

    case "ArrowRight":
      player.speedX += 0.2;
      break;
      
    case "ArrowDown":
      //animation
      runRightAnim = false;
      collisionAnim = false;
      gameOverAnim = false;
      jumpAnim = false;
      runLeftAnim = false;
      swordAnim = false;
      crouchAnim = true;
      break;

      case "s":
      //animation
      runRightAnim = false;
      collisionAnim = false;
      gameOverAnim = false;
      jumpAnim = false;
      runLeftAnim = false;
      crouchAnim = false;
      break;
  }
});

// Stop Speed
document.addEventListener("keyup", () => {
  player.speedX = 0;
  crouchAnim = false;
  runLeftAnim = false;
  swordAnim = false;
  if (!jumpAnim) {
    runRightAnim = true;
  }
});
