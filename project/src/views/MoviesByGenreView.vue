<template>
  <template v-if="isInitialLoading">
    <PageLoader />
  </template>
  <template v-else>
    <section class="movies-genres">
      <div class="movies-genres__block">
        <router-link to="/genres" class="movies-genres__button">
          <MdArrowBackIos class="movies-genres__icon" />
        </router-link>
        <h1 class="movies-genres__title section-title">
          {{ currentGenre }}
        </h1>
      </div>

      <template v-if="genreByMovieStore.loader">
        <DataLoader />
      </template>

      <template v-else-if="genreByMovieStore.error">
        <ErrorMessage
          :message="genreByMovieStore.error"
          :onRetry="genreByMovieStore.loadGenreMovie"
        />
      </template>

      <template v-else>
        <ul class="movies-genres__list list-reset">
          <li
            class="movies-genres__item"
            v-for="item of genreByMovieStore.genreMovie"
            :key="item.id"
          >
            <router-link class="movies-genres__link" :to="`/about/${item.id}`">
              <MovieCard :movie="item" :hide-rating="false" />
            </router-link>
          </li>
        </ul>
      </template>

      <div
        class="movies-genres__btn-wrapper"
        v-if="isShowBtnVisible && genreByMovieStore.genreMovie.length !== 0"
      >
        <Button
          class="movies-genres__btn"
          @click="genreByMovieStore.loadMoreMovies()"
          variantAction="primary"
          >Показать ещё</Button
        >
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { MdArrowBackIos } from '@kalimahapps/vue-icons';

import MovieCard from '@/UI/MovieCard.vue';
import Button from '@/UI/Button.vue';
import { useMovieByGenreStore } from '@/stores/movieStore/movieByGenreStore';
import { genreTranslations } from '@/assets/data/genresTranslateions';
import PageLoader from '@/UI/PageLoader.vue';
import DataLoader from '@/UI/DataLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';

const route = useRoute();
const genreByMovieStore = useMovieByGenreStore();

const isInitialLoading = computed(() => {
  return genreByMovieStore.loader && genreByMovieStore.genreMovie.length === 0;
});

const genreSlug = computed(() => {
  return typeof route.params.genreSlug === 'string'
    ? route.params.genreSlug
    : '';
});

const currentGenre = computed(() => {
  return (
    genreTranslations[genreSlug.value as keyof typeof genreTranslations] ||
    genreSlug.value
  );
});

const isShowBtnVisible = computed(() => {
  return (genreByMovieStore.genreMovie?.length || 0) < 50;
});

watch(
  genreSlug,
  (newSlug) => {
    if (newSlug) {
      genreByMovieStore.loadGenreMovie(newSlug);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.movies-genres {
  padding-top: var(--spacing-32);
  margin-bottom: var(--spacing-160);
}

.movies-genres__block {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-64);
}

.movies-genres__title {
  margin: 0;
}

.movies-genres__button {
  display: flex;
  align-items: center;
  margin-right: var(--spacing-20);
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.movies-genres__button:hover {
  transform: scale(1.5);
}

.movies-genres__icon {
  width: 35px;
  height: 35px;
  color: var(--color-white);
}

.movies-genres__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: var(--spacing-40);
  row-gap: var(--spacing-64);
  margin-bottom: var(--spacing-64);
}

.movies-genres__btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.movies-genres__btn {
  background-color: var(--color-blue-button);
}

@media (max-width: 992px) {
  .movies-genres {
    margin-bottom: var(--spacing-90);
  }

  .movies-genres__list.list-reset {
    grid-template-columns: repeat(4, 1fr);
    row-gap: var(--spacing-40);
  }
}

@media (max-width: 768px) {
  .movies-genres {
    margin-bottom: var(--spacing-60);
  }

  .movies-genres__block {
    margin-bottom: var(--spacing-40);
  }

  .movies-genres__icon {
    width: 30px;
    height: 30px;
  }

  .movies-genres__list.list-reset {
    grid-template-columns: repeat(3, 1fr);
  }

  .movies-genres__button:hover {
    transform: none;
  }
}

@media (max-width: 576px) {
  .movies-genres {
    margin-bottom: var(--spacing-40);
  }

  .movies-genres__title {
    font-size: var(--font-size-24);
  }

  .movies-genres__button {
    margin-right: var(--spacing-10);
  }

  .movies-genres__icon {
    width: 25px;
    height: 25px;
  }

  .movies-genres__list.list-reset {
    grid-template-columns: repeat(1, 1fr);
    row-gap: var(--spacing-24);
    margin-bottom: var(--spacing-40);
  }

  .movies-genres__list.list-reset :deep(.movie-card__wrapper) {
    height: 780px;
  }

  .movies-genres__btn {
    width: 100%;
    background-color: var(--color-raiting-top-movie);
  }
}

@media (max-width: 375px) {
  .movies-genres__list.list-reset :deep(.movie-card__wrapper) {
    height: 502px;
  }
}
</style>
