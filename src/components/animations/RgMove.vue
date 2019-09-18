<template>
	<RgAnimate name="rg-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave" :mode="mode">
		<slot></slot>
	</RgAnimate>
</template>
<script lang="ts">
	import Vue from "vue";
	import * as Velocity from "velocity-animate/velocity";
	import RgAnimate from "../base/RgAnimate.vue";
	export default Vue.extend({
		name: "RgMove",
		props: {
			mode: {
				type: String,
				default: "out-in"
			},
			maxValue: {
				type: String,
				required: true
			},
			minValue: {
				type: String,
				required: true
			},
			direction: {
				type: String,
				required: true,
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ["left", "top", "bottom", "right"].indexOf(value) !== -1;
				}
			},
			duration: {
				type: Number,
				default: 800
			}
		},
		data() {
			return {};
		},
		components: { RgAnimate },
		methods: {
			beforeEnter: function(el) {
				el.style[this.$props.direction] = this.$props.maxValue;
			},
			enter: function(el, done) {
				Velocity(
					el,
					{ [this.$props.direction]: this.$props.minValue },
					{ duration: this.$props.duration }
				);
			},
			leave: function(el, done) {
				Velocity(
					el,
					{ [this.$props.direction]: this.$props.maxValue },
					{
						duration: this.$props.duration, // 动画执行时间
						easing: "swing"
					}
				);
			}
		}
	});
</script>
<style lang="scss"></style>
