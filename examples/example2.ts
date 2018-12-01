import { NumberSchema, V } from '../src/index';

declare module '../src/NumberSchema' {
  interface NumberSchema {
    port(): this;
  }
}

NumberSchema.prototype.port = function() {
  this.integer();
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
