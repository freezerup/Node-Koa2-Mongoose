const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义模型 系统功能列表模型
 */
const functionSchema = new Schema({
  name: String,
  desc: String,
  type: String,
  icon: String,
});

const SysFunction = mongoose.model('SysFunction', functionSchema);

module.exports = SysFunction;