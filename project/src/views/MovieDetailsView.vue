<template>
  <main>
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
  </main>
</template>

<script setup lang="ts">
import AboutMovie from '@/components/AboutMovie.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import { useRoute } from 'vue-router';
import { useMovieDetailsStore } from '@/stores/movieStore/movieDetailsStore';
import { onMounted } from 'vue';

const route = useRoute();
const movieDetailsStore = useMovieDetailsStore();
const movieId = Number(route.params.id);

onMounted(() => {
  movieDetailsStore.loadMovieDetails(movieId);
});
</script>

<style scoped></style>
