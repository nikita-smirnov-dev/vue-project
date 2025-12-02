<template>
  <form class="search">
    <BxSearch class="search__icon" />
    <input
      class="search__input"
      type="text"
      placeholder="Поиск"
      v-model="searchStore.title"
    />
    <div v-if="searchStore.title.length">
      <button class="search-close btn-reset" type="button" @click="closeSearch">
        <MdClose class="search-close__icon" />
      </button>
    </div>
  </form>
  <div class="search-block" v-if="searchStore.title.length">
    <DataLoader v-if="searchStore.loader" />

    <ErrorMessage v-else-if="searchStore.error" :message="searchStore.error" />

    <ul v-else class="search-list list-reset">
      <li v-if="isEmptyResult" class="search-status">Ничего не найдено</li>

      <li
        v-else
        class="search-item"
        v-for="item of searchStore.searchMovie"
        :key="item.id"
      >
        <router-link
          class="search-item__link"
          :to="`/about/${item.id}`"
          @click="closeSearch"
        >
          <SearchMovieItem :movie="item" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MdClose } from '@kalimahapps/vue-icons';
import { computed, watch } from 'vue';

import { BxSearch } from '@kalimahapps/vue-icons';
import { useMovieSearchStore } from '@/stores/movieStore/movieSearchStore';
import SearchMovieItem from './SearchMovieItem.vue';
import DataLoader from '@/UI/DataLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';

let timeout: ReturnType<typeof setTimeout>;
const searchStore = useMovieSearchStore();

const isEmptyResult = computed(
  () =>
    !searchStore.loader &&
    !searchStore.error &&
    searchStore.searchMovie.length === 0 &&
    searchStore.title.length > 0
);

const closeSearch = () => {
  searchStore.title = '';
  searchStore.searchMovie = [];
};

watch(
  () => searchStore.title,
  (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      searchStore.loadMovieSearch(value);
    }, 300);
  }
);
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  width: 50%;
  padding: var(--spacing-12) var(--spacing-20);
  margin-right: var(--spacing-80);
  border-radius: 8px;
  background-color: var(--color-dark-gray);
}

.search__input {
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  color: var(--color-white);
  background-color: var(--color-dark-gray);
}

.search__input::placeholder {
  font-weight: 400;
  font-size: var(--font-size-18);
  color: var(--color-gradient-gray);
}

.search__icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  color: var(--color-gradient-gray);
}

.search-block {
  position: absolute;
  top: 80%;
  left: 45%;
  width: 43%;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--color-dark-gray);
  z-index: 100;
}

.search-list {
  padding: var(--spacing-8);
}

.search-item {
  padding: 20px 8px;
  border-radius: 6px;
  transition: box-shadow 0.3s ease-in-out;
}

.search-item:hover {
  box-shadow: 0 0 0 1px var(--color-gradient-gray);
}

.search-status {
  padding: var(--spacing-16);
  text-align: center;
  color: var(--color-search-item);
}

.search-close__icon {
  width: 20px;
  height: 20px;
  color: var(--color-gradient-gray);
}
</style>
