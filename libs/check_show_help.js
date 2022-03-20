const _ = require('lodash');

module.exports = function (flags) {
  let status = true;
  for (const key in flags) {
    if (!_.isBoolean(flags[key])) {
      status = false;
      return status;
    }
    if (_.isBoolean(flags[key]) && flags[key] === true) {
      status = false;
      return status;
    }
  }
  return status;
};