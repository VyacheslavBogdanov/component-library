<template>
	<div
		class="searchbox"
		:class="{
			'searchbox--focused': isFocused,
			'searchbox--filled': searchQuery,
		}"
		ref="searchboxContainer"
	>
		<input
			required
			type="text"
			v-model="searchQuery"
			@focus="handleFocus(true)"
			@click="showFullList"
			@blur="handleFocus(false)"
			:class="{
				'searchbox__input--has-dropdown': showDropdown,
			}"
			class="searchbox__input"
		/>
		<label
			:class="{
				'searchbox__placeholder--active': searchQuery || isFocused,
			}"
			class="searchbox__placeholder"
		>
			Комментарий
		</label>
		<div class="searchbox__icon"></div>
		<DropdownList
			v-if="showDropdown"
			:items="filteredList"
			:searchQuery="searchQuery"
			:highlightMatch="highlightMatch"
			@select="selectItem"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { fetchData } from '../../mocks/db.js';
import { debounce, highlightMatch } from '../utils/utils.js';
import DropdownList from '../DropdownList/DropdownList.vue';

const searchQuery = ref<string>('');
const filteredList = ref<string[]>([]);
const people = ref<string[]>([]);
const isFocused = ref<boolean>(false);
const userIsSelecting = ref<boolean>(false);
const searchboxContainer = ref<HTMLDivElement | null>(null);

const updateFilteredList = debounce(() => {
	if (searchQuery.value.trim().length > 0) {
		filteredList.value = people.value
			.filter((name: string) =>
				name.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
			)
			.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	} else {
		filteredList.value = [];
	}
}, 300);

const showDropdown = computed(() => {
	return filteredList.value.length > 0;
});

const handleFocus = (focus: boolean) => {
	isFocused.value = focus;
	if (!focus && !searchQuery.value.trim()) {
		filteredList.value = [];
	}
};

const showFullList = () => {
	filteredList.value = [...people.value];
};

const handleClickOutside = (event: MouseEvent) => {
	if (searchboxContainer.value && !searchboxContainer.value.contains(event.target as Node)) {
		handleFocus(false);
	}
};

watch(searchQuery, () => {
	if (!userIsSelecting.value) {
		updateFilteredList();
	} else {
		userIsSelecting.value = false;
	}
});

const selectItem = (name: string): void => {
	searchQuery.value = name;
	userIsSelecting.value = true;
	filteredList.value = [];
};

const loadData = async () => {
	try {
		people.value = await fetchData('/people');
	} catch (error) {
		console.error('Error loading data:', error);
	}
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
@import '../utils/style-variables.scss';

.searchbox {
	display: flex;
	flex-direction: column;
	position: relative;
	width: $width-container;

	&--focused {
		.searchbox__icon {
			&::before {
				border-color: $color-border-focus;
			}
			&::after {
				background-color: $color-border-focus;
			}
		}
		.searchbox__input {
			border-color: $color-border-focus;
		}
	}
	&--filled {
		.searchbox__icon {
			&::before {
				border-color: $color-border-focus;
			}
			&::after {
				background-color: $color-border-focus;
			}
		}

		.searchbox__input {
			border-color: $color-border-focus;
		}
	}

	&__input {
		width: 100%;
		height: $height-input;
		font-size: $font-size-input;
		border: 1.5px solid $color-border;
		border-radius: $border-radius;
		padding: 0 30px 0 10px;
		font-family: $font-family;
		transition: border-color 0.2s;
		outline: none;
		box-sizing: border-box;

		&--has-dropdown {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-bottom: none;
			border-color: $color-border-focus;
		}
	}

	&__placeholder {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: white;
		padding: 0 5px;
		color: $color-border;
		transition: all 0.2s ease;
		font-family: $font-family;
		z-index: 2;
		transform-origin: left top;
		pointer-events: none;
		overflow: hidden;
		text-overflow: ellipsis;
		width: min-content;

		&--active {
			top: -1px;
			font-size: 14px;
			color: $color-border-focus;
			background: white;
		}
	}

	&__icon {
		position: absolute;
		right: 9px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		transition: all 0.2s ease;

		&::before,
		&::after {
			content: '';
			position: absolute;
			transition: all 0.2s ease;
		}

		&::before {
			width: 8.5px;
			height: 8.5px;
			border: 1.5px solid #9f979773;
			border-radius: 50%;
			transform: translate(2px, 2px);
		}

		&::after {
			width: 1.5px;
			height: 8.5px;
			background: #9f979773;
			transform: rotate(-45deg) translate(2px, 17px);
		}
	}
}
</style>
