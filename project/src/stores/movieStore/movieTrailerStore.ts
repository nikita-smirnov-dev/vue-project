import { fetchMovieVideoTrailer } from '@/api/movieApi';
import type { MovieVideoTrailer } from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieTrailerStore = defineStore('movieTrailer', () => {
  const movieTrailer = ref<MovieVideoTrailer | null>(null);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadTrailerMovie = async (id: number) => {
    loader.value = true;
    error.value = null;

    try {
      const data = await fetchMovieVideoTrailer(id);
      movieTrailer.value = data;
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить трейлер фильма. Попробуйте позже.';
    } finally {
      loader.value = false;
    }
  };

  return {
    movieTrailer,
    loadTrailerMovie,
    loader,
    error,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useMovieTrailerStore, import.meta.hot)
  );
}
