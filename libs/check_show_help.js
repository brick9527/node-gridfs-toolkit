const _ = require('lodash');

/**
 * 检查传入参数, 如果没有传入任何参数需要显示菜单
 * @param {any} flags - 参数列表
 * @returns {Boolean}
 */
module.exports = function (flags) {
  for (const key in flags) {
    if (!_.isBoolean(flags[key])) {
      return false;
    }
    if (_.isBoolean(flags[key]) && flags[key] === true) {
      return false;
    }
  }
  return true;
};