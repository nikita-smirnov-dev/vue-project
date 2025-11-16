<template>
  <template v-if="isLink">
    <router-link to="/">
      <img :src="logoToUse" alt="Логотип VK Маруся" />
    </router-link>
  </template>
  <template v-else>
    <img :src="logoToUse" alt="Логотип VK Маруся" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import logo from '../assets/images/logo/logo.svg';
import logoDark from '../assets/images/logo/logo-dark.svg';

const props = defineProps<{
  color?: string;
  isLink?: boolean;
}>();

const logoToUse = computed(() => {
  return props.color === 'white' ? logo : logoDark;
});
</script>

<style scoped></style>
