<template functional>
	<button
		:class="[data.class?data.class:'',data.staticClass?data.staticClass:'']"
		v-bind="data.attrs"
		v-tap="{methods:listeners.click}"
		v-on="delete listeners.click && listeners"
	>
		<slot/>
	</button>
</template>

<script>

	export default {
		name: "RgButton"
	};

</script>