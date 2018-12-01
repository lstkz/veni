import { V, getValidateResult } from '../src/index';

describe('base', () => {
  it('should return an error if invalid boolean', () => {
    const schema = V.boolean();
    expect(getValidateResult(1, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be a boolean",
      "path": Array [],
      "type": "boolean.base",
      "value": 1,
    },
  ],
  "value": 1,
}
`);
  });

  it('should return an error if invalid boolean (invalid string)', () => {
    const schema = V.boolean();
    expect(getValidateResult('foo', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be a boolean",
      "path": Array [],
      "type": "boolean.base",
      "value": "foo",
    },
  ],
  "value": "foo",
}
`);
  });

  it('should return no errors if valid boolean', () => {
    const schema = V.boolean();
    expect(getValidateResult(true, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": true,
}
`);
  });

  it('should return no errors if valid boolean ("true")', () => {
    const schema = V.boolean();
    expect(getValidateResult('true', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": true,
}
`);
  });

  it('should return no errors if valid boolean ("false")', () => {
    const schema = V.boolean();
    expect(getValidateResult('false', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": false,
}
`);
  });
});

describe('optional/null', () => {
  it('should return no errors if optional', () => {
    const schema = V.boolean().optional();
    expect(getValidateResult(undefined, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": undefined,
}
`);
  });

  it('should return no errors if nullable', () => {
    const schema = V.boolean().nullable();
    expect(getValidateResult(null, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": null,
}
`);
  });
});
