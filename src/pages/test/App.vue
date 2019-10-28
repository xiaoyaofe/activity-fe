<template>
	<div id="app" class="app">
		<RgTable v-bind="{className:'test-table'}"></RgTable>
		<!-- aaaaaaaaa -->
		<!-- <RgPopup
			:isShow="isShowMessager"
			:isShowMark="true"
			@close="toogleAttr({name:'isShowMessager',value:false})"
		></RgPopup>-->
		<!-- <div class="app-container">
			<button class="animate-btn" v-tap="{methods:animate} >开始</button>
			<div ref="animate1" class="animate"></div>
			<div ref="animate2" class="animate2"></div>
		</div>-->
		<!-- <button class="showMessageBtn" v-tap="{methods:toogleAttr,name:'isShowMessager',value:true}">打开消息框</button> -->
		<!-- <footer class="app_footer"></footer> -->
	</div>
</template>
<script lang="ts">
	import { animate } from "../../common//utils/";
	import Vue from "vue";
	import RgPopup from "@/components/popup/RgPopup.vue";
	import RgTable from "@/components/base/table.vue";
	export default Vue.extend({
		components: {
			RgPopup,
			RgTable
		},
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
			toogleAttr({ name, value }) {
				this[name] = value;
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
	@import "@/common/scss/base.scss";
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