const validate = require('validate.js');
const moment = require("moment");

// 验证器拓展
validate.extend(validate.validators.datetime, {
  // 该函数在触发验证器时调用，将任何数据转换为时间戳格式返回
  // 无法转换则返回NaN
  parse(value, options) {
    let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
    if (options.dateOnly) {
      formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
    }
    return +moment.utc(value, formats, true)
  },


  format(value, options) {
    let format = "YYYY-MM-DD"
    if (!options.dateOnly) {
      format += " HH:mm:ss"
    }
    return moment.utc(value).format(format)
  }
})