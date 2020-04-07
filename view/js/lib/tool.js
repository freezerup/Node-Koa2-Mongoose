
// 节流 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
function throttle(fn, threshhold = 250, scope) {
  let last, timer;
  return function () {
    let context = scope || this,
      now = +new Date(),
      args = arguments;
    if (last && now - last + threshhold < 0) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// 去抖 当调用动作过n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间
function debounce(method, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(context, args);
    }, delay);
  }
}

// 深拷贝(慎用)
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

// 去除左右空格
function _trim(d) {
  return d.replace(/^\s+/, '').replace(/\s+$/, '')
}

//生成小程序二维码
function createWxCode(obj) {
  const query = {
    path: obj.path || '/pages/index/index',
    width: obj.width || 430,
    auto_color: obj.auto_color || false,
    line_color: obj.line_color || { "r": "255", "g": "85", "b": "65" },
  };
  return getAccessToken().then((access_token) => {
    wx.request({
      url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
      data: query,
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  })
}
// 获取access_token https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
function getAccessToken() {
  return new Promise((resolve) => {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf1ee9704ceb741b1&secret=5863fcec67790145fe276531e15ad458',
      success: function (res) {
        const access_token = res.data.access_token;
        resolve(access_token);
      }
    });
  })
}

//加速度计实现 摇一摇
function Shake(opts) {
  this.shakeThreshold = opts.shakeThreshold || 120; // 频率阈值
  this.lastX = 0;
  this.lastY = 0;
  this.lastZ = 0;
  this.lastUpdate = 0;
  this.isStart = true;
  this.endCallBack = opts.callback;
  this.start();
}
Shake.prototype.start = function() {
  let { shakeThreshold, lastX, lastY, lastZ, lastUpdate, isStart, endCallBack } = this;
  wx.onAccelerometerChange((res) => {
    let now = new Date().getTime();
    if ((now - lastUpdate) > 100) {
      let curX = res.x
      let curY = res.y
      let curZ = res.z
      let speed = Math.abs(curX + curY + curZ - lastX - lastY - lastZ) / (now - lastUpdate) * 10000
      if (speed > shakeThreshold && isStart) {
        isStart = false;
        this.endCallBack && this.endCallBack()
        setTimeout(() => {
          isStart = true
        }, 2000);
      }
      lastUpdate = now
      lastX = curX
      lastY = curY
      lastZ = curZ
    }
  });
}

// 获取二维码文件临时路径
function getDownloadFile (url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve('');
      return false;
    }
    wx.downloadFile({
      url: url,
      success: function (response) {
        if (response.statusCode === 200) {
          resolve(response.tempFilePath);
        } else {
          reject('faill');
        }
      },
      fail: function () {
        reject('faill');
      }
    })
  });
}

module.exports = {
  throttle: throttle,
  debounce: debounce,
  deepCopy: deepCopy,
  _trim: _trim,
  createWxCode: createWxCode,
  Shake: Shake,
  getDownloadFile: getDownloadFile,
};