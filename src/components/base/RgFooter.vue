<template functional>
	<footer
		:class="[data.class || data.staticClass ? '' : 'footer',data.class ? data.class : '',data.staticClass ? data.staticClass : '']"
		v-bind="data.attrs"
		v-on="listeners"
	>
		<slot />
	</footer>
</template>
<script>
	export default {
		name: "RgFooter"
	};

</script>
<style scoped lang="scss">
	.footer {
		width: 100%;
		height: 1.07rem;
		margin: -1.07rem auto 0;
		background: rgba(255, 255, 255, 0.9);
	}
</style>
