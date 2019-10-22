<template functional>
	<div
		:class="[data.class?data.class:'',data.staticClass?data.staticClass:'','mark']"
		v-bind="data.attrs"
		v-tap="{methods:listeners.click}"
		v-on="delete listeners.click && listeners"
	></div>
</template>

<script>

	export default {
		name: "RgMark"
	};

</script>
<style lang="scss">
	.mark {
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.6;
	}
</style>