import Player from './player.js'
import {deck} from './cards.js'

export default class Game {
  constructor(p1Name, p2Name) {
    this.player1 = new Player(p1Name, true)
    this.player2 = new Player(p2Name, false)
    this.deck = deck
    this.gameOn = true
  }

  shuffle(cards) {

  }

  dealCards() {
    console.log('dfggdfg')
  }
}
