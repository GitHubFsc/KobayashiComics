// pages/shoppingcart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList :[{
      car : false,
      sp_img : './../images/mall1.png',
      sp_num : 1
    },{
      car : false,
      sp_img : './../images/mall1.png',
      sp_num : 1
    },{
      car : false,
      sp_img : './../images/mall1.png',
      sp_num : 1
    },{
      car : false,
      sp_img : './../images/mall1.png',
      sp_num : 1
    }],
    editcar : true,
    allselect : false
  },
  /*路由*/
  router_topay(){
    wx.navigateTo({
      url: './../Afterpayment/index?index=0'
    })
  },
  /* 事件 */
  editcar(){
    let that = this;
    that.setData({
      editcar : !that.data.editcar
    })
  },

  select(e){
    let that = this;
    let carList = that.data.carList;
    carList[e.currentTarget.dataset.index].car = !carList[e.currentTarget.dataset.index].car;
    that.setData({
      carList 
    })
  },
  editspNum(e){
    let that = this;
    let carList = that.data.carList;
    if(e.currentTarget.dataset.type==0){
      carList[e.currentTarget.dataset.index].sp_num>1?carList[e.currentTarget.dataset.index].sp_num--:1
    }else{
      carList[e.currentTarget.dataset.index].sp_num++
    }
    that.setData({
      carList 
    })
  },
  allselect(){
    let that = this;

    let carList = that.data.carList;
    let allselect = ! that.data.allselect;
    carList.map(item=>{
      item.car = allselect;  
    })
    that.setData({
      carList ,
      allselect,
    })
  },
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