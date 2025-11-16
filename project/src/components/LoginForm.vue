<template>
  <div class="modal">
    <Logo class="modal-logo" :isLink="false" />
    <form class="modal-form" @submit.prevent="onSubmit">
      <div class="modal-form__field">
        <FormField label="Электронная почта">
          <FormInput
            class="modal-form__input"
            type="email"
            placeholder="Электронная почта"
            v-model="emailLoginValue"
            @blur="emailLoginField.onBlur"
            @input="emailLoginField.onInput"
            :isError="!!emailLoginField.error.value"
          >
            <ReMailSendLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="emailLoginField.isTouched && emailLoginField.error.value"
            >{{ emailLoginField.error }}</span
          >
        </FormField>
        <FormField label="Пароль">
          <FormInput
            class="modal-form__input"
            type="password"
            placeholder="Пароль"
            v-model="passwordLoginValue"
            @blur="passwordLoginField.onBlur"
            @input="passwordLoginField.onInput"
            :isError="!!passwordLoginField.error.value"
          >
            <ReKeyLine class="modal__form-icon" />
          </FormInput>
          <span
            class="modal__form-error"
            v-if="
              passwordLoginField.isTouched && passwordLoginField.error.value
            "
            >{{ passwordLoginField.error }}</span
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
import { CreateLoginSchema, type ApiError } from '@/types/userTypes';
import { useFormField } from '@/composables/useFormField';
import { useFieldValue } from '@/composables/useFieldValue';

const modalStore = useModalStore();
const router = useRouter();
const store = useUserStore();
const emit = defineEmits(['switch-form']);

const emailLoginField = useFormField(CreateLoginSchema, 'email');
const passwordLoginField = useFormField(CreateLoginSchema, 'password');

const emailLoginValue = useFieldValue(emailLoginField);
const passwordLoginValue = useFieldValue(passwordLoginField);

const formError = ref('');

const onSubmit = async () => {
  emailLoginField.onBlur();
  passwordLoginField.onBlur();

  if (emailLoginField.error.value || passwordLoginField.error.value) {
    return;
  }

  formError.value = '';

  try {
    await store.login(emailLoginValue.value, passwordLoginValue.value);

    if (store.user) {
      modalStore.closeModal();
      router.push('/');
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
        case 500:
        default:
          formError.value = err.message;
          break;
      }
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
