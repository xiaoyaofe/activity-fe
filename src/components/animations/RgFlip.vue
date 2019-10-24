<template>
	<transition
		name="rg-flip"
		@before-enter="beforeEnter"
		@before-leave="beforeLeave"
		@enter="enter"
		@leave="leave"
		:mode="mode"
		:css="false"
	>
		<slot></slot>
	</transition>
</template>
<script lang="ts">
	import Vue from "vue";
	import * as Velocity from "velocity-animate/velocity";
	export default Vue.extend({
		name: "RgFlip",
		props: {
			mode: {
				type: String,
				default: "out-in"
			},
			duration: {
				type: Number,
				default: 3000
			}
		},
		data() {
			return {};
		},
		methods: {
			beforeEnter: function(el) {
				el.style.opacity = 0;
				el.style.transform = "rotateY(-90deg)";
			},
			enter: function(el, done) {
				Velocity(el, { opacity: 1, rotateY: "-90deg" }, { duration: 0 });
				Velocity(
					el,
					{ opacity: 1, rotateY: "0deg" },
					{ duration: this.$props.duration, easing: "linear", complete: done }
				);
			},
			beforeLeave: function(el) {
				el.style.opacity = 1;
				el.style.transform = "rotateY(0deg)";
			},
			leave: function(el, done) {
				Velocity(
					el,
					{ opacity: 0, rotateY: "90deg" },
					{ duration: this.$props.duration, easing: "linear", complete: done }
				);
			}
		}
	});
</script>
