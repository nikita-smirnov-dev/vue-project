import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

export const CreateLoginSchema = z.object({
  email: z
    .string()
    .nonempty('Email обязателен')
    .email('Email должен содержать корректный формат электронной почты'),
  password: z
    .string()
    .nonempty('Пароль обязателен')
    .min(8, 'Длинна пароля должна быть не менее 8 символов'),
});

export const CreateRegisterSchema = z.object({
  name: z
    .string()
    .nonempty('Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(
      /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
      'Имя может содержать только буквы, пробел и дефис'
    ),
  surname: z
    .string()
    .nonempty('Фамилия обязательна')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия не должна превышать 50 символов')
    .regex(
      /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
      'Фамилия может содержать только буквы, пробел и дефис'
    ),
  email: z
    .string()
    .nonempty('Email обязателен')
    .email('Email должен содержать корректный формат электронной почты'),
  password: z
    .string()
    .nonempty('Пароль обязателен')
    .min(8, 'Длинна пароля должна быть не менее 8 символов'),
  confirmPassword: z.string().nonempty('Подтверждение пароля обязательно'),
});

export type LoginForm = z.infer<typeof CreateLoginSchema>;
export type RegisterForm = z.infer<typeof CreateRegisterSchema>;
// export const CreateRegisterSchema = BaseRegisterSchema.refine(
//   (data) => data.password === data.confirmPassword,
//   {
//     message: 'Пароли не совпадают',
//     path: ['confirmPassword'],
//   }
// );

export type ApiError = { status: number; message: string };
