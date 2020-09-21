import Player from './player.js'
import {deck} from './cards.js'

export default class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player(p1Name, true)
    this.player2 = new Player(p2Name, false)
    this.centerPile = 0
    this.gameOn = true
  }

  shuffle(deck) {
    var randomCard = Math.floor(Math.random() * deck.length);
    return deck[randomCard];
  }

  dealCards() {
    for (var i = 0; i < deck.length; i++) {
      while (deck.length > 0) {
        var oneCard = this.shuffle(deck)
        this.player1.hand.push(oneCard)
        deck.splice(i, 1)
        var twoCard = this.shuffle(deck)
        this.player2.hand.push(twoCard)
        deck.splice(i, 1)
      }
    }
  }
}
