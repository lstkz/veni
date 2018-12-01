# API Reference

* [`validate`](docs.md#validate)
* [`getValidateResult`](docs.md#getValidateResult)
* V
  * [`any`](docs.md#any)
  * [`string`](docs.md#string)
  * [`object`](docs.md#object)
  * [`array`](docs.md#array)
  * [`enum`](docs.md#enum)
  * [`number`](docs.md#number)
  * [`boolean`](docs.md#boolean)
  * [`date`](docs.md#date)

## `validate(value, schema, [rootName])`

Validates a value using the given schema.

### Arguments

* `value` A value to validate.
* `schema` A schema definition.
* `rootNam` The optional name of the root objected. Used when formatting validation errors.

#### Returns

A validated object.

#### Throws

A `ValidationError` is throws if validation failed.

