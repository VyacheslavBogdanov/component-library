<template>
	<div class="search">
	  <input
		required
		type="text"
		v-model="searchQuery"
		@focus="handleFocus"
		@blur="handleBlur"
		:class="{
		  'search__input--has-dropdown': showDropdown,
		  'search__input--focused': isFocused
		}"
		class="search__input"
	  />
	  <label class="search__placeholder">Поиск</label>
	  <div class="search__icon"></div>
	  <Dropdown
		v-if="showDropdown && filteredList.length > 0"
		:items="filteredList"
		:searchQuery="searchQuery"
		:highlightMatch="highlightMatch"
		@select="selectItem"
	  />
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, nextTick } from 'vue';
  import { people } from '../mocks/db.d'; 
  import Dropdown from './Dropdown.vue';
  import { debounce, highlightMatch } from './utils';
  
  interface Person {
	id: string;
	name: string;
  }
  
  const searchQuery = ref<string>(''); 
  const filteredList = ref<Person[]>([]); 
  const showDropdown = ref<boolean>(false); 
  const isFocused = ref<boolean>(false); 
  const userIsSelecting = ref<boolean>(false); 
  
 
  const handleFocus = () => {
	isFocused.value = true;
  };
  
 
  const handleBlur = () => {
	isFocused.value = false;
	nextTick(() => {
	  if (!isFocused.value && !userIsSelecting.value) {
		showDropdown.value = false; 
	  }
	});
  };
  
  
  const updateFilteredList = debounce(() => {
	filteredList.value = people.filter((item: Person) =>
	  item.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) 
	);
	showDropdown.value = filteredList.value.length > 0; 
  }, 300);
  

  watch(searchQuery, (newQuery) => {
	if (newQuery && !userIsSelecting.value) {
	  updateFilteredList(); 
	} else {
	  filteredList.value = []; 
	  showDropdown.value = false; 
	}
  });
  
  
  const selectItem = (item: Person): void => {
	searchQuery.value = item.name; 
	showDropdown.value = false; 
	userIsSelecting.value = true; 
	nextTick(() => {
	  userIsSelecting.value = false; 
	});
  };
  </script>


  <style lang="scss" scoped>
  @import './variables';
  
  .search {
	display: flex;
	flex-direction: column;
	position: relative;
	width: $width-container;
  
	&__input {
	  width: 100%;
	  height: $height-input;
	  font-size: $font-size-input;
	  border: 1.5px solid $color-border;
	  border-radius: $border-radius;
	  padding: 0 40px 0 10px;
	  font-family: $font-family;
	  transition: border-color 0.2s, border-radius 0.2s;
	  outline: none;
  
	  &--focused {
		border-color: $color-border-focus;
	  }
  
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
	  color: $color-border;
	  transition: all 0.2s ease;
	  font-family: $font-family;
	}
  
	&__icon {
	  position: absolute;
	  right: 10px;
	  top: 50%;
	  transform: translateY(-50%);
	  width: 20px;
	  height: 20px;
  
	  &::before,
	  &::after {
		content: '';
		position: absolute;
		transition: all 0.2s;
	  }
  
	  &::before {
		width: 10px;
		height: 10px;
		border: 2px solid $color-border;
		border-radius: 50%;
	  }
  
	  &::after {
		width: 2px;
		height: 10px;
		background: $color-border;
		transform: rotate(-45deg) translate(-2px, 4px);
	  }
	}
  }
  </style>
  