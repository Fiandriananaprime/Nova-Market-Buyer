import type { Address } from './buyer';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'preparing'
  | 'delivered'
  | 'cancelled';
export type Order = {
  id: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    price: number;
    qty: number;
    sellerName: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: string;
  note?: string;
  address: Address;
  createdAt: string;
  estimatedDelivery: string | null;
};
