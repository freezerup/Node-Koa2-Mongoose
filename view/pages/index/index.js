//index.js
const ajax = require('../../http/ajax.js');

Page({
  data: {
    functions: [],
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '功能列表'
    });
    this.getData();
  },
  getData() {
    const that = this;
    ajax.asyncAwaitCall({
      url: 'function/list',
    }).then((response) => {
      that.setData({
        functions: response.functions
      });
    });
  },
  handleDetail(e) {
    const currentType = e.currentTarget.dataset.type;
    switch (currentType) {
      case 'meeting':
        wx.navigateTo({
          url: '../meeting/index/index',
        });
        break;
      case 'station':
        wx.navigateTo({
          url: '../station/station',
        });
        break;
      default:
        break;
    }
  },
})
