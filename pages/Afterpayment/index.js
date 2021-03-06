// pages/Afterpayment/index.js
import { GetMyLike,getSign} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type :'',
    page : 1,
    pagesize : 10,
  },
  /*路由 */
  //返回首页
  router_home(){
    wx.switchTab({
      url: './../index/index'
    })
  },
  //商品详情
  router_productDetails(e){
    wx.navigateTo({
      url: '../productDetails/index?id='+ e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type : options.index
    })
    this.getMyLike();
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
    that.setData({
      page: that.data.page + 1
    })
    that.getMyLike()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API  */
  //猜你喜欢
  getMyLike(){
    let user_id = wx.getStorageSync('userId'),
    {page,pagesize,MyLike} = this.data;
    GetMyLike({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign : getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(arr=>{
          MyLike.push(arr)
        })
        this.setData({
          MyLike 
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