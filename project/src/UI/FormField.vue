<template>
  <label>
    <span class="visually-hidden">{{ label }}</span>
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<style scoped></style>
