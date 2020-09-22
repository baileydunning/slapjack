class Player {
  constructor(name, turn) {
    this.name = name
    this.wins = 0
    this.hand = []
    this.turn = turn
  }

  playCard() {
    this.hand.shift()
  }

  saveWinsToStorage() {

  }
}
