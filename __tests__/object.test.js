import object from '../src/object';

describe('object', () => {
  [undefined, null].forEach(value => {
    it(`should ignore optional: ${value}`, () => {
      expect(object()({value})).toMatchSnapshot();
    });
  });

  [1, 'abc', [1, 2, 3]].forEach(value => {
    it(`should return an error for: ${value}`, () => {
      expect(object()({value})).toMatchSnapshot();
    });
  });

  it('should return a custom message', () => {
    expect(object('custom message')({value: 12})).toMatchSnapshot();
  });

  it('should return a value for a valid object', () => {
    expect(object()({value: {foo: 'bar'}})).toMatchSnapshot();
  });
});
