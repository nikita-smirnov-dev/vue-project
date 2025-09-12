<template>
  <div class="movie-card">
    <div v-if="hideRating" class="movie-card__rating">{{ index }}</div>
    <div class="movie-card__wrapper">
      <div class="movie-card__img">
        <img :src="movie.img" alt="img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  hideRating: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 1,
  },
});
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

.movie-card__img img {
  width: 100%;
  height: 336px;
  object-fit: cover;
}
</style>
