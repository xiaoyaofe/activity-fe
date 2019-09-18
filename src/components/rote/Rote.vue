<template>
	<div class="roteBox">
		<p class="tit"></p>
		<!-- 转盘 -->
		<div class="roteBg"></div>
		<button :disabled="isTrue" class="rote" @click="roteBtnClick"></button>
		<div class="roteInfo">
			<p class="allDiamondTxt">
				Total des diamants dépensés
				<br>
				{{allDiamond}}
			</p>
			<p class="remainCount">Nombre total de tirages: {{remainCount}}</p>
			<p class="allCount">Nombre de tirages restants: {{allCount}}</p>
		</div>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import $ from "jquery";
	import "../../plugins/jQueryRotate.js";
	import { isLogin } from "../../common/common";
	import { getAllHistory, roteJoin, roteCdkeys } from "../../common/api";

	declare var FB: any;
	declare var CONFIG: any;
	export default Vue.extend({
		name: "Rote",
		data() {
			return {
				text: CONFIG,
				isTrue: false, //轉盤按鈕是否可點擊
				allDiamond: 0,
				remainCount: 0,
				allCount: 0
			};
		},
		methods: {
			// 点击转盘
			roteBtnClick() {
				// if (isLogin()) {
				// let data: any = await roteJoin(false);
				// if (data && data.code == 200) {
				// var index = CONFIG["data"].rewardId.rotate.indexOf(data.state.rewardId) < 0 ? 3 : CONFIG["data"].rewardId.rotate.indexOf(data.state.rewardId);
				var index = 0;
				// this.isTrue = true;
				// $(".roteBg").rotate({
				//   angle: 0,
				//   duration: 3000,
				//   animateTo: 360 * 5 + (9 - index) * 40 + 20,
				//   callback: () => {
				//     // this.isTrue = false;
				//     // if (data.state.cdKey != "null") {
				//     //   Vue.prototype.$dialog.show("cdKeys", [data.state]);
				//     // } else {
				//     Vue.prototype.$dialog.show("tip", CONFIG["tip"].code_200);
				//     // }
				//   }
				// });
			}
			// } else {
			// this.$emit("hide", true);
			// }
			// }
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
		.roteBox {
			width: 100%;
			height: 1355px;
			position: relative;
			background-position: center 340px;
			.tit {
				width: 100%;
				height: 243px;
				background: url("./img/tit3.png") no-repeat center;
			}
			.mobileTxt {
				display: none;
			}
			.roteBg {
				width: 624px;
				height: 624px;
				margin-top: 200px;
				margin-left: 288px;
				background: url("./img/rodeBg.png") no-repeat;
			}
			.roteInfo {
				.remainCount,
				.allDiamondTxt,
				.allCount {
					width: 400px;
					color: #1560a5;
					font-size: 26px;
					font-weight: bold;
					position: absolute;
					text-align: center;
				}
				.allDiamondTxt {
					top: 666px;
					left: -115px;
				}
				.remainCount {
					top: 666px;
					right: -169px;
					width: 450px;
					text-align: left;
				}
				.allCount {
					top: 710px;
					right: -169px;
					width: 450px;
					text-align: left;
				}
			}
			.rote {
				width: 155px;
				height: 178px;
				background: url("./img/roteBtn.png") no-repeat;
				float: left;
				position: relative;
				margin-top: -415px;
				margin-left: 522.5px;
			}
		}
	}
	@include mq($mobile) {
		.roteBox {
			width: 100%;
			height: 1280px;
			position: relative;
			background-size: 674px 733px;
			background-position: center 410px;
			overflow: hidden;
			.tit {
				width: 100%;
				height: 336px;
				background: url("./img/m_tit3.png") no-repeat center;
				background-size: 100%;
			}

			.roteBg {
				width: 640px;
				height: 640px;
				margin-top: 129px;
				margin-left: 0;
				background: url("./img/rodeBg.png") no-repeat;
				background-size: contain;
			}
			.rote {
				width: 155px;
				height: 178px;
				position: absolute;
				top: 682px;
				left: 243px;
				background: url("./img/roteBtn.png") no-repeat;
				background-size: contain;
			}
			.roteInfo {
				.remainCount,
				.allDiamondTxt,
				.allCount {
					width: 400px;
					color: #ff4174;
					font-size: 22px;
					font-weight: bold;
					position: absolute;
					text-align: center;
				}
				.allDiamondTxt {
					top: 332px;
					left: -65px;
					font-size: 28px;
				}
				.remainCount {
					top: 336px;
					right: -169px;
					width: 450px;
					text-align: left;
				}
				.allCount {
					top: 360px;
					right: -169px;
					width: 450px;
					text-align: left;
				}
			}
		}
	}
</style>
