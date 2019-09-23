<template>
	<div id="app">
		<!-- 导航栏 -->
		<DowmNavigation :isPc="isPc" v-bind="navAnimateOption" :buttons="navButtons">
			<div></div>
		</DowmNavigation>
		<!-- 登录 -->
		<login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login>
		<!-- 容器 -->
		<div class="app_container">
			<!-- 头部 -->
			<header id="header">
				<div class="header_actTime" v-once></div>
				<div class="header_btnBox">
					<RgButton :class="['header_btnBox_loginBtn',{hide:userRolle}]" @click="visibleLogin(true)"></RgButton>
				</div>
				<div class="userInfo" v-show="userRolle">
					<span class="userInfo_span">{{_RG.config.tip.serve}}:&nbsp;{{userZone.replace(/[^0-9]/ig,"")}}</span>
					<span class="userInfo_span">{{_RG.config.tip.player}}:&nbsp;{{userRolle}}</span>
					<RgButton class="userInfo_dropBtn" @click="dropOut">[&nbsp;{{_RG.config.tip.loginOut}}&nbsp;]</RgButton>
				</div>
			</header>
			<act1 v-bind="act1Props" @showLogin="visibleLogin"></act1>
			<act2 :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act2>
			<section id="act3"></section>
			<section id="act4"></section>
			<act5 id="act5" :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act5>
			<section id="act6"></section>
		</div>
		<RgFooter class="app_footer">
			<div class="bottomLogo center"></div>
		</RgFooter>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import Login from "@/components/login/Login.vue";
	import DowmNavigation from "@/components/Navigation/DowmNavigation.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import RgFooter from "@/components/base/RgFooter.vue";
	import { isLogin } from "@/common/common";
	import { getAllHistory, infoActivity } from "@/common/api";
	import Act1 from "./acts/act1.vue";
	import Act2 from "./acts/act2.vue";
	import Act5 from "./acts/act5.vue";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
			$isPc: boolean;
		}
	}
	// 尽量抽象mixin
	export default Vue.extend({
		components: {
			Login,
			DowmNavigation,
			RgButton,
			Act1,
			RgFooter,
			Act2,
			Act5
		},
		data() {
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			let act1GiftIndex = 0;
			let act1Name = "login1";
			if (year === 2019 && month === 9 && day >= 20) {
				act1GiftIndex = 0;
				act1Name = "login2";
			}
			return {
				isPc: this.$isPc,
				loginIsVisible: false,
				userZone: "",
				userRolle: "",
				act1Props: {
					initIsDisabled1: false,
					initIsDisabled2: false
				},
				navButtons: {
					iosDownBtn: "https://itunes.apple.com/tw/app/id1208000721",
					googleDownBtn:
						"http://res-pkg-cdn.pocketgamesol.com/kdygvs/com.payvsgame.tw_20.8.3110.apk",
					facebookDownBtn: "https://www.facebook.com/PocketMonKO/"
				},
				navAnimateOption: {
					distance: "-2.5rem",
					duration: 1000,
					direction: "right"
				},
				// 粉丝页地址
				fansPageUrl: "https://www.facebook.com/PocketMonKO/",
				isGetHistory: false
			};
		},
		computed: {
			_RG() {
				return window._RG;
			}
		},
		async mounted() {
			// 初始化
			(this as any).initUserInfo();
		},
		methods: {
			//初始化用户信息
			async initUserInfo() {
				if (isLogin()) {
					(this as any).userRolle = localStorage.getItem("playerName") as string;
					(this as any).userZone = localStorage.getItem("zoneName") as string;

					// 获取礼包记录
					await getAllHistory().then((val: any) => {
						if (val) {
							val.forEach((item: any) => {
								if (item.rewardId === this._RG.config.data.rewardId.login1[0]) {
									this.act1Props.initIsDisabled1 = true;
								}
								if (item.rewardId === this._RG.config.data.rewardId.login2[0]) {
									this.act1Props.initIsDisabled2 = true;
								}
							});
						}
					});
					this.isGetHistory = true;
				}
			},
			// 查看礼包
			async searchRewardBtn() {
				if (isLogin()) {
					let data: any = await getAllHistory();
					if (data) {
						if (!data.length) {
							this.$dialog.show("tip", window._RG.config.tip.giftArr_null);
							return;
						}
						this.$dialog.show("cdKeys", data);
					}
				} else {
					(this as any).isLoginVisible = true;
				}
			},

			//是否显示登录框
			visibleLogin(val) {
				(this as any).loginIsVisible = val;
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
