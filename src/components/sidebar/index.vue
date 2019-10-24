<template>
	<div class="navBox">
		<div v-if="isPc" class="navBox" ref="navBox">
			<div
				:class="isShowContent ?'navBox_controlBtn navBox_controlBtn1' : 'navBox_controlBtn navBox_controlBtn2'"
				v-tap="{methods:toggleContent}"
			>
				<slot name="controlContent"></slot>
			</div>
			<div class="navBox_content">
				<a v-for="(value,key) in buttons" :class="key" :href="value" :key="key" v-tap></a>
			</div>
		</div>
		<div v-else>
			<div class="navBox_content">
				<a v-for="(value,key) in buttons" :class="key" :href="value" :key="key" v-tap></a>
			</div>
		</div>
	</div>
</template>
<script lang="ts" src="./main.ts"></script>
