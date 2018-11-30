import { AnySchema } from './AnySchema';
import { SchemaLike } from './types';

export class ArraySchema<
  TReq = true,
  TNull = false,
  TItem = any
> extends AnySchema<TReq, TNull> {
  readonly schema = 'array';
  private _typeSchema: TItem = null;

  items<T extends SchemaLike>(typeSchema: T) {
    this._typeSchema = typeSchema;
    return (this as any) as ArraySchema<TReq, T>;
  }

  optional() {
    return (super.optional() as any) as ArraySchema<false, TNull, TItem>;
  }

  nullable() {
    return (super.nullable() as any) as ArraySchema<TReq, false, TItem>;
  }
}
