import _makeError from './_makeError';

export default (min, msg) => (data) => {
  if (typeof data.value === 'string') {
    const stringMsg = msg || 'length must be at least {{min}} characters long';
    if (data.value.length < min) {
      return {
        error: _makeError(data, stringMsg.replace('{{min}}', min)),
      };
    }
  }
  if (data.value < min) {
    const numberMsg = msg || 'must be larger than or equal to {{min}}';
    return {
      error: _makeError(data, numberMsg.replace('{{min}}', min)),
    };
  }
  return undefined;
};
