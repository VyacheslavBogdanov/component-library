<template>
	<h1>Informer</h1>
	<div :class="['informer', theme]">
		<button
			class="informer__theme-toggle"
			@click="theme = theme === 'informer--light' ? 'informer--dark' : 'informer--light'"
		>
			{{ theme === 'dark' ? 'Light' : 'Dark' }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const theme = ref<string>('informer--light');
</script>

<style lang="scss" scoped>
.informer {
	padding: 16px;
	margin: 16px;
	display: flex;
	border-radius: 8px;
	flex-direction: column;
	gap: 30px;
	transition:
		background-color 0.3s,
		color 0.3s;
	width: 400px;

	&__theme-toggle {
		width: 50px;
		background-color: transparent;
		border: 1.5px solid #9f979773;
		color: inherit;
		border-radius: 8px;
		padding: 4px 8px;
		cursor: pointer;
		font-family: sans-serif;
		text-decoration: none;
		transition:
			background-color 0.3s,
			color 0.3s;
	}
	&.informer--light {
		background-color: #fff;
		color: #484747;
	}

	&.informer--dark {
		background-color: #484747;
		color: #fff;
	}
}
</style>
