import { setHtmlFontSize, isPc } from "@/utils/fns"

//判断玩家是否登录
export const isLogin = function () {

    if (localStorage.userId && localStorage.token && localStorage.playerId) {
        // var active = new Date().getTime();
        // active -= 1800000;
        // if (active < parseInt(localStorage.activetime) && localStorage.playerName) {
        return true;
        // } else {
        //     // location.reload();
        //     localStorage.clear();
        // }
    } else {
        return false;
    }
}
// 区服下拉框动画
export const zoneAnimate = (className, length) => {
    var oBox: any = document.getElementsByClassName(className)[0];
    var flag = parseInt(oBox.style.height) ? parseInt(oBox.style.height) : 0;
    // console.log(length)
    if (!length) {
        oBox.style.height = 0 + "px";
        return
    }
    let time = setInterval(() => {
        if (flag == length) {
            oBox.style.height = 0 + "px";
            clearInterval(time);
        } else {
            flag += 10;
            if (flag == length) {
                clearInterval(time);
            }
            oBox.style.height = flag + "px";
        }
    }, 20);
}


export function setRem(pc: number, mb: number) {
    if (isShowPc()) {
        setHtmlFontSize(pc);
    } else {
        setHtmlFontSize(mb);
    }
}

export function isShowPc() {
    let result: boolean;
    // 判断支持touchend事件与否,支持移动端,不支持pc端
    const isSupportTouch = "ontouchend" in document ? true : false;
    // 当屏幕宽度小于等于750时,直接默认是移动端
    const isMin750 = document.body.clientWidth <= 750 ? true : false;
    const isPcWeb = isPc();
    if (isMin750 || !isPcWeb || isSupportTouch) {
        result = false;
    } else {
        result = true;
    }
    return result;
}