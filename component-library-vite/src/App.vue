<template>
	<div id="app">
		<CheckBoxFilter />
		<Chips />
		<!-- <ChipsFilter /> -->
		<DatePicker />
		<DropdownSearch />
		<Informer />
		<RadioButtonFilter />
		<SearchForm />
	</div>
</template>

<script setup lang="ts">
import CheckBoxFilter from '@/components/CheckBox/CheckBoxFilter.vue';
import Chips from '@/components/Chips/Chips.vue';
// import ChipsFilter from '@/components/ChipsFilter/ChipsFilter.vue'; // IN PROCESS
import DatePicker from '@/components/DatePicker/DatePicker.vue';
import DropdownSearch from '@/components/DropdownWithSearch/DropdownSearch/DropdownSearch.vue';
import Informer from '@/components/Informer/Informer.vue';
import RadioButtonFilter from '@/components/RadioButton/RadioButtonFilter.vue';
import SearchForm from '@/components/Search/Search/SearchForm.vue';
</script>

<style lang="scss" scoped></style>
