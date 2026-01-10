import {
  fetchAddFavoriteMovie,
  fetchFavoritesMovies,
  fetchRemoveFavoriteMovie,
} from '@/api/movieApi';
import type { FavoritesMovies } from '@/types/movieTypes';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieFavoritesStore = defineStore('movieFavorites', () => {
  const movieFavorites = ref<FavoritesMovies | null>(null);
  const loader = ref(false);
  const error = ref<string | null>(null);

  const loadFavoritesMovie = async () => {
    loader.value = true;
    error.value = null;

    try {
      const data = await fetchFavoritesMovies();
      movieFavorites.value = data;
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось загрузить список избранных фильмов. Попробуйте позже.';
      movieFavorites.value = [];
    } finally {
      loader.value = false;
    }
  };

  type TFavoriteMovie = {
    id: number;
    posterUrl: string | null;
  };

  const addFavoriteMovie = async (movie: TFavoriteMovie) => {
    loader.value = true;
    error.value = null;

    try {
      await fetchAddFavoriteMovie(movie.id);

      if (!movieFavorites.value) {
        await loadFavoritesMovie();
        return;
      }

      const data = movieFavorites.value.some(
        (favorite) => favorite.id === movie.id
      );
      if (!data) {
        movieFavorites.value.push(movie);
      }
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось загрузить список избранных фильмов. Попробуйте позже.';
      movieFavorites.value = null;
    } finally {
      loader.value = false;
    }
  };

  const isFavorite = (id: number) => {
    return movieFavorites.value?.some((movie) => movie.id === id) ?? false;
  };

  const removeFavoriteMovie = async (id: number) => {
    loader.value = true;
    error.value = null;

    try {
      await fetchRemoveFavoriteMovie(id);
      movieFavorites.value =
        movieFavorites.value?.filter((el) => el.id !== id) ?? null;
    } catch (err) {
      console.error(err);
      error.value =
        'Не удалось удалить фильм из избранных фильмов. Попробуйте позже.';
    } finally {
      loader.value = false;
    }
  };

  const reset = () => {
    movieFavorites.value = null;
    error.value = null;
    loader.value = false;
  };

  return {
    movieFavorites,
    loadFavoritesMovie,
    addFavoriteMovie,
    isFavorite,
    removeFavoriteMovie,
    loader,
    error,
    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useMovieFavoritesStore, import.meta.hot)
  );
}
