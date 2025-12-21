<template>
  <div class="movie-info">
    <p class="movie-info__text">
      <span class="movie-info__descr">{{ description }}</span>
      <span class="movie-info__dots">&nbsp;</span>
      <span class="movie-info__value">{{ value ?? 'отсутствует' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description: string;
  value: string | number | null | undefined;
}>();
</script>

<style scoped>
.movie-info {
  width: 100%;
}

.movie-info__text {
  display: flex;
  align-items: center;
  width: 45%;
  margin: 0;
  margin-bottom: var(--spacing-24);
  font-size: var(--font-size-18);
  color: var(--color-white);
}

.movie-info__dots {
  flex-grow: 1;
  border-bottom: 1px dotted var(--color-gradient-gray);
  margin: 0 10px;
}

.movie-info__value {
  flex: 0 0 200px;
  text-align: left;
}

@media (max-width: 992px) {
  .movie-info__text {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .movie-info__text {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    margin-bottom: var(--spacing-12);
  }

  .movie-info__descr {
    font-size: var(--font-size-14);
    color: var(--color-gradient-gray);
  }

  .movie-info__dots {
    display: none;
  }

  .movie-info__value {
    flex: 0 0 0;
  }
}
</style>
