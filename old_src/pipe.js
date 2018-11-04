export default (...fns) => (data) => {
  const ret = {
    value: data.value,
    errors: [],
  };
  for (let i = 0; i < fns.length; i++) {
    const fn = fns[i];
    const fnRet = fn({
      value: ret.value,
      path: data.path,
    });
    if (!fnRet) {
      continue;
    }
    if (fnRet.error) {
      ret.errors.push(fnRet.error);
    }
    if (fnRet.errors) {
      ret.errors = ret.errors.concat(fnRet.errors);
    }
    if ('value' in fnRet) {
      ret.value = fnRet.value;
    }
    if (fnRet.stop) {
      break;
    }
  }
  return ret;
};
