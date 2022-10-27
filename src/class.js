class Memory {
  constructor(cards) {
    this.cards = cards;
    this.cardsLeft = cards;
    this.hearts = 6;
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
      return randomCard[i];
    }
  }
}

export default Memory;
