import { fetchMovieDetails } from '@/api/movieApi';
import type { DetailsMovie } from '@/types/movieTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieDetailsStore = defineStore('movieDetails', () => {
  const detailsMovie = ref<DetailsMovie | null>(null);

  const loadMovieDetails = async (id: number) => {
    const data = await fetchMovieDetails(id);
    detailsMovie.value = data;
  };

  return {
    detailsMovie,
    loadMovieDetails,
  };
});
