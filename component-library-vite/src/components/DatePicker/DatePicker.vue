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
			@prevMonth="prevMonth"
			@toggleMonthDropdown="toggleMonthDropdown"
			@selectMonth="selectMonth"
			@nextMonth="nextMonth"
			@prevYear="prevYear"
			@toggleYearDropdown="toggleYearDropdown"
			@nextYear="nextYear"
			@selectYear="selectYear"
			:months="months"
			:selectrdMonth="selectedMonth"
			:isMonthDropdownVisible="isMonthDropdownVisible"
			:selectedYear="selectedYear"
		/>
		<Days
			@prevMonth="prevMonth"
			@selectDay="selectDay"
			@nextMonth="nextMonth"
			:dayNames="dayNames"
			:prevMonthDays="prevMonthDays"
			:daysInMonth="daysInMonth"
			:selectedDay="selectedDay"
			:isWeekendPrevMonth="isWeekendPrevMonth"
			:isToday="isToday"
			:isWeekendCurrentMonth="isWeekendCurrentMonth"
			:nextMonthDays="nextMonthDays"
			:isWeekendNextMonth="isWeekendNextMonth"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DateForm from './DateForm/DateForm.vue';
import CalendarHeader from './CalendarHeader/CalendarHeader.vue';
import Days from './Days/Days.vue';

const selectedYear = ref<number>(new Date().getFullYear());
const selectedMonth = ref<number>(new Date().getMonth());
const selectedDay = ref<number | null>(null);
const isCalendarVisible = ref<boolean>(false);
const isMonthDropdownVisible = ref<boolean>(false);
const isYearDropdownVisible = ref<boolean>(false);

const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const daysInMonth = computed(() => {
	const days = new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate();
	return Array.from({ length: days }, (_, i) => i + 1);
});

const prevMonthDays = computed(() => {
	const firstDayOfMonth = new Date(selectedYear.value, selectedMonth.value, 1).getDay();
	const prevMonthDate = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
	return Array.from({ length: (firstDayOfMonth + 6) % 7 }, (_, i) => prevMonthDate - i).reverse();
});

const nextMonthDays = computed(() => {
	const daysInCurrentMonth = daysInMonth.value.length;
	const remainingDays = 42 - daysInCurrentMonth - prevMonthDays.value.length;
	return Array.from({ length: remainingDays }, (_, i) => i + 1);
});

const formattedDate = computed({
	get: () => {
		console.log('GET');

		if (selectedDay.value === null) return '';
		const dateFormat = `${String(selectedDay.value).padStart(2, '0')}.${String(selectedMonth.value + 1).padStart(2, '0')}.${selectedYear.value}`;
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

console.log('typeof formattedDate', typeof formattedDate);

const toggleMonthDropdown = () => {
	isMonthDropdownVisible.value = !isMonthDropdownVisible.value;
	isYearDropdownVisible.value = false;
};

const toggleYearDropdown = () => {
	isYearDropdownVisible.value = !isYearDropdownVisible.value;
	isMonthDropdownVisible.value = false;
};

const selectMonth = (month: number) => {
	selectedMonth.value = month;
	setTimeout(() => {
		isMonthDropdownVisible.value = false;
	});
};

const selectYear = (year: number) => {
	selectedYear.value = year;
	setTimeout(() => {
		isYearDropdownVisible.value = false;
	});
};

const selectDay = (day: number) => {
	selectedDay.value = day;
};

const prevMonth = () => {
	if (selectedMonth.value === 0) {
		selectedMonth.value = 11;
		selectedYear.value -= 1;
	} else {
		selectedMonth.value -= 1;
	}
};

const nextMonth = () => {
	if (selectedMonth.value === 11) {
		selectedMonth.value = 0;
		selectedYear.value += 1;
	} else {
		selectedMonth.value += 1;
	}
};

const prevYear = () => {
	selectedYear.value -= 1;
};

const nextYear = () => {
	selectedYear.value += 1;
};

const isToday = (day: number) => {
	const today = new Date();
	return (
		today.getFullYear() === selectedYear.value &&
		today.getMonth() === selectedMonth.value &&
		today.getDate() === day
	);
};

const isWeekendCurrentMonth = (day: number) => {
	const date = new Date(selectedYear.value, selectedMonth.value, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const isWeekendPrevMonth = (day: number) => {
	const date = new Date(selectedYear.value, selectedMonth.value - 1, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const isWeekendNextMonth = (day: number) => {
	const date = new Date(selectedYear.value, selectedMonth.value + 1, day);
	return date.getDay() === 6 || date.getDay() === 0;
};
</script>

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

.day-names {
	width: 90%;
	font-size: 20px;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;
	margin-bottom: 10px;
}

.days {
	border: 0.5px solid $border-color;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 90%;
	height: 70%;

	.day {
		border: 0.5px solid $border-color;
		padding: 8px;
		cursor: $cursor;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;

		&.selected {
			background-color: #5a64f0;
			color: white;
		}

		&.today {
			text-decoration: underline;
		}

		&.weekend {
			color: $weekend-color;
		}

		.other-month {
			opacity: 0.25;
		}

		&:hover {
			background-color: #a89aeb60;
		}
	}
}
</style>
