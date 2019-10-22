<template>
	<div class="resharageAct">
		<div class="title"></div>
		<section class="rewardBox">
			<div :class="['reward',`reward${index}`]" v-for="(item,index) in 3" :key="index">
				<!-- <button class="joinBtn" @click="JoinBtn(index)"></button> -->
				<button
					:disabled="isReceive[index]"
					:class="isReceive[index]?'joinBtned':'joinBtn'"
					@click="JoinBtn(index)"
				></button>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "../../common/utils";
	import { getRecharge } from "../../api";
	declare var CONFIG: any;
	export default Vue.extend({
		name: "rechargeAct",
		props: ["cdkeyList"],
		data() {
			return {
				data: CONFIG,
				isReceive: [false, false, false]
			};
		},
		watch: {
			// 设置按钮状态
			cdkeyList(newValue, oldValue) {
				for (let index = 0; index < this.isReceive.length; index++) {
					if (this.cdkeyList.includes(CONFIG.data.rewardId.rotate[index])) {
						this.$set(this.isReceive, index, true);
					}
				}
			}
		},
		methods: {
			async JoinBtn(index) {
				if (isLogin()) {
					let data: any = await getRecharge("rotate", index);
					if (data) {
						this.$set(this.isReceive, index, true);
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
		.resharageAct {
			width: 100%;
			height: 735px;
			margin: auto;
			position: relative;
			// border: 1px solid yellow;
			.title {
				width: 100%;
				height: 336px;
				margin: auto;
				background: url("../../assets/201907012/pc/P-tit2.png") no-repeat center;
			}
			.rewardBox {
				width: 100%;
				height: 330px;
				margin-top: 40px;
				// border: 1px solid;
				.reward {
					width: 400px;
					height: 329px;
					float: left;
				}
				.reward0 {
					background: url("../../assets/201907012/pc/P-act2-l1.png") no-repeat
						center;
				}
				.reward1 {
					background: url("../../assets/201907012/pc/P-act2-l2.png") no-repeat
						center;
				}
				.reward2 {
					background: url("../../assets/201907012/pc/P-act2-l3.png") no-repeat
						center;
				}
				.joinBtn,
				.joinBtned {
					width: 203px;
					height: 90px;
					margin-left: 98.5px;
					margin-top: 218px;
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
		.resharageAct {
			width: 100%;
			height: 1020px;
			margin: auto;
			position: relative;
			// border: 1px solid blue;
			.title {
				width: 722px;
				height: 369px;
				margin-left: -41px;
				background: url("../../assets/201907012/mb/M-tit2.png") no-repeat center;
			}
			.rewardBox {
				width: 100%;
				height: 600px;
				margin-top: 40px;
				// border: 1px solid;
				position: relative;
				.reward {
					width: 331px;
					height: 282px;
					position: absolute;
					// float: left;
				}
				.reward0 {
					top: 0;
					left: -15px;
					background: url("../../assets/201907012/mb/M-act2-l1.png") no-repeat
						center;
				}
				.reward1 {
					top: 0;
					right: -15px;
					background: url("../../assets/201907012/mb/M-act2-l2.png") no-repeat
						center;
				}
				.reward2 {
					top: 310px;
					left: 154.5px;
					background: url("../../assets/201907012/mb/M-act2-l3.png") no-repeat
						center;
				}
				.joinBtn,
				.joinBtned {
					width: 158px;
					height: 72px;
					margin-left: 86.5px;
					margin-top: 190px;
				}
				.joinBtn {
					background: url("../../assets/201907012/pc/P-actBtn.png") no-repeat;
					background-size: contain;
				}
				.joinBtned {
					background: url("../../assets/201907012/pc/P-actBtned.png") no-repeat;
					background-size: contain;
				}
			}
		}
	}
</style>

