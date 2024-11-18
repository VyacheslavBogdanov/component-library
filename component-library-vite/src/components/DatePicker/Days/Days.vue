<template>
	<div class="day-names">
		<span v-for="day in dayNames" :key="day" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span
			v-for="day in prevMonthDays"
			:key="day"
			:class="['day', { weekend: isWeekendPrevMonth(day) }]"
			@click="emit('prevMonth')"
		>
			<span class="other-month">{{ day }}</span>
		</span>
		<span
			v-for="day in daysInMonth"
			:key="day"
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
			v-for="day in nextMonthDays"
			:key="day"
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
	isWeekendPrevMonth: { type: Boolean, required: true },
	isToday: { type: Boolean, required: true },
	isWeekendCurrentMonth: { type: Boolean, required: true },
	nextMonthDays: { type: Array, required: true },
	isWeekendNextMonth: { type: Boolean, required: true },
});
</script>

<style lang="scss" scoped></style>
