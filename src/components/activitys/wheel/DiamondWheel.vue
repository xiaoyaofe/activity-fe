<template>
	<Activity :class="className" :desc="desc">
		<!-- 转盘描述 -->
		<div :class="className+'__turn-text white-bg'">
			<p :class="className+'__nums'">
				Số lần rút thưởng còn lại:
				<span :class="className+'__nums-txt'">{{nums}}</span>
			</p>
			<p :class="className + '__giftDiamond'">
				Số lượng Xu ở bể quà hiện tại:
				<span :class="className + '__diamondNum'">{{diamondNum}}</span>
				<span :class="className+'__diamond'"></span>
			</p>
			<div :class="className + '__history-title'"></div>
			<div :class="className +'__exchange-history'">
				<p v-for="(item,index) in poolList" :key="index" :class="className+'__exchange-info'">
					<!-- 恭喜某区服某某某获得xx大奖，内含xx钻石
					Chúc mừng S547 - AttocRo nhận được Quà Lớn May Mắn*1 gồm Xu*360-->
					Chúc mừng {{" S"+ item.thirdGameZoneId + '-'}}
					<span style="color:#d43023;">{{item.playerName}}</span>
					{{` nhận được ${item.rewardName}, gồm Xu * ${item.count}`}}
				</p>
			</div>
			<div :class="className +'__content-title'"></div>
		</div>
		<!-- 转盘 -->
		<div :class="className+'__pannel clearfix'">
			<div :class="className+'__pannel__bg'" ref="rotateBg"></div>
			<div :class="className+'__pannel__start-btn'" v-tap="{methods:rotatehandle}"></div>
		</div>
		<!-- 兑换精灵球 -->
		<div :class="className+'__exchange-gift'">
			<p :class="className+'__spriteNums'">({{sprites}})</p>
			<ul :class="className+'__exchange-gifts clearfix'">
				<li v-for="index in 8" :class="className+'__exchange-gifts-li white-bg'">
					<div :class="className+'__exchange-gift-img'+index"></div>
					<div :class="className+'__exchange-btn'" @click="isExchange(index-1,true)"></div>
				</li>
			</ul>
		</div>
		<!-- 奖池转盘描述 -->
		<div :class="className+'__description'">
			<p :class="className+'__description-title'">Giới thiệu event:</p>
			<p
				:class="className+ '__descrition-txt'"
			>1.Khi Quà Lớn Chí Tôn được người chơi rút trúng, bể quà sẽ xóa, bắt đầu tích lũy bể quà vòng sau.</p>
			<p
				:class="className+ '__descrition-txt'"
			>2.Người chơi có thể nhận được đạo cụ đặc biệt qua rút thưởng, gom đủ đạo cụ đặc biệt có thể đổi được thần thú và vật phẩm đặc biệt, đồng thời trừ đạo cụ đặc biệt số lượng tương ứng. Sau khi event kết thúc, quà chưa đổi sẽ xem như người chơi tự động bỏ cuộc.</p>
			<p
				:class="className+ '__descrition-txt'"
			>3.Quà nhận được khi rút thưởng sẽ được gửi qua thư. Quà lớn của bể quà sẽ được gửi trong 3 ngày làm việc sau khi event kết thúc.</p>
			<p
				:class="className+ '__descrition-txt'"
			>4.Trong bể quà, số lượng hiển thị Xu sẽ làm mới 1 phút 1 lần, số lượng thực nhận xin vui lòng lấy số lượng hiển thị lúc rút thưởng làm chuẩn.</p>
		</div>
		<div v-if="showExchange" class="DialogTip">
			<div class="tipBox">
				<div class="close" @click="isExchange(-1,false)"></div>
				<div class="tipTxt">
					<p>{{`Xác nhận sử dụng Bóng Poké*${spriteNums[exchangeIndex]} để đổi ${spriteGift[exchangeIndex]}?`}}</p>
					<p :class="className+'__isExchangeBtns'">
						<span class="yes" @click="exchangehandle">[Yes]</span>
						<span class="no" @click="isExchange(-1,false)">[No]</span>
					</p>
				</div>
			</div>
		</div>
	</Activity>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { infoActivity, joinActivity, poollist } from "@/api";
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
				getGiftIndex: 0,
				isShowGifts: false,
				nums: 0,
				diamondNum: 0,
				poolList: [],
				showExchange: false,
				exchangeIndex: 0,
				sprites: 0,
				spriteNums: [300, 1, 2, 80, 50, 25, 35, 25],
				spriteGift: [
					"Set Sấm Sét",
					"Thẻ Đột Phá*20",
					"Mảnh Thường*20",
					"Sticker Ho-Oh Bá chủ*200",
					"Vớ Noel*1",
					"Cây Noel*1",
					"Bánh Noel*1",
					"Quà Noel*1"
				]
			};
		},
		methods: {
			rotatehandle: async function() {
				if (!isLogin()) return this.$emit("showLogin", true);
				if (this.disabled) return;
				this.disabled = true;
				let data: any = await joinActivity("rotate", 0).catch(err => {
					this.$dialog.show("tip", window._RG.config.tip.rotate1000);
					console.log(err);
				});
				if (data) {
					
					// const data = { rewardId: "5de62b48b5cb671f40c7d44d" };
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
								this.getInfo(false);
								if (rewardIndex === 1 || rewardIndex === 4 || rewardIndex === 7) {
									// if (rewardIndex === 1) {
									// 	this.sprites += 1;
									// } else if (rewardIndex === 4) {
									// 	this.sprites += 3;
									// } else if (rewardIndex === 7) {
									// 	this.sprites += 5;
									// }
									this.$dialog.show(
										"tip",
										window._RG.config.tip.sprite200.replace(/x+/, data.rewardName)
									);
								} else if (
									rewardIndex === 2 ||
									rewardIndex === 5 ||
									rewardIndex === 11
								) {
									this.$dialog.show(
										"tip",
										window._RG.config.tip.diamond200.replace(
											/x+/,
											data.rewardName
										) + data.count
									);
								} else {
									this.$dialog.show(
										"tip",
										window._RG.config.tip.code_200.replace(/x+/, data.rewardName)
									);
								}
									this.disabled = false;
							}
						}
					);
				} else {
					this.disabled = false;
				}
			},
			toogle({ key }: { key: string }) {
				if (!key) return;
				const flag = this[key];
				this[key] = !flag;
			},
			isExchange(index, val) {
				if (!isLogin()) return this.$emit("showLogin", true);
				this.showExchange = val;
				this.exchangeIndex = index;
			},
			async exchangehandle() {
				this.showExchange = false;
				let index = this.exchangeIndex;
				const tip = window._RG.config.tip;
				if (this.sprites < this.spriteNums[this.exchangeIndex]) {
					this.$dialog.show("tip", tip.sprite404);
					return;
				}
				//兑换的接口
				const data: any = await joinActivity("sprite", index).catch(err => {
					const msg = window._RG.config.tip.sprite404;
					this.$dialog.show("tip", msg);
					console.log(err);
				});
				if (data) {
					this.sprites -= this.spriteNums[this.exchangeIndex];
					const msg = window._RG.config.tip.code_200;
					this.$dialog.show("tip", msg.replace(/x+/, data.rewardName));
				}
			},
			getInfo(isloading?: boolean) {
				// 请求钻石数这些参数
				infoActivity("rotate", 0, isloading).then((state: any) => {
					console.log(state);
					if (state) {
						if (state.poolInfo) {
							this.diamondNum = state.poolInfo.sumCount;
						}
						this.nums = state.data.userSumCount - state.data.useCount;
						this.sprites = state.data.sumScore;
					}
				});
				// 请求中大奖的名单
				poollist("rotate", [2, 5, 11]).then((state: any) => {
					// console.log(state);
					if (state) {
						this.poolList = state;
					}
				});
			}
		},
		watch: {
			isGetHistory: function() {
				//转盘信息的初始化
				setInterval(() => {
					this.getInfo(false);
				}, 60000);
				this.getInfo();
				// infoActivity("sprite", 0).then((state: any) => {
				// 	this.sprites = state.data.sumScore - state.data.usedScore;
				// });
			}
		}
	});
</script>