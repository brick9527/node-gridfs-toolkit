#!/usr/bin/env node
const argv = require('optimist').argv;

if (argv.h || argv.help) {
  require('../dist/menu.js');
}