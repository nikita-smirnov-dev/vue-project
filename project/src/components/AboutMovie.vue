<template>
  <div class="about-movie">
    <h2 class="about-movie__title section-title">О фильме</h2>
    <MovieInfo description="Язык оригинала" :value="languageLabel" />
    <MovieInfo description="Бюджет" :value="formatMoney(movie.budget)" />
    <MovieInfo description="Выручка" :value="formatMoney(movie.revenue)" />
    <MovieInfo description="Режиссёр" :value="movie.director" />
    <MovieInfo description="Продакшен" :value="movie.production" />
    <MovieInfo description="Награды" :value="movie.awardsSummary" />
  </div>
</template>

<script setup lang="ts">
import MovieInfo from './MovieInfo.vue';
import type { DetailsMovie } from '@/types/movieTypes';
import { languageDetails } from '../assets/data/languageMovieDetails';
import { computed } from 'vue';

type AboutMovieProps = Pick<
  DetailsMovie,
  | 'language'
  | 'budget'
  | 'director'
  | 'revenue'
  | 'awardsSummary'
  | 'production'
>;

const props = defineProps<{
  movie: AboutMovieProps;
}>();

const languageLabel = computed(
  () => languageDetails[props.movie.language ?? 'отсутствует']
);

const formatMoney = (value: string | number | null | undefined): string => {
  return value != null ? `${value} руб.` : 'отсуствует';
};
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
