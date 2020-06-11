// pages/Evaluation/index.js
import {PostAddEval,getSign } from '../../utils/axios.js';
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no: '',
    submit: true,
    goods: []
  },
  /*路由*/
  //返回首页
  router_home() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /*事件*/
  //文本框失焦
  TextAreaBlur(e) {
    let that = this;
    let goods = that.data.goods;
    goods[e.currentTarget.dataset.index].content =  e.detail.value;
    that.setData({
      goods
    })
  },
  //文本框确认
  TextAreaConfirm(e) {
    let that = this;
    let goods = that.data.goods;
    goods[e.currentTarget.dataset.index].content =  e.detail.value;
    that.setData({
      goods
    })
  },
  //评价星星
  star(e) {
    let that = this;
    let goods = that.data.goods;
    let {LitUp,Unlit} = goods[e.currentTarget.dataset.index];
    let num = e.currentTarget.dataset.num;
    if (e.currentTarget.dataset.type == 0) {
      LitUp = num - 1
      Unlit = 5 - LitUp
    } else {
      LitUp = num + LitUp
      Unlit = 5 - LitUp
    }
    goods[e.currentTarget.dataset.index].LitUp = LitUp;
    goods[e.currentTarget.dataset.index].Unlit = Unlit;
    that.setData({
      goods
    })
  },

  //上传图片
  addImg(e) {
    let that = this;
    console.log(e)
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        that.postUploadFile(e.currentTarget.dataset.index,res.tempFilePaths);
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //图片预览
  previewImage(e) {
    let that = this;
    let goods= that.data.goods;
    let img_url = goods[e.currentTarget.dataset.index].img_url.map(item => {
      return item.img_url;
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: img_url // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delete(e) {
    let that = this;
    let goods= that.data.goods;
    goods[e.currentTarget.dataset.index].img_url.splice(e.currentTarget.dataset.idx, 1);
    that.setData({
      goods
    })
    console.log("goods",that.data.goods);
  },


  //提交
  submit() {
    let that = this;
    that.postAddEval(res=>{
      that.setData({
        submit: false
      })
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data) {
      
      this.setData({
        goods: JSON.parse(options.data),
        order_no : options.order_no
      })
      console.log(this.data)
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
  //文件上传
  postUploadFile(index,arr) {
    console.log(arr);
    let that = this;
    let goods= that.data.goods;
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
            goods[index].img_url.push({
              "img_url": p.Response
            })
            console.log("goods[index].img_url", goods[index].img_url);
            that.setData({
              goods
            })
            console.log("goods",that.data.goods);
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
  //订单-添加评价
  postAddEval(callback){
    let user_id = wx.getStorageSync('userId');
    let {goods,order_no}	= this.data,body =[];
    goods.map(arr=>{
      body.push({
        order_goods_id : arr.order_goods_id,
        start_num : arr.LitUp,
        img_url : arr.img_url.map(arr=>{return arr.img_url}),
        content : arr.content,
      })
    })
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('order_no=' + order_no)
    datas.push('sign=' + getSign(`user_id=${user_id}&order_no=${order_no}`))
    PostAddEval({
      body: body
    },datas).then(res => {
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
})