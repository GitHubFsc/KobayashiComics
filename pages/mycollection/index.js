// pages/mycollection/index.js
import {getSign,GetMyCollection} from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection : true,
    page : 1,
    pagesize:10,
    collectionList : []
  },
  /*路由*/
  //商品详情
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //收藏
  collection(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id)
    that.getMyCollection(id,res=>{
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none',
      })
      that.getMyCollection()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCollection()
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

  },
  //我的收藏 
  getMyCollection(id,callback){
    let user_id = wx.getStorageSync('userId');
    let {page,pagesize} = this.data;
    let data ={}
    if(id){
      data.user_id = user_id;
      data.goods_id = id;
      data.sign = getSign(`user_id=${user_id}&goods_id=${id}`)
    }else{
      data.user_id = user_id;
      data.page = page;
      data.pagesize = pagesize;
      data.sign = getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }
    GetMyCollection(data).then(res=>{
      if (res.data.ErrCode == 0) {
        if(id){
          callback && callback(res)
        }else{
          this.setData({
            collectionList : res.data.Response,
          })
        }
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  }
})