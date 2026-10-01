import { request } from "./client"
export const authApi = {
  register: (body: { firstName: string; lastName: string; password: string; email?: string; phone?: string }) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string; remember?: boolean }) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  refresh: () => request("/auth/refresh", { method: "POST" }),
  forgotPassword: (identifier: string) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ identifier }) }),
  verifyEmail: (code: string) => request("/auth/email/verify", { method: "POST", body: JSON.stringify({ code }) }),
  verifyPhone: (code: string) => request("/auth/phone/verify", { method: "POST", body: JSON.stringify({ code }) }),
  me: () => request("/auth/me"),
}
export default authApi
