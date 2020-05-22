// pages/homestaySubmitOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IntoTime : '',
    OutTime :'',
    peopleNumList: ['1人','2人','3人'],
    peopleNum : '1人',
    Tenant_nmae :'',
    Tenant_userId :'',
    Tenant_phone:'',
    switchChecked : false,
    peopleBox :true,
    calendar_box : true,
    userList:[{
      name:'张三',
      userId:'410423200002061511',
      userflag : false,
    },{
      name:'李四',
      userId:'410423200002061511',
      userflag : false,
    },{
      name:'王五',
      userId:'410423200002061511',
      userflag : false,
    }]
  },
  /**路由 */
  //支付
  router_topay(){
    wx.navigateTo({
      url: './../Afterpayment/index?index=1'
    })
  },
  //发票
  router_invoice(){
    console.log("开发票")
  },
  //添加入住人
  router_addResident(){
    wx.navigateTo({
      url: './../addResident/index'
    })
  },
  /*事件*/
  bindPickerChange(e){
    let that = this;
    that.setData({
      peopleNum: that.data.peopleNumList[e.detail.value]
    })
  },
  IntoOtu(){
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box
    })
  },
  close(){
    let that = this;
    that.setData({
      calendar_box : !that.data.calendar_box
    })
  },
  Tenant(){
    let that = this;
    that.setData({
      peopleBox: !that.data.peopleBox
    })
  },
  determine(){
    let that = this;
    that.setData({
      peopleBox: !that.data.peopleBox,
    })
    that.data.userList.map(item=>{
      if(item.userflag){
        console.log("选中",item.name)
      }else{
        console.log("未选中",item.name)
      }
    })
  },
  Selected(e){
    let that = this;
    let userList = that.data.userList;
    userList[e.currentTarget.dataset.index].userflag = !userList[e.currentTarget.dataset.index].userflag,
    that.setData({
      userList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  peopleBox(){

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