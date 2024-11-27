<!-- <template>
	<div v-if="isDropdownVisible" class="dropdown" @mousedown="handleDropdownClick">

		<div class="search-wrapper" v-if="showSearch">
			<input
				class="search"
				type="text"
				placeholder="Поиск"
				:value="props.modelValue"
				@input="({ target }) => emit('update:modelValue', target)"
				@focus="emit('showDropdown', true)"
			/>
			<span class="searchicon"></span>
		</div>

		<ul class="dropdown-list">
			<li v-if="itemsToDisplay.length > 0" class="dropdown-list__item">
				<label class="dropdown-list__label">
					<input
						class="dropdown-list__checkbox"
						type="checkbox"
						v-model="selectAll"
						@change="handleSelectAll"
					/>
					<span class="dropdown-list__text">Все</span>
				</label>
			</li>
			<li v-for="(item, index) in itemsToDisplay" :key="index" class="dropdown-list__item">
				<label class="dropdown-list__label">
					<input
						class="dropdown-list__checkbox"
						type="checkbox"
						v-model="checkedItems"
						:value="item"
						@change="updateDisplayText"
					/>
					<span class="dropdown-list__text" v-html="highlightMatch(item)"></span>
				</label>
			</li>
		</ul>
		<div v-if="noResultsFound" class="no-results">Результаты не найдены</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { handleDropdownClick } from '../utils/utils';
const props = defineProps<{
	modelValue: string;
	isDropdownVisible: boolean;
	items: string[];
	checkedItems: string[];
	searchQuery: string;
	filteredList: string[];
	selectAll: boolean;
	handleSelectAll: any;
	updateDisplayText: any;
	highlightMatch: any;
	noResultsFound: boolean;
}>();

const emit = defineEmits<{
	(event: 'showDropdown', value: string): void;
	(event: 'update:modelValue', value: string): void;
}>();

const itemsToDisplay = computed(() => {
	if (props.filteredList.length <= 10) return props.filteredList;

	const selectedItems = props.filteredList
		.filter((item) => props.checkedItems.includes(item))
		.sort((a, b) => a.localeCompare(b));

	const unselectedItems = props.filteredList.filter((item) => !props.checkedItems.includes(item));

	return [...selectedItems, ...unselectedItems];
});

const showSearch = computed(() => props.items.length > 10);
</script>
 -->

<template>
	<div v-if="isDropdownVisible" class="dropdown" @mousedown="handleDropdownClick">
		<div class="search-wrapper" v-if="showSearch">
			<input
				class="search"
				type="text"
				placeholder="Поиск"
				:value="modelValue"
				@input="handleInput"
				@focus="emit('showDropdown', true)"
			/>
			<span class="searchicon"></span>
		</div>
		<ul class="dropdown-list">
			<li v-if="itemsToDisplay.length > 0" class="dropdown-list__item">
				<label class="dropdown-list__label">
					<input
						class="dropdown-list__checkbox"
						type="checkbox"
						:checked="selectAll"
						@change="emit('update:selectAll', !selectAll)"
					/>
					<span class="dropdown-list__text">Все</span>
				</label>
			</li>
			<li v-for="(item, index) in itemsToDisplay" :key="index" class="dropdown-list__item">
				<label class="dropdown-list__label">
					<input
						class="dropdown-list__checkbox"
						type="checkbox"
						:checked="checkedItems.includes(item)"
						@change="toggleItem(item)"
					/>
					<span class="dropdown-list__text" v-html="highlightMatch(item)"></span>
				</label>
			</li>
		</ul>
		<div v-if="noResultsFound" class="no-results">Результаты не найдены</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { handleDropdownClick } from '../utils/utils';

const props = defineProps<{
	modelValue: string;
	isDropdownVisible: boolean;
	items: string[];
	checkedItems: string[];
	searchQuery: string;
	filteredList: string[];
	selectAll: boolean;
	highlightMatch: any;
	noResultsFound: boolean;
}>();

const emit = defineEmits<{
	(event: 'showDropdown', value: boolean): void;
	(event: 'update:modelValue', value: string): void;
	(event: 'update:selectAll', value: boolean): void;
	(event: 'update:checkedItems', value: string[]): void;
}>();

// console.log('ITEMS', props.items);
// console.log('filteredList', props.filteredList);

const itemsToDisplay = computed(() => {
	if (props.filteredList.length <= 10) return props.filteredList;

	const selectedItems = props.filteredList
		.filter((item) => props.checkedItems.includes(item))
		.sort((a, b) => a.localeCompare(b));

	const unselectedItems = props.filteredList.filter((item) => !props.checkedItems.includes(item));

	return [...selectedItems, ...unselectedItems];
});

// console.log('itemsToDisplay', itemsToDisplay);

const showSearch = computed(() => props.filteredList.length > 10);

const toggleItem = (item: string) => {
	const newCheckedItems = props.checkedItems.includes(item)
		? props.checkedItems.filter((checkedItem) => checkedItem !== item)
		: [...props.checkedItems, item];

	emit('update:checkedItems', newCheckedItems);
};

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement | null;
	if (target) {
		emit('update:modelValue', target.value);
	}
};
</script>

<style lang="scss" scoped>
@import '../utils/variables.scss';

.dropdown {
	position: relative;
	background-color: white;
	border: 1.5px solid $focus-color;
	border-radius: 0 0 8px 8px;
	min-height: 180px;
	max-height: 400px;
	overflow-y: auto;
	width: 100%;
	transition:
		border-color 0.2s,
		box-shadow 0.2s;
	border-top: #ffffff;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;

	// Разобраться с блоком .search

	.search-wrapper {
		position: relative;
		width: 95%;
		margin: 7px 0 0 10px;
	}

	.search {
		width: 100%;
		height: $height-input;
		border: 1.5px solid $border-color;
		border-radius: 8px;
		outline: none;
		padding-right: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		font-size: $font-size;

		&:focus {
			border-color: $focus-color;

			~ .searchicon {
				&::before {
					border-color: $focus-color;
				}
				&::after {
					background: $focus-color;
				}
			}
		}
	}

	.searchicon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		pointer-events: none;

		&::before {
			content: '';
			width: 9.5px;
			height: 9.5px;
			border: 1.5px solid $border-color;
			border-radius: 50%;
			transition: border-color 0.2s;
			position: absolute;
			transform: translate(-2px, -2px);
		}

		&::after {
			content: '';
			position: absolute;
			width: 1.5px;
			height: 9.5px;
			background: $border-color;
			transition: border-color 0.2s;
			transform: rotate(-45deg) translate(-0px, 7px);
		}
	}

	// Разобраться с блоком .search

	.dropdown-list {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;

		&__item {
			cursor: $cursor;
			padding: 8px;
			margin: 0;
			text-align: start;
			position: relative;

			&:hover {
				background-color: $hover-background;
			}
		}

		&__label {
			cursor: $cursor;
		}

		&__checkbox {
			cursor: $cursor;
		}

		// b {
		// 	font-weight: bold;
		// }
	}
}

.no-results {
	color: $text-color;
	position: relative;
	margin: auto;
	font-size: $font-size;
	font-family: $font-allelement;
}
</style>
