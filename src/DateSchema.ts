import { AnySchema } from './AnySchema';

export class DateSchema<TReq = true, TNull = false> extends AnySchema<
  TReq,
  TNull
> {
  readonly schema = 'date';

  optional() {
    return (super.optional() as any) as DateSchema<false, TNull>;
  }

  nullable() {
    return (super.nullable() as any) as DateSchema<TReq, false>;
  }
}
