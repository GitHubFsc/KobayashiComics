// pages/mallList/index.js
import { GetGoodsList,GetActiveGoods, getSign } from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab :'',
    mallList:[],
    category_id : '',
    keywords :'',
    page : 1,
    pagesize : 10,
  },
  /*路由*/
  //商品详情
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //事件
  nav_tab(e){
    let category_id = this.data.category_id;
    this.setData({
      page : 1,
      mallList:[],
      currentTab : e.target.dataset.index
    })
    if(category_id<0){
      this.getActiveGoods()
    }else{
      this.getGoodsList()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    
    this.setData({
      category_id : options.id,
      keywords :options.title
    })
    if(options.id<0){
      this.getActiveGoods()
    }else{
      this.getGoodsList()
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
    let that = this;
    that.setData({
      page: that.data.page + 1
    })
    if(that.data.category_id<0){
      that.getActiveGoods()
    }else{
      that.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //商品列表
  getGoodsList(){
    let {category_id,keywords,currentTab,page,pagesize,mallList} = this.data;
    let type = currentTab+1;
    GetGoodsList({
      category_id: category_id,
      keywords: keywords,
      type: type,
      page: page,
      pagesize: pagesize,
      sign: getSign(`category_id=${category_id}&keywords=${keywords}&type=${type}&page=${page}&pagesize=${pagesize}`)
    }).then(res=>{
      if(res.data.ErrCode ==0){
        res.data.Response.map(arr=>{
          mallList.push(arr)
        })
        this.setData({
          mallList
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //活动商品-更多
  getActiveGoods(){
    let {page,pagesize,mallList} = this.data;
    GetActiveGoods({
      page: page,
      pagesize: pagesize,
      sign: getSign(`page=${page}&pagesize=${pagesize}`)
    }).then(res=>{
      if(res.data.ErrCode ==0){
        res.data.Response.map(arr=>{
          mallList.push(arr)
        })
        this.setData({
          mallList
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