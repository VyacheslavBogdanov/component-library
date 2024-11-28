<template>
	<ul class="checkbox-list">
		<li v-if="!noResults" class="checkbox-list__item">
			<label class="checkbox-list__label">
				<input
					type="checkbox"
					class="checkbox-list__input"
					:checked="areAllItemsSelected"
					@change="toggleSelectAll"
				/>
				<span class="checkbox-list__text">Все</span>
			</label>
		</li>

		<li v-for="item in highlightedItems" :key="item.original" class="checkbox-list__item">
			<label class="checkbox-list__label">
				<input
					type="checkbox"
					class="checkbox-list__input"
					:checked="localSelectedItems.includes(item.original)"
					@change="(event) => onCheckboxChange(event, item.original)"
				/>
				<span class="checkbox-list__text">
					<span
						v-for="(part, idx) in item.highlightedText"
						:key="idx"
						class="checkbox-list__highlighted-text"
						:class="{ 'checkbox-list__highlighted-text--bold': part.highlighted }"
					>
						{{ part.text }}
					</span>
				</span>
			</label>
		</li>
	</ul>
	<div v-if="noResults" class="checkbox-list__no-results">Результаты не найдены</div>
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

const props = defineProps({
	items: {
		type: Array as PropType<readonly string[]>,
		required: true,
	},
	modelValue: {
		type: Array as PropType<string[]>,
		default: () => [],
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
	(e: 'update:modelValue', value: string[]): void;
}>();

const localSelectedItems = ref<string[]>([...props.modelValue]);

const areAllItemsSelected = computed(() => {
	return (
		props.items.length > 0 &&
		props.items.every((item) => localSelectedItems.value.includes(item))
	);
});

const highlightedItems = computed<HighlightedItem[]>(() => {
	const selectedItems = [...props.items]
		.filter((item) => localSelectedItems.value.includes(item))
		.sort((a, b) => a.localeCompare(b));

	const unselectedItems = [...props.items]
		.filter((item) => !localSelectedItems.value.includes(item))
		.sort((a, b) => a.localeCompare(b));

	const sortedItems = [...selectedItems, ...unselectedItems];

	return sortedItems.map((item) => {
		const highlightedText = highlightMatch(item, props.searchQuery);
		return {
			original: item,
			highlightedText,
		};
	});
});

const toggleSelectAll = () => {
	if (areAllItemsSelected.value) {
		localSelectedItems.value = [];
	} else {
		localSelectedItems.value = [...props.items];
	}
	emit('update:modelValue', localSelectedItems.value);
};

const onCheckboxChange = (event: Event, item: string) => {
	const isChecked = (event.target as HTMLInputElement).checked;
	if (isChecked) {
		localSelectedItems.value.push(item);
	} else {
		localSelectedItems.value = localSelectedItems.value.filter((selected) => selected !== item);
	}
	emit('update:modelValue', localSelectedItems.value);
};
</script>

<style lang="scss" scoped>
@import './utils/style-variables.scss';

.checkbox-list {
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
