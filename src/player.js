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

  shuffleHand(cards) {
    var shuffledHand = []
    for (var i = cards.length; i > 0; i--) {
      var swapIndex = Math.floor(Math.random() * (i + 1))
      shuffledHand.push(cards[swapIndex])
    }
    this.hand = shuffledHand
    return this.hand
  }

  saveWinsToStorage() {

  }
}
