// pages/dynamic/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textareaVal :'',
    dynamicImgList :[],
    steps : 3,
    loading: false
  },
  /*路由*/
  //商品链接
  router_productDetails(e){
    wx.navigateTo({
      url: '../productDetails/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //发布
  router_shareSuccess(){
    wx.navigateTo({
      url: '../shareSuccess/index'
    })
  },
  /*事件*/
  //
  textareaBlur(e){
    console.log(e.detail)
  },
  textareaConfirm(e){
    console.log(e.detail)
  },
  //图片上传
  addimg(){
    let that = this;
    let dynamicImgList = that.data.dynamicImgList;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        res.tempFilePaths.map(item=>{
          dynamicImgList.push({
            img_url : item
          })
        })
        that.setData({
          dynamicImgList
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  //图片预览e
  preview(e){
    let that = this;
    let dynamicImgList = that.data.dynamicImgList.map(item=>{
      return item.img_url
    });
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: dynamicImgList // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delete(e){
    let that = this;
    let dynamicImgList = that.data.dynamicImgList;
    dynamicImgList.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      dynamicImgList
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

  /*
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