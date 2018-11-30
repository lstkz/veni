import { AnySchema } from './AnySchema';

export class EnumSchema<
  TReq = true,
  TNull = false,
  TType = any
> extends AnySchema<TReq, TNull> {
  readonly schema = 'enum';

  optional() {
    return (super.optional() as any) as EnumSchema<false, TNull, TType>;
  }

  nullable() {
    return (super.nullable() as any) as EnumSchema<TReq, false, TType>;
  }
}
