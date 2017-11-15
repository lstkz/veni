import min from '../src/min';

describe('min', () => {
  describe('string', () => {
    it('should return an error', () => {
      expect(min(10)({value: 'abc'})).toMatchSnapshot();
    });

    it('should return a custom message', () => {
      expect(min(10, 'too short')({value: 'abc'})).toMatchSnapshot();
    });

    it('should not return an error', () => {
      expect(min(2)({value: 'abc'})).toMatchSnapshot();
    });

    it('should not return an error (equal)', () => {
      expect(min(3)({value: 'abc'})).toMatchSnapshot();
    });
  });

  describe('number', () => {
    it('should return an error', () => {
      expect(min(10)({value: 5})).toMatchSnapshot();
    });

    it('should return a custom message', () => {
      expect(min(10, 'too small')({value: 5})).toMatchSnapshot();
    });

    it('should not return an error', () => {
      expect(min(2)({value: 3})).toMatchSnapshot();
    });

    it('should not return an error (equal)', () => {
      expect(min(3)({value: 3})).toMatchSnapshot();
    });
  });
});
