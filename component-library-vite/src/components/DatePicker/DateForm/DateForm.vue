<template>
	<input
		type="text"
		:v-model="formattedDate"
		@click="emit('toggleVisible')"
		placeholder="__.__.____ г"
		class="date-form__input"
		maxlength="10"
	/>
</template>

<script setup lang="ts">
const props = defineProps({
	formattedDate: { type: String, required: true },
	isCalendarVisible: { type: Boolean, required: true },
});

const emit = defineEmits(['toggleVisible']);
</script>

<style lang="scss" scoped>
$border-color: #dcdcdcd2;
$weekend-color: #e60000;
$date-picker-margin: 17px;
$font-family: sans-serif;
$border-radius: 7px;
$cursor: pointer;

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
