#!/usr/bin/env node

const meow = require('meow');
const test = require('../libs/test');
const main = require('../libs/main');

const cli = meow(`
	# 用法
	  $ node-gridfs-toolkit <input>

	# 选项
	   --host, -H                  数据库主机地址
    --port, -P                  数据库端口
    --user, -u                  数据库认证用户名
    --password, -p              数据库认证用户密码
    --authenticationDatabase    认证数据库
    --db, -d                    查询的数据库
    --id                        查询的数据_id
    --output, -o                查询结果保存文件名
    --pretty                    格式化输出
    --help, -h                  帮助


	# 示例
	  $ node-gridfs-toolkit -H 127.0.0.1 -P 27017 -u <your_name> -p <your_pass> --authenticationDatabase db_name -d test --id 1234567890 -o 123.txt
`, {
	flags: {
    help: {
      type: 'boolean',
      alias: 'h',
      // default: false,
    },
    host: {
      type: 'string',
      alias: 'H',
      // default: '127.0.0.1'
    },
    port: {
      type: 'number',
      alias: 'P',
      // default: 27017
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
      // default: 'admin',
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
    pretty: {
      type: 'boolean',
      // default: false,
    }
	}
});

main(cli);