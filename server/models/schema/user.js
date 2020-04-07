const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义模型 员工信息模型
 */
const userSchema = new Schema({
  name: String,
  mobile: String,
  password: String,
  icon: String,
  department: String,
  email: String,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;