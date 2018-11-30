import { AnySchema } from './AnySchema';

export class NumberSchema<TReq = true, TNull = false> extends AnySchema<
  TReq,
  TNull
> {
  readonly schema = 'number';

  optional() {
    return (super.optional() as any) as NumberSchema<false, TNull>;
  }

  nullable() {
    return (super.nullable() as any) as NumberSchema<TReq, false>;
  }
}
