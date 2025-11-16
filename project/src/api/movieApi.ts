import {
  BaseMovieSchema,
  FavoritesMoviesSchema,
  FavoriteToMovieSchema,
  GenreArraySchema,
  MovieByGenreSchema,
  RandomMovieSchema,
  TopMovieListSchema,
  type DetailsMovie,
  type FavoritesMovies,
  type FavoriteToMovie,
  type GenreArray,
  type MovieByGenre,
  type RandomMovie,
  type TopMovieList,
} from '@/types/movieTypes';
import { API_BASE_URL, endpointsMovie } from './config';

export const fetchRandomMovie = async (): Promise<RandomMovie> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpointsMovie.randomMovie}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return RandomMovieSchema.parse(data);
  } catch (error) {
    console.error('Нет данных в ответе от API:', error);
    throw error;
  }
};

export const fetchTopMovie = async (): Promise<TopMovieList> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpointsMovie.topMovie}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return TopMovieListSchema.parse(data);
  } catch (error) {
    console.error('Нет данных в ответе от API:', error);
    throw error;
  }
};

export const fetchMovieGenres = async (): Promise<GenreArray> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpointsMovie.genresMovie}`
    );
    const data = await response.json();
    return GenreArraySchema.parse(data);
  } catch (error) {
    console.error('Genres movies fetch error:', error);
    throw error;
  }
};

export const fetchMoviesByGenre = async (
  genreSlug: string,
  count: number,
  page: number
): Promise<MovieByGenre> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpointsMovie.movie}?genre=${genreSlug}&count=${count}&page=${page}`
    );
    const data = await response.json();
    return MovieByGenreSchema.parse(data);
  } catch (error) {
    console.error('Movie be genres movies fetch error:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: number): Promise<DetailsMovie> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpointsMovie.movie}/${id}`
    );
    const data = await response.json();
    return BaseMovieSchema.parse(data);
  } catch (error) {
    console.error('Movie dateils fetch error:', error);
    throw error;
  }
};

export const fetchFavoritesMovies = async (): Promise<FavoritesMovies> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpointsMovie.favorites}`, {
      credentials: 'include',
    });
    const data = await response.json();
    return FavoritesMoviesSchema.parse(data);
  } catch (error) {
    console.error('Favorites movies fetch error:', error);
    throw error;
  }
};

export const fetchAddFavoriteMovie = async (
  movieId: number
): Promise<FavoriteToMovie> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpointsMovie.favorites}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: movieId.toString() }),
    });

    const data = await response.json();
    return FavoriteToMovieSchema.parse(data);
  } catch (error) {
    console.error('Add favorite movie fetch error:', error);
    throw error;
  }
};

export const fetchRemoveFavoriteMovie = async (
  movieId: number
): Promise<FavoriteToMovie> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpointsMovie.favorites}/${movieId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    const data = await response.json();
    return FavoriteToMovieSchema.parse(data);
  } catch (error) {
    console.error('Delete favorite movie fetch error:', error);
    throw error;
  }
};
