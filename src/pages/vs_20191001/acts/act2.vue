
<template>
	<section id="act2">
		<div class="act2_title"></div>
		<!-- <div class="act_person1"></div> -->
		<div class="act2_content">
			<div class="act2_content_cardInfo">
				<RgButton class="act2_content_giftsBtn" @click="toggleAllCards(true)"></RgButton>
				<div class="act2_content_cardCount clearfix">
					<span class="act2_content_cardCount_current_txt">{{currentCardNum}}</span>
					<span class="act2_content_cardCount_next_txt">{{needCardNum<9999 ? needCardNum : ''}}</span>
				</div>
				<RgButton class="act2_content_shareBtn" @click="Share"></RgButton>
				<div class="act2_content_gifts" v-if="isALLCards">
					<RgButton class="gifts_closBtn" @click="toggleAllCards(false)"></RgButton>
					<p class="gifts_title">
						全部圖鑒包含以下物品:
						<span class="gifts_title_span">（点击图片查看奖励详情）</span>
					</p>
					<ul class="gifts_content clearfix">
						<li
							class="gifts_item"
							v-for="index in 16"
							:key="'item-'+index"
							:title="allCardsMessage[index-1]"
						>
							<div :class="['gifts_item_gift','act2_gift'+index]"></div>
							<div class="gifts_item_gift_selected" v-if="isSelected[index-1]"></div>
						</li>
					</ul>
					<p class="gifts_item_gift_PS">PS：開啟所有圖鑒，即可獲得以上所有獎勵哦!</p>
				</div>
			</div>
			<div class="act2_allCards">
				<ul class="act2_allCards_ul clearfix">
					<li class="act2_allCards_ul_li" v-for="(item,index) in cardClass" :key="'allCard-'+index">
						<div class="act2_allCards_li_cardBox" v-tap.stop="{methods:getBoxGift,index:index}">
							<RgFlip :duration="500">
								<div
									v-if="isSelected[index]"
									:class="['act2_allCards_li_card','act2_gift'+item]"
									:key="'card'+index"
								>{{item}}</div>
								<div v-else class="act2_allCards_li_card act2_allCards_li_card_bg" key="bg"></div>
							</RgFlip>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/common";
	import { getCardCount, joinCardReward, joinBoxFb } from "@/common/api";
	import RgButton from "@/components/base/RgButton.vue";
	import RgFlip from "@/components/animations/RgFlip.vue";
	import * as Velocity from "velocity-animate/velocity";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
			$isPc: boolean;
		}
	}
	// 尽量抽象mixin
	export default Vue.extend({
		name: "Act2",
		components: {
			RgButton,
			RgFlip
		},
		props: {
			isGetHistory: {
				type: Boolean,
				required: true
			}
		},
		data() {
			var list: any[] = [];
			var indexs: number[] = [];
			for (let i = 0; i < 16; i++) {
				list.push(false);
				indexs.push(0);
			}
			return {
				isPc: this.$isPc,
				isALLCards: false,
				currentCardNum: 0,
				needCardNum: 0,
				isSelected: [...list],
				allCardsMessage: [
					"創世能量*3000",
					"鑽石*688",
					"技能精華大禮包*5",
					"嗡蝠*1（個體保底90、性格隨機）",
					"月寵精靈寵物蛋C*3",
					"綠茵鬥士*1（個體保底90、性格隨機）",
					"中階石板組*2",
					"洛托姆強化石*30",
					"高階石板組*1",
					"3V百變怪禮包 （6種性格：保守、固執、開朗、膽小、天真、急躁，自選）",
					"紅黑超夢mega石碎片*18",
					"天空謝米*1 （個體保底90、性格隨機）",
					"神話超級石碎片*200",
					"騎拉帝納mega石碎片*25",
					"4V百變怪禮包（6種性格：保守、固執、開朗、膽小、天真、急躁，自選）",
					"紅黑超夢mega碎片*32"
				],
				VUE_APP_PATH: VUE_APP_PATH,
				cardClass: indexs
			};
		},
		computed: {
			giftCodeList: function(): string[] {
				return window._RG.config.data.rewardId.box;
			},
			giftIndexs: function(): number[] {
				return [];
			}
		},
		methods: {
			toggleAllCards(val: boolean) {
				this.isALLCards = val;
			},
			Share() {
				if (isLogin()) {
					FB.ui(
						{
							method: "share",
							href: " http://kor.pocketgamesol.com/activity/20190101/index.html",
							display: "popup"
							// "display" must be one of "popup", "dialog", "iframe", "touch", "async", "hidden", or "none"
						},
						async () => {
							joinBoxFb(true).then((res: any) => {
								if (res) {
									this.needCardNum = res.Nextcount;
									this.currentCardNum = res.restCount;
								}
							});
						}
					);
				} else {
					this.$emit("showLogin", true);
				}
			},
			getBoxGift(params) {
				if (isLogin()) {
					const flag = this.isSelected[params.index];
					if (!flag) {
						joinCardReward(params.index).then((res: any) => {
							if (res) {
								this.isSelected.splice(params.index, 1, true);
								this.cardClass.splice(
									params.index,
									1,
									this.getRewardClassIndex(res.rewardId)
								);
								this.needCardNum = res.Nextcount;
								this.currentCardNum = res.restCount;
							}
						});
					}
				} else {
					this.$emit("showLogin", true);
				}
			},
			getRewardClassIndex(code: string): number {
				const index = this.giftCodeList.indexOf(code);
				if (index === -1) throw code + "is not find";
				return index;
			},
			showLogin(val) {
				this.$emit("showLogin", val);
			}
		},
		watch: {
			isGetHistory: function(newQuestion, oldQuestion) {
				getCardCount().then((res: any) => {
					if (res) {
						// console.log(res);
						res.rewardList.forEach(item => {
							this.cardClass.splice(
								item.index,
								1,
								this.getRewardClassIndex(item.rewardId)
							);
							this.isSelected.splice(item.index, 1, true);
						});
						this.needCardNum = res.Nextcount;
						this.currentCardNum = res.restCount;
					}
				});
			}
		}
	});
</script>
<style lang="scss">
	@import "./act2.pc.scss";
	@import "./act2.mb.scss";
</style>