
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
							:class="['gifts_item','gifts_item'+index]"
							v-for="index in 16"
							:key="'item-'+index"
							v-tap="{methods:showTitle,index:index}"
						>
							<!-- <div :class="['gifts_item_gift','act2_gift'+index]"></div> -->
							<!-- <div class="gifts_item_gift_selected" v-if="isSelected[index-1]"></div> -->
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
								></div>
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
	import { isLogin } from "@/common/utils";
	import { getCardCount, joinCardReward, joinBoxFb } from "@/api";
	import RgButton from "@/components/base/RgButton.vue";
	import RgFlip from "@/components/animations/RgFlip.vue";
	import * as Velocity from "velocity-animate/velocity";
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
				isALLCards: false,
				currentCardNum: 0,
				needCardNum: 0,
				isSelected: [...list],
				allCardsMessage: [
					"創世能量*3000",
					"鑽石*688",
					"技能精華大禮包*5",
					"小霞可達鴨（個體保底90、性格隨機）",
					"符文召喚石*15",
					"月華-長耳兔*1 （准神）（個體保底90、性格隨機）",
					"高階石板組*1",
					"超級合成石*100",
					"神話超級石碎片*160",
					"3V百變怪禮包（6種性格：保守、固執、開朗、膽小、天真、急躁，自選）",
					"沙奈朵轉換石（真愛）*50",
					"2級進化核心*200",
					"橙色符文自選禮包，打開自主選擇任意金色符文一個",
					"虹彩閃耀（哲爾尼亞斯專屬新技能）",
					"4V百變怪禮包（6種性格：保守、固執、開朗、膽小、天真、急躁自選一種）",
					"哲爾尼亞斯轉換石 x 50"
				],
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
							href:
								" https://pokeko.pocketgamesol.com/activity/20191001/index.html",
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
									this.getRewardClassIndex(res.rewardId) + 1
								);
								this.needCardNum = res.Nextcount;
								this.currentCardNum = res.restCount;
								setTimeout(() => {
									this.$dialog.show(
										"tip",
										window._RG.config.tip.code_200.replace("禮包", res.rewardName)
									);
								}, 500);
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
			},
			showTitle(params: any) {
				this.$dialog.show("tip", this.allCardsMessage[params.index - 1]);
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
								this.getRewardClassIndex(item.rewardId) + 1
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