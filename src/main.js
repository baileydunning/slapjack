var player1;
var player2;

var formPlayer1 = document.querySelector('.form-player1')
var formPlayer2 = document.querySelector('.form-player2')
var playerOneNameField = document.querySelector('.player1-name')
var playerTwoNameField = document.querySelector('.player2-name')
var player1info = document.querySelector('.player1-info')
var player2info = document.querySelector('.player2-info')
var playersSubmitButton = document.querySelector('.player-submit-button')
var gameOn = document.querySelector('.game-on')
var gameOff = document.querySelector('.game-off')
var startGameButton = document.querySelector('.start-game-button')
var activeCard = document.querySelector('.card-active')

document.addEventListener('keydown', function() {
  if ((player1 instanceof Player) && (player2 instanceof Player)) {
    if (event.code === 'KeyQ') {
      playerOneDeal()
    } else if (event.code === 'KeyF') {
      playerOneSlap()
    } else if (event.code === 'KeyP') {
      playerTwoDeal()
    } else if (event.code === 'KeyJ') {
      playerTwoSlap()
    }
  }
})
playersSubmitButton.addEventListener('click', function() {
  createPlayerOne()
  createPlayerTwo()
})

function addHidden() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].classList.add('hidden');
  }
}

function toggleHidden() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].classList.toggle('hidden');
  }
}

function errorHandling() {
  if (playerOneNameField.value === '') {
    return true
  } else if (playerTwoNameField.value === '') {
    return true
  } else {
    return false
  }
}

function createPlayerOne() {
  if (errorHandling() === true) {
    console.log('ERROR')
    return
  } else {
      var playerOneTitle = document.querySelector('.player1-title')
      toggleHidden(player1info)
      addHidden(formPlayer1)
      createPlayers(playerOneNameField.value)
      playerOneTitle.innerText = playerOneNameField.value
    }
  }

function createPlayerTwo() {
  if (errorHandling() === true) {
    console.log('ERROR')
    return
  } else {
      var playerTwoTitle = document.querySelector('.player2-title')
      toggleHidden(player2info)
      addHidden(formPlayer2)
      createPlayers(playerTwoNameField.value)
      playerTwoTitle.innerText = playerTwoNameField.value
  }
}

function createPlayers(name) {
  toggleHidden(startGameButton)
  addHidden(playersSubmitButton)
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
    while (deck.length > 0) {
      var oneCard = shuffle(deck)
      player1.hand.push(oneCard)
      deck.splice(i, 1)
      var twoCard = shuffle(deck)
      player2.hand.push(twoCard)
      deck.splice(i, 1)
    }
  }
}

function startGame() {
  if ((player1 instanceof Player) && (player2 instanceof Player)) {
    toggleHidden(gameOn)
    addHidden(gameOff)
    dealCards()
  } else {
    alert('add players')
  }
}

function playerOneDeal() {
  activeCard.src = player1.hand[0].image
  deck.push(player1.hand[0])
  player1.hand.shift()
}

function playerOneSlap() {
  console.log('SLAP (P1)')
  player1.hand = player1.hand.concat(deck)
  deck = []
  activeCard.src = "./assets/back.png"
}

function playerTwoDeal() {
  activeCard.src = player2.hand[0].image
  deck.push(player2.hand[0])
  player2.hand.shift()
}

function playerTwoSlap() {
  console.log('SLAP (P2)')
  player2.hand = player2.hand.concat(deck)
  deck = []
  activeCard.src = "./assets/back.png"
}
