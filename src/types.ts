import { AnySchema } from './AnySchema';
import { StringSchema } from './StringSchema';
import { ObjectSchema } from './ObjectSchema';

export interface ErrorDetails {
  message: string;
  path: string[];
  type: string;
  value: any;
}

type Validate = (
  value: any,
  path: string[]
) => {
  error?: ErrorDetails;
  errors?: ErrorDetails[];
  stop?: boolean;
  value?: any;
} | null;

export interface Validator {
  priority?: number;
  type: string;
  validate: Validate;
}

export type Schema =
  | AnySchema
  // | ArraySchema
  // | BinarySchema
  // | BooleanSchema
  // | DateSchema
  // | FunctionSchema
  // | NumberSchema
  | ObjectSchema
  | StringSchema;

export type SchemaLike =
  | string
  | number
  | boolean
  | object
  | null
  | Schema
  | SchemaMap;

export interface SchemaMap {
  [key: string]: SchemaLike | SchemaLike[];
}
