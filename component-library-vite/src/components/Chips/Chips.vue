<template>
	<div class="Chips">
		<h1>Chips</h1>
		<div class="filter-container" ref="filterContainer">
			<!-- <Select :isDropdownVisible="isDropdownVisible" /> -->
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
				@showDropdown="(bool: boolean) => (isDropdownVisible = bool)"
				:isDropdownVisible="isDropdownVisible"
				:items="items"
				:checkedItems="checkedItems"
				:searchQuery="searchQuery"
				:filteredList="filteredList"
				:selectAll="selectAll"
				:handleSelectAll="handleSelectAll"
				:updateDisplayText="updateDisplayText"
				:highlightMatch="highlightMatch"
				:noResultsFound="noResultsFound"
			/>
			<div v-if="isDropdownVisible" class="dropdown" @mousedown="handleDropdownClick">
				<!-- Разобраться с блоком .search-->
				<div class="search-wrapper" v-if="showSearch">
					<input
						class="search"
						type="text"
						v-model="searchQuery"
						placeholder="Поиск"
						@focus="isDropdownVisible = true"
					/>
					<span class="searchicon"></span>
				</div>
				<!-- Разобраться с блоком .search-->
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
					<li
						v-for="(item, index) in itemsToDisplay"
						:key="index"
						class="dropdown-list__item"
					>
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
		</div>
		<div v-if="!isDropdownVisible" class="chips-container">
			<div
				v-for="(chip, index) in checkedItems"
				:key="index"
				class="chips-container__chip"
				@mouseenter="showTooltip(chip, $event)"
				@mousemove="moveTooltip($event)"
				@mouseleave="hideTooltip"
			>
				<span class="chips-container__chip-content">{{ chip }}</span>
				<button class="chips-container__delete-chip" @click="removeChip(chip)">
					<div class="chips-container__delete-chip-icon">✕</div>
				</button>
			</div>
			<span v-if="tooltipText" :style="tooltipStyle" class="tooltip">{{ tooltipText }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { fetchData } from '../mocks/db';
import Select from './Select/Select.vue';

const tooltipText = ref<string | null>(null);
const tooltipStyle = ref<Record<string, string>>({});
const isDropdownVisible = ref<boolean>(false);
const searchQuery = ref<string>('');
const selectAll = ref<boolean>(false);
const checkedItems = ref<string[]>([]);
const items = ref<string[]>([]);
const noResultsFound = ref<boolean>(false);
const filteredList = ref<string[]>(items.value);

const loadData = async () => {
	try {
		items.value = await fetchData('/people');
	} catch (error) {
		console.error('Error loading data:', error);
	}
};

function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return function (...args: any[]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}

const showTooltip = (chip: string, event: MouseEvent) => {
	if (chip.length > 17) {
		tooltipText.value = chip;
		updateTooltipPosition(event);
	}
};

const moveTooltip = (event: MouseEvent) => {
	if (tooltipText.value) {
		updateTooltipPosition(event);
	}
};

const hideTooltip = () => {
	tooltipText.value = null;
};

const updateTooltipPosition = (event: MouseEvent) => {
	tooltipStyle.value = {
		left: `${event.pageX + 10}px`,
		top: `${event.pageY + 10}px`,
	};
};

const updateFilteredList = debounce(() => {
	filteredList.value = items.value.filter((item) =>
		item.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
	);

	noResultsFound.value = filteredList.value.length === 0;
}, 700);

watch(searchQuery, () => {
	updateFilteredList();
});

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

const filterContainer = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
	if (filterContainer.value && !filterContainer.value.contains(event.target as Node)) {
		isDropdownVisible.value = false;
	}
};

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside);
	loadData();
});

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

// const handleDropdownClick = (event: MouseEvent) => {
// 	const target = event.target as HTMLElement;
// 	if (!target.classList.contains('search')) {
// 		event.preventDefault();
// 	}
// };

const handleSelectAll = () => {
	if (selectAll.value) {
		checkedItems.value = [...filteredList.value];
	} else {
		checkedItems.value = [];
	}
};

const updateDisplayText = () => {
	selectAll.value = checkedItems.value.length === filteredList.value.length;
};

// const itemsToDisplay = computed(() => {
// 	if (filteredList.value.length <= 10) return filteredList.value;

// 	const selectedItems = filteredList.value
// 		.filter((item) => checkedItems.value.includes(item))
// 		.sort((a, b) => a.localeCompare(b));

// 	const unselectedItems = filteredList.value.filter((item) => !checkedItems.value.includes(item));

// 	return [...selectedItems, ...unselectedItems];
// });

// const showSearch = computed(() => items.value.length > 10);

const removeChip = (chip: string) => {
	checkedItems.value = checkedItems.value.filter((item) => item !== chip);
	updateDisplayText();
};
</script>

<style lang="scss" scoped>
$height-input: 45px;
$focus-color: #007bff;
$font-allelement: sans-serif;
$border-color: #9f979773;
$icon-color: #0a00007d;
$icon-color-active: #0a0000c2;
$hover-background: #ece7e773;
$text-color: #00000094;
$font-size: 16px;
$cursor: pointer;
$chip-bg-color: #e0e0e0;
$chip-text-color: #333;
$chip-hover-bg-color: #d0d0d0;
$chip-border-radius: 16px;

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

.chips-container {
	display: flex;
	flex-wrap: wrap;
	max-height: 153px;
	width: 600px;
	overflow-y: auto;
	gap: 8px;
	margin: 12px 0 0 16px;

	&__chip {
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 0 0 8px;
		height: 23px;
		max-width: 170px;
		background-color: #e0e0e0;
		border-radius: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #333;
		cursor: default;

		&:hover {
			background-color: $chip-hover-bg-color;
		}

		&:hover .tooltip {
			display: block;
		}
	}

	&__chip-content {
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__delete-chip {
		background: none;
		border: none;
		color: $icon-color;
		font-size: 9px;
		font-weight: bold;
		cursor: pointer;
		margin-left: 8px;
	}

	&__delete-chip-icon {
		height: 14px;
		width: 14px;
		border: none;
		border-radius: 50%;
		background-color: rgb(88, 85, 85);
		color: #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.tooltip {
	position: absolute;
	background-color: rgb(21, 18, 18);
	color: rgb(224, 211, 211);
	font-size: 12px;
	padding: 4px 8px;
	border-radius: 4px;
	white-space: nowrap;
	z-index: 1;
	pointer-events: none;
}
</style>
