import { fetchMe, loginUser, logout, registerUser } from '@/api/userApi';
import type { User } from '@/types/userTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMovieFavoritesStore } from '../movieStore/movieFavorites';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);

  const loadUserFromStorage = async () => {
    const saveUser = localStorage.getItem('user');

    if (saveUser) {
      user.value = JSON.parse(saveUser);

      const favoriteStore = useMovieFavoritesStore();
      await favoriteStore.loadFavoritesMovie();
    }
  };

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    user.value = await fetchMe();

    const favoriteStore = useMovieFavoritesStore();
    await favoriteStore.loadFavoritesMovie();

    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    error.value = null;
    await registerUser(name, surname, email, password);
  };

  const loadUser = async () => {
    try {
      user.value = await fetchMe();

      localStorage.setItem('user', JSON.stringify(user.value));

      const favoriteStore = useMovieFavoritesStore();
      favoriteStore.movieFavorites = null;
    } catch {
      user.value = null;
    }
  };

  const logoutUser = async () => {
    await logout();
    user.value = null;

    localStorage.removeItem('user');
  };

  loadUserFromStorage();

  return {
    user,
    error,
    login,
    register,
    loadUser,
    logoutUser,
  };
});
