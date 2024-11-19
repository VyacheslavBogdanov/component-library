<template>
	<div class="calendar-header">
		<div class="header-item">
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'month', 'prev')">ᐸ</button>
			<span class="month" @click="isMonthDropdownVisible = !isMonthDropdownVisible">
				{{ months[selectedMonth] }}
				<div v-if="isMonthDropdownVisible" class="month-dropdown">
					<span
						v-for="(month, index) in months"
						:key="index"
						@click="SelectHeaderDate(index, 'month')"
					>
						{{ month }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'month', 'next')">ᐳ</button>
		</div>
		<div class="header-item">
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'year', 'prev')">ᐸ</button>
			<span class="year" @click="isYearDropdownVisible = !isYearDropdownVisible">
				{{ selectedYear }}
				<div v-if="isYearDropdownVisible" class="year-dropdown">
					<span
						v-for="year in Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i)"
						:key="year"
						@click="SelectHeaderDate(year, 'year')"
					>
						{{ year }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'year', 'next')">ᐳ</button>
		</div>
	</div>
	<Days />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['ToggleHeaderDate', 'changeSelectedMonth', 'changeSelectedYear']);

const props = defineProps({
	months: { type: Array, default: [] },
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
});

const isMonthDropdownVisible = ref<boolean>(false);
const isYearDropdownVisible = ref<boolean>(false);

const SelectHeaderDate = (value: number, type: 'month' | 'year') => {
	emit(type === 'month' ? 'changeSelectedMonth' : 'changeSelectedYear', value);
	setTimeout(() => {
		type === 'month'
			? (isMonthDropdownVisible.value = false)
			: (isYearDropdownVisible.value = false);
	});
};
</script>

<style lang="scss" scoped>
$border-color: #dcdcdcd2;
$weekend-color: #e60000;
$date-picker-margin: 17px;
$font-family: sans-serif;
$border-radius: 7px;
$cursor: pointer;
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
</style>
