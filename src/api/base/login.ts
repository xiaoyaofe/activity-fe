import md5 from 'md5';
import { Http } from "./http";
import { login, fb_login, kk_login, zone, role } from "../Routes";

// sdk登录
export const loginWithAccount = (username, password) => {
  let params = {
    userName: username,
    password: md5(password),
    version: VERSION
  }
  return Http.instance.get(login, params)
}

// FB登录
export const loginWithFB = (token) => {
  let params = {
    clientId: APPID,
    access_token: token
  }
  return Http.instance.get(fb_login, params)
}

// kakao登录
export const loginWithKakao = (token) => {
  let params = {
    clientId: APPID,
    access_token: token,
  }
  return Http.instance.get(kk_login, params)
}

//初始化区服列表
export const initZones = (msg) => {
  let params = {
    appId: APPID,
    token: msg.token
  }
  return Http.instance.get(zone, params)
}

// 获取角色
export const findRole = (msg) => {
  let zoneId = msg;
  let params = {
    appId: APPID,
    gameZoneId: zoneId,
    token: localStorage.token
  }
  return Http.instance.get(role, params)
}