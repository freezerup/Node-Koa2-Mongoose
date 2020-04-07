const mongoose = require('mongoose');
const SysToken = mongoose.model('SysToken');
const {verifyToken} = require('../lib/token');
const { __objectPropertyIsEmpty } = require('../lib/tools');


exports.verify = async (ctx, next) => {
  // 统一处理传参问题
  const query = __objectPropertyIsEmpty(ctx.query) ? ctx.query : ctx.query;
  ctx.query = query;
  // // 校验token
  // const header = ctx.request.headers;
  // if (ctx.request.path !== '/api/login') {
  //   const authorization = header.authorization;
  //   if (authorization) {
  //     let token = await SysToken.findOne({
  //       token: authorization
  //     }).exec();
  //     const data = verifyToken(authorization);
  //     if (!token || !data) {
  //       ctx.body= {
  //         success: false,
  //         status: 'noLogin',
  //         error_message: '未登陆'
  //       }
  //     }else {
  //       await next()
  //     }
  //   } else {
  //     ctx.body= {
  //       success: false,
  //       status: 'noLogin',
  //       error_message: '未登陆'
  //     }
  //   }
  // } else {
    await next()
  // }
}