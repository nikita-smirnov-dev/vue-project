<template>
  <div class="modal">
    <Logo class="modal-logo" :isLink="false" />
    <h3 class="modal-title">Регистрация завершена</h3>
    <p class="modal-text">Используйте вашу электронную почту для входа</p>
    <Button
      class="modal-form__btn"
      @click="onSuccessClick"
      variantAction="primary"
      >Войти</Button
    >
  </div>
</template>

<script setup lang="ts">
import Logo from '@/UI/Logo.vue';
import Button from '@/UI/Button.vue';

const emit = defineEmits(['switch-form']);

const onSuccessClick = () => {
  emit('switch-form', 'login');
};
</script>

<style scoped></style>
