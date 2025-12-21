<template>
  <div class="container">
    <Header />
    <main>
      <router-view />
    </main>
    <Modal
      v-if="modalStore.isOpen"
      @close="modalStore.closeModal()"
      :modalType="modalStore.type"
    >
      <component :is="ModalComponent" />
    </Modal>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Auth from './components/Auth.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
import { useModalStore } from './stores/modalStore/modalStore';
import MovieTrailer from './components/MovieTrailer.vue';

const modalStore = useModalStore();

const ModalComponent = computed(() => {
  if (modalStore.type === 'auth') return Auth;
  if (modalStore.type === 'trailer') return MovieTrailer;
  return null;
});
</script>

<style scoped></style>
