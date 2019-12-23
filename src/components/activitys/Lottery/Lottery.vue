<template>
	<Activity :class="className" :desc="desc">
		<div class="lottery__every-gift clearfix">
			<div class="lottery__every-gift-img-wrap">
				<div class="lottery__every-gift-img"></div>
			</div>
			<!-- <div class="lottery__every-gift-btn"></div> -->
		</div>
		<div class="lottery clearfix">
			<div class="lottery__left">
				<div class="lottery__code">
					<p class="lottery__code-txt">{{code ?'số '+ code:''}}</p>
				</div>
				<div class="lottery__history-btn" v-tap="{methods:showHistory}"></div>
			</div>
			<div class="lottery__right">
				<div
					v-for="index in days"
					:class="['lottery__gift',index-1===activeIndex?'active': '',isJoined[index-1]?'joined':'']"
				>
					<div class="lottery__gift-img-bg">
						<div :class="'lottery__gift-img lottery__gift-img'+index"></div>
					</div>
					<div class="lottery__gift-btn" v-tap="{methods:join,index:index-1}"></div>
					<span class="lottery__icon"></span>
				</div>
			</div>
		</div>
	</Activity>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { numLottery, recentlyCdks, getHistory } from "@/api";
	import Activity from "@/components/base/Activity.vue";

	export default Vue.extend({
		name: "Lottery",
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
			days: {
				type: Number,
				default: 4
			},
			activeTime: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				activeIndex: 0,
				isJoined: [false, false, false, false],
				code: "",
				history: [] as any[]
			};
		},
		computed: {},
		methods: {
			async join(params: { index: number }) {
				if (this.code) return;
				if (params.index !== this.activeIndex) return;
				if (isLogin()) {
					const tip = window._RG.config.tip;
					await numLottery(1)
						.then((res: any) => {
							console.log(res);
							this.code = res.lotteryNum;
							this.$dialog.show(
								"tip",
								tip.numLottery200.replace(/x+/, res.lotteryNum)
							);
							this.isJoined.splice(this.activeIndex, 1, true);
						})
						.catch(e => {
							this.$dialog.show("tip", tip.numLottery1000);
						});
				} else {
					this.$emit("showLogin", true);
				}
			},
			showHistory() {
				if (isLogin()) {
					const tip = window._RG.config.tip;
					if (this.history.length === 0) {
						this.$dialog.show("tip", tip.lotteryInfo_null);
						return;
					}
					// this.$dialog.show("lucky", [
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					// 	{ server: 200, player: "Qiong@9266.com", time: "18/12" }
					// ]);
					// 获取历史记录,并展示
					this.$dialog.show("lucky", this.history);
				} else {
					this.$emit("showLogin", true);
				}
			}
		},
		watch: {
			isGetHistory: async function() {
				var date = new Date();
				let startDate = new Date(this.activeTime);
				var times = Math.floor(
					(date.getTime() - startDate.getTime()) / (24 * 3600 * 1000)
				);
				// console.log(times);
				this.activeIndex = times;
				const lotteryRewardIds = window._RG.config.data.rewardId.numLottery2;
				await recentlyCdks().then((state: any) => {
					// console.log(state);
					this.history = state;
					// let activeIndex = -1;
					let history: { server: string; player: string; time: string }[] = [];
					state.forEach(item => {
						// history.push({ server: '', player: "aaa", time: "" });
						const date = new Date(item.getDate);
						history.push({
							server: item.thirdGameZoneId,
							player: item.playerName,
							time: `${date.getDate()}/${date.getMonth() + 1}`
						});
						// const index = lotteryRewardIds.indexOf(item.rewardId);
						// if (index > activeIndex) {
						// 	activeIndex = index;
						// }
					});
					// 可参与的是领取过的下一个
					// if (activeIndex + 1 > this.activeIndex) {
					// 	this.activeIndex = activeIndex + 1;
					// }

					this.history = history;
				});
				// 获取code
				numLottery(0).then((state: any) => {
					if (state && state.lotteryNum) {
						this.code = state.lotteryNum;
						this.isJoined.splice(this.activeIndex, 1, true);
					}
				});
				// 判断是否参与来改变按钮状态
				getHistory("numLottery1").then((state: any) => {
					let timeArr: string[] = [];
					this.isJoined.forEach((item, index) => {
						if (index < this.activeIndex) {
							const time = new Date(
								new Date().getTime() -
									24 * 3600 * 1000 * (this.activeIndex - index)
							);
							timeArr.push(getTimeStr(time));
						}
					});
					state.forEach((item, index) => {
						const getTime = getTimeStr(new Date(item.getDate));
						for (let i = 0; i < timeArr.length; i++) {
							if (getTime === timeArr[i] && !this.isJoined[i]) {
								this.isJoined.splice(i, 1, true);
								break;
							}
						}
					});
				});
				function getTimeStr(date: Date): string {
					return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
				}
			}
		}
	});
</script>