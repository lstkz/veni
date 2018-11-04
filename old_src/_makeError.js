
export default (data, msg) => ({
  path: data.path && data.path.length ? data.path.join('.') : 'value',
  error: msg,
});
