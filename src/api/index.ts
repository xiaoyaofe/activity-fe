/**
 * 活动ID：config.data.actId[typeId]
   礼包ID：config.data.rewardId[typeId][0]
*/
export * from "./base/login";
export * from "./base/historyAndJoinAndInfo"

import { get } from "./axios";
import * as Routes from "./Routes";

const BASE_URL = VUE_APP_BASE_URL;



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
  return get(BASE_URL + Routes.makeWish, params)
}
//所有许愿记录
export const wishHistory = (length) => {

  let params = {
    actId: window._RG.config.data.actId.wish,
    groupId: window._RG.config.data.groupId,
    limit: length,
    token: localStorage.token,
  }
  return get(BASE_URL + Routes.desireList, params)
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
  return get(BASE_URL + Routes.flip, params)
}
// 卡牌活动信息
export const infoFlip = (typeId) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId].id,
    token: localStorage.token,
  }
  return get(BASE_URL + Routes.fflInfo, params)
}
// 获取预约人数
export const reserveInfo = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.reserve,
  }
  return get(BASE_URL + Routes.info, params)
}
// 参与预约
export const reserveJoin = (userPhone) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.reserve,
    phone: userPhone,
  }
  return get(BASE_URL + Routes.reserveJoin, params)
}

// 預約轉盤
export const roteJoin = (fb) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token,
    fbshare: fb
  }
  return get(BASE_URL + Routes.roteJoin, params)
}

export const roteInfo = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.roteInfo, params)
}

//获取礼包记录
export const roteCdkeys = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.rotate,
    token: localStorage.token
  }
  return get(BASE_URL + Routes.roteCdkeys, params)
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
  return get(BASE_URL + Routes.updateReward, params)
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
  return get(BASE_URL + Routes.roteRecharge, params)
}

// 宝箱的三个接口
export const joinBoxFb = (fbShare: boolean) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare
  }
  return get(BASE_URL + Routes.cardBoxFB, params)
}
export const getCardCount = (wishId: string = "") => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.box,
    token: localStorage.token,
    fbShare: "false",
    // wishId
  }
  return get(BASE_URL + Routes.carCount, params)
}
export const joinCardReward = (index: number) => {
  let params = {
    groupId: window._RG.config.data.groupId,
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
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId.flightChess,
    token: localStorage.token,
    type
  };
  return get(BASE_URL + Routes.flightChess, params);
}
