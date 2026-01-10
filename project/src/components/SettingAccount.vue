<template>
  <div class="setting-account">
    <div class="setting-account__block">
      <div class="setting-account__content">
        <div class="setting-account__avatar">{{ getInitials() }}</div>
        <div class="setting-account__info">
          <p class="setting-account__text">Имя Фамилия</p>
          <span class="setting-account__fio">
            {{ fullName }}
          </span>
        </div>
      </div>
      <div class="setting-account__content">
        <div class="setting-account__avatar">
          <ReMailSendLine class="setting-account__avatar-icon" />
        </div>
        <div class="setting-account__info">
          <p class="setting-account__text">Электронная почта</p>
          <span class="setting-account__fio">
            {{ userStore.user?.email }}
          </span>
        </div>
      </div>
    </div>
    <Button
      class="setting-account__btn"
      variantAction="primary"
      @click="onClickLogout"
      >Выйти из аккаунта</Button
    >
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore/userStore';
import Button from '@/UI/Button.vue';
import { ReMailSendLine } from '@kalimahapps/vue-icons';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const getInitials = (): string => {
  const name = userStore.user?.name || '';
  const surname = userStore.user?.surname || '';

  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
};

const fullName = computed(() =>
  userStore.user ? `${userStore.user?.name} ${userStore.user?.surname}` : ''
);

const onClickLogout = async () => {
  await userStore.logoutUser();
  router.push('/');
};
</script>

<style scoped>
.setting-account {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 500px;
  margin-bottom: 120px;
}

.setting-account__block {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: var(--spacing-64);
}

.setting-account__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}

.setting-account__avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  border-radius: 50%;
  background-color: var(--color-gradient-gray);
  color: var(--color-white);
}

.setting-account__avatar-icon {
  width: 22px;
  height: 22px;
}

.setting-account__text {
  margin: 0;
  margin-bottom: 5px;
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-regular);
  color: var(--color-white);
}

.setting-account__fio {
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
}

.setting-account__btn {
  background-color: var(--color-blue-button);
}

@media (max-width: 576px) {
  .setting-account {
    margin-bottom: var(--spacing-40);
  }

  .setting-account__text {
    font-size: var(--font-size-14);
    color: var(--color-gradient-gray);
  }

  .setting-account__fio {
    font-size: var(--font-size-18);
  }

  .setting-account__btn {
    width: 100%;
  }
}
</style>
