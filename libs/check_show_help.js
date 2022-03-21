const _ = require('lodash');

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