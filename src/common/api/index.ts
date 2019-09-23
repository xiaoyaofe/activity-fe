/**
 * 活动ID：config.data.actId[typeId]
   礼包ID：config.data.rewardId[typeId][0]*/
// import md5 from 'js-md5'
import md5 from 'md5';
import { get } from "./axios";
const BASE_URL = VUE_APP_BASE_URL;
const api = {
  login: "/user/sdk/login", //sdk登录接口
  fb_login: "/user/fb/login", //fb登录接口
  kk_login: "/user/kk/login", //kk登录接口
  zone: "/user/sdk/zones", //区服接口
  role: "/user/player/list", //角色接口
  join: "/activity/join", //参与活动接口
  info: "/activity/info", //活动信息接口
  cdKeys: "/activity/cdKeys", //礼包数据接口
  CdKeys_all: "/activity/cdKeysList", //获取所有礼包
  join_allPay: "/activity/weekPay", //累计充值接口
  info_allPay: "/activity/weekPayInfo", //累计充值数据
  gifsList: "/activity/lottery/list", //许愿中奖列表
  desireList: "/activity/recently/cdkeys", //许愿愿望列表
  getCount: "/activity/getTotal", //许愿次数
  makeWish: "/activity/submit/info", //许愿接口
  flip: "/activity/fflReward", //翻卡牌接口
  fflInfo: "/activity/fflUserInfo", //翻卡牌信息接口
  reserveJoin: "/activity/advance/join", //预约接口
  roteJoin: "/activity/facebook/join", //抽獎接口
  roteInfo: "/activity/facebook/info",
  roteCdkeys: "/activity/facebook/cdKeys",
  updateReward: "/activity/updateReward", //更新包礼包
  // 20190706
  roteRecharge: "/activity/vipReturn",
  carCount: '/activity/cardCount', //获取宝箱数量
  cardReward: "/activity/cardReward", //参与宝箱活动
  cardBoxFB: "/activity/cardBoxFB", //分享调用
  // 飞行棋,港台vs使用
  flightChess:"/activity/flightChess"
}
// sdk登录
export const loginWithAccount = (username, password) => {
  let params = {
    userName: username,
    password: md5(password),
    version: window._RG.config.data.version
  }
  return get(BASE_URL + api.login, params)
}

// FB登录
export const loginWithFB = (token) => {
  let params = {
    clientId: window._RG.config.data.appId,
    access_token: token
  }
  return get(BASE_URL + api.fb_login, params)
}

// kakao登录
export const loginWithKakao = (token) => {
  let params = {
    clientId: window._RG.config.data.appId,
    access_token: token,
  }
  return get(BASE_URL + api.kk_login, params)
}

//初始化区服列表
export const initZones = (msg) => {
  let params = {
    appId: window._RG.config.data.appId,
    token: msg.token
  }
  return get(BASE_URL + api.zone, params)
}

// 获取角色
export const findRole = (msg) => {
  let zoneId = msg;
  let params = {
    appId: window._RG.config.data.appId,
    gameZoneId: zoneId,
    token: localStorage.token
  }
  return get(BASE_URL + api.role, params)
}

// 获取所有活动历史记录
export const getAllHistory = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    token: localStorage.token
  }
  return get(BASE_URL + api.CdKeys_all, params)
}

// 获取单个活动历史记录
export const getHistory = (typeId) => {

  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][0],
  }
  return get(BASE_URL + api.cdKeys, params)
}

// 获取活动信息
export const infoActivity = (typeId) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][0],
  }
  return get(BASE_URL + api.info, params)
}

// 参加活动join
export const joinActivity = (typeId, index) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][index]
  }
  return get(BASE_URL + api.join, params)
}

// 许愿
export const wishActivity = (wish_word, goodsId) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    token: localStorage.token,
    goodsId: goodsId,
    userInfo: JSON.stringify({
      "wish": wish_word
    })
  }
  return get(BASE_URL + api.makeWish, params)
}
//所有许愿记录
export const wishHistory = (length) => {

  let params = {
    actId: window._RG.config.data.actId.wish,
    groupId: window._RG.config.data.groupId,
    limit: length,
    token: localStorage.token,
  }
  return get(BASE_URL + api.desireList, params)
}
// 点击翻转卡牌
//一键翻开index：-1；正常翻开index：0
export const joinFilp = (typeId, index) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId].id,
    token: localStorage.token,
    index: index
  }
  return get(BASE_URL + api.flip, params)
}
// 卡牌活动信息
export const infoFlip = (typeId) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId].id,
    token: localStorage.token,
  }
  return get(BASE_URL + api.fflInfo, params)
}
// 获取预约人数
export const reserveInfo = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.reserve,
  }
  return get(BASE_URL + api.info, params)
}
// 参与预约
export const reserveJoin = (userPhone) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.reserve,
    phone: userPhone,
  }
  return get(BASE_URL + api.reserveJoin, params)
}
// 預約轉盤
export const roteJoin = (fb) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token,
    fbshare: fb
  }
  return get(BASE_URL + api.roteJoin, params)
}
export const roteInfo = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + api.roteInfo, params)
}

//获取礼包记录
export const roteCdkeys = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + api.roteCdkeys, params)
}
// 20190706
// 更新礼包
export const updateReward = (msg) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.login,
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId.login[0],
    advChannel: "27",
    isUpdate: msg
  }
  return get(BASE_URL + api.updateReward, params)
}
// 参加活动join
export const getRecharge = (typeId, index) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][index],
    viplevel: index
  }
  return get(BASE_URL + api.roteRecharge, params)
}

// 宝箱的三个接口

export const joinBoxFb = (fbShare: boolean) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare
  }
  return get(BASE_URL + api.cardBoxFB, params)
}
export const getCardCount = (wishId: string = "") => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare: "false",
    // wishId
  }
  return get(BASE_URL + api.carCount, params)
}
export const joinCardReward = (index: number) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId.box[0],
    index: index
  }
  return get(BASE_URL + api.cardReward, params)
}
// 飞行棋
// 0-查询刷新次数/1-投骰子领奖/ 2-砸彩蛋
export const joinFlightChess = (type: 0|1|2) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.flightChess,
    token: localStorage.token,
    type
  };
  return get(BASE_URL + api.flightChess, params);
}
