<template>
    <li @mousedown.prevent="selectItem">
        <span v-for="(part, partIndex) in highlightMatch(item)" 
              :key="partIndex" 
              :class="{ 'highlighted': part.highlighted }">
            {{ part.text }}
        </span>
    </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    item: String,
    highlightMatch: Function
});

const emit = defineEmits(['select']);

const selectItem = () => {
    emit('select', props.item);
};
</script>

