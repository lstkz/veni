# API Reference

* [`validate`](docs.md#validate-value-schema-rootname)
* [`getValidateResult`](docs.md#getValidateResult)
* [`V`](docs.md#v)
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
* `rootName` The optional name of the root objected. Used when formatting validation errors.

#### Returns

A validated object.

#### Throws

A `ValidationError` is throws if validation failed.


## `getValidateResult(value, schema, [path])`
Validate a value using the given schema, and get result as an object.

### Arguments

* `value` A value to validate.
* `schema` A schema definition.
* `path` The prefix path used for formatting validation errors.

#### Returns

An object with the following props:
* `value` The new value after validation.
* `errors` The list of occurs. If the validation was successful an array will be empty.


## V

## any
Matches any object. By default it's required, and non nullable.

### any.optional()
Marks a key as optional. `undefined` value is allowed.

### any.nullable()
Marks a key as required. `null` value is allowed.


