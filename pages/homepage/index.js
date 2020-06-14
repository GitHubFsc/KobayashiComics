// pages/homepage/index.js
import {GetMyHomePage,GetUserHomePage,GetMyNews,GetFocus,GetDelNews,GetMyComments,GetMyBrowseHistory,GetDelBrowseHistory,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id : 0,
    type : 0, 
    recommend : ['我的资讯','我的评论','浏览历史'],
    userInfo : '',
    currentTab : 0,
    page : 1,
    pagesize : 10
  },
  /*路由*/
  //粉丝+关注
  router_followFans(e){
    wx.navigateTo({
      url: '../followFans/index?type='+ e.currentTarget.dataset.type + '&id=' + this.data.user_id,
    })
  },
  //更多回复
  router_reply(e){
    wx.navigateTo({
      url: '../reply/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //社区详情
  router_communityDetails(e){
    wx.navigateTo({
      url: '../communityDetails/index?id='+e.currentTarget.dataset.id,
    })
  },
  //分享 + 动态 
  router_dynamic(e){
    wx.navigateTo({
      url: './../dynamic/index',
    })
  },
  /*事件*/
  //导航栏切换
  nav_tab(e){
    let that = this;
    this.setData({
      currentTab : e.target.dataset.index
    })
    if(e.target.dataset.index==0){
      that.getMyNews()
    }else if(e.target.dataset.index==1){
      that.getMyComments()
    }else{
      that.getMyBrowseHistory()
    }
  },
  //关注
  attention(e){
    console.log("关注", e.currentTarget.dataset.id)
    let that = this,
    id = e.currentTarget.dataset.id;
    that.getFocus(id,()=>{
     that.getUserHomePage();
    })
  },
  //删除咨询
  communityDel(e){
    let that = this;
    console.log(e.currentTarget.dataset.id)
    that.getDelNews(e.currentTarget.dataset.id,()=>{
      that.getMyNews()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    if(options.type==0){
      console.log("我的主页")
      options.id = wx.getStorageSync('userId');
      this.setData({
        user_id : options.id,
        type : options.type,
      })
      this.getMyHomePage();
    }else{
      console.log("他人主页");
      this.setData({
        user_id : options.id,
        type : options.type,
      })
      this.getUserHomePage()
    }
    this.getMyNews();
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
    if(this.data.type){
      wx.showLoading({
        title: '加载中...',
      })
      if(this.data.type==0){
        this.getMyHomePage()
      }else{
        this.getUserHomePage()
      }
    }
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
  //我的主页
  getMyHomePage(){
    let {user_id} = this.data;
    GetMyHomePage({
      user_id: user_id,
      sign: getSign(`user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          userInfo : res.data.Response
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //用户主页
  getUserHomePage(){
    let {user_id} = this.data;
    GetUserHomePage({
      user_id : wx.getStorageSync('userId'),
      fuser_id: user_id,
      sign: getSign(`user_id=${wx.getStorageSync('userId')}&fuser_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          userInfo : res.data.Response.users
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //用户资讯列表
  //我的资讯
  getMyNews(){
    let {user_id,page,pagesize} = this.data;
    GetMyNews({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyNewsList : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //删除资讯
  getDelNews(id,callback){
    let {user_id} = this.data;
    GetDelNews({
      user_id: user_id,
      news_id : id,
      sign: getSign(`user_id=${user_id}&news_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //我的评论
  getMyComments(){
    let {user_id,page,pagesize} = this.data;
    GetMyComments({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(item=>{
          item.add_timespan = utils.formatTime(new Date(Number(item.add_timespan)))
        })
        this.setData({
          MyCommentsList : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //我的浏览历史
  getMyBrowseHistory(){
    let {user_id,page,pagesize} = this.data;
    GetMyBrowseHistory({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyNewsList : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //删除我的浏览记录
  getDelBrowseHistory(){
    let {user_id} = this.data;
    GetDelBrowseHistory({
      user_id: user_id,
      news_id : id,
      sign: getSign(`user_id=${user_id}&news_id=${news_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.getMyNews()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //添加关注
  getFocus(id,callback){
    let user_id = wx.getStorageSync('userId');
    GetFocus({
      user_id: user_id,
      fuser_id : id,
      sign: getSign(`user_id=${user_id}&fuser_id=${fuser_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
})