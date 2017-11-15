import _makeError from './_makeError';

export default (max, msg) => (data) => {
  if (typeof data.value === 'string') {
    const stringMsg = msg || 'length must be less than or equal {{max}} characters long';
    if (data.value.length > max) {
      return {
        error: _makeError(data, stringMsg.replace('{{max}}', max)),
      };
    }
  }
  if (data.value > max) {
    const numberMsg = msg || 'must be less than or equal to {{max}}';
    return {
      error: _makeError(data, numberMsg.replace('{{max}}', max)),
    };
  }
  return undefined;
};
