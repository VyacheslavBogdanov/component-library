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
const emit = defineEmits(['prevMonth', 'selectDay', 'nextMonth']);

const props = defineProps({
	daysNames: { type: Array, default: [] },
	prevMonthDays: { type: Array, required: true },
	daysInMonth: { type: Array, required: true },
	selectedDay: { type: Number, required: true },
	nextMonthDays: { type: Array, required: true },
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
</script>

<style lang="scss" scoped></style>
