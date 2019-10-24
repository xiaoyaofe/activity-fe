<template functional>
	<div class="messageContainer" v-show="props.isShow">
		<div class="mark--message" @click="listeners.close" v-if="props.isShowMark"></div>
		<div class="messageContent center">
			<span class="close" v-tap="{methods:listeners.close}">x</span>
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	export default Vue.extend({
		name: "RgPopup",
		props: {
			isShow: {
				required: true,
				type: Boolean
			},
			isShowMark: {
				type: Boolean,
				required: true
			}
		}
	});
</script>
<style scoped lang="scss">
	.mark--message {
		@include mark(#000, 0.6);
	}
	.messageContainer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.messageContent {
		width: 600px;
		height: 200px;
		background-color: #bababa;
		animation: slideDown 0.2s ease;
	}
	.close {
		width: 80px;
		height: 80px;
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 36px;
		line-height: 80px;
		text-align: center;
		color: red;
		border: 1px solid red;
		cursor: pointer;
	}

	@keyframes slideDown {
		from {
			transform: translate(-50%, -100%);
		}

		to {
			transform: translate(-50%, -50%);
		}
	}
</style>