'use strict';

const path = require('path');

/**
 * 获取保存的目标文件地址
 * @param {String} output 
 * @returns 
 */
module.exports = function(output) {
  let targetFilePath = output;
  if (output.startsWith('.')){
    targetFilePath = path.resolve(process.cwd(), output);
  }
  return targetFilePath;
};
