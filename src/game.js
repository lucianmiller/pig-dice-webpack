export default function Game() {
  this.players = [];
  this.currentScore = 0;
  this.currentPlayerIndex = 0;
  this.maxPlayers = 2;
}

Game.prototype.addPlayers = function(...playerObjects) {
  this.players.push(...playerObjects);
}

Game.prototype.switchPlayers = function() {
  if (this.currentPlayerIndex + 1 != this.maxPlayers) {
    this.currentPlayerIndex += 1;
  } else if (this.currentPlayerIndex + 1 == this.maxPlayers) {
    this.currentPlayerIndex = 0;
  }
}

Game.prototype.calculateScore = function(points) {
  if (points !== 1) {
    this.currentScore += points;
  } else if (points === 1) {
    this.currentScore = 0;
    this.switchPlayers();
  }
}

Game.prototype.totalScore = function() {
  this.players[this.currentPlayerIndex].score += this.currentScore;
  this.currentScore = 0;
}