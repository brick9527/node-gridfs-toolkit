const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

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
    dbName: params.db,
    authSource: params.authenticationDatabase,
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

  client.gfs.getPlainContent = function (options) {
    return _getPlainContent(client.gfs, options);
  };

  client.gfs.getContent = function (options) {
    return _getContent(client.gfs, options);
  };
  return client;
}

module.exports = connect;
