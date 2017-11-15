import _makeError from './_makeError';

export default (regex, msg = 'must match a regex {{regex}}') => (data) => {
  if (!regex.test(data.value)) {
    return {
      error: _makeError(data, msg.replace('{{regex}}', regex.toString())),
    };
  }
  return undefined;
};
