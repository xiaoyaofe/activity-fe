<template functional>
	<footer
		:class="`footer ${data.class ? data.class : '' } ${data.staticClass ? (data.staticClass) : ''}`"
		v-bind="data.attrs"
		v-on="listeners"
	>
		<slot/>
	</footer>
</template>
<script>
	export default {
		name: "RgFooter"
	};

</script>
<style scoped lang="scss">
	.footer {
		position: relative;
		width: 100%;
		height: $footerPcHeight;
		margin: -$footerPcHeight auto 0;
	}
</style>
