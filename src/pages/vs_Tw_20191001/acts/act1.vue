
<template>
	<section id="act1">
		<div class="act1-title" v-once></div>
		<ul class="act1_gifts clearfix" v-once>
			<li v-for="key in 5" :class="['act1_gift','act1_gift'+key]" :key="'act1'+key"></li>
		</ul>
		<JoinButton v-bind="act1JoinButtonProps" @showLogin="showLogin"></JoinButton>
	</section>
</template>

<script lang="ts">
	import Vue from "vue";
	import JoinButton from "@/components/Buttons/JoinButton.vue";
	import { isLogin } from "@/common/utils";
	import { getAllHistory, infoActivity } from "@/api";
	declare module "vue/types/vue" {
		interface Vue {
			$pixel: any;
				$dialog: {
				show: Function;
				hide: Function;
			};
		}
	}
	function isShowBtn(actTime: string) {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const arr = actTime.split("-");
		if (year === +arr[0] && month === +arr[1] && day >= +arr[2]) return true;
		return false;
	}
	const isShowBtn2 = () => isShowBtn("2019-10-10");
	// 尽量抽象mixin
	export default Vue.extend({
		name: "Act1",
		components: {
			JoinButton
		},
		props: {
			initIsDisabled1: {
				type: Boolean,
				required: true
			},
			initIsDisabled2: {
				type: Boolean,
				required: true
			}
		},
		data() {
			let act1Name = "login1";
			let initIsDisabled = this.initIsDisabled1;
			const isBtn2 = isShowBtn2();
			if (isBtn2) {
				act1Name = "login2";
				initIsDisabled = this.initIsDisabled2;
			}
			return {
				act1JoinButtonProps: {
					initIsDisabled: initIsDisabled,
					actName: act1Name,
					giftIndex: 0,
					isEndClassName: "act1_joinBtn_end",
					isStartClassName: "act1_joinBtn_active"
				}
			};
		},
		computed: {},
		methods: {
			showLogin(val) {
				this.$emit("showLogin", val);
			}
		},
		watch: {
			initIsDisabled1() {
				const isBtn2 = isShowBtn2();
				if (!isBtn2) {
					// console.log("initIsDisabled1", isBtn2);
					this.act1JoinButtonProps.initIsDisabled = this.initIsDisabled1;
				}
			},
			initIsDisabled2() {
				const isBtn2 = isShowBtn2();
				if (isBtn2) {
					// console.log("initIsDisabled2", isBtn2);
					this.act1JoinButtonProps.initIsDisabled = this.initIsDisabled2;
				}
			}
		}
	});
</script>
<style lang="scss">
	@import "./act1.pc.scss";
	@import "./act1.mb.scss";
</style>