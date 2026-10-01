import { encodeId, queryString, request } from "./client"
export const catalogApi = {
  categories: () => request("/categories"),
  products: (query: Record<string, string | number | boolean | undefined> = {}) => request(`/products${queryString(query)}`),
  featuredProducts: () => request("/products/featured"),
  product: (id: string) => request(`/products/${encodeId(id)}`),
  stores: (query: Record<string, string | number | boolean | undefined> = {}) => request(`/stores${queryString(query)}`),
  featuredStores: () => request("/stores/featured"),
  store: (id: string) => request(`/stores/${encodeId(id)}`),
}
export default catalogApi
