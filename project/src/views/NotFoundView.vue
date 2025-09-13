<template>
  <main>
    <section>
      <div class="not-found__content">
        <h1 class="not-found__title section-title">404</h1>
        <h2 class="not-found__subtitle">Страница не найдена</h2>
        <p class="not-found__text base-text">
          К сожалению, запрашиваемая страница не существует или была удалена.
        </p>
      </div>
    </section>
  </main>
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
  background-color: var(--color-blue-button);
}
</style>
