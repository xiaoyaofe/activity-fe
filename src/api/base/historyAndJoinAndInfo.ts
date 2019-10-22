import { Http } from "./http";
import { join, info, cdKeys, CdKeys_all } from "../Routes";

// 获取所有活动历史记录
export const getAllHistory = () => {
  let params = {
    groupId: window._RG.config.data.groupId,
    token: localStorage.token
  }
  return Http.instance.get(CdKeys_all, params)
}

// 获取单个活动历史记录
export const getHistory = (typeId: string) => {

  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][0],
  }
  return Http.instance.get(cdKeys, params)
}

// 获取活动信息
export const infoActivity = (typeId: string) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][0],
  }
  return Http.instance.get(info, params)
}

// 参加活动join
export const joinActivity = (typeId: string, index: number) => {
  let params = {
    groupId: window._RG.config.data.groupId,
    actId: window._RG.config.data.actId[typeId],
    token: localStorage.token,
    rewardId: window._RG.config.data.rewardId[typeId][index]
  }
  return Http.instance.get(join, params)
}