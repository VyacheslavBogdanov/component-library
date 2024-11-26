<!-- <template>
	<label
		:class="{
			'filter-container__label': true,
			'filter-container__label--active': isDropdownVisible,
		}"
		>Исполнитель</label
	>
	<div
		:class="{
			'filter-container--iconPositionTop': isDropdownVisible,
			'filter-container--iconPositionDown': !isDropdownVisible,
		}"
	>
		⌃
	</div>
	<input
		readonly
		type="text"
		v-model="displayText"
		@focus="isDropdownVisible = true"
		:class="{
			'filter-container__input': true,
			'filter-container__input--active': isDropdownVisible,
		}"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{
	isDropdownVisible: boolean;
	// selectedYear: number;
	// selectedMonth: number;
}>();
</script> -->
