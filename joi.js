const Joi = require('joi');

const schema = Joi.object({
  // user_email: Joi.string()
  //   .min(5)
  //   .email(),
  // // .required(),
  // username: Joi.string()
  //   .min(3)
  //   .max(5)
  //   .allow(null),
  username: 1,
  arr: Joi.array().items(
    Joi.object().keys({
      a: Joi.string(),
    })
  ),
});

const ret = Joi.validate(
  {
    username2: 2,
    arr: [
      {
        a: 1,
      },
    ],
  },
  schema
).error;

if (ret) {
  console.log(ret.details);
}
