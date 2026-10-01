import { encodeId, request } from './client';
import type {
  Cart,
  NotificationPage,
  SecuritySettings,
  Session,
  User,
} from '../types';
export const accountApi = {
  profile: () => request<User>('/account/profile'),
  updateProfile: (body: Partial<User>) =>
    request('/account/profile', {
      method: 'PATCH',
      data: body,
    }),
  security: () => request<SecuritySettings>('/account/security'),
  sessions: () => request<Session[]>('/account/sessions'),
  notifications: (page = 1, limit = 20) =>
    request<NotificationPage>(
      `/account/notifications?page=${page}&limit=${limit}`,
    ),
  markNotificationRead: (id: string) =>
    request(`/account/notifications/${encodeId(id)}/read`, {
      method: 'PATCH',
    }),
  markAllNotificationsRead: () =>
    request('/account/notifications/read-all', { method: 'POST' }),
  deleteNotification: (id: string) =>
    request(`/account/notifications/${encodeId(id)}`, {
      method: 'DELETE',
    }),
};
export const cartApi = {
  get: () => request<Cart>('/cart'),
  addItem: (body: { productId: string; qty: number }) =>
    request<Cart>('/cart/items', {
      method: 'POST',
      data: body,
    }),
  updateItem: (id: string, body: { qty: number }) =>
    request<Cart>(`/cart/items/${encodeId(id)}`, {
      method: 'PATCH',
      data: body,
    }),
  removeItem: (id: string) =>
    request<Cart>(`/cart/items/${encodeId(id)}`, { method: 'DELETE' }),
  clear: () => request('/cart', { method: 'DELETE' }),
};
export default accountApi;
