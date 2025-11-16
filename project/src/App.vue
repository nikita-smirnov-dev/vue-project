<template>
  <div class="container">
    <Header />
    <main>
      <router-view />
    </main>
    <Modal v-if="modalStore.isOpen" @close="modalStore.closeModal()"
      ><Auth
    /></Modal>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Auth from './components/Auth.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';
import { useModalStore } from './stores/modalStore/modalStore';

const modalStore = useModalStore();
</script>

<style scoped></style>
