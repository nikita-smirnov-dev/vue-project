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
            @blur="onEmailBlur"
            @input="onEmailInput"
            :isError="!!emailError"
          >
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="emailError">{{
            emailError
          }}</span>
        </FormField>
        <FormField label="Имя">
          <FormInput
            class="modal-form__input"
            placeholder="Имя"
            type="text"
            v-model="name"
            @blur="onNameBlur"
            @input="onNameInput"
            :isError="!!nameError"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="nameError">{{
            nameError
          }}</span>
        </FormField>
        <FormField label="Фамилия">
          <FormInput
            class="modal-form__input"
            placeholder="Фамилия"
            type="text"
            v-model="surname"
            @blur="onSurnameBlur"
            @input="onSurnameInput"
            :isError="!!surnameError"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="surnameError">{{
            surnameError
          }}</span>
        </FormField>
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            placeholder="Пароль"
            type="password"
            v-model="password"
            @blur="onPasswordBlur"
            @input="onPasswordInput"
            :isError="!!passwordError"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="passwordError">{{
            passwordError
          }}</span>
        </FormField>
        <FormField label="Подтвердите пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Подтвердите пароль"
            v-model="confirmPassword"
            @blur="onConfirmPasswordBlur"
            @input="onConfirmPasswordInput"
            :isError="!!confirmPasswordError"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span class="modal__form-error" v-if="confirmPasswordError">{{
            confirmPasswordError
          }}</span>
        </FormField>
        <p v-if="formError" class="form-error">
          {{ formError }}
        </p>
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
import { validateField } from '@/utils/validateField';
import { BaseRegisterSchema } from '@/types/userTypes';

const store = useUserStore();
const emit = defineEmits(['switch-form']);

const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const nameError = ref('');
const surnameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const nameBlur = ref(false);
const surnameBlur = ref(false);
const emailBlur = ref(false);
const passwordBlur = ref(false);
const confirmPasswordBlur = ref(false);

const formError = ref('');

const onNameBlur = () => {
  nameBlur.value = true;
  nameError.value = validateField(BaseRegisterSchema, 'name', name.value);
};
const onSurnameBlur = () => {
  surnameBlur.value = true;
  surnameError.value = validateField(
    BaseRegisterSchema,
    'surname',
    surname.value
  );
};
const onEmailBlur = () => {
  emailBlur.value = true;
  emailError.value = validateField(BaseRegisterSchema, 'email', email.value);
};

const onPasswordBlur = () => {
  passwordBlur.value = true;
  passwordError.value = validateField(
    BaseRegisterSchema,
    'password',
    password.value
  );
};

const onConfirmPasswordBlur = () => {
  confirmPasswordBlur.value = true;
  confirmPasswordError.value = validateField(
    BaseRegisterSchema,
    'confirmPassword',
    confirmPassword.value
  );
  if (!confirmPasswordError.value && password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Пароли не совпадают';
  }
};

const onNameInput = () => {
  if (nameError.value) nameError.value = '';
};

const onSurnameInput = () => {
  if (surnameError.value) surnameError.value = '';
};

const onEmailInput = () => {
  if (emailError.value) emailError.value = '';
};

const onPasswordInput = () => {
  if (passwordError.value) passwordError.value = '';
};
const onConfirmPasswordInput = () => {
  if (confirmPasswordError.value) confirmPasswordError.value = '';
};

const onSubmit = async () => {
  nameBlur.value = true;
  surnameBlur.value = true;
  emailBlur.value = true;
  passwordBlur.value = true;
  confirmPasswordBlur.value = true;

  nameError.value = validateField(BaseRegisterSchema, 'name', name.value);
  surnameError.value = validateField(
    BaseRegisterSchema,
    'surname',
    surname.value
  );
  emailError.value = validateField(BaseRegisterSchema, 'email', email.value);
  passwordError.value = validateField(
    BaseRegisterSchema,
    'password',
    password.value
  );
  confirmPasswordError.value = validateField(
    BaseRegisterSchema,
    'confirmPassword',
    confirmPassword.value
  );

  if (
    nameError.value ||
    surnameError.value ||
    emailError.value ||
    passwordError.value ||
    confirmPasswordError.value
  ) {
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
  } catch (error: any) {
    switch (error.status) {
      case 400:
        formError.value = error.message;
        break;
      case 401:
        formError.value = error.message;
        break;
      case 409:
        formError.value = error.message;
        break;
      case 500:
      default:
        formError.value = error.message || 'Ошибка регистрации';
        break;
    }
  }
};

const onLoginClick = () => {
  emit('switch-form', 'login');
};
</script>

<style scoped>
.form-error {
  margin: 0;
  text-align: center;
  color: var(--color-error);
}
</style>
