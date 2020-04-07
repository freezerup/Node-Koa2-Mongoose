const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 定义模型 会议室表模型
 */
const meetingSchema = new Schema({
  name: String,
  position: String,
  capacity: Number,
  equipment: String,
  icon: String,
  status: {
    type: Boolean,
    default: true,
  },
  appointment_list: [{
    start: Number,
    end: Number,
  }],
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;