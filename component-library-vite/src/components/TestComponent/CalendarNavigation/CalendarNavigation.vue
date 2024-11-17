<template>
	<div class="calendar-navigation">
		<div class="nav-btns">
			<button class="nav-button" @click="$emit('prevMonth')">ᐸ</button>
			<span class="month" @click="toggleMonthDropdown">
				{{ months[currentMonth] }}
				<div v-if="isMonthDropdownVisible" class="dropdown">
					<span v-for="(month, index) in months" :key="index" @click="selectMonth(index)">
						{{ month }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="$emit('nextMonth')">ᐳ</button>
		</div>
		<!-- <div class="month-navigation">
			<button class="nav-button" @click="$emit('prevMonth')">ᐸ</button>
			<span class="month" @click="toggleMonthDropdown">
				{{ months[currentMonth] }}
				<div v-if="isMonthDropdownVisible" class="dropdown">
					<span v-for="(month, index) in months" :key="index" @click="selectMonth(index)">
						{{ month }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="$emit('nextMonth')">ᐳ</button>
		</div>
		<div class="year-navigation">
			<button class="nav-button" @click="$emit('prevYear')">ᐸ</button>
			<span class="year" @click="toggleYearDropdown">
				{{ currentYear }}
				<div v-if="isYearDropdownVisible" class="dropdown">
					<span v-for="year in yearRange" :key="year" @click="selectYear(year)">
						{{ year }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="$emit('nextYear')">ᐳ</button>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
	months: { type: Array, required: true },
	currentMonth: { type: Number, required: true },
	currentYear: { type: Number, required: true },
	isMonthDropdownVisible: { type: Boolean, required: true },
	isYearDropdownVisible: { type: Boolean, required: true },
});

const emit = defineEmits([
	'selectMonth',
	'selectYear',
	'prevMonth',
	'nextMonth',
	'prevYear',
	'nextYear',
]);

const toggleMonthDropdown = () =>
	emit('update:isMonthDropdownVisible', !props.isMonthDropdownVisible);
const toggleYearDropdown = () => emit('update:isYearDropdownVisible', !props.isYearDropdownVisible);

const selectMonth = (month: number) => emit('selectMonth', month);
const selectYear = (year: number) => emit('selectYear', year);

const yearRange = computed(() => {
	const startYear = props.currentYear - 10;
	return Array.from({ length: 21 }, (_, i) => startYear + i);
});
</script>

<style scoped>
.calendar-navigation {
	display: flex;
	justify-content: space-between;
}

.month-navigation,
.year-navigation {
	display: flex;
	align-items: center;
}

.nav-button {
	background: none;
	border: none;
	font-size: 1.2em;
	cursor: pointer;
}

.month,
.year {
	cursor: pointer;
}

.dropdown {
	position: absolute;
	background: white;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	display: flex;
	flex-direction: column;
	max-height: 200px;
	overflow-y: auto;
}

.dropdown span {
	padding: 4px;
	cursor: pointer;
}

.dropdown span:hover {
	background-color: #f0f0f0;
}
</style>
