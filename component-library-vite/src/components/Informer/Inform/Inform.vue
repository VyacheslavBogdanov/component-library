<template>
	<div v-for="(type, index) in messageTypes" :key="index" :class="['inform', type.class]">
		<div :class="getTextColorModifier(type.class)">
			<div class="inform__icon">ⓘ</div>
			{{ type.message }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { MessageTypes } from '../utils/types.js';

const props = defineProps<{
	theme: string;
	messageTypes: MessageTypes[];
}>();

const getTextColorModifier = (modifier: string): string | undefined => {
	if (props.theme === 'informer--dark') {
		if (modifier === 'inform--default') {
			return 'inform--dark-theme-text';
		}
	}
	return undefined;
};
</script>

<style lang="scss" scoped>
.inform {
	position: relative;
	display: flex;
	align-items: center;
	padding: 10px 30px 10px 40px;
	border-radius: 8px;
	font-family: Arial, sans-serif;
	max-width: fit-content;
	word-wrap: break-word;
	font-size: 23px;
	font-family: sans-serif;
	height: 40px;

	&__icon {
		display: flex;
		position: absolute;
		transform: rotate(180deg);
		left: 10px;
		height: 30px;
	}

	&--success {
		background-color: #e0fde7;
		color: #2a9b44;
	}

	&--warning {
		background-color: #f9ebd8;
		color: #d77417;
	}

	&--error {
		background-color: #f2dee0;
		color: #db1428;
	}

	&--info {
		background-color: #e3e3ff;
		color: #1052ec;
	}

	&--default {
		background-color: #cecece;
		color: #000;
	}

	&--dark-theme-text {
		color: #fff;
	}
}
</style>
