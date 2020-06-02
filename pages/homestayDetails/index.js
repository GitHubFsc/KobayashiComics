// pages/homestayDetails/index.js
import { GetHomestayDetail, getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homestayId: 0,
    UnittypeIdx: 0,
    value: '',
    selectInto: '',
    selectOut: '',
    days : 1,
    calendar: true,
    calendar_box: true,
    steps: 3,
    loading: false,
    homestay: '',
    calendarConfigB: {
      multi: false, // 是否开启多选,
      inverse: true, // 单选模式下是否支持取消选中,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'before', // [‘before’, 'after']
        date: '', // 无该属性或该属性值为假，则默认为当天
      },
    },
    calendarConfigA: {
      multi: false, // 是否开启多选,
      inverse: true, // 单选模式下是否支持取消选中,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'before', // [‘before’, 'after']
        date: '', // 无该属性或该属性值为假，则默认为当天
      },
    }


  },
  /*路由*/
  //民宿提交订单
  router_book() {
    wx.navigateTo({
      url: './../homestaySubmitOrder/index?id' + this.data.homestayId
    })
  },
  /*事件*/
  //选择户型
  Unittype(e) {
    let that = this;
    that.setData({
      UnittypeIdx: e.currentTarget.dataset.index,
    })
  },
  //切换日历
  Switch(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this;
    that.setData({
      calendar: e.currentTarget.dataset.index == 0 ? false : true,
    })
  },
  //打开日历 选择日期
  OpenCalendar(e) {
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box,
      calendar: e.currentTarget.dataset.index == 0 ? false : true,
    })
  },
  //关闭日历
  close() {
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box
    })
  },
  //取消所有选中
  empty() {
    this.calendar.cancelSelectedDates();
  },
  //计算所有天数
  CalculateDays() {
    let that = this;
    let selectInto = that.data.selectInto.replace(/(\d{2})\月(\d{2})\日/, "$1-$2"),
      selectOut = that.data.selectOut.replace(/(\d{2})\月(\d{2})\日/, "$1-$2");
    let year = new Date().getFullYear();
    let date1 = new Date(year + '-' + selectInto).getTime();
    let date2 = new Date(year + '-' + selectOut).getTime();
    let days = Math.floor((date2 - date1) / (24 * 3600 * 1000));
    // console.log('共',days,'晚')
    that.setData({
      days
    })
  },
  /**日历组件方法 */
  afterTapDayB(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('入住时间', e.detail.year, month, day);
    that.setData({
      selectInto: month + '月' + day + '日'
    })
    if (that.data.selectOut) {
      that.CalculateDays()
    }
  },
  afterTapDayA(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('离开时间', e.detail.year, month, day);
    that.setData({
      selectOut: month + '月' + day + '日'
    })
    if (that.data.selectInto) {
      that.CalculateDays()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    let homestayId = options.id;
    let selectInto = utils.formatNumber(new Date().getMonth()+1) + "月" + utils.formatNumber(new Date().getDay())+'日', 
    selectOut;
    let year = new Date().getFullYear();
    let time1 = year+'-'+selectInto.replace(/(\d{2})\月(\d{2})\日/, "$1-$2");
    time1 = new Date(time1).getTime();
    let time2 = Number(time1)+86400000;
    selectOut = utils.DateTime(time2)
    if (user_id) {
      this.setData({
        steps: 3,
        homestayId,
        selectInto,selectOut
      })
      this.getHomestayDetail(homestayId)
    } else {
      this.setData({
        steps: 0,
        homestayId,
        selectInto,selectOut
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
    let id = that.data.homestayId;
    app.login((data) => {
      console.log("登录成功", data)
      if (data) {
        that.getHomestayDetail(id)
        that.setData({
          steps: 3,
          loading: false,
        })
      }
    })
  },


  //民宿详情
  getHomestayDetail(id) {
    let userId = wx.getStorageSync('userId');
    GetHomestayDetail({
      homesta_id: id,
      user_id: userId,
      sign: getSign(`user_id=${userId}&homesta_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          homestay: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  }
})