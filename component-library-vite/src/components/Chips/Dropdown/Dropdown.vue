<template>
	<div v-if="isDropdownVisible" class="dropdown" @mousedown="handleDropdownClick">
		<!-- Разобраться с блоком .search-->
		<div class="search-wrapper" v-if="showSearch">
			<input
				class="search"
				type="text"
				v-model="searchQuery"
				placeholder="Поиск"
				@focus="emit('showDropdown', true)"
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
	// (event: 'ToggleHeaderDate', type: 'month' | 'year', route: 'prev' | 'next'): void;
	// (event: 'changeSelectedMonth', value: number): void;
	(event: 'showDropdown', value: boolean): void;
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

<style lang="scss" scoped></style>
