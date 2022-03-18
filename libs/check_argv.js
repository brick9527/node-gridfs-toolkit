const Joi = require('joi');

const argvSchema = Joi.object().keys({
  host: Joi.string().optional().default('127.0.0.1'),
  port: Joi.number().optional().default(27017),
  user: Joi.string().optional(),
  password: Joi.string().optional(),
  authenticationDatabase: Joi.string().optional(),
  db: Joi.string().required(),
  id: Joi.string().required(),
  output: Joi.string().optional(),
  pretty: Joi.boolean().required().default(false),
  help: Joi.boolean().required().default(false),
});

module.exports = async function(flags) {
  let result;
  try {
    result = await argvSchema.validateAsync(flags);
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
  return result;
}
