var namePlayer1 = document.querySelector('.name-player1')
var namePlayer2 = document.querySelector('.name-player2')
var player1 = document.querySelector('.player1')
var player2 = document.querySelector('.player2')

function toggleHidden() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].classList.toggle('hidden');
  }
}

function displayPlayerOne() {
  toggleHidden(player1)
  namePlayer1.classList.add('hidden')
  var player1Name = document.querySelector('.player1-name')
  var user1 = document.querySelector('.user1')
  user1.innerText = player1Name.value
}

function displayPlayerTwo() {
  toggleHidden(player2)
  namePlayer2.classList.add('hidden')
  var player2Name = document.querySelector('.player2-name')
  var user2 = document.querySelector('.user2')
  user2.innerText = player2Name.value
}
