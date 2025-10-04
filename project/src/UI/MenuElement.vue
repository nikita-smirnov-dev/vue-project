<template>
  <router-link
    class="menu-item base-text"
    :to="path"
    active-class="menu-item--active"
  >
    <slot>{{ title }}</slot>
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps<{
  path: string;
  title?: string;
}>();
</script>

<style scoped>
.menu-item {
  padding-bottom: 5px;
  border-bottom: 1px solid transparent;
  transition: color 0.3s ease-in-out;
}

.menu-item:hover:not(.menu-item--active) {
  color: var(--color-active-accent);
}

.menu-item--active {
  border-bottom: 1px solid var(--color-menu-line);
}
</style>
