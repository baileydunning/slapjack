# Slapjack

## Project Description

For this project, I built an application to play the card game, Slapjack, from scratch. This game is designed for two players to compete against each other on the same desktop device. A detailed description of the project's expectations can be found [here](https://frontend.turing.io/projects/module-1/slapjack.html).

### How To Access This Application
+ Since this is a private repository, `git clone` to local device, `cd` into the `slapjack` directory & type `open index.html` in Terminal.

## Programming Languages Used
+ HTML in `index.html`
+ CSS in `styles.css`
+ Javascript in `main.js`, `game.js`, `player.js`, & `deck.js`

## Functionality
+ When the application is first opened, players enter their names by typing into the input fields under each card image then click "Start Game"
+ Once a game is initiated, the deck is then shuffled and evenly distributed to each of the players' hands
+ When it's their turn, players deal cards from their hand to a center pile by keying `q` for P1 and `p` for P2
+ Either players can "slap" the center pile at any time using by keying `f` for P1 and `j` for P2. Valid slaps include Jacks, Doubles (top 2 cards on pile match) & Sandwiches (top & third cards on pile match). If the slap is valid, all of the cards in the center pile are then transferred to that player's hand and all of the cards are shuffled
+ In the event of a "bad slap," the guilty player forfeits a card to the opposing player's hand
+ Once one of the players has an empty hand, the "lightning round" is activated, making it so the player with cards is the only one that can deal. Once a Jack is exposed, the player with cards is then able to win the game by slapping the pile first. In the event that the opposing player with no cards slaps the Jack, the cards in the center pile are transferred to their hand and gameplay resumes per usual.
+ If the lightning round is activated and either player commits a bad slap, the opposing player automatically wins.
+ Wins are automatically saved to local storage, however, if the page is refreshed, the user has to enter the player names again.

![ezgif-3-6a05695d0bdb](https://user-images.githubusercontent.com/67710155/93959548-2af49000-fd16-11ea-9612-4f625af811e7.gif)

## Next Steps
+ Save all player data to local storage
+ Provide a ux-friendly way to clear local storage
+ Fix all bugs
+ Refactor all code to be DRY & utilize event delegation

## Contributors
+ [Bailey Dunning](github.com/baileydunning)
+ [Kaitlin Davis (Code Review)](https://github.com/NiltiakSivad)
+ [Hannah Hudson (Project Manager)](https://github.com/hannahhch)
