<template>
  <button class="btn-reset btn-login base-text">
    <slot>{{ title }}</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.btn-login {
  width: 69px;
  padding: var(--spacing-8) 0;
  transition: color 0.3s ease-in-out;
}

.btn-login:focus-visible {
  outline: none;
}

.btn-login:focus-visible,
.btn-login:hover {
  color: var(--color-active-accent);
}

@media (max-width: 992px) {
  .btn-login {
    font-size: var(--font-size-20);
  }
}
</style>
