export function getClass(a: any) {
  const result = /^\[object (.*)\]$/.exec(Object.prototype.toString.call(a))
  return result && result[1];
}

class Account {

  private _user: any;
  private _users: any = {};

  get user() {
    return this._user;
  }
  get users() {
    return this._users;
  }
  set user(user) {
    this._user = user;
    // 第三方的登录的都不保存在users中 accountType 2 fb ,11 kakao
    if (user && [2, 11].indexOf(user.accountType) === -1) {
      // 设置 users 时会进行一次保存,减少一次 IO 操作
      this._users[user.userId] = user;
    } else {
      this.saveUserInfo();
    }

  }
  set users(users) {
    if (getClass(users) === 'Object') {
      this._users = users;
      this.saveUserInfo();
    }
  }
  constructor() {
    this.getUserInfo();
  }
  init({ user, users }: { user, users }) {
    this._user = user;
    this._users = users;
  }
  private getUserInfo() {
    try {
      const user = JSON.parse(localStorage.getItem('rg_user') || "");
      const users = JSON.parse(localStorage.getItem('rg_users') || "");
      this.init({ user: user, users: users || {} });
    } catch (e) {
    }
  }
  private saveUserInfo() {
    try {
      localStorage.setItem('rg_user', JSON.stringify(this._user))
      localStorage.setItem('rg_users', JSON.stringify(this._users))
    } catch (e) {
    }
  }
}
// 直接导出也可
export const account = new Account();