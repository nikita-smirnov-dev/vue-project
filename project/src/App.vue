<template>
  <div class="container">
    <Header @open-login="isModalOpen = true" />
    <router-view />
    <!-- <Modal><Auth /></Modal> -->
    <Modal v-if="isModalOpen" @close="isModalOpen = false"><Auth /></Modal>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Auth from './components/Auth.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';

const isModalOpen = ref(false);
</script>

<style scoped></style>
