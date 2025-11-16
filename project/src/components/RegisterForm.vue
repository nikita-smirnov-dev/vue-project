<template>
  <div class="modal">
    <Logo class="modal-logo" :isLink="false" />
    <h3 class="modal-title">Регистрация</h3>
    <form class="modal-form" @submit.prevent="onSubmit">
      <div class="modal-form__field">
        <FormField label="Электронная почта">
          <FormInput
            class="modal-form__input"
            type="email"
            placeholder="Электронная почта"
            v-model="emailRegisterValue"
            @blur="emailRegisterField.onBlur"
            @input="emailRegisterField.onInput"
            :isError="!!emailRegisterField.error.value"
          >
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="emailRegisterField.error.value"
            >{{ emailRegisterField.error }}</span
          >
        </FormField>
        <FormField label="Имя">
          <FormInput
            class="modal-form__input"
            placeholder="Имя"
            type="text"
            v-model="nameRegisterValue"
            @blur="nameRegisterField.onBlur"
            @input="nameRegisterField.onInput"
            :isError="!!nameRegisterField.error.value"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="nameRegisterField.error.value"
            >{{ nameRegisterField.error }}</span
          >
        </FormField>
        <FormField label="Фамилия">
          <FormInput
            class="modal-form__input"
            placeholder="Фамилия"
            type="text"
            v-model="surnameRegisterValue"
            @blur="surnameRegisterField.onBlur"
            @input="surnameRegisterField.onInput"
            :isError="!!surnameRegisterField.error.value"
          >
            <ReUserLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="surnameRegisterField.error.value"
            >{{ surnameRegisterField.error }}</span
          >
        </FormField>
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            placeholder="Пароль"
            type="password"
            v-model="passwordRegisterValue"
            @blur="passwordRegisterField.onBlur"
            @input="passwordRegisterField.onInput"
            :isError="!!passwordRegisterField.error.value"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="passwordRegisterField.error.value"
            >{{ passwordRegisterField.error }}</span
          >
        </FormField>
        <FormField label="Подтвердите пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Подтвердите пароль"
            v-model="confirmPasswordRegisterValue"
            @blur="confirmPasswordRegisterField.onBlur"
            @input="confirmPasswordRegisterField.onInput"
            :isError="!!confirmPasswordRegisterField.error.value"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="confirmPasswordRegisterField.error.value"
            >{{ confirmPasswordRegisterField.error }}</span
          >
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
import { CreateRegisterSchema, type ApiError } from '@/types/userTypes';
import { useFormField } from '@/composables/useFormField';
import { useFieldValue } from '@/composables/useFieldValue';

const store = useUserStore();
const emit = defineEmits(['switch-form']);

const emailRegisterField = useFormField(CreateRegisterSchema, 'email');
const nameRegisterField = useFormField(CreateRegisterSchema, 'name');
const surnameRegisterField = useFormField(CreateRegisterSchema, 'surname');
const passwordRegisterField = useFormField(CreateRegisterSchema, 'password');
const confirmPasswordRegisterField = useFormField(
  CreateRegisterSchema,
  'confirmPassword',
  passwordRegisterField.value
);

const emailRegisterValue = useFieldValue(emailRegisterField);
const nameRegisterValue = useFieldValue(nameRegisterField);
const surnameRegisterValue = useFieldValue(surnameRegisterField);
const passwordRegisterValue = useFieldValue(passwordRegisterField);
const confirmPasswordRegisterValue = useFieldValue(
  confirmPasswordRegisterField
);

const formError = ref('');

const onSubmit = async () => {
  emailRegisterField.onBlur();
  nameRegisterField.onBlur();
  surnameRegisterField.onBlur();
  passwordRegisterField.onBlur();
  confirmPasswordRegisterField.onBlur();

  if (
    emailRegisterField.error.value ||
    nameRegisterField.error.value ||
    surnameRegisterField.error.value ||
    passwordRegisterField.error.value ||
    confirmPasswordRegisterField.error.value
  ) {
    return;
  }

  formError.value = '';
  store.error = null;

  try {
    await store.register(
      nameRegisterValue.value,
      surnameRegisterValue.value,
      emailRegisterValue.value,
      passwordRegisterValue.value
    );
    if (!store.error) {
      emit('switch-form', 'success');
    }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null) {
      const err = error as ApiError;

      switch (err.status) {
        case 400:
          formError.value = err.message;
          break;
        case 401:
          formError.value = err.message;
          break;
        case 409:
          formError.value = err.message;
          break;
        case 500:
        default:
          formError.value = err.message || 'Ошибка регистрации';
          break;
      }
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
