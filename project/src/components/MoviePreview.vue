<template>
  <div class="movie-preview">
    <div class="movie-preview__left">
      <div class="movie-preview__left-info">
        <div class="movie-preview__left-rating">
          <Rating :value="movie.tmdbRating" />
        </div>
        <span class="movie-preview__left-year">{{ movie.releaseYear }}</span>
        <span class="movie-preview__left-genre">{{ formattedGenres }}</span>
        <span class="movie-preview__left-runtime">{{ formattedRuntime }}</span>
      </div>
      <h1 class="movie-preview__left-title section-title">
        {{ movie.title }}
      </h1>
      <p class="movie-preview__left-descr base-text">
        {{ movie.plot }}
      </p>
      <div v-if="isDetails" class="movie-preview__buttons-details">
        <Button class="movie-preview__trailer">Трейлер</Button>
        <Button class="movie-preview__favorite"><ReHeart3Line /></Button>
      </div>
      <div v-else class="movie-preview__buttons-container">
        <Button class="movie-preview__trailer">Трейлер</Button>
        <Button class="movie-preview__film">О фильме</Button>
        <Button class="movie-preview__favorite"><ReHeart3Line /></Button>
        <Button class="movie-preview__update" @click="onNewRandomMovieClick"
          ><ReLoopRightLine
        /></Button>
      </div>
    </div>
    <div class="movie-preview__right">
      <img :src="movie.posterUrl || defaultImage" :alt="movie.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ReHeart3Line } from '@kalimahapps/vue-icons';
import { ReLoopRightLine } from '@kalimahapps/vue-icons';

import type { DetailsMovie, RandomMovie } from '@/types/movieTypes';
import { useMovieRandomStore } from '@/stores/movieRandomStore';
import Button from '@/UI/Button.vue';
import Rating from '@/UI/Rating.vue';
import defaultImage from '../assets/images/default-img.jpg';

const props = defineProps<{
  movie: RandomMovie | DetailsMovie;
  isDetails?: boolean;
}>();

const movieStore = useMovieRandomStore();

const onNewRandomMovieClick = () => {
  movieStore.loadRandomMovie();
};

const formattedRuntime = computed(() => {
  const totalTime = props.movie.runtime;
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  return hours > 0 ? `${hours} ч ${minutes} м` : `${minutes} м`;
});

const formattedGenres = computed(() => {
  return props.movie.genres.join(', ');
});
</script>

<style scoped>
.movie-preview {
  display: flex;
  margin-bottom: var(--spacing-40);
}

.movie-preview__left {
  max-width: 600px;
  padding-top: var(--spacing-70);
  margin-right: var(--spacing-20);
}

.movie-preview__left-info {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: var(--spacing-16);
  margin-bottom: var(--spacing-16);
}

.movie-preview__left-rating {
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.movie-preview__left-year,
.movie-preview__left-genre,
.movie-preview__left-runtime {
  font-size: var(--font-size-18);
  color: var(--color-gradient-gray);
}

.movie-preview__left-title {
  margin: 0;
  margin-bottom: var(--spacing-24);
}

.movie-preview__left-descr {
  margin: 0;
  font-size: var(--font-size-24);
  color: var(--color-gradient-gray);
  margin-bottom: var(--spacing-60);
}

.movie-preview__buttons-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}
.movie-preview__trailer {
  background-color: var(--color-blue-button);
}

.movie-preview__film {
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: var(--color-cape-cod-button);
  white-space: nowrap;
}

.movie-preview__favorite,
.movie-preview__update {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-18) var(--spacing-24);
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: var(--color-shaft-button);
}

.movie-preview__right img {
  width: 680px;
  height: 552px;
  border-radius: 16px;
  object-fit: cover;
}

.movie-preview__buttons-details {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}
</style>
