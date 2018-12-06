import { V, getValidateResult } from '../src/index';

it('should throw an error if values not provided', () => {
  const schema = V.or();
  expect(() =>
    getValidateResult(null, schema)
  ).toThrowErrorMatchingInlineSnapshot(`"Or value not set"`);
});

describe('base', () => {
  const schema = V.or().items(
    V.object().keys({
      type: V.enum().literal('foo_value'),
      data: V.object().keys({
        foo: V.number(),
      }),
    }),
    V.object().keys({
      type: V.enum().literal('bar_value'),
      data: V.object().keys({
        bar: V.number(),
      }),
    })
  );
  it('should return an error if does not match any values', () => {
    getValidateResult('a', schema);
    expect(getValidateResult(1, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must one of the required formats",
      "path": Array [],
      "type": "or.base",
      "value": 1,
    },
  ],
  "value": 1,
}
`);
  });
  it('should not return an error', () => {
    expect(getValidateResult({ type: 'foo_value', data: { foo: 123 } }, schema))
      .toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": Object {
    "data": Object {
      "foo": 123,
    },
    "type": "foo_value",
  },
}
`);
  });
});
