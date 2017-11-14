import required from '../src/required';

describe('required', () => {
  [undefined, null].forEach(val => {
    it(`should return an error for: ${val}`, () => {
      expect(required()({data: val})).toMatchSnapshot();
    });
  });

  it('should return a custom message', () => {
    expect(required('custom message')({data: null})).toMatchSnapshot();
  });
});
