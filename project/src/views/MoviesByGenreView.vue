<template>
  <main>
    <section class="movies-genres">
      <div class="movies-genres__block">
        <router-link to="/genres" class="movies-genres__button">
          <MdArrowBackIos class="movies-genres__icon" />
        </router-link>
        <h1 class="movies-genres__title section-title">
          {{ currentGenre }}
        </h1>
      </div>
      <ul class="movies-genres__list list-reset">
        <li v-for="item of genreByMovieStore.genreMovie" :key="item.id">
          <router-link :to="`/about/${item.id}`">
            <MovieCard :movie="item" :hide-rating="false" />
          </router-link>
        </li>
      </ul>
      <div class="movies-genres__btn-wrapper" v-if="isShowBtnVisible">
        <Button
          class="movies-genres__btn"
          @click="genreByMovieStore.loadMoreMovies()"
          >Показать ещё</Button
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { MdArrowBackIos } from '@kalimahapps/vue-icons';

import MovieCard from '@/UI/MovieCard.vue';
import Button from '@/UI/Button.vue';
import { useMovieByGenreStore } from '@/stores/movieByGenreStore';
import { genreTranslations } from '@/assets/data/genresTranslateions';

const route = useRoute();
const genreByMovieStore = useMovieByGenreStore();

const genreSlug = computed(() => {
  return typeof route.params.genreSlug === 'string'
    ? route.params.genreSlug
    : '';
});

const currentGenre = computed(() => {
  return (
    genreTranslations[genreSlug.value as keyof typeof genreTranslations] ||
    genreSlug.value
  );
});

const isShowBtnVisible = computed(() => {
  return (genreByMovieStore.genreMovie?.length || 0) < 50;
});

watch(
  genreSlug,
  (newSlug) => {
    if (newSlug) {
      genreByMovieStore.loadGenreMovie(newSlug);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.movies-genres {
  padding-top: var(--spacing-32);
  margin-bottom: var(--spacing-160);
}

.movies-genres__block {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-64);
}

.movies-genres__title {
  margin: 0;
}

.movies-genres__button {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-20);
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.movies-genres__button:hover {
  transform: scale(1.5);
}

.movies-genres__icon {
  width: 35px;
  height: 35px;
  color: var(--color-white);
}

.movies-genres__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
  margin-bottom: var(--spacing-64);
}

.movies-genres__btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.movies-genres__btn {
  background-color: var(--color-blue-button);
}
</style>
