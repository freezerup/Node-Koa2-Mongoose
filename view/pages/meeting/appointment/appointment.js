const app = getApp();
const tools = require('../../../js/lib/tool.js');
const utils = require('../../../utils/util.js');
const ajax = require('../../../http/ajax.js');

const INTERVAL = 7;// 默认可选择7天内的日期
const HOUR_START = 9, HOUR_END = 22; // 默认可选小时 9-22
const DATE = '请选择预约日期';
const START_TIME = '请选择开始时间';
const END_TIME = '请选择结束时间';

Page({
  data: {
    meetingId: '',
    userData: {},
    appointments: [],
    days: [],
    hoursStart: [],
    minutesStart: [],
    hoursEnd: [],
    minutesEnd: [],
    start: '',
    end: '',
    pickerTimeDisabled: true,
    timeSlot: '', // 该日已被预约时间段
    designAppointment: [] // 该日预约信息
  },
  onLoad: function (options) {
    const id = "5af2a5aed218b81c1b7f48b1";
    wx.setNavigationBarTitle({
      title: `预约${options.title}`
    });
    this.setData({
      meetingId: options.id || id,
      title: options.title,
      userData: app.globalData.userData,
    });
    this.getData();
    this.initDate();
  },
  // 获取该会议室预约信息
  getData() {
    const id = this.data.meetingId;
    const that = this;
    ajax.asyncAwaitCall({
      url: 'appointment/list',
      data: { meeting_id: id }
    }).then((response) => {
      const data = response.data;
      if (data) {
        that.setData({
          appointments: data
        });
      } else {
        console.log('error');
      }
    });
  },
  // 初始化预约时间
  initDate() {
    const days = this.formatDays();
    this.setData({
      days,
      appointmentDate: DATE,
      appointmentTimeStart: START_TIME,
      appointmentTimeEnd: END_TIME,
      appointmentNum: 2,
      origin: '',
    });
  },
  // 默认可选择7天内的日期
  formatDays() {
    const days = [];
    const now = new Date().getTime();
    for (let i = 0; i < INTERVAL; i++) {
      const day = now + i * 24 * 60 * 60 * 1000;
      const cur = utils.formatTime(day, 'day');
      days.push(cur);
    }
    return days;
  },
  // 选择日期
  bindDateChange(e) {
    const index = e.detail.value;
    const appointmentDate = this.data.days[index];
    this.timeSlot(appointmentDate);
    if (this.data.appointmentDate !== appointmentDate) {
      this.setData({
        appointmentDate,
        pickerTimeDisabled: false,
        appointmentTimeStart: START_TIME,
        appointmentTimeEnd: END_TIME,
      })
    }
  },
  // 该日期 已被预约时间段
  timeSlot(day) {
    const times = this.data.appointments.filter(appointment => {
      return utils.formatTime(appointment.start, 'day') === day;
    });
    if (times.length) {
      this.setData({
        designAppointment: times
      });
      const slots = [];
      times.forEach(time => {
        const _time = `${utils.formatTime(time.start, 'minute')}-${utils.formatTime(time.end, 'minute')}`;
        slots.push(_time);
      });
      this.setData({
        timeSlot: slots.join(';')
      })
    }
  },
  // 选择开始时间
  bindStartTimeChange(e) {
    const value = e.detail.value;
    const _start = this.dateToMillisecond(this.data.appointmentDate, value);
    if (this.data.appointmentTimeEnd !== END_TIME) {
      // 转化毫秒比较大小
      const _end = this.dateToMillisecond(this.data.appointmentDate, this.data.appointmentTimeEnd);
      if (_start >= _end) {
        wx.showToast({
          title: '请选择正确的时间段',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    this.setData({
      appointmentTimeStart: value,
      start: _start,
    })
  },
  // 选择结束时间
  bindEndTimeChange(e) {
    const value = e.detail.value;
    const _end = this.dateToMillisecond(this.data.appointmentDate, value);
    if (this.data.appointmentTimeStart !== START_TIME) {
      // 转化毫秒比较大小
      const _start = this.dateToMillisecond(this.data.appointmentDate, this.data.appointmentTimeStart);
      if (_start >= _end) {
        wx.showToast({
          title: '请选择正确的时间段',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    this.setData({
      appointmentTimeEnd: value,
      end: _end
    })
  },
  // YYY/MM/DD HH:MM:SS => ms
  dateToMillisecond(day, time) {
    const _date = `${day} ${time}:00`;
    const millisecond = new Date(_date).getTime();
    return millisecond;
  },
  // 预约人数
  bindNumChange(e) {
    this.setData({
      appointmentNum: e.detail.value,
    })
  },
  // 预约事由、备注
  bindTextAreaBlur(e) {
    console.log
    this.setData({
      origin: e.detail.value
    })
  },
  // 判断 预约时间段是否已被占用
  judgeTimeUsed() {
    const len = this.data.designAppointment.length;
    let flag = true;
    if (len) {
      const _end = this.data.end;
      const _start = this.data.start;
      for (let i = 0; i < len; i ++) {
        const appointment = this.data.designAppointment[i];
        if ((_start <= appointment.end && _start >= appointment.start) || (_end <= appointment.end && _end >= appointment.start)) {
          wx.showToast({
            title: '该时间段已有预约',
            icon: 'none',
            duration: 2000
          });
          flag = false;
          break;
        }
      }
    }
    return flag;
  },
  // 对象转 = 连接
  objectToString(opts) {
    let s = '';
    if (typeof opts === 'object') {
      for (let key in opts) {
        s += `${key}=${opts[key]}&`;
      }
    }
    return s;
  },
  // 立即预约
  handleAppointment() {
    const data = {
      meetingId: this.data.meetingId,
      start: this.data.start,
      end: this.data.end,
      appointmentName: this.data.userData.name,
      appointmentMobile: this.data.userData.mobile,
      appointmentNumber: this.data.appointmentNum,
      origin: this.data.origin, // 事由
    }
    if (!data.start || !data.end || !data.origin.length) {
      wx.showToast({
        title: '请把预约信息填写完整',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const falg = this.judgeTimeUsed();
    if (!falg) {
      return;
    }
    const query = this.objectToString(data);
    ajax.asyncAwaitCall({
      url: `appointment/add?${query}`,
      method: 'POST',
    }).then((response) => {
        this.getData();
        this.initDate();
        wx.showToast({
          title: '预约成功',
          duration: 2000
        });
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})