import { V, validate } from '../src/index';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

const schema = V.object().keys({
  username: V.string()
    .min(3)
    .max(30),
  firstName: V.string().optional(),
  lastName: V.string().optional(),
  password: V.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  birthyear: V.number()
    .integer()
    .min(1900)
    .max(2013),
  gender: V.enum().values<Gender>(Object.values(Gender)),
});

const data = {
  username: 'john',
  password: 'password',
  birthyear: '2000',
  email: 'john@example.com',
  gender: 'male',
};

const user = validate(data, schema, 'user');
