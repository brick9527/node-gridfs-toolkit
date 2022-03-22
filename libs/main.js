'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const fs = require('fs');

const checkShowHelp = require('./check_show_help'); 
const checkArgv = require('./check_argv');
const connectMongo = require('./connect_mongo');
const getTargetFilePath = require('./get_target_file_path');

module.exports = async function(cli) {
  // 任何参数都不传, 显示帮助菜单
  const isShowHelp = checkShowHelp(cli.flags);
  if (isShowHelp) {
    cli.showHelp();
    return;
  }

  // 检查参数, 给默认值
  const argvs = await checkArgv(cli.flags);
  console.log(argvs);

  // 连接mongo
  const connectParams = _.pick(argvs, [
    'host',
    'port',
    'user',
    'password',
    'authenticationDatabase',
    'db',
  ]);
  const mongoClient = await connectMongo(connectParams);

  console.log(Object.keys(mongoClient));


  // 将获取内容输出到控制台
  const contentStream = mongoClient.gfs.getStream({ _id: mongoose.Types.ObjectId(argvs.id) });

  // 判断是否需要写入文件
  let targetFilePath;
  if (argvs.output) {
    targetFilePath = getTargetFilePath(argvs.output);
    const writeTargetFilePathStream = fs.createWriteStream(targetFilePath, { encoding: 'utf-8', flags: 'w+' });
    contentStream.pipe(writeTargetFilePathStream);
  }

  contentStream.pipe(process.stdout);

  contentStream.on('err', err => {
      throw new Error(err);
    });
  contentStream.on('end', () => {
      if (argvs.output) {
        console.log(`file path: ${targetFilePath}`);
        process.exit(0);
      }
    });
};
