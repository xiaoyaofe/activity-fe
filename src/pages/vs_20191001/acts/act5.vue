
<template>
	<section id="act5">
		<div class="act5-title">
			<p class="act5_moreBtn" v-tap="{methods:toggleMore}">查看更多</p>
			<div v-if="isShowMore" class="act5_more">
				<div class="act5_more_close" v-tap="{methods:toggleMore}"></div>
			</div>
		</div>
		<div class="act5-content">
			<div
				:class="['act5-gifts','act5-gifts' + index, {act5GiftActive:activeArr[index-1]}]"
				v-for="index in 30"
				:key="index"
			>
				<div :class="['act5-gift','act5-gift' + index]"></div>
			</div>
			<div class="act5_dice_wrap">
				<div
					ref="dice"
					:class="['act5_dice','act5_dice_'+diceIndex, animalClasses]"
					:style="{cursor:cursor}"
					v-tap="{methods:playDice}"
				></div>
				<div class="act5_dice_mask" v-if="isShowDiceMark"></div>
			</div>
			<div class="act5_desc">
				当前骰子次数：
				<span class="act5_desc_span">{{restCount}}</span>
			</div>
			<div class="egg_wrap">
				<div ref="egg" class="act5_eggs" v-tap="{methods:playEgg}"></div>
				<div
					ref="eggGift"
					:class="['act5_egg_gift','act5_egg_gift'+eggGiftIndex]"
					v-tap="{methods:initEgg}"
				></div>
			</div>
			<div class="act5_desc act5_desc1">
				当前彩蛋数量：
				<span class="act5_desc_span">{{specialCount}}</span>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from "vue";
	import * as Velocity from "velocity-animate/velocity";
	import { isLogin } from "@/common/common";
	import { joinFlightChess } from "@/common/api";
	import { setTimeout, setInterval } from "timers";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
			$isPc: boolean;
		}
	}

	export default Vue.extend({
		name: "Act5",
		components: {},
		props: {
			isGetHistory: {
				type: Boolean,
				required: true
			}
		},
		data() {
			const activeArr: boolean[] = [true];
			for (let i = 1; i < 30; i++) {
				activeArr.push(false);
			}
			return {
				isShowMore: false,
				isPc: this.$isPc,
				// 骰子的点数
				diceIndex: 1,
				// 筛子遮罩
				isShowDiceMark: false,
				cursor: "pointer",
				animalClasses: "",
				// 彩蛋数量
				specialCount: 0,
				// 当前步数
				currentStep: 1,
				// 剩余次数
				restCount: 0,
				activeArr: activeArr,
				timer: setTimeout(() => {}, 200),
				lastStep: 1,
				eggGiftIndex: 0
			};
		},
		computed: {},
		methods: {
			showLogin(val) {
				this.$emit("showLogin", val);
			},
			playEgg() {
				if (isLogin()) {
					joinFlightChess(2).then((res: any) => {
						if (res) {
							console.log(res);
							// rewardName,rewardId
							this.specialCount = res.specialCount;
							this.restCount = res.restCount;
							this.currentStep = res.currentStep;
							this.eggGiftIndex =
								window._RG.config.data.rewardId.flightChess.indexOf(
									res.rewardId
								) - 29;
							this.eggAnimate();
						}
					});
				} else {
					this.$emit("showLogin", true);
				}
			},
			playDice() {
				if (isLogin()) {
					joinFlightChess(1).then(async (res: any) => {
						if (res) {
							console.log(res);
							// rewardName,rewardId
							const currentStep = this.currentStep;
							this.lastStep = currentStep;
							this.specialCount = res.specialCount;
							this.restCount = res.restCount;
							this.currentStep = res.currentStep;
							console.log("init", this.lastStep, this.currentStep);
							await this.diceAnimate(res.dice);
							this.activeArr.splice(this.lastStep - 1, 1, false);
							const stepAct = (index: number) => {
								if (index < 1) {
									this.cursor = "pointer";
									this.isShowDiceMark = false;
									if (res.currentStep !== 1) {
										this.$dialog.show(
											"tip",
											window._RG.config.tip.code_200.replace(
												"禮包",
												res.rewardName
											)
										);
									} else {
										this.$dialog.show(
											"tip",
											window._RG.config.tip.code_200.replace(
												"禮包，請到遊戲內查收",
												res.rewardName
											)
										);
									}
									return;
								}
								this.activeArr.splice(this.lastStep - 1, 1, false);
								setTimeout(() => {
									this.activeArr.splice(this.lastStep, 1, true);
									index--;
									this.lastStep++;
									if (this.lastStep >= 30) this.lastStep = this.lastStep % 30;
									setTimeout(() => {
										stepAct(index);
									}, 200);
								}, 200);
							};
							stepAct(res.dice);
						}
					});
				} else {
					this.$emit("showLogin", true);
				}
			},
			async diceAnimate(index: number) {
				this.isShowDiceMark = true;
				this.diceIndex = 1;
				this.cursor = "default";
				Velocity(
					this.$refs.dice,
					{ left: "2px" },
					{
						duration: 100,
						complete: () => {
							this.animalClasses = "act5_dice_t";
						}
					}
				);
				return this.delay(200)
					.then(() => {
						Velocity(
							this.$refs.dice,
							{ top: "-2px" },
							{
								duration: 100,
								complete: () => {
									this.animalClasses = "act5_dice_s";
								}
							}
						);
						return this.delay(200);
					})
					.then(() => {
						return this.delay(100);
					})
					.then(() => {
						this.animalClasses = "act5_dice_e";
						return this.delay(50);
					})
					.then(() => {
						Velocity(
							this.$refs.dice,
							{ left: "-2px", top: "2px" },
							{
								duration: 100
							}
						);
						return this.delay(200);
					})
					.then(() => {
						Velocity(
							this.$refs.dice,
							{ left: "-2px" },
							{
								duration: 100,
								complete: () => {
									this.animalClasses = "act5_dice_s";
								}
							}
						);
						return this.delay(200);
					})
					.then(() => {
						Velocity(
							this.$refs.dice,
							{ top: "2px" },
							{
								duration: 100,
								complete: () => {
									this.animalClasses = "act5_dice_s";
								}
							}
						);
						return this.delay(100);
					})
					.then(() => {
						return this.delay(100);
					})
					.then(() => {
						this.animalClasses = "act5_dice_e";
						return this.delay(100);
					})
					.then(() => {
						return new Promise(resolve => {
							Velocity(
								this.$refs.dice,
								{ left: "2px", top: "-2px" },
								{
									duration: 100,
									complete: () => {
										this.diceIndex = index;

										this.animalClasses = "";
										resolve();
									}
								}
							);
						});
					});
			},
			delay(time: number) {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve();
					}, time);
				});
			},
			eggAnimate() {
				const egg = this.$refs.egg as HTMLElement;
				const gift = this.$refs.eggGift as HTMLElement;
				egg.style.transform = "rorateZ(0deg)";
				gift.style.display = "none";
				Velocity(
					egg,
					{ rotateZ: ["15deg", "-15deg"] },
					{
						duration: 180,
						loop: 3,
						easing: "linear",
						complete: () => {
							egg.style.transform = "rotateZ(0deg)";
							egg.style.transformOrigin = "center";
							// Velocity(
							// 	egg,
							// 	{ opacity: [0, 1] },
							// 	{
							// 		duration: 300,
							// 		complete: eles => {
							// 			egg.style.display = "none";
							// 		}
							// 	}
							// );
							// Velocity(
							// 	gift,
							// 	{ opacity: [1, 0], scale: [1, 0] },
							// 	{
							// 		duration: 800,
							// 		begin: eles => {
							// 			gift.style.display = "block";
							// 			gift.style.transformOrigin = "center";
							// 		}
							// 	}
							// );
						}
					}
				);
			},
			toggleMore() {
				const isShowMore = this.isShowMore;
				this.isShowMore = !isShowMore;
			},
			initEgg() {}
		},
		watch: {
			isGetHistory: function(newQuestion, oldQuestion) {
				joinFlightChess(0).then((res: any) => {
					if (res) {
						// console.log(res);
						this.specialCount = res.specialCount;
						this.restCount = res.restCount;
						this.currentStep = res.currentStep;
						this.lastStep = res.currentStep;
						// for (let i = 0; i < res.currentStep; i++) {
						// 	this.activeArr.splice(i, 1, true);
						// }
						this.activeArr.splice(0, 1, false);
						this.activeArr.splice(this.lastStep - 1, 1, true);
					}
				});
			}
		}
	});
</script>
<style lang="scss">
	@import "./act5.pc.scss";
	@import "./act5.mb.scss";
</style>