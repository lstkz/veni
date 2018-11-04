import { V, getValidateResult } from '../src';

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

it('should return an error if key is not allowed', () => {
  const schema = V.object();
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
      "message": "is not allowed",
      "path": Array [
        "foo",
      ],
      "type": "object.allowUnknown",
      "value": 1,
    },
  ],
  "value": Object {
    "foo": 1,
  },
}
`);
});

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
