<template>
  <div class="trailer-wrapper" v-if="trailerStore.movieTrailer">
    <div v-if="trailerStore.loader">
      <PageLoader />
    </div>
    <div v-else-if="trailerStore.error">
      <ErrorMessage :message="trailerStore.error" />
    </div>
    <YouTube
      v-else
      class="trailer-content"
      :src="trailerStore.movieTrailer?.trailerUrl"
      width="100%"
      height="100%"
      :controls="true"
    />
  </div>
</template>

<script setup lang="ts">
import { useMovieTrailerStore } from '@/stores/movieStore/movieTrailerStore';
import ErrorMessage from '@/UI/ErrorMessage.vue';
import PageLoader from '@/UI/PageLoader.vue';

import YouTube from 'vue3-youtube';

const trailerStore = useMovieTrailerStore();
</script>

<style scoped>
.trailer-content {
  width: 960px;
  height: 540px;
}

@media (max-width: 812px) and (orientation: landscape) {
  .trailer-content {
    width: 660px;
    height: 375px;
  }
}

@media (max-width: 576px) and (orientation: portrait) {
  .trailer-content {
    width: 576px;
    height: 212px;
  }

  :deep(.modal-overlay) {
    background-color: var(--color-black);
  }
}

@media (max-width: 375px) and (orientation: portrait) {
  .trailer-content {
    width: 375px;
    height: 212px;
  }
}
</style>
