<template>
	<transition name="fadeIn">
		<div class="DialogTip" v-show="showDialog">
			<!--提示窗  -->
			<div class="tipBox" v-show="toastName == 'tip'">
				<p class="tipTxt">{{content}}</p>
				<button @click="close" class="close"></button>
			</div>
			<!-- 激活码窗-->
			<div class="cdkBox" v-show="toastName == 'cdKeys'">
				<p class="tipTxt">
					{{txt["tip"].join_success}}
					<br>
					{{txt["tip"].reward_txt}}&nbsp;:&nbsp;{{this.rewardName}}
					<br>
					{{txt["tip"].time}}&nbsp;:&nbsp;{{this.userCdkeys}}
				</p>
				<button @click="close" class="close"></button>
			</div>
			<!-- loading窗 -->
			<div class="loadingBox" v-show="toastName == 'loading'"></div>
			<!-- 礼包弹窗 -->
			<div class="rewardBox" v-show="toastName === 'reward'">
				<button @click="close" class="close"></button>
				<!-- <section class="giftNull" v-if="!rewardArr.length">{{txt['tip'].giftArr_null}}</section>
        <section class="rewardContainer" v-if="rewardArr.length">
          <div class="table-head">
            <div class="table-head-wrap">
              <table class="grid" style="width：745px">
                <thead>
                  <tr>
                    <th>{{txt['tip'].code}}</th>
                    <th>{{txt['tip'].reward_name}}</th>
                    <th>{{txt['tip'].time}}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="table-content">
            <table class="grid">
              <tbody>
                <tr v-for="(item,index) in rewardArr" :key="index">
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.cdkeys}}</td>
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.rewardName}}</td>
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.time}}</td>
                </tr>
              </tbody>
            </table>
          </div>
				</section>-->
				<div class="myReward">
					<h1>Quà của tôi</h1>
					<section>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</section>
					<h1>Quà đặt gạch</h1>
					<div>
						<strong>Quà vòng quay：</strong>
						<span :class="rewardIcon"></span>
					</div>
					<p>
						Mã code vòng quay：
						<strong>{{userCdkeys}}</strong>
					</p>
				</div>
			</div>
			<!-- 愿望弹窗 -->
			<div class="rewardBox" v-show="toastName === 'lucky'">
				<button @click="close" class="close"></button>
				<section class="giftNull" v-if="!luckyArr.length">{{txt.tip.wishArr_null}}</section>
				<section v-if="luckyArr.length" class="rewardContainer">
					<p>Lucky List</p>
					<div class="table-head">
						<div class="table-head-wrap">
							<table class="grid">
								<!-- <colgroup>
                  <col style="width:80px">
                  <col>
                  <col style="width:150px">
								</colgroup>-->
								<thead>
									<tr>
										<th></th>
										<th>{{txt.tip.server}}</th>
										<th>{{txt.tip.player}}</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div class="table-content">
						<table class="grid">
							<!-- <colgroup>
                <col style="width:80px">
                <col>
                <col>
                <col style="width:150px">
							</colgroup>-->
							<tbody>
								<tr v-for="(item,index) in luckyArr" :key="index">
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{index+1}}</td>
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{item.server}}</td>
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{item.player}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "../../common/common";

	export default Vue.extend({
		name: "DialogTip",
		props: {
			InstatceShowDialog: {
				type: Boolean,
				default: false
			},
			content: {
				type: String,
				default: "提示信息"
			}
		},
		data() {
			return {
				txt: window._RG.config,
				toastName: "",
				rewardName: "",
				userCdkeys: "",
				rewardIcon: "",
				toastHide: true,
				showDialog: false,
				rewardArr: [],
				luckyArr: [],
				tokenExpired: false
			};
		},
		watch: {
			rewardArr(newValue, oldValue) {
				this.rewardIcon =
					"rewardIcon" +
					window._RG.config.data.rewardId.rotate.indexOf(newValue[0].rewardId);
				this.userCdkeys = newValue[0].getDate;
				this.rewardName = newValue[0].rewardName;
			}
		},
		methods: {
			close() {
				if (this.tokenExpired) {
					location.reload();
				}
				this.showDialog = false;
			},
			open() {
				this.showDialog = true;
			}
		}
	});
