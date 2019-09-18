<template>
	<!-- fixedBox -->
	<div class="fixedBox">
		<!-- pc导航 -->
		<ul id="anima" class="pc">
			<li class="goStep1" v-scroll-to="{el:`#scroll2`}"></li>
			<li class="goStep2" v-scroll-to="{el:`#scroll3`}"></li>
			<li class="goStep3" v-scroll-to="{el:`#scroll4`}"></li>
			<li class="goStep4" v-scroll-to="{el:`#scroll5`}"></li>
			<li>
				<a class="fans" target="_blank" href="https://www.facebook.com/TrainerBattle"></a>
			</li>
			<li class="goTop" v-scroll-to="{el:`#scroll1`}"></li>
			<button class="showNav" v-if="!isShowPacks" @click="showBtn"></button>
			<button class="hideNav" v-else @click="hideBtn"></button>
			<!-- <li v-for="(item,index) in 3" :key="index" v-scroll-to="{el:`#scroll${item}`}"></li> -->
		</ul>
		<!-- 移动端导航 -->
		<!-- <section class="mobile"></section> -->
	</div>
</template>
<script>
	// import * as $ from "jquery"
	export default {
		name: "navigation",
		data() {
			return {
				isShow: 1,
				activeIndex: 0,
				isShowPacks: true
			};
		},
		// created() {
		//   window.addEventListener("scroll", this.isScroll);
		// },
		methods: {
			showBtn() {
				/* 	$("#anima").animate({ right: "0px" }, () => {
						this.isShowPacks = true;
					}); */
			},
			hideBtn() {
				/* $("#anima").animate({ right: "-190px" }, () => {
					this.isShowPacks = false;
				}); */
			},
			/****************************************************************/
			// isScroll(ev) {
			//   var scrollTop =
			//     document.documentElement.scrollTop ||
			//     window.pageYOffset ||
			//     document.body.scrollTop;
			//   if (scrollTop >= 0 && scrollTop < 932) {
			//     this.activeIndex = 0;
			//   } else if (scrollTop >= 932 && scrollTop < 2322) {
			//     this.activeIndex = 1;
			//   } else if (scrollTop >= 2322) {
			//     this.activeIndex = 2;
			//   }
			// },
			packsAnimate($event, width) {
				if (this._packAnimate) return;
				let packWrap = $event.target.parentNode;
				let right = this.isShowPacks ? 0 : -width;
				let t = this.isShowPacks ? -8 : 8;
				this._packAnimate = true;
				this.isShow = !this.isShow
				let timer = setInterval(() => {
					right += t;
					if (-1 * right > width || right > 0) {
						clearInterval(timer);
						right = right < 0 ? -width : 0;
						this.isShowPacks = !this.isShowPacks;
						this._packAnimate = false;
					}
					packWrap.style.right = right + "px";
				}, 20);
			}
		}
	};
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
		.mobile {
			display: none;
		}
		.pc {
			width: 190px;
			height: 566px;
			display: block;
			padding-top: 200px;
			position: fixed;
			top: 330px;
			right: 0;
			z-index: 9;
			background: url("./img/fixedBg.png") no-repeat;
			// border: 1px solid;
			.goTop,
			.goStep1,
			.goStep2,
			.goStep3,
			.goStep4,
			.fans {
				width: 155px;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border: 1px solid red;
			}
			.goTop {
				height: 80px;
				margin-top: 15px;
			}
			.goStep4 {
				height: 45px;
			}
			.fans {
				height: 45px;
				display: inline-block;
			}
			.google {
				background: url("./img/p-androidLink.png") no-repeat;
				margin-top: 180px;
			}
			.ios {
				background: url("./img/p-iosLink.png") no-repeat;
			}
			.showNav,
			.hideNav {
				width: 31px;
				height: 41px;
				// background: url("./img/show.png");
				border: 1px solid red;
				position: absolute;
				top: 330px;
				left: -25px;
			}
			.hideNav {
				border: 1px solid red;
			}
		}
	}
	@include mq($mobile) {
		.pc {
			display: none;
			//     display: block;
			//     width: 74px;
			//     height: 372px;
			//     position: fixed;
			//     top: 100px;
			//     right: 0;
			//     z-index: 9;
			//     background: url("./img/fixedBg.png");
			//     li {
			//       width: 66px;
			//       height: 66px;
			//       // border: 1px solid red;
			//       border-radius: 50%;
			//       position: absolute;
			//       left: 3px;
			//       cursor: pointer;
			//     }
			//     li:nth-child(1) {
			//       width: 52px;
			//       height: 52px;
			//       top: 20px;
			//       left: 10px;
			//       a {
			//         width: 52px;
			//         height: 52px;
			//         display: inline-block;
			//       }
			//     }
			//     li:nth-child(2) {
			//       top: 95px;
			//     }
			//     li:nth-child(3) {
			//       top: 179px;
			//     }
			//     li:nth-child(4) {
			//       top: 263px;
			//     }
			//   }
			//   .mobile {
			//     display: none;
			//     width: 100%;
			//     height: 155px;
			//     background: #2c1206;
			//     position: fixed;
			//     top: 0px;
			//     right: 0;
			//     z-index: 9;
		}
	}
</style>
