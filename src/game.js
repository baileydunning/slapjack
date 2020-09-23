class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player('player1', p1Name, true)
    this.player2 = new Player('player2', p2Name, false)
    this.deck = deck
    this.cardPile = []
    this.lightningRoundActivated = false
    this.hasAWinner = false
  }

  shuffle(cards) {
    var currentIndex
    var swapIndex
    for (var i = cards.length - 1; i > 0; i--) {
      swapIndex = Math.floor(Math.random() * (i + 1))
      currentIndex = cards[i]
      cards[i] = cards[swapIndex]
      cards[swapIndex] = currentIndex
    }
      if (this.cardPile.length === 52) {
        this.cardPile = cards;
    } else {
      return cards;
   }
  }

  dealCards() {
    this.player1.hand = []
    this.player2.hand = []
    this.cardPile = this.cardPile.concat(this.deck)
    this.shuffle(this.cardPile)
    for (var i = 0; i < this.cardPile.length; i++) {
      while (this.cardPile.length > 0) {
        if (this.cardPile[i] !== undefined) {
          this.player1.hand.push(this.cardPile[i])
          this.cardPile.splice(i, 1)
          this.player2.hand.push(this.cardPile[i])
          this.cardPile.splice(i, 1)
        }
      }
    }
  }

  playerDeal() {
    if (this.player1.turn === true && this.player1.hand[0] !== undefined) {
      if (!this.cardPile.includes(this.player1.hand[0])) {
        this.cardPile.push(this.player1.hand[0])
      }
    } else if (this.player2.turn === true && this.player2.hand[0] !== undefined) {
        if (!this.cardPile.includes(this.player2.hand[0])) {
          this.cardPile.push(this.player2.hand[0])
        }
      }
    if (this.triggerLightningRound() === false) {
      this.player1.turn = !this.player1.turn
      this.player2.turn = !this.player2.turn
    }
  }

  disablePlayerDeal() {
    if (this.cardPile.length === 0) {
      return false
    } else if ((this.cardPile[this.cardPile.length - 1].number === 11) && (this.triggerLightningRound() === true)) {
      return true
    } else {
      return false
    }
  }

  checkSlapConditions() {
    if (this.cardPile.length === 0) {
      return false
    }
    if (this.cardPile[this.cardPile.length - 1].number === 11) {
      console.log('JACK')
      return true
    } else if (this.lightningRoundActivated === false) {
      if (this.cardPile[this.cardPile.length - 1].number === this.cardPile[this.cardPile.length - 2].number) {
        console.log('DOUBLES')
        return true
      }
      if (this.cardPile[this.cardPile.length - 1].number === this.cardPile[this.cardPile.length - 3].number) {
        console.log('SANDWICH')
        return true
      }
    } else {
      return false
    }
  }

  player1Slap() {
    if (this.checkSlapConditions() === true) {
      this.player1.hand = this.player1.hand.concat(this.cardPile)
      this.shuffle(this.player1.hand)
      this.cardPile = []
      this.player1.turn = true
      this.player2.turn = false
      return true
    } else {
      if (this.lightningRoundActivated === true) {
        this.winGame()
      }
      console.log('BAD SLAP')
      var badSlap = this.player1.hand.shift()
      if (badSlap !== undefined) {
        this.player2.hand.push(badSlap)
        return false
      }
    }
  }

  player2Slap() {
    if (this.checkSlapConditions() === true) {
      this.player2.hand = this.player2.hand.concat(this.cardPile)
      this.shuffle(this.player2.hand)
      this.cardPile = []
      this.player2.turn = true
      this.player1.turn = false
      return true
    } else {
      if (this.lightningRoundActivated === true) {
        this.winGame()
      }
      console.log('BAD SLAP')
      var badSlap = this.player2.hand.shift()
      if (badSlap !== undefined) {
        this.player1.hand.push(badSlap)
        return false
      }
    }
  }

  triggerLightningRound() {
    if (this.player1.hand.length === 0) {
      this.player2.turn = true
      this.lightningRoundActivated = true
      return true
    } else if (this.player2.hand.length === 0) {
      this.player1.turn = true
      this.lightningRoundActivated = true
      return true
    } else {
      this.lightningRoundActivated = false
      return false
    }
  }

  checkEmptyHands() {
    if ((this.player1.hand.length === 0) && (this.player2.hand.length === 0)) {
        if (this.player2.hand.length === 0) {
          this.player1.hand = this.player1.hand.concat(this.cardPile)
          this.cardPile = []
          this.shuffle(this.player1.hand)
          return true
      } else if (this.player1.hand.length === 0) {
          this.player2.hand = this.player2.hand.concat(this.cardPile)
          this.cardPile = []
          this.shuffle(this.player2.hand)
          return true
      } else {
          return false
      }
    }
  }

  lightningRound() {
    if (this.lightningRoundActivated === true) {
      this.checkEmptyHands()
      if ((this.cardPile.length !== 0) && (this.cardPile[this.cardPile.length - 1].number === 11)) {
       var win = setInterval(function() {
         if (newGame.cardPile.length === 0) {
           clearInterval(win)
           newGame.winGame()
         }
       }, 1000)
      }
    }
  }

  winGame() {
    if (this.player1.hand.length === 0 && this.lightningRoundActivated === true) {
      console.log('P2 WINS')
      this.player2.wins += 1
      this.player2.saveWinsToStorage()
      this.hasAWinner = true
      turnGameOff()
    } else if (this.player2.hand.length === 0 && this.lightningRoundActivated === true) {
      console.log('P1 WINS')
      this.player1.wins += 1
      this.player1.saveWinsToStorage()
      this.hasAWinner = true
      turnGameOff()
    }
  }
}
