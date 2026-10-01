import { request } from './client';
import type { Order } from '../types';
export const checkoutApi = {
  createOrder: (body: unknown) =>
    request<Order[]>('/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  orders: () => request<{ data: Order[] }>('/orders'),
  order: (id: string) => request<Order>(`/orders/${encodeURIComponent(id)}`),
  cancelOrder: (id: string) =>
    request<Order>(`/orders/${encodeURIComponent(id)}/cancel`, {
      method: 'POST',
    }),
};
export default checkoutApi;
