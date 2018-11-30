import { AnySchema } from './AnySchema';

export class BooleanSchema<TReq = true, TNull = false> extends AnySchema<
  TReq,
  TNull
> {
  readonly schema = 'boolean';

  optional() {
    return (super.optional() as any) as BooleanSchema<false, TNull>;
  }

  nullable() {
    return (super.nullable() as any) as BooleanSchema<TReq, false>;
  }
}
