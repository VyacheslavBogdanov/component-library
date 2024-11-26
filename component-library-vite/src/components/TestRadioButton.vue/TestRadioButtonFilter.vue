<template>
	<div class="filter" ref="filterContainer">
		<input
			readonly
			type="text"
			class="filter__input"
			:value="displayText"
			@focus="toggleDropdown(true)"
			:class="{ 'filter__input--has-dropdown': isDropdownVisible }"
		/>

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
import { debounce } from './utils.js';
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
	if (state && !searchQuery.value) {
		filteredList.value = [...people.value];
	}
	noResultsFound.value = false;
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
$width-checkbox: 450px;
$height-input: 45px;
$focus-color: #007bff;
$font-allelement: sans-serif;

.filter {
	position: relative;
	width: $width-checkbox;
	margin-left: 16px;
	margin-right: 16px;
	margin-top: 24px;
	margin-bottom: 24px;
	display: flex;
	flex-direction: column;

	// Стиль для иконок
	.filter__icon--down {
		position: absolute;
		right: 15px;
		top: 44.5px;
		transform: translateY(-65%) rotate(180deg);
		font-size: 25px;
		font-weight: lighter;
		color: #0a00007d;
	}

	.filter__icon--top {
		position: absolute;
		right: 15px;
		top: 44.5px;
		transform: translateY(-35%);
		font-size: 25px;
		font-weight: lighter;
		color: #0a0000c2;
	}

	.filter__label {
		position: relative;
		width: min-content;
		height: 20px;
		top: 10px;
		left: 15px;
		background-color: white;
		padding: 0 3px;
		font-size: 16px;
		color: #00000094;
		font-family: $font-allelement;

		&.filter__label--active {
			color: $focus-color;
		}
	}
}

.filter__input {
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

	&.filter__input--has-dropdown {
		border-bottom: none;
		border-radius: 8px 8px 0 0;
		border-color: $focus-color;
	}
}

.filter__dropdown {
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

	.filter__search-wrapper {
		position: relative;
		width: 95%;
		margin: 7px 0 0 10px;
	}

	.filter__search {
		width: 100%;
		height: $height-input;
		border: 1.5px solid #9f979773;
		border-radius: 8px;
		outline: none;
		padding-right: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		font-size: 16px;

		&:focus {
			border-color: $focus-color;

			~ .filter__search-icon {
				&::before {
					border-color: $focus-color;
				}
				&::after {
					background: $focus-color;
				}
			}
		}
	}

	.filter__search-icon {
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
			border: 1.5px solid #9f979773;
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
			background: #9f979773;
			transition: border-color 0.2s;
			transform: rotate(-45deg) translate(-0px, 7px);
		}
	}

	.filter__dropdown-list {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;

		.filter__dropdown-item {
			padding: 8px;
			margin: 0;
			cursor: pointer;
			text-align: start;
			position: relative;

			&:hover {
				background-color: #ece7e773;
			}

			b {
				font-weight: bold;
			}
		}
	}

	.filter__no-results {
		color: #00000094;
		position: relative;
		margin: auto;
		font-size: 16px;
		font-family: $font-allelement;
	}
}
</style>
