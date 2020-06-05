// pages/referralDetails/index.js
import {
  GetNewsDetail,
  GetMyLikeNews,
  GetAddComments,
  GetAddReply,
  getSign
} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentValue: '',
    steps: 3,
    loading: false,
    page: 1,
    pagesize: 10,
    InputBox: true,
    bottom: '',
    userName : '',
    cid : null,
    rid : null,
    id : null,
    type : 0,
  },
  /*路由*/
  //他人主页
  router_homepage(e) {
    wx.navigateTo({
      url: '../homepage/index?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
    })
  },
  //商品链接
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //更多回复
  router_reply(e) {
    wx.navigateTo({
      url: '../reply/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //更多评论
  router_commen(e) {
    wx.navigateTo({
      url: '../commen/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //社区详情
  router_communityDetails(e) {
    wx.navigateTo({
      url: '../communityDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //分享
  router_dynamic(e) {
    console.log(e);
    wx.navigateTo({
      url: '../dynamic/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //关注
  attention(e) {
    console.log(1213)
  },
  //发布评论
  InputBtn() {
    var that = this;
    if(that.data.type==0){
      this.getAddComments(res=>{
        this.getNewsDetail();
        that.setData({
          InputBox: !that.data.InputBox,
          commentValue : ''
        })
      })
    }else{
      that.getAddReply(res=>{
        console.log(res);
        that.setData({
          commentValue : '',
          InputBox: !that.data.InputBox
        })
        that.getNewsDetail();
      })
    }
  },
  //发布评论
  comment(e) {
    var that = this;
    console.log(e)
    that.setData({
      id : e.currentTarget.dataset.id,
      userName :  e.currentTarget.dataset.name,
      type : 0,
      InputBox: !that.data.InputBox
    })
  },
  //回复
  Reply(e) {
    var that = this;
    console.log(e)
    that.setData({
      cid : e.currentTarget.dataset.cid,
      rid : e.currentTarget.dataset.rid?e.currentTarget.dataset.rid : null,
      userName :  e.currentTarget.dataset.name,
      type : 1,
      InputBox: !that.data.InputBox
    })
  },
  //点赞
  like(e) {
    console.log(e)
  },
  //评论/回复 输入框高度获取
  commentFoucus(e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },
  //评论/回复  输入框失焦
  commentBlur(e) {
    var that = this;
    that.setData({
      bottom: 0,
      commentValue : e.detail.value
    })
  },
  //评论/回复  输入框输入
  commentInput(e){
    var that = this;
    that.setData({
      commentValue : e.detail.value
    })
  },
  //关闭输入框
  InputClose(){
    var that = this;
    that.setData({
      InputBox: !that.data.InputBox
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps: 3,
        NewsId: options.id
      })
      this.getNewsDetail();
      this.getMyLikeNews();
    } else {
      this.setData({
        steps: 0,
        NewsId: options.id
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

  },
  /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e, (data) => {
      console.log("手机号回调", data)
      if (data) {
        that.setData({
          steps: 1,
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
    app.getUserInfo(e, (data) => {
      console.log("用户回调", data)
      if (data) {
        that.setData({
          steps: 2,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data) => {
      console.log("登录成功", data)
      if (data) {
        that.setData({
          steps: 3,
          loading: false,
        })
      }
    })
  },
  //资讯详情
  getNewsDetail() {
    let userId = wx.getStorageSync('userId');
    let NewsId = this.data.NewsId;
    GetNewsDetail({
      user_id: userId,
      news_id: NewsId,
      sign: getSign(`user_id=${userId}&news_id=${NewsId}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.commentslist.map(item => {
          item.add_timespan = utils.formatTime(new Date(Number(item.add_timespan)))
        })
        this.setData({
          NewsDetail: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //猜你感兴趣
  getMyLikeNews() {
    let userId = wx.getStorageSync('userId');
    let {
      page,
      pagesize
    } = this.data;
    GetMyLikeNews({
      user_id: userId,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${userId}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          NewsList: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //添加评论
  getAddComments(callback) {
    let userId = wx.getStorageSync('userId');
    let {  NewsDetail, commentValue } = this.data;
    GetAddComments({
      user_id: userId,
      news_id: NewsDetail.id,
      content: commentValue,
      sign: getSign(`user_id=${userId}&news_id=${NewsDetail.id}&content=${commentValue}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //回复
  getAddReply(callback) {
    let userId = wx.getStorageSync('userId');
    let {  cid, rid ,commentValue } = this.data;
    rid  = rid?rid:0;
    GetAddReply({
      user_id : userId,
      comments_id : cid,
      repy_id : rid,
      content : commentValue,
      sign: getSign(`user_id=${userId}&comments_id=${cid}&repy_id=${rid}&content=${commentValue}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }
})