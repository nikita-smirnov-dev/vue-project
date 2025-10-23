import { API_BASE_URL, endpointsUser } from './config';
import { UserSchema, type User } from '@/types/userTypes';

async function validateResponse(response: Response) {
  if (response.ok) return response;

  let message = 'Произошла ошибка запроса';

  try {
    const data = await response.json();
    message = data.message || message;
  } catch {
    const text = await response.text();
    message = text || message;
  }

  if (response.status === 400) {
    message = 'Неверный email или пароль';
  } else if (response.status === 401) {
    message = 'Необходима авторизация';
  } else if (response.status === 409) {
    message = 'Пользователь с таким email уже существует';
  } else if (response.status >= 500) {
    message = 'Ошибка сервера, попробуйте позже';
  }

  throw { status: response.status, message };
}

export const registerUser = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_BASE_URL}${endpointsUser.user}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, surname, email, password }),
  });
  await validateResponse(response);
  const data = await response.json();
  return data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}${endpointsUser.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  await validateResponse(response);
  const data = await response.json();
  return data;
};

export const fetchMe = (): Promise<User> => {
  return fetch(`${API_BASE_URL}${endpointsUser.profile}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    await validateResponse(response);

    const data = await response.json();
    return UserSchema.parse(data);
  });
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}${endpointsUser.logout}`, {
    credentials: 'include',
    method: 'GET',
  });
  await validateResponse(response);
};
