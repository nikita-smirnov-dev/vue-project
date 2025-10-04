import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { RandomMovie } from '@/types/movieTypes';
import { fetchRandomMovie } from '@/api/movieApi';

export const useMovieRandomStore = defineStore('random', () => {
  const movieRandom = ref<RandomMovie | null>(null);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadRandomMovie = async () => {
    loader.value = true;
    error.value = null;

    try {
      const data = await fetchRandomMovie();
      movieRandom.value = data;
    } catch (err) {
      console.error(err);
      error.value = 'Не удалось загрузить фильм. Попробуйте позже.';
      movieRandom.value = null;
    } finally {
      loader.value = false;
    }
  };

  return {
    loader,
    movieRandom,
    loadRandomMovie,
    error,
  };
});
