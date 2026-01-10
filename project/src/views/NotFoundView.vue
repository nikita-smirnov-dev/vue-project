<template>
  <section>
    <div class="not-found__content">
      <h1 class="not-found__title section-title">404</h1>
      <h2 class="not-found__subtitle">Страница не найдена</h2>
      <p class="not-found__text base-text">
        К сожалению, запрашиваемая страница не существует или была удалена.
      </p>
      <router-link to="/" class="not-found__btn">
        Вернуться на главную
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found__content {
  height: 500px;
  padding: var(--spacing-30) 0;
}

.not-found__title,
.not-found__subtitle {
  margin: 0;
  margin-bottom: 20px;
}

.not-found__subtitle {
  color: var(--color-white);
}

.not-found__text {
  margin: 0;
  margin-bottom: 50px;
}

.not-found__btn {
  padding: var(--spacing-16) var(--spacing-48);
  border-radius: 28px;
  font-weight: 700;
  font-size: var(--font-size-18);
  line-height: 1.3;
  color: var(--color-white);
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  background-color: var(--color-blue-button);
}

.not-found__btn:hover {
  background-color: var(--color-hover-primary);
}

.not-found__btn:active {
  background-color: var(--color-active-primary);
}
</style>
