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
					:class="['download-box__content__btn','download-box__content__btn--'+key,active===actives[key] ? 'download-box__content__btn--active':'']"
					:href="value ? value : 'javascript:;'"
					:key="key+'btn'"
					v-if="!value"
					v-tap="{methods:scroll,id:key}"
				></a>
				<a
					:class="['download-box__content__btn','download-box__content__btn--'+key]"
					:href="value ? value : 'javascript:;'"
					:key="key+'btn'"
					v-if="value"
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
	import { animate, noJitterFn } from "@/common/utils";

	declare module "vue/types/vue" {
		// 3. 声明为 Vue 补充的东西
		interface Vue {
			_downloadBoxOption: {
				distance: string;
				duration: number;
				direction: "right" | "left";
				isShowTop?: boolean;
				btns: {
					[key: string]: string;
				};
			};
			noJitterScrollHandle: (this: Window, ev: Event) => any;
		}
	}
	export default Vue.extend({
		name: "downloadBox",
		mounted(): void {
			this.noJitterScrollHandle = noJitterFn(1000, this.scrollHandle);
			// 监听滚动事件
			window.addEventListener("scroll", this.noJitterScrollHandle, false);
		},
		destroyed(): void {
			// 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
			window.removeEventListener("scroll", this.noJitterScrollHandle);
		},
		props: {
			distance: {
				type: String,
				required: true
			},
			duration: {
				type: Number,
				default: 800
			},
			direction: {
				type: String,
				default: "right"
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
			let eles: HTMLElement[] = [];
			let actives: any = {};
			let activeNum = 0;
			for (let key in this.btns) {
				let active = -1;
				if (!this.btns[key]) {
					const ele = document.getElementById(key);
					if (ele) {
						eles.push(ele);
						active = activeNum++;
					}
				}
				actives[key] = active;
			}
			return {
				isShowContent: false,
				animalStop: true,
				scrollStop: true,
				active: 0, // 当前激活的导航索引
				scrollEles: eles,
				actives: actives
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
			},
			// 滚动监听器, 控制滚动到活动之后显示正在处于哪个位置
			scrollHandle() {
				// 所有锚点元素的 offsetTop
				const offsetTopArr: number[] = [];
				this.scrollEles.forEach(item => {
					offsetTopArr.push(item.offsetTop);
				});
				// 获取当前文档流的 scrollTop
				const scrollTop =
					document.documentElement.scrollTop || document.body.scrollTop;
				// 定义当前点亮的导航下标
				let navIndex = this.active;
				for (let n = 0; n < offsetTopArr.length; n++) {
					// 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
					// 那么此时导航索引就应该是n了
					if (
						scrollTop >=
						offsetTopArr[n - 1] +
							((offsetTopArr[n] - offsetTopArr[n - 1]) / 5) * 4
					) {
						navIndex = n;
					} else if (
						this.scrollEles[0] &&
						this.scrollEles[0].parentElement &&
						this.scrollEles[0].parentElement.scrollHeight -
							document.documentElement.scrollTop ===
							document.documentElement.clientHeight
					) {
						navIndex = 4;
					} else if (scrollTop === 0) {
						navIndex = 0;
					}
				}
				this.active = navIndex;
			}
		}
	});
</script>
