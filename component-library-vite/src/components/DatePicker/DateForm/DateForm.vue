<template>
	<input
		type="text"
		:v-model="formattedDate"
		@click="$emit('toggleVisible')"
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

<style lang="scss" scoped></style>
