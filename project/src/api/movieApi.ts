import type { IRandomMovie } from '@/types/movieTypes';
import { API_BASE_URL, endpoints } from './config';

export const fetchRandomMovie = async (): Promise<IRandomMovie> => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoints.randomMovie}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Нет данных в ответе от API:', error);
    throw error;
  }
};
