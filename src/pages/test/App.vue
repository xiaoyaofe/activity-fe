<template>
	<div id="app" class="app">
		<!-- aaaaaaaaa
		<RgMessageContainer
			:isShow="isShowMessager"
			:isShowMark="true"
			@close="toogleAttr('isShowMessager',false)"
		></RgMessageContainer>-->
		<div class="app-container">
			<RgButton class="animate-btn" @click="animate">开始</RgButton>
			<div ref="animate1" class="animate"></div>
			<div ref="animate2" class="animate2"></div>
		</div>
		<!-- <RgButton class="showMessageBtn" @click="toogleAttr('isShowMessager',true)">打开消息框</RgButton>
		<RgFooter class="app_footer"></RgFooter>-->
	</div>
</template>
<script lang="ts">
	import { animate } from "../../common//utils/";
	import Vue from "vue";
	import RgButton from "@/components/base/RgButton.vue";
	import RgFooter from "@/components/base/RgFooter.vue";
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
		components: { RgMessageContainer, RgButton, RgFooter },
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
			},
			animate() {
				const ele1 = this.$refs.animate1;
				const ele2 = this.$refs.animate2;
				// animate([ele1, ele2])
				// 	.delay(2000)
				// 	.velocity({ width: 1000, opacity: 0.5 }, 1000);
				// animate(ele2).velocity({ opacity: 0 }, {dycat});
			}
		}
	});
</script>
<style lang="scss">
	@import "../base";
	@import "./app.scss";
	.animate-btn {
		width: 100px;
		height: 50px;
		background: rgb(115, 226, 226);
	}
	.animate,
	.animate2 {
		margin-top: 100px;
		width: 200px;
		height: 200px;
		background: red;
	}
	.animate2 {
		background: green;
	}
</style>