import { V, getValidateResult } from '../src/index';

describe('base', () => {
  it('should return an error if invalid string', () => {
    const schema = V.string();
    expect(getValidateResult(1, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "must be a string",
      "path": Array [],
      "type": "string.base",
      "value": 1,
    },
  ],
  "value": 1,
}
`);
  });

  it('should return no errors if valid string', () => {
    const schema = V.string();
    expect(getValidateResult('1', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "1",
}
`);
  });
});

describe('optional/null', () => {
  it('should return no errors if optional', () => {
    const schema = V.string().optional();
    expect(getValidateResult(undefined, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": undefined,
}
`);
  });

  it('should return no errors if nullable', () => {
    const schema = V.string().nullable();
    expect(getValidateResult(null, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": null,
}
`);
  });
});

describe('min', () => {
  it('should return an error if length lesser than min', () => {
    const schema = V.string().min(3);
    expect(getValidateResult('1', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "length must be at least 3 characters long",
      "path": Array [],
      "type": "string.base",
      "value": "1",
    },
  ],
  "value": "1",
}
`);
  });

  it('should not return an error if length equal to min ', () => {
    const schema = V.string().min(3);
    expect(getValidateResult('123', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "123",
}
`);
  });

  it('should not return an error if length greater than min ', () => {
    const schema = V.string().min(3);
    expect(getValidateResult('1234', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "1234",
}
`);
  });
});

describe('max', () => {
  it('should return an error if length greater than max', () => {
    const schema = V.string().max(3);
    expect(getValidateResult('1234', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "length must be less than or equal to 3 characters long",
      "path": Array [],
      "type": "string.base",
      "value": "1234",
    },
  ],
  "value": "1234",
}
`);
  });

  it('should not return an error if length equal to max ', () => {
    const schema = V.string().max(3);
    expect(getValidateResult('123', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "123",
}
`);
  });

  it('should not return an error if length lesser then max ', () => {
    const schema = V.string().max(3);
    expect(getValidateResult('12', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "12",
}
`);
  });
});

describe('trim', () => {
  it('should trim a string', () => {
    const schema = V.string().trim();
    expect(getValidateResult(' a ', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "a",
}
`);
  });
  it('should return an error if length is invalid after trim', () => {
    const schema = V.string()
      .trim()
      .min(2);
    expect(getValidateResult(' a ', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "length must be at least 2 characters long",
      "path": Array [],
      "type": "string.base",
      "value": "a",
    },
  ],
  "value": "a",
}
`);
  });
});
