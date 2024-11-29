<!-- <template>
	<div v-if="!isDropdownVisible" class="chips-container">
		<div
			v-for="(chip, index) in selectedItems"
			:key="index"
			class="chips-container__chip"
			@mouseenter="showTooltip(chip, $event)"
			@mousemove="moveTooltip($event)"
			@mouseleave="hideTooltip"
		>
			<span class="chips-container__chip-content">{{ chip }}</span>
			<button class="chips-container__delete-chip" @click="removeChip(chip)">
				<div class="chips-container__delete-chip-icon">✕</div>
			</button>
		</div>
		<span v-if="tooltipText" :style="tooltipStyle" class="tooltip">{{ tooltipText }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
	isDropdownVisible: boolean;

	selectedItems: string[];
	removeChip: any;
}>();

const emit = defineEmits<{}>();

const tooltipText = ref<string | null>(null);
const tooltipStyle = ref<Record<string, string>>({});

const showTooltip = (chip: string, event: MouseEvent) => {
	if (chip.length > 17) {
		tooltipText.value = chip;
		updateTooltipPosition(event);
	}
};

const moveTooltip = (event: MouseEvent) => {
	if (tooltipText.value) {
		updateTooltipPosition(event);
	}
};

const hideTooltip = () => {
	tooltipText.value = null;
};

const updateTooltipPosition = (event: MouseEvent) => {
	tooltipStyle.value = {
		left: `${event.pageX + 10}px`,
		top: `${event.pageY + 10}px`,
	};
};
</script>
<style lang="scss" scoped>
@import '../utils/variables.scss';
.chips-container {
	display: flex;
	flex-wrap: wrap;
	max-height: 153px;
	width: 600px;
	overflow-y: auto;
	gap: 8px;
	margin: 12px 0 0 16px;

	&__chip {
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 0 0 8px;
		height: 23px;
		max-width: 170px;
		background-color: #e0e0e0;
		border-radius: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #333;
		cursor: default;

		&:hover {
			background-color: $chip-hover-bg-color;
		}

		&:hover .tooltip {
			display: block;
		}
	}

	&__chip-content {
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__delete-chip {
		background: none;
		border: none;
		color: $icon-color;
		font-size: 9px;
		font-weight: bold;
		cursor: pointer;
		margin-left: 8px;
	}

	&__delete-chip-icon {
		height: 14px;
		width: 14px;
		border: none;
		border-radius: 50%;
		background-color: rgb(88, 85, 85);
		color: #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.tooltip {
	position: absolute;
	background-color: rgb(21, 18, 18);
	color: rgb(224, 211, 211);
	font-size: 12px;
	padding: 4px 8px;
	border-radius: 4px;
	white-space: nowrap;
	z-index: 1;
	pointer-events: none;
}
</style> -->

<template>
	<div v-if="!isDropdownVisible" class="chips-container">
		<div
			v-for="(chip, index) in selectedItems"
			:key="index"
			class="chips-container__chip"
			@mouseenter="showTooltip(chip, $event)"
			@mousemove="moveTooltip($event)"
			@mouseleave="hideTooltip"
		>
			<span class="chips-container__chip-content">{{ chip }}</span>
			<button class="chips-container__delete-chip" @click="removeChip(chip)">
				<div class="chips-container__delete-chip-icon">✕</div>
			</button>
		</div>
		<span v-if="tooltipText" :style="tooltipStyle" class="tooltip">{{ tooltipText }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
	isDropdownVisible: boolean;

	selectedItems: string[];
	removeChip: any;
}>();

const emit = defineEmits<{}>();

const tooltipText = ref<string | null>(null);
const tooltipStyle = ref<Record<string, string>>({});

const showTooltip = (chip: string, event: MouseEvent) => {
	if (chip.length > 17) {
		tooltipText.value = chip;
		updateTooltipPosition(event);
	}
};

const moveTooltip = (event: MouseEvent) => {
	if (tooltipText.value) {
		updateTooltipPosition(event);
	}
};

const hideTooltip = () => {
	tooltipText.value = null;
};

const updateTooltipPosition = (event: MouseEvent) => {
	tooltipStyle.value = {
		left: `${event.pageX + 10}px`,
		top: `${event.pageY + 10}px`,
	};
};

// const sortedChips = computed(() => [...props.selectedItems].sort());
</script>
<style lang="scss" scoped>
@import '../utils/variables.scss';
.chips-container {
	display: flex;
	flex-wrap: wrap;
	max-height: 153px;
	width: 600px;
	overflow-y: auto;
	gap: 8px;
	margin: 12px 0 0 16px;

	&__chip {
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 0 0 8px;
		height: 23px;
		max-width: 170px;
		background-color: #e0e0e0;
		border-radius: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #333;
		cursor: default;

		&:hover {
			background-color: $chip-hover-bg-color;
		}

		&:hover .tooltip {
			display: block;
		}
	}

	&__chip-content {
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__delete-chip {
		background: none;
		border: none;
		color: $icon-color;
		font-size: 9px;
		font-weight: bold;
		cursor: pointer;
		margin-left: 8px;
	}

	&__delete-chip-icon {
		height: 14px;
		width: 14px;
		border: none;
		border-radius: 50%;
		background-color: rgb(88, 85, 85);
		color: #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.tooltip {
	position: absolute;
	background-color: rgb(21, 18, 18);
	color: rgb(224, 211, 211);
	font-size: 12px;
	padding: 4px 8px;
	border-radius: 4px;
	white-space: nowrap;
	z-index: 1;
	pointer-events: none;
}
</style>
