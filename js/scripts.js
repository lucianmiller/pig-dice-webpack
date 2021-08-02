// Business Logic -----------
function Game() {
  this.players = [];
  this.currentScore = 0;
  this.currentPlayer = 0;
}

function Player(name) {
  this.name = name;
  this.score = 0;
}

Game.prototype.addPlayers = function(...playerObjects) {
  this.players.push(...playerObjects);
}

function diceRoller(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let newGame = new Game();

let player1 = new Player("Fred");
let player2 = new Player("Bob");

newGame.addPlayers(player1, player2);

console.log(newGame.players);
console.log(diceRoller(1,6))