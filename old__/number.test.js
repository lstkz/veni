import number from '../src/number';

describe('number', () => {
  [undefined, null].forEach(value => {
    it(`should ignore optional: ${value}`, () => {
      expect(number()({value})).toMatchSnapshot();
    });
  });

  ['abc', {}, [1, 2, 3]].forEach(value => {
    it(`should return an error for: ${value}`, () => {
      expect(number()({value})).toMatchSnapshot();
    });
  });

  it('should return a custom message', () => {
    expect(number('custom message')({value: 'abc'})).toMatchSnapshot();
  });

  it('should return a value for a number string', () => {
    expect(number()({value: 123})).toMatchSnapshot();
  });

  it('should cast a string number', () => {
    expect(number()({value: '123'})).toMatchSnapshot();
  });
});
