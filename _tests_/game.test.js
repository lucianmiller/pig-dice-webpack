import Game from './../src/game.js';
import Player from './../src/player.js';

describe('Game', () => {
  let newGame;

  beforeEach(() => {
    newGame = new Game();
  });

  test('should correctly create new game object with empty variables', () => {
    expect(newGame.players).toEqual([]);
    expect(newGame.currentScore).toEqual(0);
    expect(newGame.currentPlayerIndex).toEqual(0);
    expect(newGame.maxPlayers).toEqual(2);
  });

  test('should push 1 Player object into Game objects players array', () => {
    const player1 = new Player("Sam");
    newGame.addPlayers(player1);
    expect(newGame.players[0]).toEqual(player1);
  });

  test('should push multiple Player objects into Game objects players array', () => {
    const player1 = new Player("Sam");
    const player2 = new Player ("Sally");
    newGame.addPlayers(player1, player2);
    expect(newGame.players[0]).toEqual(player1);
    expect(newGame.players[1]).toEqual(player2);
  });

  test('should switch between the players stored in Game object', () => {
    const player1 = new Player("Sam");
    const player2 = new Player ("Sally");
    newGame.addPlayers(player1, player2);
    expect(newGame.currentPlayerIndex).toEqual(0);
    newGame.switchPlayers();
    expect(newGame.currentPlayerIndex).toEqual(1);
  });
});