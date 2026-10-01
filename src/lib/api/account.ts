import { encodeId, request } from "./client"
export const accountApi = {
  profile: () => request("/account/profile"),
  updateProfile: (body: unknown) => request("/account/profile", { method: "PATCH", body: JSON.stringify(body) }),
  security: () => request("/account/security"),
  sessions: () => request("/account/sessions"),
  notifications: (page = 1, limit = 20) => request(`/account/notifications?page=${page}&limit=${limit}`),
  markNotificationRead: (id: string) => request(`/account/notifications/${encodeId(id)}/read`, { method: "PATCH" }),
  markAllNotificationsRead: () => request("/account/notifications/read-all", { method: "POST" }),
}
export const cartApi = {
  get: () => request("/buyer/cart"),
  addItem: (body: unknown) => request("/buyer/cart/items", { method: "POST", body: JSON.stringify(body) }),
  updateItem: (id: string, body: unknown) => request(`/buyer/cart/items/${encodeId(id)}`, { method: "PATCH", body: JSON.stringify(body) }),
  removeItem: (id: string) => request(`/buyer/cart/items/${encodeId(id)}`, { method: "DELETE" }),
}
export default accountApi
