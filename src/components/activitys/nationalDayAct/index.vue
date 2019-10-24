<template>
	<div class="nationalDayAct">
		<div class="title"></div>
		<section class="rewardBox">
			<div v-for="(item,index) in 5" :key="index" :class="["reward",`reward${index}`]">
				<!-- <div class="iconBox" >
          <span :class="['icon',`leftIcon${index}`]"></span>
          <span :class="['icon',`rightIcon${index}`]"></span>
        </div>
        <div  :class="['pet',`pet${index}`]" ></div>
				<div  :class="['light',`light${index}`]"></div>-->
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
	import { isLogin } from "@/common/utils";
	import { joinActivity } from "@/api";
	declare var CONFIG: any;
	export default Vue.extend({
		name: "national",
		props: ["cdkeyList"],
		data() {
			return {
				data: CONFIG,
				isReceive: [false, false, false, false, false]
			};
		},
		watch: {
			// 设置按钮状态
			cdkeyList(newValue, oldValue) {
				for (let index = 0; index < this.isReceive.length; index++) {
					if (this.cdkeyList.includes(CONFIG.data.rewardId.login[index])) {
						this.$set(this.isReceive, index, true);
					}
				}
			}
		},
		methods: {
			async JoinBtn(index) {
				if (isLogin()) {
					let data: any = await joinActivity("login", index);
					if (data) {
						// this.isReceive.splice(index, 1, true);
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
		.nationalDayAct {
			width: 100%;
			height: 585px;
			margin: auto;
			position: relative;
			.title {
				width: 100%;
				height: 174px;
				margin: auto;
				background: url("../../assets/20190913/pc/tit1.png") no-repeat center;
			}
			.rewardBox {
				width: 1072px;
				height: 341px;
				margin: auto;
				background: url("../../assets/20190913/pc/tit1bg.png") no-repeat top;
				.reward {
					width: 200px;
					height: 45px;
					float: left;
					position: relative;
					padding-top: 245px;
					.joinBtn {
						width: 140px;
						height: 46px;
						display: block;
						margin: auto;
						background: url("../../assets/20190913/pc/tit1Joinbtn.png") no-repeat
							center;
					}
					.joinBtned {
						width: 140px;
						height: 46px;
						display: block;
						margin: auto;
						background: url("../../assets/20190913/pc/tit1Joinbtned.png")
							no-repeat center;
					}
				}
				.reward0 {
					margin-left: 28px;
				}
				.reward1 {
					width: 212px;
				}
				.reward2,
				.reward3 {
					width: 210px;
				}
			}
		}
	}
	@include mq($mobile) {
		.nationalDayAct {
			width: 100%;
			height: 828px;
			margin: auto;
			position: relative;
			.title {
				width: 667px;
				height: 212px;
				margin-left: -13.5px;
				background: url("./img/m_tit1.png") no-repeat center;
			}
			.rewardBox {
				width: 100%;
				height: 585px;
				padding-top: 30px;
				position: relative;
				background: url("./img/m_tit1Bg.png") no-repeat center 10px;
				.reward {
					width: 200px;
					height: 45px;
					position: absolute;
					padding-top: 248px;
					.joinBtn {
						width: 130px;
						height: 45px;
						display: block;
						margin: auto;
						background: url("./img/m_tit1JoinBtn.png") no-repeat;
					}
					.joinBtned {
						width: 130px;
						height: 45px;
						display: block;
						margin: auto;
						background: url("./img/m_tit1JoinBtned.png") no-repeat;
					}
				}
				.reward0 {
					top: 0;
					left: 21px;
				}
				.reward1 {
					top: 0;
					left: 229px;
				}
				.reward2 {
					top: 0;
					left: 436px;
				}
				.reward3 {
					top: 320px;
					left: 127px;
				}
				.reward4 {
					top: 320px;
					left: 328px;
				}
			}
		}
	}
</style>

