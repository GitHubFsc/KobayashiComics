// pages/integral/index.js
import { GetMyPoint,GetPointLog,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : 1,
    pagesize : 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPoint();
    this.getPointLog()
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
    that.getPointLog()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //积分
  getMyPoint(){
    let  user_id = wx.getStorageSync('userId');
    GetMyPoint({
      user_id : user_id,
      sign : getSign(`user_id=${user_id}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyPoint : res.data.Response
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
  //积分记录
  getPointLog(){
    let  user_id = wx.getStorageSync('userId');
    let {page,pagesize,PointLog} = this.data;
    GetPointLog({
      user_id : user_id,
      page :page,
      pagesize :pagesize,
      sign : getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(item=>{
          item.add_timespan = utils.formatTime(new Date(item.add_timespan))
          PointLog.push(item);
        })
        this.setData({
          PointLog
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