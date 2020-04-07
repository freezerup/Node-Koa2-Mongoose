// 交互反馈

function confirmDialog(data) {
  wx.showModal({
    title: data.title,
    content: data.content,
    success: (res) => {
      if (res.confirm) {
        if (data.successBack) data.successBack();
      } else if (res.cancel) {
        if (data.errBack) data.errBack();
      }
    }
  })
}

function actionSheet(data) {
  console.log(data);
  wx.showActionSheet({
    itemList: data.itemList,
    success: function (res) {
      if (data.successBack) data.successBack(res.tapIndex);
    },
    fail: function (res) {
      if (data.errBack) data.errBack(res.errMsg);
    }
  })
}

function shareAppMessage(data) {
  return {
    title: data.title,
    path: data.path,
    imageUrl: data.imageUrl,
    success: function (res) {
      showToast({title: '转发成功'});
    },
    fail: function (res) {
      showToast({ title: '转发失败', icon: 'wran' });
    },
  }
}

function showToast(data) {
  wx.showToast({
    title: data.title,
    icon: data.icon || 'success',
    image: data.image,
    duration: data.duration || 2000
  });
}


module.exports = {
  confirmDialog: confirmDialog,
  actionSheet: actionSheet,
  shareAppMessage: shareAppMessage,
  showToast: showToast,
};