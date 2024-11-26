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
