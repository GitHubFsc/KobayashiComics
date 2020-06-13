// pages/reply/index.js
import { GetReplyList,GetAddLike,GetAddReply, getSign } from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentValue :'',
    InputBox: true,
    commendts_id : ''
  },
  /*路由*/
  /*事件*/
  //评论
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
        that.getReplyList();
      })
    }
  },
  //评论/回复 输入框高度获取
  commentFoucus(e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
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
    let that = this,
    id = e.currentTarget.dataset.cid;
    that.getAddLike(id,res=>{
      that.getReplyList()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        commendts_id : options.id
      })
      wx.showLoading({
        title: '加载中...',
      })
      this.getReplyList()
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
  //更多回复
  getReplyList(){
    let user_id = wx.getStorageSync('userId'),
    commendts_id = this.data.commendts_id;
    GetReplyList({
      user_id: user_id,
      commendts_id: commendts_id,
      sign: getSign(`user_id=${user_id}&commendts_id=${commendts_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.add_timespan = utils.formatTime(new Date(Number(res.data.Response.add_timespan)))
        this.setData({
          commendts: res.data.Response
        })
        console.log(this.data.commendts)
        wx.hideLoading()
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
    let { cid, rid ,commentValue } = this.data;
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
  },
  //点赞 + 取消点赞
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