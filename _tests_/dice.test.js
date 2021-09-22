import rollD6 from './../src/dice.js'

describe('rollD6', () => {

  test('should randomly pick a number between 1 and 6', () => {
    let roll = rollD6();
    expect(roll).toBeGreaterThan(0);
    expect(roll).toBeLessThan(7);
  });
});