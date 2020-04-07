const mongoose = require('mongoose');
const SysFunction = mongoose.model('SysFunction');

/**
 * 功能列表
 */

 exports.functionLists = async (ctx, next) => {
  const functions = await SysFunction.find({}).exec();
  try {
    ctx.body = {
      success: true,
      functions
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
  * 添加功能
  */
 exports.addFunction = async (ctx, next) => {
  const query = ctx.query;
  let sysFunction = new SysFunction({
    name: query.name,
    desc: query.desc,
    icon: query.icon,
    type: query.type,
  });
  try {
    sysFunction = await sysFunction.save();
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next;
  }
 }

 /**
  * 删除功能
  */
 exports.deleteFunction = async (ctx, next) => {
  const condition = {_id: ctx.query._id};
  try {
    await SysFunction.remove(condition);
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next;
  }
 }

  /**
  * 更新功能
  */
 exports.updateFunction = async (ctx, next) => {
  const query = ctx.query;
  const condition = {_id: query._id};
  const data = await SysFunction.find(condition).exec();
  const update = {
    $set: {
      name: query.name || data.name,
      desc: query.desc || data.desc,
      icon: query.icon || data.icon,
      type: query.type || data.type,
    }
  }
  try {
    await SysFunction.update(condition, update);
    ctx.body = {
      success: true
    }
  }
  catch (e) {
    ctx.body = {
      success: false
    }
    return next;
  }
 }