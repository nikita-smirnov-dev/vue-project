import { fetchMovieByTitle, fetchMoviesByGenre } from '@/api/movieApi';
import type {
  MovieByGenre,
  MovieSearchByTitle,
  MovieSearchList,
} from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieSearchStore = defineStore('movieSearch', () => {
  const searchMovie = ref<MovieSearchList | []>([]);
  const count = ref<number>(5);
  const title = ref<string>('');
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadMovieSearch = async (
    titleMovie: string = title.value,
    countMovie: number = count.value
  ) => {
    error.value = null;
    loader.value = true;

    try {
      const data = await fetchMovieByTitle(titleMovie, countMovie);
      searchMovie.value = data;
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить фильмы жанра. Попробуйте позже.';
      searchMovie.value = [];
    } finally {
      loader.value = false;
    }
  };

  return {
    loader,
    error,
    searchMovie,
    loadMovieSearch,
    count,
    title,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieSearchStore, import.meta.hot));
}
