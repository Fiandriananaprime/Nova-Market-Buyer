import { encodeId, queryString, request } from './client';
import type { Category, Product, Review, Store } from '../types';

type Page<T> = { data: T[]; meta?: { nextCursor?: string; hasMore?: boolean } };
const unwrap = <T>(value: T[] | Page<T>) =>
  Array.isArray(value) ? value : value.data;
export const catalogApi = {
  categories: () => request<Category[]>('/categories'),
  products: (
    query: Record<string, string | number | boolean | undefined> = {},
  ) => request<Page<Product>>(`/products${queryString(query)}`),
  featuredProducts: () => request<Product[]>('/products/featured'),
  product: (id: string) => request<Product>(`/products/${encodeId(id)}`),
  relatedProducts: (id: string, limit = 4) =>
    request<Page<Product>>(`/products/${encodeId(id)}/related?limit=${limit}`),
  productReviews: (
    id: string,
    query: Record<string, string | number | undefined> = {},
  ) =>
    request<Page<Review>>(
      `/products/${encodeId(id)}/reviews${queryString(query)}`,
    ),
  stores: (query: Record<string, string | number | boolean | undefined> = {}) =>
    request<Page<Store>>(`/stores${queryString(query)}`),
  featuredStores: () => request<Store[]>('/stores/featured'),
  store: (id: string) => request<Store>(`/stores/${encodeId(id)}`),
  storeProducts: (id: string, limit = 20) =>
    request<Page<Product>>(`/stores/${encodeId(id)}/products?limit=${limit}`),
  storeReviews: (
    id: string,
    query: Record<string, string | number | undefined> = {},
  ) =>
    request<Page<Review>>(
      `/stores/${encodeId(id)}/reviews${queryString(query)}`,
    ),
  followStore: (id: string) =>
    request(`/stores/${encodeId(id)}/follow`, { method: 'POST' }),
  unfollowStore: (id: string) =>
    request(`/stores/${encodeId(id)}/follow`, { method: 'DELETE' }),
};
export { unwrap };
export default catalogApi;
