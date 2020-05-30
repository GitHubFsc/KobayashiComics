// pages/signature/index.js
import {getSign,PostSetinfo} from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal : ''
  },
  /*路由*/
  //确认
  router_my(){
    let inputVal = this.data.inputVal
    let user_id = wx.getStorageSync('userId');
    let userInfo = wx.getStorageSync('userInfo');
    let datas = [];
    datas.push("user_id="+user_id)
    datas.push('sign='+getSign(`user_id=${user_id}`))
    PostSetinfo({
      body: {
        individuality_signature : inputVal
      }
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        userInfo.individuality_signature = inputVal;
        wx.setStorageSync('userInfo', userInfo)
        wx.switchTab({
          url: './../my/index'
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
    wx.switchTab({
      url: './../my/index'
    })
  },
  /*事件 */
  //输入框输入事件
  bindinput(e){
    this.setData({
      inputVal : e.detail.value
    })
  },
  //输入框失焦事件
  bindblur(e){
    this.setData({
      inputVal : e.detail.value
    })
  },
  //输入框键盘事件
  bindconfirm(e){
    this.setData({
      inputVal : e.detail.value
    })
  },
  //确认

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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