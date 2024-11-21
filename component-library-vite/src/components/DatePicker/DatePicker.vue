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
			:calendarHeaderItem="calendarHeaderItem"
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

interface CalendarHeaderItem {
	type: 'month' | 'year';
	typesArr: string[] | number[];
}

interface DateType {
	day: number;
	month: number;
	year: number;
}

const selectedYear = ref<number>(new Date().getFullYear());
const selectedMonth = ref<number>(new Date().getMonth());
const selectedDay = ref<number | null>(null);
const isCalendarVisible = ref<boolean>(false);
const calendarHeaderItem = ref<CalendarHeaderItem[]>([]);
const daysNames = ref<string[]>([]);

const loadData = async () => {
	try {
		calendarHeaderItem.value = await fetchData('/calendar-header-item');
		daysNames.value = await fetchData('/days-names');
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	loadData();
});

const handleChangeDate = ({ day, month, year }: DateType): void => {
	selectedDay.value = day;
	selectedMonth.value = month;
	selectedYear.value = year;
};

const ToggleHeaderDate = (type: 'month' | 'year', route: 'prev' | 'next') => {
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
		selectedYear.value += route === 'prev' ? -1 : 1;
	}
};
</script>

<style lang="scss">
@import './utils/variables.scss';

.date-form {
	position: relative;
	width: 200px;
	height: 30px;
	font-family: $font-family;
}

.calendar {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	top: 20px;
	width: 500px;
	height: 500px;
	border: 1px solid $border-color;
	border-radius: $border-radius;
	padding: 10px;
	font-family: $font-family;
	font-weight: 150;
}
</style>
