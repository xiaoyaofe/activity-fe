import { account as accountManager } from "./account";

export function login() {
  accountManager.user = { username: "test", password: 123456, accountType: 0, userId: 1 }
}
