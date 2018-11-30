import { StringSchema } from './StringSchema';
import { AnySchema } from './AnySchema';
import { ObjectSchema } from './ObjectSchema';
import { ArraySchema } from './ArraySchema';
import { EnumSchema } from './EnumSchema';

export const V = {
  any: () => new AnySchema(),
  string: () => new StringSchema(),
  object: () => new ObjectSchema(),
  array: () => new ArraySchema(),
  enum: () => new EnumSchema(),
};

export * from './validate';
export * from './validationError';
