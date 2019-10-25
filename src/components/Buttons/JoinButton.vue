<template>
	<button
		:disabled="disabled"
		:class="disabled?isEndClassName:isStartClassName"
		v-tap="{methods:join}"
	></button>
</template>
<script lang="ts">
	import Vue from "vue";
	import { joinActivity } from "@/api";
	import { isLogin } from "@/common/utils";

	export default Vue.extend({
		name: "JoinButton",
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
			},
			isEndClassName: {
				required: true,
				type: String
			},
			isStartClassName: {
				required: true,
				type: String
			}
		},
		computed: {
			disabled(): boolean {
				return this.$props.initIsDisabled || this.isDisabled;
			}
		},
		data() {
			return {
				isDisabled: false
			};
		},
		methods: {
			join: async function() {
				if (isLogin()) {
					let data: any = await joinActivity(
						this.$props.actName,
						this.$props.giftIndex
					).catch(err => console.log(err));
					if (data) {
						this.isDisabled = true;
						this.$dialog.show(
							"tip",
							window._RG.config.tip.code_200.replace("$禮包", data.rewardName)
						);
					}
				} else {
					this.$emit("showLogin", true);
				}
			}
		}
	});
</script>

