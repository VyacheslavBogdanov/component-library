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
        <div v-if="searchQuery && filteredList.length" class="dropdown">
            <ul class="dropdown-list">
                <li
                    v-for="(item, index) in filteredList"
                    :key="index"
                    @mousedown.prevent="selectItem(item)"
                >
                    <span v-for="(part, partIndex) in highlightMatch(item)"
                          :key="partIndex"
                          :class="{ 'highlighted': part.highlighted }">
                        {{ part.text }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { people } from '../mocks/db.js'; 

const searchQuery = ref<string>('');
const filteredList = ref<string[]>([]);

const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};

const filterItems = (query: string) => {
    return people.filter((item) =>
        item.toLowerCase().startsWith(query.toLowerCase())
    );
}

const updateFilteredList = debounce(() => {
    if (searchQuery.value) {
        filteredList.value = filterItems(searchQuery.value);
    } else {
        filteredList.value = [];
    }
}, 500);

watch(searchQuery, () => {
    updateFilteredList();
});

const handleBlur = () => {
    searchQuery.value = '';
};

const highlightMatch = (item: string): Array<{ text: string; highlighted: boolean }> => {
    if (!searchQuery.value) return [{ text: item, highlighted: false }];
    
    const parts = item.split(new RegExp(`^(${searchQuery.value})`, 'i'));
    
    return parts.map((part, index) => ({
        text: part,
        highlighted: index % 2 === 1,
    }));
};

const selectItem = (item: string) => {
    searchQuery.value = item;
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

	.dropdown {
		background-color: white;
		border: 1.5px solid $border-color-focus;
		border-radius: 0 0 4px 4px;
		min-height: $min-height-dropdown;
		max-height: $max-height-dropdown;
		overflow-y: auto;
		max-width: $width-container;
		position: relative;
		border-top: none;
		top: 100%;

		.dropdown-list {
			list-style: none;
			padding: 0;
			margin: 0;

			li {
				margin: $margin-li;
				cursor: pointer;
				text-align: start;
				background-color: #dcb9fa;
				position: relative;
				font-size: $font-size-container;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-family: $font-allelement;

				&:hover {
					background-color: #9f979773;
				}
				.highlighted {
                 font-weight: bold; 
				
			}
		}
	}
}
}
</style>