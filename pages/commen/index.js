// pages/commen/index.js
import {
  GetCommentsList,
  GetAddComments,
  GetAddReply,
  GetAddLike,
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
    page: 1,
    pagesize: 10,
    InputBox: true,
    bottom: '',
    userName : '',
    CommentsList : [],
    getComments : false
  },
  /*路由*/
  //更多回复
  router_reply(e) {
    wx.navigateTo({
      url: '../reply/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /*事件*/

  //点赞
  like(e) {
    console.log(e)
    let that = this;
    let id = e.currentTarget.dataset.cid;
      that.getAddLike(id,res=>{
        that.setData({
          getComments : false
        })
        that.getCommentsList();
      })
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
          InputBox: !that.data.InputBox,
          getComments : false
        })
        that.getCommentsList()
      })
    }
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
      commentValue: e.detail.value
    })
  },
  //评论/回复  输入框输入
  commentInput(e) {
    var that = this;
    that.setData({
      commentValue: e.detail.value
    })
  },
  //关闭输入框
  InputClose() {
    var that = this;
    that.setData({
      InputBox: !that.data.InputBox
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        news_id: options.id,
        getComments : true
      })
      wx.showLoading({
        title: '加载中...',
      })
      this.getCommentsList()
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
      page: that.data.page + 1,
      getComments : true
    })
    that.getCommentsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //更多评论
  getCommentsList() {
    let user_id = wx.getStorageSync('userId'),
      { news_id, page, pagesize ,CommentsList,getComments} = this.data;
    GetCommentsList({
      user_id: user_id,
      news_id: news_id,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&news_id=${news_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(item => {
          item.add_timespan = utils.formatTime(new Date(Number(item.add_timespan)))
          if(getComments){
            CommentsList.push(item)
          }
        })
        if(!getComments){
          CommentsList=res.data.Response
        }
        this.setData({
          CommentsList
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
  //添加评论
  getAddComments(callback) {
    let userId = wx.getStorageSync('userId');
    let { NewsDetail, commentValue } = this.data;
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
    let { cid,  rid, commentValue } = this.data;
    rid = rid ? rid : 0;
    GetAddReply({
      user_id: userId,
      comments_id: cid,
      repy_id: rid,
      content: commentValue,
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
  },
  //点赞 + 取消点赞 -评论
  getAddLike(id,callback){
    let user_id = wx.getStorageSync('userId');
    GetAddLike({
      user_id: user_id,
      comments_id: id,
      sign: getSign(`user_id=${user_id}&comments_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },

})