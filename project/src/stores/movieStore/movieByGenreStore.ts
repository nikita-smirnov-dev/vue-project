import { fetchMoviesByGenre } from '@/api/movieApi';
import type { MovieByGenre } from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, watch } from 'vue';

import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';

export const useMovieByGenreStore = defineStore('movieGenre', () => {
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

  const genreMovie = ref<MovieByGenre | []>([]);
  const count = ref<number>(10);
  const genreSlug = ref<string>('');
  const page = ref<number>(1);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadGenreMovie = async (
    genre: string = genreSlug.value,
    countNum: number = count.value,
    pageNum: number = page.value
  ) => {
    error.value = null;
    loader.value = true;

    try {
      const data = await fetchMoviesByGenre(genre, countNum, pageNum);
      genreMovie.value = data;
      (genreSlug.value = genre),
        (count.value = countNum),
        (page.value = pageNum);
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось загрузить фильмы данного жанра. Попробуйте позже.';
      genreMovie.value = [];
    } finally {
      loader.value = false;
    }
  };

  const loadMoreMovies = async () => {
    loader.value = true;
    error.value = null;
    page.value += 1;

    try {
      const moreMovies = await fetchMoviesByGenre(
        genreSlug.value,
        count.value,
        page.value
      );
      genreMovie.value = [...genreMovie.value, ...moreMovies];
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить дополнительные фильмы';
      page.value -= 1;
    } finally {
      loader.value = false;
    }
  };

  watch(
    [isDesktop, isTablet],
    () => {
      let newCount = 10;

      if (isMobile.value) {
        newCount = 10;
      } else if (isTablet.value) {
        newCount = 9;
      } else if (isDesktop.value) {
        newCount = 12;
      }

      if (newCount === count.value) return;

      count.value = newCount;
      page.value = 1;

      if (genreSlug.value) {
        loadGenreMovie();
      }
    },
    { immediate: true }
  );

  return {
    loader,
    error,
    loadGenreMovie,
    loadMoreMovies,
    genreMovie,
    count,
    genreSlug,
    page,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useMovieByGenreStore, import.meta.hot)
  );
}
