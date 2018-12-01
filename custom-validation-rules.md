# Custom Validation Rules

It's possible to add custom validation rules by patching the prototype of schemas.  


### `custom-rules.ts`

```ts
import { NumberSchema, V } from 'veni';

declare module 'veni' {
  interface NumberSchema {
    port(): this;
  }
}

/**
 * Checks if the value is a valid port number.
 * */
NumberSchema.prototype.port = function() {
  // add existing rules
  this.integer(); 

  // custom validation rule
  this.validators.push({
    type: 'number.port',
    validate: (value, path) => {
      if (value < 0 || value > 65535) {
        return {
          stop: true,
          error: {
            type: 'number.port',
            message: 'must be a valid port number',
            path,
            value,
          },
        };
      }
      return null;
    },
  });
  return this;
};


/**
 * Caps the value to the given max if it's greater than max.
 * It doesn't perform any validation, only transforms the value.
 * */
NumberSchema.prototype.cap = function(max: number) { 

  // custom validation rule
  this.validators.push({
    type: 'number.cap',
    validate: (value, path) => {
      if (value > max) {
        return {
          value: max,
        }
      }
      return null;
    },
  });
  return this;
};


```


### `your-app.ts`

```ts
import './custom-rules.ts'
import { V } from '../src/index';

const schema = V.object().keys({
  port: V.number().port(),
  url: V.string();
})

```

### Validator
Validator has the following format


```ts

NumberSchema.prototype.myCustomFun = function() { 

  // Add a custom validation rules.
  // You can add multiple rules if needed.
  this.validators.push({
    /**
     * Represents the validation priority.
     * Optional and Nullable rules have priority -1.
     * Default priority is 0.
     */
    priority: 0,
    /**
     * The rule name.
     */
    type: 'number.cap',
    /**
     * The validation function.
     * Value is the original value or a value transformed by previous rules.
     * Path is the path to this property.
     */
    validate: (value, path) => {
      // return an object or `null` if there are no validation errors
      return {
        /**
         * Return an error if validation failed.
         */
        error?: {
          // the error message
          message: string,
          // the path, modify it only for objects or arrays
          path: Path,
          // the type, should match the type from above
          type: string,
          // the input value
          value: any,
        };
        /**
         * Return multiple validation errors
         */ 
        errors?: ErrorDetails[];
        /**
         * True if further rules should not be executed.
         * Usually it should be `true` if there are validation errors.
         * It's possible to set stop to true if there are no errors.
         */
        stop?: boolean,
        /**
         * Set a new value if there are transformations.
         */
        value?: any,
      }
    },
  });
  return this;
};


```