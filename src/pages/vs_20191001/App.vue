<template>
	<div id="app">
		<!-- 导航栏 -->
		<DowmNavigation :isPc="isPc" v-bind="navAnimateOption" :buttons="navButtons"></DowmNavigation>
		<!-- 登录 -->
		<login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login>
		<!-- 容器 -->
		<div class="app_container">
			<!-- 头部 -->
			<header id="header">
				<div class="header_actTime" v-once></div>
				<div class="header_btnBox">
					<RgButton class="header_btnBox_loginBtn" v-show="!userRolle" @click="visibleLogin(true)"></RgButton>
				</div>
				<div class="userInfo" v-show="userRolle">
					<span class="userInfo_span">{{_RG.config.tip.serve}}:&nbsp;{{userZone.replace(/[^0-9]/ig,"")}}</span>
					<span class="userInfo_span">{{_RG.config.tip.player}}:&nbsp;{{userRolle}}</span>
					<rg-button class="userInfo_dropBtn" @click="dropOut">[&nbsp;{{_RG.config.tip.loginOut}}&nbsp;]</rg-button>
				</div>
			</header>
			<section id="act1">
				<div class="act1-title" v-once></div>
				<ul class="gifts" v-once>
					<li class="gift"></li>
					<li class="gift"></li>
					<li class="gift"></li>
					<li class="gift"></li>
					<li class="gift"></li>
				</ul>
				<RgButton class="header_btnBox_loginBtn" @click="getLoginGift()"></RgButton>
			</section>
			<section id="act2"></section>
			<section id="act3"></section>
			<section id="act4"></section>
			<section id="act5"></section>
		</div>
		<RgFooter class="app_footer">
			<div class="bottomLogo center"></div>
		</RgFooter>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import Pixel from "@/plugins/pixel";
	import Login from "@/components/login/Login.vue";
	import DowmNavigation from "@/components/Navigation/DowmNavigation.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import RgFooter from "@/components/base/RgFooter.vue";
	import { isLogin } from "@/common/common";
	import { getAllHistory, infoActivity } from "@/common/api";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
			$isPc: boolean;
			$isLogin: boolean;
		}
	}
	export default Vue.extend({
		components: {
			Login,
			DowmNavigation,
			RgButton,
			RgFooter
		},
		data() {
			return {
				isPc: this.$isPc,
				isLoginIsVisible: false,
				userZone: "",
				userRolle: "",

				navButtons: {
					iosDownBtn: "https://itunes.apple.com/tw/app/id1208000721",
					googleDownBtn:
						"http://res-pkg-cdn.pocketgamesol.com/kdygvs/com.payvsgame.tw_20.8.3110.apk",
					facebookDownBtn: "https://www.facebook.com/PocketMonKO/"
				},
				navAnimateOption: {
					distance: "-2.2rem",
					duration: 1000,
					direction: "right"
				}
			};
		},
		computed: {
			_RG() {
				return window._RG;
			},
			loginIsVisible: function() {
				return this.$isLogin || this.isLoginIsVisible;
			}
		},
		async created() {
			// 初始化
			// this.initUserInfo();
		},
		methods: {
			//初始化用户信息
			async initUserInfo() {
				// 		if (isLogin()) {
				// 		let local: any = localStorage;
				// 		this.userRolle = local.getItem("playerName");
				// 		this.userZone = local.getItem("zoneName");
				// 		// 获取礼包记录
				// 		await getAllHistory().then((val: any) => {
				// 			if (val.length) {
				// 				for (let index = 0; index < val.length; index++) {
				// 					if (val[index].rewardId) {
				// 						this.cdkeyList.push(val[index].rewardId);
				// 					}
				// 				}
				// 				// console.log(this.cdkeyList);
				// 				this.giftsed = true;
				// 			}
				// 			// 活动二初始化
				// 			infoActivity("rotate").then((val: any) => {});
				// 		});
				// 		// 活动二初始化
				// }
			},
			// 查看礼包
			async searchRewardBtn() {
				if (isLogin()) {
					let data: any = await getAllHistory();
					if (data) {
						if (!data.length) {
							Vue.prototype.$dialog.show("tip", CONFIG["tip"].giftArr_null);
							return;
						}
						Vue.prototype.$dialog.show("cdKeys", data);
					}
				} else {
					this.loginIsVisible = true;
				}
			},

			//是否显示登录框
			visibleLogin(val) {
				this.isLoginIsVisible = val;
			},
			dropOut() {
				localStorage.clear();
				location.reload();
			}
		}
	});
</script>
<style lang="scss">
	@import "../../base.scss";
	@import "./app.pc.scss";
	// @import "./app.mb.scss";
</style>
