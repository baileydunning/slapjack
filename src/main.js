var player1;
var player2;
var newGame;

var formPlayer1 = document.querySelector('.form-player1')
var formPlayer2 = document.querySelector('.form-player2')
var playerOneNameField = document.querySelector('.player1-name')
var playerTwoNameField = document.querySelector('.player2-name')
var player1info = document.querySelector('.player1-info')
var player2info = document.querySelector('.player2-info')
var player2hand = document.querySelector('.player2-hand')
var playersSubmitButton = document.querySelector('.player-submit-button')
var gameOn = document.querySelector('.game-on')
var gameOff = document.querySelector('.game-off')
var startGameButton = document.querySelector('.start-game-button')
var activeCard = document.querySelector('.card-active')
var footer = document.querySelector('.footer')


document.addEventListener('keydown', function() {
  if ((player1 instanceof Player) && (player2 instanceof Player)) {
    if (event.code === 'KeyQ') {
      (player1.turn === true) ? playerOneDeal() : console.log('its not your turn')
    } else if (event.code === 'KeyF') {
      playerOneSlap()
    } else if (event.code === 'KeyP') {
      (player2.turn === true) ? playerTwoDeal() : console.log('its not your turn')
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

function removeHidden() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].classList.remove('hidden');
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
  toggleHidden(player1info, player2info)
  addHidden(playersSubmitButton)
  removeHidden(startGameButton)
  if (name === playerOneNameField.value) {
    player1 = new Player(name, true)
  }
  if (name === playerTwoNameField.value) {
    player2 = new Player(name, false)
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
    newGame = new Game
    toggleHidden(gameOn)
    addHidden(gameOff)
    dealCards()
    displayPlayerTurn()
  } else {
    alert('add players')
  }
}

function displayPlayerTurn() {
  var turn = document.querySelector('.player-turn')
  if (player1.turn === true) {
    turn.innerText = `It's ${player1.name}'s turn!`
  } else if (player2.turn === true) {
    turn.innerText = `It's ${player2.name}'s turn!`
  }
}

function playerOneDeal() {
  activeCard.src = player1.hand[0].image || './assets/back.png'
  deck.push(player1.hand[0])
  player1.hand.shift()
  updatePlayer1Hand()
  updateDeck()
  player1.turn = false
  player2.turn = true
  displayPlayerTurn()
}

function playerTwoDeal() {
  activeCard.src = player2.hand[0].image || './assets/back.png'
  deck.push(player2.hand[0])
  player2.hand.shift()
  updatePlayer2Hand()
  updateDeck()
  player2.turn = false
  player1.turn = true
  displayPlayerTurn()
}

function updatePlayer1Hand() {
  var player1hand = document.querySelector('.player1-hand')
  player1hand.innerText = `${player1.hand.length} in hand`
}

function updatePlayer2Hand() {
  var player2hand = document.querySelector('.player2-hand')
  player2hand.innerText = `${player2.hand.length} in hand`
}

function updateDeck() {
  var cardCount = document.querySelector('.card-count')
  cardCount.innerText = `${deck.length} in deck`
}

function playerOneSlap() {
  if (checkSlapConditions() === true) {
    console.log('SLAP (P1)')
    player1.hand = player1.hand.concat(deck)
    deck = []
    activeCard.src = "./assets/back.png"
    updatePlayer1Hand()
    updateDeck()
  } else {
    console.log('p1 can\'t slap')
  }
}

function playerTwoSlap() {
  if (checkSlapConditions() === true) {
    console.log('SLAP (P2)')
    player2.hand = player2.hand.concat(deck)
    deck = []
    activeCard.src = "./assets/back.png"
    updatePlayer2Hand()
    updateDeck()
  } else {
    console.log('p2 can\'t slap')
  }
}

function checkSlapConditions() {
  if (deck[deck.length - 1].number === 11) {
    console.log('jack slap')
    return true
  } else if (deck[deck.length - 1].number === deck[deck.length - 2].number) {
    console.log('doubles slap')
    return true
  } else if (deck[deck.length - 1].number === deck[deck.length - 3].number) {
    console.log('sandwich slap')
    return true
  } else {
    return false
  }
}
