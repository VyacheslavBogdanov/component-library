<template>
	<h1>Date Picker</h1>
	<div class="date-picker">
		<input
			type="text"
			:placeholder="placeholder"
			@click="isCalendarVisible = !isCalendarVisible"
			class="date-input"
			v-model="formattedDisplayDate"
			maxlength="10"
		/>
	</div>
	<div v-if="isCalendarVisible" class="calendar">
		<div class="calendar-header">
			<CalendarNavigation
				:months="months"
				:dayNames="dayNames"
				:currentMonth="selectedMonth"
				:currentYear="selectedYear"
				@prevMonth="prevMonth"
				@nextMonth="nextMonth"
				@prevYear="prevYear"
				@nextYear="nextYear"
				@selectMonth="selectMonth"
				@selectYear="selectYear"
				:isMonthDropdownVisible="isMonthDropdownVisible"
				:isYearDropdownVisible="isYearDropdownVisible"
			/>
		</div>
		<div class="days">
			<span
				v-for="day in prevMonthDays"
				:key="`prev-${day}`"
				class="day other-month"
				@click="prevMonth"
			>
				{{ day }}
			</span>
			<span
				v-for="day in daysInMonth"
				:key="`current-${day}`"
				:class="['day', getDayClass(day)]"
				@click="selectDay(day)"
			>
				{{ day }}
			</span>
			<span
				v-for="day in nextMonthDays"
				:key="`next-${day}`"
				class="day other-month"
				@click="nextMonth"
			>
				{{ day }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { fetchData } from '../mocks/db.js';
// import CalendarNavigation from './CalendarNavigation/CalendarNavigation.vue';

const props = defineProps({
	startYear: { type: Number, default: new Date().getFullYear() },
	startMonth: { type: Number, default: new Date().getMonth() },
	placeholder: { type: String, default: '__.__.____ г' },
});

const emit = defineEmits(['update:date']);

const selectedYear = ref(props.startYear);
const selectedMonth = ref(props.startMonth);
const selectedDay = ref<number | null>(null);
const isCalendarVisible = ref<boolean>(false);
const isMonthDropdownVisible = ref<boolean>(false);
const isYearDropdownVisible = ref<boolean>(false);
const months = ref<string[]>([]);
const dayNames = ref<string[]>([]);

// const months = [
// 	'Январь',
// 	'Февраль',
// 	'Март',
// 	'Апрель',
// 	'Май',
// 	'Июнь',
// 	'Июль',
// 	'Август',
// 	'Сентябрь',
// 	'Октябрь',
// 	'Ноябрь',
// 	'Декабрь',
// ];
// const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const daysInMonth = computed(() => generateDays(selectedYear.value, selectedMonth.value + 1));
const prevMonthDays = computed(() =>
	generatePrevMonthDays(selectedYear.value, selectedMonth.value),
);
const nextMonthDays = computed(() => 42 - daysInMonth.value.length - prevMonthDays.value.length);

const formattedDisplayDate = computed({
	get() {
		return selectedDay.value !== null
			? `${String(selectedDay.value).padStart(2, '0')}.${String(selectedMonth.value + 1).padStart(2, '0')}.${selectedYear.value}`
			: '';
	},
	set(value: string) {
		const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.(\d{4})$/;
		if (datePattern.test(value)) {
			const [day, month, year] = value.split('.').map(Number);
			selectedDay.value = day;
			selectedMonth.value = month - 1;
			selectedYear.value = year;
			emit('update:date', new Date(year, month - 1, day));
		}
	},
});

const toggleDropdown = (dropdown: 'month' | 'year') => {
	if (dropdown === 'month') {
		isMonthDropdownVisible.value = !isMonthDropdownVisible.value;
		isYearDropdownVisible.value = false;
	} else {
		isYearDropdownVisible.value = !isYearDropdownVisible.value;
		isMonthDropdownVisible.value = false;
	}
};

const selectMonth = (month: number) => (selectedMonth.value = month);
const selectYear = (year: number) => (selectedYear.value = year);
const selectDay = (day: number) => (selectedDay.value = day);

const prevMonth = () =>
	selectedMonth.value === 0
		? ((selectedMonth.value = 11), (selectedYear.value -= 1))
		: (selectedMonth.value -= 1);
const nextMonth = () =>
	selectedMonth.value === 11
		? ((selectedMonth.value = 0), (selectedYear.value += 1))
		: (selectedMonth.value += 1);
const prevYear = () => (selectedYear.value -= 1);
const nextYear = () => (selectedYear.value += 1);

const isWeekend = (year: number, month: number, day: number) => {
	const date = new Date(year, month, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const getDayClass = (day: number) => ({
	selected: day === selectedDay.value,
	today: isToday(day),
	weekend: isWeekend(selectedYear.value, selectedMonth.value, day),
});

const generateDays = (year: number, month: number) => {
	const days = new Date(year, month, 0).getDate();
	return Array.from({ length: days }, (_, i) => i + 1);
};

const generatePrevMonthDays = (year: number, month: number) => {
	const firstDayOfMonth = new Date(year, month, 1).getDay();
	const prevMonthDaysCount = (firstDayOfMonth + 6) % 7;
	const prevMonthDate = new Date(year, month, 0).getDate();
	return Array.from({ length: prevMonthDaysCount }, (_, i) => prevMonthDate - i).reverse();
};

const isToday = (day: number) => {
	const today = new Date();
	return (
		today.getFullYear() === selectedYear.value &&
		today.getMonth() === selectedMonth.value &&
		today.getDate() === day
	);
};

const loadData = async () => {
	try {
		const people = await fetchData('/people');
		const months = await fetchData('/months');
		const daysNames = await fetchData('/days-names');
		console.log('db DATA', { people, months, daysNames });
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	loadData();
});
</script>

<style lang="scss" scoped>
$border-color: #dcdcdcd2;
$weekend-color: #e60000;
$date-picker-margin: 17px;
$font-family: sans-serif;
$border-radius: 7px;
$cursor: pointer;

.date-picker {
	position: relative;
	width: 200px;
	height: 30px;
	font-family: $font-family;
	margin: $date-picker-margin;

	.date-input {
		width: 100%;
		height: 100%;
		padding: 6px;
		border: 1px solid $border-color;
		border-radius: $border-radius;
		font-size: 25px;
		outline: none;
		background-image: url('./img/calendar.png');
		background-size: 20px;
		background-position: left 17px center;
		background-repeat: no-repeat;
		padding-right: 30px;
		text-indent: 40px;
	}
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

	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding-left: 7px;
		padding-right: 7px;
		width: 445px;
		height: 70px;

		.header-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		.month,
		.year {
			font-size: 27px;
			font-weight: bold;
			position: relative;
			cursor: $cursor;
			padding: 0 12px;
		}

		.nav-button {
			background: none;
			border: none;
			font-size: 23px;
			cursor: $cursor;
		}

		.month-dropdown,
		.year-dropdown {
			position: absolute;
			background: white;
			border: none;
			padding: 2px;
			z-index: 2;
			width: auto;
			max-height: 240px;
			overflow-y: auto;
			opacity: 0.8;

			span {
				display: block;
				padding: 5px;
				cursor: $cursor;
				&:hover {
					background: #e6e6e6;
				}
			}
		}
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
}
</style>
