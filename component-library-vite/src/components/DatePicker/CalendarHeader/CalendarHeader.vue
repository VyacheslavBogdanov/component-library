<template>
	<div class="calendar-header">
		<div class="header-item" v-for="(item, index) in props.calendarHeaderItem" :key="index">
			<button class="nav-button" @click="emit('ToggleHeaderDate', item.type, 'prev')">
				ᐸ
			</button>
			<span
				class="month"
				@click="dropdownVisibility[item.type] = !dropdownVisibility[item.type]"
			>
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

const emit = defineEmits<{
	(event: 'ToggleHeaderDate', type: 'month' | 'year', route: 'prev' | 'next'): void;
	(event: 'changeSelectedMonth', value: number): void;
	(event: 'changeSelectedYear', value: number): void;
}>();

const dropdownVisibility = ref<Record<string, boolean>>({
	month: false,
	year: false,
});

const SelectHeaderDate = async (
	value: string | number,
	type: 'month' | 'year',
	elIndex: number,
) => {
	if (type === 'month') {
		emit('changeSelectedMonth', elIndex);
	} else {
		emit('changeSelectedYear', value as number);
	}

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
