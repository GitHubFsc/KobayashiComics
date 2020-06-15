// pages/route/index.js
import {GetRouteList,getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchIdx : 1,
    city : '',
    page : 1,
    pagesize : 10,
    routeList : []
  },
  /*路由*/
  //路线详情
  router_routeDetalis(e){
    wx.navigateTo({
      url: '../routeDetalis/index?id='+e.currentTarget.dataset.id,
    })
  },
  //选择城市
  router_city() {
    wx.navigateTo({
      url: '../city/index'
    })
  },
  /*事件*/
  switch(e){
    let that = this;
    that.setData({
      page : 1,
      routeList : [],
      switchIdx : e.currentTarget.dataset.index,
    })
    this.getRouteList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let city = wx.getStorageSync('city')?wx.getStorageSync('city'):'上海市';
    this.setData({
      city : city
    })
    this.getRouteList()
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
    that.getRouteList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //路线列表
  getRouteList(){
    let user_id = wx.getStorageSync('userId'),
    {city,page,pagesize,switchIdx,routeList} = this.data;
    GetRouteList({
      user_id : user_id,
      keywords : city,
      type : switchIdx,
      page : page,
      pagesize : pagesize,
      sign : getSign(`user_id=${user_id}&type=${switchIdx}&keywords=${city}&page=${page}&pagesize=${pagesize}`),
    }).then(res=>{
      if(res.data.ErrCode==0){
        console.log(res);
        res.data.Response.list.map(arr=>{
          routeList.push(arr)
        })
        this.setData({
          RouteList : res.data.Response,
          routeList
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  }
})