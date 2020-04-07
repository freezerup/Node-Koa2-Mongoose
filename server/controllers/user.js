const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * 注册新用户
*/

exports.siginup = async (ctx, next) => {
  const query = ctx.query;
  const mobile = query.mobile.trim();
  let user = await User.findOne({
    mobile: mobile
  }).exec();
  if (!user) {
    user = new User({
      name: query.name,
      mobile: query.mobile,
      password: query.password,
      icon: query.icon,
      department: query.department,
      email: query.email,
      role: query.role,
    });
    try {
      user = await user.save()
      ctx.body = {
        success: true
      }
    }
    catch (e) {
      ctx.body = {
        success: false
      }
      return next
    }
  } else {
    ctx.body = {
      success: false,
      error_message: '已存在'
    }
  }
}

/**
 * 更新用户信息
*/

exports.update = async (ctx, next) => {
  const query = ctx.query;
  const condition = {_id: query._id};
  const user = await User.findOne(condition).exec();
  const update = {
    $set: {
      name: query.name || user.name,
      mobile: query.mobile || user.mobile,
      password: query.password || user.password,
      icon: query.icon || user.icon,
      department: query.department || user.department,
      email: query.email || user.email,
      role: query.role || user.role,
    }
  }
  try {
    const user = await  User.update(condition, update);
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next
  }
}

/**
 * 删除用户
 */

exports.delectUser = async (ctx, next) => {
  const query = ctx.query;
  const condition = {_id: query._id};
  try {
    const user = await User.remove(condition);
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next
  }
}

/**
 *  查找用户列表
 */
exports.findUser = async (ctx, nex) => {
  const query = ctx.query || {};
  try {
    const data  = await User.find(query).exec();
    ctx.body = {
      success: true,
      data
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next
  }
}


