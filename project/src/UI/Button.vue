<template>
  <button
    class="btn-reset base-button"
    :class="variantAction !== 'text' && `button--${variantAction}`"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variantAction?: 'primary' | 'secondary' | 'text';
  }>(),
  {
    variantAction: 'text',
  }
);
</script>

<style scoped>
.base-button {
  padding: var(--spacing-16) var(--spacing-48);
  border-radius: 28px;
  font-weight: 700;
  font-size: var(--font-size-18);
  line-height: 1.3;
  color: var(--color-white);
  cursor: pointer;
  border: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    background-color 0.3s ease;
}

.button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background-color: var(--color-hover-primary);
}

.button--secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background-color: var(--color-hover-secondary);
}

.button--primary:active {
  transform: scale(0.96);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  background-color: var(--color-active-primary);
}

.button--secondary:active {
  transform: scale(0.96);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  background-color: var(--color-active-secondary);
}
</style>
