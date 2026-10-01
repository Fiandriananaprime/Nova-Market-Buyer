const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/v2").replace(/\/$/, "")

type ApiError = { error?: { code?: string; message?: string; details?: unknown[] } }

export class NovaApiError extends Error {
  status: number
  code?: string
  constructor(status: number, payload: ApiError) {
    super(payload.error?.message || `La requête a échoué (${status})`)
    this.name = "NovaApiError"
    this.status = status
    this.code = payload.error?.code
  }
}

let csrfToken: string | null = null

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json")
  const method = (init.method || "GET").toUpperCase()
  if (method !== "GET" && method !== "HEAD") {
    csrfToken ||= await getCsrfToken()
    if (csrfToken) headers.set("X-CSRF-Token", csrfToken)
  }
  const response = await fetch(`${API_URL}${path}`, { ...init, headers, credentials: "include" })
  if (response.status === 204) return undefined as T
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new NovaApiError(response.status, payload)
  return payload as T
}

export async function getCsrfToken() {
  if (csrfToken) return csrfToken
  const response = await fetch(`${API_URL}/auth/csrf`, { credentials: "include" })
  if (!response.ok) return null
  const payload = (await response.json()) as { token?: string }
  csrfToken = payload.token || null
  return csrfToken
}

export const authApi = {
  register: (body: { firstName: string; lastName: string; password: string; email?: string; phone?: string }) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string; remember?: boolean }) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  forgotPassword: (identifier: string) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ identifier }) }),
  verifyEmail: (code: string) => request("/auth/email/verify", { method: "POST", body: JSON.stringify({ code }) }),
  verifyPhone: (code: string) => request("/auth/phone/verify", { method: "POST", body: JSON.stringify({ code }) }),
  me: () => request("/auth/me"),
}

export const publicApi = {
  categories: () => request("/categories"),
  products: (query = "") => request(`/products${query ? `?${query}` : ""}`),
  featuredProducts: () => request("/products/featured"),
  product: (id: string) => request(`/products/${encodeURIComponent(id)}`),
  stores: (query = "") => request(`/stores${query ? `?${query}` : ""}`),
  featuredStores: () => request("/stores/featured"),
  store: (id: string) => request(`/stores/${encodeURIComponent(id)}`),
}

export const accountApi = {
  profile: () => request("/account/profile"),
  updateProfile: (body: Record<string, unknown>) => request("/account/profile", { method: "PATCH", body: JSON.stringify(body) }),
  security: () => request("/account/security"),
  sessions: () => request("/account/sessions"),
  notifications: (page = 1, limit = 20) => request(`/account/notifications?page=${page}&limit=${limit}`),
  markNotificationRead: (id: string) => request(`/account/notifications/${encodeURIComponent(id)}/read`, { method: "PATCH" }),
  markAllNotificationsRead: () => request("/account/notifications/read-all", { method: "POST" }),
}

export const buyerApi = {
  profile: () => request("/buyer/profile"),
  addresses: () => request("/buyer/addresses"),
  addAddress: (body: unknown) => request("/buyer/addresses", { method: "POST", body: JSON.stringify(body) }),
  updateAddress: (id: string, body: unknown) => request(`/buyer/addresses/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteAddress: (id: string) => request(`/buyer/addresses/${encodeURIComponent(id)}`, { method: "DELETE" }),
  paymentMethods: () => request("/buyer/payment-methods"),
  preferences: () => request("/buyer/preferences"),
}

export const cartApi = {
  get: () => request("/buyer/cart"),
  addItem: (body: unknown) => request("/buyer/cart/items", { method: "POST", body: JSON.stringify(body) }),
  updateItem: (id: string, body: unknown) => request(`/buyer/cart/items/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }),
  removeItem: (id: string) => request(`/buyer/cart/items/${encodeURIComponent(id)}`, { method: "DELETE" }),
}

export const checkoutApi = {
  preview: (body: unknown) => request("/buyer/checkout/preview", { method: "POST", body: JSON.stringify(body) }),
  createOrder: (body: unknown) => request("/buyer/orders", { method: "POST", body: JSON.stringify(body) }),
}

export { API_URL }
