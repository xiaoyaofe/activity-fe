<template>
	<transition name="fade">
		<div class="maxBox">
			<div class="centerBox">
				<button @click="close" class="close"></button>
				<!-- 登录 -->
				<div class="accountBox" v-show="isType">
					<input
						type="text"
						class="username"
						autofocus
						key="userAccount"
						v-model="userName"
						@keydown.enter="down(1)"
						:placeholder="CONFIG.tip.userName"
					>
					<input
						type="password"
						class="userpass"
						key="userPassword"
						v-model="userPassword"
						@keydown.enter="sdkLogin($event)"
						:placeholder="CONFIG.tip.userPass"
					>
					<button class="login_btn1" @click="sdkLogin"></button>

					<button class="fb_btn" @click="facebook"></button>
					<!-- <button class="kakaoBtn" @click="KakaoBtn"></button> -->
				</div>
				<!-- 区服 -->
				<div class="serverBox" v-if="!isType" style="position: relative;">
					<p class="title">{{CONFIG.tip.zone_null}}</p>
					<input
						type="number"
						v-number-only
						class="userzone"
						key="userServer"
						v-model="userZone"
						:placeholder="CONFIG.tip.serve"
						@click="dropSelectInput()"
						v-focus="focusStatus"
						@keydown.enter="serverBtn($event)"
					>
					<section class="selectZone">
						<p
							v-for="(item,index) in this.zones"
							:key="index"
							@click="selectZone($event,index)"
							class="zoneli"
						>{{item[zoneName]}}</p>
					</section>
					<button class="server_btn" @click="serverBtn"></button>
				</div>
				<p v-if="isTip" :class="isType ? 'loginTip' : 'zoneTip'">{{userTip}}</p>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
	declare var CONFIG: Object;
	declare var FB: any;
	declare var Kakao: any;
	import Vue from "vue";
	import { isLogin } from "../../common/common";
	import {
		loginWithAccount,
		loginWithKakao,
		loginWithFB,
		initZones,
		findRole
	} from "../../common/api";
	import { zoneAnimate } from "../../common/common";
	export default Vue.extend({
		data() {
			return {
				CONFIG: window._RG.config,
				userName: "",
				userPassword: "",
				userZone: "",
				zones: [],
				userTip: "",
				myTimer: "",
				focusStatus: true,
				isType: true, //判断登录/区服窗显示
				isTip: false, //判断是否登录提示
				zoneName: "localName"
			};
		},
		directives: {
			focus: {
				inserted: function(el, { value }) {
					if (value) {
						el.focus();
					}
				}
			},
			numberOnly: {
				bind: function(el: any) {
					el.handler = function() {
						el.value = el.value.replace(/\D+/, "");
					};
					el.addEventListener("input", el.handler);
				},
				unbind: function(el: any) {
					el.removeEventListener("input", el.handler);
				}
			}
		},
		watch: {
			userZone(newValue, oldValue) {
				if (newValue > this.zones.length) {
					this.userZone = "";
				} else {
					this.userZone = this.userZone.replace(/[^0-9]/gi, "");
				}
			}
		},
		methods: {
			// kakao登录
			async KakaoBtn() {
				// 로그인 창을 띄웁니다.
				let that = this;
				Kakao.Auth.login({
					success: function(authObj) {
						that.kakaoLogin(authObj.access_token);
					},
					fail: function(err) {
						console.log(JSON.stringify(err));
					}
				});
			},
			async kakaoLogin(token) {
				let data = await loginWithKakao(token);
				data && (await this.handleLogin(data)) && (this.isType = false);
			},
			// sdk登录
			async sdkLogin() {
				if (this.userName && this.userPassword) {
					let loginData = await loginWithAccount(
						this.userName,
						this.userPassword
					);
					loginData &&
						(await this.handleLogin(loginData)) &&
						(this.isType = false);
				} else {
					Vue.prototype.$dialog.show("tip", CONFIG["tip"].login_info_null);
				}
			},
			/******************************************************************************/
			// fbcebook登录
			async facebook() {
				let that = this;
				FB.getLoginStatus(function(response) {
					// console.log('>>>>>>>>>>>>>>111', response)
					if (response.status === "connected") {
						that.FBSdkLogin(response.authResponse.accessToken);
					} else {
						FB.login(function(response) {
							if (response.status === "connected") {
								// Logged into your app and Facebook.
								that.FBSdkLogin(response.authResponse.accessToken);
							} else {
								// The person is not logged into this app or we are unable to tell.
							}
						});
					}
				});
			},
			async FBSdkLogin(token) {
				let data = await loginWithFB(token);
				data && (await this.handleLogin(data)) && (this.isType = false);
			},
			/******************************************************************************/
			//登录成功的回调
			async handleLogin(msg) {
				this.myTimer = new Date().getTime().toString();
				localStorage.setItem("activetime", this.myTimer);
				localStorage.setItem("userId", msg.userId);
				localStorage.setItem("token", msg.token);
				let data: any = await initZones(msg);
				if (data.length > 0) {
					this.isTip = false;
					this.zones = data;
					return true;
				}
			},
			// 选择区服确认登录
			async serverBtn() {
				zoneAnimate("selectZone", 0);
				if (this.userZone && this.userZone !== "0" && +this.userZone > 0) {
					var zone: any = this.userZone.replace(/[^0-9]/gi, "");
					var gameZone: any = this.zones[zone - 1];
					let id = gameZone.gameZoneId;
					let data: any = await findRole(id);
					if (!data.length || data.code == "102") {
						Vue.prototype.$dialog.show("tip", window._RG.config.tip.player_null);
					} else {
						// 区服成功
						localStorage.setItem("playerName", data[0].playerName);
						localStorage.setItem("playerId", data[0].playerId);
						localStorage.setItem("zoneName", this.userZone);
						this.isType = true;
						this.$emit("visibleLogin", false);
						this.$emit("init");
						// pixel
					}
				} else {
					Vue.prototype.$dialog.show("tip", window._RG.config.tip.zone_null);
				}
			},
			/******************************************************************************/

			// 登录框关闭
			close() {
				this.userName = "";
				this.userPassword = "";
				this.userZone = "";
				this.isType = true;
				this.isTip = false;
				localStorage.clear();
				this.$emit("visibleLogin", false);
				if (isLogin()) {
					location.reload();
				}
			},
			//enter被按下，next input聚焦
			down(index) {
				document.getElementsByTagName("input")[index].focus();
			},
			//区服下拉
			dropSelectInput(ev) {
				zoneAnimate("selectZone", 280);
			},
			//选择区服
			selectZone(ev) {
				this.userZone = ev.target.innerText;
				zoneAnimate("selectZone", 0);
			}
		}
	});
