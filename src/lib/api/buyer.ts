import { encodeId, patchJson, request } from "./client"
export const buyerApi = {
  profile: () => request("/buyer/profile"),
  addresses: () => request("/buyer/addresses"),
  addAddress: (body: unknown) => request("/buyer/addresses", { method: "POST", body: JSON.stringify(body) }),
  updateAddress: (id: string, body: unknown) => request(`/buyer/addresses/${encodeId(id)}`, patchJson(body)),
  deleteAddress: (id: string) => request(`/buyer/addresses/${encodeId(id)}`, { method: "DELETE" }),
  paymentMethods: () => request("/buyer/payment-methods"),
  preferences: () => request("/buyer/preferences"),
  favorites: () => request("/buyer/favorites"),
  followedStores: () => request("/buyer/followed-stores"),
}
export default buyerApi
