// pages/dynamic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaVal :'',
    dynamicImgList :[]
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
  /*
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