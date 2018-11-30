import { V, getValidateResult } from '../src/index';

describe('base', () => {
  it('should return an error if invalid string', () => {
    const schema = V.object();
    expect(getValidateResult(1, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be an object",
      "path": Array [],
      "type": "object.base",
      "value": 1,
    },
  ],
  "value": 1,
}
`);
    expect(getValidateResult([], schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be an object",
      "path": Array [],
      "type": "object.base",
      "value": Array [],
    },
  ],
  "value": Array [],
}
`);
  });

  it('should return no errors if valid object', () => {
    const schema = V.object();
    expect(getValidateResult({}, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {},
}
`);
  });

  it('should return no error if keys not defined and there are unknown props', () => {
    const schema = V.object();
    expect(getValidateResult({ a: 1 }, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "a": 1,
  },
}
`);
  });
});

describe('keys', () => {
  it('should return an error if key validation failed', () => {
    const schema = V.object().keys({
      foo: V.string(),
    });
    expect(
      getValidateResult(
        {
          foo: 1,
        },
        schema
      )
    ).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be a string",
      "path": Array [
        "foo",
      ],
      "type": "string.base",
      "value": 1,
    },
  ],
  "value": Object {
    "foo": 1,
  },
}
`);
  });

  it('should return a new copy of object if child has a new value', () => {
    const schema = V.object().keys({
      foo: V.string().trim(),
    });
    const value = {
      foo: ' a ',
    };
    const result = getValidateResult(value, schema);
    expect(result).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "foo": "a",
  },
}
`);
    expect(result.value).not.toBe(value);
  });

  it('should not return a new copy of object if child is not changed', () => {
    const schema = V.object().keys({
      foo: V.string().trim(),
    });
    const value = {
      foo: 'a',
    };
    const result = getValidateResult(value, schema);
    expect(result).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "foo": "a",
  },
}
`);
    expect(result.value).toBe(value);
  });

  it('should not return an error if valid values', () => {
    const schema = V.object().keys({
      foo: V.string(),
      foo2: V.string().trim(),
    });
    expect(
      getValidateResult(
        {
          foo: 'str',
          foo2: 'str2 ',
        },
        schema
      )
    ).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "foo": "str",
    "foo2": "str2",
  },
}
`);
  });

  it('should allow unknown props if unknown called', () => {
    const schema = V.object()
      .keys({
        foo: V.string(),
      })
      .unknown();
    expect(
      getValidateResult(
        {
          foo: 'str',
          foo2: 'str2 ',
        },
        schema
      )
    ).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "foo": "str",
    "foo2": "str2 ",
  },
}
`);
  });

  it('should return an error if prop is unknown', () => {
    const schema = V.object().keys({
      foo: V.string(),
    });
    expect(
      getValidateResult(
        {
          foo: 'str',
          foo2: 'str2 ',
        },
        schema
      )
    ).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "is not allowed",
      "path": Array [
        "foo2",
      ],
      "type": "object.allowUnknown",
      "value": "str2 ",
    },
  ],
  "value": Object {
    "foo": "str",
    "foo2": "str2 ",
  },
}
`);
  });
});

describe('optional/null', () => {
  it('should return no errors if optional', () => {
    const schema = V.object().optional();
    expect(getValidateResult(undefined, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": undefined,
}
`);
  });

  it('should return no errors if nullable', () => {
    const schema = V.object().nullable();
    expect(getValidateResult(null, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": null,
}
`);
  });
});
