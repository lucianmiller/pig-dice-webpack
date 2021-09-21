import Player from './../src/player.js';

describe('Player', () => {

  test('should correctly a create new player object with a name and a score of 0', () => {
    const player1 = new Player("Sam");
    expect(player1.name).toEqual("Sam");
    expect(player1.score).toEqual(0);
  });
});