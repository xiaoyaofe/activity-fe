<template>
	<Activity :class="className" :desc="desc">
		<div :class="className+'__pannel clearfix'">
			<div :class="className+'__pannel__bg'" ref="rotateBg"></div>
			<div :class="className+'__pannel__start-btn'" v-tap="{methods:rotatehandle}"></div>
			<span :class="className+'__left-icon'"></span>
			<span :class="className+'__right-icon'"></span>
			<p :class="className+'__day-count'">
				剩余轉盤[
				<span :class="className+'__day-count__txt'">{{dayCount}}</span> ]次
			</p>
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
		name: "Wheel",
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
			// giftsCounts: {
			// 	type: Array,
			// 	required: true
			// }
		},
		data() {
			return {
				dayCount: 0,
				disabled: false,
				getGiftIndex: 0
			};
		},
		methods: {
			rotatehandle: async function() {
				if (!isLogin()) return this.$emit("showLogin", true);
				if (this.disabled) return;
				this.disabled = true;
				let data: any = await joinActivity("rotate", 0).catch(err => {
					this.$dialog.show("tip", window._RG.config.tip.rotate_1001);
				});
				if (data) {
					// infoActivity("rotate", 0).then((state: any) => {
					// 	console.log(state);
					// 	if (state) {
					// 		const info = state.data.userActivityResourceMap[state.dayKey];
					// 		this.sumCount = info.userSumCount;
					// 		this.dayCount = info.userSumCount - info.useCount;
					// 	}
					// });
					// const data = { rewardId: "5dca614ab5cb6718ac9ccdfc" };
					this.dayCount -= 1;
					const rewardIndex = window._RG.config.data.rewardId.rotate.indexOf(
						data.rewardId
					);
					const bg: HTMLElement = this.$refs.rotateBg as any;
					animate(bg).velocity({ rotateZ: 0 }, { duration: 0 });
					animate(bg).velocity(
						{ rotateZ: 360 * 5 + (11 - rewardIndex) * 30 + 15 },
						{
							duration: 3000,
							easing: "easeInOutQuad",
							complete: () => {
								this.disabled = false;
								this.$dialog.show(
									"tip",
									window._RG.config.tip.code_200.replace("$禮包", data.rewardName)
								);
							}
						}
					);
				} else {
					this.disabled = false;
				}
			},
			toogle({ key }) {
				if (!key && key !== 0) return;
				const flag = this[key];
				this[key] = !flag;
			}
		},
		watch: {
			isGetHistory: function() {
				infoActivity("rotate", 0).then((state: any) => {
					// console.log(state);
					if (state) {
						this.dayCount = state.data.userSumCount - state.data.useCount;
					}
				});
			}
		}
	});
</script>