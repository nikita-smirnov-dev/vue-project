import { computed, type Ref, type WritableComputedRef } from 'vue';

export function useFieldValue<T>(field: {
  value: Ref<T>;
}): WritableComputedRef<T> {
  return computed({
    get: () => field.value.value,
    set: (val: T) => (field.value.value = val),
  });
}
