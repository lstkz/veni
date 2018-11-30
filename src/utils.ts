import { SchemaLike, SchemaMap } from './types';
import { ObjectSchema } from './ObjectSchema';

export const isSchemaMap = (obj: SchemaLike): obj is SchemaMap => {
  return obj.constructor.name === 'Object';
};

export const schemaLikeToSchema = (obj: SchemaLike) => {
  if (isSchemaMap(obj)) {
    return new ObjectSchema().keys(obj);
  }
  return obj;
};
