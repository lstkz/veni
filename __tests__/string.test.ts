import { V, getValidateResult } from '../src';

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

it('should return no errors if valid string with min/max', () => {
  const schema = V.string()
    .min(2)
    .max(4);
  expect(getValidateResult('12', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": "12",
}
`);
});

it('should return no errors if optional string', () => {
  const schema = V.string()
    .optional()
    .min(10);
  expect(getValidateResult(undefined, schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [],
  "value": undefined,
}
`);
});

it('should return an error if length less than min', () => {
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

it('should return an error if length greater than min', () => {
  const schema = V.string().max(3);
  expect(getValidateResult('12345', schema)).toMatchInlineSnapshot(`
Object {
  "errors": Array [
    Object {
      "message": "length must be less than or equal to 3 characters long",
      "path": Array [],
      "type": "string.base",
      "value": "12345",
    },
  ],
  "value": "12345",
}
`);
});

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
