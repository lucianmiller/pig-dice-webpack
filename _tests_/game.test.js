import Game from './../src/game.js';
import Player from './../src/player.js';

describe('Game', () => {

  test('should correctly create new game object with empty variables', () => {
    const newGame = new Game();
    expect(newGame.players).toEqual([]);
    expect(newGame.currentScore).toEqual(0);
    expect(newGame.currentPlayerIndex).toEqual(0);
    expect(newGame.maxPlayers).toEqual(2);
  });

  test('should ')
});