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
					<a
						class="header__btns-wraper__ios-btn btn-relative"
						href="https://app.adjust.com/vh1tuah?redirect_android=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.risebofor.th&redirect_ios=https%3A%2F%2Fapps.apple.com%2Fth%2Fapp%2Fid1169281978 "
						v-tap
					></a>
					<a
						class="header__btns-wraper__google-btn btn-relative"
						href="https://app.adjust.com/vh1tuah?redirect_android=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.risebofor.th&redirect_ios=https%3A%2F%2Fapps.apple.com%2Fth%2Fapp%2Fid1169281978 "
						v-tap
					></a>
				</div>
			</header>
			<Join id="act1" :className="'act1'" :actInfos="act1Infos" @showLogin="visibleLogin">
				<ul class="act1__gifts clearfix">
					<li
						v-for="key in 7"
						:class="['act1__gifts__gift','act1__gifts__gift--'+key]"
						:key="'act1__gifts__gift--'+key"
					></li>
				</ul>
			</Join>
			<WeekPay id="act2" :className="'act2'" :actInfos="act2Infos" @showLogin="visibleLogin">
				<ul class="act2__gifts clearfix">
					<li
						v-for="key in 7"
						:class="['act2__gifts__gift','act2__gifts__gift--'+key]"
						:key="'act2__gifts__gift--'+key"
					></li>
				</ul>
			</WeekPay>
			<Wheel
				id="act3"
				:className="'act3'"
				:giftsCounts="act3GiftsCounts"
				:isGetHistory="isGetHistory"
				@showLogin="visibleLogin"
			></Wheel>
			<section class="fans-info">
				<p>กติกา</p>
				<p>1.บริษัทขอสงวนสิทธ์ในการอธิบายกิจกรรมครั้งนี้</p>
				<p>2. หากมีปัญหาใดๆ ในกิจกรรม โปรดติดต่อทีมงาน</p>
				<p class="fans">
					<a
						class="fans__a"
						href="https://www.facebook.com/PokeSagago/"
						target="_blank"
					>https://www.facebook.com/PokeSagago/</a>
				</p>
			</section>
		</div>
		<footer class="footer">
			<div class="center footer__logo"></div>
		</footer>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { getAllHistory, infoActivity, weekPayInfo } from "@/api";
	import Login from "@/components/login/Login.vue";
	import RgButton from "@/components/base/RgButton.vue";
	import Join from "@/components/activitys/Join/Join.vue";
	import WeekPay from "@/components/activitys/Join/WeekPay.vue";
	import Wheel from "@/components/activitys/wheel/Wheel.vue";
	import DownloadBox from "@/components/navBox/DownloadBox.vue";

	export default Vue.extend({
		components: {
			RgButton,
			DownloadBox,
			Join,
			WeekPay,
			Login,
			Wheel
		},
		data() {
			this._downloadBoxOption = {
				distance: "-1.75rem",
				duration: 800,
				direction: "right",
				isShowTop: true,
				btns: {
					act1: "",
					act2: "",
					act3: "",
					facebook: "https://www.facebook.com/PokeSagago/"
				}
			};
			return {
				loginIsVisible: false,
				userZone: "",
				userRolle: "",
				act3GiftsCounts: [0, 0, 0, 0, 0, 0, 0, 0],
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
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 3,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 4,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 5,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "everyLogin",
						giftIndex: 6,
						isDisabled: false
					}
				],
				act2Infos: [
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 0,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 1,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 2,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 3,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 4,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 5,
						isDisabled: false
					},
					{
						isShow: true,
						actName: "paySum",
						giftIndex: 6,
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
					this.$pixel.pixel("login1");
					// 获取礼包记录
					await getAllHistory().then((val: any) => {
						this.isGetHistory = true;
						if (val) {
							val.forEach((item: any) => {
								const index1 = this._RG.config.data.rewardId.everyLogin.indexOf(
									item.rewardId
								);
								const index3 = this._RG.config.data.rewardId.rotate.indexOf(
									item.rewardId
								);

								// console.log(index1, index2, index3);
								index1 !== -1 && (this.act1Infos[index1].isDisabled = true);

								index3 !== -1 &&
									this.act3GiftsCounts.splice(
										index3,
										1,
										this.act3GiftsCounts[index3] + 1
									);
							});
						}
					});
					await weekPayInfo().then((res: any) => {
						for (let key in res) {
							const index2 = this._RG.config.data.rewardId.weekpay.indexOf(key);
							console.log(key);
							index2 !== -1 && (this.act2Infos[index2].isDisabled = true);
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
