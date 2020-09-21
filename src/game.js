class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player(p1Name, true)
    this.player2 = new Player(p2Name, false)
    this.deck = deck
    this.cardPile = []
    this.gameOn = true
  }

  shuffleDeck(cards) {
    var currentIndex
    var swapIndex
    for (var i = cards.length - 1; i > 0; i--) {
      swapIndex = Math.floor(Math.random() * (i+1))
      currentIndex = cards[i]
      cards[i] = cards[swapIndex]
      cards[swapIndex] = currentIndex
    }
      if (this.deck.length === 52) {
        this.deck = cards;
    } else {
      return cards;
   }
  }

  dealCards() {
    this.shuffleDeck(this.deck)
    for (var i = 0; i < this.deck.length; i++) {
      for (var i = 0; i < 26; i++) {
        this.player1.hand.push(this.deck[i])
        this.deck.splice(i, 1)
      }
      for (var i = 0; i < 26; i++) {
        this.player2.hand.push(this.deck[i])
        this.deck.splice(i, 1)
      }
    }
  }

  playerDeal() {
    if (this.player1.turn === true) {
      this.cardPile.push(this.player1.hand[0])
    } else if (this.player2.turn === true) {
      this.cardPile.push(this.player2.hand[0])
    }
    this.player1.turn = !this.player1.turn
    this.player2.turn = !this.player2.turn
  }

  checkSlapConditions() {
    if (this.cardPile[this.cardPile.length - 1].number === 11) {
      console.log('JACK')
      return true
    }
    if (this.cardPile[this.cardPile.length - 1].number === this.cardPile[this.cardPile.length - 2].number) {
      console.log('DOUBLES')
      return true
    }
    if (this.cardPile[this.cardPile.length - 1].number === this.cardPile[this.cardPile.length - 3].number) {
      console.log('SANDWICH')
      return true
    } else {
      return false
    }
  }

  player1Slap() {
    if (this.checkSlapConditions() === true) {
      this.player1.hand = this.player1.hand.concat(this.cardPile)
      this.player1.shuffleHand(this.player1.hand)
      this.cardPile = []
      return true
    }
  }

  player2Slap() {
    if (this.checkSlapConditions() === true) {
      this.player2.hand = this.player2.hand.concat(this.cardPile)
      this.player2.shuffleHand(this.player2.hand)
      this.cardPile = []
      return true
    }
  }
}
