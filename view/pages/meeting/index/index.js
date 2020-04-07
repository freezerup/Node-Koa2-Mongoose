const ajax = require('../../../http/ajax.js');

Page({
  data: {
    meetings: [],
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '会议室'
    });
    this.getData();
  },
  getData() {
    const that = this;
    ajax.asyncAwaitCall({
      url: 'meeting/list',
    }).then((response) => {
      that.setData({
        meetings: response.data
      });
    });
  },
  handleDetail(e) {
    const id = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/meeting/detail/detail?id=${id}&title=${title}`,
    });
  },
})
