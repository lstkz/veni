import string from '../src/string';

describe('string', () => {
  [undefined, null].forEach(value => {
    it(`should ignore optional: ${value}`, () => {
      expect(string()({value})).toMatchSnapshot();
    });
  });

  [1, {}, [1, 2, 3]].forEach(value => {
    it(`should return an error for: ${value}`, () => {
      expect(string()({value})).toMatchSnapshot();
    });
  });

  it('should return a custom message', () => {
    expect(string('custom message')({value: 12})).toMatchSnapshot();
  });

  it('should return a value for a valid string', () => {
    expect(string()({value: 'abc'})).toMatchSnapshot();
  });
});
