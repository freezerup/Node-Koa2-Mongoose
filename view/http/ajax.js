var app = getApp();

const method = 'GET';
const dataType = 'json';
const responseType = 'text';
// const header = {
//   'content-type': 'application/x-www-form-urlencoded',
//   'Authorization': app.globalData.token
// };

function asyncAwaitCall(obj) {
  loadingHandle(obj);
  return new Promise(function (resolve) {
    wx.request({
      url: `${app.globalData.apiBase}/${obj.url}`,
      header: {
        'authorization': wx.getStorageSync('adminToken')
      },
      method: obj.method || method,
      data: obj.data || '',
      dataType: obj.dataType || dataType,
      responseType: obj.responseType || responseType,
      success: function (response) {
        const { data } = response;
        if (response.statusCode >= 200 && response.statusCode < 300){
          console.log(data);
          if (data.success) {
            resolve(data);
          } else if (data.status === 'noLogin') {
            const pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];
            var url = currentPage.route;
            wx.reLaunch({
              url: `/pages/login/login?redirct=${url}`,
            })
          }else {
            wx.showToast({
              title: `${data.error_message}`,
              icon: 'none',
            });
            return;
          }
        } else {
          resolve({
            error: data,
            errorType: 'error'
          });
        }
      },
      fail: function(error) {
        errorHandle(Object.assign(obj, {
          error_message: '请求异常'
        }));
        resolve({
          error: error,
          errorType: 'fail'
        });
      },
      complete: function () { 
        // 此处wechat存在hideLoading会关闭showToast的bug
        // bug: https://developers.weixin.qq.com/blogdetail?action=get_post_info&docid=d9acd2beaa983f2cdf1cd1871d47d3c4&highline=loading%7C%26hideloading%7C%26toast&token=&lang=zh_CN
        loadingHandle();
      }
    });
  });
}

// 是否开启接口请求loading
function loadingHandle(obj) {
  if (obj && !obj.loading) {
    wx.showLoading({
      title: obj.loadingText || '加载中',
    });
  } else {
    wx.hideLoading();
  }
}

// 是否提示异常信息
function errorHandle(obj) {
  if (obj && !obj.error) {
    setTimeout(() => {
      wx.showToast({
        title: obj.error_message || '服务器繁忙，请稍后重试',
        icon: 'none'
      });
    }, 300);
  }
}

module.exports.asyncAwaitCall = asyncAwaitCall;