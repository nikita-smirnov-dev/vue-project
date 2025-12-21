<template>
  <template v-if="isLoaderPage">
    <PageLoader />
  </template>
  <template v-else-if="isErrorPage">
    <ErrorMessage :message="isErrorPage" :onRetry="loadPageData" />
  </template>
  <template v-else>
    <section>
      <div class="account">
        <h1 class="account-title section-title">Мой аккаунт</h1>
        <nav v-if="isMobile" class="account-menu" aria-label="Меню аккаунта">
          <MenuElement path="/account/favorites"
            ><ReHeart3Line
              class="account-menu__icon"
              aria-hidden="true"
            />Избраннoе
          </MenuElement>
          <MenuElement path="/account/setting"
            ><ReUserLine
              class="account-menu__icon"
              aria-hidden="true"
            />Настройки
          </MenuElement>
        </nav>
        <nav v-else class="account-menu" aria-label="Меню аккаунта">
          <MenuElement path="/account/favorites"
            ><ReHeart3Line
              class="account-menu__icon"
              aria-hidden="true"
            />Избранные фильмы
          </MenuElement>
          <MenuElement path="/account/setting"
            ><ReUserLine
              class="account-menu__icon"
              aria-hidden="true"
            />Настройка аккаунта
          </MenuElement>
        </nav>
        <router-view />
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import { ReHeart3Line } from '@kalimahapps/vue-icons';
import { ReUserLine } from '@kalimahapps/vue-icons';
import MenuElement from '@/UI/MenuElement.vue';
import { useUserStore } from '@/stores/userStore/userStore';
import { useMovieFavoritesStore } from '@/stores/movieStore/movieFavorites';
import { computed } from 'vue';
import PageLoader from '@/UI/PageLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';
import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';

const userStore = useUserStore();
const favoriteStore = useMovieFavoritesStore();
const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

const isLoaderPage = computed(() => {
  return userStore.loader || favoriteStore.loader;
});

const isErrorPage = computed(() => {
  return userStore.error || favoriteStore.error;
});
const loadPageData = async () => {
  await Promise.all([userStore.loadUser(), favoriteStore.loadFavoritesMovie()]);
};
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

@media (max-width: 768px) {
  .account-title {
    margin-bottom: var(--spacing-40);
  }

  .account-menu {
    gap: var(--spacing-24);
    margin-bottom: var(--spacing-60);
  }
}

@media (max-width: 576px) {
  .account-menu {
    margin-bottom: var(--spacing-40);
  }
}
</style>
