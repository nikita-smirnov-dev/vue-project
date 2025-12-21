<template>
  <template v-if="isInitialLoading">
    <PageLoader />
  </template>
  <template v-else-if="movieDetailsStore.error">
    <ErrorMessage
      :message="movieDetailsStore.error"
      :onRetry="
        () => movieDetailsStore.loadMovieDetails(Number(route.params.id))
      "
    />
  </template>
  <template v-else>
    <section>
      <MoviePreview
        v-if="movieDetailsStore.detailsMovie"
        :movie="movieDetailsStore.detailsMovie"
        :is-details="true"
      />
    </section>
    <section>
      <AboutMovie
        v-if="movieDetailsStore.detailsMovie"
        :movie="movieDetailsStore.detailsMovie"
      />
    </section>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, watch } from 'vue';

import AboutMovie from '@/components/AboutMovie.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import { useMovieDetailsStore } from '@/stores/movieStore/movieDetailsStore';
import PageLoader from '@/UI/PageLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';

const route = useRoute();
const movieDetailsStore = useMovieDetailsStore();

const isInitialLoading = computed(() => {
  return movieDetailsStore.loader && !movieDetailsStore.detailsMovie;
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      movieDetailsStore.loadMovieDetails(Number(newId));
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
