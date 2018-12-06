import { StringSchema } from './StringSchema';
import { AnySchema } from './AnySchema';
import { ObjectSchema } from './ObjectSchema';
import { ArraySchema } from './ArraySchema';
import { EnumSchema } from './EnumSchema';
import { NumberSchema } from './NumberSchema';
import { BooleanSchema } from './BooleanSchema';
import { DateSchema } from './DateSchema';
import { OrSchema } from './OrSchema';

export const V = {
  any: () => new AnySchema(),
  string: () => new StringSchema(),
  object: () => new ObjectSchema(),
  array: () => new ArraySchema(),
  enum: () => new EnumSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  date: () => new DateSchema(),
  or: () => new OrSchema(),
};

export {
  StringSchema,
  AnySchema,
  ObjectSchema,
  ArraySchema,
  EnumSchema,
  NumberSchema,
  BooleanSchema,
  DateSchema,
  OrSchema,
};

export { Convert } from './convert-types';
export * from './types';
export * from './validate';
export * from './ValidationError';
