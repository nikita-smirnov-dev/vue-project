import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref<boolean>(false);
  const type = ref<'auth' | 'trailer' | null>(null);

  const openModal = (modalType: 'auth' | 'trailer') => {
    type.value = modalType;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    openModal,
    closeModal,
    type,
  };
});
