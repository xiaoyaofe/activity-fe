<template>
	<Activity :class="className" :desc="desc">
		<div class="lottery__every-gift clearfix">
			<div class="lottery__every-gift-img-wrap">
				<div class="lottery__every-gift-img"></div>
			</div>
			<div class="lottery__every-gift-btn"></div>
		</div>
		<div class="lottery clearfix">
			<div class="lottery__left">
				<div class="lottery__code">
					<p class="lottery__code-txt">{{code ?'số '+ code:''}}</p>
				</div>
				<div class="lottery__history-btn" v-tap="{methods:showHistory}"></div>
			</div>
			<div class="lottery__right">
				<div
					v-for="index in 4"
					:class="['lottery__gift',index-1===activeIndex?'active': '',isJoined[index-1]?'joined':'']"
				>
					<div class="lottery__gift-img-bg">
						<div :class="'lottery__gift-img lottery__gift-img'+index"></div>
					</div>
					<div class="lottery__gift-btn" v-tap="{methods:join,index:index-1}"></div>
					<span class="lottery__icon"></span>
				</div>
			</div>
		</div>
	</Activity>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "@/common/utils";
	import { numLottery } from "@/api";
	import Activity from "@/components/base/Activity.vue";

	export default Vue.extend({
		name: "Lottery",
		components: {
			Activity
		},
		props: {
			className: {
				type: String,
				required: true
			},
			desc: String,
			isGetHistory: Boolean
		},
		data() {
			return {
				activeIndex: 0,
				isJoined: [false, false, false, false],
				code: ""
			};
		},
		computed: {},
		methods: {
			async join(params: { index: number }) {
				if (params.index !== this.activeIndex) return;
				// if (isLogin()) {
				this.isJoined.splice(0, 1, true);
				// } else {
				// 	this.$emit("showLogin", true);
				// }
			},
			async showHistory() {
				// if (isLogin()) {
				// } else {
				// 	this.$emit("showLogin", true);
				// }
				// 获取历史记录,并展示
				this.$dialog.show("lucky", [
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" },
					{ server: 200, player: "Qiong@9266.com", time: "18/12" }
				]);
			}
		},
		watch: {
			isGetHistory: function() {}
		}
	});
</script>