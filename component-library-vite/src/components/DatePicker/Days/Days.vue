<!-- <template>
	<div class="day-names">
		<span v-for="(day, index) in daysNames" :key="index" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span
			v-for="(day, index) in prevMonthDays"
			:key="index"
			:class="['day', { weekend: isWeekendPrevMonth(day) }]"
			@click="emit('prevMonth', 'month', 'prev')"
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
			@click="emit('nextMonth', 'month', 'next')"
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
	selectedDay: { type: [Number, null], required: true },
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
</style> -->
<!-- <template>
	<div class="day-names">
		<span v-for="(day, index) in daysNames" :key="index" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span v-for="config in daysConfig" :key="config.key">
			<span
				v-for="(day, index) in computedDays[config.key]"
				:key="index"
				:class="getClassForDay(day, config.key)"
				@click="handleDayClick(day, config)"
			>
				<span :class="config.class">{{ day }}</span>
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { daysConfig } from '../../mocks/db.js';

interface Props {
	daysNames: string[];
	selectedDay: number | null;
	selectedYear: number;
	selectedMonth: number;
}

const props = defineProps<Props>();

type Emits = {
	(event: 'prevMonth', unit: 'month', direction: 'prev'): void;
	(event: 'selectDay', day: number): void;
	(event: 'nextMonth', unit: 'month', direction: 'next'): void;
};

const emit = defineEmits<Emits>();

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

const computedDays = computed<{
	prevMonthDays: number[];
	daysInMonth: number[];
	nextMonthDays: number[];
}>(() => ({
	prevMonthDays: prevMonthDays.value,
	daysInMonth: daysInMonth.value,
	nextMonthDays: nextMonthDays.value,
}));

const getClassForDay = (day: number, key: keyof typeof computedDays.value) => {
	const baseClass: Record<string, boolean> = { day: true };

	if (key === 'daysInMonth') {
		Object.assign(baseClass, {
			selected: day === props.selectedDay,
			today: isToday(day),
			weekend: isWeekend(day, 0),
		});
	} else if (key === 'prevMonthDays') {
		baseClass.weekend = isWeekend(day, -1);
	} else if (key === 'nextMonthDays') {
		baseClass.weekend = isWeekend(day, 1);
	}

	return baseClass;
};

const handleDayClick = (
	day: number,
	config: {
		key: keyof typeof computedDays.value;
		emitEvent: 'prevMonth' | 'selectDay' | 'nextMonth';
	},
) => {
	if (config.key === 'daysInMonth') {
		emit(config.emitEvent, day);
	} else {
		emit(config.emitEvent, 'month', config.key === 'prevMonthDays' ? 'prev' : 'next');
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
</style> -->
<template>
	<div class="day-names">
		<span v-for="(day, index) in daysNames" :key="index" class="day-name">{{ day }}</span>
	</div>
	<div class="days">
		<span
			v-for="(day, index) in computedDays.prevMonthDays"
			:key="'prev-' + index"
			:class="getClassForDay(day, 'prevMonthDays')"
			@click="handleDayClick(day, 'prevMonthDays')"
		>
			<span class="other-month">{{ day }}</span>
		</span>
		<span
			v-for="(day, index) in computedDays.daysInMonth"
			:key="'current-' + index"
			:class="getClassForDay(day, 'daysInMonth')"
			@click="handleDayClick(day, 'daysInMonth')"
		>
			<span>{{ day }}</span>
		</span>
		<span
			v-for="(day, index) in computedDays.nextMonthDays"
			:key="'next-' + index"
			:class="getClassForDay(day, 'nextMonthDays')"
			@click="handleDayClick(day, 'nextMonthDays')"
		>
			<span class="other-month">{{ day }}</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props
const props = defineProps({
	daysNames: { type: Array, default: () => [] },
	selectedDay: { type: [Number, null], required: true },
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
});

// Типизация для событий
const emit = defineEmits<{
	(event: 'prevMonth', unit: 'month', direction: 'prev'): void;
	(event: 'nextMonth', unit: 'month', direction: 'next'): void;
	(event: 'selectDay', day: number): void;
}>();

// Вспомогательные функции
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

// Вычисление дней
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

const computedDays = computed(() => ({
	prevMonthDays: prevMonthDays.value,
	daysInMonth: daysInMonth.value,
	nextMonthDays: nextMonthDays.value,
}));

// Классы для дней
const getClassForDay = (day: number, key: keyof typeof computedDays.value) => {
	const baseClass: Record<string, boolean> = { day: true };

	if (key === 'daysInMonth') {
		Object.assign(baseClass, {
			selected: day === props.selectedDay,
			today: isToday(day),
			weekend: isWeekend(day, 0),
		});
	} else if (key === 'prevMonthDays') {
		baseClass.weekend = isWeekend(day, -1);
	} else if (key === 'nextMonthDays') {
		baseClass.weekend = isWeekend(day, 1);
	}

	return baseClass;
};

// Обработчик кликов
const handleDayClick = (day: number, key: keyof typeof computedDays.value) => {
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

	.day {
		border: 0.5px solid $border-color;
		padding: 8px;
		cursor: pointer;
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
