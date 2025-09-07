<template>
  <button class="btn-reset btn-login base-text">Войти</button>
</template>

<script setup lang="ts"></script>

<style scoped>
.btn-login {
  width: 69px;
  padding: var(--spacing-8) 0;
  transition: color 0.3s ease-in-out;
}

.btn-login:hover {
  color: var(--color-active-accent);
}
</style>
