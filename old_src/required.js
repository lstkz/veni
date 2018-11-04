import _makeError from './_makeError';

export default (msg = 'is required') => (data) => {
  if (data.value == null) {
    return {
      stop: true,
      error: _makeError(data, msg),
    };
  }
  return undefined;
};
