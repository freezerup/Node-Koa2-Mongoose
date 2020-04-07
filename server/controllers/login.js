const mongoose = require('mongoose');
const User = mongoose.model('User');
const SysToken = mongoose.model('SysToken');
const xss = require('xss');
const {createToken, verifyToken} = require('../lib/token');

/**
 * 验证登录
 */
exports.login = async (ctx, next) => {
  const query = ctx.query;
  const mobile = xss(query.mobile);
  const password = xss(query.password);
  const user = await User.findOne({
    mobile: mobile
  }).exec();
  if (user) {
    if (user.password === password) {
      const _id = user._id;
      const token = createToken({_id});
      let sysToken = new SysToken({
        token,
        // createAt: Date.now()
      });
      try {
        await sysToken.save()
        ctx.body = {
          success: true,
          userInfo: user,
          token,
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
        error_message: '密码错误'
      }
    }
  } else {
    ctx.body = {
      success: false,
      error_message: '账号错误'
    }
  }
}
// 通过token登录
exports.token = async (ctx, next) => {
  const header = ctx.request.headers;
  const authorization = header.authorization;
  const result = verifyToken(authorization);
  const _id = result.data._id;
  const user = await User.findOne({
    _id: _id
  }).exec();
  ctx.body = {
    success: true,
    userInfo: user,
  }
}
