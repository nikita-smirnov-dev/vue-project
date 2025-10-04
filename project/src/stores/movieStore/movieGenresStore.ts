import { fetchMovieGenres } from '@/api/movieApi';
import { genreImageName } from '@/assets/data/genresImageName';
import { genreTranslations } from '@/assets/data/genresTranslateions';
import { type MovieGenre } from '@/types/movieTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieGenresStore = defineStore('genres', () => {
  const movieGenres = ref<MovieGenre[]>([]);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadMovieGenres = async () => {
    loader.value = true;
    error.value = null;
    try {
      const genreList = await fetchMovieGenres();

      const genresWithData: MovieGenre[] = genreList.map(
        (genreName): MovieGenre => ({
          id: genreName,
          slug: genreName,
          title: genreTranslations[genreName] || genreName,
          image: genreImageName[genreName],
        })
      );

      movieGenres.value = genresWithData;
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось загрузить список топ фильмов. Попробуйте позже.';
      movieGenres.value = [];
    } finally {
      loader.value = false;
    }
  };

  return {
    movieGenres,
    loadMovieGenres,
    loader,
    error,
  };
});
