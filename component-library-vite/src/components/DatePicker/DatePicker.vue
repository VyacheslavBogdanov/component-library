<template>
	<h1>Date Picker</h1>
	<div class="date-form">
		<DateForm
			:formattedDate="formattedDate"
			@toggleVisible="isCalendarVisible = !isCalendarVisible"
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
			@selectDay="(day) => (selectedDay = day)"
			:daysNames="daysNames"
			:selectedDay="selectedDay"
			:selectedYear="selectedYear"
			:selectedMonth="selectedMonth"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchData } from '../mocks/db.js';
import DateForm from './DateForm/DateForm.vue';
import CalendarHeader from './CalendarHeader/CalendarHeader.vue';
import Days from './Days/Days.vue';

const selectedYear = ref<number>(new Date().getFullYear());
const selectedMonth = ref<number>(new Date().getMonth());
const selectedDay = ref<number>(0);
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

const formattedDate = computed({
	get: () => {
		if (selectedDay.value === 0) return '';
		const dateFormat = `${String(selectedDay.value).padStart(2, '0')}
		.${String(selectedMonth.value + 1).padStart(2, '0')}.${selectedYear.value}`;
		return dateFormat;
	},
	set: (value: string) => {
		console.log('SET');

		const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.(\d{4})$/;
		if (datePattern.test(value)) {
			const [day, month, year] = value.split('.').map(Number);
			if (day && month && year) {
				selectedDay.value = day;
				selectedMonth.value = month - 1;
				selectedYear.value = year;
			}
		}
	},
});

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
$border-color: #dcdcdcd2;
$weekend-color: #e60000;
$date-picker-margin: 17px;
$font-family: sans-serif;
$border-radius: 7px;
$cursor: pointer;

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
