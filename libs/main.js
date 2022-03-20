const _ = require('lodash');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const checkShowHelp = require('./check_show_help'); 
const checkArgv = require('./check_argv');
const connectMongo = require('./connect_mongo');

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
  const connectParams = _.pick(argvs, ['host', 'port', 'user', 'password', 'authenticationDatabase', 'db']);
  const mongoClient = await connectMongo(connectParams);

  // 查询数据
  let result = null;

  // 判断是否需要格式化
  if (argvs.pretty) {
    const resultObj = await mongoClient.getContent({ _id: mongoose.Types.ObjectId(argvs.id) });
    result = JSON.stringify(resultObj, null, 2);
  } else {
    result = await mongoClient.getPlainContent({ _id: mongoose.Types.ObjectId(argvs.id) });
  }
  console.log(result);

  // 如果需要保存到文件
  if (argvs.output) {
    let targetPath = argvs.output;
    if (argvs.output.startsWith('/')) {
      targetPath = argvs.output;
    } else if (argvs.output.startsWith('.')){
      targetPath = path.join(process.pwd(), argvs.output);
    }
    fs.writeFileSync(targetPath, result, { encoding: 'utf-8', flag: 'w' });
    console.log(`file path: ${targetPath}`);
  }
};
