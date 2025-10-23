import { ZodError, ZodObject } from 'zod';

export function validateField(
  schema: ZodObject<any>,
  field: string,
  value: unknown
): string {
  try {
    schema.pick({ [field]: true }).parse({ [field]: value });
    return '';
  } catch (err) {
    if (err instanceof ZodError) {
      return err.issues[0]?.message ?? 'Ошибка';
    }
    return 'Ошибка';
  }
}
