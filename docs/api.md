# API Reference


- [`validate`](#validate)
- [`getValidateResult`](#getValidateResult)
- V
  - [`any`](#any)
  - [`string`](#string)
  - [`object`](#object)
  - [`array`](#array)
  - [`enum`](#enum)
  - [`number`](#number)
  - [`boolean`](#boolean)
  - [`date`](#date)


### `validate(value, schema, [rootName])`
Validates a value using the given schema.

#### Arguments
- `value` A value to validate.
- `schema` A schema definition.
- `rootNam` The optional name of the root objected. Used when formatting validation errors.

##### Returns
A validated object.

##### Throws
A `ValidationError` is throws if validation failed.
