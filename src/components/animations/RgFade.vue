<template>
	<transition
		name="rg-fade"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
		:mode="mode"
		:css="false"
		appear
	>
		<slot></slot>
	</transition>
</template>
<script lang="ts">
	import Vue from "vue";
	import * as Velocity from "velocity-animate/velocity";
	export default Vue.extend({
		name: "RgFade",
		props: {
			mode: {
				type: String,
				default: "out-in"
			},
			maxOpacity: {
				type: Number,
				default: 1
			},
			minOpacity: {
				type: Number,
				default: 0
			},
			duration: {
				type: Number,
				default: 600
			}
		},
		data() {
			return {};
		},
		methods: {
			beforeEnter: function(el) {
				el.style.opacity = this.$props.minOpacity;
			},
			enter: function(el, done) {
				Velocity(
					el,
					{ opacity: this.$props.maxOpacity },
					{ duration: this.$props.duration, complete: done }
				);
			},
			leave: function(el, done) {
				Velocity(
					el,
					{ opacity: this.$props.minOpacity },
					{
						duration: this.$props.duration, // 动画执行时间
						easing: "swing",
						complete: done
					}
				);
			}
		}
	});
</script>
<style lang="scss"></style>
