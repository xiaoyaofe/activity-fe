export default class Http {
  static _ins: Http
  static get instance(): Http {
    return this._ins || new Http;
  }
  private serverAddress: string = VUE_APP_BASE_URL;

  constructor() {
    Http._ins = this;
  }

  private request<T>(param: any): Promise<T> {

    let data: any
    if (param.data) {

      data = Object.keys(param.data).map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(param.data[key])}`;
      }).join('&')
    }
    var xhr = new XMLHttpRequest();
    xhr.open(param.method, this.serverAddress + param.route);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var result = new Promise<T>((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject("server res err");
          }
        }
      }
    })
    xhr.send(data);

    return result;
  }

  public post<T>(param: any) {
    return this.request<T>(
      Object.assign({ method: 'POST' }, param)
    )
  }

  public get<T>(param: any) {
    return this.request(
      Object.assign({ method: 'GET' }, param)
    )
  }

}
