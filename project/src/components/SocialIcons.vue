<template>
  <nav class="social-icons" aria-label="Социальные сети">
    <ul class="social-icons__list list-reset">
      <li class="social-icons__item">
        <a class="social-icons__link" href="#" aria-label="ВКонтакте">
          <BxVk className="social-icons__svg" />
        </a>
      </li>
      <li class="social-icons__item">
        <a class="social-icons__link" href="#" aria-label="YouTube">
          <BxYoutube className="social-icons__svg" />
        </a>
      </li>
      <li class="social-icons__item">
        <a class="social-icons__link" href="#" aria-label="Одноклассники">
          <CoBrandOdnoklassniki className="social-icons__svg" />
        </a>
      </li>
      <li class="social-icons__item">
        <a class="social-icons__link" href="#" aria-label="Телеграмм">
          <ReTelegram2Fill className="social-icons__svg" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { BxVk } from '@kalimahapps/vue-icons';
import { BxYoutube } from '@kalimahapps/vue-icons';
import { CoBrandOdnoklassniki } from '@kalimahapps/vue-icons';
import { ReTelegram2Fill } from '@kalimahapps/vue-icons';
</script>

<style scoped>
.social-icons__list {
  display: flex;
  align-items: center;
  gap: var(--spacing-24);
}

.social-icons__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-social-footer);
  border-radius: 8px;
  color: var(--color-social-footer);
}
</style>
