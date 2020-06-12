import { get, post, getSign} from './http.js';
/**随机数 */
//获取随机数
const Rnd = () => {
  return Math.floor(Math.random() * 100)
}




/**会员中心 */
//用户登录
const UserLogin = (data, datas) => {
  return post('api/UserBase/UserLogin', data, datas);
}
//获取open_id
const Getopenid = data => {
  return get('api/WeiXin/Getopenid', data);
}
//解密
const Postdecryption = (data, datas) => {
  return post('api/UserBase/Postdecryption', data, datas);
}
//修改个人信息
const PostSetinfo = (data, datas) => {
  return post('api/UserBase/PostSetinfo', data, datas);
}
//用户主页
const GetUserHomePage = data => {
  return get('api/UserBase/GetUserHomePage', data);
}
//我的关注
const GetMyFocus = data => {
  return get('api/UserBase/GetMyFocus', data);
}
//添加关注
const GetFocus = data => {
  return get('api/UserBase/GetFocus', data);
}
//取消关注
const GetCanCelFocus = data => {
  return get('api/UserBase/GetCanCelFocus', data);
}
//我的主页
const GetMyHomePage = data => {
  return get('api/UserBase/GetMyHomePage', data);
}
//我的评论
const GetMyComments = data => {
  return get('api/UserBase/GetMyComments', data);
}
//我的浏览历史
const GetMyBrowseHistory = data => {
  return get('api/UserBase/GetMyBrowseHistory', data);
}
//删除我的浏览记录
const GetDelBrowseHistory = data => {
  return get('api/UserBase/GetDelBrowseHistory', data);
}
//用户搜索记录
const GetUserSearchLogList = data => {
  return get('api/UserBase/GetUserSearchLogList', data);
}
//清空搜索记录
const GetDelLog = data => {
  return get('api/UserBase/GetDelLog', data);
}
//搜索
const GetSearchList = data => {
  return get('api/UserBase/GetSearchList', data);
}
//我的粉丝
const GetFansList = data => {
  return get('api/UserBase/GetFansList', data);
}




/**用户反馈 */
//用户反馈
const PostAddFeedback = (data, datas) => {
  return post('api/Feedback/PostAddFeedback', data, datas);
}







/**资讯 */
//我的资讯
const GetMyNews = data => {
  return get('api/News/GetMyNews', data);
}
//删除-资讯
const GetDelNews = data => {
  return get('api/News/GetDelNews', data);
}
//资讯列表
const GetNewsList = data => {
  return get('api/News/GetNewsList', data);
}
//资讯详情
const GetNewsDetail = data => {
  return get('api/News/GetNewsDetail', data);
}
//猜你感兴趣
const GetMyLikeNews = data => {
  return get('api/News/GetMyLikeNews', data);
}
//发布资讯
const PostAddNews = (data, datas) => {
  return post('api/News/PostAddNews', data, datas);
}
//添加评论
const GetAddComments = data => {
  return get('api/News/GetAddComments', data);
}
//更多评论
const GetCommentsList = data => {
  return get('api/News/GetCommentsList', data);
}
//评论点赞/取消点赞
const GetAddLike = data => {
  return get('api/News/GetAddLike', data);
}
//回复
const GetAddReply = data => {
  return get('api/News/GetAddReply', data);
}
//更多回复
const GetReplyList = data => {
  return get('api/News/GetReplyList', data);
}
//资讯点赞/取消点赞
const GetNewsLike = data => {
  return get('api/News/GetNewsLike', data);
}










/**商城 */
//商城banner
const GetGoodsBanner = data => {
  return get('api/Goods/GetGoodsBanner', data);
}
//商品类型
const GetGoodsCategory = data => {
  return get('api/Goods/GetGoodsCategory', data);
}
//猜你喜欢
const GetMyLike = data => {
  return get('api/Goods/GetMyLike', data);
}
//商品列表
const GetGoodsList = data => {
  return get('api/Goods/GetGoodsList', data);
}
//首页-活动商品
const GetHomeActiveGoods = data => {
  return get('api/Goods/GetHomeActiveGoods', data);
}
//活动商品-更多
const GetActiveGoods = data => {
  return get('api/Goods/GetActiveGoods', data);
}
//推荐商品
const GetRecommendGoods = data => {
  return get('api/Goods/GetRecommendGoods', data);
}
//商品详情
const GetGoodsDetail = data => {
  return get('api/Goods/GetGoodsDetail', data);
}
//商品规格筛选
const GetGoodsSize = data => {
  return get('api/Goods/GetGoodsSize', data);
}
//订单提交-预览
const PostGoodsSubmit = (data, datas) => {
  return post('api/Goods/PostGoodsSubmit', data, datas);
}
//订单提交-计算总价
const PostSumMoney = (data, datas) => {
  return post('api/Goods/PostSumMoney', data, datas);
}
//提交订单
const PostSubmitOrder = (data, datas) => {
  return post('api/Goods/PostSubmitOrder', data, datas);
}



