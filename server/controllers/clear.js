const mongoose = require('mongoose');
const User = mongoose.model('User');
const Appointment = mongoose.model('Appointment');
const Meeting = mongoose.model('Meeting');
const SysFunction = mongoose.model('SysFunction');
const models = [User, Appointment, Meeting, SysFunction];

exports.clearAll = async (ctx, next) => {
  const index = parseInt(ctx.params.id);
  await models[index].remove();
  try {
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