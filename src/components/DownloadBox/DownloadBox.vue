<template>
	<div class="download-box" ref="downloadBox">
		<div
			:class="[isShowContent ?'download-box__control-btn--show':'download-box__control-btn--hide','download-box__control-btn']"
			v-tap="{methods:toggleContent}"
		>
			<slot name="control-content"></slot>
		</div>
		<div class="download-box__content">
			<a
				v-for="(value,key) in btns"
				:class="['download-box__content__btn','download-box__content__btn--'+key]"
				:href="value"
				:key="key+'btn'"
				v-tap
			></a>
		</div>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import { animate } from "@/common/utils";
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
				default: "linear"
			},
			btns: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				isShowContent: false
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
						}
					}
				);
			}
		}
	});
</script>
