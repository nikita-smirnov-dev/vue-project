import {
  RandomMovieSchema,
  TopMovieListSchema,
  type RandomMovie,
  type TopMovieList,
} from '@/types/movieTypes';
import { API_BASE_URL, endpoints } from './config';

export const fetchRandomMovie = async (): Promise<RandomMovie> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoints.randomMovie}`);

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
    const response = await fetch(`${API_BASE_URL}${endpoints.topMovie}`);

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
