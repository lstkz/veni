import _makeError from './_makeError';

export default (msg = 'must be a string') => (data) => {
  if (data.value == null) {
    return {
      stop: true,
    };
  }
  if (typeof data.value !== 'string') {
    return {
      stop: true,
      error: _makeError(data, msg),
    };
  }
  return undefined;
};
