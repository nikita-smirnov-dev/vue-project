import { fetchMovieDetails } from '@/api/movieApi';
import type { DetailsMovie } from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieDetailsStore = defineStore('movieDetails', () => {
  const detailsMovie = ref<DetailsMovie | null>(null);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadMovieDetails = async (id: number) => {
    loader.value = true;
    error.value = null;

    try {
      const data = await fetchMovieDetails(id);
      detailsMovie.value = data;
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить фильм. Попробуйте позже.';
      detailsMovie.value = null;
    } finally {
      loader.value = false;
    }
  };

  return {
    detailsMovie,
    loadMovieDetails,
    loader,
    error,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useMovieDetailsStore, import.meta.hot)
  );
}
