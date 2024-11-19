<template>
	<div class="dropdown">
		<ul class="dropdown-list">
			<li
				v-for="(item, index) in items"
				:key="index"
				@mousedown.prevent="handleSelect(item)"
			>
				<span>
					<span
						v-for="(part, partIndex) in highlightMatch(item.name)"
						:key="partIndex"
						:class="{ highlighted: part.highlighted }"
					>
						{{ part.text }}
					</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Item {
	id: string;
	name: string;
}

const props = defineProps<{
	items: Item[];
	highlightMatch: (name: string) => { text: string; highlighted: boolean }[];
}>();

const emit = defineEmits<{
	(event: 'select', item: Item): void;
}>();


const handleSelect = (item: Item) => {
	emit('select', item);
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
            }
        }
    }


.highlighted {
	font-weight: bold;
	
}
</style>