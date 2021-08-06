// Business Logic -----------
function Game() {
  this.players = [];
  this.currentScore = 0;
  this.currentPlayer = 0;
  this.maxPlayers = 2;
}

function Player(name) {
  this.name = name;
  this.score = 0;
}

Game.prototype.addPlayers = function(...playerObjects) {
  this.players.push(...playerObjects);
}

Game.prototype.switchPlayers = function() {
  if (this.currentPlayer + 1 != this.maxPlayers) {
    this.currentPlayer += 1;
  } else if (this.currentPlayer + 1 == this.maxPlayers) {
    this.currentPlayer = 0;
  }
  console.log("current player: " + this.currentPlayer);
}

function rollD6() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}

Game.prototype.calculateScore = function(points) {
  if (points !== 1) {
    this.currentScore += points;
  } else if (points === 1) {
    this.currentScore = 0;
    this.switchPlayers();
  }
  
  console.log("points: " + points);
  console.log("current score: " + this.currentScore);
}

Game.prototype.totalScore = function() {
  this.players[this.currentPlayer].score += this.currentScore;
  this.currentScore = 0;
  console.log("total score: " + this.players[this.currentPlayer].score);
}

// User Interface Logic ----------
displayGameInfo = function(game) {
  $("#current-player").show();
  $("#player-name").text(`Current Player: ${game.players[game.currentPlayer].name}`);
  $("#current-score").text(`Current score: ${game.currentScore}`);
  $("#total-score").text(`Total Score: ${game.players[game.currentPlayer].score}`);
}

$(document).ready(function() {
  $("#start-game").on("click", function() {
    $("form#game-info").hide();
    $("#start-game").hide();
    $("#buttons").show();
    displayGameInfo(newGame);
  });
  $("#roll").on("click", function() {
    let roll = rollD6();
    newGame.calculateScore(roll);
    $("#output").text(roll);
    displayGameInfo(newGame);
  });
  $("#hold").on("click", function() {
    newGame.totalScore();
    newGame.switchPlayers();
  });
  let newGame = new Game();
  $("form#game-info").submit(function(event) {
    event.preventDefault();
    const playerName = $("input#name").val();
    const numberOfPlayers = parseInt($("#number-of-players").val());
    if (newGame.players.length < numberOfPlayers) {
      let player = new Player(playerName);
      newGame.addPlayers(player);
    }
    if (newGame.players.length == numberOfPlayers) {
      $("#start-game").show();
      $("#add-player").hide();
    }
    console.log(newGame);
    console.log(numberOfPlayers);
  });
});