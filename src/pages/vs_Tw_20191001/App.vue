<template>
	<div id="app" class="app">
		<!-- 导航栏 -->
		<DownloadBox v-bind="_downloadBoxOption"></DownloadBox>
		<!-- 登录 -->
		<login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login>
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
			<Join :className="'act1'" :actInfos="act1Infos" @showLogin="visibleLogin">
				<ul class="act1__gifts clearfix">
					<li
						v-for="key in 5"
						:class="['act1__gifts__gift','act1__gifts__gift--'+key]"
						:key="'act1__gifts__gift--'+key"
					></li>
				</ul>
			</Join>
			<!-- <act1 v-bind="act1Props" @showLogin="visibleLogin"></act1> -->
			<!-- <act2 :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act2> -->
			<section class="act3"></section>
			<section class="act4"></section>
			<!-- <act5 id="act5" :isGetHistory="isGetHistory" @showLogin="visibleLogin"></act5> -->
			<section class="act6"></section>
		</div>
		<footer class="footer">
			<div class="center footer__logo"></div>
		</footer>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin, isTime } from "@/common/utils";
	import { getAllHistory, infoActivity } from "@/api";
	import Login from "@/components/login/Login.vue";
	import DownloadBox from "@/components/navBox/DownloadBox.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import Join from "@/components/activitys/Join/Join.vue";
	// import Act1 from "./acts/act1.vue";
	// import Act2 from "./acts/act2.vue";
	// import Act5 from "./acts/act5.vue";
	interface ActInfo {
		actName: string;
		giftIndex: number;
		isDisabled: boolean;
		isShow: boolean;
	}
	const isShowBtn2Fn = () => isTime("2019-10-10");
	export default Vue.extend({
		components: {
			DownloadBox,
			RgButton,
			Join,
			Login
			// Act2,
			// Act5
		},

		data() {
			this._downloadBoxOption = {
				distance: "-2.5rem",
				duration: 1000,
				direction: "right",
				btns: {
					ios: "https://itunes.apple.com/tw/app/id1208000721",
					google:
						"http://res-pkg-cdn.pocketgamesol.com/kdygvs/com.payvsgame.tw_20.8.3110.apk",
					facebook: "https://www.facebook.com/PocketMonKO/"
				}
			};
			const isShowJoinBtn2 = isShowBtn2Fn();
			return {
				loginIsVisible: false,
				userZone: "",
				userRolle: "",
				act1Infos: [
					{
						isShow: !isShowJoinBtn2,
						actName: "login1",
						giftIndex: 0,
						isDisabled: false
					},
					{
						isShow: isShowJoinBtn2,
						actName: "login2",
						giftIndex: 0,
						isDisabled: false
					}
				],
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
					infoActivity("login1", 1);
					// 获取礼包记录
					// await getAllHistory().then((val: any) => {
					// 	if (val) {
					// 		val.forEach((item: any) => {
					// 			if (item.rewardId === this._RG.config.data.rewardId.login1[0]) {
					// 				this.act1Infos[0].isDisabled = true;
					// 			}
					// 			if (item.rewardId === this._RG.config.data.rewardId.login2[0]) {
					// 				this.act1Infos[1].isDisabled = true;
					// 			}
					// 		});
					// 	}
					// });
					// this.isGetHistory = true;
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
					this.loginIsVisible = true;
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
