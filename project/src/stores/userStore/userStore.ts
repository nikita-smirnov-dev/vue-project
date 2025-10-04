import { fetchMe, loginUser, logout, registerUser } from '@/api/userApi';
import type { User } from '@/types/userTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    user.value = await fetchMe();
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => {
    await registerUser(name, surname, email, password);
    error.value = null;
  };

  const loadUser = async () => {
    try {
      user.value = await fetchMe();
    } catch {
      user.value = null;
    }
  };

  const logoutUser = async () => {
    await logout();
    user.value = null;
  };
  return {
    user,
    error,
    login,
    register,
    loadUser,
    logoutUser,
  };
});
