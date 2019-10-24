<template>
	<div class="oldPlayerAct">
		<div class="title"></div>
		<div class="rewardBox">
			<section class="reward"></section>
			<!-- <button class="joinBtn"></button> -->
			<button :disabled="isReceive" :class="isReceive?'joinBtned':'joinBtn'" @click="JoinBtn"></button>
		</div>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { joinActivity } from "@/api";
	declare var CONFIG: any;
	export default Vue.extend({
		name: "oldPlayer",
		props: ["cdkeyList"],
		data() {
			return {
				isReceive: false
			};
		},
		watch: {
			// 设置按钮状态
			cdkeyList(newValue, oldValue) {
				if (this.cdkeyList.includes(CONFIG.data.rewardId.oldPlayer[0])) {
					this.isReceive = true;
				}
			}
		},
		methods: {
			async JoinBtn() {
				if (isLogin()) {
					let data: any = await joinActivity("oldPlayer", 0);
					if (data) {
						this.isReceive = true;
						Vue.prototype.$dialog.show("tip", CONFIG["tip"].code_200);
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
		.oldPlayerAct {
			width: 100%;
			height: 730px;
			margin: auto;
			position: relative;
			// border: 1px solid green;
			.title {
				width: 100%;
				height: 318px;
				margin: auto;
				background: url("../../assets/201907012/pc/P-tit3.png") no-repeat center;
			}
			.rewardBox {
				width: 100%;
				height: 360px;
				margin-top: 40px;
				// border: 1px solid;
				.reward {
					width: 889px;
					height: 220px;
					margin: auto;
					margin-top: 20px;
					background: url("../../assets/201907012/pc/P-act3-l.png") no-repeat;
				}
				.joinBtn,
				.joinBtned {
					width: 203px;
					height: 90px;
					margin-left: 498.5px;
					margin-top: 20px;
				}
				.joinBtn {
					background: url("../../assets/201907012/pc/P-actBtn.png") no-repeat;
				}
				.joinBtned {
					background: url("../../assets/201907012/pc/P-actBtned.png") no-repeat;
				}
			}
		}
	}
	@include mq($mobile) {
		.oldPlayerAct {
			width: 100%;
			height: 1060px;
			margin: auto;
			position: relative;
			// border: 1px solid green;
			.title {
				width: 722px;
				height: 390px;
				margin-left: -41px;
				background: url("../../assets/201907012/mb/M-tit3.png") no-repeat center;
			}
			.rewardBox {
				width: 100%;
				height: 360px;
				margin-top: 40px;
				// border: 1px solid;
				.reward {
					width: 636px;
					height: 442px;
					margin: auto;
					margin-top: 20px;
					background: url("../../assets/201907012/mb/M-act3-l.png") no-repeat;
				}
				.joinBtn,
				.joinBtned {
					width: 203px;
					height: 90px;
					margin-left: 218.5px;
					margin-top: 30px;
				}
				.joinBtn {
					background: url("../../assets/201907012/pc/P-actBtn.png") no-repeat;
				}
				.joinBtned {
					background: url("../../assets/201907012/pc/P-actBtned.png") no-repeat;
				}
			}
		}
	}
</style>

