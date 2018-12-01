import { V, validate } from '../src/index';

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
});

const data = {
  username: 'john',
  password: 'password',
  birthyear: '2000',
  email: 'john@example.com',
};

const user = validate(data, schema, 'user');
