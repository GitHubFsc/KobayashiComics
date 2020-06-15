// pages/commentMessage/index.js
import {GetCommentsNews,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pagesize: 10,
    Comments :[]
  },

  /**路由 */
  //社区详情
  router_communityDetails(e) {
    wx.navigateTo({
      url: '../communityDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommentsNews()
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
    this.setData({
      page : this.data.page + 1
    })
    this.getCommentsNews()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //系统消息
  getCommentsNews() {
    let user_id = wx.getStorageSync('userId'),
      { page,  pagesize , Comments} = this.data;
      GetCommentsNews({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(arr => {
          arr.add_timespan = utils.formatTime(new Date(Number(arr.add_timespan)));
          Comments.push(arr);
        })
        this.setData({
          Comments
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