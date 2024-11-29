<template>
	<div id="app">
		<RadioButtonFilter />
		<Search />
		<CheckBoxFilter />
		<DropdownSearch />
		<!-- <RadioButtonFilter /> -->
		<!-- <Chips /> -->
		<!-- <ChipsFilter />
		<DatePicker />
		<Informer />
		<TestComponent />  -->
	</div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/Search/SearchForm.vue';
import DropdownSearch from '@/components/DropdownWithSearch/DropdownSearch/DropdownSearch.vue';
import RadioButtonFilter from './components/RadioButton/RadioButtonFilter.vue';
import CheckBoxFilter from './components/CheckBox/CheckBoxFilter.vue';
// import Chips from '@/components/Chips/Chips.vue';
// import ChipsFilter from '@/components/ChipsFilter/ChipsFilter.vue';
// import DatePicker from '@/components/DatePicker/DatePicker.vue';
// import Informer from '@/components/Informer/Informer.vue';
</script>

<style lang="scss" scoped></style>
