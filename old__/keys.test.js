import required from '../src/required';

describe('required', () => {
  [undefined, null].forEach(value => {
    it(`should return an error for: ${value}`, () => {
      expect(required()({value})).toMatchSnapshot();
    });
  });

  it('should return a custom message', () => {
    expect(required('custom message')({value: null})).toMatchSnapshot();
  });

  it('should not return an error', () => {
    expect(required()({value: 123})).toMatchSnapshot();
  });
});
