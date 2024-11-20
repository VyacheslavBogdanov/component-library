<template>
	<div class="dropdown">
	  <ul class="dropdown__list">
		<li
		  v-for="(item, index) in items"
		  :key="index"
		  @mousedown.prevent="handleSelect(item)"
		  class="dropdown__item"
		>
		  <span>
			<span
			  v-for="(part, partIndex) in highlightMatch(item.name, searchQuery)"
			  :key="partIndex"
			  :class="{
				'dropdown__item--highlighted': part.highlighted
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
  
  interface Item {
	id: string;
	name: string;
  }
  
  const props = defineProps<{
	items: Item[];
	searchQuery: string;
	highlightMatch: (text: string, query: string) => { text: string; highlighted: boolean }[];
  }>();
  
  const emit = defineEmits<{
	(event: 'select', item: Item): void;
  }>();
  
  const handleSelect = (item: Item) => {
	emit('select', item); 
  };
  </script>
  <style lang="scss" scoped>

  @import './variables.scss';
  
  .dropdown {
	position: absolute;
	top: 100%;
	left: 0;
	width: 700px; 
	background: $color-background-dropdown;
	border: 1.5px solid $color-border-focus;
	border-top: none;
	border-radius: 0 0 $border-radius $border-radius;
	min-height: $dropdown-min-height;
	max-height: $dropdown-max-height;
	overflow-y: auto;
	z-index: 10;
  
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
	  background-color: $color-background-dropdown;
	  font-family: $font-family;
	  font-size: $font-size-input;
	  transition: background-color 0.2s;
  
	  &:hover {
		background-color: $color-background-hover;
	  }
  
	  &--highlighted {
		font-weight: bold;
		
	  }
	}
  }
  </style>
  