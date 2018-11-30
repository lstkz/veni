import { AnySchema } from './AnySchema';

export class StringSchema<TReq = true, TNull = false> extends AnySchema<
  TReq,
  TNull
> {
  readonly schema = 'string';

  constructor() {
    super();
    this.validators.push({
      type: 'string.base',
      validate: (value, path) => {
        if (typeof value !== 'string') {
          return {
            stop: true,
            error: {
              type: 'string.base',
              message: 'must be a string',
              path,
              value,
            },
          };
        }
        return null;
      },
    });
  }

  min(min: number) {
    this.validators.push({
      priority: 2,
      type: 'string.min',
      validate: (value: string, path) => {
        if (value.length < min) {
          return {
            stop: true,
            error: {
              type: 'string.base',
              message: `length must be at least ${min} characters long`,
              path,
              value,
            },
          };
        }
        return null;
      },
    });
    return this;
  }

  max(max: number) {
    this.validators.push({
      priority: 2,
      type: 'string.max',
      validate: (value: string, path) => {
        if (value.length > max) {
          return {
            stop: true,
            error: {
              type: 'string.base',
              message: `length must be less than or equal to ${max} characters long`,
              path,
              value,
            },
          };
        }
        return null;
      },
    });
    return this;
  }

  trim() {
    this.validators.push({
      priority: 1,
      type: 'string.trim',
      validate: (value: string) => {
        const trimmed = value.trim();
        if (trimmed !== value) {
          return {
            value: trimmed,
          };
        }
        return null;
      },
    });
    return this;
  }

  optional() {
    return (super.optional() as any) as StringSchema<false, TNull>;
  }

  nullable() {
    return (super.nullable() as any) as StringSchema<TReq, false>;
  }
}
