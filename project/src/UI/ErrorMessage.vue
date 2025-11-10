<template>
  <div class="error-wrapper">
    <span class="error-message base-text">{{ message }}</span>
    <Button class="error-btn" @click="onRetry?.()"> Повторить запрос </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

const props = defineProps<{
  message: string | null;
  onRetry?: () => void;
}>();
</script>

<style scoped>
.error-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: var(--spacing-20);
}

.error-message {
  margin-bottom: var(--spacing-12);
}

.error-btn {
  background-color: var(--color-blue-button);
}
</style>
