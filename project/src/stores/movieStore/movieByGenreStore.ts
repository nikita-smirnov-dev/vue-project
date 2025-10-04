import { fetchMoviesByGenre } from '@/api/movieApi';
import type { MovieByGenre } from '@/types/movieTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieByGenreStore = defineStore('movieGenre', () => {
  const genreMovie = ref<MovieByGenre | null>(null);
  const count = ref<number>(10);
  const genreSlug = ref<string>('');
  const page = ref<number>(1);
  // const loader = ref(false);
  // const error = ref<string | null>(null);

  const loadGenreMovie = async (
    genre: string = genreSlug.value,
    countNum: number = count.value,
    pageNum: number = page.value
  ) => {
    const data = await fetchMoviesByGenre(genre, countNum, pageNum);
    genreMovie.value = data;
    (genreSlug.value = genre), (count.value = countNum), (page.value = pageNum);
  };

  const loadMoreMovies = async () => {
    page.value += 1;
    const moreMovies = await fetchMoviesByGenre(
      genreSlug.value,
      count.value,
      page.value
    );
    genreMovie.value = [...(genreMovie.value || []), ...moreMovies];
  };

  return {
    loadGenreMovie,
    loadMoreMovies,
    genreMovie,
    count,
    genreSlug,
    page,
  };
});
