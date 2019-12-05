/* 暂时没有使用 */
import Vue from 'vue'

export class Http {
  static _ins: Http
  static get instance(): Http {
    return this._ins || new Http;
  }
  private serverAddress: string = VUE_APP_BASE_URL;

  constructor() {
    Http._ins = this;
  }

  private request(param: any): Promise<any> {

    let data: any
    if (param.data) {

      data = Object.keys(param.data).map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(param.data[key])}`;
      }).join('&')
    }
    var xhr = new XMLHttpRequest();
    xhr.open(param.method, this.serverAddress + param.route);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var result = new Promise<any>((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let data: any;
            try {
              data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch (e) {
              reject("responese parse error")
            }
          } else {
            reject("server res err");
          }
        }
      }
    })
    xhr.send(data);

    return result;
  }

  public post(route: string, data: any) {
    return this.request({ method: 'POST', route, data })
      .then((res: any) => {
        responseSuccessFunc(res);
        return res;
      }).catch(e => {
        Vue.prototype.$dialog.hide();
        console.log(e);
      });
  }

  public get(route: string, data: any) {
    return this.request({ method: 'GET', route, data })
      .then((res: any) => {
        responseSuccessFunc(res);
        return res;
      }).catch(e => {
        Vue.prototype.$dialog.hide();
        console.log(e);
      });
  }
}
function responseSuccessFunc(responseObj: any) {
  //自定义响应成功逻辑，全局拦截接口，根据不同业务做处理，响应成功监控等
  let resData = responseObj
  const tip = window._RG.config.tip;
  let { code } = resData
  switch (code) {
    case 102:
      Vue.prototype.$dialog.show("tip", tip.code_102);
      return
    //业务成功
    case 200:
      return resData.state;
    case 300:
      localStorage.clear();
      Vue.prototype.$dialog.show("tip", tip.code_300);
      setTimeout(() => {
        location.reload();
      }, 3000)
      return
    // case 400:
    // 宝箱,翻卡,飞行棋这些接口只有200,401,402,1000,1101,400这些code,没有300这个错误
    // return
    case 401:
      Vue.prototype.$dialog.show("tip", tip.code_401);
      return
    case 402:
      Vue.prototype.$dialog.show("tip", tip.code_402);
      return
    // case 444:
    //   Vue.prototype.$dialog.show("tip", tip.code_444);
    //   return
    case 405:
      Vue.prototype.$dialog.show("tip", tip.code_405);
      return
    case 1000:
      Vue.prototype.$dialog.show("tip", tip.code_1000);
      return
    case 1001:
      Vue.prototype.$dialog.show("tip", tip.code_1001);
      return
    case 1002:
      Vue.prototype.$dialog.show("tip", tip.code_1002);
      return
    case 1005:
      Vue.prototype.$dialog.show("tip", tip.code_1005);
      return
    case 1006:
      Vue.prototype.$dialog.show("tip", tip.code_1006);
      return
    case 1101:
      Vue.prototype.$dialog.show("tip", tip.code_1101);
      return
    default:
      Vue.prototype.$dialog.hide();
      console.log(resData);
  }
}