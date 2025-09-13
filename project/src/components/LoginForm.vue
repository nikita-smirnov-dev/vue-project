<template>
  <div class="modal">
    <Logo class="modal-logo" />
    <form class="modal-form">
      <div class="modal-form__field">
        <FormField label="Электронная почта">
          <FormInput class="modal-form__input" placeholder="Электронная почта">
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Пароль">
          <FormInput class="modal-form__input" placeholder="Пароль">
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
        </FormField>
      </div>
      <Button class="modal-form__btn">Войти</Button>
    </form>
    <Button class="modal-btn" @click="onRegisterClick">Регистрация</Button>
  </div>
</template>

<script setup lang="ts">
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { ReKeyLine } from '@kalimahapps/vue-icons';

import Button from '@/UI/Button.vue';
import FormField from '@/UI/FormField.vue';
import FormInput from '@/UI/FormInput.vue';
import Logo from '@/UI/Logo.vue';

const emit = defineEmits(['switch-form']);

const onRegisterClick = () => {
  emit('switch-form', 'register');
};
</script>

<style scoped></style>
