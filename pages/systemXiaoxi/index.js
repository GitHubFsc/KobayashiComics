// pages/systemXiaoxi/index.js
import {GetSysNews,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : 1,
    pagesize : 10,
    News :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSysNews()
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
    let that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.getSysNews()
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
  //系统消息
  getSysNews(){
    let user_id = wx.getStorageSync('userId'),
        {page,pagesize,News} = this.data;
    GetSysNews({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign : getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(arr=>{
          arr.add_timespan = utils.formatTime(new Date(Number(res.data.Response.add_timespan)));
          News.push(arr)
        })
        this.setData({
          News
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