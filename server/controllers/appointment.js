const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const Meeting = mongoose.model('Meeting');

/**
 * 预约会议室
*/

exports.addAppointment = async (ctx, next) => {
  const query = ctx.query;
  const _start = query.start;
  const _end = query.end;
  let appointment = new Appointment({
    meeting_id: query.meetingId,
    start: _start,
    end: _end,
    appointment_name: query.appointmentName,
    appointment_mobile: query.appointmentMobile,
    appointment_number: query.appointmentNumber,
    origin: query.origin, // 事由
  });
  const appointments  = await Appointment.find({}).exec();
  appointments.forEach((appointment) => {
    if ((_start < appointment.end && _start > appointment.start) || (_end < appointment.end || _end > appointment.start)) {
      ctx.body = {
        success: false,
        error_message: '该时间段已有预约'
      }
    }
  })
  try {
    appointment = await appointment.save();
    ctx.body = {
      success: true,
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
 * 更新预约信息
*/

exports.updateAppointment = async (ctx, next) => {
  const query = ctx.query;
  const condition = {_id: query._id};
  const data = await Appointment.find(condition).exec();
  const update = {
    $set: {
      meeting_id: data.meeting_id,
      start: query.start || data.start,
      end: query.end || data.end,
      appointment_name: query.appointmentName || data.appointmentName,
      appointment_mobile: query.appointmentMobile || data.appointmentMobile,
      appointment_number: query.appointmentNumber || data.appointmentNumber,
      origin: query.origin || data.origin, // 事由
    }
  }
  try {
    await Appointment.update(condition, update);
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
 * 结束预约
 */

exports.deleteAppointment = async (ctx, next) => {
  console.log(ctx.query);
  const condition = {_id: ctx.query._id};
  try {
    await Appointment.remove(condition);
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
 *  预约信息列表
 */
exports.appointmentLists = async (ctx, nex) => {
  const query = ctx.query || {};
  const data  = await Appointment.find(query).exec();
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
