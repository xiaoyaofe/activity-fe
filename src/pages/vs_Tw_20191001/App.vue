<template>
	<div id="app" class="app">
		<!-- 导航栏 -->
		<Sidebar :isPc="false" v-bind="navAnimateOption" :buttons="navButtons"></Sidebar>
		<!-- 登录 -->
		<!-- <login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login> -->
		<!-- 容器 -->
		<div class="container">
			<!-- 头部 -->
			<header class="header">
				<div class="header__title-and-time" v-once></div>
				<div class="header__btns-wraper">
					<RgButton
						v-if="!userRolle"
						class="header__btns-wraper__login-btn btn-relative"
						@click="visibleLogin(true)"
					></RgButton>
				</div>
				<div class="header__user-info" v-show="userRolle">
					<span
						class="header__user-info__txt"
					>{{_RG.config.tip.serve}}:&nbsp;{{userZone.replace(/[^0-9]/ig,"")}}</span>
					<span class="header__user-info__txt">{{_RG.config.tip.player}}:&nbsp;{{userRolle}}</span>
					<RgButton
						class="header__user-info__drop-btn"
						@click="dropOut"
					>[&nbsp;{{_RG.config.tip.loginOut}}&nbsp;]</RgButton>
				</div>
			</header>
			<!-- <act1 v-bind="act1Props" @showLogin="visibleLogin"></act1>
			<act2 :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act2>
			<section id="act3"></section>
			<section id="act4"></section>
			<act5 id="act5" :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act5>
			<section id="act6"></section>-->
		</div>
		<footer class="footer">
			<div class="center footer__logo"></div>
		</footer>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	// import Login from "@/components/login/Login.vue";
	import Sidebar from "@/components/sidebar/index.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import { isLogin } from "@/common/utils";
	import { getAllHistory, infoActivity } from "@/api";
	// import Act1 from "./acts/act1.vue";
	// import Act2 from "./acts/act2.vue";
	// import Act5 from "./acts/act5.vue";

	export default Vue.extend({
		components: {
			Sidebar,
			RgButton
			// Login,
			// Act1,
			// Act2,
			// Act5
		},
		data() {
			return {
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
			this.initUserInfo();
		},
		methods: {
			//初始化用户信息
			async initUserInfo() {
				if (isLogin()) {
					this.userRolle = localStorage.getItem("playerName") as string;
					this.userZone = localStorage.getItem("zoneName") as string;

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
					this.isLoginVisible = true;
				}
			},

			//是否显示登录框
			visibleLogin(val) {
				this.loginIsVisible = val;
			},
			dropOut() {
				localStorage.clear();
				location.reload();
			}
		}
	});
</script>
<style lang="scss">
	@import "@/common/scss/base.scss";
	@import "./app.scss";
</style>
