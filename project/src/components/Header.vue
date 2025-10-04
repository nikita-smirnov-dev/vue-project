<template>
  <header class="header">
    <Logo class="header-logo" color="white" />
    <Navigation />
    <Search />
    <LoginButton v-if="userStore.user">
      <MenuElement
        path="/account/favorites"
        :title="userStore.user.name"
      ></MenuElement>
    </LoginButton>
    <LoginButton v-else title="Войти" @click="modalStore.openModal()" />
  </header>
</template>

<script setup lang="ts">
import LoginButton from './LoginButton.vue';
import Navigation from './Navigation.vue';
import Search from './Search.vue';
import Logo from '../UI/Logo.vue';
import { useModalStore } from '@/stores/modalStore/modalStore';
import { useUserStore } from '@/stores/userStore/userStore';
import MenuElement from '@/UI/MenuElement.vue';

const modalStore = useModalStore();
const userStore = useUserStore();
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-24) 0;
  margin-bottom: var(--spacing-32);
}

.header-logo {
  margin-right: var(--spacing-80);
}
</style>
