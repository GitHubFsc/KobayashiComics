// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend :['全部','待付款','待发货','待收货','待评价'],
    currentTab : 0,
    steps : 3,
    loading: false
  },
  //路由
  router_orderDetails(e){
    console.log(e.currentTarget.dataset.order_no)
    wx.navigateTo({
      url: '../orderDetails/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  //查看物流
  router_Logistics(e){
    wx.navigateTo({
      url: '../Logistics/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  //评价
  router_Evaluation(e){
    wx.navigateTo({
      url: '../Evaluation/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  /**事件*/
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },
  /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e,(data)=>{
      console.log("手机号回调",data)
      if(data){
        that.setData({
          steps : 1 ,
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
    app.getUserInfo(e,(data)=>{
      console.log("用户回调",data)
      if(data){
        that.setData({
          steps : 2 ,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data)=>{
      console.log("登录成功",data)
      if(data){
        that.setData({
          steps : 3 ,
          loading: false,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps : 3 
      })
    } else {
      this.setData({
        steps : 0
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