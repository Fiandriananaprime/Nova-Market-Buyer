import { request } from './client';
import type { AuthMe, AuthRefreshResponse, User } from '../types';
export const authApi = {
  register: (body: {
    firstName: string;
    lastName: string;
    password: string;
    email?: string;
    phone?: string;
  }) =>
    request<User>('/auth/register', { method: 'POST', data: body }),
  login: (body: { email: string; password: string; remember?: boolean }) =>
    request<User>('/auth/login', { method: 'POST', data: body }),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
  refresh: () => request<AuthRefreshResponse>('/auth/refresh', { method: 'POST' }),
  forgotPassword: (identifier: string) =>
    request('/auth/forgot-password', {
      method: 'POST',
      data: { identifier },
    }),
  verifyEmail: (code: string) =>
    request('/auth/email/verify', {
      method: 'POST',
      data: { code },
    }),
  verifyPhone: (code: string) =>
    request('/auth/phone/verify', {
      method: 'POST',
      data: { code },
    }),
  me: () => request<AuthMe>('/auth/me'),
};
export default authApi;
