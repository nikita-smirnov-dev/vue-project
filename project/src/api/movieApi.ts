import { RandomMovieSchema, type RandomMovie } from '@/types/movieTypes';
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
