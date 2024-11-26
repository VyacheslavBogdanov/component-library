<template>
	<div class="filter" ref="filterContainer">
		<label :class="['filter__label', { 'filter__label--active': isDropdownVisible }]"
			>Исполнитель</label
		>
		<div class="filter__input-wrapper">
			<input
				readonly
				type="text"
				class="filter__input"
				:value="displayText"
				@focus="toggleDropdown(true)"
				:class="{ 'filter__input--has-dropdown': isDropdownVisible }"
			/>
			<div class="filter__icon" :class="{ 'filter__icon--open': isDropdownVisible }">⌃</div>
		</div>
		<div v-if="isDropdownVisible" class="filter__dropdown">
			<TestSearch
				v-if="showSearch"
				class="filter__search"
				v-model="searchQuery"
				@focus="toggleDropdown(true)"
			/>
			<TestRadioButtonList
				class="filter__list"
				:items="itemsToDisplay"
				v-model="selectedItem"
				:noResults="noResultsFound"
				@item-selected="onItemSelected"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { fetchData } from './../mocks/db.js';
import { debounce } from './utils/utils.js';
import TestSearch from './TestSearch.vue';
import TestRadioButtonList from './TestRadioButtonList.vue';

const isDropdownVisible = ref(false);
const searchQuery = ref('');
const selectedItem = ref<string | undefined>(undefined);
const people = ref<string[]>([]);
const filteredList = ref<string[]>([]);
const noResultsFound = ref(false);

const filterAndSortList = (query: string) => {
	return people.value
		.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
		.sort((a, b) => a.localeCompare(b));
};

const updateFilteredList = debounce(() => {
	filteredList.value = filterAndSortList(searchQuery.value);
	noResultsFound.value = filteredList.value.length === 0;
}, 300);

watch(searchQuery, updateFilteredList);

const displayText = computed(() => selectedItem.value || 'Не выбрано');

const filterContainer = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
	if (
		filterContainer.value &&
		!filterContainer.value.contains(event.target as Node) &&
		!(event.target as HTMLElement).closest('.filter__dropdown')
	) {
		isDropdownVisible.value = false;
	}
};
const toggleDropdown = (state: boolean) => {
	isDropdownVisible.value = state;

	if (state) {
		filteredList.value = filterAndSortList(searchQuery.value);
		noResultsFound.value = filteredList.value.length === 0;
	}
};

const itemsToDisplay = computed(() => filteredList.value);
const showSearch = computed(() => people.value.length > 10);

const loadData = async () => {
	try {
		people.value = await fetchData('/people');
		filteredList.value = filterAndSortList('');
	} catch (error) {
		console.error('Ошибка загрузки данных:', error);
	}
};

const onItemSelected = (item: string) => {
	selectedItem.value = item;
	isDropdownVisible.value = false;
};

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside);
	loadData();
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style lang="scss" scoped>
@import './utils/style-variables.scss';

.filter {
	width: $width-checkbox;
	display: flex;
	flex-direction: column;
	position: relative;
	margin-top: 50px;

	&__label {
		position: absolute;
		top: -8px;
		left: 12px;
		background-color: white;
		padding: 0 5px;
		font-size: 14px;
		color: #00000094;
		font-family: $font-allelement;
		z-index: 1;

		&--active {
			color: $focus-color;
		}
	}

	&__input-wrapper {
		position: relative;
		display: flex;
	}

	&__input {
		width: 100%;
		padding-left: 10px;
		font-size: 16px;
		color: #00000094;
		border: 1.5px solid #9f979773;
		border-radius: 8px;
		outline: none;
		transition: border-color 0.2s;
		cursor: pointer;
		box-sizing: border-box;
		height: $height-input;
		padding-right: 40px;

		&--has-dropdown {
			border-bottom: none;
			border-radius: 8px 8px 0 0;
			border-color: $focus-color;
		}
	}

	&__icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-35%);
		font-size: 23px;
		color: #0a00007d;
		transition:
			transform 0.1s ease,
			color 0.2s ease;

		&--open {
			transform: translateY(-65%) rotate(180deg);
			color: #0a0000c2;
		}
	}

	&__dropdown {
		position: relative;
		background-color: white;
		border: 1.5px solid $focus-color;
		border-radius: 0 0 8px 8px;
		min-height: 180px;
		max-height: 400px;
		overflow-y: auto;
		width: 100%;
		transition: border-color 0.2s;
		border-top: #ffffff;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
}
</style>
