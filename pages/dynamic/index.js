// pages/dynamic/index.js
import {
  PostAddNews,
  PostUploadFile,
  GetGoodsDetail,
  getSign
} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textareaVal: '',
    dynamicImgList: [],
    steps: 3,
    loading: false
  },
  /*路由*/
  //商品链接
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //发布
  router_shareSuccess() {
    let that = this;
    that.postAddNews(res => {
      console.log(res);
      // wx.navigateTo({
      //   url: '../shareSuccess/index'
      // })
    })

  },
  /*事件*/
  //
  textareaBlur(e) {
    console.log(e.detail)
    this.setData({
      textareaVal: e.detail.value
    })
  },
  textareaConfirm(e) {
    console.log(e.detail)
    console.log(e.detail)
    this.setData({
      textareaVal: e.detail.value
    })
  },
  //图片上传
  addimg() {
    let that = this;
    let dynamicImgList = that.data.dynamicImgList;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        that.postUploadFile(res.tempFilePaths);
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //图片预览e
  preview(e) {
    let that = this;
    let dynamicImgList = that.data.dynamicImgList.map(item => {
      return item.img_url
    });
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: dynamicImgList // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delete(e) {
    let that = this;
    let dynamicImgList = that.data.dynamicImgList;
    dynamicImgList.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      dynamicImgList
    })
  },
  /*
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps: 3
      })
    } else {
      this.setData({
        steps: 0
      })
    }
    if (options.id) {
      console.log(options.id);
      this.setData({
        goods_id: options.id
      })
      this.getGoodsDetail();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e, (data) => {
      console.log("手机号回调", data)
      if (data) {
        that.setData({
          steps: 1,
          loading: false,
        })
      }
    })
  },
  //获取用户信息
  getUserInfo(e) {
    let that = this;
    that.setData({
      loading: true
    })
    app.getUserInfo(e, (data) => {
      console.log("用户回调", data)
      if (data) {
        that.setData({
          steps: 2,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data) => {
      console.log("登录成功", data)
      if (data) {
        that.setData({
          steps: 3,
          loading: false,
        })
      }
    })
  },
  //文件上传
  postUploadFile(arr) {
    console.log(arr);
    let that = this;
    let dynamicImgList = that.data.dynamicImgList;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      wx.uploadFile({
        url: 'https://xiaolinmanhua.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
        filePath: arr[i],
        name: 'file',
        formData: {},
        success(res) {
          console.log("res2222", res);
          var p = JSON.parse(res.data);
          console.log(p)
          if (p.ErrCode == 0) {
            dynamicImgList.push({
              "img_url": p.Response
            })
            console.log("dynamicImgList", dynamicImgList);
            that.setData({
              dynamicImgList
            })
          } else {
            wx.showToast({
              title: p.ErrMsg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  //发布资讯
  postAddNews(callback) {
    let user_id = wx.getStorageSync('userId');
    let goods_id	= this.data.goods_id;
    let dynamicImgList = this.data.dynamicImgList.map(arr => {
        return arr.img_url;
      }),
      textareaVal = this.data.textareaVal;
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('sign=' + getSign(`user_id=${user_id}`))
    PostAddNews({
      body: {
        img_url: dynamicImgList,
        content: textareaVal,
        goods_id: goods_id?goods_id:0,
        type: 2,
        video: '',
      }
    }, datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  },
  //商品详情
  getGoodsDetail() {
    let goods_id	= this.data.goods_id;
    let user_id = wx.getStorageSync('userId');
    GetGoodsDetail({
      goods_id :goods_id,
      user_id : user_id,
      sign : getSign(`goods_id=${goods_id}&user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          GoodsDetail : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }

})