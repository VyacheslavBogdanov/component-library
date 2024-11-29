<template>
	<input
		type="text"
		v-model="inputValue"
		@click="emit('toggleVisible')"
		placeholder="__.__.____ г"
		class="date-form__input"
		maxlength="10"
	/>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps({
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
	selectedDay: { type: [Number, null], required: true },
});

const emit = defineEmits<{
	(event: 'toggleVisible'): void;
	(event: 'changeDate', payload: { day: number; month: number; year: number }): void;
}>();

const inputValue = ref<string>('');

const formattedDate = computed(() => {
	if (props.selectedDay === null) return '';
	return `${String(props.selectedDay).padStart(2, '0')}.${String(props.selectedMonth + 1).padStart(2, '0')}.${props.selectedYear}`;
});

watch(
	() => formattedDate.value,
	(newValue) => {
		inputValue.value = newValue;
	},
	{ immediate: true },
);

watch(inputValue, (value) => {
	const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.(\d{4})$/;
	if (datePattern.test(value)) {
		const [day, month, year] = value.split('.').map(Number);
		emit('changeDate', {
			day: day,
			month: month - 1,
			year: year,
		});
	}
});
</script>

<style lang="scss" scoped>
@import '../utils/variables.scss';

.date-form__input {
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
</style>
