<template>
  <header class="header">
    <template v-if="isTablet">
      <Logo class="header-logo" color="white" :is-link="true" />
      <nav class="header-nav__mobail" aria-label="Мобильная навигация">
        <MenuElement class="header-nav__mobail-genres" path="/genres">
          <ReApps2Line
            class="header-nav__mobail-svg"
            aria-label="Открыть список жанров"
          />
        </MenuElement>
        <button
          class="header-nav__mobail-btn btn-reset"
          aria-label="Открыть поиск"
        >
          <BxSearch
            class="header-nav__mobail-svg"
            @click="handleSearchOpen"
            aria-hidden="true"
          />
        </button>
        <button
          class="header-nav__mobail-btn btn-reset"
          @click="onLoginClick"
          aria-label="Войти в аккаунт"
        >
          <ReUserLine class="header-nav__mobail-svg" aria-hidden="true" />
        </button>
      </nav>
      <div
        v-if="showSearch"
        class="mobile-search-overlay"
        :class="showSearch ? 'mobile-search-overlay--visible' : ''"
      >
        <Search :search-close-mobile="() => handleSearchClose()" />
      </div>
    </template>
    <template v-else>
      <Logo class="header-logo" color="white" :is-link="true" />
      <Navigation />
      <Search />
      <LoginButton v-if="userStore.user">
        <MenuElement
          path="/account/favorites"
          :title="userStore.user.name"
        ></MenuElement>
      </LoginButton>
      <LoginButton v-else title="Войти" @click="modalStore.openModal('auth')" />
    </template>
  </header>
</template>

<script setup lang="ts">
import { ReUserLine } from '@kalimahapps/vue-icons';
import { BxSearch } from '@kalimahapps/vue-icons';
import { ReApps2Line } from '@kalimahapps/vue-icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import LoginButton from './LoginButton.vue';
import Navigation from './Navigation.vue';
import Search from './Search.vue';
import Logo from '../UI/Logo.vue';
import { useModalStore } from '@/stores/modalStore/modalStore';
import { useMovieSearchStore } from '@/stores/movieStore/movieSearchStore';
import { useUserStore } from '@/stores/userStore/userStore';
import MenuElement from '@/UI/MenuElement.vue';
import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';

const modalStore = useModalStore();
const userStore = useUserStore();
const searchStore = useMovieSearchStore();
const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
const router = useRouter();

const showSearch = ref(false);

const handleSearchOpen = () => {
  showSearch.value = true;
};

const handleSearchClose = () => {
  showSearch.value = false;
  searchStore.title = '';
};

const onLoginClick = () => {
  userStore.user
    ? router.push('/account/favorites')
    : modalStore.openModal('auth');
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-24) 0;
  margin-bottom: var(--spacing-32);
}

.header-logo {
  margin-right: var(--spacing-80);
}

@media (max-width: 992px) {
  .header {
    padding: var(--spacing-20) 0;
  }
}

@media (max-width: 768px) {
  .header {
    padding: var(--spacing-20) 0;
    margin-bottom: var(--spacing-10);
  }

  .header-nav__mobail {
    display: flex;
    justify-content: center;
    gap: var(--spacing-40);
    color: var(--color-white);
    cursor: pointer;
  }

  .header-nav__mobail-btn {
    padding: 0;
    color: white;
  }

  .header-nav__mobail-svg {
    width: 30px;
    height: 30px;
  }

  .header-nav__mobail-genres:active {
    border-bottom: none;
  }
  .mobile-search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    padding: var(--spacing-20) var(--spacing-40);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .mobile-search-overlay--visible {
    opacity: 1;
    visibility: visible;
  }
}

@media (max-width: 576px) {
  .header {
    padding: var(--spacing-16) 0;
    margin-bottom: 0;
  }

  .header-logo {
    width: 80px;
    margin-right: var(--spacing-20);
  }

  .header-nav__mobail {
    gap: var(--spacing-20);
  }

  .header-nav__mobail-svg {
    width: 24px;
    height: 24px;
  }

  .mobile-search-overlay {
    padding: var(--spacing-16) var(--spacing-20);
  }
}
</style>
