// pages/homestaySubmitOrder/index.js
import { GetHomestayNight,GetReservationTime,GetHomestayMarke,PostHomestayReservation,GetPointRule, getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin_time : '',
    end_time :'',
    peopleNumList: ['1人','2人','3人'],
    peopleNum : '1人',
    Tenant_nmae :'',
    Tenant_userId :'',
    Tenant_phone:'',
    switchChecked : false,
    peopleBox :true,
    calendar_box : true,
    userList:[{
      name:'张三',
      userId:'410423200002061511',
      userflag : false,
    },{
      name:'李四',
      userId:'410423200002061511',
      userflag : false,
    },{
      name:'王五',
      userId:'410423200002061511',
      userflag : false,
    }],
    calendar  : true,
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
  /**路由 */
  //支付
  router_topay(){
    wx.navigateTo({
      url: './../Afterpayment/index?index=1'
    })
  },
  //发票
  router_invoice(){
    console.log("开发票")
  },
  //添加入住人
  router_addResident(){
    wx.navigateTo({
      url: './../addResident/index'
    })
  },
  /*事件*/
  //选择入住人数
  bindPickerChange(e){
    let that = this;
    that.setData({
      peopleNum: that.data.peopleNumList[e.detail.value]
    })
  },
  //租客信息开关
  Tenant(){
    let that = this;
    that.setData({
      peopleBox: !that.data.peopleBox
    })
  },
  //选择租客信息
  determine(){
    let that = this;
    that.setData({
      peopleBox: !that.data.peopleBox,
    })
    that.data.userList.map(item=>{
      if(item.userflag){
        console.log("选中",item.name)
      }else{
        console.log("未选中",item.name)
      }
    })
  },

  Selected(e){
    let that = this;
    let userList = that.data.userList;
    userList[e.currentTarget.dataset.index].userflag = !userList[e.currentTarget.dataset.index].userflag,
    that.setData({
      userList
    })
  },
  //切换日历
  Switch(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this;
    that.setData({
      calendar : e.currentTarget.dataset.index == 1 ? false : true,
    })
  },
  //打开日历 选择日期
  IntoOtu(e) {
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box,
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
    let begin_time = that.data.selectInto,
    end_time = that.data.selectOut;
    let date1 = new Date(begin_time).getTime();
    let date2 = new Date(end_time).getTime();
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
      begin_time: e.detail.year+'-'+month + '-' + day
    })
    if (that.data.end_time) {
      that.CalculateDays()
    }
  },
  afterTapDayA(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('离开时间', e.detail.year, month, day);
    that.setData({
      end_time: e.detail.year+'-'+month + '-' + day
    })
    if (that.data.begin_time) {
      that.CalculateDays()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  peopleBox(){

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
  //民宿预定-时间列表
  getReservationTime(callback){
    let {homesta_id,homesta_sku_id} = this.data;
    let user_id = wx.getStorageSync('userId')
    GetReservationTime({
      user_id : user_id,
      homesta_id:homesta_id,
      homesta_sku_id : homesta_sku_id,
      sign : getSign(`user_id=${user_id}&homesta_id=${homesta_id}&homesta_sku_id=${homesta_sku_id}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //民宿预订-计算共入住夜晚数量
  getHomestayNight(){
    let {homesta_id,homesta_sku_id,begin_time,end_time,} = this.data;
    let user_id = wx.getStorageSync('userId')
    GetHomestayNight({
      user_id :user_id,
      homesta_id :homesta_id ,
      homesta_sku_id : homesta_sku_id,
      begin_time : begin_time,
      end_time : end_time,
      sign : getSign(`user_id=${user_id}&homesta_id=${homesta_id}&homesta_sku_id=${homesta_sku_id}&begin_time=${begin_time}&end_time=${end_time}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        return res;
        // callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //民宿-提交订单预览/计算金额
  getHomestayMarke(callback){
    GetHomestayMarke({

    }).then(res=>{
      if (res.data.ErrCode == 0) {
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //民宿-提交订单
  postHomestayReservation(callback){
    PostHomestayReservation({

    }).then(res=>{
      if (res.data.ErrCode == 0) {
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //积分规则
  getPointRule(){
    GetPointRule({
      rnd : 1,
      sign : getSign(`rnd=1`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyPoint : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})