class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player(p1Name, true)
    this.player2 = new Player(p2Name, false)
    this.deck = deck
    this.cardPile = []
    this.gameCount = 0
    this.lightningRoundActivated = false
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
      if (this.deck.length === 52) {
        this.deck = cards;
    } else {
      return cards;
   }
  }

  dealCards() {
    this.shuffle(this.deck)
    for (var i = 0; i < this.deck.length; i++) {
      while (this.deck.length > 0) {
        if (this.deck[i] !== undefined) {
          this.player1.hand.push(this.deck[i])
          this.deck.splice(i, 1)
          this.player2.hand.push(this.deck[i])
          this.deck.splice(i, 1)
        }
      }
    }
  }

  playerDeal() {
    if (this.player1.turn === true && this.player1.hand[0] !== undefined) {
      this.cardPile.push(this.player1.hand[0])
    } else if (this.player2.turn === true && this.player2.hand[0] !== undefined) {
      this.cardPile.push(this.player2.hand[0])
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
      console.log('player deal is disabled')
      return true
    } else {
      return false
    }
  }

  checkSlapConditions() {
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
      console.log('BAD SLAP')
      var badSlap = this.player1.hand.shift()
      this.player2.hand.push(badSlap)
      if (this.lightningRoundActivated === true) {
        this.winGame()
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
      console.log('BAD SLAP')
      var badSlap = this.player2.hand.shift()
      this.player1.hand.push(badSlap)
      if (this.lightningRoundActivated === true) {
        this.winGame()
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
         } else {
           console.log('someone has to slap')
         }
       }, 1000)
     } else {
       console.log('lightning round! keep dealing')
     }
    }
  }

  winGame() {
    if (this.player1.hand.length === 0 && this.lightningRoundActivated === true) {
      console.log('P2 WINS')
      this.player2.wins += 1
      this.gameCount++
      this.startNewGame()
    } else if (this.player2.hand.length === 0 && this.lightningRoundActivated === true) {
      console.log('P1 WINS')
      this.player1.wins += 1
      this.gameCount++
      this.startNewGame()
    }
  }

  startNewGame() {
    console.log('time to start a new game')
    this.deck = this.player1.hand.concat(this.player2.hand)
  }
}
