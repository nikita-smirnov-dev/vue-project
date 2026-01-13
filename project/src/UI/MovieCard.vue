<template>
  <div class="movie-card">
    <div v-if="hideRating" class="movie-card__rating">{{ index }}</div>
    <div class="movie-card__wrapper">
      <img
        class="movie-card__img"
        :src="movie.posterUrl || defaultImg"
        :alt="movie.title"
      />
    </div>
    <button
      v-if="isFavorite"
      class="movie-card__btn-close btn-reset"
      @click="removeToFavorite()"
    >
      <MdClose class="movie-card__close-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { MdClose } from '@kalimahapps/vue-icons';
import type { TopMovie } from '@/types/movieTypes';
import defaultImg from '../assets/images/default-img.jpg';
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';

const props = defineProps<{
  movie: TopMovie;
  hideRating: boolean;
  index?: number;
  isFavorite?: boolean;
}>();

const isFavoriteStore = useMovieFavoritesStore();

const removeToFavorite = () => {
  if (!props.movie.id) return;

  isFavoriteStore.removeFavoriteMovie(props.movie.id);
};
</script>

<style scoped>
.movie-card {
  position: relative;
}

.movie-card__wrapper {
  width: 100%;
  height: 336px;
  border: 1px solid var(--color-border-card);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 80px 0 var(--color-shadow-card);
  transition: border 0.3s ease-in-out;
}

.movie-card__wrapper:hover {
  border: 1px solid var(--color-white);
}

.movie-card__rating {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -15px;
  left: -15px;
  width: 62px;
  height: 48px;
  border-radius: 50px;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-24);
  color: var(--color-raiting-top-movie);
  background-color: var(--color-white);
  z-index: 10;
}

.movie-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-card__btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -15px;
  right: -20px;
  width: 40px;
  height: 40px;
  color: var(--color-black);
  background-color: var(--color-white);
  border-radius: 30px;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.movie-card__close-icon {
  width: 25px;
  height: 25px;
}
.movie-card:focus-within .movie-card__btn-close,
.movie-card:hover .movie-card__btn-close {
  opacity: 1;
  visibility: visible;
}
</style>
