<template functional>
	<section :class="[data.class]">
		<div :class="data.class + '__title'"></div>
		<p v-if="props.isShowDesc" :class="data.class + '__desc'">{{props.desc}}</p>
		<div :class="data.class +'__content'">
			<slot />
		</div>
	</section>
</template>

<script lang="ts">
	export default {
		props: {
			desc: String,
			isShowDesc: {
				type: Boolean,
				default: true
			}
		}
	};
</script>