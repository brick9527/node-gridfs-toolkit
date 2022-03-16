#!/usr/bin/env node
const argv = require('optimist').argv;
const Joi = require('joi');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


// 数据结构映射
const PROPERTY_MAPPING = {
  host: 'host',
  port: 'port',
  db: 'dbName',
  authenticationDatabase: 'authSource',
  user: 'user',
  password: 'password',
};

function mergeArgv(argv) {
  if (argv.h) {
    argv.help = argv.h;
  }

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

  if (argv.o) {
    argv.output = argv.o;
  }

  return argv;
}

/**
 * 获取对应源数据内容(同步)
 * @param {any} options - 查询条件
 * @returns {}
 */
 function _getPlainContent(gfs, options) {
  return new Promise(resolve => {
    const readStream = gfs.createReadStream(options);
    const chunks = [];

    readStream.on('data', data => {
      chunks.push(data);
    });

    readStream.on('error', err => {
      console.log(err);
      resolve(null);
    });

    readStream.on('close', () => {
      const content = Buffer.concat(chunks).toString();
      console.log('Gridfs content = ', JSON.stringify(content));

      resolve(content);
    });
  });
}

/**
 * 获取对应数据解析后的内容(同步)
 * @param {any} options - 查询条件
 * @returns {}
 */
async function _getContent(gfs, options) {
  const plainContent = await _getPlainContent(gfs, options);
  let data;
  try {
    data = JSON.parse(plainContent);
  } catch (err) {
    console.log(err);
  }

  return data;
}

async function connect(params) {
  console.log('params = ', params);
  const client = await mongoose.connect(`mongodb://${params.host}:${params.port}`, {
    dbName: params.dbName,
    authSource: params.authSource,
    user: params.user,
    pass: String(params.password),
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 1000,
    poolSize: 10,
    autoIndex: false,
    useNewUrlParser: true,
  });

  const { connection } = client;

  connection.on('disconnected', () => {
    console.log('mongodb disconnected.');
  });

  connection.on('error', err => {
    console.log('mongodb error.', err);
  });

  connection.on('reconnected', () => {
    console.log('mongodb reconnected.');
  });

  console.log('mongodb connected.');

  client.gfs = Grid(connection.db, mongoose.mongo);
  client.gfs.getPlainContent = _getPlainContent;
  client.gfs.getContent = _getContent;
  return client;
}

async function main(argv) {
  // console.log(argv);
  // return;
  if (argv.h || argv.help) {
    console.log('111111111111111111');
    require('../dist/menu.js');
    return;
  }

  // 判断是否是一个参数都没传, 没传的话, 直接进入menu
  const allArgv = _.pick(
    mergeArgv(argv),
    ['help', 'host', 'port', 'user', 'password', 'authenticationDatabase', 'db', 'id', 'output'],
  );
  if (_.isEmpty(allArgv)) {
    require('../dist/menu.js');
    return;
  }
  
  // 检查必要参数
  const usefulArgv = _.pick(
    allArgv,
    ['host', 'port', 'user', 'password', 'authenticationDatabase', 'db', 'id', 'output'],
  );
  const schema = Joi.object().keys({
    host: Joi.string().optional().default('127.0.0.1'),
    port: Joi.number().optional().default(27017),
    user: Joi.string().optional(),
    password: Joi.alternatives([
      Joi.string(),
      Joi.number(),
    ]).optional(),
    authenticationDatabase: Joi.string().optional(),
    db: Joi.string().required(),
    id: Joi.string().required(),
    output: Joi.string().optional(),
  });

  let result = {}
  try {
    result = await schema.validateAsync(usefulArgv);
    console.log('result = ', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
    return;
  }

  // 数据结构映射
  const connectParam = {};
  for (const key in PROPERTY_MAPPING) {
    if (result[key]) {
      connectParam[PROPERTY_MAPPING[key]] = result[key];
    }
  }
  const mongoClient = await connect(connectParam);

  // 开始获取数据库内容
  const readStream = mongoClient.gfs.createReadStream({ _id: mongoose.Types.ObjectId(usefulArgv.id) });

  const chunks = [];

  readStream.on('data', data => {
    chunks.push(data);
  });

  readStream.on('error', err => {
    console.log(err);
  });

  readStream.on('close', () => {
    const content = Buffer.concat(chunks).toString('utf-8');
    console.log('content = ', content);
    if (usefulArgv.output) {
      const outputPath = path.resolve(__dirname, usefulArgv.output);
      fs.writeFileSync(outputPath, content, { encoding: 'utf-8', flag: 'w+' });
    }
  });
}

main(argv);