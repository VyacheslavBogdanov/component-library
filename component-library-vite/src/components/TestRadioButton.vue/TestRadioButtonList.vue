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

		<li v-for="(item, index) in highlightedItems" :key="index" class="radio-list__item">
			<label class="radio-list__label">
				<input
					type="radio"
					class="radio-list__input"
					:checked="localSelectedItem === item.original"
					@change="updateValue(item.original)"
				/>
				<span class="radio-list__text">
					<span
						v-for="(part, idx) in item.highlightedText"
						:key="idx"
						class="radio-list__highlighted-text"
						:class="{ 'radio-list__highlighted-text--bold': part.highlighted }"
					>
						{{ part.text }}
					</span>
				</span>
			</label>
		</li>
	</ul>

	<div v-if="noResults" class="radio-list__no-results">Результаты не найдены</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import type { PropType } from 'vue';
import { highlightMatch } from './utils/utils';

interface HighlightedText {
	text: string;
	highlighted: boolean;
}

interface HighlightedItem {
	original: string;
	highlightedText: HighlightedText[];
}

const highlightedItems = computed<HighlightedItem[]>(() => {
	return props.items.map((item) => {
		const highlightedText = highlightMatch(item, props.searchQuery);
		return {
			original: item,
			highlightedText,
		};
	});
});

const props = defineProps({
	items: {
		type: Array as PropType<readonly string[]>,
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
	searchQuery: {
		type: String,
		default: '',
	},
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | null): void;
}>();

const localSelectedItem = ref<string | null>(props.modelValue);

const updateValue = (newValue: string | null): void => {
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

	&__highlighted-text {
		font-weight: normal;

		&--bold {
			font-weight: bold;
		}
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
