// Business Logic -----------
function Game() {
  this.players = [];
  this.currentScore = 0;
  this.currentPlayerIndex = 0;
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
  if (this.currentPlayerIndex + 1 != this.maxPlayers) {
    this.currentPlayerIndex += 1;
  } else if (this.currentPlayerIndex + 1 == this.maxPlayers) {
    this.currentPlayerIndex = 0;
  }
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
}

Game.prototype.totalScore = function() {
  this.players[this.currentPlayerIndex].score += this.currentScore;
  this.currentScore = 0;
}

// User Interface Logic ----------
displayGameInfo = function(game) {
  $("#current-player").show();
  $("#player-name").text(`Current Player: ${game.players[game.currentPlayerIndex].name}`);
  $("#current-score").text(`Current score: ${game.currentScore}`);
  $("#total-score").text(`Total Score: ${game.players[game.currentPlayerIndex].score}`);
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
    displayGameInfo(newGame);
    if (newGame.players[newGame.currentPlayerIndex].score >= 100) {
      $("#roll").hide();
      $("#hold").hide();
      $("#output").text(`Congratulations! ${newGame.players[newGame.currentPlayerIndex].name} Won the game! Refresh the webpage to play again!`);
    }
    newGame.switchPlayers();
  });
  let newGame = new Game();
  $("form#game-info").submit(function(event) {
    event.preventDefault();
    const playerName = $("input#name").val();
    const maxNumberOfPlayers = parseInt($("#number-of-players").val());
    if (newGame.players.length < maxNumberOfPlayers) {
      let player = new Player(playerName);
      newGame.addPlayers(player);
    }
    if (newGame.players.length == maxNumberOfPlayers) {
      $("#start-game").show();
      $("#add-player").hide();
    }
  });
});