import { fetchTopMovie } from '@/api/movieApi';
import type { TopMovieList } from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieTopStore = defineStore('movieTop', () => {
  const movieTop = ref<TopMovieList | null>(null);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadTopMovie = async () => {
    loader.value = true;
    error.value = null;

    try {
      const data = await fetchTopMovie();
      movieTop.value = data;
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось загрузить список топ фильмов. Попробуйте позже.';
      movieTop.value = null;
    } finally {
      loader.value = false;
    }
  };

  return {
    movieTop,
    loadTopMovie,
    loader,
    error,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieTopStore, import.meta.hot));
}
