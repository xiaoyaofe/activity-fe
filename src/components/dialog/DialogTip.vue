<template>
	<transition name="fadeIn">
		<div class="DialogTip" v-show="showDialog">
			<!--提示窗  -->
			<div class="tipBox" v-show="toastName == 'tip'">
				<p class="tipTxt">{{content}}</p>
				<button @click="close" class="close"></button>
			</div>
			<!-- 激活码窗-->
			<div class="cdkBox" v-show="toastName == 'cdKeys'">
				<p class="tipTxt">
					{{tip.join_success}}
					<br />
					{{tip.reward_txt}}&nbsp;:&nbsp;{{this.rewardName}}
					<br />
					{{tip.time}}&nbsp;:&nbsp;{{this.userCdkeys}}
				</p>
				<button @click="close" class="close"></button>
			</div>
			<!-- loading窗 -->
			<div class="loadingBox" v-show="toastName == 'loading'"></div>
			<!-- 礼包弹窗 -->
			<div class="rewardBox center" v-show="toastName === 'reward'">
				<button @click="close" class="close"></button>
				<!-- <section class="giftNull" v-if="!rewardArr.length">{{tip.giftArr_null}}</section>
        <section class="rewardContainer" v-if="rewardArr.length">
          <div class="table-head">
            <div class="table-head-wrap">
              <table class="grid" style="width：745px">
                <thead>
                  <tr>
                    <th>{{tip.code}}</th>
                    <th>{{tip.reward_name}}</th>
                    <th>{{tip.time}}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="table-content">
            <table class="grid">
              <tbody>
                <tr v-for="(item,index) in rewardArr" :key="index">
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.cdkeys}}</td>
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.rewardName}}</td>
                  <td
                    :style="parseInt(index%2)?{ background:'none' }:{ background:'none' }"
                  >{{item.time}}</td>
                </tr>
              </tbody>
            </table>
          </div>
				</section>-->
				<p class="reward-box__title">ยินดีด้วยที่ได้รับรางวัลต่อไปนี้</p>
				<div :class="['reward-box__gift','reward-box__gift--'+(rewardArr && rewardArr.index)]">
					<p class="reward-box__gift__count">{{rewardArr && rewardArr.count}}</p>
				</div>
			</div>

			<!-- 愿望弹窗 -->
			<div class="rewardBox" v-show="toastName === 'lucky'">
				<button @click="close" class="close"></button>
				<section class="giftNull" v-if="!luckyArr.length">{{tip.wishArr_null}}</section>
				<section v-if="luckyArr.length" class="rewardContainer">
					<p>Lucky List</p>
					<div class="table-head">
						<div class="table-head-wrap">
							<table class="grid">
								<!-- <colgroup>
                  <col style="width:80px">
                  <col>
                  <col style="width:150px">
								</colgroup>-->
								<thead>
									<tr>
										<th></th>
										<th>{{tip.server}}</th>
										<th>{{tip.player}}</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div class="table-content">
						<table class="grid">
							<!-- <colgroup>
                <col style="width:80px">
                <col>
                <col>
                <col style="width:150px">
							</colgroup>-->
							<tbody>
								<tr v-for="(item,index) in luckyArr" :key="index">
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{index+1}}</td>
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{item.server}}</td>
									<td
										:style="parseInt(index%2)?{ background:'#DADADA' }:{ background:'#e9f5ff' }"
									>{{item.player}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
	import Vue from "vue";
	import { isLogin } from "../../common/utils";

	export default Vue.extend({
		name: "DialogTip",
		props: {
			InstatceShowDialog: {
				type: Boolean,
				default: false
			},
			content: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				tip: window._RG.config.tip,
				toastName: "",
				rewardName: "",
				userCdkeys: "",
				rewardIcon: "",
				toastHide: true,
				showDialog: false,
				rewardArr: [],
				luckyArr: [],
				tokenExpired: false
			};
		},
		watch: {
			// rewardArr(newValue, oldValue) {
			// 	this.rewardIcon =
			// 		"rewardIcon" +
			// 		window._RG.config.data.rewardId.rotate.indexOf(newValue[0].rewardId);
			// 	this.userCdkeys = newValue[0].getDate;
			// 	this.rewardName = newValue[0].rewardName;
			// }
		},
		methods: {
			close() {
				if (this.tokenExpired) {
					location.reload();
				}
				this.showDialog = false;
			},
			open() {
				this.showDialog = true;
			}
		}
	});
</script>
<style lang="scss">
	.loadingBox {
		width: 80px;
		height: 80px;
		position: fixed;
		top: 50%;
		left: 50%;
		background: url("./img/loading.gif");
		margin-left: -40px;
		margin-top: -40px;
	}
</style>
