// pages/appraise/index.js
import {GetEvalList,getSign} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id : '',
    page : 1,
    pagesize: 10,
    EvalList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.id){
        this.setData({ 
          goods_id : options.id
        })
        this.getEvalList()
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
    let that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.getEvalList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //商品评价
  getEvalList(){
    let { goods_id, page , pagesize , EvalList} = this.data;
    GetEvalList({
      goods_id : goods_id,
      page : page ,
      pagesize : pagesize,
      sign : getSign(`goods_id=${goods_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(item=>{
          item.coupon_end_timespan = utils.ymr(Number(item.coupon_end_timespan));
          EvalList.push(item)
        })
        this.setData({
          EvalList
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }
})