/**订单 */
//我的订单
const GetMyOrder = data => {
  return get('api/Order/GetMyOrder', data);
}
//订单签收
const GetOrderSign = data => {
  return get('api/Order/GetOrderSign', data);
}
//取消订单
const GetCanCelOrder = data => {
  return get('api/Order/GetCanCelOrder', data);
}
//订单物流
const GetOrderLogistics = data => {
  return get('api/Order/GetOrderLogistics', data);
}
//订单详情
const GetOrderDetail = data => {
  return get('api/Order/GetOrderDetail', data);
}
//获取退款金额
const GetRefoundMoney = data => {
  return get('api/Order/GetRefoundMoney', data);
}
//申请退款-退款类型/退款原因
const GetRefoundType = data => {
  return get('api/Order/GetRefoundType', data);
}
//申请退款
const PostOrderRefound = (data, datas) => {
  return post('api/Order/PostOrderRefound', data, datas);
}

/**评价 */
//商品评价
const GetEvalList = data => {
  return get('api/Eval/GetEvalList', data);
}
//订单-添加评价
const PostAddEval = (data, datas) => {
  return post('api/Eval/PostAddEval', data, datas);
}






/**售后订单 */
//我的售后订单
const GetMyRefoundOrder = data => {
  return get('api/Refound/GetMyRefoundOrder', data);
}
//退款订单-取消
const RGetCanCelOrder = data => {
  return get('api/Refound/GetCanCelOrder', data);
}
//退款订单详情
const GetReturnOrderDetail = data => {
  return get('api/Refound/GetReturnOrderDetail', data);
}
//快递列表
const GetReturnExpress = data => {
  return get('api/Refound/GetReturnExpress', data);
}
//退款订单-填写寄回快递单号
const GetSetExpress = data => {
  return get('api/Refound/GetSetExpress', data);
}













/**路线 */
//路线列表
const GetRouteList = data => {
  return get('api/Route/GetRouteList', data);
} 
//路线详情
const GetRouteDetail = data => {
  return get('api/Route/GetRouteDetail', data);
} 
//路线-订单预览/计算金额
const GetRoutePrice = data => {
  return get('api/Route/GetRoutePrice', data);
} 
//路线-月份日期筛选
const GetTimePrice = data => {
  return get('api/Route/GetTimePrice', data);
} 
//路线列表
const PostMakeRouteOrder = (data, datas) => {
  return post('api/Route/PostMakeRouteOrder', data, datas);
}















/**我的路线 */
//我的路线
const GetMyRouteOrder = data => {
  return get('api/RouteOrder/GetMyRouteOrder', data);
} 
//路线订单详情 
const GetRouteOrderDetail = data => {
  return get('api/RouteOrder/GetRouteOrderDetail', data);
}
//取消退款
const RGetCancelRouteOrder = data => {
  return get('api/RouteOrder/GetCancelRouteOrder', data);
}
//路线订单-取消
const GetCanRouteOrder = data => {
  return get('api/RouteOrder/GetCanRouteOrder', data);
}
//退款原因
const GetCateGoryList = data => {
  return get('api/RouteOrder/GetCateGoryList', data);
}
//我的路线订单-申请退款
const PostRouteOrder = (data, datas) => {
  return post('api/RouteOrder/PostRouteOrder', data, datas);
}






