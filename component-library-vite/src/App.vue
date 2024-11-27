<template>
	<div id="app">
		<TestRadioButtonFilter />
		<Search />
		<DatePicker />
		<!-- <DropdownWithSearch />

		<CheckboxFilter />
		<RadioButtonFilter />
		<Chips />
		<ChipsFilter /> -->
		<Informer />

	</div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/Search/SearchForm.vue';
// import DropdownWithSearch from '@/components/DropdownWithSearch/DropdownWithSearch.vue';
// import CheckboxFilter from '@/components/CheckboxFilter/CheckboxFilter.vue';
// import RadioButtonFilter from './components/RadioButtonFilter/RadioButtonFilter.vue';
import TestRadioButtonFilter from './components/TestRadioButton.vue/TestRadioButtonFilter.vue';
// import Chips from '@/components/Chips/Chips.vue';
// import ChipsFilter from '@/components/ChipsFilter/ChipsFilter.vue';
import DatePicker from '@/components/DatePicker/DatePicker.vue';
import Informer from '@/components/Informer/Informer.vue';
</script>

<style lang="scss" scoped></style>
