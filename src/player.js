import {deck} from './cards.js'

export default class Player {
  constructor(name, turn) {
    this.id = Date.now()
    this.name = name
    this.wins = 0
    this.hand = []
    this.turn = turn
  }

  playCard() {
    this.hand.shift()
  }

  slap() {
    this.hand = this.hand.concat(newGame.cardPile)
  }

  saveWinsToStorage() {

  }
}