/**民宿 */
//民宿banner
const GetHomestayBanner = data => {
  return get('api/Homestay/GetHomestayBanner', data);
}
//精品民宿
const GetBoutiqueHomestay = data => {
  return get('api/Homestay/GetBoutiqueHomestay', data);
}
//推荐民宿
const GetHomestay = data => {
  return get('api/Homestay/GetHomestay', data);
}
//民宿详情
const GetHomestayDetail = data => {
  return get('api/Homestay/GetHomestayDetail', data);
}
//证件类型
const GetCertificateType = data => {
  return get('api/Homestay/GetCertificateType', data);
}
//添加入住人信息
const GetAddHomestayInformation = data => {
  return get('api/Homestay/GetAddHomestayInformation', data);
}
//入住人列表
const GetHomestayList = data => {
  return get('api/Homestay/GetHomestayList', data);
}
//民宿预定-时间列表
const GetReservationTime = data => {
  return get('api/Homestay/GetReservationTime', data);
}
//民宿预订-计算共入住夜晚数量
const GetHomestayNight = data => {
  return get('api/Homestay/GetHomestayNight', data);
}
//民宿-提交订单预览/计算金额
const GetHomestayMarke = data => {
  return get('api/Homestay/GetHomestayMarke', data);
}
//民宿-提交订单
const PostHomestayReservation = (data, datas) => {
  return post('api/Homestay/PostHomestayReservation', data, datas);
}


/**民宿订单 */
//民宿订单-列表
const GetMyHomestayOrder = data => {
  return get('api/HomestayOrder/GetMyHomestayOrder', data);
}
//民宿订单-取消
const GetCancelHomestayOrder = data => {
  return get('api/HomestayOrder/GetCancelHomestayOrder', data);
}
//民宿订单详情
const GetHomestayOrderDetail = data => {
  return get('api/HomestayOrder/GetHomestayOrderDetail', data);
}
//取消退款
const GetCancelRouteOrder = data => {
  return get('api/HomestayOrder/GetCancelRouteOrder', data);
}
//民宿订单-申请退款
const PostHomestayReturnOrder = (data, datas) => {
  return post('api/HomestayOrder/PostHomestayReturnOrder', data, datas);
}




  /**我的消息 */
  //系统消息/评论消息/未读消息总数-未读数量
  const GetNewsCount = data => {
    return get('api/Message/GetNewsCount', data);
  }
  //系统消息
  const GetSysNews = data => {
    return get('api/Message/GetSysNews', data);
  }
  //评论消息
  const GetCommentsNews = data => {
    return get('api/Message/GetCommentsNews', data);
  }










/**积分 */
//积分
const GetMyPoint = data => {
  return get('api/Point/GetMyPoint', data);
}
//积分记录
const GetPointLog = data => {
  return get('api/Point/GetPointLog', data);
}
//积分规则
const GetPointRule = data => {
  return get('api/Point/GetPointRule', data);
}






/**发票 */
//新增发票/修改发票
const PostAddInvoice = (data, datas) => {
  return post('api/Invoice/PostAddInvoice', data, datas);
}
//我的发票
const GetMyInvoice = data => {
  return get('api/Invoice/GetMyInvoice', data);
}
//设置默认发票
const GetDefaultInvoice = data => {
  return get('api/Invoice/GetDefaultInvoice', data);
}
//删除发票
const GetDelInvoice = data => {
  return get('api/Invoice/GetDelInvoice', data);
}




/**首页 */
//首页-banner图
const GetIndexBanner = data => {
  return get('api/HomePage/GetIndexBanner', data);
}
//首页-商城/民宿/路线/直播
const GetCategory = data => {
  return get('api/HomePage/GetCategory', data);
}
//






/**我的*/
//我的优惠券
const GetMyCouponList = data => {
  return get('api/Coupon/GetMyCouponList', data);
}
//获取用户可用优惠券
const GetGoodsCoupon = data => {
  return get('api/Coupon/GetGoodsCoupon', data);
}







/**收藏 */
//我的收藏 //添加收藏/取消
const GetMyCollection = data => {
  return get('api/Collection/GetMyCollection', data);
}









/*购物车模块*/
//我的购物车
const GetMyCar = data => {
  return get('api/ShopCar/GetMyCar', data);
}
//修改购物车数量
const GetEditCar = data => {
  return get('api/ShopCar/GetEditCar', data);
}
//删除购物车
const PostDelCar = (data, datas) => {
  return post('api/ShopCar/PostDelCar', data, datas);
}
//加入购物车
const GetAddMyCar = data => {
  return get('api/ShopCar/GetAddMyCar', data);
}
//我的购物车数量
const GetMyCarCount = data => {
  return get('api/ShopCar/GetMyCarCount', data);
}





