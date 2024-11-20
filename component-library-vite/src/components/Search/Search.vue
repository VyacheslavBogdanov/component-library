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
  import { people } from '../mocks/db.d'; // Массив данных
  import Dropdown from './Dropdown.vue';
  import { debounce ,highlightMatch} from './utils'; // Функция debounce
  
  
  interface Person {
	id: string;
	name: string;
  }
  
  const searchQuery = ref<string>(''); // Введенный запрос
  const filteredList = ref<Person[]>([]); // Отфильтрованный список
  const showDropdown = ref<boolean>(false); // Состояние отображения дропдауна
  const isFocused = ref<boolean>(false); // Состояние фокуса
  
  // Обработчики фокуса
  const handleFocus = () => {
	isFocused.value = true;
  };
  
  // Обработчик потери фокуса
  const handleBlur = () => {
	isFocused.value = false;
	nextTick(() => {
	  if (!isFocused.value) {
		showDropdown.value = false; // Закрытие дропдауна после потери фокуса
	  }
	});
  };
  
  // Дебаунс для фильтрации
  const updateFilteredList = debounce(() => {
	filteredList.value = people.filter((item: Person) =>
	  item.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()) // Фильтрация с учетом первой буквы
	);
	showDropdown.value = filteredList.value.length > 0; // Показываем дропдаун только если есть совпадения
  }, 300); // Ожидание 300 мс после ввода
  
  // Слежение за запросом поиска
  watch(searchQuery, (newQuery) => {
	if (newQuery) {
	  updateFilteredList();  // Фильтруем по запросу
	} else {
	  filteredList.value = [];  // Очистка списка, если поле пустое
	  showDropdown.value = false; // Скрываем дропдаун
	}
  });
  
  // Выбор элемента из дропдауна
  const selectItem = (item: Person): void => {
	searchQuery.value = item.name; // Устанавливаем выбранный элемент в input
	showDropdown.value = false; // Закрытие дропдауна
  };
  </script>
  
  <style lang="scss" scoped>
  @import './variables';
  
  .search {
	display: flex;
	flex-direction: column;
	position: relative;
	max-width: $width-container;
  
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
  