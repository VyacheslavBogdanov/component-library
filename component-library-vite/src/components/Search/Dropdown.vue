<template>
    <div class="dropdown">
        <ul class="dropdown-list">
            <DropdownItem
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :highlightMatch="highlightMatch"
                @select="handleSelect"
            />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import DropdownItem from './DropdownItem.vue';

const props = defineProps({
    items: Array,
    highlightMatch: Function
});

const emit = defineEmits(['select']);

const handleSelect = (item) => {
    emit('select', item);
};
</script>

