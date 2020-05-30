const sign = '5876a4999aefdc0790ffdd7d9a26ec3b';
const base = 'https://xiaolinmanhua.zztv021.com/';
const utilMd5 = require('./md5.js');
// 封装post请求
const post = (url,data,datas) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base+url + '?' + datas.join('&'),
      data: {
        ...data
      },
      method: 'POST',
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base + url,
      data: {
        ...data
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
function getSign(params) {
  if (typeof params == "string") {
    return paramsStrSort(params);
  } else if (typeof params == "object") {
    var arr = [];
    for (var i in params) {
      arr.push((i + "=" + params[i]));
    }
    return paramsStrSort(arr.join(("&")));
  }
}

function paramsStrSort(paramsStr) {
  var urlStr = paramsStr.split("&").sort().join("&");
  var reg = new RegExp("&", "g");
  var reg2 = new RegExp("=", "g");
  var reg3 = new RegExp(",", "g");
  return utilMd5.hexMD5(sign + urlStr.replace(reg, "").replace(reg2, "") + sign);
}
export{
  post,
  get,
  getSign,
}