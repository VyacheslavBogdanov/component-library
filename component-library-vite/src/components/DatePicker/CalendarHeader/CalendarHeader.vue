<!-- <template>
	<div class="calendar-header">
		<div class="header-item">
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'month', 'prev')">ᐸ</button>
			<span class="month" @click="isMonthDropdownVisible = !isMonthDropdownVisible">
				{{ props.months[props.selectedMonth] }}
				<div v-if="isMonthDropdownVisible" class="month-dropdown">
					<span
						v-for="(month, index) in props.months"
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
				{{ props.selectedYear }}
				<div v-if="isYearDropdownVisible" class="year-dropdown">
					<span
						v-for="year in Array.from(
							{ length: 21 },
							(_, i) => props.selectedYear - 10 + i,
						)"
						:key="year"
						@click="SelectHeaderDate(year, 'year')"
					>
						{{ year }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="emit('ToggleHeaderDate', 'year', 'next')">ᐳ</button>
		</div>
		<div class="header-item" v-for="(item, index) in props.calendarHeaderItem" :key="index">
			<button class="nav-button" @click="emit('ToggleHeaderDate', item.type, 'prev')">
				ᐸ
			</button>
			<span class="month" @click="ToggleDropdownVisible(item.type)">
				{{ item.typesArr[props.selectedMonth] }}
				<div
					v-if="item.type === 'month' ? isMonthDropdownVisible : isYearDropdownVisible"
					class="month-dropdown"
				>
					<span
						v-for="(el, index) in item.typesArr"
						:key="index"
						@click="SelectHeaderDate(el, item.type)"
					>
						{{ el }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="emit('ToggleHeaderDate', item.type, 'next')">
				ᐳ
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['ToggleHeaderDate', 'changeSelectedMonth', 'changeSelectedYear']);

const props = defineProps({
	calendarHeaderItem: { type: Array, default: [] },
	selectedYear: { type: Number, required: true },
	selectedMonth: { type: Number, required: true },
});

const isMonthDropdownVisible = ref<boolean>(false);
const isYearDropdownVisible = ref<boolean>(false);

const ToggleDropdownVisible = (type: 'month' | 'year') => {
	if (type === 'month') {
		isMonthDropdownVisible.value = !isMonthDropdownVisible.value;
	} else if (type === 'year') {
		isYearDropdownVisible.value = !isYearDropdownVisible.value;
	}
};

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
@import '../utils/variables.scss';
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
</style> -->

<template>
	<div class="calendar-header">
		<div class="header-item" v-for="(item, index) in props.calendarHeaderItem" :key="index">
			<button class="nav-button" @click="emit('ToggleHeaderDate', item.type, 'prev')">
				ᐸ
			</button>
			<span class="month" @click="ToggleDropdownVisible(item.type)">
				{{
					item.type === 'month' ? item.typesArr[props.selectedMonth] : props.selectedYear
				}}
				<div v-if="dropdownVisibility[item.type]" class="dropdown">
					<span
						v-for="(el, elIndex) in item.typesArr"
						:key="elIndex"
						@click="SelectHeaderDate(el, item.type, elIndex)"
					>
						{{ el }}
					</span>
				</div>
			</span>
			<button class="nav-button" @click="emit('ToggleHeaderDate', item.type, 'next')">
				ᐳ
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface CalendarHeaderItem {
	type: 'month' | 'year';
	typesArr: string[] | number[];
}

const props = defineProps<{
	calendarHeaderItem: CalendarHeaderItem[];
	selectedYear: number;
	selectedMonth: number;
}>();

const emit = defineEmits(['ToggleHeaderDate', 'changeSelectedMonth', 'changeSelectedYear']);

const dropdownVisibility = ref<Record<string, boolean>>({
	month: false,
	year: false,
});

const ToggleDropdownVisible = (type: 'month' | 'year') => {
	dropdownVisibility.value[type] = !dropdownVisibility.value[type];
};

const SelectHeaderDate = (value: string | number, type: 'month' | 'year', elIndex: number) => {
	emit(
		type === 'month' ? 'changeSelectedMonth' : 'changeSelectedYear',
		type === 'month' ? elIndex : value,
	);
	setTimeout(() => {
		dropdownVisibility.value[type] = false;
	});
};
</script>

<style lang="scss" scoped>
@import '../utils/variables.scss';

.calendar-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	padding: 0 7px;
	width: 445px;
	height: 70px;

	.header-item {
		display: flex;
		align-items: center;
	}

	.month,
	.year {
		font-size: 27px;
		font-weight: bold;
		cursor: $cursor;
		position: relative;
		padding: 0 12px;
	}

	.nav-button {
		background: none;
		border: none;
		font-size: 23px;
		cursor: $cursor;
	}

	.dropdown {
		position: absolute;
		background: white;
		border: 1px solid $border-color;
		padding: 5px;
		z-index: 2;
		max-height: 240px;
		overflow-y: auto;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
