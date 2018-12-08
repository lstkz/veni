import { StringSchema } from './StringSchema';
import { AnySchema } from './AnySchema';
import { ObjectSchema } from './ObjectSchema';
import { ArraySchema } from './ArraySchema';
import { EnumSchema } from './EnumSchema';
import { NumberSchema } from './NumberSchema';
import { BooleanSchema } from './BooleanSchema';
import { DateSchema } from './DateSchema';
import { OrSchema } from './OrSchema';

export class Veni {
  any() {
    return new AnySchema();
  }
  string() {
    return new StringSchema();
  }
  object() {
    return new ObjectSchema();
  }
  array() {
    return new ArraySchema();
  }
  enum() {
    return new EnumSchema();
  }
  number() {
    return new NumberSchema();
  }
  boolean() {
    return new BooleanSchema();
  }
  date() {
    return new DateSchema();
  }
  or() {
    return new OrSchema();
  }
}

export const V = new Veni();

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
