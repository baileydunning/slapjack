var players = []

var formPlayer1 = document.querySelector('.form-player1')
var playerOneNameField = document.querySelector('.player1-name')
var player1info = document.querySelector('.player1-info')
var formPlayer2 = document.querySelector('.name-player2')
var playerTwoNameField = document.querySelector('.player2-name')
var player2info = document.querySelector('.player2-info')

function toggleHidden() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].classList.toggle('hidden');
  }
}

function createPlayerOne() {
  toggleHidden(player1info)
  formPlayer1.classList.add('hidden')
  var playerOneTitle = document.querySelector('.player1-title')
  playerOneTitle.innerText = playerOneNameField.value
  createPlayer(playerOneNameField.value)
}

function createPlayerTwo() {
  toggleHidden(player2info)
  formPlayer2.classList.add('hidden')
  var playerTwoTitle = document.querySelector('.player2-title')
  playerTwoTitle.innerText = playerTwoNameField.value
  createPlayer(playerTwoNameField.value)
}

function createPlayer(name) {
  if (name === playerOneNameField.value) {
    var player1 = new Player(name)
    players.unshift(player1)
  }
  if (name === playerTwoNameField.value) {
    var player2 = new Player(name)
    players.push(player2)
  }
}

function shuffleCards(deck) {
  var randomCard = Math.floor(Math.random() * deck.length);
  return deck[randomCard];
}
