// pages/Logistics/index.js
import { GetOrderLogistics,getSign } from '../../utils/axios.js';
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id : null,
    Logistics : '',
    Start : '',
    End : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        order_id : options.id
      })
      this.getOrderLogistics(options.id)
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
  //订单物流
  getOrderLogistics(id) {
    let user_id = wx.getStorageSync('userId');
    let {Logistics,Start,End} = this.data;
    GetOrderLogistics({
      user_id: user_id,
      order_id: id,
      sign: getSign(`user_id=${user_id}&order_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        Start =  res.data.Response.courier_list.shift();
        End = res.data.Response.courier_list.pop();
        this.setData({
          Start,
          End,
          Logistics : res.data.Response,
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})