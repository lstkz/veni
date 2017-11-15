import _makeError from './_makeError';
import _optional from './_optional';
import pipe from './pipe';

export default (msg = 'must be an') => pipe(
  _optional(),
  (data) => {
    if (typeof data.value !== 'object') {
      return {
        stop: true,
        error: _makeError(data, msg),
      };
    }
    return undefined;
  },
);
