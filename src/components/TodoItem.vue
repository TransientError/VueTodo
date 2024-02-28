<script setup lang="ts">
import "../style.css"
import { TodoItem } from './TodoItem';

const props = defineProps<{ item: TodoItem, i: number }>();
const emit = defineEmits(["check"]);

function handleCheck() {
  emit('check', props.i);
}
</script>

<template>
  <li><input class="checkbox" type="checkbox" :checked="props.item.done" @click="handleCheck">{{
    props.item.description }}</li>
</template>

<style scoped>
li {
  color: var(--text);
  margin-left: 15%;
  margin-right: 15%;
}

.checkbox {
  accent-color: var(--secondary);
}
</style>
