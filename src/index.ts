import { StringSchema } from './StringSchema';
import { AnySchema } from './AnySchema';
import { ObjectSchema } from './ObjectSchema';

export const V = {
  any: () => new AnySchema(),
  string: () => new StringSchema(),
  object: () => new ObjectSchema(),
};

export * from './validate';
export * from './validationError';
