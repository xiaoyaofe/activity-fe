<template>
	<RgButton classString="RgButton" @tap="nums">RGbutton1</RgButton>
</template>

<script>
	import RgButton from "./components/base/RgButton.vue";
	export default {
		components: {
			RgButton
		},
		data() {
			return {
				num: 0,
				buttonClass: "RgButton test"
			}
		}
	}
</script>

<style scoped>
</style>