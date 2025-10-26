import { validateField } from '@/utils/validateField';
import { ref, watch, type Ref } from 'vue';
import type { ZodObject, ZodRawShape } from 'zod';

export function useFormField<T extends ZodObject<ZodRawShape>>(
  schema: T,
  field: keyof T['shape'] & string,
  compareValue?: Ref<string>
) {
  const value = ref('');
  const error = ref('');
  const isTouched = ref(false);

  const onBlur = () => {
    isTouched.value = true;
    error.value = validateField(schema, field, value.value);

    if (!error.value && compareValue && value.value !== compareValue.value) {
      error.value = 'Пароли не совпадают';
    }
  };

  const onInput = () => {
    if (error.value) error.value = '';
  };

  const onValidate = () => {
    error.value = validateField(schema, field, value.value);
    return !error.value;
  };

  watch(value, (newVal) => {
    if (isTouched.value) {
      error.value = validateField(schema, field, newVal);
    }
  });

  return {
    value,
    error,
    isTouched,
    onBlur,
    onInput,
    onValidate,
  };
}
