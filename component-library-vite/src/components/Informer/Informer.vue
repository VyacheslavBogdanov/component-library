<template>
	<h1>Informer</h1>
	<div :class="['informer', theme]">
		<button
			class="informer__theme-toggle"
			@click="theme = theme === 'informer--light' ? 'informer--dark' : 'informer--light'"
		>
			{{ theme === 'informer--dark' ? 'Light' : 'Dark' }}
		</button>
		<Inform :messageTypes="messageTypes" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchData } from '../mocks/db.js';
import Inform from './Inform/Inform.vue';

interface MessageTypes {
	class: string;
	message: string;
}

const theme = ref<string>('informer--light');
const messageTypes = ref<MessageTypes[]>([]);

const loadData = async () => {
	try {
		messageTypes.value = await fetchData('/message-types');
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	loadData();
});
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