</script>

<style lang="scss" scoped>
	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
		opacity: 0;
	}
	.maxBox {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(17, 31, 50, 0.5);
		z-index: $z-index2;
	}
	.centerBox {
		width: 659px;
		height: 500px;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		// border-radius: 20px;
		background: #fff;
		// background-size: contain;
		// box-shadow: 0px 14px 0 0px #59a8bf;
		border: 10px solid #2094c5;
	}

	.close {
		$width: 61px;
		$height: 61px;
		width: $width;
		height: $height;
		// margin-top: 0.16rem;
		$background-image: url("../../assets/images/#{$path}/pc/close.png");
		$background-size: $width $height;
		$background-repeat: no-repeat;
		$background-position: center;
		background: #{$background-image} #{$background-position}/#{$background-size} #{$background-repeat};
		position: relative;
		// border-radius: 50%;
		position: absolute;
		top: 4px;
		right: 9px;
	}
	.close:hover,
	.login_btn:hover,
	.login_btn1:hover,
	.fb_btn:hover,
	.server_btn:hover {
		cursor: pointer;
		opacity: 0.75;
	}
	.loginTip {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 230px;
		left: 0;
		color: red;
		z-index: 99;
	}
	.zoneTip {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 260px;
		left: 0;
		color: red;
		z-index: 99;
	}
	.zoneli {
		height: 35px;
		// border: 1px solid red;
		line-height: 35px;
		text-align: left;
		text-indent: 10px;
		color: white;
	}
	.zoneli:hover {
		cursor: pointer;
		font-size: 25px;
		color: #0976d9;
	}
	.title {
		font-size: 25px;
		color: #0976d9;
		text-align: left;
		padding-top: 77px;
		margin-left: 64px;
		line-height: 3;
	}
	.username,
	.userpass,
	.userzone {
		width: 526px;
		height: 61px;
		border-radius: 5px;
		margin-left: 63px;
		margin-top: 70px;
		text-indent: 25px;
		font-size: 23px;
		// background: url("./img/inputBg.png")no-repeat center;
		background-color: #fafdff;
		border: solid 2px #3b89dc;
		color: #0976d9;
	}

	.userpass {
		margin-top: 20px;
	}
	.userzone {
		margin-left: 64px;
		text-indent: 30px;
		margin-top: 0px;
		background: url("../../assets/images/#{$path}/pc/drop.png") no-repeat 475px
				27px,
			#ffffff;
		// background: url("./img/input_server.png") no-repeat center;
	}

	// .kakaoBtn{
	//   width: 207px;
	//   height: 72px;
	//   margin-top: 20px;
	//   margin-left: 49px;
	//   background: url("./img/fbBtn.png");
	// }
	$btnWidth: 526px;
	$btnHeight: 85px;
	.login_btn1 {
		width: $btnWidth;
		height: $btnHeight;
		margin-top: 20px;
		margin-left: 64px;
		background: url("../../assets/images/#{$path}/pc/loginBtn1.png") no-repeat
			center;
	}
	.fb_btn {
		width: $btnWidth;
		height: $btnHeight;
		margin-top: 20px;
		margin-left: 64px;
		border-radius: 20px;
		background: url("../../assets/images/#{$path}/pc/fb-login.png");
	}
	.server_btn {
		width: $btnWidth;
		height: $btnHeight;
		margin-left: 64px;
		margin-top: 111px;
		background: url("../../assets/images/#{$path}/pc/ok.png") no-repeat center;
	}
	.selectZone {
		width: 526px;
		height: 0px;
		margin-left: 67px;
		margin-top: -2px;
		overflow-y: auto;
		position: absolute;
		background: #fafafa;
		z-index: $z-index3;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.selectZone > p {
		width: 100%;
		height: 45px;
		line-height: 45px;
		font-size: 23px;
		text-indent: 30px;
		color: #0976d9;
	}
	.userInfo {
		font-size: 24px;
		color: #2c2c2c;
		margin-left: 150px;
	}
</style>

