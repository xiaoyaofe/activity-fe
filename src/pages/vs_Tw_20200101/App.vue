<template>
	<div id="app" class="app">
		<!-- 导航栏 -->
		<DownloadBox v-bind="_downloadBoxOption1"></DownloadBox>
		<!-- 登录 -->
		<login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login>
		<!-- 容器 -->
		<div class="container" id="container">
			<div class="logo"></div>
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
			<Join :className="'act1'" :actInfos="act1Infos" @showLogin="visibleLogin"></Join>
			<Activity :class="'act2'" :desc="''"></Activity>
			<Activity :class="'act3'" :desc="''"></Activity>
			<Activity :class="'act4' " :desc="''"></Activity>
			<Wheel :className="'act5'" @showLogin="visibleLogin" :isGetHistory="isGetHistory"></Wheel>
		</div>
		<footer class="footer">
			<div class="center footer__logo"></div>
		</footer>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { getAllHistory, infoActivity } from "@/api";
	import Login from "@/components/login/Login.vue";
	import DownloadBox from "@/components/navBox/DownloadBox1.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import Join from "@/components/activitys/Join/Join.vue";
	import Activity from "@/components/base/Activity.vue";
	import Wheel from "@/components/activitys/wheel/Wheel-tw.vue";

	export default Vue.extend({
		components: {
			DownloadBox,
			RgButton,
			Join,
			Login,
			Activity,
			Wheel
		},
		provide: function(): any {
			return {
				getMap: this.getAct1Infos()
			};
		},
		data() {
			this._downloadBoxOption1 = {
				distance: "-3rem",
				duration: 800,
				direction: "right",
				isShowTop: true,
				hrefBtns: [
					{ txt: "", id: "fans", href: "//www.facebook.com/PocketMonKO/" },
					{ txt: "", id: "android", href: "http://bit.ly/34kNpxk " },
					{ txt: "", id: "ios", href: "http://bit.ly/2qaZOoR " }
				],
				activeBtns: [
					{ txt: "1.新年禮包", id: "act1" },
					{ txt: "2.扭蛋-新年神獸禮包", id: "act2" },
					{ txt: "3.新年新氣象", id: "act3" },
					{ txt: "4.新年特惠", id: "act4" },
					{ txt: "5.新年轉轉樂", id: "act5" }
				]
			};
			return {
				loginIsVisible: false,
				userZone: "",
				userRolle: "",
				act1Infos: [
					{
						isShow: true,
						actName: "login",
						giftIndex: 0,
						isDisabled: false
					}
				],
				isGetHistory: false
			};
		},
		computed: {
			_RG(): { config: CONFIG } {
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
					this.isGetHistory = true;
					this.userRolle = localStorage.getItem("playerName") as string;
					this.userZone = localStorage.getItem("zoneName") as string;
					// infoActivity("login1", 1);
					// 获取礼包记录
					await getAllHistory().then((val: any) => {
						if (val) {
							val.forEach((item: any) => {
								if (item.rewardId === this._RG.config.data.rewardId.login[0]) {
									this.act1Infos[0].isDisabled = true;
								}
							});
						}
					});
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
			visibleLogin(val: boolean) {
				this.loginIsVisible = val;
			},
			dropOut() {
				localStorage.clear();
				location.reload();
			},
			getAct1Infos() {
				let vm = this;
				return function checkForAct1Info() {
					return vm.act1Infos;
				};
			}
		}
	});
</script>
<style lang="scss">
	@import "../../../node_modules/normalize.css/normalize.css";
	@import "@/common/scss/base.scss";
	@import "./app.scss";
</style>
