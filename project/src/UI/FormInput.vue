<template>
  <div class="input-form">
    <slot />
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string;
  type?: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.input-form {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  padding: var(--spacing-12) var(--spacing-16);
  border: 1px solid var(--color-modal-form);
  background-color: var(--color-white);
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.input {
  outline: none;
  border: none;
  background-color: var(--color-white);
}

.input::placeholder {
  font-weight: 400;
  font-size: var(--font-size-18);
  line-height: 1.33333;
}
</style>
