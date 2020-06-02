! function (e) {
  var t = {};

  function a(n) {
    if (t[n]) return t[n].exports;
    var s = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(s.exports, s, s.exports, a), s.l = !0, s.exports
  }
  a.m = e, a.c = t, a.d = function (e, t, n) {
    a.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }, a.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, a.t = function (e, t) {
    if (1 & t && (e = a(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (a.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var s in e) a.d(n, s, function (t) {
        return e[t]
      }.bind(null, s));
    return n
  }, a.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return a.d(t, "a", t), t
  }, a.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, a.p = "", a(a.s = 8)
}([function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = class {
    constructor(e) {
      this.Component = e
    }
    getData(e) {
      const t = this.Component.data;
      if (!e) return t;
      if (e.includes(".")) {
        return e.split(".").reduce((e, t) => e[t], t)
      }
      return this.Component.data[e]
    }
    setData(e, t = (() => {})) {
      e && "object" == typeof e && this.Component.setData(e, t)
    }
  };
  t.default = n
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getSystemInfo = o, t.isComponent = function (e) {
    return e && void 0 !== e.__wxExparserNodeId__ && "function" == typeof e.setData
  }, t.isIos = i, t.getCurrentPage = d, t.getComponent = function (e) {
    const t = new c;
    let a = d() || {};
    if (a.selectComponent && "function" == typeof a.selectComponent) {
      if (e) return a.selectComponent(e);
      t.warn("请传入组件ID")
    } else t.warn("该基础库暂不支持多个小程序日历组件")
  }, t.uniqueArrayByDate = function (e = []) {
    let t = {},
      a = [];
    e.forEach(e => {
      t[`${e.year}-${e.month}-${e.day}`] = e
    });
    for (let e in t) a.push(t[e]);
    return a
  }, t.delRepeatedEnableDay = function (e = [], t = []) {
    let a, n;
    if (2 === t.length) {
      const {
        startTimestamp: e,
        endTimestamp: s
      } = f(t);
      a = e, n = s
    }
    return h(e).filter(e => e < a || e > n)
  }, t.convertEnableAreaToTimestamp = f, t.getDateTimeStamp = b, t.converEnableDaysToTimestamp = h, t.initialTasks = t.GetDate = t.Slide = t.Logger = void 0;
  var n, s = (n = a(2)) && n.__esModule ? n : {
    default: n
  };
  let r;

  function o() {
    return r || (r = wx.getSystemInfoSync())
  }
  class c {
    info(e) {
      console.log("%cInfo: %c" + e, "color:#FF0080;font-weight:bold", "color: #FF509B")
    }
    warn(e) {
      console.log("%cWarn: %c" + e, "color:#FF6600;font-weight:bold", "color: #FF9933")
    }
    tips(e) {
      console.log("%cTips: %c" + e, "color:#00B200;font-weight:bold", "color: #00CC33")
    }
  }
  t.Logger = c;
  t.Slide = class {
    isUp(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, s = t.clientX - a;
      return t.clientY - n < -60 && s < 20 && s > -20 && (this.slideLock = !1, !0)
    }
    isDown(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, s = t.clientX - a;
      return t.clientY - n > 60 && s < 20 && s > -20
    }
    isLeft(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, s = t.clientX - a, r = t.clientY - n;
      return s < -60 && r < 20 && r > -20
    }
    isRight(e = {}, t = {}) {
      const {
        startX: a,
        startY: n
      } = e, s = t.clientX - a, r = t.clientY - n;
      return s > 60 && r < 20 && r > -20
    }
  };
  class l {
    newDate(e, t, a) {
      let n = `${+e}-${+t}-${+a}`;
      return i() && (n = `${+e}/${+t}/${+a}`), new Date(n)
    }
    thisMonthDays(e, t) {
      return new Date(Date.UTC(e, t, 0)).getUTCDate()
    }
    firstDayOfWeek(e, t) {
      return new Date(Date.UTC(e, t - 1, 1)).getUTCDay()
    }
    dayOfWeek(e, t, a) {
      return new Date(Date.UTC(e, t - 1, a)).getUTCDay()
    }
    todayDate() {
      const e = new Date;
      return {
        year: e.getFullYear(),
        month: e.getMonth() + 1,
        date: e.getDate()
      }
    }
    todayTimestamp() {
      const {
        year: e,
        month: t,
        date: a
      } = this.todayDate();
      return this.newDate(e, t, a).getTime()
    }
    toTimeStr(e) {
      return e.day && (e.date = e.day), `${+e.year}-${+e.month}-${+e.date}`
    }
    sortDates(e, t) {
      return e.sort(function (e, a) {
        return b(e) < b(a) && "desc" !== t ? -1 : 1
      })
    }
    prevMonth(e) {
      return +e.month > 1 ? {
        year: e.year,
        month: e.month - 1
      } : {
        year: e.year - 1,
        month: 12
      }
    }
    nextMonth(e) {
      return +e.month < 12 ? {
        year: e.year,
        month: e.month + 1
      } : {
        year: e.year + 1,
        month: 1
      }
    }
    convertLunar(e = []) {
      return e.map(e => (e && (e.lunar = s.default.solar2lunar(+e.year, +e.month, +e.day)), e))
    }
  }

  function i() {
    const e = o();
    return /iphone|ios/i.test(e.platform)
  }

  function d() {
    const e = getCurrentPages();
    return e[e.length - 1]
  }

  function f(e = []) {
    const t = new l,
      a = e[0].split("-"),
      n = e[1].split("-"),
      s = new c;
    return 3 !== a.length || 3 !== n.length ? (s.warn('enableArea() 参数格式为: ["2018-2-1", "2018-3-1"]'), {}) : {
      start: a,
      end: n,
      startTimestamp: t.newDate(a[0], a[1], a[2]).getTime(),
      endTimestamp: t.newDate(n[0], n[1], n[2]).getTime()
    }
  }

  function b(e) {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return;
    return (new l).newDate(e.year, e.month, e.day).getTime()
  }

  function h(e = []) {
    const t = new c,
      a = new l,
      n = [];
    return e.forEach(e => {
      if ("string" != typeof e) return t.warn("enableDays()入参日期格式错误");
      const s = e.split("-");
      if (3 !== s.length) return t.warn("enableDays()入参日期格式错误");
      const r = a.newDate(s[0], s[1], s[2]).getTime();
      n.push(r)
    }), n
  }
  t.GetDate = l;
  t.initialTasks = {
    flag: "finished",
    tasks: []
  }
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  const n = {
      lunarInfo: [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560],
      solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
      Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
      Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
      solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
      sTermInfo: ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"],
      nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      nStr2: ["初", "十", "廿", "卅"],
      nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
      lYearDays: function (e) {
        let t, a = 348;
        for (t = 32768; t > 8; t >>= 1) a += n.lunarInfo[e - 1900] & t ? 1 : 0;
        return a + n.leapDays(e)
      },
      leapMonth: function (e) {
        return 15 & n.lunarInfo[e - 1900]
      },
      leapDays: function (e) {
        return n.leapMonth(e) ? 65536 & n.lunarInfo[e - 1900] ? 30 : 29 : 0
      },
      monthDays: function (e, t) {
        return t > 12 || t < 1 ? -1 : n.lunarInfo[e - 1900] & 65536 >> t ? 30 : 29
      },
      solarDays: function (e, t) {
        if (t > 12 || t < 1) return -1;
        const a = t - 1;
        return 1 == +a ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? 29 : 28 : n.solarMonth[a]
      },
      toGanZhiYear: function (e) {
        let t = (e - 3) % 10,
          a = (e - 3) % 12;
        return 0 == +t && (t = 10), 0 == +a && (a = 12), n.Gan[t - 1] + n.Zhi[a - 1]
      },
      toAstro: function (e, t) {
        return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(2 * e - (t < [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22][e - 1] ? 2 : 0), 2) + "座"
      },
      toGanZhi: function (e) {
        return n.Gan[e % 10] + n.Zhi[e % 12]
      },
      getTerm: function (e, t) {
        if (e < 1900 || e > 2100) return -1;
        if (t < 1 || t > 24) return -1;
        const a = n.sTermInfo[e - 1900],
          s = [parseInt("0x" + a.substr(0, 5)).toString(), parseInt("0x" + a.substr(5, 5)).toString(), parseInt("0x" + a.substr(10, 5)).toString(), parseInt("0x" + a.substr(15, 5)).toString(), parseInt("0x" + a.substr(20, 5)).toString(), parseInt("0x" + a.substr(25, 5)).toString()],
          r = [s[0].substr(0, 1), s[0].substr(1, 2), s[0].substr(3, 1), s[0].substr(4, 2), s[1].substr(0, 1), s[1].substr(1, 2), s[1].substr(3, 1), s[1].substr(4, 2), s[2].substr(0, 1), s[2].substr(1, 2), s[2].substr(3, 1), s[2].substr(4, 2), s[3].substr(0, 1), s[3].substr(1, 2), s[3].substr(3, 1), s[3].substr(4, 2), s[4].substr(0, 1), s[4].substr(1, 2), s[4].substr(3, 1), s[4].substr(4, 2), s[5].substr(0, 1), s[5].substr(1, 2), s[5].substr(3, 1), s[5].substr(4, 2)];
        return parseInt(r[t - 1])
      },
      toChinaMonth: function (e) {
        if (e > 12 || e < 1) return -1;
        let t = n.nStr3[e - 1];
        return t += "月"
      },
      toChinaDay: function (e) {
        let t;
        switch (e) {
          case 10:
            t = "初十";
            break;
          case 20:
            t = "二十";
            break;
          case 30:
            t = "三十";
            break;
          default:
            t = n.nStr2[Math.floor(e / 10)], t += n.nStr1[e % 10]
        }
        return t
      },
      getAnimal: function (e) {
        return n.Animals[(e - 4) % 12]
      },
      solar2lunar: function (e, t, a) {
        if (e < 1900 || e > 2100) return -1;
        if (1900 == +e && 1 == +t && +a < 31) return -1;
        let s, r, o = 0,
          c = 0;
        e = (s = e ? new Date(e, parseInt(t) - 1, a) : new Date).getFullYear(), t = s.getMonth() + 1, a = s.getDate();
        let l = (Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
        for (r = 1900; r < 2101 && l > 0; r++) l -= c = n.lYearDays(r);
        l < 0 && (l += c, r--);
        const i = new Date;
        let d = !1;
        i.getFullYear() === +e && i.getMonth() + 1 === +t && i.getDate() === +a && (d = !0);
        let f = s.getDay();
        const b = n.nStr1[f];
        0 == +f && (f = 7);
        const h = r;
        o = n.leapMonth(r);
        let u = !1;
        for (r = 1; r < 13 && l > 0; r++) o > 0 && r === o + 1 && !1 === u ? (--r, u = !0, c = n.leapDays(h)) : c = n.monthDays(h, r), !0 === u && r === o + 1 && (u = !1), l -= c;
        0 === l && o > 0 && r === o + 1 && (u ? u = !1 : (u = !0, --r)), l < 0 && (l += c, --r);
        const y = r,
          m = l + 1,
          D = t - 1,
          p = n.toGanZhiYear(h),
          g = n.getTerm(e, 2 * t - 1),
          T = n.getTerm(e, 2 * t);
        let w = n.toGanZhi(12 * (e - 1900) + t + 11);
        a >= g && (w = n.toGanZhi(12 * (e - 1900) + t + 12));
        let C = !1,
          M = null; + g === a && (C = !0, M = n.solarTerm[2 * t - 2]), +T === a && (C = !0, M = n.solarTerm[2 * t - 1]);
        const _ = Date.UTC(e, D, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10,
          S = n.toGanZhi(_ + a - 1),
          k = n.toAstro(t, a);
        return {
          lYear: h,
          lMonth: y,
          lDay: m,
          Animal: n.getAnimal(h),
          IMonthCn: (u ? "闰" : "") + n.toChinaMonth(y),
          IDayCn: n.toChinaDay(m),
          cYear: e,
          cMonth: t,
          cDay: a,
          gzYear: p,
          gzMonth: w,
          gzDay: S,
          isToday: d,
          isLeap: u,
          nWeek: f,
          ncWeek: "星期" + b,
          isTerm: C,
          Term: M,
          astro: k
        }
      },
      lunar2solar: function (e, t, a, s) {
        s = !!s;
        const r = n.leapMonth(e);
        if (s && r !== t) return -1;
        if (2100 == +e && 12 == +t && +a > 1 || 1900 == +e && 1 == +t && +a < 31) return -1;
        const o = n.monthDays(e, t);
        let c = o;
        if (s && (c = n.leapDays(e, t)), e < 1900 || e > 2100 || a > c) return -1;
        let l = 0;
        for (let t = 1900; t < e; t++) l += n.lYearDays(t);
        let i = 0,
          d = !1;
        for (let a = 1; a < t; a++) i = n.leapMonth(e), d || i <= a && i > 0 && (l += n.leapDays(e), d = !0), l += n.monthDays(e, a);
        s && (l += o);
        const f = Date.UTC(1900, 1, 30, 0, 0, 0),
          b = new Date(864e5 * (l + a - 31) + f),
          h = b.getUTCFullYear(),
          u = b.getUTCMonth() + 1,
          y = b.getUTCDate();
        return n.solar2lunar(h, u, y)
      }
    },
    {
      Gan: s,
      Zhi: r,
      nStr1: o,
      nStr2: c,
      nStr3: l,
      Animals: i,
      solarTerm: d,
      lunarInfo: f,
      sTermInfo: b,
      solarMonth: h,
      ...u
    } = n;
  var y = u;
  t.default = y
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = c(a(0)),
    s = c(a(4)),
    r = c(a(2)),
    o = a(1);

  function c(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const l = new o.Logger,
    i = new o.GetDate,
    d = Object.prototype.toString;
  class f extends n.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component.config
    }
    buildDate(e, t) {
      const a = i.todayDate(),
        n = i.thisMonthDays(e, t),
        s = [],
        {
          showLunar: o
        } = this.getCalendarConfig();
      for (let c = 1; c <= n; c++) {
        const n = +a.year == +e && +a.month == +t && c === +a.date,
          l = this.getCalendarConfig(),
          d = {
            year: e,
            month: t,
            day: c,
            choosed: !1,
            week: i.dayOfWeek(e, t, c),
            isToday: n && l.highlightToday
          };
        o && (d.lunar = r.default.solar2lunar(+d.year, +d.month, +d.day)), s.push(d)
      }
      return s
    }
    enableArea(e = []) {
      if (2 === e.length) {
        if (this.__judgeParam(e)) {
          let {
            days: t = [],
            selectedDay: a = []
          } = this.getData("calendar");
          const {
            startTimestamp: n,
            endTimestamp: s
          } = (0, o.convertEnableAreaToTimestamp)(e), r = this.__handleEnableArea({
            dateArea: e,
            days: t,
            startTimestamp: n,
            endTimestamp: s
          }, a);
          this.setData({
            "calendar.enableArea": e,
            "calendar.days": r.dates,
            "calendar.selectedDay": r.selectedDay,
            "calendar.enableAreaTimestamp": [n, s]
          })
        }
      } else l.warn('enableArea()参数需为时间范围数组，形如：["2018-8-4" , "2018-8-24"]')
    }
    enableDays(e = []) {
      const {
        enableArea: t = []
      } = this.getData("calendar");
      let a = [];
      a = t.length ? (0, o.delRepeatedEnableDay)(e, t) : (0, o.converEnableDaysToTimestamp)(e);
      let {
        days: n = [],
        selectedDay: s = []
      } = this.getData("calendar");
      const r = this.__handleEnableDays({
        days: n,
        expectEnableDaysTimestamp: a
      }, s);
      this.setData({
        "calendar.days": r.dates,
        "calendar.selectedDay": r.selectedDay,
        "calendar.enableDays": e,
        "calendar.enableDaysTimestamp": a
      })
    }
    setSelectedDays(e) {
      if (!(0, s.default)(this.Component).getCalendarConfig().multi) return l.warn("单选模式下不能设置多日期选中，请配置 multi");
      let {
        days: t
      } = this.getData("calendar"), a = [];
      if (e) {
        if (e && e.length) {
          const {
            dates: n,
            selectedDates: s
          } = this.__handleSelectedDays(t, a, e);
          t = n, a = s
        }
      } else t.map(e => {
        e.choosed = !0, e.showTodoLabel = !1
      }), a = t;
      (0, s.default)(this.Component).setCalendarConfig("multi", !0), this.setData({
        "calendar.days": t,
        "calendar.selectedDay": a
      })
    }
    disableDays(e) {
      const {
        disableDays: t = [],
        days: a
      } = this.getData("calendar");
      if ("[object Array]" !== Object.prototype.toString.call(e)) return l.warn("disableDays 参数为数组");
      let n = [];
      if (e.length) {
        const s = (n = (0, o.uniqueArrayByDate)(e.concat(t))).map(e => i.toTimeStr(e));
        a.forEach(e => {
          const t = i.toTimeStr(e);
          s.includes(t) && (e.disable = !0)
        })
      } else a.forEach(e => {
        e.disable = !1
      });
      this.setData({
        "calendar.days": a,
        "calendar.disableDays": n
      })
    }
    chooseArea(e = []) {
      return new Promise((t, a) => {
        if (1 === e.length && (e = e.concat(e)), 2 === e.length) {
          if (this.__judgeParam(e)) {
            const n = (0, s.default)(this.Component).getCalendarConfig(),
              {
                startTimestamp: r,
                endTimestamp: c
              } = (0, o.convertEnableAreaToTimestamp)(e);
            this.setData({
              calendarConfig: {
                ...n,
                chooseAreaMode: !0,
                mulit: !0
              },
              "calendar.chooseAreaTimestamp": [r, c]
            }, () => {
              this.__chooseContinuousDates(r, c).then(t).catch(a)
            })
          }
        }
      })
    }
    __pusheNextMonthDateArea(e, t, a, n) {
      const s = this.buildDate(e.year, e.month);
      let r = s.length;
      for (let e = 0; e < r; e++) {
        const c = s[e],
          l = (0, o.getDateTimeStamp)(c);
        l <= a && l >= t && n.push({
          ...c,
          choosed: !0
        }), e === r - 1 && l < a && this.__pusheNextMonthDateArea(i.nextMonth(c), t, a, n)
      }
    }
    __pushPrevMonthDateArea(e, t, a, n) {
      const s = i.sortDates(this.buildDate(e.year, e.month), "desc");
      let r = s.length,
        c = (0, o.getDateTimeStamp)(s[0]);
      for (let e = 0; e < r; e++) {
        const l = s[e],
          d = (0, o.getDateTimeStamp)(l);
        d >= t && d <= a && n.push({
          ...l,
          choosed: !0
        }), e === r - 1 && c > t && this.__pushPrevMonthDateArea(i.prevMonth(l), t, a, n)
      }
    }
    __calcDateWhenNotInOneMonth(e) {
      const {
        firstDate: t,
        lastDate: a,
        startTimestamp: n,
        endTimestamp: s,
        filterSelectedDate: r
      } = e;
      return (0, o.getDateTimeStamp)(t) > n && this.__pushPrevMonthDateArea(i.prevMonth(t), n, s, r), (0, o.getDateTimeStamp)(a) < s && this.__pusheNextMonthDateArea(i.nextMonth(a), n, s, r), [...i.sortDates(r)]
    }
    __chooseContinuousDates(e, t) {
      return new Promise((a, n) => {
        const {
          days: s,
          selectedDay: r = []
        } = this.getData("calendar"), c = [];
        let l = [];
        r.forEach(a => {
          const n = (0, o.getDateTimeStamp)(a);
          n >= e && n <= t && (l.push(a), c.push(i.toTimeStr(a)))
        }), s.forEach(a => {
          const n = (0, o.getDateTimeStamp)(a),
            s = c.includes(i.toTimeStr(a));
          if (n >= e && n <= t) {
            if (s) return;
            a.choosed = !0, l.push(a)
          } else if (a.choosed = !1, s) {
            const e = l.findIndex(e => i.toTimeStr(e) === i.toTimeStr(a));
            e > -1 && l.splice(e, 1)
          }
        });
        const d = s[0],
          f = s[s.length - 1],
          b = this.__calcDateWhenNotInOneMonth({
            firstDate: d,
            lastDate: f,
            startTimestamp: e,
            endTimestamp: t,
            filterSelectedDate: l
          });
        try {
          this.setData({
            "calendar.days": [...s],
            "calendar.selectedDay": b
          }, () => {
            a(b)
          })
        } catch (e) {
          n(e)
        }
      })
    }
    setDateStyle(e) {
      if ("[object Array]" !== d.call(e)) return;
      const {
        days: t,
        specialStyleDates: a
      } = this.getData("calendar");
      "[object Array]" === d.call(a) && (e = (0, o.uniqueArrayByDate)([...a, ...e]));
      const n = e.map(e => `${e.year}_${e.month}_${e.day}`),
        s = t.map(t => {
          const a = n.indexOf(`${t.year}_${t.month}_${t.day}`);
          return a > -1 ? {
            ...t,
            class: e[a].class
          } : {
            ...t
          }
        });
      this.setData({
        "calendar.days": s,
        "calendar.specialStyleDates": e
      })
    }
    __judgeParam(e) {
      const {
        start: t,
        end: a,
        startTimestamp: n,
        endTimestamp: s
      } = (0, o.convertEnableAreaToTimestamp)(e);
      if (!t || !a) return;
      const r = i.thisMonthDays(t[0], t[1]),
        c = i.thisMonthDays(a[0], a[1]);
      return t[2] > r || t[2] < 1 ? (l.warn("enableArea() 开始日期错误，指定日期不在当前月份天数范围内"), !1) : t[1] > 12 || t[1] < 1 ? (l.warn("enableArea() 开始日期错误，月份超出1-12月份"), !1) : a[2] > c || a[2] < 1 ? (l.warn("enableArea() 截止日期错误，指定日期不在当前月份天数范围内"), !1) : a[1] > 12 || a[1] < 1 ? (l.warn("enableArea() 截止日期错误，月份超出1-12月份"), !1) : !(n > s) || (l.warn("enableArea()参数最小日期大于了最大日期"), !1)
    }
    __getDisableDateTimestamp() {
      let e;
      const {
        date: t,
        type: a
      } = this.getCalendarConfig().disableMode || {};
      if (t) {
        const a = t.split("-");
        if (a.length < 3) return l.warn("配置 disableMode.date 格式错误"), {};
        e = (0, o.getDateTimeStamp)({
          year: +a[0],
          month: +a[1],
          day: +a[2]
        })
      }
      return {
        disableDateTimestamp: e,
        disableType: a
      }
    }
    __handleEnableArea(e = {}, t = []) {
      const {
        area: a,
        days: n,
        startTimestamp: s,
        endTimestamp: r
      } = e, c = this.getData("calendar.enableDays") || [];
      let l = [];
      c.length && (l = (0, o.delRepeatedEnableDay)(c, a));
      const {
        disableDateTimestamp: d,
        disableType: f
      } = this.__getDisableDateTimestamp(), b = [...n];
      return b.forEach(e => {
        const a = +i.newDate(e.year, e.month, e.day).getTime();
        (+s > a || a > +r) && !l.includes(a) || "before" === f && d && a < d || "after" === f && d && a > d ? (e.disable = !0, e.choosed && (e.choosed = !1, t = t.filter(t => i.toTimeStr(e) !== i.toTimeStr(t)))) : e.disable && (e.disable = !1)
      }), {
        dates: b,
        selectedDay: t
      }
    }
    __handleEnableDays(e = {}, t = []) {
      const {
        days: a,
        expectEnableDaysTimestamp: n
      } = e, {
        enableAreaTimestamp: s = []
      } = this.getData("calendar"), r = [...a];
      return r.forEach(e => {
        const a = i.newDate(e.year, e.month, e.day).getTime();
        let r = !1;
        s.length ? (+s[0] > +a || +a > +s[1]) && !n.includes(+a) && (r = !0) : n.includes(+a) || (r = !0), r ? (e.disable = !0, e.choosed && (e.choosed = !1, t = t.filter(t => i.toTimeStr(e) !== i.toTimeStr(t)))) : e.disable = !1
      }), {
        dates: r,
        selectedDay: t
      }
    }
    __handleSelectedDays(e = [], t = [], a) {
      const {
        selectedDay: n,
        showLabelAlways: s
      } = this.getData("calendar");
      t = n && n.length ? (0, o.uniqueArrayByDate)(n.concat(a)) : a;
      const {
        year: r,
        month: c
      } = e[0], l = [];
      return t.forEach(e => {
        +e.year == +r && +e.month == +c && l.push(i.toTimeStr(e))
      }), [...e].map(e => {
        l.includes(i.toTimeStr(e)) && (e.choosed = !0, s && e.showTodoLabel ? e.showTodoLabel = !0 : e.showTodoLabel = !1)
      }), {
        dates: e,
        selectedDates: t
      }
    }
  }
  t.default = e => new f(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n, s = (n = a(0)) && n.__esModule ? n : {
    default: n
  };
  class r extends s.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component && this.Component.config ? this.Component.config : {}
    }
    setCalendarConfig(e) {
      return new Promise((t, a) => {
        if (!this.Component || !this.Component.config) return void a("异常：未找到组件配置信息");
        let n = {
          ...this.Component.config,
          ...e
        };
        this.Component.config = n, this.setData({
          calendarConfig: n
        }, () => {
          t(n)
        })
      })
    }
  }
  t.default = e => new r(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = i(a(3)),
    s = i(a(0)),
    r = i(a(6)),
    o = i(a(4)),
    c = i(a(2)),
    l = a(1);

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const d = new l.GetDate,
    f = new l.Logger;
  class b extends s.default {
    constructor(e) {
      super(e), this.Component = e, this.getCalendarConfig = (0, o.default)(this.Component).getCalendarConfig
    }
    switchWeek(e, t) {
      return new Promise((a, n) => {
        if ((0, o.default)(this.Component).getCalendarConfig().multi) return f.warn("多选模式不能切换周月视图");
        const {
          selectedDay: s = [],
          curYear: c,
          curMonth: l
        } = this.getData("calendar");
        if (!s.length) return this.__tipsWhenCanNotSwtich();
        const i = s[0];
        if ("week" === e) {
          if (this.Component.weekMode) return;
          const e = t || i,
            {
              year: s,
              month: r
            } = e;
          if (c !== s || l !== r) return this.__tipsWhenCanNotSwtich();
          this.Component.weekMode = !0, this.setData({
            "calendar.weekMode": !0
          }), this.jump(e).then(a).catch(n)
        } else this.Component.weekMode = !1, this.setData({
          "calendar.weekMode": !1
        }), (0, r.default)(this.Component).renderCalendar(c, l, t).then(a).catch(n)
      })
    }
    updateCurrYearAndMonth(e) {
      let {
        days: t,
        curYear: a,
        curMonth: n
      } = this.getData("calendar");
      const {
        month: s
      } = t[0], {
        month: r
      } = t[t.length - 1], o = d.thisMonthDays(a, n), c = t[t.length - 1], l = t[0];
      return (c.day + 7 > o || n === s && s !== r) && "next" === e ? (n += 1) > 12 && (a += 1, n = 1) : (+l.day <= 7 || n === r && s !== r) && "prev" === e && (n -= 1) <= 0 && (a -= 1, n = 12), {
        Uyear: a,
        Umonth: n
      }
    }
    calculateLastDay() {
      const {
        days: e = [],
        curYear: t,
        curMonth: a
      } = this.getData("calendar");
      return {
        lastDayInThisWeek: e[e.length - 1].day,
        lastDayInThisMonth: d.thisMonthDays(t, a)
      }
    }
    calculateFirstDay() {
      const {
        days: e
      } = this.getData("calendar");
      return {
        firstDayInThisWeek: e[0].day
      }
    }
    firstWeekInMonth(e, t, a) {
      let s = d.dayOfWeek(e, t, 1);
      a && 0 === s && (s = 7);
      const [, r] = [0, 7 - s];
      let o = this.getData("calendar.days") || [];
      return this.Component.weekMode && (o = (0, n.default)(this.Component).buildDate(e, t)), o.slice(0, a ? r + 1 : r)
    }
    lastWeekInMonth(e, t, a) {
      const s = d.thisMonthDays(e, t),
        r = d.dayOfWeek(e, t, s),
        [o, c] = [s - r, s];
      let l = this.getData("calendar.days") || [];
      return this.Component.weekMode && (l = (0, n.default)(this.Component).buildDate(e, t)), l.slice(a ? o : o - 1, c)
    }
    __getDisableDateTimestamp(e) {
      const {
        date: t,
        type: a
      } = e.disableMode || {};
      let n;
      if (t) {
        const e = t.split("-");
        if (e.length < 3) return f.warn("配置 disableMode.date 格式错误"), {};
        n = (0, l.getDateTimeStamp)({
          year: +e[0],
          month: +e[1],
          day: +e[2]
        })
      }
      return {
        disableDateTimestamp: n,
        disableType: a
      }
    }
    initSelectedDay(e) {
      let t = [...e];
      const {
        selectedDay: a = []
      } = this.getData("calendar"), n = a.map(e => `${+e.year}-${+e.month}-${+e.day}`), s = this.getCalendarConfig(), {
        disableDateTimestamp: r,
        disableType: o
      } = this.__getDisableDateTimestamp(s);
      return t = t.map(e => {
        if (!e) return {};
        const t = (0, l.getDateTimeStamp)(e);
        let a = {
          ...e
        };
        return n.includes(`${+a.year}-${+a.month}-${+a.day}`) ? a.choosed = !0 : a.choosed = !1, ("after" === o && t > r || "before" === o && t < r) && (a.disable = !0), a = this.__setTodoWhenJump(a, s), s.showLunar && (a = this.__setSolarLunar(a)), s.highlightToday && (a = this.__highlightToday(a)), a
      })
    }
    setEnableAreaOnWeekMode(e = []) {
      let {
        enableAreaTimestamp: t = [],
        enableDaysTimestamp: a = []
      } = this.getData("calendar");
      e.forEach(e => {
        const n = d.newDate(e.year, e.month, e.day).getTime();
        let s = !1;
        t.length ? (+t[0] > +n || +n > +t[1]) && !a.includes(+n) && (s = !0) : a.length && !a.includes(+n) && (s = !0), s && (e.disable = !0, e.choosed = !1);
        const r = (0, o.default)(this.Component).getCalendarConfig(),
          {
            disableDateTimestamp: c,
            disableType: l
          } = this.__getDisableDateTimestamp(r);
        ("before" === l && n < c || "after" === l && n > c) && (e.disable = !0)
      })
    }
    calculateNextWeekDays() {
      let {
        lastDayInThisWeek: e,
        lastDayInThisMonth: t
      } = this.calculateLastDay(), {
        curYear: a,
        curMonth: s
      } = this.getData("calendar"), r = [];
      if (t - e >= 7) {
        const {
          Uyear: t,
          Umonth: n
        } = this.updateCurrYearAndMonth("next");
        a = t, s = n;
        for (let t = e + 1; t <= e + 7; t++) r.push({
          year: a,
          month: s,
          day: t,
          week: d.dayOfWeek(a, s, t)
        })
      } else {
        for (let n = e + 1; n <= t; n++) r.push({
          year: a,
          month: s,
          day: n,
          week: d.dayOfWeek(a, s, n)
        });
        const {
          Uyear: n,
          Umonth: o
        } = this.updateCurrYearAndMonth("next");
        a = n, s = o;
        for (let n = 1; n <= 7 - (t - e); n++) r.push({
          year: a,
          month: s,
          day: n,
          week: d.dayOfWeek(a, s, n)
        })
      }
      r = this.initSelectedDay(r), this.setEnableAreaOnWeekMode(r), this.setData({
        "calendar.curYear": a,
        "calendar.curMonth": s,
        "calendar.days": r
      }, () => {
        (0, n.default)(this.Component).setDateStyle()
      })
    }
    calculatePrevWeekDays() {
      let {
        firstDayInThisWeek: e
      } = this.calculateFirstDay(), {
        curYear: t,
        curMonth: a
      } = this.getData("calendar"), s = [];
      if (e - 7 > 0) {
        const {
          Uyear: n,
          Umonth: r
        } = this.updateCurrYearAndMonth("prev");
        t = n, a = r;
        for (let n = e - 7; n < e; n++) s.push({
          year: t,
          month: a,
          day: n,
          week: d.dayOfWeek(t, a, n)
        })
      } else {
        let n = [];
        for (let s = 1; s < e; s++) n.push({
          year: t,
          month: a,
          day: s,
          week: d.dayOfWeek(t, a, s)
        });
        const {
          Uyear: r,
          Umonth: o
        } = this.updateCurrYearAndMonth("prev");
        t = r, a = o;
        const c = d.thisMonthDays(t, a);
        for (let n = c - Math.abs(e - 7); n <= c; n++) s.push({
          year: t,
          month: a,
          day: n,
          week: d.dayOfWeek(t, a, n)
        });
        s = s.concat(n)
      }
      s = this.initSelectedDay(s), this.setEnableAreaOnWeekMode(s), this.setData({
        "calendar.curYear": t,
        "calendar.curMonth": a,
        "calendar.days": s
      }, () => {
        (0, n.default)(this.Component).setDateStyle()
      })
    }
    calculateDatesWhenJump({
      year: e,
      month: t,
      day: a
    }, {
      firstWeekDays: n,
      lastWeekDays: s
    }, r) {
      const o = this.__dateIsInWeek({
          year: e,
          month: t,
          day: a
        }, n),
        c = this.__dateIsInWeek({
          year: e,
          month: t,
          day: a
        }, s);
      let l = [];
      return l = o ? this.__calculateDatesWhenInFirstWeek(n, r) : c ? this.__calculateDatesWhenInLastWeek(s, r) : this.__calculateDates({
        year: e,
        month: t,
        day: a
      }, r)
    }
    jump({
      year: e,
      month: t,
      day: a
    }) {
      return new Promise(s => {
        if (!a) return;
        const r = this.getCalendarConfig(),
          o = "Mon" === r.firstDayOfWeek,
          c = this.firstWeekInMonth(e, t, o);
        let l = this.lastWeekInMonth(e, t, o),
          i = this.calculateDatesWhenJump({
            year: e,
            month: t,
            day: a
          }, {
            firstWeekDays: c,
            lastWeekDays: l
          }, o);
        i = i.map(n => {
          let s = {
            ...n
          };
          return +s.year == +e && +s.month == +t && +s.day == +a && (s.choosed = !0), s = this.__setTodoWhenJump(s, r), r.showLunar && (s = this.__setSolarLunar(s)), r.highlightToday && (s = this.__highlightToday(s)), s
        }), this.setEnableAreaOnWeekMode(i), this.setData({
          "calendar.days": i,
          "calendar.curYear": e,
          "calendar.curMonth": t,
          "calendar.empytGrids": [],
          "calendar.lastEmptyGrids": [],
          "calendar.selectedDay": i.filter(e => e.choosed)
        }, () => {
          (0, n.default)(this.Component).setDateStyle(), s({
            year: e,
            month: t,
            date: a
          })
        })
      })
    }
    __setTodoWhenJump(e) {
      const t = {
          ...e
        },
        {
          todoLabels: a = [],
          showLabelAlways: n
        } = this.getData("calendar"),
        s = a.map(e => `${+e.year}-${+e.month}-${+e.day}`).indexOf(`${+t.year}-${+t.month}-${+t.day}`);
      if (-1 !== s) {
        t.showTodoLabel = !!n || !t.choosed;
        const e = a[s] || {};
        t.showTodoLabel && e.todoText && (t.todoText = e.todoText)
      }
      return t
    }
    __setSolarLunar(e) {
      const t = {
        ...e
      };
      return t.lunar = c.default.solar2lunar(+t.year, +t.month, +t.day), t
    }
    __highlightToday(e) {
      const t = {
          ...e
        },
        a = d.todayDate(),
        n = +a.year == +t.year && +a.month == +t.month && +t.day == +a.date;
      return t.isToday = n, t
    }
    __calculateDatesWhenInFirstWeek(e) {
      const t = [...e];
      if (t.length < 7) {
        let e, {
            year: a,
            month: n
          } = t[0],
          s = 7 - t.length;
        for (n > 1 ? (n -= 1, e = d.thisMonthDays(a, n)) : (n = 12, a -= 1, e = d.thisMonthDays(a, n)); s;) t.unshift({
          year: a,
          month: n,
          day: e,
          week: d.dayOfWeek(a, n, e)
        }), e -= 1, s -= 1
      }
      return t
    }
    __calculateDatesWhenInLastWeek(e) {
      const t = [...e];
      if (t.length < 7) {
        let {
          year: e,
          month: a
        } = t[0], n = 7 - t.length, s = 1;
        for (a > 11 ? (a = 1, e += 1) : a += 1; n;) t.push({
          year: e,
          month: a,
          day: s,
          week: d.dayOfWeek(e, a, s)
        }), s += 1, n -= 1
      }
      return t
    }
    __calculateDates({
      year: e,
      month: t,
      day: a
    }, s) {
      const r = d.dayOfWeek(e, t, a);
      let o = [a - r, a + (6 - r)];
      return s && (o = [a + 1 - r, a + (7 - r)]), (0, n.default)(this.Component).buildDate(e, t).slice(o[0] - 1, o[1])
    }
    __dateIsInWeek(e, t) {
      return t.find(t => +t.year == +e.year && +t.month == +e.month && +t.day == +e.day)
    }
    __tipsWhenCanNotSwtich() {
      f.info("当前月份未选中日期下切换为周视图，不能明确该展示哪一周的日期，故此情况不允许切换")
    }
  }
  t.default = e => new b(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = l(a(3)),
    s = l(a(7)),
    r = l(a(0)),
    o = l(a(2)),
    c = a(1);

  function l(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  const i = new c.GetDate,
    d = new c.Logger;
  class f extends r.default {
    constructor(e) {
      super(e), this.Component = e
    }
    getCalendarConfig() {
      return this.Component.config
    }
    renderCalendar(e, t, a) {
      return new Promise(r => {
        this.calculateEmptyGrids(e, t), this.calculateDays(e, t, a).then(() => {
          const {
            todoLabels: a,
            specialStyleDates: o
          } = this.getData("calendar") || {};
          a && a.find(a => +a.month == +t && +a.year == +e) && (0, s.default)(this.Component).setTodoLabels(), o && o.length && o.find(a => +a.month == +t && +a.year == +e) && (0, n.default)(this.Component).setDateStyle(o), this.Component.firstRender ? r({
            firstRender: !1
          }) : r({
            firstRender: !0
          })
        })
      })
    }
    calculateEmptyGrids(e, t) {
      this.calculatePrevMonthGrids(e, t), this.calculateNextMonthGrids(e, t)
    }
    calculatePrevMonthGrids(e, t) {
      let a = [];
      const n = i.thisMonthDays(e, t - 1);
      let s = i.firstDayOfWeek(e, t);
      const r = this.getCalendarConfig() || {};
      if ("Mon" === r.firstDayOfWeek && (0 === s ? s = 6 : s -= 1), s > 0) {
        const c = n - s,
          {
            onlyShowCurrentMonth: l
          } = r,
          {
            showLunar: i
          } = this.getCalendarConfig();
        for (let s = n; s > c; s--) l ? a.push("") : a.push({
          day: s,
          lunar: i ? o.default.solar2lunar(e, t - 1, s) : null
        });
        this.setData({
          "calendar.empytGrids": a.reverse()
        })
      } else this.setData({
        "calendar.empytGrids": null
      })
    }
    calculateExtraEmptyDate(e, t, a) {
      let n = 0;
      if (2 == +t) {
        n += 7;
        let s = i.dayOfWeek(e, t, 1);
        "Mon" === a.firstDayOfWeek ? 1 == +s && (n += 7) : 0 == +s && (n += 7)
      } else {
        let s = i.dayOfWeek(e, t, 1);
        "Mon" === a.firstDayOfWeek ? 0 !== s && s < 6 && (n += 7) : s < 5 && (n += 7)
      }
      return n
    }
    calculateNextMonthGrids(e, t) {
      let a = [];
      const n = i.thisMonthDays(e, t);
      let s = i.dayOfWeek(e, t, n);
      const r = this.getCalendarConfig() || {};
      "Mon" === r.firstDayOfWeek && (0 === s ? s = 6 : s -= 1);
      let c = 7 - (s + 1);
      const {
        onlyShowCurrentMonth: l,
        showLunar: d
      } = r;
      l || (c += this.calculateExtraEmptyDate(e, t, r));
      for (let n = 1; n <= c; n++) l ? a.push("") : a.push({
        day: n,
        lunar: d ? o.default.solar2lunar(e, t + 1, n) : null
      });
      this.setData({
        "calendar.lastEmptyGrids": a
      })
    }
    setSelectedDay(e, t, a) {
      let n = [];
      const s = this.getCalendarConfig();
      if (s.noDefault) n = [], s.noDefault = !1;
      else {
        const s = this.getData("calendar") || {},
          {
            showLunar: r
          } = this.getCalendarConfig();
        n = a ? [{
          year: e,
          month: t,
          day: a,
          choosed: !0,
          week: i.dayOfWeek(e, t, a),
          lunar: r ? o.default.solar2lunar(e, t, a) : null
        }] : s.selectedDay
      }
      return n
    }
    __getDisableDateTimestamp() {
      let e;
      const {
        date: t,
        type: a
      } = this.getCalendarConfig().disableMode || {};
      if (t) {
        const a = t.split("-");
        if (a.length < 3) return d.warn("配置 disableMode.date 格式错误"), {};
        e = (0, c.getDateTimeStamp)({
          year: +a[0],
          month: +a[1],
          day: +a[2]
        })
      }
      return {
        disableDateTimestamp: e,
        disableType: a
      }
    }
    calculateDays(e, t, a) {
      return new Promise(s => {
        let r = [];
        const {
          disableDays: o = [],
          chooseAreaTimestamp: l = []
        } = this.getData("calendar");
        r = (0, n.default)(this.Component).buildDate(e, t);
        const d = this.setSelectedDay(e, t, a),
          f = d.map(e => i.toTimeStr(e)),
          b = o.map(e => i.toTimeStr(e)),
          [h, u] = l;
        r.forEach(e => {
          const t = i.toTimeStr(e),
            a = (0, c.getDateTimeStamp)(e);
          if (f.includes(t)) {
            if (e.choosed = !0, a > u || a < h) {
              const t = d.findIndex(t => i.toTimeStr(t) === i.toTimeStr(e));
              d.splice(t, 1)
            }
          } else h && u && a >= h && a <= u && (e.choosed = !0, d.push(e));
          b.includes(t) && (e.disable = !0);
          const {
            disableDateTimestamp: n,
            disableType: s
          } = this.__getDisableDateTimestamp();
          let r = !1;
          n && ("before" === s && a < n || "after" === s && a > n) && (r = !0), (r || this.__isDisable(a)) && (e.disable = !0, e.choosed = !1)
        }), this.setData({
          "calendar.days": r,
          "calendar.selectedDay": [...d] || !1
        }, () => {
          s()
        })
      })
    }
    __isDisable(e) {
      const {
        enableArea: t = [],
        enableDays: a = [],
        enableAreaTimestamp: n = []
      } = this.getData("calendar");
      let s = !1,
        r = (0, c.converEnableDaysToTimestamp)(a);
      return t.length && (r = (0, c.delRepeatedEnableDay)(a, t)), n.length ? (+n[0] > +e || +e > +n[1]) && !r.includes(+e) && (s = !0) : r.length && !r.includes(+e) && (s = !0), s
    }
  }
  t.default = e => new f(e)
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n, s = (n = a(0)) && n.__esModule ? n : {
      default: n
    },
    r = a(1);
  const o = new r.Logger,
    c = new r.GetDate;
  class l extends s.default {
    constructor(e) {
      super(e), this.Component = e
    }
    setTodoLabels(e) {
      e && (this.Component.todoConfig = e);
      const t = this.getData("calendar");
      if (!t || !t.days) return o.warn("请等待日历初始化完成后再调用该方法");
      const a = [...t.days],
        {
          curYear: n,
          curMonth: s
        } = t,
        {
          circle: c,
          dotColor: l = "",
          pos: i = "bottom",
          showLabelAlways: d,
          days: f = []
        } = e || this.Component.todoConfig || {},
        {
          todoLabels: b = [],
          todoLabelPos: h,
          todoLabelColor: u
        } = t,
        y = this.getTodoLabels({
          year: n,
          month: s
        });
      let m = f.filter(e => +e.year == +n && +e.month == +s);
      this.Component.weekMode && (m = f);
      const D = y.concat(m);
      for (let e of D) {
        let t;
        (t = this.Component.weekMode ? a.find(t => +e.year == +t.year && +e.month == +t.month && +e.day == +t.day) : a[e.day - 1]) && (t.showTodoLabel = !!d || !t.choosed, t.showTodoLabel && e.todoText && (t.todoText = e.todoText), e.color && (t.color = e.color))
      }
      const p = {
        "calendar.days": a,
        "calendar.todoLabels": (0, r.uniqueArrayByDate)(f.concat(b))
      };
      c || (i && i !== h && (p["calendar.todoLabelPos"] = i), l && l !== u && (p["calendar.todoLabelColor"] = l)), p["calendar.todoLabelCircle"] = c || !1, p["calendar.showLabelAlways"] = d || !1, this.setData(p)
    }
    deleteTodoLabels(e) {
      if (!(e instanceof Array && e.length)) return;
      const t = this.filterTodos(e),
        {
          days: a,
          curYear: n,
          curMonth: s
        } = this.getData("calendar"),
        r = t.filter(e => n === +e.year && s === +e.month);
      a.forEach(e => {
        e.showTodoLabel = !1
      }), r.forEach(e => {
        a[e.day - 1].showTodoLabel = !a[e.day - 1].choosed
      }), this.setData({
        "calendar.days": a,
        "calendar.todoLabels": t
      })
    }
    clearTodoLabels() {
      const {
        days: e = []
      } = this.getData("calendar"), t = [].concat(e);
      t.forEach(e => {
        e.showTodoLabel = !1
      }), this.setData({
        "calendar.days": t,
        "calendar.todoLabels": []
      })
    }
    getTodoLabels(e) {
      const {
        todoLabels: t = []
      } = this.getData("calendar");
      if (e) {
        const {
          year: a,
          month: n
        } = e;
        return t.filter(e => +e.year == +a && +e.month == +n)
      }
      return t
    }
    filterTodos(e) {
      const t = this.getData("calendar.todoLabels") || [],
        a = e.map(e => c.toTimeStr(e));
      return t.filter(e => !a.includes(c.toTimeStr(e)))
    }
    showTodoLabels(e, t, a) {
      e.forEach(e => {
        if (this.Component.weekMode) t.forEach((n, s) => {
          if (+n.day == +e.day) {
            const n = t[s];
            n.hasTodo = !0, n.todoText = e.todoText, a && a.length && +a[0].day == +e.day && (n.showTodoLabel = !0)
          }
        });
        else {
          const n = t[e.day - 1];
          if (!n) return;
          n.hasTodo = !0, n.todoText = e.todoText, a && a.length && +a[0].day == +e.day && (t[a[0].day - 1].showTodoLabel = !0)
        }
      })
    }
  }
  t.default = e => new l(e)
}, function (e, t, a) {
  "use strict";
  var n, s = (n = a(5)) && n.__esModule ? n : {
      default: n
    },
    r = a(1),
    o = function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var a in e)
          if (Object.prototype.hasOwnProperty.call(e, a)) {
            var n = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, a) : {};
            n.get || n.set ? Object.defineProperty(t, a, n) : t[a] = e[a]
          } return t.default = e, t
    }(a(9));
  const c = new r.Slide,
    l = new r.Logger,
    i = new r.GetDate;
  Component({
    options: {
      styleIsolation: "apply-shared",
      multipleSlots: !0
    },
    properties: {
      calendarConfig: {
        type: Object,
        value: {}
      }
    },
    data: {
      handleMap: {
        prev_year: "chooseYear",
        prev_month: "chooseMonth",
        next_month: "chooseMonth",
        next_year: "chooseYear"
      }
    },
    lifetimes: {
      attached: function () {
        this.initComp()
      }
    },
    attached: function () {
      this.initComp()
    },
    methods: {
      initComp() {
        const e = this.setDefaultDisableDate();
        this.setConfig(e), (0, o.default)(this, e)
      },
      setDefaultDisableDate() {
        const e = this.properties.calendarConfig || {};
        return e.disableMode && !e.disableMode.date && (e.disableMode.date = i.toTimeStr(i.todayDate())), e
      },
      setConfig(e) {
        e.markToday && "string" == typeof e.markToday && (e.highlightToday = !0), e.theme = e.theme || "default", this.setData({
          calendarConfig: e
        })
      },
      chooseDate(e) {
        const {
          type: t
        } = e.currentTarget.dataset;
        t && this[this.data.handleMap[t]](t)
      },
      chooseYear(e) {
        const {
          curYear: t,
          curMonth: a
        } = this.data.calendar;
        if (!t || !a) return l.warn("异常：未获取到当前年月");
        if (this.weekMode) return console.warn("周视图下不支持点击切换年月");
        let n = +t,
          s = +a;
        "prev_year" === e ? n -= 1 : "next_year" === e && (n += 1), this.render(t, a, n, s)
      },
      chooseMonth(e) {
        const {
          curYear: t,
          curMonth: a
        } = this.data.calendar;
        if (!t || !a) return l.warn("异常：未获取到当前年月");
        if (this.weekMode) return console.warn("周视图下不支持点击切换年月");
        let n = +t,
          s = +a;
        "prev_month" === e ? (s -= 1) < 1 && (n -= 1, s = 12) : "next_month" === e && (s += 1) > 12 && (n += 1, s = 1), this.render(t, a, n, s)
      },
      render(e, t, a, n) {
        o.whenChangeDate.call(this, {
          curYear: e,
          curMonth: t,
          newYear: a,
          newMonth: n
        }), this.setData({
          "calendar.curYear": a,
          "calendar.curMonth": n
        }), o.renderCalendar.call(this, a, n)
      },
      tapDayItem(e) {
        const {
          idx: t,
          date: a = {}
        } = e.currentTarget.dataset, {
          day: n,
          disable: s
        } = a;
        if (s || !n) return;
        const r = this.data.calendarConfig || this.config || {},
          {
            multi: c,
            chooseAreaMode: l
          } = r;
        c ? o.whenMulitSelect.call(this, t) : l ? o.whenChooseArea.call(this, t) : o.whenSingleSelect.call(this, t)
      },
      doubleClickToToday() {
        if (!this.config.multi && !this.weekMode)
          if (void 0 === this.count ? this.count = 1 : this.count += 1, this.lastClick) {
            (new Date).getTime() - this.lastClick < 500 && this.count >= 2 && o.jump.call(this), this.count = void 0, this.lastClick = void 0
          } else this.lastClick = (new Date).getTime()
      },
      calendarTouchstart(e) {
        const t = e.touches[0],
          a = t.clientX,
          n = t.clientY;
        this.slideLock = !0, this.setData({
          "gesture.startX": a,
          "gesture.startY": n
        })
      },
      handleSwipe(e) {
        let t = "calendar.leftSwipe",
          a = "next_month",
          n = "next_week";
        if ("right" === e && (t = "calendar.rightSwipe", a = "prev_month", n = "prev_week"), this.setData({
            [t]: 1
          }), this.currentYM = (0, o.getCurrentYM)(), this.weekMode) return this.slideLock = !1, this.currentDates = (0, o.getCalendarDates)(), "prev_week" === n ? (0, s.default)(this).calculatePrevWeekDays() : "next_week" === n && (0, s.default)(this).calculateNextWeekDays(), this.onSwipeCalendar(n), void this.onWeekChange(n);
        this.chooseMonth(a), this.onSwipeCalendar(a)
      },
      calendarTouchmove(e) {
        const {
          gesture: t
        } = this.data, {
          preventSwipe: a
        } = this.properties.calendarConfig;
        this.slideLock && !a && (c.isLeft(t, e.touches[0]) && (this.handleSwipe("left"), this.slideLock = !1), c.isRight(t, e.touches[0]) && (this.handleSwipe("right"), this.slideLock = !1))
      },
      calendarTouchend(e) {
        this.setData({
          "calendar.leftSwipe": 0,
          "calendar.rightSwipe": 0
        })
      },
      onSwipeCalendar(e) {
        this.triggerEvent("onSwipe", {
          directionType: e,
          currentYM: this.currentYM
        })
      },
      onWeekChange(e) {
        this.triggerEvent("whenChangeWeek", {
          current: {
            currentYM: this.currentYM,
            dates: [...this.currentDates]
          },
          next: {
            currentYM: (0, o.getCurrentYM)(),
            dates: (0, o.getCalendarDates)()
          },
          directionType: e
        }), this.currentDates = null, this.currentYM = null
      }
    }
  })
}, function (e, t, a) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getCurrentYM = L, t.getSelectedDay = v, t.cancelSelectedDates = W, t.jump = A, t.setTodoLabels = x, t.deleteTodoLabels = O, t.clearTodoLabels = E, t.getTodoLabels = Y, t.disableDay = P, t.enableArea = I, t.enableDays = j, t.setSelectedDays = $, t.getCalendarConfig = G, t.setCalendarConfig = U, t.getCalendarDates = F, t.chooseDateArea = N, t.setDateStyle = R, t.switchView = X, t.default = t.calculateNextWeekDays = t.calculatePrevWeekDays = t.whenMulitSelect = t.whenChooseArea = t.whenSingleSelect = t.renderCalendar = t.whenChangeDate = void 0;
  var n = f(a(3)),
    s = f(a(5)),
    r = f(a(7)),
    o = f(a(0)),
    c = f(a(6)),
    l = f(a(4)),
    i = f(a(2)),
    d = a(1);

  function f(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  let b = {},
    h = new d.Logger,
    u = new d.GetDate,
    y = null;

  function m(e) {
    return e && (b = (0, d.getComponent)(e)), b
  }

  function D(e, t) {
    return m(t), (y = new o.default(b)).getData(e)
  }

  function p(e, t = (() => {})) {
    return new o.default(b).setData(e, t)
  }
  const g = {
      renderCalendar(e, t, a) {
        return (0, d.isComponent)(this) && (b = this), new Promise((n, s) => {
          (0, c.default)(b).renderCalendar(e, t, a).then((s = {}) => {
            if (!s.firstRender) return n({
              year: e,
              month: t,
              date: a
            });
            ! function (e) {
              e.calendar = {
                jump: A,
                switchView: X,
                disableDay: P,
                enableArea: I,
                enableDays: j,
                chooseDateArea: N,
                getCurrentYM: L,
                getSelectedDay: v,
                cancelSelectedDates: W,
                setDateStyle: R,
                setTodoLabels: x,
                getTodoLabels: Y,
                deleteTodoLabels: O,
                clearTodoLabels: E,
                setSelectedDays: $,
                getCalendarConfig: G,
                setCalendarConfig: U,
                getCalendarDates: F
              }
            }((0, d.getCurrentPage)()), b.triggerEvent("afterCalendarRender", b), b.firstRender = !0, d.initialTasks.flag = "finished", d.initialTasks.tasks.length && d.initialTasks.tasks.shift()(), n({
              year: e,
              month: t,
              date: a
            })
          }).catch(e => {
            s(e)
          })
        })
      },
      whenChangeDate({
        curYear: e,
        curMonth: t,
        newYear: a,
        newMonth: n
      }) {
        b.triggerEvent("whenChangeMonth", {
          current: {
            year: e,
            month: t
          },
          next: {
            year: a,
            month: n
          }
        })
      },
      whenMulitSelect(e) {
        (0, d.isComponent)(this) && (b = this);
        const {
          calendar: t = {}
        } = D(), {
          days: a,
          todoLabels: n
        } = t, s = (0, l.default)(b).getCalendarConfig();
        let {
          selectedDay: r = []
        } = t;
        const o = a[e];
        if (o) {
          if (o.choosed = !o.choosed, o.choosed) {
            o.cancel = !1;
            const {
              showLabelAlways: e
            } = D("calendar");
            e && o.showTodoLabel ? o.showTodoLabel = !0 : o.showTodoLabel = !1, s.takeoverTap || r.push(o)
          } else {
            o.cancel = !0;
            const e = u.toTimeStr(o);
            r = r.filter(t => e !== u.toTimeStr(t)), n && n.forEach(t => {
              e === u.toTimeStr(t) && (o.showTodoLabel = !0)
            })
          }
          if (s.takeoverTap) return b.triggerEvent("onTapDay", o);
          p({
            "calendar.days": a,
            "calendar.selectedDay": r
          }), g.afterTapDay(o, r)
        }
      },
      whenSingleSelect(e) {
        (0, d.isComponent)(this) && (b = this);
        const {
          calendar: t = {}
        } = D(), {
          days: a,
          selectedDay: n = [],
          todoLabels: s
        } = t;
        let o = [];
        const c = a[e];
        if (!c) return;
        const i = [...n].pop() || {},
          {
            month: f,
            year: h
          } = a[0] || {},
          u = (0, l.default)(b).getCalendarConfig();
        if (u.takeoverTap) return b.triggerEvent("onTapDay", c);
        if (g.afterTapDay(c), !u.inverse && i.day === c.day) return;
        a.forEach((e, t) => {
          +e.day == +i.day && (a[t].choosed = !1)
        }), s && (o = s.filter(e => +e.year === h && +e.month === f)), (0, r.default)(b).showTodoLabels(o, a, n);
        const y = {
          "calendar.days": a
        };
        i.day !== c.day ? (i.choosed = !1, c.choosed = !0, t.showLabelAlways && c.showTodoLabel || (c.showTodoLabel = !1), y["calendar.selectedDay"] = [c]) : u.inverse && (c.choosed = !c.choosed, c.choosed && (c.showTodoLabel && t.showLabelAlways ? c.showTodoLabel = !0 : c.showTodoLabel = !1), y["calendar.selectedDay"] = []), p(y)
      },
      gotoSetContinuousDates: (e, t) => N([`${u.toTimeStr(e)}`, `${u.toTimeStr(t)}`]),
      timeRangeHelper(e, t) {
        const a = (0, d.getDateTimeStamp)(e),
          n = t[0];
        let s, r, o = t.length;
        return o > 1 && (s = t[o - 1], r = (0, d.getDateTimeStamp)(s)), {
          endDate: s,
          startDate: n,
          currentDateTimestamp: a,
          endDateTimestamp: r,
          startTimestamp: (0, d.getDateTimeStamp)(n)
        }
      },
      calculateDateRange(e, t) {
        const {
          endDate: a,
          startDate: n,
          currentDateTimestamp: s,
          endDateTimestamp: r,
          startTimestamp: o
        } = this.timeRangeHelper(e, t);
        let c = [],
          l = t.length;
        const i = t.filter(t => u.toTimeStr(t) === u.toTimeStr(e));
        if (2 === l && i.length) return c = [e, e];
        if (s >= o && r && s <= r) {
          c = l / 2 > t.findIndex(t => u.toTimeStr(t) === u.toTimeStr(e)) ? [e, a] : [n, e]
        } else s < o ? c = [e, a] : s > o && (c = [n, e]);
        return c
      },
      chooseAreaWhenExistArea: (e, t) => new Promise((a, n) => {
        const s = g.calculateDateRange(e, u.sortDates(t));
        g.gotoSetContinuousDates(...s).then(t => {
          a(t), g.afterTapDay(e)
        }).catch(t => {
          n(t), g.afterTapDay(e)
        })
      }),
      chooseAreaWhenHasOneDate: (e, t, a) => new Promise((n, s) => {
        const r = a || t[0];
        let o = [r, e];
        const c = (0, d.getDateTimeStamp)(e);
        (0, d.getDateTimeStamp)(r) > c && (o = [e, r]), g.gotoSetContinuousDates(...o).then(t => {
          n(t), g.afterTapDay(e)
        }).catch(t => {
          s(t), g.afterTapDay(e)
        })
      }),
      whenChooseArea(e) {
        return new Promise((t, a) => {
          if ((0, d.isComponent)(this) && (b = this), b.weekMode) return;
          const {
            days: n = [],
            selectedDay: s,
            lastChoosedDate: r
          } = D("calendar"), c = n[e];
          if (!c.disable) {
            if ((0, l.default)(b).getCalendarConfig().takeoverTap) return b.triggerEvent("onTapDay", c);
            if (s && s.length > 1) g.chooseAreaWhenExistArea(c, s).then(e => {
              t(e)
            }).catch(e => {
              a(e)
            });
            else if (r || s && 1 === s.length) g.chooseAreaWhenHasOneDate(c, s, r).then(e => {
              t(e)
            }).catch(e => {
              a(e)
            });
            else {
              n.forEach(e => {
                +e.day == +c.day ? e.choosed = !0 : e.choosed = !1
              }), new o.default(b).setData({
                "calendar.days": [...n],
                "calendar.lastChoosedDate": c
              })
            }
          }
        })
      },
      afterTapDay(e, t) {
        const a = (0, l.default)(b).getCalendarConfig(),
          {
            multi: n
          } = a;
        n ? b.triggerEvent("afterTapDay", {
          currentSelected: e,
          selectedDates: t
        }) : b.triggerEvent("afterTapDay", e)
      },
      jumpToToday: () => new Promise((e, t) => {
        const {
          year: a,
          month: n,
          date: s
        } = u.todayDate(), r = u.todayTimestamp(), o = (0, l.default)(b).getCalendarConfig();
        p({
          "calendar.curYear": a,
          "calendar.curMonth": n,
          "calendar.selectedDay": [{
            year: a,
            day: s,
            month: n,
            choosed: !0,
            lunar: o.showLunar ? i.default.solar2lunar(a, n, s) : null
          }],
          "calendar.todayTimestamp": r
        }), g.renderCalendar(a, n, s).then(() => {
          e({
            year: a,
            month: n,
            date: s
          })
        }).catch(() => {
          t("jump failed")
        })
      })
    },
    T = g.whenChangeDate;
  t.whenChangeDate = T;
  const w = g.renderCalendar;
  t.renderCalendar = w;
  const C = g.whenSingleSelect;
  t.whenSingleSelect = C;
  const M = g.whenChooseArea;
  t.whenChooseArea = M;
  const _ = g.whenMulitSelect;
  t.whenMulitSelect = _;
  const S = g.calculatePrevWeekDays;
  t.calculatePrevWeekDays = S;
  const k = g.calculateNextWeekDays;

  function L(e) {
    return m(e), {
      year: D("calendar.curYear"),
      month: D("calendar.curMonth")
    }
  }

  function v(e = {}, t) {
    m(t);
    const a = G(),
      n = D("calendar.selectedDay") || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function W(e, t) {
    m(t);
    const {
      days: a = [],
      selectedDay: n = []
    } = D("calendar") || {};
    if (e && e.length) {
      const t = e.map(e => `${+e.year}-${+e.month}-${+e.day}`),
        s = n.filter(e => !t.includes(`${+e.year}-${+e.month}-${+e.day}`));
      a.forEach(e => {
        t.includes(`${+e.year}-${+e.month}-${+e.day}`) && (e.choosed = !1)
      }), p({
        "calendar.days": a,
        "calendar.selectedDay": s
      })
    } else a.forEach(e => {
      e.choosed = !1
    }), p({
      "calendar.days": a,
      "calendar.selectedDay": []
    })
  }

  function A(e, t, a, n) {
    return new Promise((r, o) => {
      m(n);
      const {
        selectedDay: c = [],
        weekMode: l
      } = D("calendar") || {}, {
        year: i,
        month: d,
        day: f
      } = c[0] || {}; + i == +e && +d == +t && +f == +a || (l ? function ({
        year: e,
        month: t,
        day: a
      }) {
        return new Promise((n, r) => {
          (0, s.default)(b).jump({
            year: +e,
            month: +t,
            day: +a
          }).then(e => {
            n(e)
          }).catch(e => {
            r(e)
          })
        })
      }({
        year: e,
        month: t,
        day: a
      }).then(e => {
        r(e)
      }).catch(e => {
        o(e)
      }) : e && t ? function ({
        year: e,
        month: t,
        day: a
      }) {
        return new Promise((n, s) => {
          if ("number" != typeof + e || "number" != typeof + t) return h.warn("jump 函数年月日参数必须为数字");
          const r = u.todayTimestamp();
          p({
            "calendar.curYear": +e,
            "calendar.curMonth": +t,
            "calendar.todayTimestamp": r
          }, () => {
            g.renderCalendar(+e, +t, +a).then(e => {
              n(e)
            }).catch(e => {
              s(e)
            })
          })
        })
      }({
        year: e,
        month: t,
        day: a
      }).then(e => {
        r(e)
      }).catch(e => {
        o(e)
      }) : g.jumpToToday().then(e => {
        r(e)
      }).catch(e => {
        o(e)
      }))
    })
  }

  function x(e, t) {
    m(t), (0, r.default)(b).setTodoLabels(e)
  }

  function O(e, t) {
    m(t), (0, r.default)(b).deleteTodoLabels(e)
  }

  function E(e) {
    m(e), (0, r.default)(b).clearTodoLabels()
  }

  function Y(e = {}, t) {
    m(t);
    const a = G(),
      n = (0, r.default)(b).getTodoLabels() || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function P(e = [], t) {
    m(t), (0, n.default)(b).disableDays(e)
  }

  function I(e = [], t) {
    m(t), (0, n.default)(b).enableArea(e)
  }

  function j(e = [], t) {
    m(t), (0, n.default)(b).enableDays(e)
  }

  function $(e, t) {
    m(t), (0, n.default)(b).setSelectedDays(e)
  }

  function G(e) {
    return m(e), (0, l.default)(b).getCalendarConfig()
  }

  function U(e, t) {
    if (m(t), !e || 0 === Object.keys(e).length) return h.warn("setCalendarConfig 参数必须为非空对象");
    const a = G();
    return new Promise((t, n) => {
      (0, l.default)(b).setCalendarConfig(e).then(n => {
        t(n);
        const {
          date: s,
          type: r
        } = a.disableMode || {}, {
          _date: o,
          _type: c
        } = e.disableMode || {};
        if (r !== c || s !== o) {
          const {
            year: e,
            month: t
          } = L();
          A(e, t)
        }
      }).catch(e => {
        n(e)
      })
    })
  }

  function F(e = {}, t) {
    m(t);
    const a = G(),
      n = D("calendar.days", t) || [];
    if (e.lunar && !a.showLunar) {
      return u.convertLunar(n)
    }
    return n
  }

  function N(e, t) {
    return m(t), (0, n.default)(b).chooseArea(e)
  }

  function R(e, t) {
    e && (m(t), (0, n.default)(b).setDateStyle(e))
  }

  function X(...e) {
    return new Promise((t, a) => {
      const n = e[0];
      if (!e[1]) return (0, s.default)(b).switchWeek(n).then(t).catch(a);
      "string" == typeof e[1] ? (m(e[1]), (0, s.default)(b).switchWeek(n, e[2]).then(t).catch(a)) : "object" == typeof e[1] && ("string" == typeof e[2] && m(e[1]), (0, s.default)(b).switchWeek(n, e[1]).then(t).catch(a))
    })
  }

  function Z(e, t) {
    d.initialTasks.flag = "process", (b = e).config = t,
      function (e) {
        let t = ["日", "一", "二", "三", "四", "五", "六"];
        "Mon" === e && (t = ["一", "二", "三", "四", "五", "六", "日"]), p({
          "calendar.weeksCh": t
        })
      }(t.firstDayOfWeek),
      function (e) {
        if (e && "string" == typeof e) {
          const t = e.split("-");
          if (t.length < 3) return h.warn("配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02");
          A(+t[0], +t[1], +t[2])
        } else e || (b.config.noDefault = !0), A()
      }(t.defaultDay), h.tips("使用中若遇问题请反馈至 https://github.com/treadpit/wx_calendar/issues ✍️")
  }
  t.calculateNextWeekDays = k;
  t.default = (e, t = {}) => {
    if ("process" === d.initialTasks.flag) return d.initialTasks.tasks.push(function () {
      Z(e, t)
    });
    Z(e, t)
  }
}]);