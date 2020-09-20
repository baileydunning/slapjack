var newGame;

import {formPlayer1, formPlayer2, playerOneNameField, playerTwoNameField, player1info, player2info, player2hand, gameOn, gameOff, startGameButton, activeCard} from './page-elements.js'
import Game from './game.js'
import Player from './player.js'
import {deck} from './cards.js'
console.log(newGame)


document.addEventListener('keydown', function() {
  if (newGame instanceof Game) {
    if (event.code === 'KeyQ') {
      (newGame.player1.turn === true) ? playerOneDeal() : console.log('its not your turn')
    } else if (event.code === 'KeyF') {
      playerOneSlap()
    } else if (event.code === 'KeyP') {
      (newGame.player2.turn === true) ? playerTwoDeal() : console.log('its not your turn')
    } else if (event.code === 'KeyJ') {
      playerTwoSlap()
    }
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
  toggleHidden(player1info)
  addHidden(formPlayer1)
  playerOneTitle.innerText = playerOneNameField.value
}

function displayPlayerTwo() {
  var playerTwoTitle = document.querySelector('.player2-title')
  toggleHidden(player2info)
  addHidden(formPlayer2)
  playerTwoTitle.innerText = playerTwoNameField.value
}

function shuffle(cards) {
  var randomCard = Math.floor(Math.random() * cards.length);
  return cards[randomCard];
}

function dealCards() {
  for (var i = 0; i < deck.length; i++) {
    while (deck.length > 0) {
      var oneCard = shuffle(deck)
      newGame.player1.hand.push(oneCard)
      deck.splice(i, 1)
      var twoCard = shuffle(deck)
      newGame.player2.hand.push(twoCard)
      deck.splice(i, 1)
    }
  }
}

function startGame() {
  if (playerOneNameField.value !== '' && playerTwoNameField.value !== '') {
    var p1Name = playerOneNameField.value
    var p2Name = playerTwoNameField.value
    newGame = new Game(p1Name, p2Name)
    newGame.dealCards()
    displayPlayerOne()
    displayPlayerTwo()
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
  if (newGame.player1.turn === true) {
    turn.innerText = `It's ${newGame.player1.name}'s turn!`
  } else if (newGame.player2.turn === true) {
    turn.innerText = `It's ${newGame.player2.name}'s turn!`
  }
}

function playerOneDeal() {
  activeCard.src = newGame.player1.hand[0].image || './assets/back.png'
  deck.push(newGame.player1.hand[0])
  newGame.player1.hand.shift()
  updatePlayer1Hand()
  updateDeck()
  newGame.player1.turn = false
  newGame.player2.turn = true
  displayPlayerTurn()
}

function playerTwoDeal() {
  activeCard.src = newGame.player2.hand[0].image || './assets/back.png'
  deck.push(newGame.player2.hand[0])
  newGame.player2.hand.shift()
  updatePlayer2Hand()
  updateDeck()
  newGame.player2.turn = false
  newGame.player1.turn = true
  displayPlayerTurn()
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
  cardCount.innerText = `${deck.length} in deck`
}

function playerOneSlap() {
  if (checkSlapConditions() === true) {
    console.log('SLAP (P1)')
    newGame.player1.hand = newGame.player1.hand.concat(deck)
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
    newGame.player2.hand = newGame.player2.hand.concat(deck)
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
