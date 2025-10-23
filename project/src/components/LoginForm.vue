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
            @blur="onEmailBlur"
            @input="onEmailInput"
            :isError="!!emailError"
          >
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="emailBlur && emailError">{{
            emailError
          }}</span>
        </FormField>
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Пароль"
            v-model="password"
            @blur="onPasswordBlur"
            @input="onPasswordInput"
            :isError="!!passwordError"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="passwordBlur && passwordError"
            >{{ passwordError }}</span
          >
        </FormField>
        <p v-if="formError" class="form-error">
          {{ formError }}
        </p>
      </div>
      <Button class="modal-form__btn">Войти</Button>
    </form>
    <Button class="modal-btn" @click="onRegisterClick">Регистрация</Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { ReKeyLine } from '@kalimahapps/vue-icons';

import Button from '@/UI/Button.vue';
import FormField from '@/UI/FormField.vue';
import FormInput from '@/UI/FormInput.vue';
import Logo from '@/UI/Logo.vue';
import { useUserStore } from '@/stores/userStore/userStore';
import { useModalStore } from '@/stores/modalStore/modalStore';
import { CreateLoginSchema } from '@/types/userTypes';
import { ref, watch } from 'vue';
import { validateField } from '@/utils/validateField';

const modalStore = useModalStore();
const router = useRouter();
const store = useUserStore();
const emit = defineEmits(['switch-form']);

const email = ref('');
const password = ref('');

const emailError = ref('');
const passwordError = ref('');

const emailBlur = ref(false);
const passwordBlur = ref(false);

const formError = ref('');

const onEmailBlur = () => {
  emailBlur.value = true;
  emailError.value = validateField(CreateLoginSchema, 'email', email.value);
};

const onPasswordBlur = () => {
  passwordBlur.value = true;
  passwordError.value = validateField(
    CreateLoginSchema,
    'password',
    password.value
  );
};

const onEmailInput = () => {
  if (emailError.value) emailError.value = '';
};

const onPasswordInput = () => {
  if (passwordError.value) passwordError.value = '';
};

watch(email, (newVal) => {
  if (emailBlur.value) {
    emailError.value = validateField(CreateLoginSchema, 'email', newVal);
  }
});

watch(password, (newVal) => {
  if (passwordBlur.value) {
    passwordError.value = validateField(CreateLoginSchema, 'password', newVal);
  }
});

const onSubmit = async () => {
  emailBlur.value = true;
  passwordBlur.value = true;

  emailError.value = validateField(CreateLoginSchema, 'email', email.value);
  passwordError.value = validateField(
    CreateLoginSchema,
    'password',
    password.value
  );

  if (emailError.value || passwordError.value) {
    return;
  }

  formError.value = '';

  try {
    await store.login(email.value, password.value);

    if (store.user) {
      modalStore.closeModal();
      router.push('/');
    }
  } catch (error: any) {
    switch (error.status) {
      case 400:
        formError.value = error.message;
        break;
      case 401:
        formError.value = error.message;
        break;
      case 500:
      default:
        formError.value = error.message;
        break;
    }
  }
};
const onRegisterClick = () => {
  emit('switch-form', 'register');
};
</script>

<style scoped>
.form-error {
  margin: 0;
  text-align: center;
  color: var(--color-error);
}
</style>
