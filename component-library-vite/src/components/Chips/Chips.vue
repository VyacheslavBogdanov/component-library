<!-- <template>
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
import Dropdown from './Dropdown/Dropdown.vue';

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

const removeChip = (chip: string) => {
	checkedItems.value = checkedItems.value.filter((item) => item !== chip);
	updateDisplayText();
};
</script> -->
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
				@showDropdown="(bool: boolean) => (isDropdownVisible = bool)"
				:isDropdownVisible="isDropdownVisible"
				:items="items"
				:checkedItems="checkedItems"
				@update:checkedItems="(items) => (checkedItems = items)"
				:searchQuery="searchQuery"
				:filteredList="filteredList"
				:selectAll="selectAll"
				@update:selectAll="handleSelectAllUpdate"
				:handleSelectAll="handleSelectAll"
				:updateDisplayText="updateDisplayText"
				:highlightMatch="highlightMatch"
				:noResultsFound="noResultsFound"
			/>
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
import Dropdown from './Dropdown/Dropdown.vue';

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

onMounted(() => {
	loadData();
	document.addEventListener('mousedown', handleClickOutside);
});

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

onBeforeUnmount(() => {
	document.removeEventListener('mousedown', handleClickOutside);
});

const handleSelectAll = () => {
	if (selectAll.value) {
		checkedItems.value = [...filteredList.value];
	} else {
		checkedItems.value = [];
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
