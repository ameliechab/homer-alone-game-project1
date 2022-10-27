import Memory from "./classes.js";

const cards = [
  { name: "Marge", img: "marge-simpson.gif" },
  { name: "Bart", img: "bart-simpson.gif" },
  { name: "Lisa", img: "lisa-simpson.gif" },
  { name: "Maggie", img: "maggie-simpson.gif" },
  { name: "Grandpa Abe", img: "abraham-simpson.gif" },
  { name: "Petit papa Noël", img: "chien-simpson.gif" },
];

// Initialization of the variable when we play several times the game
let memoryGame = null;

// Audio constants
const dohSound = new Audio("./sounds/doh.wav");
const winSound = new Audio("./sounds/woohoo.wav");
const laughSound = new Audio("./sounds/homer-laugh.wav");
const gameOverSound = new Audio("./sounds/homer-scream.wav");

// HP constant
const heartSection = document.querySelector(".heart-section div");

//Function to display darkside cards
function darksideCards() {
  let htmlCards = "";

  memoryGame.cards.forEach((pic) => {
    htmlCards += `
          <div class= "card" data-card-name="${pic.name}">
          <div class="back" id="back-text" name="${pic.img}">?</div>
          <div class="front" style="background: url(./images/${pic.img}) no-repeat"></div>
          </div>
          `;
  });

  document.querySelector("#darkside-card").innerHTML = htmlCards;
}

//Function to display cards to guess
function guessCard(card) {
  if (!card) {
    return;
  } else {
    let htmlGuessCard = `
          <div class= "card turned" data-card-name="${card.name}">
                <div class="back" name="${card.img}"></div>
                <div class="front" style="background: url(./images/${card.img})"></div>
                </div>
                <p class="guess-text">Guess where is ${card.name}</p>`;
    document.querySelector("#card-to-guess").innerHTML = htmlGuessCard;
  }
}

//Function to display hearts
function displayHearts() {
  heartSection.innerHTML = null;
  for (let i = memoryGame.hearts; i > 0; i--) {
    const heart = new Image();
    heart.src = "./images/heart-simpson.png";
    heart.id = `heart-${i}`;
    heart.className = "heart";
    heartSection.append(heart);
  }
}

//Function to close the start screen
function closeStartScreen() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("start-screen").close();
}

// 1- Start screen
document.getElementById("start-screen").showModal();
document.getElementById("start-button").addEventListener("click", start);

// 2- Function of a game
function start() {
  memoryGame = new Memory([...cards]); //To avoid the effect of splice when we re-start the game

  // 3- Close the start screen
  closeStartScreen();

  // 4- Shuffle cards from the Memory method
  memoryGame.shuffleDarksideCards();

  //Display darkside cards
  darksideCards();

  //Display card to guess
  let cardToGuess = memoryGame.getCardToGuess();
  guessCard(cardToGuess);

  //Display hearts
  displayHearts();

  //Check if pairs or not

  function checkIfPairs() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        card.classList.add("turned");
        //If cards match
        setTimeout(() => {
          if (cardToGuess.name === card.dataset.cardName) {
            laughSound.play();
            cardToGuess = memoryGame.getCardToGuess();
            //A new card to guess appears until there is no more and you win
            if (!cardToGuess) {
              setTimeout(() => {
                winSound.play();
                document.getElementById("win-alert").showModal();
              }, 1000);
            } else {
              guessCard(cardToGuess);
              //cardToGuess.name = newGuess.name;
            }
            //If cards don't match
          } else {
            dohSound.play();
            memoryGame.hearts--;

            //Your cards turn again
            card.classList.remove("turned");

            //You loose hearts
            displayHearts();

            //Until you game over
            if (memoryGame.hearts === 0) {
              setTimeout(() => {
                gameOverSound.play();
                document.getElementById("game-over-alert").showModal();
              }, 1000);
              return;
            }
          }
        }, 1000);
      });
    });
  }
  checkIfPairs();
}

//To reset the game
document.getElementById("reset-button").addEventListener("click", () => {
  start();
});

//To play on smartphone
//document.getElementById("reset-button").addEventListener("touchstart", () => {
//start();
//});

//To play the game again after the Game Over : re-start button
document.getElementById("try-again-button").addEventListener("click", () => {
  document.getElementById("game-over-alert").close();
  start();
});

//To play the game again after the win alert : re-start button
document.getElementById("play-again-button").addEventListener("click", () => {
  document.getElementById("win-alert").close();
  start();
});
