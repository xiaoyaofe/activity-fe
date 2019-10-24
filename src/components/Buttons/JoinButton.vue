<template>
	<button
		:disabled="isDisabled"
		:class="isDisabled?isEndClassName:isStartClassName"
		v-tap="{methods:JoinBtn}"
	></button>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { joinActivity } from "@/api";
	declare module "vue/types/vue" {
		interface Vue {
			$dialog: {
				show: Function;
				hide: Function;
			};
		}
	}
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
		data() {
			return {
				isDisabled: false
			};
		},
		methods: {
			JoinBtn: async function() {
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
		},
		watch: {
			initIsDisabled() {
				this.isDisabled = this.initIsDisabled;
			}
		}
	});
</script>

