<template>
	<div class="day-names">
		<span v-for="(day, index) in daysNames" :key="index" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span
			v-for="(dayData, index) in allDays"
			:key="index"
			:class="getClassForDay(dayData.day, dayData.type)"
			@click="handleDayClick(dayData.day, dayData.type)"
		>
			<span :class="dayData.innerClass">{{ dayData.day }}</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	daysNames: { type: Array, default: () => [] },
	selectedDay: { type: [Number, null], required: true },
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
});

const emit = defineEmits<{
	(event: 'prevMonth', unit: 'month', direction: 'prev'): void;
	(event: 'nextMonth', unit: 'month', direction: 'next'): void;
	(event: 'selectDay', day: number): void;
}>();

const isToday = (day: number) => {
	const today = new Date();
	return (
		today.getFullYear() === props.selectedYear &&
		today.getMonth() === props.selectedMonth &&
		today.getDate() === day
	);
};

const isWeekend = (day: number, monthOffset: number) => {
	const date = new Date(props.selectedYear, props.selectedMonth + monthOffset, day);
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

const allDays = computed(() => {
	return [
		...prevMonthDays.value.map((day) => ({
			day,
			type: 'prevMonthDays',
			innerClass: 'days__other-month',
		})),
		...daysInMonth.value.map((day) => ({ day, type: 'daysInMonth', innerClass: '' })),
		...nextMonthDays.value.map((day) => ({
			day,
			type: 'nextMonthDays',
			innerClass: 'days__other-month',
		})),
	];
});

const getClassForDay = (day: number, key: string) => {
	const baseClass: Record<string, boolean> = { days__day: true };

	if (key === 'daysInMonth') {
		Object.assign(baseClass, {
			days__day_selected: day === props.selectedDay,
			days__day_today: isToday(day),
			days__day_weekend: isWeekend(day, 0),
		});
	} else if (key === 'prevMonthDays') {
		baseClass.days__day_weekend = isWeekend(day, -1);
	} else if (key === 'nextMonthDays') {
		baseClass.days__day_weekend = isWeekend(day, 1);
	}

	return baseClass;
};

const handleDayClick = (day: number, key: string) => {
	if (key === 'daysInMonth') {
		emit('selectDay', day);
	} else if (key === 'prevMonthDays') {
		emit('prevMonth', 'month', 'prev');
	} else if (key === 'nextMonthDays') {
		emit('nextMonth', 'month', 'next');
	}
};
</script>

<style lang="scss" scoped>
@import '../utils/variables.scss';

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

	&__day {
		border: 0.5px solid $border-color;
		padding: 8px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;

		&.days__day_selected {
			background-color: #5a64f0;
			color: white;
		}

		&.days__day_today {
			text-decoration: underline;
		}

		&.days__day_weekend {
			color: $weekend-color;
		}

		&:hover {
			background-color: #a89aeb60;
		}
	}
	&__other-month {
		opacity: 0.25;
	}
}
</style>
