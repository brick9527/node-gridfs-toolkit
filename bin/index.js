#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');

const main = require('../libs/main');

const cli = meow(`
  ${chalk.bgBlue('# 用法(Usage) ')}
    ${chalk.green('$')} node-gridfs-toolkit <input>

  ${chalk.bgBlue('# 选项(Options) ')}
    --host, -H                  数据库主机地址. 默认'127.0.0.1'
    --port, -P                  数据库端口. 默认'27017'
    --user, -u                  数据库认证用户名
    --password, -p              数据库认证用户密码
    --authenticationDatabase    认证数据库
    --db, -d                    查询的数据库
    --id                        查询的数据_id
    --output, -o                查询结果保存文件名
    --help, -h                  帮助
    --version                   查看node-gridfs-toolkit版本号


  ${chalk.bgBlue('# 示例(Example) ')}
    1. 查看帮助
    ${chalk.green('$')} node-gridfs-toolkit -h

    2. 查看版本号
    ${chalk.green('$')} node-gridfs-toolkit --version

    3. 查询数据并保存文件:
    ${chalk.green('$')} node-gridfs-toolkit -H 127.0.0.1 -P 27017 -u <your_name> -p <your_pass> --authenticationDatabase <auth_db_name> -d <db_name> --id <your_id> -o <output_file_path>

  ${chalk.bgBlue('# 反馈(Feedback) ')}
    请以issue的形式进行反馈:
    https://github.com/brick9527/node-gridfs-toolkit/issues

`, {
	flags: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    host: {
      type: 'string',
      alias: 'H',
    },
    port: {
      type: 'number',
      alias: 'P',
    },
    user: {
      type: 'string',
      alias: 'u',
    },
    password: {
      type: 'string',
      alias: 'p',
    },
    authenticationDatabase: {
      type: 'string',
    },
    db: {
      type: 'string',
      alias: 'd',
    },
    id: {
      type: 'string',
    },
    output: {
      type: 'string',
      alias: 'o',
    },
	},
});

main(cli);