/**公用接口 */
//获取分享信息
const GetShareInformation = data => {
  return get('api/Lib/GetShareInformation', data);
}
//手机短信发送
const GetSMSCode = data => {
  return get('api/Lib/GetSMSCode', data);
}
//Android版本更新
const GetVersionUpdate = data => {
  return get('api/Lib/GetVersionUpdate', data);
}
//文件上传
const PostUploadFile = (data, datas) => {
  return post('api/Lib/PostUploadFile', data, datas);
}
//base64图片上传
const PostUploadFileBase64 = (data, datas) => {
  return post('api/Lib/PostUploadFileBase64', data, datas);
}
//获取支付信息
const GetPayInfo = data => {
  return get('api/Lib/GetPayInfo', data);
}
//获取下载页面地址
const GetDownloadUrl = data => {
  return get('api/Lib/GetDownloadUrl', data);
}

export {
  Rnd,
  getSign,
  UserLogin,
  Getopenid,
  Postdecryption,
  PostSetinfo,
  GetUserHomePage,
  GetMyFocus,
  GetFocus,
  GetCanCelFocus,
  GetMyHomePage,
  GetMyComments,
  GetMyBrowseHistory,
  GetDelBrowseHistory,
  GetUserSearchLogList,
  GetDelLog,
  GetSearchList,
  GetFansList,

  /**用户反馈 */
  PostAddFeedback,



  /**资讯 */
  GetMyNews,
  GetDelNews,
  GetNewsList,
  GetNewsDetail,
  GetMyLikeNews,
  PostAddNews,
  GetAddComments,
  GetCommentsList,
  GetAddLike,
  GetAddReply,
  GetNewsLike,
  GetReplyList,


  /**商城 */
  GetGoodsBanner,
  GetGoodsCategory,
  GetMyLike,
  GetGoodsList,
  GetHomeActiveGoods,
  GetActiveGoods,
  GetRecommendGoods,
  GetGoodsDetail,
  GetGoodsSize,
  PostGoodsSubmit,
  PostSumMoney,
  PostSubmitOrder,




  /**订单 */
  GetMyOrder,
  GetOrderSign,
  GetCanCelOrder,
  GetOrderLogistics,
  GetOrderDetail,
  GetRefoundMoney,
  GetRefoundType,
  PostOrderRefound,



  /**评论 */
  GetEvalList, 
  PostAddEval,



  
  /**售后订单 */
  GetMyRefoundOrder,
  RGetCanCelOrder,
  GetReturnOrderDetail,
  GetReturnExpress,
  GetSetExpress,










  /**民宿 */
  GetHomestayBanner,
  GetBoutiqueHomestay,
  GetHomestay,
  GetHomestayDetail,
  GetCertificateType,
  GetHomestayList,
  GetAddHomestayInformation,
  GetReservationTime,
  GetHomestayNight,
  GetHomestayMarke,
  PostHomestayReservation,



  /**民宿订单 */
  GetMyHomestayOrder ,
  GetCancelHomestayOrder  ,
  GetHomestayOrderDetail,
  GetCancelRouteOrder  ,
  PostHomestayReturnOrder,





  /**路线 */
  GetRouteList,  
  GetRouteDetail,  
  GetRoutePrice,  
  GetTimePrice,  
  GetCateGoryList,
  PostMakeRouteOrder,







  /**我的路线 */
  GetMyRouteOrder,
  GetRouteOrderDetail,
  RGetCancelRouteOrder,
  GetCanRouteOrder,
  PostRouteOrder,


  /**我的消息 */
  GetNewsCount,
  GetSysNews,
  GetCommentsNews,







  /**发票 */
  PostAddInvoice,
  GetMyInvoice,
  GetDefaultInvoice,
  GetDelInvoice,



  /**积分 */
  GetMyPoint,
  GetPointLog,
  GetPointRule,




  /**首页 */
  GetIndexBanner,


  /**购物车 */
  GetCategory,
  GetMyCar,
  GetEditCar,
  PostDelCar,
  GetAddMyCar,
  GetMyCarCount,





  /**收藏 */
  GetMyCollection,


  /**优惠券 */
  GetMyCouponList,
  GetGoodsCoupon,


  //公用接口
  GetShareInformation,
  GetSMSCode,
  GetVersionUpdate,
  PostUploadFile,
  PostUploadFileBase64,
  GetPayInfo,
  GetDownloadUrl,
}