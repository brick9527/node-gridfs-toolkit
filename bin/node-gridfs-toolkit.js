#!/usr/bin/env node
const argv = require('optimist').argv;

if (argv.h || argv.help) {
  console.log('menu');
}
console.log('hello node-gridfs-toolkit', argv);