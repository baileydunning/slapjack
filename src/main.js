var newGame;
var formPlayer1 = document.querySelector('.form-player1')
var formPlayer2 = document.querySelector('.form-player2')
var playerOneNameField = document.querySelector('.player1-name')
var playerTwoNameField = document.querySelector('.player2-name')
var player1info = document.querySelector('.player1-info')
var player2info = document.querySelector('.player2-info')
var player2hand = document.querySelector('.player2-hand')
var gameOn = document.querySelector('.game-on')
var gameOff = document.querySelector('.game-off')
var startGameButton = document.querySelector('.start-game-button')
var activeCard = document.querySelector('.card-active')

document.addEventListener('load', retrieveWins)
document.addEventListener('keydown', function() {
  if (newGame instanceof Game) {
    if (event.code === 'KeyQ') {
      if ((newGame.player1.turn === true) && (newGame.disablePlayerDeal() === false)) {
        playerOneDeal()
      } else {
        console.log('It\'s Player 2\'s Turn')
      }
    } else if (event.code === 'KeyF') {
      if (newGame.hasAWinner === false) {
        playerOneSlap()
      } else {
        console.log('Start a new game to get slappin\'')
      }
    } else if (event.code === 'KeyP') {
      if ((newGame.player2.turn === true) && (newGame.disablePlayerDeal() === false)) {
        playerTwoDeal()
      } else {
        console.log('It\'s Player 1\'s Turn')
      }
    } else if (event.code === 'KeyJ') {
      if (newGame.hasAWinner === false) {
        playerTwoSlap()
      } else {
        console.log('Start a new game to get slappin\'')
      }
    }
  }
})

document.addEventListener('keyup', function() {
  if (newGame instanceof Game) {
    updatePlayer1Hand()
    updatePlayer2Hand()
    displayPlayerTurn()
    updateDeck()
  }
})

startGameButton.addEventListener('click', startGame)

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

function displayPlayerOne() {
  var playerOneTitle = document.querySelector('.player1-title')
  playerOneTitle.innerText = playerOneNameField.value
}

function displayPlayerTwo() {
  var playerTwoTitle = document.querySelector('.player2-title')
  playerTwoTitle.innerText = playerTwoNameField.value
}

function displayWins() {
  var p1WinCount = document.querySelector('.p1-wins')
  var p2WinCount = document.querySelector('.p2-wins')
  p1WinCount.innerText = `${newGame.player1.wins} Wins`
  p2WinCount.innerText = `${newGame.player2.wins} Wins`
}

function startGame() {
  if (playerOneNameField.value !== '' && playerTwoNameField.value !== '') {
    var p1Name = playerOneNameField.value
    var p2Name = playerTwoNameField.value
    newGame = new Game(p1Name, p2Name)
    displayWins()
    newGame.dealCards()
    updatePlayer1Hand()
    updatePlayer2Hand()
    displayPlayerTurn()
    updateDeck()
    displayPlayerOne()
    displayPlayerTwo()
    toggleHidden(gameOn)
    addHidden(gameOff, formPlayer1, formPlayer2)
    removeHidden(player1info, player2info)
  } else {
    alert('Add players to start!')
  }
}

function retrieveWins() {
  var storedPlayer1Wins = localStorage.getItem('player1Wins')
  var storedPlayer2Wins = localStorage.getItem('player2Wins')
  var parsedPlayer1Wins = JSON.parse(storedPlayer1Wins)
  var parsedPlayer2Wins = JSON.parse(storedPlayer2Wins)
}


function displayPlayerTurn() {
  var turn = document.querySelector('.player-turn')
  if (newGame.player1.turn === true) {
    turn.innerText = `It's ${newGame.player1.name}'s turn!`
  } else if (newGame.player2.turn === true) {
    turn.innerText = `It's ${newGame.player2.name}'s turn!`
  }
}

function updatePlayer1Hand() {
  var player1hand = document.querySelector('.player1-hand')
  player1hand.innerText = `${newGame.player1.hand.length} in hand`
}

function updatePlayer2Hand() {
  var player2hand = document.querySelector('.player2-hand')
  player2hand.innerText = `${newGame.player2.hand.length} in hand`
}

function updateDeck() {
  var cardCount = document.querySelector('.card-count')
  cardCount.innerText = `${newGame.cardPile.length} in deck`
}

function checkLightningRound() {
  if (newGame.triggerLightningRound() === true) {
    newGame.lightningRound()
  }
}

function playerOneDeal() {
  newGame.player1.playCard()
  newGame.playerDeal()
  if (newGame.player1.hand.length !== 0) {
    activeCard.src = newGame.cardPile[newGame.cardPile.length - 1].image
  }
  checkLightningRound()
}

function playerTwoDeal() {
  newGame.player2.playCard()
  newGame.playerDeal()
  if (newGame.player2.hand.length !== 0) {
    activeCard.src = newGame.cardPile[newGame.cardPile.length - 1].image
  }
  checkLightningRound()
}

function playerOneSlap() {
  if (newGame.player1Slap() === true) {
    activeCard.src = "./assets/back.png"
  }
  checkLightningRound()
}

function playerTwoSlap() {
  if (newGame.player2Slap() === true) {
    activeCard.src = "./assets/back.png"
  }
  checkLightningRound()
}

function turnGameOff() {
  toggleHidden(gameOn, gameOff)
  displayWins()
}
