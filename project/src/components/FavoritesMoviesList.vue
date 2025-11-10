<template>
  <div class="favorites-movies">
    <div v-if="movieFavoritesStore.loader">
      <PageLoader />
    </div>

    <div v-if="movieFavoritesStore.error">
      <ErrorMessage
        :message="movieFavoritesStore.error"
        :onRetry="movieFavoritesStore.loadFavoritesMovie"
      />
    </div>

    <div
      v-if="
        !movieFavoritesStore.movieFavorites ||
        movieFavoritesStore.movieFavorites.length === 0
      "
    >
      <h2 class="favorites-movies__title">У вас пока нет избранных фильмов</h2>
    </div>

    <ul class="favorites-movies__list list-reset">
      <li
        class="favorites-movies__item"
        v-for="item of movieFavoritesStore.movieFavorites"
        :key="item.id"
      >
        <MovieCard :movie="item" :hide-rating="false" :isFavorite="true" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';
import ErrorMessage from '@/UI/ErrorMessage.vue';
import MovieCard from '@/UI/MovieCard.vue';
import PageLoader from '@/UI/PageLoader.vue';

const movieFavoritesStore = useMovieFavoritesStore();
</script>

<style scoped>
.favorites-movies {
  padding-bottom: 100px;
}

.favorites-movies__title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--color-white);
}

.favorites-movies__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  /* grid-template-columns: repeat(5, 224px); */
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}
</style>
