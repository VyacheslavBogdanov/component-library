<template>
	<ul class="radio-list">
		<li class="radio-list__item" v-if="!noResults">
			<label class="radio-list__label">
				<input
					type="radio"
					class="radio-list__input"
					:checked="localSelectedItem === null"
					@change="updateValue(null)"
				/>
				<span class="radio-list__text">Не выбрано</span>
			</label>
		</li>
		<li
			class="radio-list__item"
			v-for="(item, index) in items"
			:key="index"
			:class="{ 'radio-list__item--selected': localSelectedItem === item }"
		>
			<label class="radio-list__label">
				<input
					type="radio"
					class="radio-list__input"
					:checked="localSelectedItem === item"
					@change="updateValue(item)"
				/>
				<span class="radio-list__text">{{ item }}</span>
			</label>
		</li>
	</ul>
	<div v-if="noResults" class="radio-list__no-results">Результаты не найдены</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
	items: {
		type: Array as () => string[],
		required: true,
	},
	modelValue: {
		type: String,
		default: null,
	},
	noResults: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:modelValue']);
const localSelectedItem = ref<string | null>(props.modelValue);

const updateValue = (newValue: string | null) => {
	emit('update:modelValue', newValue);
	localSelectedItem.value = newValue;
};
</script>

<style lang="scss" scoped>
.filter__dropdown-list {
	list-style: none;
	padding: 0;
	margin: 0;
	width: 100%;

	.filter__dropdown-item {
		padding: 8px;
		margin: 0;
		cursor: pointer;
		text-align: start;
		position: relative;

		&:hover {
			background-color: #ece7e773;
		}

		b {
			font-weight: bold;
		}
	}
}

.filter__no-results {
	color: #00000094;
	position: relative;
	margin: auto;
	font-size: 16px;
}
</style>
