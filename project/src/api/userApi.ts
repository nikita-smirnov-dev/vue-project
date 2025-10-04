import { API_BASE_URL, endpointsUser } from './config';
import { UserSchema, type User } from '@/types/userTypes';

async function validateResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
}

export const registerUser = (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  return fetch(`${API_BASE_URL}${endpointsUser.user}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, surname, email, password }),
  }).then(async (response) => {
    if (response.status === 409) {
      throw new Error('Пользователь с таким email уже существует');
    }
    await validateResponse(response);

    const data = await response.json();
    return data;
  });
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return fetch(`${API_BASE_URL}${endpointsUser.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    await validateResponse(response);
    const data = await response.json();
    return data;
  });
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

export const logout = (): Promise<void> => {
  return fetch(`${API_BASE_URL}${endpointsUser.logout}`, {
    credentials: 'include',
    method: 'GET',
  }).then(() => undefined);
};
