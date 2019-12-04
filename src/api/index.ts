/**
 * 活动ID：config.data.actId[typeId]
   礼包ID：config.data.rewardId[typeId][0]
*/
// export * from "./reqs/login";
// export * from "./reqs/historyAndJoinAndInfo"

import { get } from "./base/axios";
import md5 from "md5";
import * as Routes from "./base/Routes";

const BASE_URL = VUE_APP_BASE_URL;
const groupId = GROUP_ID;

// sdk登录
export const loginWithAccount = (username, password) => {
  let params = {
    userName: username,
    password: md5(password),
    version: VERSION
  }
  return get(BASE_URL + Routes.login, params)
}

// FB登录
export const loginWithFB = (token) => {
  let params = {
    clientId: APPID,
    access_token: token
  }
  return get(BASE_URL + Routes.fb_login, params)
}

// kakao登录
export const loginWithKakao = (token) => {
  let params = {
    clientId: APPID,
    access_token: token,
  }
  return get(BASE_URL + Routes.kk_login, params)
}

//初始化区服列表
export const initZones = (msg) => {
  let params = {
    appId: APPID,
    token: msg.token
  }
  return get(BASE_URL + Routes.zone, params)
}

// 获取角色
export const findRole = (msg) => {
  let zoneId = msg;
  let params = {
    appId: APPID,
    gameZoneId: zoneId,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.role, params)
}

// 获取所有活动历史记录
export const getAllHistory = () => {
  let params = {
    groupId: groupId,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.CdKeys_all, params);
}

// 获取单个活动历史记录
export const getHistory = (typeId: string) => {

  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][0],
  }
  return get(BASE_URL + Routes.cdKeys, params)
}

// 获取活动信息
export const infoActivity = (typeId: string, giftIndex: number, isShowLoading = true) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][giftIndex],
  }
  return get(BASE_URL + Routes.info, params, isShowLoading)
}

// 参加活动join
export const joinActivity = (typeId: string, index: number) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][index]
  }
  return get(BASE_URL + Routes.join, params)
}

// 许愿
export const wishActivity = (wish_word, goodsId) => {
  let params = {
    groupId: groupId,
    token: localStorage.token,
    goodsId: goodsId,
    userInfo: JSON.stringify({
      "wish": wish_word
    })
  }
  return get(BASE_URL + Routes.makeWish, params)
}
//所有许愿记录
export const wishHistory = (length) => {

  let params = {
    actId: window._RG.config.data.actId.wish,
    groupId: groupId,
    limit: length,
    token: localStorage.token,
  }
  return get(BASE_URL + Routes.desireList, params)
}

// 点击翻转卡牌
//一键翻开index：-1；正常翻开index：0
export const joinFilp = (typeId, index) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId].id,
    token: localStorage.token,
    index: index
  }
  return get(BASE_URL + Routes.flip, params)
}
// 卡牌活动信息
export const infoFlip = (typeId) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId].id,
    token: localStorage.token,
  }
  return get(BASE_URL + Routes.fflInfo, params)
}
// 获取预约人数
export const reserveInfo = () => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.reserve,
  }
  return get(BASE_URL + Routes.info, params)
}
// 参与预约
export const reserveJoin = (userPhone) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.reserve,
    phone: userPhone,
  }
  return get(BASE_URL + Routes.reserveJoin, params)
}

// 預約轉盤
export const roteJoin = (fb) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token,
    fbshare: fb
  }
  return get(BASE_URL + Routes.roteJoin, params)
}

export const roteInfo = () => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.roteInfo, params)
}

//获取礼包记录
export const roteCdkeys = () => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.roteCdkeys, params)
}
// 20190706
// 更新礼包
export const updateReward = (msg) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.login,
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId.login[0],
    advChannel: "27",
    isUpdate: msg
  }
  return get(BASE_URL + Routes.updateReward, params)
}
// 参加活动join
export const getRecharge = (typeId, index) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][index],
    viplevel: index
  }
  return get(BASE_URL + Routes.roteRecharge, params)
}

// 宝箱的三个接口
export const joinBoxFb = (fbShare: boolean) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare
  }
  return get(BASE_URL + Routes.cardBoxFB, params)
}
export const getCardCount = (wishId: string = "") => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare: "false",
    // wishId
  }
  return get(BASE_URL + Routes.carCount, params)
}
export const joinCardReward = (index: number) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId.box[0],
    index: index
  }
  return get(BASE_URL + Routes.cardReward, params)
}
// 飞行棋
// 0-查询刷新次数/1-投骰子领奖/ 2-砸彩蛋
export const joinFlightChess = (type: 0 | 1 | 2) => {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.flightChess,
    token: localStorage.token,
    type
  };
  return get(BASE_URL + Routes.flightChess, params);
}
/* 爆炸性的充值, 每日清算  例子
第一天充值超过 300钻 第一天可领取,知道活动结束都可以领取
第二天充值超过 300钻 第一天可领取,知道活动结束都可以领取

如果第一天充值超过 600 钻还是只能领第一天的, 第二天重新计算

*/

export function joinWeekPay(rewardIndex: number) {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.weekpay,
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId.weekpay[rewardIndex],
    index: rewardIndex
  };
  return get(BASE_URL + Routes.weekpay, params);
}

export function weekPayInfo() {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId.weekpay,
    token: localStorage.token,
  };
  return get(BASE_URL + Routes.info_weekPay, params);
}

// vip 领取奖励的接口
export function vipReturn(typeId: string, rewardIndex: number) {
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][rewardIndex],
    viplevel: '0'
  };
  return get(BASE_URL + Routes.vipReturn, params);
}
//奖池大奖信息的获取
export function poollist(typeId: string, rewardIndexArr: number[]) {
  const rotateIds = window._RG.config.data.rewardId[typeId];
  const rewardIdsArr = rewardIndexArr.map((ele) => {
    return rotateIds[ele];
  });
  let params = {
    groupId: groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardIds: rewardIdsArr.join(','),
    viplevel: '0'
  };
  return get(BASE_URL + Routes.poollist, params, false);
}

export function numLottery(type: 0 | 1) {
  const { actId, rewardId } = window._RG.config.data;
  let params = {
    groupId: groupId,
    actId: actId.numLottery1,
    token: localStorage.token,
    rewardId: rewardId.numLottery1[0],
    lotteryId: actId.numLottery2,
    type
  };
  return get(BASE_URL + Routes.numLottery, params);
}