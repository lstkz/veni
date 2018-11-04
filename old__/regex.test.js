import regex from '../src/regex';

describe('regex', () => {
  it('should return an error', () => {
    expect(regex(/\w+/)({value: ':)'})).toMatchSnapshot();
  });

  it('should return a custom message', () => {
    expect(regex(/\w+/, 'custom message')({value: ':)'})).toMatchSnapshot();
  });
});
