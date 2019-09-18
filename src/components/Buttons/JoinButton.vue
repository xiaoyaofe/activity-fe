<template>
	<RgButton :disabled="isDisabled" :class="isDisabled?'joinBtned':'joinBtn'" @click="JoinBtn"></RgButton>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "../../common/common";
	import { joinActivity } from "../../common/api";
	import RgButton from "../base/RgButton.vue";
	declare var CONFIG: any;
	export default Vue.extend({
		name: "JoinButton",

		components: {
			RgButton
		},
		props: {
			initIsDisabled: {
				type: Boolean,
				required: true
			},
			actName: {
				type: String,
				required: true
			},
			giftIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				isDisabled: this.initIsDisabled
			};
		},
		methods: {
			async JoinBtn() {
				if (isLogin()) {
					let data: any = await joinActivity("oldPlayer", 0);
					if (data) {
						this.isDisabled = true;
						Vue.prototype.$dialog.show("tip", CONFIG["tip"].code_200);
					}
				} else {
					this.$emit("hide", true);
				}
			}
		}
	});
</script>

