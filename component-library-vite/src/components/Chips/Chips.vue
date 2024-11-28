<template>
	<div class="Chips">
		<h1>Chips</h1>
		<div class="filter-container" ref="filterContainer">
			<label
				:class="{
					'filter-container__label': true,
					'filter-container__label--active': isDropdownVisible,
				}"
				>Исполнитель</label
			>
			<div
				:class="{
					'filter-container--iconPositionTop': isDropdownVisible,
					'filter-container--iconPositionDown': !isDropdownVisible,
				}"
			>
				⌃
			</div>
			<input
				readonly
				type="text"
				v-model="displayText"
				@focus="isDropdownVisible = true"
				:class="{
					'filter-container__input': true,
					'filter-container__input--active': isDropdownVisible,
				}"
			/>
			<Dropdown
				v-model="searchQuery"
				:searchQuery="searchQuery"
				@showDropdown="(bool: boolean) => (isDropdownVisible = bool)"
				:isDropdownVisible="isDropdownVisible"
				:items="items"
				:checkedItems="checkedItems"
				@update:checkedItems="(items) => (checkedItems = items)"
				:filteredList="filteredList"
				:selectAll="selectAll"
				@update:selectAll="handleSelectAllUpdate"
				:handleSelectAll="handleSelectAll"
				:updateDisplayText="updateDisplayText"
				:highlightMatch="highlightMatch"
				:noResultsFound="noResultsFound"
			/>
		</div>
		<ChipsContainer
			:isDropdownVisible="isDropdownVisible"
			:checkedItems="checkedItems"
			:removeChip="removeChip"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { debounce } from './utils/utils';
import { fetchData } from '../mocks/db';
import Dropdown from './Dropdown/Dropdown.vue';
import ChipsContainer from './ChipsContainer/ChipsContainer.vue';

const isDropdownVisible = ref<boolean>(false);
const searchQuery = ref<string>('');
const selectAll = ref<boolean>(false);
const checkedItems = ref<string[]>([]);
const items = ref<string[]>([]);
const noResultsFound = ref<boolean>(false);
const filteredList = ref<string[]>(items.value);
const filterContainer = ref<HTMLElement | null>(null);

const loadData = async () => {
	try {
		items.value = await fetchData('/people');
		filteredList.value = [...items.value];
		noResultsFound.value = filteredList.value.length === 0;
	} catch (error) {
		console.error('Error loading data:', error);
	}
};

onMounted(() => {
	loadData();
	document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

watch(searchQuery, () => {
	updateFilteredList();
});

const handleClickOutside = (event: MouseEvent) => {
	if (filterContainer.value && !filterContainer.value.contains(event.target as Node)) {
		isDropdownVisible.value = false;
	}
};

// const updateFilteredList = debounce(() => {
// 	filteredList.value = items.value.filter((item) =>
// 		item.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
// 	);

// 	noResultsFound.value = filteredList.value.length === 0;
// }, 700);

const updateFilteredList = debounce(() => {
	filteredList.value = items.value.filter((item) =>
		item.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
	);
	noResultsFound.value = filteredList.value.length === 0;

	// Обновление состояния выбора "Выбрать все" при изменении списка
	selectAll.value = filteredList.value.every((item) => checkedItems.value.includes(item));
}, 700);

const displayText = computed(() => {
	if (checkedItems.value.length === 0) return 'Не выбрано';
	if (checkedItems.value.length === 1) return checkedItems.value[0];
	return `Выбрано ${checkedItems.value.length}`;
});

const highlightMatch = (item: string): string => {
	if (!searchQuery.value) return item;
	const regex = new RegExp(`^(${searchQuery.value})`, 'i');
	return item.replace(regex, '<b>$1</b>');
};

// const handleSelectAll = () => {
// 	if (selectAll.value) {
// 		checkedItems.value = [...filteredList.value];
// 	} else {
// 		checkedItems.value = [];
// 	}
// };

const handleSelectAll = () => {
	if (selectAll.value) {
		// Если выбрано "Выбрать все", добавляем все элементы filteredList в checkedItems
		checkedItems.value = Array.from(new Set([...checkedItems.value, ...filteredList.value]));
	} else {
		// Если снимается "Выбрать все", удаляем элементы filteredList из checkedItems
		checkedItems.value = checkedItems.value.filter(
			(item) => !filteredList.value.includes(item),
		);
	}
};

const handleSelectAllUpdate = (value: boolean) => {
	selectAll.value = value;
	handleSelectAll();
};

const updateDisplayText = () => {
	selectAll.value = checkedItems.value.length === filteredList.value.length;
};

const removeChip = (chip: string) => {
	checkedItems.value = checkedItems.value.filter((item) => item !== chip);
	updateDisplayText();
};
</script>

<style lang="scss" scoped>
@import './utils/variables.scss';

.filter-container {
	position: relative;
	width: 450px;
	display: flex;
	flex-direction: column;
	font-family: $font-allelement;

	&__label {
		position: relative;
		width: min-content;
		height: 20px;
		top: 10px;
		left: 15px;
		background-color: white;
		padding: 0 3px;
		font-size: $font-size;
		color: $text-color;

		&--active {
			color: $focus-color;
		}
	}

	&--iconPositionTop {
		position: absolute;
		right: 15px;
		top: 44.5px;
		transform: translateY(-35%);
		font-size: 25px;
		font-weight: lighter;
		color: $icon-color-active;
		cursor: $cursor;
		pointer-events: none;
	}

	&--iconPositionDown {
		position: absolute;
		right: 15px;
		top: 44.5px;
		transform: translateY(-65%) rotate(180deg);
		font-size: 25px;
		font-weight: lighter;
		color: $icon-color;
		cursor: $cursor;
		pointer-events: none;
	}
	&__input {
		width: 100%;
		padding-left: 10px;
		font-size: $font-size;
		color: $text-color;
		border: 1.5px solid $border-color;
		border-radius: 8px;
		outline: none;
		transition: border-color 0.2s;
		cursor: $cursor;
		box-sizing: border-box;
		height: $height-input;
		padding-right: 40px;

		&--active {
			border-bottom: none;
			border-radius: 8px 8px 0 0;
			border-color: $focus-color;
		}
	}
}
</style>