</script>
<style lang="scss" scoped>
	/*---- variables ----*/
	$pc: "screen and (min-width: 751px)";
	$mobile: "screen and (max-width: 750px) and (min-width: 0px)";

	/*---- Mixins ----*/
	@mixin mq($mqString) {
		@media #{$mqString} {
			@content;
		}
	}

	@include mq($pc) {
		.DialogTip {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			background: rgba(17, 31, 50, 0.5);
			.tipBox,
			.cdkBox {
				width: 600px;
				height: 270px;
				background-size: 100%;
				position: fixed;
				top: 50%;
				left: 50%;
				margin-left: -300px;
				margin-top: -135px;
				border-radius: 20px;
				background: #fafdff;
				// background-size: contain;
				// box-shadow: 0px 14px 0 0px #59a8bf;
				border: 10px solid #2094c5;
				.tipTxt {
					width: 80%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					-webkit-transform: translate(-50%, -50%);
					-moz-transform: translate(-50%, -50%);
					-o-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					text-align: center;
					padding: 0 30px;
					font-size: 24px;
					color: #0976d9;
					line-height: 30px;
				}
				.close {
					width: 61px;
					height: 61px;
					border: none;
					background: url("../../assets/images/#{$path}/pc/close.png") no-repeat
						center;
					background-size: contain;
					outline: none;
					position: absolute;
					top: 4px;
					right: 7px;
					cursor: pointer;
				}
			}
			.loadingBox {
				width: 80px;
				height: 80px;
				position: fixed;
				top: 50%;
				left: 50%;
				background: url("./img/loading.gif");
				margin-left: -40px;
				margin-top: -40px;
			}
			/* 	.rewardBox {
									width: 692px;
									height: 489px;
									overflow: hidden;
									position: relative;
									top: 50%;
									left: 50%;
									margin-left: -346px;
									margin-top: -244.5px;
									background: url("./img/giftList.png") no-repeat;

									.close {
										width: 50px;
										height: 50px;
										position: absolute;
										top: 45px;
										right: 5px;
									}
									.myReward {
										width: 420px;
										height: 320px;
										margin-left: 170px;
										margin-top: 60px;
										color: #804827;
										// border: 1px solid red;
										h1 {
											text-align: center;
											font-size: 30px;
											font-weight: bold;
											text-transform: uppercase;
										}
										h1:nth-child(3) {
											font-size: 24px;
											margin-top: 15px;
											margin-bottom: 10px;
										}
										section {
											span {
												width: 79px;
												height: 113px;
												margin: 0 14px;
												display: inline-block;
											}
											span:nth-child(1) {
												background: url("./img/flag1.png") no-repeat;
												background-position: 0 -15px;
											}
											span:nth-child(2) {
												background: url("./img/flag2.png") no-repeat;
												background-position: 0 -15px;
											}
											span:nth-child(3) {
												background: url("./img/flag3.png") no-repeat;
												background-position: 0 -15px;
											}
											span:nth-child(4) {
												background: url("./img/flag4.png") no-repeat;
												background-position: 0 -15px;
												margin-right: 0;
											}
										}
										div {
											width: 255px;
											height: 78px;
											margin: auto;
											text-align: center;
											font-size: 24px;
											strong {
												float: left;
												font-weight: bold;
												padding-top: 32px;
											}
											.rewardIcon0,
											.rewardIcon2,
											.rewardIcon4,
											.rewardIcon5,
											.rewardIcon6,
											.rewardIcon7,
											.rewardIcon8 {
												width: 65px;
												height: 65px;
												float: right;
											}
											.rewardIcon0 {
												background: url("./img/roteIcon0.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon2 {
												background: url("./img/roteIcon2.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon4 {
												background: url("./img/roteIcon4.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon5 {
												background: url("./img/roteIcon5.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon6 {
												background: url("./img/roteIcon6.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon7 {
												background: url("./img/roteIcon7.png") no-repeat center;
												background-size: contain;
											}
											.rewardIcon8 {
												background: url("./img/roteIcon8.png") no-repeat center;
												background-size: contain;
											}
										}
										p {
											text-align: center;
											font-size: 24px;
											font-weight: bold;
										}
									}
								} */
		}
	}
	@include mq($mobile) {
		.DialogTip {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			background: rgba(17, 31, 50, 0.5);
			.tipBox,
			.cdkBox {
				width: 6rem;
				height: 2.7rem;
				background-size: 100%;
				position: fixed;
				top: 50%;
				left: 50%;
				margin-left: -3rem;
				margin-top: -1.35rem;
				border-radius: 0.2rem;
				background: #fafdff;
				// background-size: contain;
				// box-shadow: 0px 14px 0 0px #59a8bf;
				border: 0.1rem solid #2094c5;
				.tipTxt {
					width: 80%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					-webkit-transform: translate(-50%, -50%);
					-moz-transform: translate(-50%, -50%);
					-o-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					text-align: center;
					padding: 0 0.3rem;
					font-size: 0.24rem;
					color: #0976d9;
					line-height: 0.3rem;
				}
				.close {
					width: 0.5rem;
					height: 0.5rem;
					border: none;
					background: url("../../assets/images/#{$path}/pc/close.png") no-repeat
						center;
					background-size: contain;
					outline: none;
					position: absolute;
					top: 0.04rem;
					right: 0.07rem;
					cursor: pointer;
				}
			}
			.loadingBox {
				width: 80px;
				height: 80px;
				position: fixed;
				top: 50%;
				left: 50%;
				background: url("./img/loading.gif");
				margin-left: -40px;
				margin-top: -40px;
			}
			/* 	.rewardBox {
								width: 692px;
								height: 489px;
								overflow: hidden;
								position: relative;
								top: 50%;
								left: 50%;
								margin-left: -346px;
								margin-top: -244.5px;
								background: url("./img/giftList.png") no-repeat;

								.close {
									width: 50px;
									height: 50px;
									position: absolute;
									top: 45px;
									right: 5px;
								}
								.myReward {
									width: 420px;
									height: 320px;
									margin-left: 170px;
									margin-top: 60px;
									color: #804827;
									// border: 1px solid red;
									h1 {
										text-align: center;
										font-size: 30px;
										font-weight: bold;
										text-transform: uppercase;
									}
									h1:nth-child(3) {
										font-size: 24px;
										margin-top: 15px;
										margin-bottom: 10px;
									}
									section {
										span {
											width: 79px;
											height: 113px;
											margin: 0 14px;
											display: inline-block;
										}
										span:nth-child(1) {
											background: url("./img/flag1.png") no-repeat;
											background-position: 0 -15px;
										}
										span:nth-child(2) {
											background: url("./img/flag2.png") no-repeat;
											background-position: 0 -15px;
										}
										span:nth-child(3) {
											background: url("./img/flag3.png") no-repeat;
											background-position: 0 -15px;
										}
										span:nth-child(4) {
											background: url("./img/flag4.png") no-repeat;
											background-position: 0 -15px;
											margin-right: 0;
										}
									}
									div {
										width: 255px;
										height: 78px;
										margin: auto;
										text-align: center;
										font-size: 24px;
										strong {
											float: left;
											font-weight: bold;
											padding-top: 32px;
										}
										.rewardIcon0,
										.rewardIcon2,
										.rewardIcon4,
										.rewardIcon5,
										.rewardIcon6,
										.rewardIcon7,
										.rewardIcon8 {
											width: 65px;
											height: 65px;
											float: right;
										}
										.rewardIcon0 {
											background: url("./img/roteIcon0.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon2 {
											background: url("./img/roteIcon2.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon4 {
											background: url("./img/roteIcon4.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon5 {
											background: url("./img/roteIcon5.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon6 {
											background: url("./img/roteIcon6.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon7 {
											background: url("./img/roteIcon7.png") no-repeat center;
											background-size: contain;
										}
										.rewardIcon8 {
											background: url("./img/roteIcon8.png") no-repeat center;
											background-size: contain;
										}
									}
									p {
										text-align: center;
										font-size: 24px;
										font-weight: bold;
									}
								}
							} */
		}
	}
</style>
