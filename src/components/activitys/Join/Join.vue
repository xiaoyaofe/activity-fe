
<template>
	<Activity :class="className" :isShowDesc="false">
		<slot />
		<button
			v-for="(actInfo,index) in actInfos"
			:key="'joinBtn'+index"
			v-if="actInfo.isShow"
			:disabled="disableds[index]"
			:class="[
				`${className}__join-btn`,
					disableds[index] ? 
				`${className}__join-btn${index+1}--end` : 
				`${className}__join-btn${index+1}--start`,
				disableds[index] ? 
				`${className}__join-btn--end` : 
				`${className}__join-btn--start`
			]"
			v-tap="{methods:join,index:index}"
		></button>
	</Activity>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { joinActivity } from "@/api";
	import Activity from "@/components/base/Activity.vue";
	interface ActInfo {
		actName: string;
		giftIndex: number;
		isDisabled: boolean;
		isShow: boolean;
	}
	export default Vue.extend({
		name: "Join",
		components: {
			Activity
		},
		props: {
			className: {
				type: String,
				required: true
			},
			actInfos: {
				type: Array,
				required: true
			}
		},
		data() {
			const isDisabledArr = this.actInfos.map(() => false);
			return {
				isDisabledArr: isDisabledArr
			};
		},
		computed: {
			disableds(): boolean[] {
				return this.isDisabledArr.map(value => {
					return this.$props.actInfos.isDisabled || value;
				});
			}
		},
		methods: {
			join: async function({ index }) {
				if (isLogin()) {
					let data: any = await joinActivity(
						this.$props.actInfos[index].actName,
						this.$props.actInfos[index].giftIndex
					).catch(err => console.log(err));
					if (data) {
						this.isDisabledArr[index] = true;
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