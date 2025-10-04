<template>
  <main>
    <section class="genres">
      <h1 class="genres__title section-title">Жанры фильмов</h1>
      <div v-if="genreStore.movieGenres">
        <ul class="genres__list list-reset">
          <li v-for="item of genreStore.movieGenres" :key="item.id">
            <router-link :to="`/genres/${item.slug}`">
              <GenreCard :genre="item"
            /></router-link>
          </li>
        </ul>
      </div>
      <DataLoader v-if="genreStore.loader" />
      <div v-else-if="genreStore.error">
        {{ genreStore.error }}
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';

import GenreCard from '@/components/GenreCard.vue';
import { useMovieGenresStore } from '@/stores/movieStore/movieGenresStore';
import DataLoader from '@/UI/DataLoader.vue';

const genreStore = useMovieGenresStore();

onMounted(() => {
  genreStore.loadMovieGenres();
});
</script>

<style scoped>
.genres {
  padding-top: var(--spacing-32);
  margin-bottom: var(--spacing-160);
}

.genres__title {
  margin: 0;
  margin-bottom: var(--spacing-64);
}

.genres__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
}
</style>
