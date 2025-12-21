<template>
  <footer v-if="isMobile">
    <div class="container footer__container">
      <SocialIcons />
    </div>
  </footer>
  <footer v-else :class="isAccountPage ? 'footer' : ''">
    <div class="container footer__container">
      <SocialIcons />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SocialIcons from './SocialIcons.vue';
import { useRoute } from 'vue-router';
import { BREAKPOINTS, useMediaQuery } from '@/composables/useMediaQuery';

const route = useRoute();
const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

const isAccountPage = computed(() => {
  return (
    route.path.startsWith('/account') || route.path.startsWith('/account/')
  );
});
</script>

<style scoped>
.footer__container {
  display: flex;
  align-items: center;
  justify-content: right;
  padding-top: var(--spacing-40);
  padding-bottom: var(--spacing-40);
}

.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, #4c3f79 0%, rgba(58, 59, 107, 0.7) 100%),
    linear-gradient(180deg, rgba(15, 54, 128, 0.7) 0%, rgb(50, 64, 88) 0%);
  z-index: 10;
}

@media (max-width: 768px) {
  .footer {
    position: static;
    height: calc(120px - 48px);
    width: 100%;
    background: none;
    box-shadow: none;
    z-index: 0;
  }

  .footer__container.container {
    justify-content: left;
    padding: var(--spacing-24) var(--spacing-40);
  }
}

@media (max-width: 576px) {
  .footer__container.container {
    padding: var(--spacing-24) var(--spacing-20);
  }
}
</style>
