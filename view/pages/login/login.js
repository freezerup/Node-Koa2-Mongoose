const ajax = require('../../http/ajax.js');
const app = getApp();
Page({
  data: {
    mobile: '',
    password: '',
    redirct: ''
  },
  onLoad: function (options) {
    console.log(options);
    if (options.redirct) {
      this.setData({
        redirct: options.redirct,
      })
    }
  },
  getMobile(e) {
    const mobile = e.detail.value;
    this.setData({
      mobile: `${mobile}`
    });
  },
  getPassword(e) {
    const password = e.detail.value;
    this.setData({
      password
    });
  },
  handleLogin() {
    const that = this;
    // that.getUserInfo();
    const mobileReg = /^1\d{10}$/;
    const mobile = that.data.mobile;
    const password = that.data.password;
    if (!(mobile.length === 11) || !(mobileReg.test(mobile))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      });
      return;
    }
    ajax.asyncAwaitCall({
      method: 'POST',
      url: `login?mobile=${mobile}&password=${password}`,
    }).then((res) => {
      console.log(res);
      if (res.success) {
        wx.setStorageSync('adminToken', res.token);
        app.globalData.userData = res.userInfo;
        if (this.redirct) {
          wx.reLaunch({
            url: `/${this.redirct}`
          })
        } else {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    });
  },
  // getUserInfo() {
  //   const that = this;
  //   wx.getUserInfo({
  //     success: res => {
  //       app.globalData.userInfo = res.userInfo
  //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //       // 所以此处加入 callback 以防止这种情况
  //       if (that.userInfoReadyCallback) {
  //         that.userInfoReadyCallback(res)
  //       }
  //     }
  //   });

  // },

})