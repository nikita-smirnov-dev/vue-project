<template>
  <form class="search">
    <BxSearch class="search__icon" />
    <input class="search__input" type="text" placeholder="Поиск" />
  </form>
</template>

<script setup lang="ts">
import { BxSearch } from '@kalimahapps/vue-icons';
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
  color: var(--color-gradient-gray);
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
</style>
