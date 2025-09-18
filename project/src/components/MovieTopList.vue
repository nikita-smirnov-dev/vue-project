<template>
  <div class="top-movies">
    <h2 class="top-movies__title">Топ 10 фильмов</h2>
    <ul class="top-movies__list list-reset">
      <li v-for="(item, index) of movie" :key="item.id">
        <router-link :to="`/about/${item.id}`">
          <MovieCard :movie="item" :hide-rating="true" :index="index + 1" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import MovieCard from '@/UI/MovieCard.vue';
import moviesData from '../data/movies';
import { useMovieTopStore } from '@/stores/movieTopStore';
import type { TopMovieList } from '@/types/movieTypes';

const topMovies = ref(moviesData);

const props = defineProps<{
  movie: TopMovieList | null;
}>();

const movieTopStore = useMovieTopStore();
</script>

<style scoped>
.top-movies {
  margin-bottom: var(--spacing-120);
}

.top-movies__title {
  margin: 0;
  margin-bottom: var(--spacing-64);
  font-weight: 700;
  font-size: var(--font-size-40);
  color: var(--color-white);
}

.top-movies__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}
</style>
