#!/usr/bin/env node
const argv = require('optimist').argv;
const Joi = require('joi');
const _ = require('lodash');

function mergeArgv(argv) {
  if (argv.port) {
    argv.port = Number(argv.port);
  }

  if (argv.u) {
    argv.user = argv.u;
  }

  if (argv.p) {
    argv.password = argv.p;
  }

  if (argv.d) {
    argv.db = argv.d;
  }
  return argv;
}

async function main(argv) {
  if (argv.h || argv.help) {
    require('../dist/menu.js');
    return;
  }

  // TODO: 判断是否是一个参数都没传, 没传的话, 直接进入menu
  
  // 检查必要参数
  const usefulArgv = _.pick(
    mergeArgv(argv),
    ['host', 'port', 'user', 'password', 'authenticationDatabase', 'db'],
  );
  const schema = Joi.object().keys({
    host: Joi.string().optional().default('127.0.0.1'),
    port: Joi.number().optional().default(27017),
    user: Joi.string().optional(),
    password: Joi.string().optional(),
    authenticationDatabase: Joi.string().optional(),
    db: Joi.string().required(),
  });

  try {
    const result = await schema.validateAsync(usefulArgv);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

main(argv);