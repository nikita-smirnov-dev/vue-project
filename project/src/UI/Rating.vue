<template>
  <div :class="[ratingClass, 'rating']">
    <ReStarFill class="rating__icon" />
    {{ displayValue }}
  </div>
</template>

<script setup lang="ts">
import { ReStarFill } from '@kalimahapps/vue-icons';
import { computed } from 'vue';

const props = defineProps<{
  decimals?: number;
  value: number;
}>();

const valueRef = computed(() => props.value);
const decimalsRef = computed(() => props.decimals ?? 1);

const getRatingColorClass = (rating: number): string => {
  if (rating >= 8 && rating <= 10) return 'rating-excellent';
  if (rating >= 6 && rating < 8) return 'rating-good';
  if (rating >= 4 && rating < 6) return 'rating-average';
  if (rating >= 0 && rating < 4) return 'rating-poor';
  return '';
};

const ratingClass = computed(() => getRatingColorClass(valueRef.value));

const displayValue = computed(() =>
  valueRef.value.toFixed(decimalsRef.value).replace('.', ',')
);
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 32px;
  padding: var(--spacing-4) var(--spacing-12);
  border-radius: 16px;
  color: var(--color-white);
}

.rating-excellent {
  background-color: var(--color-exellent-rating);
}

.rating-good {
  background-color: var(--color-good-rating);
}

.rating-average {
  background-color: var(--color-average-rating);
}

.rating-poor {
  background-color: var(--color-poor-rating);
}

.rating__icon {
  width: 15px;
  height: 15px;
  margin-right: var(--spacing-4);
}
</style>
