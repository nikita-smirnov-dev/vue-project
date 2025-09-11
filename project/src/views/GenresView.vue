<template>
  <section class="genres">
    <h1 class="genres__title section-title">Жанры фильмов</h1>
    <ul class="genres__list list-reset">
      <li v-for="item of genres" :key="item.id">
        <router-link to="/genres/:genreSlug">
          <GenreCard :genre="item"
        /></router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import GenreCard from '@/components/GenreCard.vue';
import { RouterLink } from 'vue-router';
import imgGenre from '../assets/images/image.jpg';
import { ref } from 'vue';

const genres = ref([
  {
    id: 1,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 2,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 3,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 4,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 5,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 6,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 7,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 8,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 9,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 10,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 11,
    title: 'детектив',
    img: imgGenre,
  },
  {
    id: 12,
    title: 'детектив',
    img: imgGenre,
  },
]);
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
