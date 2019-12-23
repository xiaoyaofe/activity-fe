<template>
	<Activity :class="className" :desc="desc">
		<!-- 转盘描述 -->
		<div :class="className+'__turn-text'">
			<p :class="className+'__nums'">
				Total des diamants dépensés:
				<span :class="className+'__nums-txt'">{{diamondNum}}</span>
			</p>
			<p :class="className + '__giftDiamond'">
				Nombre de tirages restants:
				<span :class="className + '__diamondNum'">{{nums}}</span>
			</p>
		</div>
		<!-- 转盘 -->
		<div :class="className+'__pannel clearfix'">
			<div :class="className+'__pannel__bg'" ref="rotateBg"></div>
			<div :class="className+'__pannel__start-btn'" v-tap="{methods:rotatehandle}"></div>
		</div>
	</Activity>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { infoActivity, joinActivity } from "@/api";
	import { animate } from "../../../common/utils/";
	import Activity from "@/components/base/Activity.vue";

	export default Vue.extend({
		name: "DiamondWheel",
		components: {
			Activity
		},
		props: {
			className: {
				type: String,
				required: true
			},
			desc: String,
			isGetHistory: Boolean
		},
		data() {
			return {
				disabled: false,
				nums: 0,
				diamondNum: 0
			};
		},
		methods: {
			rotatehandle: async function() {
				if (!isLogin()) return this.$emit("showLogin", true);
				if (this.disabled) return;
				this.disabled = true;
				let data: any = await joinActivity("rotate", 0).catch(err => {
					this.$dialog.show("tip", window._RG.config.tip.rotate1000);
					// console.log(err);
				});
				if (data) {
					// const data = { rewardId: "5de62b48b5cb671f40c7d44d" };
					const rewardIndex = window._RG.config.data.rewardId.rotate.indexOf(
						data.rewardId
					);
					const bg: HTMLElement = this.$refs.rotateBg as any;
					animate(bg).velocity({ rotateZ: 0 }, { duration: 0 });
					animate(bg).velocity(
						{ rotateZ: 360 * 5 + (7 - rewardIndex) * 45 + 22.5 },
						{
							duration: 3000,
							easing: "easeInOutQuad",
							complete: () => {
								this.disabled = false;
								this.nums -= 1;
								this.$dialog.show(
									"tip",
									window._RG.config.tip.rotate200.replace(/x+/, data.rewardName)
								);
							}
						}
					);
				} else {
					this.disabled = false;
				}
			},
			getInfo(isloading?: boolean) {
				// 请求钻石数这些参数
				infoActivity("rotate", 0, isloading).then((state: any) => {
					// console.log(state);
					if (state) {
						this.diamondNum = state.data.consume;
						this.nums = state.data.userSumCount - state.data.useCount;
					}
				});
			}
		},
		watch: {
			isGetHistory: function() {
				//转盘信息的初始化
				this.getInfo();
			}
		}
	});
</script>