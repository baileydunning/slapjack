class Player {
  constructor(id, name, turn) {
    this.id = id
    this.name = name
    this.wins = JSON.parse(localStorage.getItem(`${this.id}Wins`)) || 0
    this.hand = []
    this.turn = turn
  }

  playCard() {
    this.hand.shift()
  }

  saveWinsToStorage() {
    var stringifiedWins = JSON.stringify(this.wins);
    localStorage.setItem(`${this.id}Wins`, stringifiedWins);
  }
}
