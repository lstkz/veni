import keys from '../src/keys';
import string from '../src/string';

describe('keys', () => {
  it('should return an error', () => {
    expect(keys({
      foo: string(),
    })({
      path: [],
      value: {foo: 123},
    })).toMatchSnapshot();
  });

  it('should return two errors', () => {
    expect(keys({
      foo: string(),
      bar: string(),
    })({
      path: [],
      value: {foo: 123, bar: 456},
    })).toMatchSnapshot();
  });

  it('should return an error for unknown properties', () => {
    expect(keys({
      foo: string(),
    })({
      path: [],
      value: {foo: '123', ab: 10},
    })).toMatchSnapshot();
  });

  it('should not return an error for unknown properties if allowUnknown = true', () => {
    expect(keys({
      foo: string(),
    }, {allowUnknown: true})({
      path: [],
      value: {foo: '123', ab: 10},
    })).toMatchSnapshot();
  });

  it('should strip unknown properties if stripUnknown = true', () => {
    const input = {foo: '123', ab: 10};
    const result = keys({
      foo: string(),
    }, {stripUnknown: true})({
      path: [],
      value: {foo: '123', ab: 10},
    });
    expect(result).toMatchSnapshot();
    expect(input).not.toBe(result.value);
  });

//  it('should return a custom message', () => {
//    expect(required('custom message')({value: null})).toMatchSnapshot();
//  });
//
//  it('should not return an error', () => {
//    expect(required()({value: 123})).toMatchSnapshot();
//  });
});
