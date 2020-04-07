const app = getApp()
const tool = require('../../../js/lib/interactive.js');
const ajax = require('../../../http/ajax.js');
const utils = require('../../../utils/util.js');

Page({
  data: {
    appointments: [],
    limit: true
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的预约'
    });
    this.getData();
  },
  // 获取数据
  getData() {
    const that = this;
    ajax.asyncAwaitCall({
      url: 'appointment/list',
      data: {appointment_mobile: app.globalData.userData.mobile}
    }).then((response) => {
      const data = response.data;
      if (data) {
        const appointments = that.formatAppointments(data);
        that.setData({
          appointments
        });
      } else {
        console.log('error');
      }
    });
  },
  // 格式化数据
  formatAppointments(data) {
    const _data = data.sort((a, b) => {
      return a.start > b.start;
    });
    _data.map(item => {
      const _start = utils.formatTime(item.start, 'minute');
      const _end = utils.formatTime(item.end, 'minute');
      item.appointmentDay = utils.formatTime(item.start, 'day');
      item.appointmentTime = `${_start}--${_end}`
    });
    return _data;
  },
  // 电话
  handlePhoneCall(e) {
    const phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  // 侧滑删除
  doDel(e) {
    const id = e.target.id;
    wx.showModal({
      title: '确认结束',
      content: '',
      success: (res) => {
        if (res.confirm) {
          this.handleDelete(id)
        }
      }
    })
  },
  handleDelete(id) {
    ajax.asyncAwaitCall({
      url: `appointment/delete?_id=${id}`,
      method: 'DELETE',
    }).then((response) => {
      this.getData();
      tool.showToast({title: '已结束'});
    });
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getData();
  },
})