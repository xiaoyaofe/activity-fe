<template>
	<Activity :class="className" :desc="desc">
		<div :class="className+'__btn-all-gift btn-relative'" v-tap="{methods:toogle,key:'isShowGifts'}"></div>
		<div :class="className+'__pannel clearfix'">
			<p :class="className+'__pannel__sum-count'">{{sumCount}}</p>
			<div :class="className+'__pannel__bg'" ref="rotateBg"></div>
			<div :class="className+'__pannel__start-btn'" v-tap="{methods:rotatehandle}"></div>
			<p :class="className+'__pannel__day-count'">{{dayCount}}</p>
		</div>
		<div v-if="isShowGifts" :class="className+'__gifts-wrap'">
			<span class="close" v-tap="{methods:toogle,key:'isShowGifts'}"></span>
			<p :class="className+'__gifts__title'">'ยินดีด้วยที่ได้รับรางวัลต่อไปนี้'</p>
			<ul :class="className+'__gifts clearfix'">
				<li
					v-for="(value,index) in giftBaseCounts"
					:class="[className+'__gift',className+'__gift--'+(index+1)]"
					:key="className+'__gift--'+index"
				>
					<p :class="className+'__gift__count'">{{"x " + value * giftBaseCounts1[index]}}</p>
				</li>
			</ul>
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
			isGetHistory: Boolean,
			giftsCounts: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				dayCount: 0,
				sumCount: 0,
				disabled: false,
				giftCounts: [0, 0, 0, 0, 0, 0, 0, 0],
				giftBaseCounts1: [50, 10, 20, 10, 3, 2, 2, 1000],
				getGiftIndex: 0,
				isShowGifts: false
			};
		},
		computed: {
			giftBaseCounts(): number[] {
				const giftsCountArr = [];

				const arr = this.$props.giftsCounts;
				console.log(arr);
				const result = this.giftCounts.map((count, index) => {
					return count + arr[index];
				});
				return result;
			}
		},
		methods: {
			rotatehandle: async function() {
				if (!isLogin()) return this.$emit("showLogin", true);
				if (this.disabled) return;
				this.disabled = true;
				let data: any = await joinActivity("rotate", 0).catch(err =>
					console.log(err)
				);
				if (data) {
					infoActivity("rotate", 0).then((state: any) => {
						console.log(state);
						if (state) {
							const info = state.data.userActivityResourceMap[state.dayKey];
							this.sumCount = info.userSumCount;
							this.dayCount = info.userSumCount - info.useCount;
						}
					});
					// const data = { rewardId: "5dca614ab5cb6718ac9ccdfc" };
					const rewardIndex = window._RG.config.data.rewardId.rotate.indexOf(
						data.rewardId
					);
					const bg: HTMLElement = this.$refs.rotateBg as any;
					animate(bg).velocity({ rotateZ: 0 }, { duration: 0 });
					animate(bg).velocity(
						{ rotateZ: 360 * 5 + (6 - rewardIndex) * 45 + 22.5 },
						{
							duration: 3000,
							easing: "easeInOutQuad",
							complete: () => {
								this.disabled = false;
								this.sumCount -= 1;
								this.dayCount -= 1;
								this.giftCounts.splice(
									rewardIndex,
									1,
									this.giftCounts[rewardIndex] + 1
								);
								this.$dialog.show("reward", {
									index: rewardIndex + 1,
									count: "x " + this.giftBaseCounts[rewardIndex]
								});
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
						const info = state.data.userActivityResourceMap[state.dayKey];
						this.sumCount = info.userSumCount;
						this.dayCount = info.userSumCount - info.useCount;
					}
				});
			}
		}
	});
</script>