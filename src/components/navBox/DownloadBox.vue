<template>
	<div class="download-box" ref="downloadBox">
		<div
			:class="[isShowContent ?'download-box__control-btn--show':'download-box__control-btn--hide','download-box__control-btn']"
			v-tap="{methods:toggleContent}"
		>
			<slot name="control-content"></slot>
		</div>
		<div class="download-box__content">
			<div v-for="(value,key) in btns" class="download-box__content__btn--wrap">
				<a
					:class="['download-box__content__btn','download-box__content__btn--'+key]"
					:href="value ? value : 'javascript:;'"
					:key="key+'btn'"
					target="_blank"
					v-tap="{methods:scroll,id:key}"
				></a>
			</div>
		</div>
		<span v-if="isShowTop" class="download-box__scroll-top-btn" v-tap="{methods:scroll,id:'app'}"></span>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { animate } from "@/common/utils";

	declare module "vue/types/vue" {
		// 3. 声明为 Vue 补充的东西
		interface Vue {
			act1Infos: ActInfo[];
			_downloadBoxOption: {
				distance: string;
				duration: number;
				direction: "right" | "left";
				isShowTop?: boolean;
				btns: {
					[key: string]: string;
				};
			};
		}
		interface ActInfo {
			actName: string;
			giftIndex: number;
			isDisabled: boolean;
			isShow: boolean;
		}
	}
	export default Vue.extend({
		name: "downloadBox",
		props: {
			distance: {
				type: String,
				required: true
			},
			duration: {
				type: Number,
				required: true
			},
			direction: {
				type: String,
				required: true
			},
			easing: {
				type: String,
				default: "easeOutQuart"
			},
			isShowTop: {
				type: Boolean,
				default: false
			},
			btns: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				isShowContent: false,
				animalStop: true,
				scrollStop: true
			};
		},
		methods: {
			toggleContent() {
				if (this.isShowContent) {
					this.move("0rem");
				} else {
					this.move(this.$props.distance);
				}
			},
			move: function(distance: string) {
				if (!this.animalStop) return;
				this.animalStop = false;
				animate(this.$refs.downloadBox).velocity(
					{
						[this.$props.direction]: distance
					},
					{
						duration: this.$props.duration, // 动画执行时间
						easing: this.$props.easing,
						complete: () => {
							const isShowContent = this.isShowContent;
							this.isShowContent = !isShowContent;
							this.animalStop = true;
						}
					}
				);
			},
			scroll({ id }: { id: string }) {
				var ele = document.getElementById(id);
				if (!ele) return console.log("scroll element is not find.");
				animate(ele).velocity("scroll", {
					container: document.body
				});
			}
		}
	});
</script>
