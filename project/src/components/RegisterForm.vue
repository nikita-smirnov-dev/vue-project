<template>
  <div class="modal">
    <Logo class="modal-logo" />
    <h3 class="modal-title">Регистрация</h3>
    <form class="modal-form" @submit.prevent="onSubmit">
      <div class="modal-form__field">
        <FormField label="Электронная почта">
          <FormInput
            class="modal-form__input"
            type="email"
            placeholder="Электронная почта"
            v-model="email"
          >
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Имя">
          <FormInput
            class="modal-form__input"
            placeholder="Имя"
            type="text"
            v-model="name"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Фамилия">
          <FormInput
            class="modal-form__input"
            placeholder="Фамилия"
            type="text"
            v-model="surname"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            placeholder="Пароль"
            type="password"
            v-model="password"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
        </FormField>
        <FormField label="Подтвердите пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Подтвердите пароль"
            v-model="confirmPassword"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
        </FormField>
      </div>
      <Button class="modal-form__btn" type="submit">Создать аккаунт</Button>
    </form>
    <Button class="modal-btn" @click="onLoginClick">У меня есть пароль</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { ReKeyLine } from '@kalimahapps/vue-icons';
import { ReUserLine } from '@kalimahapps/vue-icons';

import Logo from '@/UI/Logo.vue';
import Button from '@/UI/Button.vue';
import FormField from '@/UI/FormField.vue';
import FormInput from '@/UI/FormInput.vue';
import { useUserStore } from '@/stores/userStore/userStore';

const store = useUserStore();
const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const emit = defineEmits(['switch-form']);

const onSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    console.error('Пароли не совпадают');
    return;
  }

  try {
    await store.register(
      name.value,
      surname.value,
      email.value,
      password.value
    );
    if (!store.error) {
      emit('switch-form', 'success');
    }
  } catch (err) {
    console.error('Ошибка при регистрации:', store.error);
  }
};

const onLoginClick = () => {
  emit('switch-form', 'login');
};
</script>

<style scoped></style>
