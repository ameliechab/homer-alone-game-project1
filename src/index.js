import Memory from "./classes.js";

const cards = [
  { name: "marge", img: "marge-simpson.jpg" },
  { name: "bart", img: "bart-simpson.jpg" },
  { name: "lisa", img: "lisa-simpson.jpg" },
  { name: "maggie", img: "maggie-simpson.jpg" },
  { name: "abraham", img: "abraham-simpson.jpg" },
  { name: "chien", img: "chien-simpson.jpg" },
];

const memoryGame = new Memory(cards);

memoryGame.shuffleDarksideCards();

window.addEventListener("load", (event) => {
  let htmlCards = "";
  memoryGame.cards.forEach((pic) => {
    htmlCards += `
        <div class= "card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(/images/${pic.img}) no-repeat"></div>
        </div>
        `;
  });
  document.querySelector("#darkside-card").innerHTML = htmlCards;

  let cardToGuess = memoryGame.getCardToGuess();

  function guessCard(card) {
    let htmlGuessCard = `
  <div class= "card turned" data-card-name="${card.name}">
        <div class="back" name="${card.img}"></div>
        <div class="front" style="background: url(/images/${card.img}) no-repeat"></div>
        </div>`;
    document.querySelector("#card-to-guess").innerHTML = htmlGuessCard;
  }

  guessCard(cardToGuess);

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("turned");
      setTimeout(() => {
        if (cardToGuess.name === card.dataset.cardName) {
          const newGuess = memoryGame.getCardToGuess();
          console.log(newGuess);
          guessCard(newGuess);
          cardToGuess.name = newGuess.name;
        } else {
          card.classList.remove("turned");
          // perte de point de vie ici
        }
      }, 1000);
      console.log(`Card to guess: ${cardToGuess.name}`);
      console.log(`Card clicked: ${card.dataset.cardName}`);
    });
  });
});
