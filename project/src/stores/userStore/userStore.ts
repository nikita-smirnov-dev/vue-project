import { fetchMe, loginUser, logout, registerUser } from '@/api/userApi';
import type { User } from '@/types/userTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMovieFavoritesStore } from '../movieStore/movieFavorites';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const loader = ref(false);
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
    loader.value = true;
    error.value = null;

    try {
      user.value = await fetchMe();

      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (err) {
      user.value = null;
      error.value = 'Не удалось загрузить данные пользователя';
    } finally {
      loader.value = false;
    }
  };

  const logoutUser = async () => {
    await logout();
    user.value = null;

    const favoriteStore = useMovieFavoritesStore();
    favoriteStore.reset();

    localStorage.removeItem('user');
  };

  loadUserFromStorage();

  return {
    user,
    error,
    loader,
    login,
    register,
    loadUser,
    logoutUser,
  };
});
