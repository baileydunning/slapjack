var player1;
var player2;

var formPlayer1 = document.querySelector('.form-player1')
var playerOneNameField = document.querySelector('.player1-name')
var player1info = document.querySelector('.player1-info')
var formPlayer2 = document.querySelector('.form-player2')
var playerTwoNameField = document.querySelector('.player2-name')
var player2info = document.querySelector('.player2-info')

document.addEventListener('keydown', function() {
  if (event.code === 'KeyQ') {
    playerOneDeal()
  } else if (event.code === 'KeyF') {
    playerOneSlap()
  } else if (event.code === 'KeyP') {
    playerTwoDeal()
  } else if (event.code === 'KeyJ') {
    playerTwoSlap()
  }
})

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
    player1 = new Player(name)
  }
  if (name === playerTwoNameField.value) {
    player2 = new Player(name)
  }
}

function shuffle(cards) {
  var randomCard = Math.floor(Math.random() * cards.length);
  return cards[randomCard];
}

function dealCards() {
  for (var i = 0; i < deck.length; i++) {
    var oneCard = shuffle(deck)
    player1.hand.push(oneCard)
    deck.splice(i, 1)
    var twoCard = shuffle(deck)
    player2.hand.push(twoCard)
    deck.splice(i, 1)
  }
}

function playerOneDeal() {
  console.log('you pressed Q!')
}

function playerOneSlap() {
  console.log('you pressed F!')
}

function playerTwoDeal() {
  console.log('you pressed P!')
}

function playerTwoSlap() {
  console.log('you pressed J!')
}
