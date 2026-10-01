import { encodeId, patchJson, request } from "./client"
import type { Address, Product } from "../types"
export const buyerApi = {
  profile: () => request("/buyer/profile"),
  addresses: () => request<Address[]>("/buyer/addresses"),
  addAddress: (body: Partial<Address>) => request<Address>("/buyer/addresses", { method: "POST", body: JSON.stringify(body) }),
  updateAddress: (id: string, body: Partial<Address>) => request<Address>(`/buyer/addresses/${encodeId(id)}`, patchJson(body)),
  deleteAddress: (id: string) => request<void>(`/buyer/addresses/${encodeId(id)}`, { method: "DELETE" }),
  setDefaultAddress: (id: string) => request<void>(`/buyer/addresses/${encodeId(id)}/default`, { method: "PATCH" }),
  paymentMethods: () => request("/buyer/payment-methods"),
  preferences: () => request("/buyer/preferences"),
  favorites: () => request<Product[]>("/favorites/products"),
  followedStores: () => request<string[]>("/favorites/stores"),
  favoriteProduct: (id: string) => request<void>(`/favorites/products/${encodeId(id)}`, { method: "POST" }),
  unfavoriteProduct: (id: string) => request<void>(`/favorites/products/${encodeId(id)}`, { method: "DELETE" }),
  followStore: (id: string) => request<void>(`/favorites/stores/${encodeId(id)}`, { method: "POST" }),
  unfollowStore: (id: string) => request<void>(`/favorites/stores/${encodeId(id)}`, { method: "DELETE" }),
}
export default buyerApi
