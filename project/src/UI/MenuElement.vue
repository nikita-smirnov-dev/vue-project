<template>
  <router-link
    class="menu-item base-text"
    :to="path"
    :title="title"
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

.menu-item:focus-visible {
  outline: none;
}

.menu-item:focus-visible,
.menu-item:hover:not(.menu-item--active) {
  color: var(--color-active-accent);
}

.menu-item--active {
  border-bottom: 1px solid var(--color-menu-line);
}

@media (max-width: 992px) {
  .menu-item {
    font-size: var(--font-size-20);
  }
}
</style>
