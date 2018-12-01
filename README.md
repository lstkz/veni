Veni
=============

Painless validation for TypeScript 🧘‍♀️   


[![Build Status](https://travis-ci.org/BetterCallSky/veni.svg?branch=master)](https://travis-ci.org/BetterCallSky/veni)
[![npm module](https://badge.fury.io/js/veni.svg)](https://www.npmjs.org/package/veni) 

Installation
----------
```bash
npm i veni
yarn add veni
```
Then in .js or .ts

```ts
import { V, validate } from 'veni';

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

```
‼️ Properties are inferred automatically.

![alt autocomplete](./docs/img/autocomplete.gif)  

