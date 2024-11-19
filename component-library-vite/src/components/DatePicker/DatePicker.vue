<template>
	<h1>Date Picker</h1>
	<div class="date-form">
		<DateForm
			@toggleVisible="isCalendarVisible = !isCalendarVisible"
			@changeDate="handleChangeDate"
			:selectedYear="selectedYear"
			:selectedMonth="selectedMonth"
			:selectedDay="selectedDay"
		/>
	</div>
	<div v-if="isCalendarVisible" class="calendar">
		<CalendarHeader
			@ToggleHeaderDate="ToggleHeaderDate"
			@changeSelectedMonth="(value) => (selectedMonth = value)"
			@changeSelectedYear="(value) => (selectedYear = value)"
			:months="months"
			:selectedYear="selectedYear"
			:selectedMonth="selectedMonth"
		/>
		<Days
			@ToggleHeaderDate="ToggleHeaderDate"
			@prevMonth="ToggleHeaderDate"
			@selectDay="(day) => (selectedDay = day)"
			@nextMonth="ToggleHeaderDate"
			:daysNames="daysNames"
			:selectedDay="selectedDay"
			:selectedYear="selectedYear"
			:selectedMonth="selectedMonth"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchData } from '../mocks/db.js';
import DateForm from './DateForm/DateForm.vue';
import CalendarHeader from './CalendarHeader/CalendarHeader.vue';
import Days from './Days/Days.vue';

const selectedYear = ref<number>(new Date().getFullYear());
const selectedMonth = ref<number>(new Date().getMonth());
const selectedDay = ref<number | null>(null);
const isCalendarVisible = ref<boolean>(false);
const months = ref<string[]>([]);
const daysNames = ref<string[]>([]);

const loadData = async () => {
	try {
		months.value = await fetchData('/months');
		daysNames.value = await fetchData('/days-names');
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	loadData();
});

interface DateType {
	day: number;
	month: number;
	year: number;
}

const handleChangeDate = ({ day, month, year }: DateType): void => {
	selectedDay.value = day;
	selectedMonth.value = month;
	selectedYear.value = year;
};

const ToggleHeaderDate = (type: string, route: string) => {
	if (type === 'month') {
		if (route === 'prev') {
			if (selectedMonth.value === 0) {
				selectedMonth.value = 11;
				selectedYear.value -= 1;
			} else {
				selectedMonth.value -= 1;
			}
		} else if (route === 'next') {
			if (selectedMonth.value === 11) {
				selectedMonth.value = 0;
				selectedYear.value += 1;
			} else {
				selectedMonth.value += 1;
			}
		}
	} else if (type === 'year') {
		if (route === 'prev') {
			selectedYear.value -= 1;
		} else if (route === 'next') {
			selectedYear.value += 1;
		}
	}
};
</script>

// Как передать переменные во все дочерние компоненты? Миксины?

<style lang="scss">
// $border-color: #dcdcdcd2;
// $weekend-color: #e60000;
// $date-picker-margin: 17px;
// $font-family: sans-serif;
// $border-radius: 7px;
// $cursor: pointer;
@import './variables.scss';

.date-form {
	position: relative;
	width: 200px;
	height: 30px;
	font-family: $font-family;
	margin: $date-picker-margin;
}

.calendar {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	top: 2px;
	width: 500px;
	height: 500px;
	border: 1px solid $border-color;
	border-radius: $border-radius;
	padding: 10px;
	font-family: $font-family;
	font-weight: 150;
	margin: $date-picker-margin;
}
</style>
