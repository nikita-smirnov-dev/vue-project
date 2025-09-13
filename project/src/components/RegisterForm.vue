<template>
  <div class="modal">
    <Logo class="modal-logo" />
    <h3 class="modal-title">Регистрация</h3>
    <form class="modal-form">
      <div class="modal-form__field">
        <FormField label="Электронная почта">
          <FormInput class="modal-form__input" placeholder="Электронная почта">
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Имя">
          <FormInput class="modal-form__input" placeholder="Имя">
            <ReUserLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Фамилия">
          <FormInput class="modal-form__input" placeholder="Фамилия">
            <ReUserLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Пароль">
          <FormInput class="modal-form__input" placeholder="Пароль">
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Подтвердите пароль">
          <FormInput class="modal-form__input" placeholder="Подтвердите пароль">
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
        </FormField>
      </div>
      <Button class="modal-form__btn">Войти</Button>
    </form>
    <Button class="modal-btn" @click="onLoginClick">У меня есть пароль</Button>
  </div>
</template>

<script setup lang="ts">
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { ReKeyLine } from '@kalimahapps/vue-icons';
import { ReUserLine } from '@kalimahapps/vue-icons';

import Logo from '@/UI/Logo.vue';
import Button from '@/UI/Button.vue';
import FormField from '@/UI/FormField.vue';
import FormInput from '@/UI/FormInput.vue';

const emit = defineEmits(['switch-form']);

const onLoginClick = () => {
  emit('switch-form', 'login');
  console.log('click');
};
</script>

<style scoped></style>
