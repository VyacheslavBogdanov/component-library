<template>
	<div class="search-wrapper">
		<input
			type="text"
			v-model="localSearchQuery"
			placeholder="Поиск"
			@focus="handleFocus"
			class="search-wrapper__input"
		/>
		<div class="search-wrapper__icon" />
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
	modelValue: {
		type: String as PropType<string>,
		default: '',
	},
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'focus'): void;
}>();

const localSearchQuery = ref<string>(props.modelValue);

watch(localSearchQuery, (newValue: string) => {
	emit('update:modelValue', newValue);
});
const handleFocus = () => {
	emit('focus');
};
</script>

<style lang="scss" scoped>
@import '../utils/style-variables.scss';

.search-wrapper {
	position: relative;
	width: 95%;
	margin-left: auto;
	margin-right: auto;

	&__input {
		width: 100%;
		height: $height-input;
		border: 1.5px solid #9f979773;
		border-radius: 8px;
		outline: none;
		padding: 0 12px;
		font-size: 16px;
		color: #333;
		box-sizing: border-box;
		transition: border-color 0.2s;

		&--focused {
			border-color: $focus-color;
		}

		&:focus {
			border-color: $focus-color;
		}
	}

	&__icon {
		position: absolute;
		right: 9px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		transition: all 0.2s ease;

		&::before,
		&::after {
			content: '';
			position: absolute;
			transition: all 0.2s ease;
		}

		&::before {
			width: 8.5px;
			height: 8.5px;
			border: 1.5px solid #9f979773;
			border-radius: 50%;
			transform: translate(2px, 2px);
		}

		&::after {
			width: 1.5px;
			height: 8.5px;
			background: #9f979773;
			transform: rotate(-45deg) translate(2px, 17px);
		}

		.search-wrapper__input:focus + & {
			&::before {
				border-color: $focus-color;
			}
			&::after {
				background: $focus-color;
			}
		}
	}
}
</style>
