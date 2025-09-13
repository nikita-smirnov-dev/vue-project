<template>
  <img :src="logoToUse" alt="Логотип VK Маруся" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import logo from '../assets/images/logo/logo.svg';
import logoDark from '../assets/images/logo/logo-dark.svg';

const props = defineProps<{
  color?: string;
}>();

const logoToUse = computed(() => {
  return props.color === 'white' ? logo : logoDark;
});
</script>

<style scoped></style>
