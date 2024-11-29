<template>
	<div class="dropdown">
		<ul class="dropdown__list">
			<li
				v-for="(item, index) in items"
				:key="index"
				@mousedown.prevent="emit('select', item)"
				class="dropdown__item"
			>
				<span>
					<span
						v-for="(part, partIndex) in highlightMatch(item, searchQuery)"
						:key="partIndex"
						:class="{
							'dropdown__item--highlighted': part.highlighted,
						}"
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

defineProps<{
	items: string[];
	searchQuery: string;
	highlightMatch: (text: string, query: string) => { text: string; highlighted: boolean }[];
}>();

const emit = defineEmits<{
	(event: 'select', item: string): void;
}>();
</script>

<style lang="scss" scoped>
@import '../utils/style-variables.scss';

.dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	width: $width-container;
	background: $color-background-dropdown;
	border: 1.5px solid $color-border-focus;
	border-top: none;
	border-radius: 0 0 $border-radius $border-radius;
	min-height: $dropdown-min-height;
	max-height: $dropdown-max-height;
	overflow-y: auto;
	z-index: 10;
	box-sizing: border-box;

	&__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	&__item {
		margin: $margin-dropdown-item;
		padding: 5px 10px;
		cursor: pointer;
		text-align: start;
		background-color: $color-background-li;
		font-family: $font-family;
		font-size: $font-size-item;
		transition: background-color 0.2s;

		&--highlighted {
			font-weight: bold;
		}
	}
}
</style>
