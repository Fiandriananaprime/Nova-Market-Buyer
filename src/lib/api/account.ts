import { encodeId, request } from './client';
import type { Cart, Notification } from '../types';
export const accountApi = {
  profile: () => request('/account/profile'),
  updateProfile: (body: unknown) =>
    request('/account/profile', {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  security: () => request('/account/security'),
  sessions: () => request('/account/sessions'),
  notifications: (page = 1, limit = 20) =>
    request<{ data: Notification[] }>(
      `/account/notifications?page=${page}&limit=${limit}`,
    ),
  markNotificationRead: (id: string) =>
    request<void>(`/account/notifications/${encodeId(id)}/read`, {
      method: 'PATCH',
    }),
  markAllNotificationsRead: () =>
    request<void>('/account/notifications/read-all', { method: 'POST' }),
  deleteNotification: (id: string) =>
    request<void>(`/account/notifications/${encodeId(id)}`, {
      method: 'DELETE',
    }),
};
export const cartApi = {
  get: () => request<Cart>('/cart'),
  addItem: (body: { productId: string; qty: number }) =>
    request<Cart>('/cart/items', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  updateItem: (id: string, body: { qty: number }) =>
    request<Cart>(`/cart/items/${encodeId(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  removeItem: (id: string) =>
    request<Cart>(`/cart/items/${encodeId(id)}`, { method: 'DELETE' }),
  clear: () => request<void>('/cart', { method: 'DELETE' }),
};
export default accountApi;
