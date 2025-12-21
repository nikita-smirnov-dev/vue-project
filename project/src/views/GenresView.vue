<template>
  <template v-if="isInitialLoading">
    <PageLoader />
  </template>
  <template v-else>
    <section class="genres">
      <h1 class="genres__title section-title">Жанры фильмов</h1>
      <template v-if="genreStore.loader">
        <DataLoader />
      </template>

      <template v-else-if="genreStore.error">
        <ErrorMessage
          :message="genreStore.error"
          :onRetry="genreStore.loadMovieGenres"
        />
      </template>

      <template v-else>
        <ul class="genres__list list-reset">
          <li v-for="item of genreStore.movieGenres" :key="item.id">
            <router-link :to="`/genres/${item.slug}`">
              <GenreCard :genre="item"
            /></router-link>
          </li>
        </ul>
      </template>
    </section>
  </template>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { computed, onMounted } from 'vue';

import GenreCard from '@/components/GenreCard.vue';
import { useMovieGenresStore } from '@/stores/movieStore/movieGenresStore';
import DataLoader from '@/UI/DataLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';
import PageLoader from '@/UI/PageLoader.vue';

const genreStore = useMovieGenresStore();

const isInitialLoading = computed(() => {
  return genreStore.loader && genreStore.movieGenres.length === 0;
});

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

@media (max-width: 992px) {
  .genres {
    margin-bottom: 90px;
  }

  .genres__list {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .genres {
    margin-bottom: var(--spacing-60);
  }

  .genres__title {
    margin-bottom: var(--spacing-40);
  }
}

@media (max-width: 576px) {
  .genres {
    margin-bottom: var(--spacing-40);
  }

  .genres__list {
    row-gap: var(--spacing-24);
  }
}
</style>
