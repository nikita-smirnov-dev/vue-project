<template>
  <div class="about-movie">
    <h2 class="about-movie__title section-title">О фильме</h2>
    <MovieInfo description="Язык оригинала" value="отсутствует" />
    <MovieInfo description="Бюджет" value="отсутствует" />
    <MovieInfo description="Выручка" value="отсутствует" />
    <MovieInfo description="Режиссёр" value="отсутствует" />
    <MovieInfo description="Продакшен" value="отсутствует" />
    <MovieInfo description="Награды" value="отсутствует" />
  </div>
</template>

<script setup lang="ts">
import MovieInfo from './MovieInfo.vue';
</script>

<style scoped>
.about-movie {
  margin-bottom: var(--spacing-120);
}

.about-movie__title {
  margin: 0;
  margin-bottom: var(--spacing-64);
}
</style>
