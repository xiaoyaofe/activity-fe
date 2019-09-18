<template functional>
	<button
		:class="[data.class?data.class:'',data.staticClass?data.staticClass:'']"
		v-bind="data.attrs"
		v-tap="{methods:listeners.click}"
		v-on="listeners"
	>
		<slot/>
	</button>
</template>

<script>
	export default {
		name: "RgButton"
	};

</script>
<style>
	button {
		background: none;
		border: none;
		outline: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	button:hover {
		cursor: pointer;
	}

	button:active {
		position: relative;
		top: 2px;
	}
</style>