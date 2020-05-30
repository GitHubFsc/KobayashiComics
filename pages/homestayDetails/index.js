// pages/homestayDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homestayId :0,
    UnittypeIdx : 0,
    week: ['日', '一', '二', '三', '四', '五', '六'],
    value: '2020-05-18',
    selectInto: '',
    selectOut: '',
    calendar : true,
    calendar_box : true,
    steps : 3,
    loading: false
  },
  /*路由*/
  router_book(){
    wx.navigateTo({
      url: './../homestaySubmitOrder/index?id' + this.data.homestayId
    })
  },
  /*事件*/
  Unittype(e){
    let that = this;
    that.setData({
      UnittypeIdx : e.currentTarget.dataset.index,
    })
  },
  calendar(e){
    console.log(e.currentTarget.dataset.index)
    let that = this;
    that.setData({
      calendar : e.currentTarget.dataset.index==0?false:true,
    })
  }, 
  OpenCalendar(e){
    let that = this;
    that.setData({
      calendar_box : !that.data.calendar_box,
      calendar : e.currentTarget.dataset.index==0?false:true,
    })
  },
  close(){
    let that = this;
    that.setData({
      calendar_box : !that.data.calendar_box
    })
  },
  workerClockData(e){
    console.log(workerClockData);
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