class Memory {
  constructor(cards) {
    this.cards = cards;
    this.cardsLeft = cards;
  }

  shuffleDarksideCards() {
    let m = this.cards.length;
    let t;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
    }
    return t;
  }

  getCardToGuess() {
    for (let i = 0; i < this.cardsLeft.length; i++) {
      const randomCard = this.cardsLeft.splice(
        Math.floor(Math.random() * this.cardsLeft.length),
        1
      );
      if (randomCard.length === 0) {
        console.log("Congrats, the game is finished!");
      }
      return randomCard[i];
    }
  }
}

export default Memory;
