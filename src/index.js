import Memory from "./classes.js";

const cards = [
  { name: "Marge", img: "marge-simpson.gif" },
  { name: "Bart", img: "bart-simpson.gif" },
  { name: "Lisa", img: "lisa-simpson.gif" },
  { name: "Maggie", img: "maggie-simpson.gif" },
  { name: "Grandpa Abe", img: "abraham-simpson.gif" },
  { name: "Petit papa Noël", img: "chien-simpson.gif" },
];

const memoryGame = new Memory(cards);
const dohSound = new Audio("/sounds/doh.wav");
const woohooSound = new Audio("/sounds/woohoo.wav");
const winSound = new Audio("/sounds/homer-laugh.wav");
const gameOverSound = new Audio("/sounds/homer-scream.wav");

memoryGame.shuffleDarksideCards();

window.addEventListener("load", (event) => {
  document.getElementById("start-screen").showModal();
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").remove();
  });

  let htmlCards = "";
  memoryGame.cards.forEach((pic) => {
    htmlCards += `
        <div class= "card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}">?</div>
        <div class="front" style="background: url(/images/${pic.img}) no-repeat"></div>
        </div>
        `;
  });
  document.querySelector("#darkside-card").innerHTML = htmlCards;

  let cardToGuess = memoryGame.getCardToGuess();

  function guessCard(card) {
    if (!card) {
      return;
    } else {
      let htmlGuessCard = `
        <div class= "card turned" data-card-name="${card.name}">
              <div class="back" name="${card.img}"></div>
              <div class="front" style="background: url(/images/${card.img}) no-repeat"></div>
              </div>
              <p>Guess where is ${card.name}</p>`;
      document.querySelector("#card-to-guess").innerHTML = htmlGuessCard;
    }
  }

  guessCard(cardToGuess);

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("turned");
      setTimeout(() => {
        if (cardToGuess.name === card.dataset.cardName) {
          woohooSound.play();
          const newGuess = memoryGame.getCardToGuess();
          if (!newGuess) {
            setTimeout(() => {
              winSound.play();
              document.getElementById("win-alert").showModal();
            }, 1000);
          } else {
            guessCard(newGuess);
            cardToGuess.name = newGuess.name;
          }
        } else {
          dohSound.play();
          card.classList.remove("turned");
          if (document.getElementById("heart-1")) {
            document.getElementById("heart-1").remove();
          } else {
            if (document.getElementById("heart-2")) {
              document.getElementById("heart-2").remove();
            } else {
              if (document.getElementById("heart-3")) {
                document.getElementById("heart-3").remove();
              } else {
                if (document.getElementById("heart-4")) {
                  document.getElementById("heart-4").remove();
                } else {
                  if (document.getElementById("heart-5")) {
                    document.getElementById("heart-5").remove();
                  } else {
                    if (document.getElementById("heart-6")) {
                      document.getElementById("heart-6").remove();
                      setTimeout(() => {
                        gameOverSound.play();
                        document.getElementById("game-over-alert").showModal();
                      }, 1000);
                    }
                  }
                }
              }
            }
          }
        }
      }, 1000);
      console.log(`Card to guess: ${cardToGuess.name}`);
      console.log(`Card clicked: ${card.dataset.cardName}`);
    });
  });
});

document.getElementById("try-again-button").addEventListener("click", () => {
  document.location.reload();
});

document.getElementById("play-again-button").addEventListener("click", () => {
  document.location.reload();
});

document.getElementById("reset-button").addEventListener("click", () => {
  document.location.reload();
});
