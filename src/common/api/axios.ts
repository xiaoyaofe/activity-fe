import axios from 'axios'
import Vue from 'vue'
declare var CONFIG: {
  tip: any
};
declare var window: any;

// let axiosInstance = {}

let axiosInstance = axios.create({
  timeout: 20000,
  maxContentLength: 2000,
  headers: {}
})

function requestSuccessFunc(requestObj) {
  //自定义请求拦截逻辑，处理权限，请求发送监控
  return requestObj
}

function requestFailFunc(renderError) {
  //自定义请求发送失败逻辑
  return Promise.reject(renderError)
}

function responseSuccessFunc(responseObj) {
  //自定义响应成功逻辑，全局拦截接口，根据不同业务做处理，响应成功监控等
  let resData = responseObj.data

  let { code } = resData
  switch (code) {
    case 102:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_102);
      return
    //业务成功
    case 200:
      return resData.state;
    case 300:
      localStorage.clear();
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_300);
      setTimeout(() => {
        location.reload();
      }, 3000)
      return
    case 400:
      // localStorage.clear();
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_300);
      // setTimeout(() => {
      //   location.reload();
      // }, 5000)
      return
    case 401:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_401);
      return
    case 402:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_402);
      return
    case 444:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_444);
      return
    case 405:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_405);
      return
    case 1000:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1000);
      return
    case 1001:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1001);
      return
    case 1002:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1002);
      return
    case 1005:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1005);
      return
    case 1006:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1006);
      return
    case 1101:
      Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_1101);
      return
    default:
      return Promise.reject(resData)
  }
}


function responseFailFunc(responseError) {
  //响应失败
  return Promise.reject(responseError)
}

//注入请求依赖
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
//注入响应拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export const get = function (url: string, params: any) {
  Vue.prototype.$dialog.show('loading');
  return axiosInstance.get(url, {
    params: params
  })
    .then(function (response) {
      if (response) {
        Vue.prototype.$dialog.hide();
      } else {
        Vue.prototype.$dialog.hide('tip');
      }
      return response
    })
    .catch(function (error) {
      Vue.prototype.$dialog.hide();
      // Vue.prototype.$dialog.show("tip", window._RG.config.tip.code_400);
      console.log(error)
    })
}
