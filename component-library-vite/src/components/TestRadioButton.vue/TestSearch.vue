<template>
	<div class="search-wrapper">
		<input
			type="text"
			v-model="localSearchQuery"
			placeholder="Поиск"
			@focus="$emit('focus')"
			class="search-wrapper__input"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:modelValue', 'focus']);
const localSearchQuery = ref(props.modelValue);

watch(localSearchQuery, (newValue) => {
	emit('update:modelValue', newValue);
});
</script>

<style lang="scss" scoped>
@import './utils/style-variables.scss';

.search-wrapper {
	position: relative;
	width: 80%;
	justify-content: center;

	&__input {
		width: 100%;
		height: $height-input;
		border: 1.5px solid #9f979773;
		border-radius: 8px;
		outline: none;
		padding: 0 12px;
		font-size: 16px;
		color: #333;
		box-sizing: border-box;
		transition: border-color 0.2s;

		&:focus {
			border-color: $focus-color;
		}
	}
}
</style>
