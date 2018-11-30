import { V } from './index';
import { Convert } from './convert-types';

enum Gender {
  Male = 'male',
  Female = 'female',
}

const schema = V.object().keys({
  name: V.string(),
  optionalName: V.string().optional(),
  items: V.array().items(V.string()),
  gender: V.enum().values<Gender>(Object.values(Gender)),
  gender2: V.enum().literal('a', 'b', 'c'),
});

type SchemaType = Convert<typeof schema>;
const obj: SchemaType = null as any;

obj.gender = Gender.Female;
obj.gender2 = 'a';
