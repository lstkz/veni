var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function getPath(data) {
  if (data.path.length) {
    return data.path.join('.');
  }
  return 'value';
}

const V = {
  required: () => (data) => {
    if (data.value == null) {
      return {
        stop: true,
        error: getPath(data) + ' is required'
      };
    }
  },
  string: () => (data) => {
    if (typeof data.value !== 'string') {
      return {
        stop: true,
        error: getPath(data) + ' must be a string'
      };
    }
  },
  number: () => (data) => {
    let num = data.value;
    if (typeof num === 'string') {
      num = Number(num);
    }
    if (typeof num !== 'number' && num != +num) {
      return {
        stop: true,
        error: getPath(data) + ' must be a number'
      };
    }
    return {
      value: num,
    }
  },
  object: () => (data) => {
    if (data.value !== Object(data.value)) {
      return {
        stop: true,
        error: getPath(data) + ' must be an object'
      };
    }
  },
  regex: (regex) => (data) => {
    if (!regex.test(data.value)) {
      return {
        error: getPath(data) + ' must match a regex ' + regex,
      };
    }
  },
  min: (min) => (data) => {
    if (typeof data.value === 'string') {
      if (data.value.length < min) {
        return {
          error: getPath(data) + ' length must be at least ' + min + ' characters long',
        };
      }
    }
    if (data.value < min) {
      return {
        error: getPath(data) + ' must be larger than or equal to ' + min,
      };
    }
  },
  max: (max) => (data) => {
    if (typeof data.value === 'string') {
      if (data.value.length > max) {
        return {
          error: getPath(data) + ' length must be less than or equal ' + max + ' characters long',
        };
      }
    }
    if (data.value > max) {
      return {
        error: getPath(data) + ' must be larger than or equal to ' + max,
      };
    }
  },
  keys: (props) => (data) => {
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
    for (let prop in props) {
      if (!props.hasOwnProperty(prop)) {
        continue;
      }
      let fn = props[prop];
      if (Array.isArray(fn)) {
        fn = V.pipe(...fn);
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
        ret.errors.push(fnRet.error)
      }
      if (fnRet.errors) {
        ret.errors = ret.errors.concat(fnRet.errors);
      }
      if (fnRet.hasOwnProperty('value')) {
        if (fnRet.value !== data[prop]) {
          copy();
          ret.value[prop] = fnRet.value;
        }
      }
    }
    for (let prop in data.value) {
      if (!data.value.hasOwnProperty(prop)) {
        continue;
      }
      if (!props.hasOwnProperty(prop)) {
        ret.errors.push(getPath(data) + ' unknown property: ' + prop)
      }
    }
    return ret;
  },
  pipe: (...fns) => (data) => {
    const ret = {
      value: data.value,
      errors: [],
    };
    for (let i = 0; i < fns.length; i++) {
      let fn = fns[i];
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
      if (fnRet.hasOwnProperty('value')) {
        ret.value = fnRet.value;
      }
      if (fnRet.stop) {
        break;
      }
    }
    return ret;
  },
  schema: (...steps) => (initialValue) => {
    const ret = V.pipe(...steps)({
      value: initialValue,
      path: [],
    });
    if (!ret.errors) {
      ret.errors = [];
    }
    if (ret.error) {
      ret.errors.push(ret.error);
    }
    if (ret.errors.length) {
      const err = new Error('Validation Error');
      err.errors = ret.errors;
      throw err;
    }
    return ret.value;
  },
};


const schema = V.schema(
  V.object(),
  V.keys({
    username: [V.required(), V.string(), V.regex(/^[a-zA-Z0-9]+$/), V.min(3), V.max(30)],
    birthyear: [V.optional(), V.number(), V.min(1900), V.max(2013)],
//    role: [V.enum('user', 'manager')],
  }),
);

try {
  const normalized = schema({
    username: 'username',
    birthyear: '2000',
    foo: 12,
    bar: 33,
  });
  console.log('ret:', normalized);
} catch (e) {
  console.log(e);
  console.log(e.errors);
}

const data = { username: 'abc', birthyear: 1994 };
const dataError = { username: 'abc%^#$#$', birthyear: 30000 };

//suite
////  .add('RegExp#test', function () {
////    /o/.test('Hello World!');
////  })
////  .add('String#indexOf', function () {
////    'Hello World!'.indexOf('o') > -1;
////  })
//  .add('veni', function () {
//    schema(data);
//  })
//  .add('veni error', function () {
//    try {
//      schema(dataError);
//    } catch (e) {
//    }
//  })
//  .on('cycle', function (event) {
//    console.log(String(event.target));
//  })
//  //  .on('complete', function() {
//  //    console.log('Fastest is ' + this.filter('fastest').map('name'));
//  //  })
//  .run({'async': true});