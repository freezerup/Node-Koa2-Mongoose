const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义模型 会议室表模型
 */
const appointmentSchema = new Schema({
  meeting_id: String,
  start: Number,
  end: Number,
  appointment_name: String,
  appointment_mobile: String,
  appointment_number: Number,
  origin: String, // 事由
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;