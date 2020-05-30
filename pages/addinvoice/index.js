// pages/addinvoice/index.js
import {getSign, PostAddInvoice } from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceId: 0,
    type: 1,
    title: '',
    ein: '',
    email: '',
  },
  /*路由*/
  //返回上一页
  router_back() {
    let that = this;
    that.postAddInvoice(res=>{
      wx.navigateBack({
        delta: 1
      })
    })
  },
  /*事件*/
  //选择发票类型
  selected(e) {
    let that = this;
    if (e.currentTarget.dataset.index == 0) {
      that.setData({
        type: e.currentTarget.dataset.index
      })
    } else {
      that.setData({
        type: e.currentTarget.dataset.index
      })
    }
  },
  titleblur(e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  einblur(e) {
    console.log(e);
    this.setData({
      ein: e.detail.value
    })
  },
  emailblur(e) {
    console.log(e);
    this.setData({
      email: e.detail.value
    })
  },
  /**API */
  //新增发票
  postAddInvoice(callback) {
    let user_id = wx.getStorageSync('userId');
    let {invoiceId,type,title,ein,email} = this.data;
    let datas = [];
    datas.push('user_id='+user_id)
    datas.push('sign='+getSign(`user_id=${user_id}`))
    PostAddInvoice({
      body: {
        id: invoiceId?invoiceId:'0',
        type: type,
        title: title,
        ein: ein,
        email: email
      }
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      this.setData({
        invoiceId: options.id,
        type: options.type,
      })
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

  }
})