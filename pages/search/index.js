// pages/search/index.js
import {GetSearchList,GetUserSearchLogList,GetDelLog,getSign} from '../../utils/axios.js';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SearchList : [],
    RecentIdx :null,
    Recent : [],
    PopularIdx :null,
    Popular : [],
    inpurVal : '',
    tabnav : ['资讯','商品','路线','民宿'],
    currentTab :0,
    steps : 3,
    loading: false
  },
  /**路由 */
  //社区详情
  router_communityDetails(e) {
    wx.navigateTo({
      url: '../communityDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //商品详情
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //民宿详情
  router_homestayDetails(e){
    wx.navigateTo({
      url: '../homestayDetails/index?id='+e.currentTarget.dataset.id,
    })
  },
  //路线详情
  router_routeDetalis(e){
    wx.navigateTo({
      url: '../routeDetalis/index?id='+e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //搜索框失焦
  searchBlur(e){
    this.setData({
      inpurVal : e.detail.value
    })
    this.getSearchList()
  },
  //键盘完成
  searchConfirm(e){
    this.setData({
      inpurVal : e.detail.value
    })
    this.getSearchList()
  },
  //近期搜索
  Recent(e){
    let that = this;
    let inpurVal = that.data.Recent[e.currentTarget.dataset.index]
    that.setData({
      RecentIdx : e.currentTarget.dataset.index,
      inpurVal : inpurVal
    })
    this.getSearchList()
  },
  //热门搜索
  Popular(e){
    let that = this;
    let inpurVal = that.data.Popular[e.currentTarget.dataset.index]
    that.setData({
      PopularIdx : e.currentTarget.dataset.index,
      inpurVal : inpurVal,
    })
    this.getSearchList()
  },
  //搜索结果分类
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },
  /**API */
  //获取用户搜索记录+热门搜索
  getUserSearchLogList(){
    let user_id =  wx.getStorageSync('userId');
    GetUserSearchLogList({
      user_id: user_id,
      sign: getSign(`user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          Recent : res.data.Response.list,
          Popular : res.data.Response.hot
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //清空搜索记录
  getDelLog(){
    let user_id =  wx.getStorageSync('userId');
    GetDelLog({
      user_id: user_id,
      sign: getSign(`user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("清空搜索记录",res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //搜索
  getSearchList(){
    let user_id =  wx.getStorageSync('userId');
    let inpurVal = this.data.inpurVal;
    GetSearchList({
      user_id: user_id,
      type : 0,
      keywords : inpurVal,
      sign: getSign(`user_id=${user_id}&type=0&keywords=${inpurVal}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("搜索结果",res);
        this.setData({
          SearchList : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
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
      this.getUserSearchLogList()
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