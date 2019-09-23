<template functional>
	<transition :name="props.name" v-on="listeners" :css="false" :mode="props.mode">
		<slot></slot>
	</transition>
</template>
<script>
	export default {
		name: "RgAnimate",
		props: {
			name: {
				type: String,
				required: true
			},
			mode: {
				type: String,
				default: "out-in"
			}
		}
	};
</script>
<style scoped></style>