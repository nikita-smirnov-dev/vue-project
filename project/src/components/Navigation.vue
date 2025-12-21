<template>
  <nav class="nav">
    <ul class="nav-list list-reset">
      <li class="nav-list__item">
        <MenuElement class="nav-list__link" path="/home">Главная</MenuElement>
      </li>
      <li>
        <MenuElement class="nav-list__link" path="/genres">Жанры</MenuElement>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import MenuElement from '@/UI/MenuElement.vue';
</script>

<style scoped>
.nav {
  margin-right: var(--spacing-40);
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--spacing-40);
}

@media (max-width: 992px) {
  .nav {
    margin-right: var(--spacing-30);
  }

  .nav-list {
    gap: var(--spacing-30);
  }
}

@media (max-width: 576px) {
  .nav {
    display: none;
  }
}
</style>
