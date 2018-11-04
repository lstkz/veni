import _makeError from './_makeError';
import _optional from './_optional';
import pipe from './pipe';

export default (msg = 'must be a number') => pipe(
  _optional(),
  (data) => {
    let num = data.value;
    if (typeof num === 'string') {
      num = Number(num);
    }
    // eslint-disable-next-line eqeqeq, no-implicit-coercion
    if (typeof num !== 'number' || num != +num) {
      return {
        stop: true,
        error: _makeError(data, msg),
      };
    }
    return {
      value: num,
    };
  },
);
