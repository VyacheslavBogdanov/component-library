<template>
	<div class="search-container">
		<input
			required
			type="text"
			v-model="searchQuery"
			@blur="handleBlur"
			:class="{ 'has-dropdown': searchQuery && filteredList.length }"
		/>
		<label class="placeholder">Поиск</label>
		<div class="iconsearch"></div>
		<Dropdown
			v-if="showDropdown"
			:items="filteredList"
			:highlightMatch="highlightMatch"
			@select="selectItem"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { people } from '../mocks/db.d';
import Dropdown from './Dropdown.vue';


interface Person {
	id: string;
	name: string;
}


const searchQuery = ref<string>(''); 
const filteredList = ref<Person[]>([]); 
const showDropdown = ref<boolean>(false); 

function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}


const updateFilteredList = debounce(() => {
	filteredList.value = people.filter((item: Person) =>
		item.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()),
	);
	showDropdown.value = !!filteredList.value.length;
}, 300);


watch(searchQuery, () => {
	updateFilteredList();
});


const handleBlur = (): void => {
	showDropdown.value = false; 
};


const highlightMatch = (item: string): { text: string; highlighted: boolean }[] => {
	if (!searchQuery.value) return [{ text: item, highlighted: false }];

	const regex = new RegExp(`^(${searchQuery.value})`, 'i');
	const parts = item.split(regex);

	return parts.map((part, index) => ({
		text: part,
		highlighted: index % 2 === 1, 
	}));
};


const selectItem = (item: Person): void => {
	searchQuery.value = item.name; 
	showDropdown.value = false; 

	console.log('Selected ID:', item.id);
};
</script>


<style lang="scss" scoped>


$border-color-focus: #007bff;
$width-container: 450px;
$font-size-container: 22px;
$min-height-dropdown: 180px;
$max-height-dropdown: 400px;
$height-input: 45px;
$height-input-icon: $height-input * 0.5;
$margin-li: 13px;
$font-allelement: sans-serif;

.search-container {
	max-width: $width-container;
	position: relative;
	margin-left: 16px;
	margin-right: 16px;
	margin-top: 24px;
	margin-bottom: 24px;

	input[type='text'] {
		position: relative;
		font-family: $font-allelement;
		width: 100%;
		height: $height-input;
		font-size: $font-size-container;
		border: 1.5px solid #9f979773;
		border-radius: 8px;
		outline: none;
		transition: border-color 0.2s;
		padding-left: 10px;
		padding-right: 40px;
		box-sizing: border-box;

		&:focus,
		&:valid {
			border-color: $border-color-focus;

			& + .placeholder {
				top: -1px;
				color: $border-color-focus;
				background-color: white;
				font-size: 17px;
			}

			~ .iconsearch::before {
				border-color: $border-color-focus;
			}

			~ .iconsearch::after {
				background: $border-color-focus;
			}
		}

		&.has-dropdown {
			border-bottom: none;
			border-radius: 8px 8px 0 0;
			border-color: $border-color-focus;
		}
	}

	.placeholder {
		position: absolute;
		left: 10px;
		top: 50%;
		font-size: $font-size-container;
		padding: 3px;
		transform: translateY(-50%);
		transition: 0.8ms ease;
		transform-origin: left top;
		pointer-events: none;
		overflow: hidden;
		text-overflow: ellipsis;
		width: min-content;
		color: #9f979773;
		font-family: $font-allelement;
		white-space: nowrap;
	}

	.iconsearch {
		position: absolute;
		right: 7px;
		top: $height-input-icon;
		width: 30px;
		height: 30px;
		transform: translateY(-50%);
		display: grid;
		place-items: center;

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
			transform: rotate(-45deg) translate(-0px, +7px);
			transition: background-color 0.2s;
		}
	}

	
				.highlighted {
                 font-weight: bold; 
				
			}
		}
	
</style>