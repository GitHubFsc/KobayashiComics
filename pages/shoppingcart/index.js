import {
  GetMyCar,
  GetEditCar,
  PostDelCar,
  getSign
} from '../../utils/axios.js';
// pages/shoppingcart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    carflag : true,
    editcar: true,
    allselect: false,
    page: 1,
    pagesize: 10,
    Totalprice: 0
  },
  /*路由*/
  router_topay() {
    let that = this,
    arr = [],carList = that.data.carList;
    carList.map(item=>{
      if(item.car){
        arr.push({
          car_id : item.id,
          goods_id : item.goods_id,
          sku_parameter_type_id : item.sku_parameter_type_id,
          size_id : item.size_id,
          number : item.num,
        })
      }
    })  
    wx.navigateTo({
      url: '../productSubmitOrder/index?arr=' + JSON.stringify(arr),
    })
  },
  /* 事件 */
  //编辑购物车
  editcar() {
    let that = this;
    let carList = that.data.carList;
    if(carList.length>0){
      carList.map(item => {
        item.car = false;
      })
    }
    that.setData({
      carList,
      allselect : false,
      editcar: !that.data.editcar
    })
  },
  //商品单选
  select(e) {
    let that = this;
    let carList = that.data.carList;
    carList[e.currentTarget.dataset.index].car = !carList[e.currentTarget.dataset.index].car;
    that.setData({
      carList
    })
    that.Calculation()
  },
  //修改数量
  editspNum(e) {
    let that = this;
    let carList = that.data.carList;
    let dataset = e.currentTarget.dataset;
    that.getEditCar(dataset.type, 1, carList[dataset.index].id, res => {
      console.log(res);
      if (dataset.type == 2) {
        carList[dataset.index].num > 1 ? carList[dataset.index].num-- : 1
      } else {
        carList[dataset.index].num++
      }
      that.setData({
        carList
      })
      that.Calculation()
    })
  },
  //全选
  allselect() {
    let that = this;
    let carList = that.data.carList;
    let allselect = !that.data.allselect;
    carList.map(item => {
      item.car = allselect;
    })
    that.setData({
      carList,
      allselect,
    })
    that.Calculation()
  },
  //计算金额
  Calculation() {
    let that = this,total=0;
    let { carList, Totalprice } = that.data;
    Totalprice = 0;
    carList.map(arr => {
      if (arr.car) {
        Totalprice += arr.sku_price*arr.num;
        total++;
      }
    })
    if(total==carList.length){
      that.setData({
        allselect : true,
        Totalprice
      })
    }else{
      that.setData({
        allselect : false,
        Totalprice
      })
    }
  },
  delete(){
    let that = this;
    that.postDelCar(res=>{
      console.log(res)
      that.getMyCar()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCar()
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
    this.setData({
      page : this.data.page+1
    })
    this.getMyCar()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //我的购物车
  getMyCar() {
    let { page, pagesize, carList,carflag } = this.data;
    let user_id = wx.getStorageSync('userId');
    GetMyCar({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(item => {
          item.car = false;
          carList.push(item)
        })
        console.log(carList)
        carflag = res.data.Total>0?true: false
        this.setData({
          carList,
          carflag
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //修改数量
  getEditCar(type, num, id, callback) {
    let user_id = wx.getStorageSync('userId');
    GetEditCar({
      user_id: user_id,
      type: type,
      num: num,
      car_id: id,
      sign: getSign(`user_id=${user_id}&type=${type}&num=${num}&car_id=${id}`)
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
  //删除购物车
  postDelCar(callback){
    let user_id = wx.getStorageSync('userId');
    let datas = [],data = [],carList = this.data.carList;
    datas.push('user_id='+user_id)
    datas.push('sign='+getSign(`user_id=${user_id}`))
    carList.map(res=>{
      if(res.car){
        data.push({
          car_id: res.id
        })
      }
    })
    PostDelCar({
      body: data
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  }
})