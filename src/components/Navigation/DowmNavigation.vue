<template>
	<div>
		<div v-if="isPc" class="navBox" ref="navBox">
			<div class="navBox_controlBtn" v-tap="{methods:toggleContent}">
				<slot name="controlContent">{{isShowContent?"<":">"}}</slot>
			</div>
			<div class="navBox_content">
				<a v-for="(value,key) in buttons" :class="key" :href="value" :key="key" v-tap></a>
			</div>
		</div>
		<div v-else>aaa</div>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import * as Velocity from "velocity-animate/velocity";
	export default Vue.extend({
		name: "DownNavigation",
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
				default:"linear"
			},
			isPc: {
				type: Boolean,
				required: true
			},
			buttons: {
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
				Velocity(
					this.$refs.navBox,
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
