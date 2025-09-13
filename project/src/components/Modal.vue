<template>
  <div class="modal-overlay">
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
</style>
