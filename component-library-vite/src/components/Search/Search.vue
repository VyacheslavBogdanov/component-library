<template>
  <div class="search" 
       :class="{
		'search--focused': isFocused, 
		'search--filled': searchQuery
		}">
    <input
      required
      type="text"
      v-model="searchQuery"
      @focus="handleFocus(true)"
      @blur="handleFocus(false)"
      :class="{
        'search__input--has-dropdown': showDropdown
      }"
      class="search__input"
    />
    <label 
	  :class="{
		'search__placeholder--active': searchQuery || isFocused
		}"
      class="search__placeholder">
      Поиск
    </label>

    <div class="search__icon"></div>

    <Dropdown
      v-if="showDropdown"
      :items="filteredList"
      :searchQuery="searchQuery"
      :highlightMatch="highlightMatch"
      @select="selectItem"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import { people } from './mocks.d'; 
  import Dropdown from './Dropdown.vue';
  import { debounce, highlightMatch } from './utils.d';
  
  interface Person {
	id: string;
	name: string;
  }
  
  const searchQuery = ref<string>(''); 
  const filteredList = ref<Person[]>([]); 
  const isFocused = ref<boolean>(false);
  const userIsSelecting = ref<boolean>(false);
  
  const updateFilteredList = debounce(async () => {
	filteredList.value = people.filter((item: Person) =>
	  item.name.toLowerCase().startsWith(searchQuery.value.toLowerCase())
	);
  }, 300);
  
  const showDropdown = computed(() => {
	return filteredList.value.length > 0 && searchQuery.value.trim().length > 0 && isFocused.value;
  });
  
  const handleFocus = (focus: boolean) => {
	isFocused.value = focus;
	if (!focus) {
	  filteredList.value = []; 
	}
  };
  
  watch(searchQuery, (newQuery) => {
	if (newQuery && !userIsSelecting.value) {
	  updateFilteredList(); 
	} else {
	  filteredList.value = [];
	}
  });
  
  const selectItem = (item: Person): void => {
  searchQuery.value = item.name;
  userIsSelecting.value = true;
  nextTick(() => {
    userIsSelecting.value = false;
  });
  console.log('item ID:', item.id);
};
</script>
  
  
<style lang="scss" scoped>
  @import './style-variables.scss';
  
  .search {

  display: flex;
  flex-direction: column;
  position: relative;
  width: $width-container;

  &--focused {
    .search__icon {
		&::before{
			border-color: $color-border-focus;
		}
		&::after{
			background-color: $color-border-focus ;
		}
	}
	.search__input {
      border-color: $color-border-focus;
    }
}
  &--filled {
    .search__icon {
		&::before{
			border-color: $color-border-focus;
		}
		&::after{
			background-color: $color-border-focus ;
		}
	}

    .search__input {
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
      transform: rotate(-45deg) translate(2px , 17px);
    }
  }
}

</style>
  