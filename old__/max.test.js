import max from '../src/max';

describe('max', () => {
  describe('string', () => {
    it('should return an error', () => {
      expect(max(2)({value: 'abc'})).toMatchSnapshot();
    });

    it('should return a custom message', () => {
      expect(max(2, 'too long')({value: 'abc'})).toMatchSnapshot();
    });

    it('should not return an error', () => {
      expect(max(4)({value: 'abc'})).toMatchSnapshot();
    });

    it('should not return an error (equal)', () => {
      expect(max(3)({value: 'abc'})).toMatchSnapshot();
    });
  });

  describe('number', () => {
    it('should return an error', () => {
      expect(max(2)({value: 5})).toMatchSnapshot();
    });

    it('should return a custom message', () => {
      expect(max(2, 'too big')({value: 5})).toMatchSnapshot();
    });

    it('should not return an error', () => {
      expect(max(4)({value: 3})).toMatchSnapshot();
    });

    it('should not return an error (equal)', () => {
      expect(max(3)({value: 3})).toMatchSnapshot();
    });
  });
});
