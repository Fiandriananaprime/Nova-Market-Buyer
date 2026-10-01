import { encodeId, patchJson, request } from './client';
import type {
  Address,
  BuyerPreferences,
  BuyerProfile,
  FavoriteToggleResponse,
  PaymentMethod,
  Product,
  Store,
} from '../types';
export const buyerApi = {
  profile: () => request<BuyerProfile>('/buyer/profile'),
  addresses: () => request<Address[]>('/buyer/addresses'),
  addAddress: (body: Partial<Address>) =>
    request<Address>('/buyer/addresses', {
      method: 'POST',
      data: body,
    }),
  updateAddress: (id: string, body: Partial<Address>) =>
    request<Address>(`/buyer/addresses/${encodeId(id)}`, patchJson(body)),
  deleteAddress: (id: string) =>
    request(`/buyer/addresses/${encodeId(id)}`, { method: 'DELETE' }),
  setDefaultAddress: (id: string) =>
    request(`/buyer/addresses/${encodeId(id)}/default`, {
      method: 'PATCH',
    }),
  paymentMethods: () => request<PaymentMethod[]>('/buyer/payment-methods'),
  preferences: () => request<BuyerPreferences>('/buyer/preferences'),
  favorites: () => request<Product[]>('/favorites/products'),
  followedStores: () => request<Store[]>('/favorites/stores'),
  favoriteProduct: (id: string) =>
    request<FavoriteToggleResponse>(
      `/favorites/products/${encodeId(id)}`,
      { method: 'POST' },
    ),
  unfavoriteProduct: (id: string) =>
    request<FavoriteToggleResponse>(
      `/favorites/products/${encodeId(id)}`,
      { method: 'DELETE' },
    ),
  followStore: (id: string) =>
    request(`/stores/${encodeId(id)}/follow`, { method: 'POST' }),
  unfollowStore: (id: string) =>
    request(`/stores/${encodeId(id)}/follow`, { method: 'DELETE' }),
};
export default buyerApi;
