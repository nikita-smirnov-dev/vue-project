<template>
  <div
    class="modal-overlay"
    :class="{ 'modal-overlay--trailer': modalType === 'trailer' }"
  >
    <div class="modal-content">
      <slot />
      <button class="modal-close btn-reset">
        <MdClose class="modal-close__icon" @click="$emit('close')" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MdClose } from '@kalimahapps/vue-icons';

const props = defineProps<{
  modalType?: string | null;
}>();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  inset: 0;
  background-color: var(--color-modal);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
}

.modal-content {
  position: relative;
}

.modal-close.btn-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: -75px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: var(--color-white);
}

.modal-close__icon {
  width: 30px;
  height: 30px;
  color: var(--color-black);
}

@media (max-width: 812px) and (orientation: landscape) {
  .modal-close.btn-reset {
    top: 15px;
    right: 15px;
    z-index: 1000;
  }
}

@media (max-width: 576px) {
  .modal-overlay--trailer {
    background-color: var(--color-black);
  }

  .modal-close.btn-reset {
    width: 32px;
    height: 32px;
    top: 7px;
    right: 7px;
    z-index: 1000;
  }
}
</style>
