<template>
  <div class="modal">
    <Logo class="modal-logo" />
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
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Пароль"
            v-model="password"
          >
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { ReKeyLine } from '@kalimahapps/vue-icons';

import Button from '@/UI/Button.vue';
import FormField from '@/UI/FormField.vue';
import FormInput from '@/UI/FormInput.vue';
import Logo from '@/UI/Logo.vue';
import { useUserStore } from '@/stores/userStore/userStore';
import { useModalStore } from '@/stores/modalStore/modalStore';

const modalStore = useModalStore();
const router = useRouter();
const store = useUserStore();
const email = ref('');
const password = ref('');
const emit = defineEmits(['switch-form']);

const onSubmit = async () => {
  await store.login(email.value, password.value);
  if (store.user) {
    modalStore.closeModal();
    router.push('/');
  }
};

const onRegisterClick = () => {
  emit('switch-form', 'register');
};
</script>

<style scoped></style>
