//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userData: {},
    title: '我的预约'
  },
  onLoad: function () {
    if (app.globalData.userData) {
      this.setData({
        userData: app.globalData.userData,
      })
    }
  },
  handleToAppoint() {
    wx.navigateTo({
      url: '/pages/mine/appointment/appointment',
    });
  }
})
