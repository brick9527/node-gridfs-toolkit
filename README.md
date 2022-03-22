# node-gridfs-toolkit(ngt)

[![Node.js CI](https://github.com/brick9527/node-gridfs-toolkit/actions/workflows/node.js.yml/badge.svg)](https://github.com/brick9527/node-gridfs-toolkit/actions/workflows/node.js.yml)

`node-gridfs-toolkit`(以下简称`ngt`)是一个可以简化gridfs获取的工具, 并且可以将获取的数据本地化的一个工具.

## 安装(Install)

```sh
npm i node-gridfs-toolkit -g
```

## 使用(Usage)

```sh
# 完整版
$ node-gridfs-toolkit -h

# 精简版
$ ngt -h
```

## 参数列表(Options)

|名称|关键字|别名|说明|
|-|-|-|-|
|帮助|-h|--help|获取帮助列表|
|主机地址|-H|--host|设置数据库的主机地址|
|端口|-P|--port|设置数据库的端口|
|用户名|-u|--user|设置数据库的用户名|
|用户密码|-p|--password|设置数据库的用户密码|
|认证数据库|无|--authenticationDatabase|设置数据库的用户认证数据库|
|数据库名称|-d|--db|设置所要获取的数据库的名称|
|数据ID|无|--id|设置所要查询的数据ID|
|查询结果保存文件|-o|--output|查询结果保存文件路径|
|格式化输出|无|--pretty|格式化输出|
|查看工具版本|无|--version|查询ngt工具版本|

## 代码提交规范(Commit Message Standard)

提交commit时遵循以下规范:

- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- revert: 回滚
