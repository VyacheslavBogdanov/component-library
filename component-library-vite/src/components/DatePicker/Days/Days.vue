<template>
	<div class="day-names">
		<span v-for="(day, index) in daysNames" :key="index" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span
			v-for="(day, index) in prevMonthDays"
			:key="index"
			:class="['day', { weekend: isWeekendPrevMonth(day) }]"
			@click="emit('prevMonth')"
		>
			<span class="other-month">{{ day }}</span>
		</span>
		<span
			v-for="(day, index) in daysInMonth"
			:key="index"
			:class="[
				'day',
				{
					selected: day === selectedDay,
					today: isToday(day),
					weekend: isWeekendCurrentMonth(day),
				},
			]"
			@click="emit('selectDay', day)"
		>
			<span>{{ day }}</span>
		</span>
		<span
			v-for="(day, index) in nextMonthDays"
			:key="index"
			:class="['day', { weekend: isWeekendNextMonth(day) }]"
			@click="emit('nextMonth')"
		>
			<span class="other-month">{{ day }}</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const emit = defineEmits(['prevMonth', 'selectDay', 'nextMonth']);

const props = defineProps({
	daysNames: { type: Array, default: [] },
	selectedDay: { type: Number, required: true },
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
});

const isToday = (day: any) => {
	const today = new Date();
	return (
		today.getFullYear() === props.selectedYear &&
		today.getMonth() === props.selectedMonth &&
		today.getDate() === day
	);
};

const isWeekendCurrentMonth = (day: any) => {
	const date = new Date(props.selectedYear, props.selectedMonth, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const isWeekendPrevMonth = (day: any) => {
	const date = new Date(props.selectedYear, props.selectedMonth - 1, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const isWeekendNextMonth = (day: any) => {
	const date = new Date(props.selectedYear, props.selectedMonth + 1, day);
	return date.getDay() === 6 || date.getDay() === 0;
};

const daysInMonth = computed(() => {
	const days = new Date(props.selectedYear, props.selectedMonth + 1, 0).getDate();
	return Array.from({ length: days }, (_, i) => i + 1);
});

const prevMonthDays = computed(() => {
	const firstDayOfMonth = new Date(props.selectedYear, props.selectedMonth, 1).getDay();
	const prevMonthDate = new Date(props.selectedYear, props.selectedMonth, 0).getDate();
	return Array.from({ length: (firstDayOfMonth + 6) % 7 }, (_, i) => prevMonthDate - i).reverse();
});

const nextMonthDays = computed(() => {
	const daysInCurrentMonth = daysInMonth.value.length;
	const remainingDays = 42 - daysInCurrentMonth - prevMonthDays.value.length;
	return Array.from({ length: remainingDays }, (_, i) => i + 1);
});
</script>

<style lang="scss" scoped>
$border-color: #dcdcdcd2;
$weekend-color: #e60000;
$date-picker-margin: 17px;
$font-family: sans-serif;
$border-radius: 7px;
$cursor: pointer;

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
