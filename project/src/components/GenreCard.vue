<template>
  <div class="genre-card">
    <img class="genre-card__img" :src="genre.image" :alt="genre.title" />
    <div class="genre-card__content">
      <p class="genre-card__text base-text">{{ genre.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieGenre } from '@/types/movieTypes';

const props = defineProps<{
  genre: MovieGenre;
}>();
</script>

<style scoped>
.genre-card {
  position: relative;
  width: 100%;
  height: 304px;
  border: 1px solid var(--color-border-card);
  border-radius: 24px;
  box-shadow: 0 0 80px 0 var(--color-shadow-card);
  overflow: hidden;
  background-color: var(--color-genre-card);
  transition: border 0.3s ease-in-out;
}

.genre-card:hover {
  border: 1px solid var(--color-white);
}

.genre-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-genre-content);
}

.genre-card__text {
  margin: 0;
  padding: var(--spacing-30);
  text-align: center;
  font-weight: 700;
}

.genre-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
