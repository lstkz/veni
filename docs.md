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
* `errors` The list of validation errors. If the validation was successful an array will be empty.

## V

## any

Matches any object. By default it's required, and non nullable.

### any.optional\(\)

Marks a key as optional. `undefined` value is allowed.

### any.nullable\(\)

Marks a key as required. `null` value is allowed.

## string

Matches a string.

### string.min\(min: number\)

Specifies the minimum number of characters.

### string.max\(max: number\)

Specifies the maximum number of characters.

### string.trim\(\)

Trims the output value.

### string.regex\(reg: RegExp\)

Defines a regular expression.

### string.email\(\)

Requires the string value to be a valid email address.  
The Following regexp is used `/^[a-zA-Z0-9._\-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/`

## object

Matches an object.  
If `keys` are not set then any object is allowed.

### object.keys\(schema: SchemaMap\)

Defines a schema for each property.

### string.unknown\(\)

Allows unknown keys.

## array

Matches an array.

### array.items\(typeSchema\)

Defines the schema of the array element.

### enum

Matches predefined list of values. Values are case insensitive.

### enum.values\(values\)

Defines the required enum value.

Example:

```typescript
enum Gender {
  Male = 'Male',
  Female = 'Female',
}

const schema = V.object().keys({
  gender: V.enum().values<Gender>(Object.values(Gender)),
});
```

### enum.literal\(...values\)

Defines allowed literal values.

Example:

```typescript
const schema = V.object().keys({
  gender: V.enum().literal('male', 'female'),
});
```

## number

Matches a number. Valid string numbers are casted to a number type.

### number.integer\(\)

Requires the number to be an integer \(no floating point\).

### number.min\(min: number\)

Specifies the minimum allowed number.

### number.max\(max: number\)

Specifies the maximum allowed number.

## boolean

Matches a boolean. Strings `'true'` and `'false'` are casted to a boolean type.

## date

Matches a date. Valid iso strings e.g. `"2018-12-01T14:08:26.061Z"` are converted to a date object. Invalid dates are not allowed e.g. `new Date('')`.

