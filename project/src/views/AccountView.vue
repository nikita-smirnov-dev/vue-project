<template>
  <div class="account">
    <h1 class="account-title section-title">Мой аккаунт</h1>
    <nav class="account-menu">
      <MenuElement path="/account/favorites"
        ><ReHeart3Line class="account-menu__icon" />Избранные фильмы
      </MenuElement>
      <MenuElement path="/account/setting"
        ><ReUserLine class="account-menu__icon" />Настройка аккаунта
      </MenuElement>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ReHeart3Line } from '@kalimahapps/vue-icons';
import { ReUserLine } from '@kalimahapps/vue-icons';
import MenuElement from '@/UI/MenuElement.vue';
</script>

<style scoped>
.account {
  display: flex;
  flex-direction: column;
}

.account-title {
  margin: 0;
  margin-bottom: var(--spacing-64);
}

.account-menu {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: var(--spacing-64);
  margin-bottom: var(--spacing-64);
}

.account-menu__icon {
  margin-right: var(--spacing-10);
}
</style>
