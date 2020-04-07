const mongoose = require('mongoose');
const Meeting = mongoose.model('Meeting');

/**
 * 添加会议室
*/

exports.addMeeting = async (ctx, next) => {
  const query = ctx.query;
  let meeting = new Meeting({
    name: query.name,
    position: query.position,
    capacity: query.capacity,
    equipment: query.equipment,
    icon: query.icon,
  });
  try {
    meeting = await meeting.save()
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
 * 更新会议室信息
*/

exports.updateMeeting = async (ctx, next) => {
  const query = ctx.query;
  const condition = {_id: query._id};
  const data = await Meeting.find(condition).exec();
  const update = {
    $set: {
      name: query.name || data.name,
      position: query.position || data.position,
      capacity: query.capacity || data.capacity,
      status: query.status || data.status,
      equipment: query.equipment || data.equipment,
      icon: query.icon || data.icon,
    }
  }
  try {
    meeting = await Meeting.update(condition, update);
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
 * 删除会议室
 */

exports.deleteMeeting = async (ctx, next) => {
  const condition = {_id: ctx.query._id};
  try {
    meeting = await Meeting.remove(condition);
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
 *  会议室列表
 */
exports.meetingLists = async (ctx, nex) => {
  const query = ctx.query || {};
  const data = await Meeting.find(query).exec();
  try {
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
