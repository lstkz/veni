import _makeError from './_makeError';
import pipe from './pipe';

export default (props, options = {allowUnknown: false, stripUnknown: false}) => (data) => {
  let isCopy = false;
  const ret = {
    value: data.value,
    errors: [],
  };
  const copy = () => {
    if (!isCopy) {
      ret.value = Object.assign({}, ret.value);
      isCopy = true;
    }
  };
  for (const prop in props) {
    let fn = props[prop];
    if (Array.isArray(fn)) {
      fn = pipe(...fn);
    }
    const fnData = {
      value: ret.value[prop],
      path: data.path.concat(prop),
    };
    const fnRet = fn(fnData);
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
      if (fnRet.value !== data[prop]) {
        copy();
        ret.value[prop] = fnRet.value;
      }
    }
  }
  if (options.allowUnknown && !options.stripUnknown) {
    return ret;
  }
  for (const prop in data.value) {
    if (!(prop in props)) {
      if (options.stripUnknown) {
        copy();
        delete ret.value[prop];
      } else {
        ret.errors.push(_makeError(data, `unknown property: ${prop}`));
      }
    }
  }
  return ret;
};
