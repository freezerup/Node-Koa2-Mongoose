const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义模型 系统功能列表模型
 */
const sysToken = new Schema({
  token: String,
  // createAt: {
  //   type: Date,
  //   default: Date.now(),
  //   index: { expires: 120*1 } // 缓存30天
  // }
});

const SysToken = mongoose.model('SysToken', sysToken);

module.exports = SysToken;