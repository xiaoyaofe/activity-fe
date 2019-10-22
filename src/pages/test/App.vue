<template>
	<div id="app">
		aaaaaaaaa
		<RgMessageContainer
			:isShow="isShowMessager"
			:isShowMark="true"
			@close="toogleAttr('isShowMessager',false)"
		></RgMessageContainer>
		<RgButton class="showMessageBtn" @click="toogleAttr('isShowMessager',true)">打开消息框</RgButton>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";
	import RgButton from "@/components/base/RgButton.vue";
	// import RgFooter from "@/components/base/RgFooter.vue";
	import RgMessageContainer from "@/components/base/RgMessageContainer.vue";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
			$isPc: boolean;
			loginIsVisible: boolean;
		}
	}
	// 尽量抽象mixin
	export default Vue.extend({
		components: { RgMessageContainer, RgButton },
		data() {
			return {
				isShowMessager: false
			};
		},
		computed: {
			_RG() {
				return window._RG;
			}
		},
		async mounted() {},
		methods: {
			toogleAttr(name: string, isShow: boolean) {
				this[name] = isShow;
			}
		}
	});
</script>
<style lang="scss">
	@import "../../common/scss/base";
	@import "./app.pc.scss";
</style>