<template>
  <div class="auth">
    <div v-if="form === 'login'"><LoginForm @switch-form="formSwitch" /></div>
    <div v-else-if="form === 'register'">
      <RegisterForm @switch-form="formSwitch" />
    </div>
    <div v-else="form === 'success'"><RegisterSuccess /></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import RegisterSuccess from './RegisterSuccess.vue';

const form = ref<'login' | 'register' | 'success'>('login');

const formSwitch = (newForm: 'login' | 'register' | 'success') => {
  form.value = newForm;
};
</script>

<style scoped>
.auth {
  padding: var(--spacing-64) var(--spacing-40);
  background-color: var(--color-white);
  border-radius: 24px;
}
</style>
