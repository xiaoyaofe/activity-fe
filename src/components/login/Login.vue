<template>
	<transition name="fade">
		<div class="maxBox">
			<div class="centerBox">
				<button @click="close" class="close"></button>
				<!-- 登录 -->
				<div class="accountBox" v-show="isType">
					<div class="username-wrap">
						<label class="username-label label" for="userAccount">{{tip.userName}}:</label>
						<input
							type="text"
							class="username"
							autofocus
							name="userAccount"
							key="userAccount"
							v-model="userName"
							@keydown.enter="down(1)"
							:placeholder="tip.userName"
						/>
					</div>
					<div class="password-wrap">
						<label class="password-label label" for="password">{{tip.userPass}}:</label>
						<input
							type="password"
							class="userpass"
							name="password"
							key="userPassword"
							v-model="userPassword"
							@keydown.enter="sdkLogin($event)"
							:placeholder="tip.userPass"
						/>
					</div>

					<button class="login_btn1" @click="sdkLogin"></button>

					<button class="fb_btn" @click="facebook"></button>
					<!-- <button class="kakaoBtn" @click="KakaoBtn"></button> -->
				</div>
				<!-- 区服 -->
				<div class="serverBox" v-if="!isType" style="position: relative;">
					<!-- <p class="title">{{tip.zone_null}}</p> -->
					<p class="selectZone-txt">{{tip.selectZone}}</p>
					<div class="userzone-wrap">
						<input
							type="number"
							v-number-only
							class="userzone"
							key="userServer"
							v-model="userZone"
							:placeholder="tip.serve"
							@click="dropSelectInput()"
							v-focus="focusStatus"
							@keydown.enter="serverBtn($event)"
						/>
						<span class="zone-select-btn" @click.stop="dropSelectInput()"></span>
					</div>

					<section class="selectZone">
						<p
							v-for="(item,index) in this.zones"
							:key="index"
							@click="selectZone($event,index)"
							class="zoneli"
						>{{item[zoneName] - 4}}</p>
					</section>
					<button class="server_btn" @click="serverBtn"></button>
				</div>
				<p v-if="isTip" :class="isType ? 'loginTip' : 'zoneTip'">{{userTip}}</p>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
	declare var FB: any;
	declare var Kakao: any;
	import Vue from "vue";
	import { isLogin } from "../../common/utils";
	import {
		loginWithAccount,
		loginWithKakao,
		loginWithFB,
		initZones,
		findRole
	} from "../../api";
	import { zoneAnimate } from "../../common/utils";
	export default Vue.extend({
		data() {
			return {
				tip: window._RG.config.tip,
				userName: "",
				userPassword: "",
				userZone: "",
				zones: [],
				userTip: "",
				myTimer: "",
				focusStatus: true,
				isType: true, //判断登录/区服窗显示
				isTip: false, //判断是否登录提示
				zoneName: "gameZoneId"
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
					Vue.prototype.$dialog.show("tip", this.tip.login_info_null);
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
						Vue.prototype.$dialog.show("tip", this.tip.player_null);
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
					Vue.prototype.$dialog.show("tip", this.tip.zone_null);
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
	// @import "./vn20191225.scss";
	// @import "./fr20191225.scss";
	@import "./th20191201.scss";
</style>

