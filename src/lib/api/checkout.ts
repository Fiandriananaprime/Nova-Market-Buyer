import { request } from "./client"
export const checkoutApi = {
  preview: (body: unknown) => request("/buyer/checkout/preview", { method: "POST", body: JSON.stringify(body) }),
  createOrder: (body: unknown) => request("/buyer/orders", { method: "POST", body: JSON.stringify(body) }),
  orders: () => request("/buyer/orders"),
  order: (id: string) => request(`/buyer/orders/${encodeURIComponent(id)}`),
  cancelOrder: (id: string) => request(`/buyer/orders/${encodeURIComponent(id)}/cancel`, { method: "POST" }),
}
export default checkoutApi
