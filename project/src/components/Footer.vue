<template>
  <footer class="footer">
    <div class="footer__container">
      <SocialIcons />
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialIcons from './SocialIcons.vue';
</script>

<style scoped>
.footer__container {
  display: flex;
  align-items: center;
  justify-content: right;
  padding-top: var(--spacing-40);
  padding-bottom: var(--spacing-40);
}
</style>
