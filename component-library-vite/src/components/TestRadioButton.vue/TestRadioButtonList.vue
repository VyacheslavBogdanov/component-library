<template>
	<ul class="radio-list">
		<li v-if="!noResults" class="radio-list__item">
			<label class="radio-list__label">
				<input
					type="radio"
					class="radio-list__input"
					:checked="localSelectedItem === null"
					@change="updateValue(null)"
				/>
				<span class="radio-list__text">Не выбрано</span>
			</label>
		</li>

		<li v-for="(item, index) in items" :key="index" class="radio-list__item">
			<label class="radio-list__label">
				<input
					type="radio"
					class="radio-list__input"
					:checked="localSelectedItem === item"
					@change="updateValue(item)"
				/>
				<span class="radio-list__text">{{ item }}</span>
			</label>
		</li>
	</ul>

	<div v-if="noResults" class="radio-list__no-results">Результаты не найдены</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
	items: {
		type: Array as PropType<string[]>,
		required: true,
	},
	modelValue: {
		type: String as PropType<string | null>,
		default: null,
	},
	noResults: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | null): void;
}>();

const localSelectedItem = ref<string | null>(props.modelValue);

const updateValue = (newValue: string | null) => {
	emit('update:modelValue', newValue);
	localSelectedItem.value = newValue;
};
</script>

<style lang="scss" scoped>
@import './utils/style-variables.scss';

.radio-list {
	list-style: none;
	padding: 0;
	margin: 0;

	&__item {
		display: flex;
		align-items: center;
		padding: 8px;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: #f5f5f5;
		}
	}

	&__label {
		display: flex;
		align-items: center;
		width: 100%;
		cursor: pointer;
	}

	&__input {
		margin-right: 8px;
		cursor: pointer;
	}

	&__text {
		font-size: 16px;
		color: #333;
	}

	&__no-results {
		color: #00000094;
		position: relative;
		margin: auto;
		font-size: 16px;
		font-family: $font-allelement;
	}
}
</style>
