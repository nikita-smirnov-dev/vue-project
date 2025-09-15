<template>
  <div className="data-loader-wrapper">
    <div className="loader small"></div>
    <p>Загрузка данных...</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.data-loader-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: var(--spacing-20);
  color: var(--color-white);
}

.loader.small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 20px solid rgba(255, 255, 255, 0.1);
  border-top: 20px solid #6366f1;
  border-right: 20px solid #8b5cf6;
  animation: rotate 1s linear infinite;
  border-width: 3px;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
