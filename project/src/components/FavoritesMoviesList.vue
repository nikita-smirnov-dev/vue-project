<template>
  <div class="favorites-movies">
    <template v-if="movieFavoritesStore.movieFavorites === null">
      <DataLoader />
    </template>

    <template v-else-if="movieFavoritesStore.movieFavorites?.length === 0">
      <h2 class="favorites-movies__title">У вас пока нет избранных фильмов</h2>
    </template>

    <template v-else>
      <ul class="favorites-movies__list list-reset">
        <li
          class="favorites-movies__item"
          v-for="item of movieFavoritesStore.movieFavorites"
          :key="item.id"
        >
          <MovieCard :movie="item" :hide-rating="false" :isFavorite="true" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';
import DataLoader from '@/UI/DataLoader.vue';
import MovieCard from '@/UI/MovieCard.vue';

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
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}
</style>
