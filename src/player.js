export default class Player {
  constructor(name, turn) {
    this.id = Date.now()
    this.name = name
    this.wins = 0
    this.hand = []
    this.turn = turn
  }

  playCard() {

  }

  saveWinsToStorage() {

  }
}
