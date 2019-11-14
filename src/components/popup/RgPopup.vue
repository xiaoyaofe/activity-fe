<template functional>
	<transition :name="props.transitionName">
		<div class="popup-wrapper" v-show="props.isShow">
			<div class="mark--popup" @click="listeners.close" v-if="props.isShowMark"></div>
			<div class="popup center" :class="popupClassName">
				<span class="popup__close" v-tap="{methods:listeners.close}">x</span>
				<slot></slot>
			</div>
		</div>
	</transition>
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
			},
			transitionName: {
				type: String,
				default: "fadeIn"
			},
			popupClassName: {
				type: String,
				default: ""
			}
		}
	});
</script>
<style lang="scss">
	// @import "./variables";
	// @import "./popup";
</style>