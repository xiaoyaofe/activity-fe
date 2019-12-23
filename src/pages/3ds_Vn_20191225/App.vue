<template>
	<div id="app" class="app">
		<!-- 导航栏 -->
		<DownloadBox v-bind="_downloadBoxOption1"></DownloadBox>
		<!-- 登录 -->
		<login v-show="loginIsVisible" @visibleLogin="visibleLogin(false)" @init="initUserInfo($event)"></login>
		<!-- 容器 -->
		<div class="container" id="container">
			<!-- 头部 -->
			<header class="header">
				<div class="header__btns-wraper">
					<RgButton
						v-if="!userRolle"
						class="header__btns-wraper__login-btn btn-relative"
						@click="visibleLogin(true)"
					></RgButton>
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
				</div>
			</header>
			<Join id="act1" :className="'act1'" :actInfos="act1Infos" @showLogin="visibleLogin">
				<ul class="act1__gifts clearfix">
					<li
						v-for="(item,index) in ['Đăng nhập mỗi ngày','VIP đăng nhập mỗi ngày','Đăng nhập 7 ngày liên tiếp']"
						:class="['act1__gifts__gift']"
						:key="'act1__gifts__gift--'+index"
					>
						<div :class="['act1__gifts__gift--title','act1__gifts__gift--title'+(index+1)]">{{item}}</div>
						<div :class="['act1__gifts__gift--'+(index+1)]"></div>
					</li>
				</ul>
			</Join>
			<DiamondWheel
				id="act2"
				:className="'act2'"
				@showLogin="visibleLogin"
				:isGetHistory="isGetHistory"
			></DiamondWheel>
			<Lottery
				id="act3"
				:className="'act3'"
				@showLogin="visibleLogin"
				:isGetHistory="isGetHistory"
				:activeTime="'2019-12-28'"
			></Lottery>
		</div>
		<footer class="footer">
			<section class="fans-info">
				<p class="red fans-info1">Nhắc nhở:</p>
				<p class="fans-info2">Nếu có thắc mắc, vui lòng liên hệ fanpage để được hỗ trợ</p>
				<p class="fans-info2">
					Link fanpage:
					<a
						class="fans__a-pc red"
						href="https://www.facebook.com/pokedaichien/"
						target="_blank"
					>https://www.facebook.com/pokedaichien/</a>
					<a
						class="fans__a-mb red"
						href="https://www.facebook.com/pokedaichien/"
						target="_blank"
					>https://www.face-book.com/pokedaichien/</a>
				</p>
			</section>
			<div class="footer__logo"></div>
		</footer>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { getAllHistory, infoActivity, weekPayInfo } from "@/api";
	import Login from "@/components/login/Login.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import Join from "@/components/activitys/Join/Join1.vue";
	import WeekPay from "@/components/activitys/Join/WeekPay.vue";
	import DiamondWheel from "@/components/activitys/wheel/DiamondWheel.vue";
	import Lottery from "@/components/activitys/Lottery/Lottery.vue";
	import DownloadBox from "@/components/navBox/DownloadBox1.vue";

	export default Vue.extend({
		components: {
			RgButton,
			DownloadBox,
			Join,
			WeekPay,
			Login,
			DiamondWheel,
			Lottery
		},
		data() {
			this._downloadBoxOption1 = {
				distance: "-2.2rem",
				duration: 800,
				direction: "right",
				isShowTop: true,
				hrefBtns: [
					{ txt: "", id: "ios", href: "http://bit.ly/EventNoel" },
					{ txt: "", id: "android", href: "http://bit.ly/EventNoel" }
				],
				activeBtns: [
					{ txt: "EVENT1", id: "act1" },
					{ txt: "EVENT2", id: "act2" },
					{ txt: "EVENT3", id: "act3" }
				]
			};
			return {
				loginIsVisible: false,
				userZone: "",
				userRolle: "",
				act3GiftJoined: {
					gift1: false,
					gift2: false,
					gift3: false,
					gift4: false
				},
				act1Infos: [
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 0,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 1,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 2,
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
					// 打登录点
					// this.$pixel.pixel("login1");
					// 获取礼包记录
					const config = this._RG.config;
					await getAllHistory().then((val: any) => {
						this.isGetHistory = true;
						if (val) {
							val.forEach((item: any) => {
								const index1 = config.data.rewardId.everyLogin.indexOf(
									item.rewardId
								);
								if (
									new Date().getDate() === new Date(item.getDate).getDate() ||
									item.rewardId === config.data.rewardId.everyLogin[3]
								) {
									index1 !== -1 && (this.act1Infos[index1].isDisabled = true);
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
			}
		}
	});
</script>
<style lang="scss">
	@import "@/common/scss/base.scss";
	@import "./app.scss";
</style>
