<template>
	<div class="giftsBox">
		<p class="tit"></p>
		<p class="txt">
			Im Zeitraum vom 1.3.2019 - 6.3.2019 könnt ihr euch bereits im Voraus die neue Version des Spiels herunterladen, aber ein Login ist noch nicht möglich. Nachdem das Update am 7.3.2019 aufgespielt wurde, könnt ihr euch normal einloggen und auf dieser Seite euer Geschenk einfordern!
			[Jedes Konto kann die Geschenke nur einmal einfordern. Die Geschenke können NICHT für verschiedene Server auf dem selben Konto eingefordert werden!]
		</p>
		<section class="gifts">
			<div class="giftsTop">
				<section class="IconBox">
					<span class="icon"></span>
					<button class="ios" @click="getReward(1,'ios')"></button>
					<!-- <a class="androidLink" target="_blank" href="https://pkde.pocketgamesol.com/activity/apk-tip/index.html"> -->
					<button class="android" @click="getReward(1,'android')"></button>
					<!-- </a> -->
				</section>
				<section class="rewardBox">
					<div class="reward" v-for="(item,index) in rewardArr" :key="index">
						<span :class="'reward'+index"></span>
						<p>{{item}}</p>
					</div>
					<button :class="giftsed?'joinBtned':'joinBtn'" :disabled="giftsed" @click="getReward(0)"></button>
				</section>
			</div>
			<div class="giftsBottom">
				<div :class="['reward',`reward${index}`]" v-for="(item,index) in stepArr" :key="index">
					<p>{{item}}</p>
				</div>
			</div>
			<div class="m_giftsBottom">
				<div class="swiper-step">
					<div class="swiper-wrapper">
						<div
							:class="['swiper-slide','reward',`reward${index}`]"
							v-for="(item,index) in stepArr"
							:key="index"
						>
							<p>{{item}}</p>
						</div>
					</div>
					<div class="paginationStep"></div>
				</div>
				<button class="pre" @click="preBtn"></button>
				<button class="next" @click="nextBtn"></button>
				<!-- <div class="swiper-container">
          <div class="swiper-wrapper">
            <div :class="['swiper-slide','reward',`reward${index}`]" v-for="(item,index) in stepArr" :key="index">
              <p>{{item}}</p>
            </div>
          </div>
				</div>-->
			</div>
		</section>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import $ from "jquery";
	import Swiper from "swiper";
	import { updateReward } from "../../api";
	import { isLogin } from "../../common/utils";
	import "../swipe1/swiper.scss";
	declare var CONFIG: Object;
	export default Vue.extend({
		name: "gifts",
		props: {
			propsGiftsed: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				giftsed: false,
				swiper: Object,
				rewardArr: [
					" Computer*1",
					"Energie*200",
					"Epischer Beutel*1",
					"Epische VM*1"
				],
				stepArr: [
					"1.Gehen Sie ins Interface zum Herunterladen ",
					"2.Herunterladen, aber noch NICHT anmelden",
					"3. Sobald die Aktualisierung beendet ist, kannst du dich anmelden",
					"4. Die Geschenke auf dieser Seite einfordern ['Sofort erhalten'-Button]. Die Geschenke werden in dein Postfach gesendet."
				]
			};
		},
		watch: {
			propsGiftsed(newValue, oldValue) {
				this.giftsed = newValue;
			}
		},
		mounted() {
			var mySwiper = new Swiper(".swiper-step", {
				pagination: ".paginationStep",
				paginationClickable: true,
				autoplayDisableOnInteraction: false,
				slidesPerView: 2,
				loop: true,
				autoplay: 4000
			});
			this.swiper = mySwiper;
		},
		methods: {
			preBtn() {
				let swiper_: any = this.swiper;
				swiper_.swipePrev();
			},
			nextBtn() {
				let swiper_: any = this.swiper;
				swiper_.swipeNext();
			},
			async getReward(msg, flag) {
				if (isLogin()) {
					let data: any = await updateReward(msg);
					if (data) {
						if (!flag) {
							Vue.prototype.$dialog.show(
								"tip",
								window._RG.config["tip"].code_200
							);
							this.giftsed = true;
						} else if (flag == "android") {
							Vue.prototype.$dialog.show(
								"tip",
								"Herunterladungsveranstaltung ist beendet, Bitte erhalte deine Geschenke"
							);
							// window.location.href = "https://pkde.pocketgamesol.com/activity/apk-tip/index.html"
						} else if (flag == "ios") {
							Vue.prototype.$dialog.show(
								"tip",
								"Herunterladungsveranstaltung ist beendet, Bitte erhalte deine Geschenke"
							);
							// window.location.href = "https://pkde.pocketgamesol.com/ios_download_guide/index.html"
						}
					}
				} else {
					this.$emit("hide", true);
				}
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
		.giftsBox {
			width: 1200px;
			height: 1345px;
			margin: auto;
			position: relative;
			// border: 1px solid yellow;
			.tit {
				width: 1295px;
				height: 104px;
				margin-left: -47.5px;
				background: url("./img/tit1.png") no-repeat center;
			}
			.txt {
				color: #ffffff;
				font-size: 20px;
				text-align: center;
			}
			.gifts {
				width: 1362px;
				height: 1183px;
				margin-left: -81px;
				overflow: hidden;
				background: url("./img/rewardBoxBg.png");
				background-position: 0 -15px;
				.giftsTop {
					width: 1120px;
					height: 400px;
					margin: 90px auto 0 auto;
					// border: 1px solid;
					.IconBox {
						width: 220px;
						height: 390px;
						float: left;
						// border: 1px solid;
						.icon {
							width: 200px;
							height: 200px;
							margin-left: 10px;
							margin-top: 10px;
							display: inline-block;
							background: url("./img/rewardIcon.png");
						}
						.ios {
							width: 183px;
							height: 60px;
							margin-left: 18.5px;
							margin-top: 30px;
							display: inline-block;
							background: url("./img/ios.png");
							cursor: pointer;
						}
						.android {
							width: 185px;
							height: 62px;
							margin-top: 15px;
							margin-left: 18px;
							display: inline-block;
							background: url("./img/android.png");
							cursor: pointer;
						}
					}
					.rewardBox {
						width: 883px;
						height: 385px;
						float: right;
						border: 2px solid rgb(98, 193, 255);
						.reward {
							width: 194px;
							height: 236px;
							margin: 26px 13px;
							float: left;
							color: white;
							position: relative;
							font-size: 20px;
							background: url("./img/rewardBg.png");
							.reward0 {
								width: 130px;
								height: 132px;
								display: inline-block;
								margin-left: 31px;
								margin-top: 20px;
								background: url("./img/reward1.png");
							}
							.reward1 {
								width: 80px;
								height: 108px;
								display: inline-block;
								margin-left: 57px;
								margin-top: 40px;
								background: url("./img/reward2.png");
							}
							.reward2 {
								width: 131px;
								height: 124px;
								display: inline-block;
								margin-left: 31.5px;
								margin-top: 20px;
								background: url("./img/reward3.png");
							}
							.reward3 {
								width: 98px;
								height: 95px;
								display: inline-block;
								margin-left: 48px;
								margin-top: 40px;
								background: url("./img/reward4.png");
							}
							p {
								width: 100%;
								text-align: center;
								position: absolute;
								bottom: 13px;
							}
						}
						.reward:nth-child(1) {
							background: url("./img/rewardBgda.png");
						}
						.joinBtn,
						.joinBtned {
							width: 247px;
							height: 65px;
							margin-left: 319px;
							margin-top: 10px;
							background: url("./img/joinbtn.png");
						}
						.joinBtned {
							background: url("./img/joinbtned.png");
						}
					}
				}
				.giftsBottom {
					width: 1120px;
					height: 560px;
					margin: 10px auto 0 auto;
					// border: 1px solid;
					.reward {
						width: 268px;
						height: 472px;
						margin: 0px 8px;
						float: left;
						color: white;
						position: relative;
						font-size: 20px;
						background: url("./img/rewardBg.png");
						p {
							width: 100%;
							text-align: center;
							position: absolute;
							top: 482px;
							font-size: 18px;
							min-height: 46px;
						}
					}

					.reward0 {
						margin-left: 0;
						background: url("./img/step1.png");
					}
					.reward1 {
						background: url("./img/step2.png");
					}
					.reward2 {
						background: url("./img/step3.png");
					}
					.reward3 {
						margin-right: 0;
						background: url("./img/step4.png");
					}
				}
				.m_giftsBottom {
					display: none;
				}
			}
		}
	}
	@include mq($mobile) {
		.giftsBox {
			width: 100%;
			height: 1500px;
			margin: auto;
			position: relative;
			// border: 1px solid yellow;
			.tit {
				width: 750px;
				height: 153px;
				margin-left: -55px;
				background: url("./img/m_tit1.png") no-repeat center;
			}
			.txt {
				width: 100%;
				color: #ffffff;
				font-size: 20px;
				margin-top: -30px;
				text-align: center;
			}
			.gifts {
				width: 750px;
				height: 1285px;
				margin-left: -55px;
				overflow: hidden;
				background: url("./img/m_rewardBoxBg.png");
				.giftsTop {
					width: 690px;
					height: 560px;
					margin: 75px auto 0 auto;
					// border: 1px solid red;
					.IconBox {
						width: 640px;
						height: 250px;
						margin: auto;
						// border: 1px solid;
						position: relative;
						.icon {
							width: 200px;
							height: 200px;
							margin-left: 90px;
							margin-top: 10px;
							display: inline-block;
							background: url("./img/rewardIcon.png");
						}
						.ios {
							width: 183px;
							height: 60px;
							margin-left: 18.5px;
							margin-top: 30px;
							display: inline-block;
							background: url("./img/ios.png");
							cursor: pointer;
							position: absolute;
							top: 10px;
							left: 315px;
						}
						.android {
							width: 185px;
							height: 62px;
							margin-top: 15px;
							margin-left: 18px;
							display: inline-block;
							background: url("./img/android.png");
							cursor: pointer;
							position: absolute;
							top: 105px;
							left: 315px;
						}
					}
					.rewardBox {
						width: 640px;
						height: 295px;
						margin: auto;
						border: 2px solid rgb(98, 193, 255);
						.reward {
							width: 148px;
							height: 165px;
							margin: 26px 6px;
							float: left;
							color: white;
							position: relative;
							font-size: 14px;
							background: url("./img/m_rewardBg.png");
							.reward0 {
								width: 104px;
								height: 98px;
								display: inline-block;
								margin-left: 22px;
								margin-top: 20px;
								background: url("./img/m_reward1.png");
							}
							.reward1 {
								width: 65px;
								height: 82px;
								display: inline-block;
								margin-left: 41.5px;
								margin-top: 25px;
								background: url("./img/m_reward2.png");
							}
							.reward2 {
								width: 99px;
								height: 87px;
								display: inline-block;
								margin-left: 25px;
								margin-top: 20px;
								background: url("./img/m_reward3.png");
							}
							.reward3 {
								width: 74px;
								height: 66px;
								display: inline-block;
								margin-left: 37.5px;
								margin-top: 30px;
								background: url("./img/m_reward4.png");
							}
							p {
								width: 100%;
								text-align: center;
								position: absolute;
								bottom: 13px;
							}
						}
						.reward:nth-child(1) {
							background: url("./img/m_rewardBgda.png");
						}
						.joinBtn,
						.joinBtned {
							width: 247px;
							height: 65px;
							margin-left: 198.5px;
							background: url("./img/joinbtn.png");
						}
						.joinBtned {
							background: url("./img/joinbtned.png");
						}
					}
				}
				.giftsBottom {
					display: none;
				}
				.m_giftsBottom {
					width: 580px;
					height: 530px;
					margin: 10px auto 0 auto;
					margin-top: 20px;
					position: relative;
					.reward {
						width: 256px;
						height: 145px;
						position: relative;
						p {
							color: #ffffff;
							width: 100%;
							text-align: center;
							position: absolute;
							top: 470px;
							min-height: 46px;
						}
					}
					.reward0 {
						margin-left: 0;
						background: url("./img/m_step1.png") no-repeat center 0;
					}
					.reward1 {
						background: url("./img/m_step2.png") no-repeat center 0;
					}
					.reward2 {
						background: url("./img/m_step3.png") no-repeat center 0;
					}
					.reward3 {
						margin-right: 0;
						background: url("./img/m_step4.png") no-repeat center 0;
					}
					.pre {
						width: 50px;
						height: 55px;
						background: url("./img/m_pre.png");
						position: absolute;
						top: 200px;
						left: -37px;
					}
					.next {
						width: 50px;
						height: 55px;
						background: url("./img/m_next.png");
						position: absolute;
						top: 200px;
						right: -37px;
					}
				}
			}
		}
	}
</style>
