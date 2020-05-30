// pages/mall/index.js
import { GetGoodsBanner, GetGoodsCategory, GetHomeActiveGoods, GetRecommendGoods, getSign } from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Banner :[],
    page : 1,
    pagesize : 10
  },
  //路由
  //农家特产等
  router_mallList(e){
    // console.log(e)
    wx.navigateTo({
      url: '../mallList/index?id='+ e.currentTarget.dataset.id + '&title=' +  e.currentTarget.dataset.title,
    })
  },
  router_search(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  //消息
  router_news(){
    wx.switchTab({
      url: '../news/index'
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
    this.getGoodsBanner();
    this.getGoodsCategory();
    this.getHomeActiveGoods();
    this.getRecommendGoods();

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
  /**API */
  //商城banner
  getGoodsBanner(){
    GetGoodsBanner({
      rnd : 1,
      sign: getSign(`rnd=1`)
    }).then(res =>{
      if(res.data.ErrCode==0){
        console.log(res)
        this.setData({
          Banner : res.data.Response
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //商品类型
  getGoodsCategory(){
    GetGoodsCategory({
      rnd : 1,
      sign: getSign(`rnd=1`)
    }).then(res =>{
      if(res.data.ErrCode==0){
        console.log(res)
        this.setData({
          Category : res.data.Response
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //首页-活动商品
  getHomeActiveGoods(){
    GetHomeActiveGoods({
      rnd : 1,
      sign: getSign(`rnd=1`)
    }).then(res =>{
      if(res.data.ErrCode==0){
        console.log(res)
        this.setData({
          ActiveGoods : res.data.Response
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //推荐商品
  getRecommendGoods(){
    let {page,pagesize} = this.data;
    GetRecommendGoods({
      page: page,
      pagesize: pagesize,
      sign: getSign(`page=${page}&pagesize=${pagesize}`)
    }).then(res=>{  
      if(res.data.ErrCode==0){
        this.setData({
          RecommendGoods : res.data.Response
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }
})