import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Game from './game.js';
import Player from './player.js';
import rollD6 from './dice.js';

function displayGameInfo(game) {
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