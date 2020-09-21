import Player from './player.js'
import {deck} from './cards.js'

export default class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player(p1Name, true)
    this.player2 = new Player(p2Name, false)
    this.deck = deck
    this.cardPile = []
    this.gameOn = true
  }

  shuffle(deck) {
    var randomCard = Math.floor(Math.random() * deck.length);
    return deck[randomCard];
  }

  dealCards() {
    for (var i = 0; i < this.deck.length; i++) {
      while (this.deck.length > 0) {
        var oneCard = this.shuffle(this.deck)
        this.player1.hand.push(oneCard)
        this.deck.splice(i, 1)
        var twoCard = this.shuffle(this.deck)
        this.player2.hand.push(twoCard)
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
      this.cardPile = []
      return true
    } else {
      return 'Sucks to suck'
    }
  }

  player2Slap() {
    if (this.checkSlapConditions() === true) {
      this.player2.hand = this.player2.hand.concat(this.cardPile)
      this.cardPile = []
      return true
    } else {
      return 'Sucks to suck'
    }
  }
}
