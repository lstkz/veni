import { NumberSchema, V } from '../src/index';

declare module '../src/NumberSchema' {
  interface NumberSchema {
    port(): this;
    cap(max: number): this;
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
        };
      }
      return null;
    },
  });
  return this;
};
