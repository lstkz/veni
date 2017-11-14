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

//  it('should return a custom message', () => {
//    expect(required('custom message')({data: null})).toMatchSnapshot();
//  });
});
